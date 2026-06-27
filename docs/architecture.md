# สถาปัตยกรรม — ทำไมแยกระบบ

## ตัดสินใจ: เว็บลูกค้า แยกขาดจากระบบ ops

| | ops (`Yunpi-Project`) | เว็บนี้ (`Yunpi-Web`) |
|---|---|---|
| ผู้ชม | ทีมงานภายใน | ลูกค้า + คนทั่วไป (Google/AI) |
| index | **ห้าม** (auth กั้น) | **ต้อง** index ได้ |
| เทคนิค | Next.js 16 + Prisma + Supabase, dynamic, auth | static, JS น้อย, เร็ว |
| deploy | Cloudflare Workers + Hyperdrive | Cloudflare Pages |
| คนแก้/รอบ | dev | มาร์เก็ตติ้ง/เนื้อหา แก้บ่อย |

**เหตุผลหลัก:**
- ops auth กั้นทุกหน้า — เว็บ marketing ต้องเปิดให้บอทเข้า = ขัดกัน ถ้ายัดรวมเสี่ยงหลุดหน้า ops หรือเผลอ noindex หน้า marketing
- bundle ของ ops เฉียดลิมิต free 3 MiB อยู่แล้ว — เพิ่มหน้า marketing/บล็อกยิ่งบวม
- SEO/AEO = งานเนื้อหา+มาร์กอัป เหมาะ static site เบา ๆ มากกว่า dynamic app

## โดเมน
- `yunpi.com` → เว็บนี้ (index ได้)
- `app.yunpi.com` → ops (noindex)
- Cloudflare แยก subdomain ง่าย

> เก็บงานเดิม: ops ยังไม่มี `robots.txt`/`noindex` เลย แอปหลักปลอดเพราะ auth กั้น แต่ `/s/<token>` เปิด GET สาธารณะ **ควรใส่ `noindex`** กันโดน index ถ้า URL หลุด (งานเล็กฝั่ง ops ค่อยทำ)

## สแตก
- **Astro + Tailwind บน Cloudflare Pages** — เหตุผล: zero-JS default, content collections (บล็อก/FAQ), sitemap/RSS/schema.org ง่าย, Core Web Vitals ดี
- ทางเลือก: Next static (ถ้าอยากสแตกเดียวกับ ops) — แต่ Astro ตรงงาน SEO มากกว่า

## เชื่อมกับ ops
- เว็บนี้ **ไม่ต่อ Supabase ตรง**
- อนาคต: หน้า "เช็คสถานะของฉัน" (LIFF) → เรียก **ops API** (ต้องสร้าง endpoint + API token ก่อน — อยู่ใน roadmap ops แล้ว)
