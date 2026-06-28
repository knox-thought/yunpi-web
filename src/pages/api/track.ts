import type { APIRoute } from "astro";

// On-demand route (not prerendered). Runs on Cloudflare at the edge.
export const prerender = false;

/**
 * Parcel tracking endpoint.
 *
 * ⚠️ MOCK for now. The web must NOT touch the ops DB/Supabase directly.
 * When ops ships its tracking endpoint + token, replace `lookup()` with:
 *
 *   const res = await fetch(`${import.meta.env.OPS_API}/tracking/${code}`, {
 *     headers: { Authorization: `Bearer ${import.meta.env.OPS_API_TOKEN}` },
 *   });
 *   if (res.status === 404) return notFound();
 *   const data = await res.json(); // must match TrackResult below
 *
 * Contract the ops endpoint should return (TrackResult):
 *   { code, status, statusLabel, updatedAt, method, timeline: Step[] }
 *   Step = { key, label, date|null, done }
 */

type Step = { key: string; label: string; date: string | null; done: boolean };
type TrackResult = {
  code: string;
  status: string;
  statusLabel: string;
  method: "air" | "sea" | null;
  updatedAt: string;
  timeline: Step[];
};

const STEP_DEFS = [
  { key: "ordered", label: "รับออเดอร์" },
  { key: "purchased", label: "สั่งซื้อ/ประมูลแล้ว" },
  { key: "shipped", label: "ส่งออกจากญี่ปุ่น" },
  { key: "arrived_th", label: "ถึงไทย · เคลียร์ภาษี" },
  { key: "consolidated", label: "รวมพัสดุที่โกดังไทย" },
  { key: "delivered", label: "ส่งถึงมือลูกค้า" },
] as const;

// Demo data so the flow works end-to-end before the ops API exists.
const DEMO: Record<string, { reached: number; method: "air" | "sea"; dates: string[] }> = {
  YP100001: {
    reached: 2, // shipped out of Japan, in transit
    method: "air",
    dates: ["2026-06-20", "2026-06-21", "2026-06-24", "", "", ""],
  },
  YP100002: {
    reached: 5, // delivered
    method: "sea",
    dates: ["2026-05-10", "2026-05-12", "2026-05-18", "2026-05-28", "2026-06-08", "2026-06-12"],
  },
};

function lookup(rawCode: string): TrackResult | null {
  const code = rawCode.trim().toUpperCase();
  const d = DEMO[code];
  if (!d) return null;
  const timeline: Step[] = STEP_DEFS.map((s, i) => ({
    key: s.key,
    label: s.label,
    date: d.dates[i] || null,
    done: i <= d.reached,
  }));
  const current = STEP_DEFS[d.reached];
  return {
    code,
    status: current.key,
    statusLabel: current.label,
    method: d.method,
    updatedAt: d.dates[d.reached] || "",
    timeline,
  };
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

export const GET: APIRoute = ({ url }) => {
  const code = url.searchParams.get("code")?.trim();
  if (!code) return json({ error: "missing_code", message: "กรุณากรอกรหัสพัสดุ" }, 400);
  const result = lookup(code);
  if (!result) return json({ error: "not_found", message: "ไม่พบรหัสพัสดุนี้ ลองตรวจสอบอีกครั้ง" }, 404);
  return json(result);
};
