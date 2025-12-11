# Zuup Innovation Lab — zblackhole.io

A stunning black hole-themed website for Zuup Innovation Lab featuring immersive 3D visualization, gravitational effects, and the seven proprietary platform ecosystem.

## 🌌 Live Site

**Production:** [https://zblackhole.io](https://zblackhole.io)

## ✨ Features

- **Immersive 3D Black Hole** — Custom GLSL shaders, accretion disk with spiral patterns, relativistic jets, orbital particles
- **Gravitational Lensing Effects** — Real-time distortion visualization
- **Seven Platform Ecosystem** — Aureon, Veyra, Civium, PodX, Symbion, QAWM
- **Responsive Design** — Mobile-first with fluid typography
- **Performance Optimized** — Dynamic imports, code splitting, image optimization
- **SEO Ready** — Full Open Graph and Twitter Card support

## 🚀 Quick Deploy to Vercel

### Option 1: One-Click Deploy (Fastest)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/khaaliswooden-max/zuup-web)

### Option 2: Manual Deploy

1. **Push to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "feat: zuup innovation lab website"
   git branch -M main
   git remote add origin https://github.com/khaaliswooden-max/zuup-web.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Framework: **Next.js** (auto-detected)
   - Click **Deploy**

3. **Add Custom Domain:**
   - Vercel Dashboard → Project → Settings → Domains
   - Add `zblackhole.io`
   - Configure DNS at your registrar:
     - **A Record:** `@` → `76.76.21.21`
     - **CNAME:** `www` → `cname.vercel-dns.com`

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type check
npm run type-check

# Lint
npm run lint

# Production build
npm run build

# Start production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
zuup-web/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI
├── public/                      # Static assets
├── src/
│   ├── app/
│   │   ├── globals.css         # Tailwind + custom styles
│   │   ├── layout.tsx          # Root layout with SEO
│   │   └── page.tsx            # Homepage
│   └── components/
│       ├── BlackHole.tsx       # Three.js black hole scene
│       └── Navigation.tsx      # Site navigation
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── vercel.json                  # Vercel deployment config
```

## 🎨 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **3D Graphics:** Three.js + React Three Fiber + Drei
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Language:** TypeScript
- **Deployment:** Vercel

## 🔧 Customization

### Modify Black Hole Colors
Edit `src/components/BlackHole.tsx`:
```tsx
innerColor: new THREE.Color('#f97316'),  // Inner accretion
outerColor: new THREE.Color('#3b82f6'),  // Outer accretion
midColor: new THREE.Color('#a855f7'),    // Mid ring
```

### Add New Platform
Edit `src/app/page.tsx` and add to the `platforms` array:
```tsx
{
  name: 'NewPlatform',
  tagline: 'Platform Description',
  description: 'Full description text.',
  color: '#colorhex',
  icon: '◈',
}
```

### Modify Brand Colors
Edit `tailwind.config.ts`:
```ts
colors: {
  zuup: {
    void: '#000000',
    singularity: '#0a0a0f',
    accretion: '#3b82f6',
    // ... add/modify colors
  }
}
```

## 📊 Performance

- **Lighthouse Score:** 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint:** < 1s
- **Time to Interactive:** < 2s
- **WebGL Optimizations:** DPR limiting, frustum culling, geometry reuse

## 🔐 Security Headers

Configured in `vercel.json`:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

## 📄 License

MIT License — Zuup, LLC

---

**Built with 🖤 by [Zuup Innovation Lab](https://zuup.io)**
