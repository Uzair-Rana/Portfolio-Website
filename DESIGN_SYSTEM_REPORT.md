# Cinematic Portfolio — Styling & Animation Report

A full breakdown of the visual language and motion system of this project, written so it can be rebuilt 1:1 in another codebase.

---

## 1. Tech stack

| Layer | Library | Role |
|---|---|---|
| Framework | React 19 + TypeScript, Vite 8 | App shell |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` | All styling is inline utility classes (no CSS modules / theme tokens) |
| Declarative animation | `framer-motion` | Entrance reveals, springs, 3D tilt, scroll-linked timeline, infinite loops |
| Smooth scroll | `lenis` | Inertial wheel scrolling (started inside `ScrollStack`) |
| Scroll stack | Custom `ScrollStack.tsx` (React Bits port) | Pinned, scaling, stacking project cards |
| Fonts | Google Fonts | Bebas Neue, Montserrat, Herr Von Muellerhoff, Allura |

Setup in a new project:

```bash
npm i framer-motion lenis
npm i -D tailwindcss @tailwindcss/vite
```

```ts
// vite.config.ts
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({ plugins: [react(), tailwindcss()] });
```

> `tailwind.config.js` is **not used** — Tailwind v4 is configured in CSS. `App.css` is also a leftover Vite template file and is never imported.

---

## 2. Design concept

**"Luxury noir / black-and-gold cinema."** It's built from:

- A **pure black** canvas with slightly warm, near-black surfaces (brown-tinted, not grey).
- **Metallic gradient text**: every headline has two lines, silver first, then gold.
- **Hairline gold details**: 1px top lines that fade out at both ends, L-shaped corner brackets, and thin dividers.
- **Warm blurred glows** in the background (gold/bronze circles with 150–180px blur).
- **Mixed type voices**: condensed display type (Bebas Neue), widely letter-spaced small caps (Montserrat), terminal-style mono labels with `//` prefixes, and a handwritten signature.
- **Slow, smooth motion**: long durations (0.8–1.2s) with an expo-out easing curve, plus a blur-to-sharp fade on text.

---

## 3. Color system

No tokens exist in the code; every value is a hard-coded hex. Here they are grouped by role.

### 3.1 Backgrounds / surfaces (darkest → lightest)

| Hex | Used for |
|---|---|
| `#000000` | Page + every section background |
| `#050403` | Metric rows inside project cards |
| `#0A0806` | Contact form card |
| `#0E0C0A` | Project (scroll stack) cards |
| `#100D0B` @ 85% | Skills bento cards (+ `backdrop-blur-xl`) |
| `#120F0C` @ 80% | About portrait card, hero primary CTA, form inputs |
| `#14100D` | Submit button |
| `#16120E` | Tech pills, GitHub button |
| `#17130F` / `#171310` | Stat badges, skill chips |
| `#1A1510` / `#1F1914` | Hover states of the above |

### 3.2 Gold & bronze accents

| Hex | Name | Used for |
|---|---|---|
| `#D4AF37` | **Primary gold** | Eyebrow labels, hover borders, corner brackets, cursor ring, timeline, glows |
| `#C99E5D` | Mid gold | Gradient mid-stop, quote mark |
| `#D8AB64` | Signature gold | Hero signature |
| `#F2D8A7` / `#F3DBB3` | Light gold | About signature, highlighted name, embers |
| `#F7E7C4` | **Champagne** | Title hover color, metric values, gradient top |
| `#DFBE8A` → `#9B7640` → `#342410` | Deep bronze gradient | Hero line 3 |
| `#8C6D4F` | **Bronze** | Default borders (at 15–50% opacity), muted mono labels, bullets |
| `#543B1A`, `#605448` | Dark gradient ends | Headline gradient bottoms |

### 3.3 Text (warm neutrals)

| Hex | Role |
|---|---|
| `#FFFFFF` / `#FFF5EB` | Titles / hover-white |
| `#F4EBE2` | Big stat numbers |
| `#EAD8C7`, `#E8D7C5`, `#E8DFD8` | Logo, buttons, chips, base body text |
| `#E0D3C5`, `#D5CBC0` | Quote text, paragraph on hover |
| `#C4B5A5`, `#C4B29E`, `#BFA895` | Nav, subtitle, secondary button |
| `#BDB0A4`, `#B3A497`, `#A8988B` | Paragraph body (muted) |
| `#cbb59d` | `::selection` background (with black text) |

