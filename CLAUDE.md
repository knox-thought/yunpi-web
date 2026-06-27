# Yunpi-Web — เว็บลูกค้า + ช่องทางโต (marketing / SEO·AEO / LINE)

> **โปรเจกต์นี้ = ฝั่งลูกค้า/การเติบโต** ของธุรกิจหิ้วของญี่ปุ่น→ไทย "Yunpi"
> แยกขาดจาก **ระบบ ops ภายใน** (`../Yunpi-Project`) โดยตั้งใจ — คนละผู้ชม คนละเทคนิค คนละรอบ deploy
> เป้าหมาย: เว็บการตลาดที่ค้นเจอบน Google + AI (SEO/AEO) และเปลี่ยนคนแปลกหน้า → เพื่อนใน LINE → ลูกค้า

This file auto-loads every session. Single source of truth for the customer-facing side. คุย user = ไทย, โค้ด/คอมเมนต์ = อังกฤษ.

---

## 0. โปรเจกต์นี้คืออะไร (และไม่ใช่อะไร)

- **คือ:** เว็บ marketing สาธารณะ (SEO/AEO) + กลยุทธ์ช่องทางลูกค้าผ่าน **LINE Official Account**
- **ไม่ใช่:** ระบบ ops ภายใน (กดของ/ติดตาม/ค่าส่ง/จ่ายเงิน) — อันนั้นอยู่ที่ `../Yunpi-Project` (Next.js + Prisma + Supabase บน Cloudflare Workers, auth กั้น, **ห้าม** index)
- **ไม่แตะ DB ของ ops โดยตรง** — ถ้าต้องดึงข้อมูล (เช่นหน้า "เช็คสถานะของฉัน") ให้เรียกผ่าน **API ของ ops** (ยังไม่มี — ดู §5)

## 1. การตัดสินใจที่สรุปแล้ว (อย่ารื้อโดยไม่มีเหตุ)

1. **แยกระบบจาก ops** — repo แยก, deploy แยก, เชื่อมกันแค่ระดับโดเมน. เหตุผล: ops = private/dynamic/noindex/auth; marketing = public/static/indexed. ยัดรวมกัน = สู้กับ auth middleware + bundle ops เฉียดลิมิต free 3 MiB อยู่แล้ว
2. **โดเมน:** `yunpi.com` → เว็บนี้ (index ได้) · `app.yunpi.com` → ops (noindex). *(โดเมนจริงยังไม่จด — ดู Open questions)*
3. **ลูกค้า: LINE OA ก่อน ไม่ทำระบบล็อกอินรหัสผ่านเอง** (ดู `docs/line-customer-strategy.md`)
   - เก็บลูกค้าเป็นเพื่อนใน LINE OA → rich menu + broadcast + แท็ก
   - ผูก LINE `userId` → `Customer.lineId` ที่มีอยู่แล้วใน ops
   - ทีหลังถ้าต้อง "พื้นที่สมาชิก" → ใช้ **LINE Login / LIFF** (ไม่มีรหัสผ่าน) ไม่ใช่ระบบสมาชิกเอง
4. **ใบแจ้ง/บิลลูกค้าวันนี้:** ใช้ลิงก์ `/s/<token>` ที่ ops มีอยู่แล้ว (เปิดดูได้ไม่ต้องล็อกอิน ส่งทางไลน์) — ยังไม่ต้องสร้างใหม่

## 2. Tech stack (เลือกไว้)

- **Astro + Tailwind CSS** บน **Cloudflare Pages** — static, JS น้อย, Core Web Vitals ดี, เหมาะ SEO/AEO ที่สุด
  - Astro content collections = บล็อก/FAQ; sitemap/RSS/schema.org ทำง่าย
  - *ทางเลือกถ้าอยากใช้สแตกเดียวกับ ops:* Next static — แต่ Astro เบากว่าและตรงงานกว่า
- ภาษา: TypeScript (strict), เนื้อหา **ไทยเป็นหลัก** (hreflang `th`)
- ยังไม่ scaffold — ดู `docs/getting-started.md` สำหรับคำสั่งเริ่มจริง

## 3. SEO / AEO (หัวใจของโปรเจกต์)

- **SEO:** meta/OG ต่อหน้า, `sitemap.xml`, semantic HTML, รูป responsive, internal links, หน้าเนื้อหาตรงคำค้นไทย ("รับหิ้วของจากญี่ปุ่น", "ค่าส่งญี่ปุ่นมาไทยกี่บาท", "พรีออเดอร์ Mercari")
- **AEO (ให้ ChatGPT/Perplexity/Google AI Overview ตอบถึงร้าน):** JSON-LD `Organization` / `Service` / `FAQPage` / `Product`·`Offer`, ไฟล์ `llms.txt` (+ `llms-full.txt`), หน้า Q&A ชัดเจน, ข้อมูลธุรกิจครบ (ที่อยู่/ช่องทาง/ราคา)
- รายละเอียด: `docs/seo-aeo-plan.md`

## 4. โครงหน้าแรก (mockup ที่เจนไว้แล้ว)

Hero → "หิ้วของ 4 ขั้น" (ส่งลิงก์ → เรากดซื้อ → รวมส่งเข้าไทย → ส่งถึงมือ) → เว็บต้นทาง (Mercari/Yahoo/Rakuten) → จุดเด่น (เรทชัด/ตามได้ทุกขั้น/หลักฐานครบ) → CTA แอดไลน์.
*(เจนเป็น mockup ในเซสชันก่อน — สีแบรนด์จริงยังไม่ล็อก)*

## 5. ความสัมพันธ์กับ ops (`../Yunpi-Project`)

- ออปส์มี roadmap: **API token สำหรับบอท LINE** + **AI ผู้ช่วยผ่าน LINE** (ยังไม่ทำ) — เว็บนี้/LIFF จะเป็น "ลูกค้า" ของ API เดียวกันนั้น
- `Customer` ใน ops มี field `lineId` อยู่แล้ว → จุดผูกตัวตน LINE
- หน้า "เช็คสถานะของฉัน" (LIFF) อนาคต = อ่านจาก ops API (ต้องสร้าง endpoint + auth ก่อน)
- **อย่า** ให้เว็บนี้ต่อ Supabase ตรง

## 6. Status

- [x] ตัดสินใจ: แยกระบบ, Astro/Pages, LINE OA-first, โดเมน yunpi.com/app.yunpi.com
- [x] เจน mockup หน้าแรก (โครง)
- [ ] Scaffold Astro + Tailwind (ดู `docs/getting-started.md`)
- [ ] หน้าแรกจริง + SEO/AEO พื้นฐาน (meta, sitemap, schema.org, llms.txt)
- [ ] ตั้ง LINE OA + rich menu + flow ผูก `userId`→`Customer`
- [ ] (ทีหลัง) ops API + LIFF "เช็คสถานะของฉัน"

## 7. Open questions (ต้องการจาก user)

- โดเมนจริง (จด yunpi.com แล้วยัง? ใช้ตัวอื่นไหม)
- แบรนด์: โลโก้ (ぴ Yunpi คือจริงหรือ placeholder?), สี, ฟอนต์, ชื่อ LINE OA (@?)
- โทนดีไซน์: มินิมอลขาว-แดงญี่ปุ่น / อบอุ่นครีม-ส้ม / พรีเมียมเข้ม
- ขอบเขตเฟสแรก: แค่ landing + LINE CTA ก่อน หรือมีบล็อก/FAQ ตั้งแต่แรก

> 📌 เริ่มเซสชันใหม่: อ่าน `README.md` + `docs/` แล้วถาม Open questions ข้างบนก่อนลงมือ
