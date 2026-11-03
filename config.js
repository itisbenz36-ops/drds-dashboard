// ตั้งค่าการเชื่อมต่อ Google Sheet
// วาง Web app URL ที่ได้จาก Google Apps Script (Deploy → Web app) ระหว่างเครื่องหมาย ' '
// ตัวอย่าง: 'https://script.google.com/macros/s/AKfycb.../exec'
window.DRDS_CONFIG = {
  API_URL: 'https://script.google.com/macros/s/AKfycbzqQV5e43ObrvmBikZesztvC-zZgM3SnZKvVo4ON9zb5EmIRBgbVD7ZKWIR-0L_rjYM/exec',
  REFRESH_SECONDS: 60, // หน้า dashboard ดึงข้อมูลใหม่ทุกกี่วินาที
};
