# DRDS Dashboard + Google Sheet – วิธีติดตั้ง

ระบบนี้มี 3 ส่วน

| ส่วน | หน้าที่ |
|---|---|
| **Google Sheet** | ฐานข้อมูล เก็บรายชื่อบุคลากรและสถานะ (sheet `data`) และบันทึกประวัติการแก้ไข (sheet `log`) |
| **Google Apps Script** | ตัวกลางระหว่างหน้าเว็บกับ Sheet และตรวจรหัสผ่าน admin |
| **GitHub Pages** | หน้าเว็บ `index.html` (dashboard ให้ทุกคนดู) และ `admin.html` (หน้าแก้ไขข้อมูล ต้องใช้รหัสผ่าน) |

ใช้เวลาตั้งค่าครั้งแรกประมาณ 10 นาที

---

## ขั้นที่ 1 · สร้าง Google Sheet

1. เปิด https://sheets.google.com แล้วสร้างสเปรดชีตใหม่ (Blank) ตั้งชื่อ เช่น `DRDS Database`
2. ยังไม่ต้องใส่ข้อมูลใด ๆ ระบบจะสร้าง sheet `data` และ `log` ให้เอง

## ขั้นที่ 2 · ติดตั้ง Apps Script

1. ในหน้า Google Sheet เมนู **ส่วนขยาย (Extensions) → Apps Script**
2. ลบโค้ดเดิมในไฟล์ `Code.gs` ออกทั้งหมด แล้ววางโค้ดจากไฟล์ `2-วางใน-Google-Apps-Script/Code.gs` → กด 💾 บันทึก
3. ตั้งรหัสผ่าน admin:
   - เมนูซ้าย **Project Settings** (รูปเฟือง ⚙) → เลื่อนลงไปที่ **Script Properties** → **Add script property**
   - Property: `ADMIN_PASSWORD`
   - Value: รหัสผ่านที่ต้องการ (ควรยาว 10 ตัวอักษรขึ้นไป)
   - กด **Save script properties**
4. เผยแพร่เป็น Web app:
   - ปุ่มสีน้ำเงิน **Deploy → New deployment**
   - กดรูปเฟืองข้าง "Select type" → เลือก **Web app**
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`
   - กด **Deploy** → กด **Authorize access** → เลือกบัญชี Google → ถ้าขึ้นว่า "Google hasn't verified this app" ให้กด **Advanced → Go to … (unsafe)** → **Allow**
     (เป็นสคริปต์ของคุณเอง ขอสิทธิ์เฉพาะ Sheet นี้)
5. คัดลอก **Web app URL** (ขึ้นต้นด้วย `https://script.google.com/macros/s/` และลงท้ายด้วย `/exec`)

## ขั้นที่ 3 · ใส่ URL ลงใน config.js

เปิดไฟล์ `1-อัปโหลดขึ้น-GitHub/config.js` ด้วย Notepad แล้ววาง URL ระหว่างเครื่องหมาย `' '`

```js
API_URL: 'https://script.google.com/macros/s/AKfycb.../exec',
```

บันทึกไฟล์

## ขั้นที่ 4 · อัปโหลดขึ้น GitHub

1. เข้า repo `drds-dashboard` บน GitHub → **Add file → Upload files**
2. ลาก 3 ไฟล์ในโฟลเดอร์ `1-อัปโหลดขึ้น-GitHub` (`index.html`, `admin.html`, `config.js`) ไปวาง → **Commit changes**
   (`index.html` เดิมจะถูกแทนที่)
3. แนะนำให้ **ลบไฟล์ `drds.xlsx` ออกจาก repo** เพราะข้อมูลย้ายไปอยู่ใน Google Sheet แล้ว และไฟล์ใน repo แบบ Public ใครก็ดาวน์โหลดได้
   (คลิกไฟล์ `drds.xlsx` → ปุ่ม `…` มุมขวาบน → **Delete file** → Commit changes)

## ขั้นที่ 5 · นำข้อมูลเริ่มต้นเข้า Google Sheet

1. เปิด `https://<ชื่อผู้ใช้>.github.io/drds-dashboard/admin.html`
2. ใส่รหัสผ่านจากขั้นที่ 2
3. กด **นำเข้าจาก Excel** → เลือกไฟล์ `3-ไฟล์ข้อมูลเริ่มต้น/drds.xlsx` → กด **ยืนยันนำเข้า**
4. เปิดหน้า dashboard `https://<ชื่อผู้ใช้>.github.io/drds-dashboard/` จะเห็นข้อมูลจาก Google Sheet

---

## การใช้งานหน้า admin

| ต้องการ | ทำอย่างไร |
|---|---|
| เปลี่ยนคนที่ยังไม่ลงทะเบียน → ลงทะเบียนแล้ว | กดปุ่ม **ยังไม่ลงทะเบียน** ด้านบน เพื่อดูเฉพาะคนที่ยังค้าง แล้วกดสวิตช์ในช่อง "ลงทะเบียน" ของคนนั้น |
| บันทึกว่าบันทึกผลงานแล้ว | กดสวิตช์ในช่อง "บันทึกผลงาน" (ระบบจะตั้งเป็นลงทะเบียนแล้วให้ด้วย) |
| เพิ่มคนใหม่ | ปุ่ม **＋ เพิ่มบุคลากร** |
| แก้ชื่อ / ตำแหน่ง / ระดับ / กลุ่มงาน | ปุ่ม **แก้ไข** ท้ายแถว |
| ลบคนที่ย้ายออก | ปุ่ม **ลบ** ท้ายแถว → กดยืนยัน |
| แทนข้อมูลทั้งหมดด้วยไฟล์ Excel | **นำเข้าจาก Excel** (ไฟล์รูปแบบเดิม 1 sheet ต่อกลุ่มงาน) |
| สำรองข้อมูล / ส่งรายงาน | **ดาวน์โหลด Excel** ได้ไฟล์รูปแบบเดิม พร้อม sheet สรุป |

- ทุกการแก้ไขบันทึกลง Google Sheet ทันที หน้า dashboard จะดึงข้อมูลใหม่อัตโนมัติทุก 60 วินาที
- ประวัติการแก้ไขทั้งหมดดูได้ใน sheet `log` ของ Google Sheet
- แก้ไขข้อมูลใน Google Sheet โดยตรงก็ได้ ห้ามลบหรือแก้แถวหัวตารางของ sheet `data` และคอลัมน์ `id` ต้องไม่ว่างและไม่ซ้ำ

## ความปลอดภัย

- รหัสผ่าน admin ตรวจที่ Google Apps Script ไม่ได้อยู่ในไฟล์บน GitHub
- หน้า `admin.html` ใครก็เปิดได้ แต่จะเข้าไปแก้ข้อมูลได้เฉพาะคนที่รู้รหัสผ่าน
- ข้อมูลที่หน้า dashboard แสดง (รายชื่อและสถานะ) อ่านได้โดยทุกคนที่มีลิงก์
- เปลี่ยนรหัสผ่าน: Apps Script → Project Settings → Script Properties → แก้ค่า `ADMIN_PASSWORD` (มีผลทันที ไม่ต้อง deploy ใหม่)

## แก้ไขโค้ด Apps Script ภายหลัง

ต้อง **Deploy → Manage deployments → ✎ Edit → Version: New version → Deploy** ทุกครั้ง URL เดิมจะยังใช้ได้