### 3.4 Recommended: turn these into Tailwind v4 tokens

```css
/* index.css */
@import "tailwindcss";

@theme {
  --color-ink: #000000;
  --color-surface-0: #050403;
  --color-surface-1: #0A0806;
  --color-surface-2: #0E0C0A;
  --color-surface-3: #120F0C;
  --color-surface-4: #16120E;

  --color-gold: #D4AF37;
  --color-gold-mid: #C99E5D;
  --color-gold-light: #F3DBB3;
  --color-champagne: #F7E7C4;
  --color-bronze: #8C6D4F;

  --color-text: #E8DFD8;
  --color-text-strong: #EAD8C7;
  --color-text-muted: #A8988B;
  --color-selection: #cbb59d;

  --font-display: 'Bebas Neue', sans-serif;
  --font-sans: 'Montserrat', sans-serif;
  --font-script: 'Herr Von Muellerhoff', 'Allura', cursive;

  --ease-cinematic: cubic-bezier(0.16, 1, 0.3, 1);
}

html, body { margin: 0; overflow-x: hidden; background: #000; }
```

After that you can write `text-gold`, `border-bronze/40`, `font-display` and `ease-cinematic` instead of repeating the hex values.

---

## 4. Typography

### 4.1 Font loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@200;300;400;500;600;700&family=Herr+Von+Muellerhoff&family=Allura&display=swap" rel="stylesheet">
```

(The original loads fonts in 4 places. **Great Vibes, Cinzel and Cormorant Garamond are loaded but never used**, so you can drop them.)

### 4.2 Type scale

| Element | Font | Size (mobile → xl) | Leading | Tracking | Other |
|---|---|---|---|---|---|
| Hero H1 | Bebas Neue | `text-6xl → 7xl → 8xl → 7.2rem → 7.8rem` | `0.83` | `tracking-tight` | uppercase, gradient |
| Section H2 | Bebas Neue | `text-5xl → 6xl → 7xl → 5.5rem` | `0.85` (about: `0.88`) | `tracking-tight` | uppercase, gradient |
| Card H3 (projects) | Bebas Neue | `text-4xl → 5xl → 6xl` | `0.9` | tight | uppercase |
| Card H3 (skills / timeline) | Bebas Neue | `text-3xl → 4xl` | none | `tracking-wide` | |
| Stat number | Bebas Neue | `text-3xl → 4xl` | | tight | `font-light` |
| Background watermark number | Bebas Neue | `text-8xl → 9xl` | none | | `#EAD8C7` @ 5% |
| Body paragraph | Montserrat 300 | `12px → 14px → 13.5–14.5px` | `1.8–1.85` | `tracking-wide` | muted color |
| Eyebrow label | Montserrat 500 | `11px` | | `0.35em` | uppercase, gold |
| Logo | Montserrat 600 | `12px → 14px` | | `0.35em` | uppercase |
| Nav links | Montserrat 300 | `11px` | | `0.28em` | uppercase |
| Buttons | Montserrat 300–500 | `11px` | | `0.24em` | uppercase |
| Stat label | Montserrat 500 | `10px` | | `0.22em` | uppercase |
| Chips / pills | Montserrat 500 | `10–10.5px` | | `0.16em` | uppercase |
| Mono meta (`// LABEL`) | `font-mono` | `9.5–11px` | | `0.2–0.25em` | uppercase |
| Signature | Herr Von Muellerhoff | `2.2rem` / `text-3xl` | none | `0.04em` | gold, glow |

**Rule of thumb:** the smaller the text, the wider the letter-spacing (0.16em → 0.35em). Display text is always tight.

### 4.3 The signature headline pattern

Every section heading uses **two stacked lines**, silver first and gold second. Each line is a gradient clipped to the text, with a drop shadow:

```tsx
<h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.85] select-none">
  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#FFFFFF] via-[#D5CBC0] to-[#605448] drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
    LINE ONE.
  </span>
  <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#F7E7C4] via-[#C99E5D] to-[#543B1A] drop-shadow-[0_8px_25px_rgba(201,158,93,0.35)]">
    LINE TWO.
  </span>
</h2>
```

Three gradient "metals":

