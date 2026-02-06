# Frontend Deployment

## Local Development

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Configure API:
   - Edit src/utils/api.js
   - Replace API_BASE_URL with your Apps Script Web App URL

3. Run development server:
```bash
npm run dev
```

4. Open http://localhost:3000

## Build for Production

```bash
npm run build
```

Output in `dist/` folder.

## Deploy to Vercel

1. Push to GitHub repository
2. Import project in Vercel
3. Configure:
   - Framework Preset: Vite
   - Root Directory: frontend
   - Build Command: npm run build
   - Output Directory: dist
4. Deploy

## Deploy to Netlify

1. Push to GitHub repository
2. New site from Git
3. Configure:
   - Base directory: frontend
   - Build command: npm run build
   - Publish directory: frontend/dist
4. Deploy

## Environment Variables

No environment variables needed - API URL is in source code.
For production, consider using environment variables:

1. Create .env file:
```
VITE_API_BASE_URL=https://script.google.com/macros/s/.../exec
```

2. Update api.js:
```javascript
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
```

## Custom Domain

Configure custom domain in hosting provider dashboard.
