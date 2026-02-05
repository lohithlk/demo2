# 🎯 AccelUAV Vercel + Railway Setup Summary

## ✅ What's Been Configured

Your project is now ready to deploy with:
- **Frontend**: Vercel (React + Vite SPA)
- **Backend & Assets**: Railway (Node.js API + static files)

### Files Created/Updated:

| File | Purpose |
|------|---------|
| `.env.local` | Local development config (localhost API) |
| `.env.production` | Production config (Railway API URL) |
| `vercel.json` | Vercel deployment settings |
| `Procfile` | Railway start command |
| `DEPLOYMENT_GUIDE.md` | Step-by-step deployment instructions |
| `DEPLOYMENT_CHECKLIST.md` | Pre-flight checklist |

---

## 🚀 Quick Start (3 Steps)

### Step 1: Test Locally
```bash
# Install dependencies
npm install

# Run frontend + backend together
npm run dev:all

# Visit http://localhost:3000
# All assets load from http://localhost:5000/api
```

### Step 2: Deploy Backend to Railway
```
1. Push code to GitHub
2. Go to railway.app → New Project
3. Connect your GitHub repo
4. Set environment variables:
   - PORT=3000
   - NODE_ENV=production
5. Deploy!
6. Copy your Railway URL: https://xxx.railway.app
```

### Step 3: Deploy Frontend to Vercel
```
1. Go to vercel.com → New Project
2. Import your GitHub repo
3. Set environment variable:
   - VITE_API_URL=https://xxx.railway.app/api
   - GEMINI_API_KEY=your_key
4. Deploy!
5. Your site is live at: https://xxx.vercel.app
```

---

## 📂 Asset Locations

All assets are requested through the API config:

```typescript
// api-config.ts
export const getModelUrl = (name) => `${VITE_API_URL}/models/${name}`
export const getImageUrl = (name) => `${VITE_API_URL}/images/${name}`
export const getVideoUrl = (name) => `${VITE_API_URL}/videos/${name}`
```

| Asset Type | Files Location | Served From |
|------------|---|---|
| **3D Models** | `public/3d-model/*.glb` | `https://railway.app/api/models/*` |
| **Images** | `public/images/*` | `https://railway.app/api/images/*` |
| **Videos** | `public/*.mp4` | `https://railway.app/api/videos/*` |

---

## 🔧 Environment Variables

### Development (.env.local)
```env
VITE_API_URL=http://localhost:5000/api
GEMINI_API_KEY=your_key
```

### Production (Vercel + Railway)
```env
VITE_API_URL=https://YOUR_RAILWAY_URL.railway.app/api
GEMINI_API_KEY=your_key
```

---

## 🧪 Testing Checklist

After deployment, verify:

```bash
# ✅ Backend is running
curl https://YOUR_RAILWAY_URL.railway.app/api/health
# Expected: {"status":"ok","message":"AccelUAV backend is running"}

# ✅ 3D Models load
curl -I https://YOUR_RAILWAY_URL.railway.app/api/models/vinaashak.glb
# Expected: 200 OK

# ✅ Images load
curl -I https://YOUR_RAILWAY_URL.railway.app/api/images/vinashak.png
# Expected: 200 OK

# ✅ Videos load
curl -I https://YOUR_RAILWAY_URL.railway.app/api/videos/background-video.mp4
# Expected: 200 OK with Accept-Ranges: bytes

# ✅ Frontend loads
curl https://YOUR_VERCEL_URL
# Expected: HTML with no console errors
```

---

## 🎨 Components Using Assets

These components automatically load from Railway:

| Component | Asset Type | File Names |
|-----------|-----------|-----------|
| **ProductShowcase.tsx** | 3D Models | vinaashak.glb, ace2.glb, etc. |
| **ProductShowcase.tsx** | Images | vinashak.png, ace-iv.png, etc. |
| **Hero.tsx** | Video | background-video.mp4 |
| **GeographicalData.tsx** | 3D Model | odm_textured_model_geo.glb |

---

## 📊 Architecture Diagram

```
┌─────────────────────────────────────────────────┐
│        BROWSER (User)                           │
│  Visits: https://acceluav.vercel.app           │
└──────────────┬──────────────────────────────────┘
               │ HTTP Requests
               ↓
    ┌──────────────────────────┐
    │  VERCEL (Frontend)       │
    │  ✓ React SPA             │
    │  ✓ Vite Bundle           │
    │  ✓ Automatic HTTPS       │
    │  ✓ CDN Distributed       │
    └──────────────┬───────────┘
                   │ API Calls
                   ↓
    ┌─────────────────────────────────────────┐
    │  RAILWAY (Backend + Assets)             │
    │  ✓ Node.js/Express                      │
    │  ✓ /api/models/*   (3D models)         │
    │  ✓ /api/images/*   (Images)            │
    │  ✓ /api/videos/*   (Videos)            │
    │  ✓ Automatic HTTPS                      │
    │  ✓ Auto-scaling                         │
    └─────────────────────────────────────────┘
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Frontend won't build on Vercel | Check `VITE_API_URL` env var is set |
| Assets return 404 | Ensure files are in `public/` and committed |
| CORS errors | Backend already has CORS enabled |
| Video doesn't play | Check `background-video.mp4` exists in `public/` |
| 3D models are blank | Verify `.glb` files tracked with Git LFS |

See `DEPLOYMENT_GUIDE.md` for detailed troubleshooting.

---

## 📝 Configuration Files Summary

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "VITE_API_URL": "@vite_api_url"  // Set in Vercel dashboard
  },
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }  // Single Page App routing
  ]
}
```

### Procfile
```
web: node backend/server.js
```

### api-config.ts
```typescript
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getModelUrl = (name) => `${API_BASE_URL}/models/${name}`;
export const getImageUrl = (name) => `${API_BASE_URL}/images/${name}`;
export const getVideoUrl = (name) => `${API_BASE_URL}/videos/${name}`;
```

---

## 🎓 Next Steps

After successful deployment:

1. **Custom Domain** (optional)
   - Add domain in Vercel settings
   - Update Railway custom domain if needed

2. **Monitoring**
   - Set up error tracking (Sentry, etc.)
   - Monitor performance (Vercel Analytics)

3. **Optimization**
   - Enable image optimization on Vercel
   - Compress 3D models if large
   - Cache longer-lived assets

4. **CI/CD**
   - Both Vercel & Railway auto-redeploy on push
   - No additional setup needed!

---

## 📚 Documentation Links

- [Vercel Docs](https://vercel.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Vite Docs](https://vitejs.dev)
- [Express Docs](https://expressjs.com)

---

## ✨ You're All Set!

Your AccelUAV application is configured and ready to deploy to production with:
- ✅ Global frontend distribution
- ✅ Reliable backend API
- ✅ Centralized asset management
- ✅ Automatic scaling
- ✅ HTTPS everywhere

Follow the instructions in `DEPLOYMENT_GUIDE.md` and `DEPLOYMENT_CHECKLIST.md` to deploy!

---

**Questions?** Review the deployment guides or check platform documentation.