| Metal | from → via → to | drop-shadow |
|---|---|---|
| Silver | `#FFFFFF → #D5CBC0 → #605448` | `0 4px 12px rgba(0,0,0,.85)` |
| Gold | `#F7E7C4 → #C99E5D → #543B1A` | `0 8px 25px rgba(201,158,93,.35)` |
| Deep bronze (3rd line, hero only) | `#DFBE8A → #9B7640 → #342410` | `0 10px 30px rgba(155,118,64,.4)` |

---

## 5. Layout system

| Token | Value |
|---|---|
| Section horizontal padding | `px-6 sm:px-12 lg:px-20` (hero: `lg:px-16`) |
| Content width | `max-w-7xl mx-auto` (Experience: `max-w-4xl`) |
| Grid | `grid-cols-1 lg:grid-cols-12`, split **7 / 5** (About, Projects card, Skills bento) or **5 / 7** (Contact) |
| Gaps | `gap-6` (bento), `gap-8` (card inner), `gap-12 lg:gap-16` (section columns) |
| Section vertical rhythm | About `py-24 lg:py-32`; Projects `pt-20 pb-32`; Skills `pt-8 pb-24`; Experience `pt-4 pb-24`; Contact `py-16` |
| Radius | Almost square: `rounded-sm`; only project cards use `rounded-2xl` |
| Breakpoints | Tailwind defaults: `sm` 640, `md` 768, `lg` 1024, `xl` 1280 |

Page order: **Hero → About (01) → Projects (02) → Skills (03) → Experience (04) → Contact/Footer (05)**.

---

## 6. Reusable visual components

These patterns repeat across sections. Pulling them out as components makes porting easy.

### 6.1 Eyebrow (section number label)

```tsx
<motion.div
  initial={{ opacity: 0, x: -20 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
  className="flex items-center space-x-4 mb-7"
>
  <span className="font-sans text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]">
    01 / ABOUT ME
  </span>
  <div className="w-20 h-px bg-gradient-to-r from-[#D4AF37]/80 via-[#8C6D4F]/40 to-transparent" />
</motion.div>
```

### 6.2 "Luxury card" shell

Ingredients: near-black surface, bronze border at 35–50% opacity, a heavy black shadow, a 1px gold "horizon" line along the top, and L-shaped corner brackets.

```tsx
<div className="group relative overflow-hidden rounded-sm border border-[#8C6D4F]/40 bg-[#0A0806] p-8 sm:p-10
                shadow-[0_20px_50px_rgba(0,0,0,0.9)] transition-colors duration-500 hover:border-[#D4AF37]">
  {/* horizon line */}
  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
  {/* corner brackets */}
  <div className="absolute top-0 left-0  w-3 h-3 border-t border-l border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />
  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />
  <div className="absolute bottom-0 left-0  w-3 h-3 border-b border-l border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />
  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/60 group-hover:border-[#D4AF37] transition-colors" />
  {/* content */}
</div>
```

Variants used in the project:

| Card | Bracket size / weight | Extras |
|---|---|---|
| Contact form | `w-3 h-3`, 1px | Static |
| Skills bento | `w-3 h-3`, 1px, **only 2 corners** (TL + BR) | Horizon line fades in on hover; `backdrop-blur-xl` |
| Projects | `w-4 h-4`, 2px | `rounded-2xl`, giant 5% watermark number bottom-right |
| About portrait | `w-6 h-6`, 2px, glow shadow | Brackets move 2px outward on hover |

### 6.3 Buttons

| Type | Classes (essentials) | Hover |
|---|---|---|
| Primary outline | `border border-[#8C6D4F] bg-[#120F0C]/80 px-7 py-3.5 text-[11px] tracking-[0.24em] uppercase shadow-[0_0_25px_rgba(212,175,55,0.18)]` + inner top hairline | border → gold, text → `#FFF5EB`, `scale 1.02` |
| Ghost outline | `border border-[#8C6D4F]/40 text-[#BFA895]` | border → full bronze, text brighter |
| Gold fill-invert (GitHub) | `border-[#8C6D4F] bg-[#16120E] text-[#EAD8C7]` | `bg-[#D4AF37] text-black` (solid gold with black text) |
| Nav pill "Let's talk" | `border-[#8C6D4F]/50 backdrop-blur-sm py-2 px-4` | border → gold, `↗` nudges up-right |
| Full-width submit | `w-full py-3.5 border-[#8C6D4F]/50 bg-[#14100D] tracking-[0.25em]` | border gold, bg `#1A1510`, text champagne |

