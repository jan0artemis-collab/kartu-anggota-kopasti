# Panduan Instalasi Lengkap

## Persyaratan
- Google Account
- Node.js 18+ dan npm
- Git (opsional)

## Langkah 1: Setup Google Spreadsheet

1. Buka Google Sheets
2. Buat spreadsheet baru atau gunakan yang ada dengan ID: `1Qz8V11JuwdI32oOmMxbyizRulFKKCJqB2njC0FW-xIk`
3. Pastikan Sheet1 memiliki header kolom berikut (urutan harus sama):
   ```
   id
   nomor_induk
   nama
   jabatan
   satuan_terminal
   angkatan
   kedisiplinan
   kepemimpinan
   kerajinan
   public_speaking
   teamwork
   teknis_kopasti
   pengambilan_keputusan
   kreativitas
   photo_url
   ```

4. Import sample data:
   - Buka File → Import
   - Upload tab → pilih `sample-data.csv`
   - Import location: Replace current sheet
   - Klik Import data

## Langkah 2: Deploy Google Apps Script

1. Di spreadsheet, klik Extensions → Apps Script
2. Hapus semua kode default
3. Copy seluruh isi file `apps-script/Code.gs`
4. Paste ke editor Apps Script
5. Klik ikon Settings (⚙️) di sidebar kiri
6. Centang "Show appsscript.json in editor"
7. Klik Editor, klik file `appsscript.json`
8. Replace dengan isi file `apps-script/appsscript.json`
9. Klik Save (💾)
10. Klik Deploy → New deployment
11. Klik gear icon → Web app
12. Isi konfigurasi:
    - Description: "KOPASTI Member API"
    - Execute as: **Me (your email)**
    - Who has access: **Anyone**
13. Klik Deploy
14. Copy Web App URL (format: https://script.google.com/macros/s/.../exec)
15. SIMPAN URL INI!

## Langkah 3: Setup Frontend

1. Extract file zip ke folder kerja Anda
2. Buka terminal/command prompt
3. Masuk ke folder frontend:
   ```bash
   cd kopasti-member-card/frontend
   ```

4. Install dependencies:
   ```bash
   npm install
   ```
   (Tunggu sampai selesai, bisa 2-5 menit)

5. Konfigurasi API:
   - Buka file `src/utils/api.js` dengan text editor
   - Ganti `YOUR_APPS_SCRIPT_URL_HERE` dengan URL yang Anda copy di Langkah 2
   - Contoh:
     ```javascript
     export const API_BASE_URL = 'https://script.google.com/macros/s/AKfycbxxx.../exec';
     ```
   - Save file

## Langkah 4: Testing Lokal

1. Jalankan development server:
   ```bash
   npm run dev
   ```

2. Buka browser, akses: http://localhost:3000

3. Test fitur:
   - Daftar anggota muncul
   - Search berfungsi
   - Klik anggota untuk lihat detail
   - QR code muncul
   - Chart muncul
   - Klik segment chart untuk detail

4. Jika ada error:
   - Cek console browser (F12)
   - Pastikan Apps Script URL benar
   - Pastikan spreadsheet memiliki data

## Langkah 5: Deploy ke Production

### Option A: Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login:
   ```bash
   vercel login
   ```

3. Build project:
   ```bash
   npm run build
   ```

4. Deploy:
   ```bash
   vercel --prod
   ```

5. Ikuti instruksi CLI
6. Copy URL production

### Option B: Netlify

1. Build project:
   ```bash
   npm run build
   ```

2. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

3. Login:
   ```bash
   netlify login
   ```

4. Deploy:
   ```bash
   netlify deploy --prod --dir=dist
   ```

5. Ikuti instruksi CLI
6. Copy URL production

### Option C: Manual Upload ke Hosting

1. Build project:
   ```bash
   npm run build
   ```

2. Upload folder `dist/` ke hosting Anda (cPanel, FTP, dll)
3. Pastikan web server mengarah ke file `index.html`

## Troubleshooting

### Apps Script Error: "Authorization Required"
- Buka URL Apps Script di browser
- Klik "Review Permissions"
- Pilih akun Google Anda
- Klik "Advanced" → "Go to ... (unsafe)"
- Klik "Allow"

### Frontend Error: "Failed to fetch"
- Cek API_BASE_URL di `src/utils/api.js`
- Pastikan Apps Script deployed dengan "Anyone" access
- Test API URL langsung di browser

### Data tidak muncul
- Cek spreadsheet memiliki data di Sheet1
- Cek header kolom sesuai urutan
- Refresh browser

### Build error
- Hapus folder `node_modules`
- Hapus file `package-lock.json`
- Jalankan `npm install` lagi

## Update Data

Untuk update data anggota:
1. Edit spreadsheet langsung
2. Refresh aplikasi web (F5)
3. Data akan otomatis terupdate

## Keamanan

- Jangan share Apps Script deployment URL secara publik di repository
- Gunakan environment variable untuk production
- Backup spreadsheet secara berkala

## Support

Jika ada masalah, check:
1. Console browser (F12) untuk error
2. Apps Script Executions log untuk backend error
3. Network tab di browser untuk API response
