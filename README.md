# Avior Watches — Rolex Day-Date 40 Landing Page

A scroll-driven luxury watch product landing page built with Next.js 15, React 19, and Framer Motion. Features canvas-based video frame scrubbing with hardware-accelerated animations and responsive design.

## Features

- 🎬 **Canvas-Driven Frame Scrubbing** — Preloaded JPEG frames synced to scroll progress using requestAnimationFrame
- ✨ **Staggered Animations** — Framer Motion scroll-triggered fade-ins throughout the page
- 🎨 **Luxury Design** — Everose gold accents, Playfair Display typography, premium spacing and contrast
- 📱 **Fully Responsive** — Mobile-first grid layouts, fluid typography with CSS clamp()
- ⚡ **Performance Optimized** — No video element, device pixel ratio scaling, optimized image delivery

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Prepare Video Assets (Required)

Before running the dev server, you must generate video frames from your hero.mp4 file.

#### Step A: Extract Video Frames

If you have `hero.mp4`, run:

```bash
ffmpeg -i hero.mp4 -vf "fps=24,scale=1920:-1" -q:v 3 "public/frames/frame_%04d.jpg"
```

This extracts all frames as JPEGs (1920px wide) into `public/frames/`.

#### Step B: Update Frame Count

Count the generated frames:

```bash
ls public/frames/ | wc -l
```

Open [app/components/ScrollHero.tsx](app/components/ScrollHero.tsx) and update line 7:

```typescript
const FRAME_COUNT = 96; // Replace 96 with your actual frame count
```

Save the file and the hero will automatically scrub through your video on scroll.

### 3. Run Development Server

```bash
npm run dev
```

Navigate to `http://localhost:3000` and scroll to see the watch deconstruction in action.

## Project Structure

```
app/
├── components/
│   ├── ScrollHero.tsx          # Canvas frame scrubber + overlay
│   ├── FeaturesSection.tsx     # 6 feature cards with icons
│   ├── SpecsSection.tsx        # 2-column specs table
│   └── ClosingCTA.tsx          # Closing section with CTA button
├── globals.css                 # Global styles and reset
├── layout.tsx                  # Root layout with fonts
└── page.tsx                    # Main page composition
public/
└── frames/                     # Extracted video frames (JPEG)
```

## Design Tokens

All colors, fonts, and spacing follow the luxury brand guidelines:

- **Background** — `#000000` (pure black)
- **Text Primary** — `#ffffff` (pure white)
- **Text Secondary** — `#E5E5E5` (off-white)
- **Accent (Everose Gold)** — `#C8A96E`
- **Accent Hover** — `#E8C98E`
- **Dim Text** — `#888888` (minimum for contrast on black)
- **Display Font** — Playfair Display (weight 400, 500)
- **Body Font** — Inter (weight 300, 400, 500)

## Deployment

### Deploy to Vercel

1. Push your project to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/avior-watches.git
git push -u origin main
```

2. Visit [vercel.com](https://vercel.com), sign in with GitHub, and import your repository.

3. Vercel will auto-detect Next.js and configure the build. No additional env variables needed.

4. Deploy. Your site will be live at `avior-watches.vercel.app`.

**Note:** Ensure `public/frames/` directory is committed to Git so frames are available in production.

## Development

### Build for Production

```bash
npm run build
npm start
```

### Lint & Type Check

```bash
npm run lint
npx tsc --noEmit
```

## Technology Stack

- **Framework** — Next.js 15 (App Router)
- **UI Library** — React 19
- **Animations** — Framer Motion 11
- **Typography** — Next.js Google Fonts (Playfair Display, Inter)
- **Styling** — CSS-in-JS via Framer Motion + inline styles
- **Deployment** — Vercel

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari 14+ (iOS 14+)

Canvas and requestAnimationFrame are required.

## Performance Notes

- Frames are preloaded in the background and drawn to canvas
- Device pixel ratio scaling ensures crisp display on high-DPI screens
- Framer Motion's `useInView` hook triggers animations only when elements are visible
- No scroll event listeners — all animation timing driven by requestAnimationFrame
- Images are served from `public/` with optimal caching headers on Vercel

## Customization

### Change Watch Details

Edit [app/components/ScrollHero.tsx](app/components/ScrollHero.tsx):
- Line 47: Watch name and subtitle
- Line 71: Brand copy and description

Edit [app/components/SpecsSection.tsx](app/components/SpecsSection.tsx):
- Lines 9–20: Update specs array with your watch data

Edit [app/components/FeaturesSection.tsx](app/components/FeaturesSection.tsx):
- Lines 7–67: Update features array with your product features

### Change Colors

Update the design tokens in each component (search for `#C8A96E`, `#E5E5E5`, etc.).

## Troubleshooting

**Frames not loading?**
- Check that `public/frames/frame_0001.jpg` exists
- Verify frame count matches `FRAME_COUNT` in ScrollHero.tsx
- Check browser console for 404 errors

**Animation stuttering?**
- Disable browser extensions that modify the page
- Check that frame images are optimized (JPEG quality 3 should be ~100–150 KB each)
- Try reducing `FRAME_COUNT` temporarily to diagnose

**Vercel deployment failing?**
- Ensure `.gitignore` is not excluding `public/frames/`
- Check Vercel build logs for missing dependencies
- Verify Node.js version is 18+

## License

This template is open source. Rolex is a registered trademark of Rolex SA.

## Questions?

Refer to the step-by-step guide above or consult the Next.js documentation at [nextjs.org](https://nextjs.org).
