# GitHub & Vercel Deployment Guide

## Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `avior-watches`
3. Description: "Scroll-driven luxury watch landing page built with Next.js 15, React 19, and Framer Motion"
4. Choose **Public** (for Vercel auto-deployment) or **Private** (if preferred)
5. Do **NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **Create repository**

## Step 2: Push to GitHub

After creating your repository, copy the HTTPS URL and run:

```bash
cd "d:\Avior Watches"
git remote add origin https://github.com/YOUR_USERNAME/avior-watches.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 3: Prepare for Vercel Deployment

### Add Video Frames (Local Only)

Before deploying, you must have extracted video frames in `public/frames/`:

```bash
ffmpeg -i hero.mp4 -vf "fps=24,scale=1920:-1" -q:v 3 "public/frames/frame_%04d.jpg"
```

Update `FRAME_COUNT` in [app/components/ScrollHero.tsx](../app/components/ScrollHero.tsx) (line 7).

Commit the frames:

```bash
git add public/frames/
git commit -m "Add video frames for hero section"
git push
```

## Step 4: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"New Project"** or **"Import Project"**
3. Select **GitHub** as the source
4. Authorize Vercel to access your GitHub account
5. Find and select `avior-watches` repository
6. Vercel auto-detects Next.js — no configuration needed
7. Click **Deploy**

Your site will be live at:
- `avior-watches.vercel.app` (default)
- or a custom domain if you configured one

## Step 5: Custom Domain (Optional)

1. In Vercel Dashboard, go to **Settings** → **Domains**
2. Enter your custom domain (e.g., `aviorwatches.com`)
3. Follow Vercel's DNS setup instructions
4. Wait for DNS propagation (typically 10–48 hours)

## Troubleshooting

### Frames Not Showing in Production

- Ensure `public/frames/` directory is committed to Git
- Check Vercel build logs for missing files
- Verify `FRAME_COUNT` is correct
- Test locally first: `npm run build && npm start`

### Build Fails on Vercel

- Click **Redeploy** in Vercel Dashboard
- Check build logs (click the failing deployment)
- Verify all files are committed (`git status`)
- Ensure Node.js version is 18+ (set in `vercel.json` if needed)

### Site Not Updating After Push

- Wait 1–2 minutes for Vercel to detect new commit
- Check Vercel Dashboard for deployment status
- Force a redeploy by clicking the **Redeploy** button
- Clear browser cache (Ctrl+Shift+Delete)

## Environment Variables (If Needed Later)

To add env variables for Vercel:

1. Vercel Dashboard → **Settings** → **Environment Variables**
2. Add key-value pairs
3. Re-deploy for changes to take effect

For this project, no env variables are required.

## Monitoring & Analytics

After deployment, monitor your site:

- **Vercel Dashboard**: View deployments, errors, and build logs
- **Vercel Analytics**: Track page performance and user metrics
- **GitHub**: Manage code and pull requests

## CI/CD Pipeline

Vercel auto-deploys on every push to `main`:

- Commit to local `main` → Push to GitHub → Vercel auto-builds and deploys
- No additional setup required

## Rollback

To rollback to a previous version:

1. Vercel Dashboard → **Deployments**
2. Click the deployment you want to restore
3. Click **Promote to Production**

Or revert commit locally:

```bash
git revert <commit-hash>
git push
```

---

**Next Steps:**
1. Create GitHub repo
2. Push local code to GitHub
3. Extract and commit video frames
4. Deploy to Vercel
5. Test at `avior-watches.vercel.app`
