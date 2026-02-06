# Google Apps Script Deployment

## Setup Steps

1. Buka Google Spreadsheet dengan ID: 1Qz8V11JuwdI32oOmMxbyizRulFKKCJqB2njC0FW-xIk

2. Pastikan header kolom di Sheet1 sesuai:
   id, nomor_induk, nama, jabatan, satuan_terminal, angkatan, kedisiplinan, kepemimpinan, kerajinan, public_speaking, teamwork, teknis_kopasti, pengambilan_keputusan, kreativitas, photo_url

3. Buka Extensions → Apps Script

4. Copy seluruh kode dari Code.gs ke editor

5. Deploy as Web App:
   - Click Deploy → New deployment
   - Select type: Web app
   - Description: "KOPASTI Member API"
   - Execute as: Me
   - Who has access: Anyone
   - Click Deploy

6. Copy Web App URL (format: https://script.google.com/macros/s/.../exec)

7. Paste URL ke frontend/src/utils/api.js pada variabel API_BASE_URL

## Testing Endpoints

GET all members:
https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec

GET single member:
https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec?id=a1b2c3d4

GET with search:
https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec?q=Budi

GET with filters:
https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec?angkatan=2024&satuan_terminal=Terminal%20Purwokerto

GET with pagination:
https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec?limit=10&offset=0
