# 🚀 AccelUAV Deployment Guide: Vercel + Railway

This guide walks you through hosting the AccelUAV frontend on **Vercel** and backend assets on **Railway**.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                   FRONTEND (React + Vite)               │
│                   Hosted on Vercel                       │
│                  vercel.com/your-domain                 │
└────────────────────┬────────────────────────────────────┘
                     │ API Calls
                     ↓
┌─────────────────────────────────────────────────────────┐
│     BACKEND (Node.js/Express) + Static Assets           │
│              Hosted on Railway                           │
│     your-railway-app.railway.app/api                    │
│                                                           │
│  ├─ /api/models/* (3D GLB files)                       │
│  ├─ /api/images/* (Product images)                     │
│  └─ /api/videos/* (Background video)                   │
└─────────────────────────────────────────────────────────┘
```

---

## Part 1: Deploy Backend & Assets to Railway

### Step 1: Prepare Your Repository

1. Ensure your Git repository includes:
   - ✅ `backend/server.js`
   - ✅ `public/3d-model/*.glb` (3D models)
   - ✅ `public/images/*` (Product images)
   - ✅ `public/*` (Videos, including `background-video.mp4`)
   - ✅ `package.json`
   - ✅ `Procfile`

2. Make sure Git Large File Storage (LFS) is configured for large files:
   ```bash
   # Check .gitattributes
   cat .gitattributes
   ```
   Should include:
   ```
   *.glb filter=lfs diff=lfs merge=lfs -text
   *.mp4 filter=lfs diff=lfs merge=lfs -text
   ```

3. If not present, add:
   ```bash
   git lfs track "*.glb"
   git lfs track "*.mp4"
   git add .gitattributes
   ```

### Step 2: Create Railway Project

1. Visit [Railway.app](https://railway.app)
2. Sign up / Log in with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Connect your GitHub account and select your repository
6. Choose the branch to deploy

### Step 3: Configure Environment Variables

In Railway Dashboard:

1. Go to your project → **Variables**
2. Add these variables:
   ```
   PORT=3000
   NODE_ENV=production
   ```

3. Click **"Deploy"**

### Step 4: Get Your Railway URL

After deployment completes:
1. Go to **Deployments**
2. Your URL will be like: `https://your-railway-app.railway.app`
3. Test it: `https://your-railway-app.railway.app/api/health`
   - Should return: `{"status":"ok","message":"AccelUAV backend is running"}`

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Connect GitHub Repository

1. Visit [Vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"New Project"**
4. Select your AccelUAV repository
5. Click **"Import"**

### Step 2: Configure Vercel Environment

In the environment settings:

1. **Framework Preset**: Vite (should auto-detect)
2. **Build Command**: `npm run build`
3. **Output Directory**: `dist`
4. **Install Command**: `npm install`

### Step 3: Set Environment Variables

Add this in **Environment Variables**:

```
VITE_API_URL=https://your-railway-app.railway.app/api
GEMINI_API_KEY=your_actual_gemini_key_here
```

Replace `your-railway-app.railway.app` with your actual Railway URL!

### Step 4: Deploy

Click **"Deploy"**

Wait for the build to complete. Your frontend will be live at something like:
```
https://your-domain.vercel.app
```

---

## Part 3: Verify Everything Works

### Test from Vercel Frontend

1. Visit your Vercel URL
2. Open **Browser DevTools** (F12)
3. Go to **Network** tab
4. Check that asset requests go to Railway:
   - Models from: `https://your-railway-app.railway.app/api/models/*`
   - Images from: `https://your-railway-app.railway.app/api/images/*`
   - Videos from: `https://your-railway-app.railway.app/api/videos/*`

### Quick Health Checks

```bash
# Check backend is running
curl https://your-railway-app.railway.app/api/health

# Check model can be fetched
curl -I https://your-railway-app.railway.app/api/models/vinaashak.glb

# Check image can be fetched
curl -I https://your-railway-app.railway.app/api/images/vinashak.png

# Check video can be fetched
curl -I https://your-railway-app.railway.app/api/videos/background-video.mp4
```

---

## Part 4: Configuration Reference

### Frontend Configuration (.env.production)
```
VITE_API_URL=https://your-railway-app.railway.app/api
GEMINI_API_KEY=your_key
```

### Backend Configuration (Railway)
- Uses `Procfile` to start with: `node backend/server.js`
- Port automatically assigned by Railway (typically 3000)
- All assets served from `public/` directory
- CORS enabled for all origins

---

## Common Issues & Solutions

### ❌ Assets Return 404
**Problem**: Images/models not found in Railway
- **Solution**: Ensure files are in `public/` directory and committed to Git
- Check Git LFS is tracking `.glb` and `.mp4` files

### ❌ CORS Errors in Browser
**Problem**: "Access to XMLHttpRequest blocked by CORS policy"
- **Solution**: Ensure `Access-Control-Allow-Origin: *` header is set in backend (already configured)
- Clear browser cache (Ctrl+Shift+Del)

### ❌ Video Won't Play
**Problem**: Background video shows blank
- **Solution**: 
  1. Check file exists: `public/background-video.mp4`
  2. Verify mime type: `video/mp4`
  3. Test direct URL: `https://your-railway-app.railway.app/api/videos/background-video.mp4`

### ❌ 3D Models Don't Load
**Problem**: Model viewer shows blank
- **Solution**:
  1. Ensure `.glb` files are pushed with Git LFS
  2. Check file extensions match in code
  3. Test with: `curl -I https://your-railway-app.railway.app/api/models/vinaashak.glb`

### ❌ Vercel Build Fails
**Problem**: Build error on Vercel
- **Solution**: 
  1. Check environment variables are set
  2. Ensure Node version is compatible (npm run build locally first)
  3. Check file paths are correct

---

## Monitoring & Logs

### View Railway Logs
1. Railway Dashboard → Your Project
2. Click **"Deployments"** tab
3. Select latest deployment
4. View **"Build Logs"** or **"Runtime Logs"**

### View Vercel Logs
1. Vercel Dashboard → Your Project
2. Click **"Deployments"**
3. Select latest deployment
4. View build output

---

## Next Steps

✅ **Deployment Complete!** Your AccelUAV application is now:
- **Frontend**: Globally distributed on Vercel CDN
- **Backend & Assets**: Running on Railway with static file serving

### Consider Adding:
- [ ] Custom domain (both Vercel & Railway support this)
- [ ] SSL certificate (automatic on both platforms)
- [ ] Analytics tracking
- [ ] Error monitoring (e.g., Sentry)
- [ ] Performance monitoring

---

## Quick Reference URLs

| Component | URL | Updated |
|-----------|-----|---------|
| Frontend | `https://your-domain.vercel.app` | Deploy to Vercel |
| API Base | `https://your-railway-app.railway.app/api` | In .env.production |
| Health Check | `https://your-railway-app.railway.app/api/health` | Test connectivity |

---

## Support

For issues with:
- **Vercel**: Visit [vercel.com/docs](https://vercel.com/docs)
- **Railway**: Visit [docs.railway.app](https://docs.railway.app)
- **Your specific setup**: Check logs and traces above
