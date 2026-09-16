/**
 * motion.js — Single source of truth for all animation variants.
 *
 * Rules:
 *  - All durations: 200–600ms
 *  - No bouncy springs (stiffness > 300 or large mass)
 *  - No looping / attention-seeking effects (except the scroll indicator)
 *  - Every whileInView uses viewport = { once: true, margin: '-60px' }
 *  - prefers-reduced-motion: checked at runtime via shouldAnimate()
 */

// ── Runtime reduced-motion check ─────────────────────────────────
export function shouldAnimate() {
    if (typeof window === 'undefined') return true
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// ── Easing curves ─────────────────────────────────────────────────
export const ease = {
    out: [0.22, 1, 0.36, 1],      // smooth deceleration — primary easing
    inOut: [0.4, 0, 0.2, 1],      // material standard
    snap: [0.175, 0.885, 0.32, 1], // snappy for small elements
}

// ── Shared viewport defaults ──────────────────────────────────────
// Pass this to every whileInView's viewport prop
export const vp = { once: true, margin: '-60px' }

// ── Fade + slide up (primary scroll-reveal) ───────────────────────
export const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1, y: 0,
        transition: { duration: 0.55, ease: ease.out }
    },
}

// ── Fade + slide from left ────────────────────────────────────────
export const fadeLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1, x: 0,
        transition: { duration: 0.5, ease: ease.out }
    },
}

// ── Fade + slide from right ───────────────────────────────────────
export const fadeRight = {
    hidden: { opacity: 0, x: 20 },
    visible: {
        opacity: 1, x: 0,
        transition: { duration: 0.5, ease: ease.out }
    },
}

// ── Simple opacity fade ───────────────────────────────────────────
export const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.45, ease: ease.out }
    },
}

// ── Scale in (badges, small accents) ─────────────────────────────
export const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1, scale: 1,
        transition: { duration: 0.35, ease: ease.snap }
    },
}

// ─────────────────────────────────────────────────────────────────
// STAGGER CONTAINERS
// Usage: wrap a list in <motion.ul variants={stagger}> and each
//        child in <motion.li variants={fadeUp}>
// ─────────────────────────────────────────────────────────────────

// Standard — 90 ms between children (cards, list items)
export const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

// Fast — 60 ms (small chips, tags)
export const staggerFast = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
}

// Slow — 110 ms (large feature cards)
export const staggerSlow = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
}

// ─────────────────────────────────────────────────────────────────
// HERO — above-the-fold sequential load
// ─────────────────────────────────────────────────────────────────

// Outer hero container — staggers its named children sequentially
export const heroContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.13, delayChildren: 0 } },
}

// Each line of the hero heading
export const heroLine = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1, y: 0,
        transition: { duration: 0.65, ease: ease.out }
    },
}

// Secondary hero elements (bio, CTAs) — slightly faster
export const heroChild = {
    hidden: { opacity: 0, y: 18 },
    visible: {
        opacity: 1, y: 0,
        transition: { duration: 0.5, ease: ease.out }
    },
}

// Hero stat counter (fades in last)
export const heroStat = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.4, ease: ease.out }
    },
}

// Hero portrait (scale + fade from right)
export const heroPortrait = {
    hidden: { opacity: 0, scale: 0.94, y: 18 },
    visible: {
        opacity: 1, scale: 1, y: 0,
        transition: { duration: 0.75, ease: ease.out }
    },
}

// ─────────────────────────────────────────────────────────────────
// SECTION HEADERS — eyebrow + heading stagger
// ─────────────────────────────────────────────────────────────────
export const sectionHeader = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
}

// Eyebrow text (small label above heading)
export const eyebrowAnim = {
    hidden: { opacity: 0, x: -12 },
    visible: {
        opacity: 1, x: 0,
        transition: { duration: 0.4, ease: ease.out }
    },
}

// ─────────────────────────────────────────────────────────────────
// MICRO-INTERACTIONS — whileHover / whileTap
// ─────────────────────────────────────────────────────────────────

// Primary / outline buttons
export const btnHover = {
    scale: 1.04,
    y: -1,
    transition: { duration: 0.18, ease: ease.out },
}
export const btnTap = {
    scale: 0.97,
    y: 0,
    transition: { duration: 0.1 },
}

// Tertiary / text buttons (smaller effect)
export const btnTextHover = {
    x: 2,
    transition: { duration: 0.15, ease: ease.out },
}

// Card lift
export const cardHover = {
    y: -4,
    boxShadow: '0 12px 32px rgba(26, 26, 46, 0.09)',
    transition: { duration: 0.22, ease: ease.out },
}

// Row entry (experience / education rows)
export const rowHover = {
    x: 4,
    transition: { duration: 0.2, ease: ease.out },
}

// Icon / small element scale
export const iconHover = {
    scale: 1.1,
    transition: { duration: 0.18, ease: ease.out },
}

// ─────────────────────────────────────────────────────────────────
// BACKGROUND FLOATS — very slow, ±10–12 px max
// Use on decorative blobs / background shapes only
// ─────────────────────────────────────────────────────────────────
export const floatA = {
    animate: {
        y: [0, -11, 0],
        x: [0, 5, 0],
        transition: {
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatType: 'mirror',
        },
    },
}

export const floatB = {
    animate: {
        y: [0, 9, 0],
        x: [0, -7, 0],
        transition: {
            duration: 19,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatType: 'mirror',
        },
    },
}

// ─────────────────────────────────────────────────────────────────
// PAGE TRANSITION — wraps entire route content
// ─────────────────────────────────────────────────────────────────
export const pageVariants = {
    initial: { opacity: 0, y: 14 },
    animate: {
        opacity: 1, y: 0,
        transition: { duration: 0.42, ease: ease.out }
    },
    exit: {
        opacity: 0, y: -8,
        transition: { duration: 0.22, ease: 'easeIn' }
    },
}
