# KOPASTI YPIC Member Card - Quick Start

## 1. Setup Google Spreadsheet

1. Open: https://docs.google.com/spreadsheets/d/1Qz8V11JuwdI32oOmMxbyizRulFKKCJqB2njC0FW-xIk
2. Create Sheet1 with headers:
   ```
   id | nomor_induk | nama | jabatan | satuan_terminal | angkatan | kedisiplinan | kepemimpinan | kerajinan | public_speaking | teamwork | teknis_kopasti | pengambilan_keputusan | kreativitas | photo_url
   ```
3. Import sample-data.csv

## 2. Deploy Apps Script

1. Extensions → Apps Script
2. Copy apps-script/Code.gs
3. Deploy → New deployment → Web app
4. Execute as: Me, Access: Anyone
5. Copy deployment URL

## 3. Configure Frontend

Edit frontend/src/utils/api.js:
```javascript
export const API_BASE_URL = 'YOUR_APPS_SCRIPT_URL';
```

## 4. Run Locally

```bash
cd frontend
npm install
npm run dev
```

Open: http://localhost:3000

## 5. Deploy Production

### Vercel:
```bash
vercel --prod
```

### Netlify:
```bash
netlify deploy --prod
```

## Features

✅ Member list with search & filter
✅ Digital member cards with QR codes
✅ Performance radar charts
✅ Interactive criteria details
✅ Print-ready A6 cards
✅ Dark mode support
✅ Mobile responsive

## Testing

Use sample-data.csv for initial testing.
Follow ACCEPTANCE_TEST.md for complete testing.
