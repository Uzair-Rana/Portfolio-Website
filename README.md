# M. Uzair Anjum — Portfolio

A modern, production-ready personal portfolio built with **React + Vite + Tailwind CSS**, featuring a full CMS, password-protected settings, real-time email, and 3D animations.

---

## What's Inside

### Tech Stack
- **React 19** + **Vite 7** — fast dev & optimized production builds
- **Tailwind CSS 3** — utility-first styling
- **Framer Motion** — 3D animations, scroll reveals, spring physics
- **React Router v6** — multi-page routing with lazy loading
- **EmailJS** — real-time contact form email delivery (no backend needed)

---

### Pages & Sections

| Route | Description |
|---|---|
| `/` | Home — Hero, About, Skills, Experience, Projects, Education, Certifications |
| `/projects/:slug` | Full project detail page |
| `/experience/:slug` | Full experience detail page |
| `/education/:slug` | Full education detail with FYP section |
| `/certifications/:slug` | Full certification detail page |
| `/contact` | Contact form with EmailJS integration |

---

### Key Features

**Portfolio Sections**
- **Hero** — Animated name gradient, profile photo, live "Open to Work" badge, dynamic stat pills (project count auto-updates)
- **About** — Bio, contact info, 4 strength cards with 3D tilt animation
- **Skills** — Animated progress bars + 6 expandable expertise cards (click to reveal details)
- **Experience** — Timeline cards linking to full detail pages
- **Projects** — 3 live projects (Search Atlas, AetherMuse.ai, EngineHire) with mouse-tracking 3D cards
- **Education** — BS CS degree card + Final Year Project (Cryptocurrency Analysis & Prediction)
- **Certifications** — Alternating slide-in 3D animations

**CMS — Password-Protected Settings Panel (⚙ gear icon in navbar)**
- Edit profile name, photo, title, bio, contact info
- Toggle "Open to Work" badge on profile image
- Toggle availability status and stats display
- Switch between 6 color themes live
- Add / edit / delete projects with full descriptions and bullet points
- Add / edit / delete experience entries
- Add / edit / delete certifications
- Password protection — must set a password on first open; all changes require correct password
- All data persists to `localStorage` — survives page refresh

**Performance**
- Code-split into 10 lazy-loaded chunks — initial JS under 85KB gzip
- No `backdrop-filter` on cards (GPU-safe)
- CSS-only skill bar animations
- `will-change` hints on background blobs
- `fetchpriority="high"` on profile image (LCP optimization)
- Scroll-to-top on every route change

**Animations**
- Hero name shimmer gradient (CSS `background-position` animation)
- Section headings: 3D `rotateX` entry
- About strength cards: 3D tilt on hover (`rotateY + rotateX`)
- Project cards: mouse-tracking 3D with spring physics
- Experience cards: slide from left with `rotateY`
- Education cards: slide from right with `rotateY`
- Certifications: alternating left/right with 3D flip
- Navbar links: staggered fade-down on mount

---

### Live Projects Featured

| Project | Role | Stack |
|---|---|---|
| [Search Atlas](https://searchatlas.com/) | Django Developer | Django, GraphQL, LangGraph, MCP, PostgreSQL |
| [AetherMuse.ai](https://aethermuse.ai/) | Backend Developer | Django, Twilio, ElevenLabs, PostgreSQL |
| [EngineHire](https://enginehire.io) | Full-Stack Developer | Django, Vue.js, PostgreSQL |

---

### Email Setup (for contact form)

1. Create a free account at [emailjs.com](https://emailjs.com)
2. Add Gmail service → copy **Service ID**
3. Create email template → copy **Template ID**
4. Copy your **Public Key**
5. Fill in `.env`:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

6. On Vercel: add the same 3 variables under **Settings → Environment Variables**

---

### Running Locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build
npm run preview    # preview production build
```

---

### Deployment (Vercel)

```bash
# Push to GitHub
git add .
git commit -m "deploy"
git push origin main
```

Vercel auto-deploys on every push to `main`. Set the 3 EmailJS env vars in the Vercel dashboard.

> **Note:** The `.env` file is gitignored. Never commit it.

---

Built by **M. Uzair Anjum** — Full Stack Engineer, Lahore, Pakistan  
[GitHub](https://github.com/Uzair-Rana) · [Email](mailto:uzairanjummrana@gmail.com)
