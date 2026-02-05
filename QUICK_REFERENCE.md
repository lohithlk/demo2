# 💳 Vercel + Railway Deployment Quick Reference

## 🎯 30-Second Overview

| Component | Host | URL |
|-----------|------|-----|
| React Frontend | **Vercel** | `https://your-site.vercel.app` |
| Node.js Backend + Assets | **Railway** | `https://your-app.railway.app` |

---

## 🚀 Deployment Sequence

```
1. Push code to GitHub (includes public/3d-model, public/images, public/background-video.mp4)
   ↓
2. Create Railway project from GitHub repo
   ├─ Wait for deployment
   ├─ Copy URL: https://YOUR_RAILWAY_URL.railway.app
   └─ Test: curl https://YOUR_RAILWAY_URL.railway.app/api/health
   ↓
3. Create Vercel project from same repo
   ├─ Set VITE_API_URL = YOUR_RAILWAY_URL.railway.app/api
   ├─ Set GEMINI_API_KEY = your_key
   └─ Deploy!
   ↓
✅ Live at https://YOUR_VERCEL_URL
```

---

## ⚙️ Critical Environment Variables

### In Vercel Dashboard:
```
VITE_API_URL=https://YOUR_RAILWAY_URL.railway.app/api
GEMINI_API_KEY=your_gemini_api_key
```

### In Railway Dashboard:
```
PORT=3000
NODE_ENV=production
```

---

## 📦 What Gets Hosted Where

```
VERCEL (Frontend)               RAILWAY (Backend)
├─ index.html                   ├─ server.js
├─ JavaScript bundle            ├─ package.json
├─ CSS                          ├─ backend/routes
└─ public/favicon               ├─ public/3d-model/
                                ├─ public/images/
                                └─ public/videos/
```

---

## 🔗 API Endpoints (Automatic)

All of these automatically work when you set `VITE_API_URL`:

```
GET https://railway.app/api/models/vinaashak.glb
GET https://railway.app/api/images/vinashak.png
GET https://railway.app/api/videos/background-video.mp4
GET https://railway.app/api/health
```

---

## ✅ Pre-Deployment Checklist

- [ ] `backend/server.js` exists
- [ ] `public/3d-model/*.glb` files exist
- [ ] `public/images/*.png` files exist
- [ ] `public/background-video.mp4` exists
- [ ] `.gitattributes` tracks *.glb and *.mp4 with LFS
- [ ] All files pushed to GitHub
- [ ] GitHub account can be connected to Vercel & Railway

---

## 🧪 Post-Deployment Tests

```bash
# Test 1: API Health
curl https://YOUR_RAILWAY_URL.railway.app/api/health
# ✓ Should return: {"status":"ok",...}

# Test 2: Assets Available
curl -I https://YOUR_RAILWAY_URL.railway.app/api/models/vinaashak.glb
# ✓ Should return: 200 OK

# Test 3: Frontend Loads
curl https://YOUR_VERCEL_URL
# ✓ Should return: HTML page

# Test 4: Frontend → Backend Communication
# Open YOUR_VERCEL_URL in browser
# DevTools → Network tab
# ✓ Should see requests to YOUR_RAILWAY_URL
```

---

## 🛠️ Common Commands

### Vercel
```bash
npm install -g vercel          # Install CLI
vercel login                   # Login
vercel deploy                  # Deploy from CLI
vercel env list                # Check env vars
```

### Railway
```bash
# Via Dashboard at railway.app (recommended)
# No CLI needed for basic deployment
```

---

## 📊 What Each File Does

| File | Purpose |
|------|---------|
| `vercel.json` | Tells Vercel how to build and deploy |
| `Procfile` | Tells Railway how to start server |
| `.env.local` | Local dev API URL (http://localhost) |
| `.env.production` | Production API URL (https://railway.app) |
| `api-config.ts` | Centralized API URL configuration |
| `backend/server.js` | Node.js Express app |

---

## 🎯 Railway Setup Steps

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize GitHub
5. Select your repo
6. Add environment variables
7. Click "Deploy"

---

## 🎯 Vercel Setup Steps

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your repo
4. Framework: Vite (auto-detected)
5. Add environment variables
6. Click "Deploy"

---

## ❌ If Something Goes Wrong

| Error | Fix |
|-------|-----|
| Build fails on Vercel | Check env vars, run `npm run build` locally first |
| Assets 404 on Railway | Verify files in `public/`, check Git LFS tracking |
| CORS error | Shouldn't happen - backend has CORS enabled |
| Wrong API called | Verify `VITE_API_URL` env var in Vercel |
| Video won't play | Confirm `background-video.mp4` in `public/` |

---

## 📍 Key URLs to Remember

**Save these after deployment:**

```
Frontend: https://YOUR_VERCEL_URL
API: https://YOUR_RAILWAY_URL.railway.app/api
Health: https://YOUR_RAILWAY_URL.railway.app/api/health
```

---

## ⏱️ Expected Times

| Task | Time |
|------|------|
| Push to GitHub | 1 min |
| Railway build & deploy | 3-5 min |
| Vercel build & deploy | 3-5 min |
| **Total** | **10-15 min** |

---

## 🎓 Environment Variable Priority

```
1. Vercel Dashboard (Production)
   ↓ HIGHEST PRIORITY
2. .env.production file
   ↓
3. .env.local file (dev only)
   ↓
4. Default in code
   ↓ LOWEST PRIORITY
```

---

**TL;DR: Deploy backend → Copy URL → Set in Vercel → Deploy frontend → Done! ✨**
