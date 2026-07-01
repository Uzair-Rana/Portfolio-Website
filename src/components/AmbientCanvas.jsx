import { useEffect, useRef } from 'react'

/**
 * AmbientCanvas — lightweight HTML5 Canvas background.
 * Renders an interactive particle/node network that reacts to mouse movement.
 * Runs in a rAF loop, cleans up on unmount, low CPU profile.
 */
export default function AmbientCanvas() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')

        // ── Config ──────────────────────────────────────────────────
        const CONFIG = {
            particleCount: 55,
            connectionRadius: 140,
            mouseRadius: 120,
            particleSpeed: 0.25,
            particleRadius: 1.5,
            baseOpacity: 0.35,
            lineOpacity: 0.12,
            mouseGlowRadius: 180,
        }

        let W = 0, H = 0
        let animId = null
        // Mouse position with smooth lag
        const mouse = { x: -9999, y: -9999 }
        const smooth = { x: -9999, y: -9999 }

        // ── Resize ──────────────────────────────────────────────────
        function resize() {
            W = canvas.width = window.innerWidth
            H = canvas.height = window.innerHeight
        }
        resize()
        const ro = new ResizeObserver(resize)
        ro.observe(document.body)

        // ── Particles ────────────────────────────────────────────────
        class Particle {
            constructor() { this.reset(true) }

            reset(init = false) {
                this.x = Math.random() * W
                this.y = init ? Math.random() * H : (Math.random() > 0.5 ? -10 : H + 10)
                this.vx = (Math.random() - 0.5) * CONFIG.particleSpeed
                this.vy = (Math.random() - 0.5) * CONFIG.particleSpeed
                this.r = Math.random() * CONFIG.particleRadius + 0.5
                this.a = Math.random() * 0.4 + 0.15
            }

            update() {
                // Subtle mouse repulsion
                const dx = this.x - smooth.x
                const dy = this.y - smooth.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < CONFIG.mouseRadius && dist > 0) {
                    const force = (CONFIG.mouseRadius - dist) / CONFIG.mouseRadius
                    this.x += (dx / dist) * force * 1.2
                    this.y += (dy / dist) * force * 1.2
                }

                this.x += this.vx
                this.y += this.vy

                // Wrap
                if (this.x < -20) this.x = W + 20
                if (this.x > W + 20) this.x = -20
                if (this.y < -20) this.y = H + 20
                if (this.y > H + 20) this.y = -20
            }

            draw() {
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${hexToRgb(getComputedStyle(document.documentElement)
                    .getPropertyValue('--primary').trim() || '#6366f1')}, ${this.a})`
                ctx.fill()
            }
        }

        function hexToRgb(hex) {
            // handles both #rrggbb and css color names gracefully
            const clean = hex.replace('#', '')
            if (clean.length !== 6) return '99,102,241'
            const r = parseInt(clean.slice(0, 2), 16)
            const g = parseInt(clean.slice(2, 4), 16)
            const b = parseInt(clean.slice(4, 6), 16)
            return `${r},${g},${b}`
        }

        const particles = Array.from({ length: CONFIG.particleCount }, () => new Particle())

        // ── Draw connections ──────────────────────────────────────────
        function drawConnections() {
            const primaryRgb = hexToRgb(
                getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#6366f1'
            )
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i], b = particles[j]
                    const dx = a.x - b.x, dy = a.y - b.y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < CONFIG.connectionRadius) {
                        const alpha = (1 - dist / CONFIG.connectionRadius) * CONFIG.lineOpacity
                        ctx.beginPath()
                        ctx.moveTo(a.x, a.y)
                        ctx.lineTo(b.x, b.y)
                        ctx.strokeStyle = `rgba(${primaryRgb}, ${alpha})`
                        ctx.lineWidth = 0.6
                        ctx.stroke()
                    }
                }
            }
        }

        // ── Mouse glow ────────────────────────────────────────────────
        function drawMouseGlow() {
            if (smooth.x < 0) return
            const primaryRgb = hexToRgb(
                getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#6366f1'
            )
            const grad = ctx.createRadialGradient(
                smooth.x, smooth.y, 0,
                smooth.x, smooth.y, CONFIG.mouseGlowRadius
            )
            grad.addColorStop(0, `rgba(${primaryRgb}, 0.06)`)
            grad.addColorStop(1, `rgba(${primaryRgb}, 0)`)
            ctx.beginPath()
            ctx.arc(smooth.x, smooth.y, CONFIG.mouseGlowRadius, 0, Math.PI * 2)
            ctx.fillStyle = grad
            ctx.fill()
        }

        // ── rAF loop ─────────────────────────────────────────────────
        function tick() {
            ctx.clearRect(0, 0, W, H)

            // Smooth mouse lag (lerp factor 0.07 → sluggish/dreamy)
            smooth.x += (mouse.x - smooth.x) * 0.07
            smooth.y += (mouse.y - smooth.y) * 0.07

            drawMouseGlow()
            drawConnections()
            particles.forEach(p => { p.update(); p.draw() })

            animId = requestAnimationFrame(tick)
        }
        tick()

        // ── Mouse tracking ────────────────────────────────────────────
        function onMouseMove(e) { mouse.x = e.clientX; mouse.y = e.clientY }
        function onMouseLeave() { mouse.x = -9999; mouse.y = -9999 }
        window.addEventListener('mousemove', onMouseMove, { passive: true })
        window.addEventListener('mouseleave', onMouseLeave)

        // ── Cleanup ───────────────────────────────────────────────────
        return () => {
            cancelAnimationFrame(animId)
            ro.disconnect()
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseleave', onMouseLeave)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ opacity: 0.65 }}
        />
    )
}
