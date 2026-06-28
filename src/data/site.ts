// Single source of truth for business info (NAP) — reused in pages and JSON-LD.
// Keep consistent everywhere: AEO/SEO rewards a stable, repeated identity.

export const site = {
  name: "YUNPI",
  legalName: "YUNPI",
  tagline: "รับหิ้ว · พรีออเดอร์ · ขนส่งสินค้าจากญี่ปุ่น → ไทย",
  description:
    "YUNPI บริการสั่งซื้อ หิ้ว และขนส่งสินค้าจากญี่ปุ่นมาไทยครบวงจร เรท Superrich +0.03 ส่งทางเครื่องและทางเรือ เช็คสถานะพัสดุได้ทุกขั้นตอน",
  url: "https://yunpi.com",
  locale: "th_TH",
  phone: "064-193-2656",
  phoneE164: "+66641932656",
  lineUrl: "https://lin.ee/UqE1ayL",
  areaServed: ["ญี่ปุ่น", "ไทย"],
  // Source sites we buy from
  sourceSites: ["Mercari", "Yahoo Auction", "Yahoo Shopping", "Rakuten", "Amazon JP"],
  rates: {
    fxNote: "เรท Superrich +0.03 (ลดลงตามยอดสั่งซื้อ)",
    air: { from: 380, unit: "บาท/กก.", eta: "7–10 วัน" },
    sea: { from: 150, unit: "บาท/กก.", eta: "20–25 วัน" },
    etaNote: "นับหลังสินค้าออกจากญี่ปุ่น",
  },
} as const;

// Source-site logos for the marquee (white SVGs in /public/brands).
// Mercari is a hand-made wordmark; the rest are Simple Icons brand marks.
export const brands = [
  { name: "Mercari", logo: "/brands/mercari.svg", url: "https://jp.mercari.com/" },
  { name: "Rakuten", logo: "/brands/rakuten.svg", url: "https://www.rakuten.co.jp/" },
  { name: "Yahoo! Auction", logo: "/brands/yahoo.svg", url: "https://auctions.yahoo.co.jp/" },
  { name: "Amazon JP", logo: "/brands/amazon.svg", url: "https://www.amazon.co.jp/" },
] as const;

// 4-step "how it works"
export const steps = [
  { n: 1, title: "ส่งลิงก์สินค้า", desc: "ส่งลิงก์ของที่อยากได้จากเว็บญี่ปุ่นมาทางไลน์" },
  { n: 2, title: "เรากดซื้อให้", desc: "YUNPI สั่งซื้อ/ประมูลให้ พร้อมแจ้งยอดตามเรท Superrich" },
  { n: 3, title: "ส่งออกจากญี่ปุ่น", desc: "ของแต่ละชิ้นส่งจากญี่ปุ่นแยกกัน ทางเครื่องหรือทางเรือ" },
  { n: 4, title: "รวมที่ไทย ส่งถึงคุณ", desc: "รวมพัสดุที่โกดังไทย แล้วจัดส่งถึงบ้าน ติดตามได้ทุกขั้นตอน" },
] as const;

// FAQ — also rendered as FAQPage JSON-LD (answers kept short & direct for AEO)
export const faqs = [
  {
    q: "YUNPI รับหิ้วของจากเว็บไหนบ้าง?",
    a: "รับสั่งซื้อและประมูลจากทุกเว็บญี่ปุ่น เช่น Mercari, Yahoo Auction, Yahoo Shopping, Rakuten และ Amazon JP",
  },
  {
    q: "ค่าส่งจากญี่ปุ่นมาไทยกี่บาท?",
    a: "ส่งทางเครื่องเริ่มต้น 380 บาท/กก. (ถึงไทย 7–10 วัน) ส่งทางเรือเริ่มต้น 150 บาท/กก. (20–25 วัน) นับหลังสินค้าออกจากญี่ปุ่น โดยรวมพัสดุที่โกดังไทยก่อนจัดส่งถึงคุณ",
  },
  {
    q: "ใช้เรทแลกเงินเท่าไหร่?",
    a: "ใช้เรท Superrich +0.03 บาทต่อเยน และลดลงอีกตามยอดสั่งซื้อ",
  },
  {
    q: "สั่งของแล้วติดตามสถานะได้ไหม?",
    a: "ได้ เช็คสถานะพัสดุได้ทุกขั้นตอนที่หน้า ‘เช็คพัสดุ’ บนเว็บ หรือสอบถามผ่านไลน์ได้ตลอด",
  },
  {
    q: "สั่งซื้อกับ YUNPI ยังไง?",
    a: "แอดไลน์ YUNPI แล้วส่งลิงก์สินค้าที่ต้องการ ทีมงานจะแจ้งยอดและดำเนินการสั่งซื้อให้",
  },
];
