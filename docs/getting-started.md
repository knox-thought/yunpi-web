# เริ่ม dev (scaffold)

> ยังไม่ได้ scaffold โค้ดไว้ (กันโครงเก่า/พังก่อนใช้). เซสชันใหม่รันคำสั่งทางการด้านล่างได้เลย — ใช้ตัวล่าสุดเสมอ.

## 1. Scaffold Astro + Tailwind (ในโฟลเดอร์นี้)
```bash
# จากในโฟลเดอร์ Yunpi-Web (มี .git/CLAUDE.md/docs อยู่แล้ว)
npm create astro@latest .          # เลือก: Empty / TypeScript strict / ใช้ตัวอย่างน้อยสุด
npx astro add tailwind             # Tailwind
npx astro add sitemap              # @astrojs/sitemap (SEO)
npx astro add cloudflare           # adapter ถ้าจะใช้ SSR; static ล้วนไม่ต้องก็ได้
```
> ถ้า `npm create astro . ` บ่นว่าโฟลเดอร์ไม่ว่าง: scaffold ในโฟลเดอร์ย่อยชั่วคราวแล้วย้ายไฟล์มา หรือใช้ `--template minimal` แล้ว merge

## 2. โครงไฟล์ที่อยากได้ (เฟสแรก)
```
src/
  pages/
    index.astro            # หน้าแรก (ใช้ mockup ที่เจนไว้เป็นแนว)
    faq.astro              # FAQ + FAQPage JSON-LD
  layouts/
    Base.astro             # <head> meta/OG, JSON-LD Organization, hreflang th
  components/              # Hero, Steps, Sites, CTA ...
public/
  llms.txt                 # สรุปธุรกิจให้ LLM (AEO)
  robots.txt               # allow + ชี้ sitemap
astro.config.mjs           # site: 'https://yunpi.com', integrations: [tailwind, sitemap]
```

## 3. SEO/AEO ที่ต้องมีตั้งแต่เฟสแรก
- `<title>`/`<meta description>`/OG ต่อหน้า (ผ่าน `Base.astro` props)
- JSON-LD `Organization` + `Service` ใน `Base.astro`
- `@astrojs/sitemap` → `sitemap-index.xml` อัตโนมัติ
- `public/robots.txt` + `public/llms.txt`
- `lang="th"`, `hreflang="th"`
- ดู `docs/seo-aeo-plan.md`

## 4. Deploy (Cloudflare Pages)
- เชื่อม repo นี้กับ Cloudflare Pages (build: `astro build`, output: `dist`)
- โดเมน `yunpi.com` (เว็บนี้) แยกจาก `app.yunpi.com` (ops)

## 5. ก่อนลงมือ — ถาม user (Open questions ใน CLAUDE.md §7)
โดเมนจริง · โลโก้/สี/ฟอนต์/ชื่อ LINE OA · โทนดีไซน์ · ขอบเขตเฟสแรก