Arrows are text glyphs (`↗`, `↓`) with `group-hover:translate-x-0.5 group-hover:-translate-y-0.5`.

### 6.4 Chips / pills

```
px-3 py-1 text-[10px] font-medium tracking-[0.16em] uppercase rounded-sm
border border-[#8C6D4F]/40 bg-[#16120E] text-[#E8D7C5]
group-hover:border-[#D4AF37]/50 transition-all duration-300
```

They react to the **parent card's** hover (`group-hover`), not their own, so all chips light up together.

### 6.5 Mono "terminal" details

- Labels written like code comments: `// SENDER`, `// ARCHITECTURE METRICS`, `01 //`
- Key/value metric rows: `p-3.5 rounded-sm border border-[#8C6D4F]/25 bg-[#050403] flex justify-between` with `font-mono` label (muted) and value (champagne)
- Tech-themed wording ("INITIALIZE TRANSMISSION", "EXECUTE DISPATCH", "PACKET DELIVERED")

### 6.6 Ambient glow blobs

Two per section, placed off-center behind the content:

```tsx
<div className="absolute top-1/4 left-1/3 w-[36rem] h-[36rem] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />
<div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#8C6D4F]/5 rounded-full blur-[170px] pointer-events-none" />
```

Content sits on top in a `relative z-10` wrapper, and the section has `overflow-hidden`.

---

## 7. Motion system

### 7.1 Global motion principles

| Principle | Value |
|---|---|
| **Signature easing** | `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out: very fast start, very long soft landing) |
| Reveal duration | 0.8–1.2s |
| Reveal shape | `opacity 0→1` + `y 18–30px → 0` (or `x -15/-20 → 0`) + **`blur(6–10px) → blur(0)`** |
| Stagger | 0.14–0.18s between children, 0.1–0.2s initial delay |
| Trigger | `whileInView` with `viewport={{ once: true }}` (plays once, never reverses) |
| Hover micro-interactions | Tailwind transitions at 300ms (colors), 500ms (borders/brackets), 700ms (image filters / rings) |
| Springs | Cursor `damping 30, stiffness 350, mass 0.5`; tilt `damping 18, stiffness 220` |
| Ambient loops | 4.5s–10s, `easeInOut`, `repeat: Infinity` |

### 7.2 Shared variants (drop into `src/lib/motion.ts`)

```ts
import type { Variants } from 'framer-motion';

export const EASE = [0.16, 1, 0.3, 1] as const;

export const stagger = (children = 0.16, delay = 0.2): Variants => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: children, delayChildren: delay } },
});

