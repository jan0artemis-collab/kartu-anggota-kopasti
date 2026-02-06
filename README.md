# Kartu Anggota KOPASTI YPIC Banjarnegara

Web aplikasi digital untuk kartu anggota dan tracking performa siswa KOPASTI YPIC Banjarnegara.

## Fitur

- ✅ Kartu anggota digital bergaya TNI dengan QR code
- ✅ Daftar anggota dengan pencarian dan filter
- ✅ Grafik performa radar chart (8 kriteria)
- ✅ Detail breakdown nilai dengan referensi cell spreadsheet
- ✅ QR scanner menggunakan kamera device
- ✅ Print-ready (ukuran A6)
- ✅ Dark mode
- ✅ Responsive mobile

## Quick Start

### 1. Setup Google Spreadsheet

1. Buka spreadsheet: `1Qz8V11JuwdI32oOmMxbyizRulFKKCJqB2njC0FW-xIk`
2. Buat Sheet1 dengan header:
   ```
   id, nomor_induk, nama, jabatan, satuan_terminal, angkatan, kedisiplinan, kepemimpinan, kerajinan, public_speaking, teamwork, teknis_kopasti, pengambilan_keputusan, kreativitas, photo_url
   ```
3. Import data dari `sample-data.csv`

### 2. Deploy Google Apps Script

1. Buka Extensions → Apps Script
2. Copy isi file `apps-script/Code.gs`
3. Deploy → New deployment → Web app
4. Execute as: Me, Who has access: Anyone
5. Copy deployment URL

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Edit `src/utils/api.js`:
```javascript
export const API_BASE_URL = 'PASTE_YOUR_APPS_SCRIPT_URL_HERE';
```

### 4. Run Development

```bash
npm run dev
```

Buka: http://localhost:3000

### 5. Deploy Production

**Vercel:**
```bash
npm run build
vercel --prod
```

**Netlify:**
```bash
npm run build
netlify deploy --prod --dir=dist
```

## Struktur Project

```
kopasti-member-card/
├── apps-script/          # Google Apps Script backend
│   ├── Code.gs          # Main API endpoint
│   └── appsscript.json  # Apps Script config
├── frontend/            # React + Vite frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Page components
│   │   └── utils/       # Utilities
│   └── package.json
├── sample-data.csv      # Sample data untuk testing
└── sample-data.json     # Sample API response
```

## Testing

Lihat `ACCEPTANCE_TEST.md` untuk checklist lengkap testing.

## API Endpoints

- `GET /?id={id}` - Get single member
- `GET /?q={search}` - Search members
- `GET /?angkatan={year}` - Filter by angkatan
- `GET /?satuan_terminal={name}` - Filter by satuan
- `GET /?limit={n}&offset={n}` - Pagination

## Tech Stack

**Backend:**
- Google Apps Script
- Google Sheets sebagai database

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Chart.js (radar chart)
- qrcode (QR generator)
- @zxing/library (QR scanner)
- React Router

## License

MIT
