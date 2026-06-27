# แผน SEO / AEO

## เป้า
ให้คนค้นเจอบน **Google** (SEO) และให้ **AI answer engines** (ChatGPT, Perplexity, Google AI Overview) ตอบถึงร้าน (AEO).

## SEO พื้นฐาน (ทุกหน้า)
- `<title>` + `<meta description>` ต่อหน้า, Open Graph + Twitter card
- semantic HTML (h1 เดียว/หน้า, heading เป็นลำดับ), alt ทุกรูป
- `sitemap.xml` (Astro plugin `@astrojs/sitemap`) + `robots.txt` (allow)
- รูป responsive + lazy, LCP เร็ว (Astro static ช่วยอยู่แล้ว)
- internal link ระหว่างหน้า, breadcrumb
- `hreflang="th"`, `lang="th"`

## หน้าเนื้อหาตรงคำค้น (ไทย)
- "รับหิ้วของจากญี่ปุ่น" / "พรีออเดอร์ญี่ปุ่น"
- "ค่าส่งจากญี่ปุ่นมาไทย กี่บาท" (หน้าอธิบายวิธีคิดค่าส่งตามน้ำหนัก/ปริมาตร)
- "วิธีสั่งของ Mercari / Yahoo Auction / Rakuten"
- "หิ้วการ์ด/ฟิกเกอร์/ของสะสมจากญี่ปุ่น" (ตามสินค้าจริงที่ขาย)
- บล็อก/FAQ (Astro content collections)

## AEO (ให้ AI ตอบถึงร้าน)
- **JSON-LD structured data:**
  - `Organization` (ชื่อ, โลโก้, ช่องทางติดต่อ, LINE, พื้นที่บริการ)
  - `Service` (บริการหิ้วของ/พรีออเดอร์ JP→TH)
  - `FAQPage` (Q&A จริงในหน้า FAQ)
  - `Product` / `Offer` ถ้ามีรายการสินค้า/ราคา
- **`llms.txt`** (+ `llms-full.txt`) ที่ root — สรุปธุรกิจ/บริการ/ราคา/วิธีสั่ง ให้ LLM อ่านง่าย
- เนื้อหาเป็น Q&A ชัด ๆ ตอบตรงคำถาม (AI ชอบดึงคำตอบสั้นที่ชัด)
- ข้อมูลธุรกิจครบและสม่ำเสมอ (NAP: ชื่อ/ช่องทาง/พื้นที่บริการ) ทุกหน้า

## วัดผล
- Google Search Console (sitemap, คำค้น, index coverage)
- ทดสอบถาม ChatGPT/Perplexity ว่ารู้จักร้านไหมเป็นระยะ

## ลำดับทำ
1. Landing + schema.org Organization/Service + sitemap + llms.txt (เฟสแรกพอ)
2. หน้า FAQ + FAQPage schema
3. หน้าเนื้อหาตามคำค้น + บล็อก (ทยอยเพิ่ม)
