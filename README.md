# Yunpi-Web

เว็บฝั่งลูกค้าของ **Yunpi** (หิ้วของญี่ปุ่น→ไทย): เว็บการตลาด SEO/AEO + ช่องทางลูกค้าผ่าน LINE.
แยกขาดจากระบบ ops ภายใน (`../Yunpi-Project`).

## เริ่มที่นี่
1. อ่าน [`CLAUDE.md`](CLAUDE.md) — บริบท + การตัดสินใจทั้งหมด (auto-load ทุกเซสชัน)
2. เอกสารแยกเรื่อง:
   - [`docs/architecture.md`](docs/architecture.md) — ทำไมแยกระบบ + โดเมน + สแตก
   - [`docs/line-customer-strategy.md`](docs/line-customer-strategy.md) — LINE OA ก่อน, LIFF ทีหลัง, ไม่ทำล็อกอินเอง
   - [`docs/seo-aeo-plan.md`](docs/seo-aeo-plan.md) — แผน SEO + AEO
   - [`docs/getting-started.md`](docs/getting-started.md) — คำสั่ง scaffold Astro + Tailwind + deploy

## สถานะ
ยังไม่ scaffold โค้ด — เก็บการตัดสินใจ/แผนไว้ให้เริ่ม dev ได้ทันที. ดู Status ใน `CLAUDE.md`.

## ความสัมพันธ์กับ ops
ไม่แตะ Supabase ตรง. ถ้าต้องดึงข้อมูลลูกค้า/สถานะ → ผ่าน **API ของ ops** (ยังไม่มี). `Customer.lineId` ใน ops = จุดผูกตัวตน LINE.
