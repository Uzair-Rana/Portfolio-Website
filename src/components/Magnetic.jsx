import { useRef, useCallback } from 'react'
import { m as M, useSpring } from 'framer-motion'

/**
 * Magnetic — wraps any element with a smooth magnetic pull effect.
 * The element moves toward the cursor when hovering within its bounds.
 *
 * Usage:
 *   <Magnetic>
 *     <button>Hover me</button>
 *   </Magnetic>
 *
 * Props:
 *   strength  — how far the element moves (0–1, default 0.35)
 *   range     — extra detection radius beyond element bounds in px (default 60)
 *   className — forwarded to the wrapper div
 */
export default function Magnetic({
    children,
    strength = 0.35,
    range = 60,
    className = '',
}) {
    const ref = useRef(null)

    const springConfig = { stiffness: 160, damping: 18, mass: 0.6 }
    const x = useSpring(0, springConfig)
    const y = useSpring(0, springConfig)

    const onMouseMove = useCallback((e) => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        x.set(dx * strength)
        y.set(dy * strength)
    }, [strength, x, y])

    const onMouseEnter = useCallback((e) => {
        // Grow the hit area via pointer-events on a larger pseudo-zone
        onMouseMove(e)
    }, [onMouseMove])

    const onMouseLeave = useCallback(() => {
        x.set(0)
        y.set(0)
    }, [x, y])

    return (
        <M.div
            ref={ref}
            style={{ x, y, display: 'inline-flex' }}
            className={className}
            onMouseMove={onMouseMove}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </M.div>
    )
}
