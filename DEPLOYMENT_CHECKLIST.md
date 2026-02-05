# 📋 AccelUAV Deployment Checklist

## Pre-Deployment Setup ✓

### Local Development
- [ ] Clone repository locally
- [ ] Run `npm install`
- [ ] Set up `.env.local` with local API URL
- [ ] Test locally: `npm run dev:all`
- [ ] Verify 3D models, images, and videos load in browser

### Git & LFS Setup
- [ ] Install Git LFS: `git lfs install`
- [ ] Track files: `git lfs track "*.glb" "*.mp4"`
- [ ] Commit `.gitattributes`
- [ ] Push all assets to GitHub

### GitHub Repository
- [ ] Repository is public or connected account has access
- [ ] All `public/` files are committed (especially 3D models and videos)
- [ ] `.gitattributes` is committed for LFS tracking

---

## Railway Deployment ✓

### Create Railway Project
- [ ] Sign up at [railway.app](https://railway.app)
- [ ] Create new project from GitHub repo
- [ ] Select correct branch (usually `main`)
- [ ] Wait for first deployment to complete

### Configure Railway
- [ ] Set `PORT=3000` environment variable
- [ ] Set `NODE_ENV=production` (optional)
- [ ] Check deployment logs for errors
- [ ] Copy Railway URL: `https://xxx.railway.app`
- [ ] Test health endpoint: `curl https://xxx.railway.app/api/health`

### Verify Assets on Railway
- [ ] Test 3D model: `curl -I https://xxx.railway.app/api/models/vinaashak.glb`
- [ ] Test image: `curl -I https://xxx.railway.app/api/images/vinashak.png`
- [ ] Test video: `curl -I https://xxx.railway.app/api/videos/background-video.mp4`

---

## Vercel Deployment ✓

### Setup Vercel Project
- [ ] Sign up at [vercel.com](https://vercel.com)
- [ ] Create new project from GitHub repo
- [ ] Select correct branch
- [ ] Choose Vite as framework

### Configure Environment Variables
- [ ] Set `VITE_API_URL=https://YOUR_RAILWAY_URL.railway.app/api`
- [ ] Set `GEMINI_API_KEY=your_key_here`
- [ ] Double-check Railway URL (copy from previous step)
- [ ] Deploy

### Verify Frontend
- [ ] Wait for build to complete
- [ ] Visit Vercel URL in browser
- [ ] Open DevTools → Network tab
- [ ] Check that API calls go to Railway (not localhost)
- [ ] Verify 3D model viewer loads
- [ ] Verify background video plays
- [ ] Verify product images load

---

## Post-Deployment ✓

### Testing
- [ ] Frontend loads without errors
- [ ] All navigation works
- [ ] 3D models render in ProductShowcase
- [ ] Background hero video plays
- [ ] No CORS errors in console
- [ ] API health check passes

### Performance
- [ ] Page loads in < 3 seconds
- [ ] 3D models load smoothly
- [ ] Videos buffer properly
- [ ] No 404 errors in console

### Production URLs
- [ ] Frontend: `https://YOUR_VERCEL_URL`
- [ ] API: `https://YOUR_RAILWAY_URL.railway.app/api`
- [ ] Both are accessible from anywhere

---

## Rollback Plan 🔄

If something goes wrong:

1. **Frontend Issue**: Revert commit in GitHub, Vercel auto-redeploys
2. **Backend Issue**: 
   ```bash
   # Redeploy from Railway dashboard
   # Or push fix and Railway auto-redeploys
   git push origin main
   ```
3. **Wrong API URL**: Update environment variable in both platforms

---

## Getting Help

| Issue | Check |
|-------|-------|
| 404 on assets | Files exist in `public/` and Git LFS is tracking them |
| CORS errors | Backend has `cors()` middleware enabled |
| Video not playing | File is `.mp4`, path is correct in code |
| Build fails | All dependencies installed, Node version compatible |
| API not reachable | Railway is deployed and running, URL is correct |

---

## Final Verification

Before calling deployment complete:

```bash
# Test from anywhere (replace URLs)
curl https://YOUR_RAILWAY_URL.railway.app/api/health
echo "✓ Backend is running"

# In browser, check Network tab shows:
# api.railway.app/api/models/*
# api.railway.app/api/images/*
# api.railway.app/api/videos/*
echo "✓ Assets loading from Railway"

# Verify frontend loads without console errors
echo "✓ Frontend is stable"
```

---

✅ **Setup Complete!** Deploy with confidence.