export const fadeUpBlur = (y = 18, blur = 6, duration = 1.1): Variants => ({
  hidden: { opacity: 0, y, filter: `blur(${blur}px)` },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration, ease: EASE } },
});
```

Presets per section, taken from the code:

| Where | stagger / delayChildren | y | blur | duration |
|---|---|---|---|---|
| Hero (on mount, `animate`) | 0.16 / 0.2 | 18 | 6px | 1.1s |
| About (in view, margin `-100px`) | 0.18 / 0.15 | 30 | 10px | 1.2s |
| Skills bento (in view, margin `-60px`) | 0.14 / 0.1 | 30 | 6px | 0.9s |

---

## 8. Animation catalogue (section by section)

### 8.1 Hero

| # | Effect | How it works |
|---|---|---|
| H1 | **Custom cursor** | A `motion.div` fixed at top-left follows `clientX/Y` (via `mousemove` → state). At rest it's a **10px cream dot** (`rgba(235,215,195,.95)`); over any link it grows to a **48px ring** with gold tint `rgba(212,175,55,.1)`, `border-[#D4AF37]/40` and `backdrop-blur-[1px]`. Offset is half the size (5 / 24) so it stays centered. Spring transition: `damping 30, stiffness 350, mass 0.5`. Every interactive element sets `isHovered` via `onMouseEnter/Leave`. The native cursor is hidden with `cursor-none`. |
| H2 | **Fixed background video** | `<video autoPlay muted loop playsInline>` inside a `fixed inset-0 z-0` layer, aligned **right** (`justify-end`, `h-screen w-auto object-contain origin-right`), scaled `95% → 98% → 100%` by breakpoint. |
| H3 | **Left-edge blend** | `absolute left-0 w-1/2 bg-gradient-to-r from-black via-black/85 to-transparent` fades the video into black behind the headline. |
| H4 | **Floating emblem** | Watermark PNG in the bottom-right corner, floating with `y: [-3, 3, -3]` and `scale: [1, 1.03, 1]`, 4.5s, infinite, easeInOut. A `w-36 h-36 bg-black/85 blur-xl` disc sits behind it to separate it from the video; the image itself has a gold drop-shadow glow. |
| H5 | **Staggered headline reveal** | Headline → subtitle → description → CTAs, each fading up with blur (see 7.2). |
| H6 | **Quote card slide-in** | `x: 20 → 0`, `opacity 0 → 1`, delay 0.8s, 1.2s, expo-out. Contains the quote mark, two-line statement, gold hairline with glow (`shadow-[0_0_8px_rgba(212,175,55,.4)]`), and handwritten signature. Hidden below `lg`. |
| H7 | **Nav underline** | `span.absolute bottom-0 left-0 w-0 h-px bg-[#D4AF37]/50 transition-all duration-300 group-hover:w-full` |
| H8 | **Button hover** | `whileHover={{ scale: 1.02 }}` + border → gold + arrow nudge. |

Layer stack: cursor `z-50` › content `z-10/z-20` › emblem `z-10` › video `z-0`. The content layer uses `pointer-events-none` and turns pointer events back on (`pointer-events-auto`) only on the interactive parts.

### 8.2 About

| # | Effect | How it works |
|---|---|---|
| A1 | **Breathing glows** | Two blurred blobs looping: gold `scale [1,1.2,1]`, `opacity [.08,.16,.08]`, 8s; bronze does the reverse `scale [1.2,1,1.2]`, `opacity [.05,.12,.05]`, 10s. The different lengths keep them from syncing up. |
| A2 | **Content reveal** | Stagger container → headline, bio, stats grid (y 30, blur 10px, 1.2s). |
| A3 | **3D tilt portrait card** | `onMouseMove` normalizes the pointer to `-0.5…0.5` inside the card rect → `useTransform` maps to `rotateX: 16° → -16°` (from Y) and `rotateY: -16° → 16°` (from X) → `useSpring({damping:18, stiffness:220})`. Applied via `style={{ rotateX, rotateY, transformStyle:'preserve-3d' }}`; the parent has `perspective-[1400px]`. On mouse leave the values reset to 0 and the spring settles the card back. |
| A4 | **Holographic spotlight** | A second pair of motion values stores the pointer in px → `useTransform` builds `radial-gradient(circle 240px at Xpx Ypx, rgba(255,255,255,.35), rgba(212,175,55,.18), transparent 80%)`, layered on the photo with `mix-blend-overlay`, and shown only while hovered. |
| A5 | **Conic glow ring** | Behind the card: `absolute -inset-6 bg-[conic-gradient(from_0deg,#D4AF37_0%,#8C6D4F_30%,transparent_60%,#D4AF37_100%)] blur-2xl`. On hover it animates to `scale 1.15`, `opacity .15 → .35` and `rotate 0 → 180°` over 3s easeOut. |
| A6 | **Laser sweep** | A `w-1/2` strip with `via-[#D4AF37]/30` gradient and `skew-x-12` moves `x: -100% → 200%` over 1.8s, linear, infinite, only while hovered, clipped by `overflow-hidden`. |
| A7 | **Expanding corner brackets** | Each bracket moves 2px outward diagonally on `group-hover` (500ms). |
| A8 | **Photo grading** | `brightness-[.94] contrast-[1.06]` → hover `brightness-105 contrast-[1.12]`, 700ms ease-out. A `from-black/90` bottom gradient adds a noir look and keeps the signature readable. |
| A9 | **Gold embers** | Two 1.5–2px dots with glow, mounted only on hover: `opacity [0,1,0]`, drifting up 50–60px and sideways, 2s / 2.4s (the second has a 0.3s delay), infinite. |
| A10 | **Card entrance** | `opacity 0, scale .9, y 30` → `1, 1, 0`, 1.2s expo-out, in view. |

### 8.3 Projects — Scroll stack (the headline effect)

**What the user sees:** as they scroll, each project card pins near the top of the screen (15% down). The next card slides up over it, and the cards underneath shrink a little, so you get a stacked deck. Once the section ends, the whole stack scrolls away.

**Props used here:**

```tsx
<ScrollStack
  itemDistance={20}        // px gap between cards before pinning
  itemScale={0.035}        // each deeper card is 3.5% smaller than the next
  itemStackDistance={28}   // px offset between pinned cards (the visible "edge" of each)
  stackPosition="15%"      // pin line, % of viewport height
  scaleEndPosition="6%"    // scaling finishes when card top reaches 6% of viewport
  baseScale={0.88}         // bottom card shrinks to 88%
  useWindowScroll
>
```

**Algorithm (runs on every Lenis scroll event):**

1. On mount, record each `.scroll-stack-card`'s natural document `top`, set `z-index = i+1`, `transform-origin: top center`, `will-change`, and `backface-visibility: hidden`.
2. For card `i`:
   - `pinStart = cardTop − stackPositionPx − itemStackDistance·i`
   - `pinEnd = top of .scroll-stack-end − viewportHeight/2`
   - `scaleProgress = clamp((scrollY − pinStart) / (cardTop − scaleEndPx − pinStart))`
   - `scale = 1 − scaleProgress·(1 − (baseScale + i·itemScale))`, so later cards shrink less
   - While pinned: `translateY = scrollY − cardTop + stackPositionPx + itemStackDistance·i` (cancels the scroll, so the card appears fixed)
   - After `pinEnd`: `translateY` stays at its final value, so the stack scrolls away together
3. Write `transform: translate3d(0, Ypx, 0) scale(s) rotate(r)` only when the value changed beyond a small threshold (0.1px / 0.001 scale).
4. Optional `rotationAmount` and `blurAmount` (off here) tilt or blur the cards deeper in the stack.
5. `.scroll-stack-inner` has `padding-bottom: 50vh`, which gives the last card room to pin before the section ends.

**Lenis config (also gives the whole page smooth scrolling):**

```ts
new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
});
```

**Card hover:** border → gold (500ms), title → champagne, brackets go to full gold, and all pills light up together.

### 8.4 Skills — Bento grid

| Effect | Detail |
|---|---|
| Layout | 12-col grid with alternating spans **7/5, 5/7** so the cards form a staggered brick pattern |
| Entrance | Stagger 0.14s, fade-up + blur 6px, 0.9s |
| Lift | `whileHover={{ y: -5, transition: { duration: .25 } }}` |
| Glow | `hover:shadow-[0_16px_45px_rgba(212,175,55,0.14)]` + border → `#D4AF37]/80` (500ms) |
| Horizon line | `opacity-0 → group-hover:opacity-100` (500ms) |
| Cascade | Badge, stat, title, description and chips all brighten on the card's `group-hover` |

### 8.5 Experience — Scroll-drawn timeline

| Effect | Detail |
|---|---|
| **Progress line** | `useScroll({ target: section, offset: ['start 70%', 'end 90%'] })` → `useTransform(progress, [0,1], ['0%','100%'])` → `style={{ height }}` on a 2px gold gradient line (`from-[#D4AF37] via-[#C99E5D] to-[#8C6D4F]/10`) with `shadow-[0_0_10px_#D4AF37]`. It sits on top of a 1px `#8C6D4F]/20` track. |
| Track position | `left-[19px]` mobile, `md:left-[140px]` desktop (year column is 140px wide, right-aligned) |
| Item entrance | `x: -15 → 0`, 0.7s, `delay: idx * 0.08`, in view with margin `-50px` |
| Node hover | 10px dot fills gold with `shadow-[0_0_12px_#D4AF37]`; an outer 24px ring appears and scales to 150% (700ms ease-out) |
| Text hover | Year → gold, title → champagne, description brightens |

### 8.6 Contact / Footer

| Effect | Detail |
|---|---|
| Entrances | Eyebrow `x -20`, headline `y 20`, form card `y 25`, all 0.8s in view |
| Inputs | `bg-[#120F0C] border-[#8C6D4F]/30 focus:border-[#D4AF37] outline-none rounded-sm text-xs placeholder-[#8C6D4F]/50` |
| Submit | Swaps the form for a "PACKET DELIVERED" state with a ✓ in a gold circle (no animation, **no real sending**) |
| Footer line | `border-t border-[#8C6D4F]/15`, mono 10px bronze text, `tracking-widest` |

---

## 9. Reusable 3D tilt hook (extracted from About)

```tsx
import { useRef } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

export function useTilt(max = 16) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const px = useMotionValue(0), py = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [max, -max]), { damping: 18, stiffness: 220 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-max, max]), { damping: 18, stiffness: 220 });
  const spotlight = useTransform([px, py], ([x, y]) =>
    `radial-gradient(circle 240px at ${x}px ${y}px, rgba(255,255,255,.35), rgba(212,175,55,.18), transparent 80%)`);

  const onMouseMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
    px.set(e.clientX - r.left);
    py.set(e.clientY - r.top);
  };
  const onMouseLeave = () => { mx.set(0); my.set(0); };

  return { ref, style: { rotateX, rotateY, transformStyle: 'preserve-3d' as const }, spotlight, onMouseMove, onMouseLeave };
}
```

Wrap the card's parent in `perspective-[1400px]`.

---

## 10. Issues to fix when you port it

| # | Issue | Where | Fix |
|---|---|---|---|
| 1 | Lenis is created **inside `ScrollStack`**, so smooth scrolling only exists while that component is mounted | `ScrollStack.tsx:197` | Start one Lenis instance at the app root and have ScrollStack subscribe to it |
| 2 | Custom cursor lives in Hero, but `cursor-none` is only on the hero section → below the hero you see **both** cursors | `HeroSection.tsx:51-65` | Move the cursor to `App`, add `cursor-none` to the root, and share the hover state through context or a `data-cursor` attribute |
| 3 | The cursor calls `setState` on every mousemove → Hero re-renders at ~60–120 Hz | `HeroSection.tsx:42-48` | Use `useMotionValue` + `useSpring` for x/y instead of state |
| 4 | ScrollStack measures card positions once; resizing the window, or fonts/images loading late, breaks the pin positions | `ScrollStack.tsx:227` | Re-measure on `resize` / `ResizeObserver` (reset transforms first) |
| 5 | ScrollStack uses `document.querySelectorAll('.scroll-stack-card')` → only **one** stack per page | `ScrollStack.tsx:220` | Query inside `scrollerRef.current` |
| 6 | "Explore my work" arrow uses `group-hover` but the link has no `group` class, so the arrow never moves | `HeroSection.tsx:226` | Add `group` |
| 7 | `/resume.pdf` is linked but doesn't exist in `public/` | `HeroSection.tsx:237` | Add the file |
| 8 | Contact form doesn't send anything | `ContactSection.tsx:9` | Hook up Formspree / EmailJS / an API route |
| 9 | No `prefers-reduced-motion` support (blur reveals, infinite loops, smooth scroll) | everywhere | `useReducedMotion()` from framer-motion; skip Lenis when reduced |
| 10 | Fonts loaded 4× plus 3 unused families | `index.html`, `index.css` | Single `<link>` (see 4.1) |
| 11 | No email / LinkedIn / GitHub links in the contact section | `ContactSection.tsx` | Add social links |
| 12 | `bg-gradient-to-*` is the Tailwind v3 name (still works in v4; the v4 name is `bg-linear-to-*`) | many | Optional rename |

---

## 11. Porting checklist

1. Install `framer-motion`, `lenis`, `tailwindcss` + `@tailwindcss/vite`.
2. Add the fonts `<link>` (4.1) and the `@theme` tokens (3.4).
3. Create `lib/motion.ts` (7.2) and `hooks/useTilt.ts` (9).
4. Build the base components: `Eyebrow`, `MetalHeadline`, `LuxuryCard` (with brackets and horizon line), `GlowBlobs`, `Chip`, `Button` (primary / ghost / invert).
5. Put Lenis and the custom cursor at the app root (fixes #1–#3).
6. Copy `ScrollStack.tsx` + `.css` (with fixes #4–#5).
7. Build the sections in order and reuse the per-section motion presets from the tables above.
8. Assets: a dark background video that works right-aligned (subject on the right side), a transparent PNG emblem, and a 4:5 portrait.
