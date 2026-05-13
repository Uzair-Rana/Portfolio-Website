# Uzair Portfolio

Static portfolio built with React, Vite, Tailwind CSS, and Framer Motion. Optimized for Vercel deployment.

## Profile

- Name: M. Uzair Anjum
- Title: Junior Full-Stack Developer (React | Django | PostgreSQL)
- Location: Lahore, Pakistan
- Email: uzairanjummrana@gmail.com
- GitHub: https://github.com/Uzair-Rana

## Development

1. Install dependencies

```bash
npm install
```

2. Run locally

```bash
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deployment (Vercel)

Option A: Import the repository in Vercel. Vercel auto-detects Vite.

Option B: CLI

```bash
vercel
```

Settings

- Framework: Vite
- Build command: npm run build
- Output directory: dist
- Clean URLs: enabled

## Customization

- Replace the CV file: add `public/cv/M_Uzair_Anjum_CV.pdf`.
- Update images by editing files in `src/sections`.
- Modify skills in `src/data/skills.js`.

## Structure

- index.html
- src/
  - components/
  - sections/
  - pages/
  - data/
  - main.jsx
  - App.jsx
- tailwind.config.js
- postcss.config.js
- vercel.json
