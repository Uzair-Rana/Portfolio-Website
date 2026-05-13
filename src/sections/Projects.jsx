import { m as M, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaBrain, FaMicrophone, FaUserTie, FaCode, FaRocket, FaStar } from 'react-icons/fa'
import { useSettings } from '../context/SettingsContext.jsx'

const iconComponents = {
  brain: FaBrain, microphone: FaMicrophone, usertie: FaUserTie,
  code: FaCode, rocket: FaRocket, star: FaStar,
}

/* Mouse-tracking 3D card */
function Card3D({ children, className, delay = 0 }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 })

  const handleMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleLeave = () => { x.set(0); y.set(0) }

  return (
    <M.div
      initial={{ opacity: 0, y: 50, rotateX: -20, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: '800px' }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </M.div>
  )
}

function Projects() {
  const { data } = useSettings()
  const projects = data.projects

  return (
    <section id="projects" className="container-padding mx-auto max-w-6xl py-20">
      <M.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="mb-3"
      >
        <span className="text-sm font-semibold text-[var(--primary)] uppercase tracking-widest">
          What I've Built
        </span>
      </M.div>

      <M.h2
        initial={{ opacity: 0, y: 30, rotateX: -15 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl sm:text-5xl font-extrabold heading-gradient mb-4"
        style={{ perspective: '600px' }}
      >
        Key Projects
      </M.h2>

      <M.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-white/50 text-base mb-12 max-w-xl"
      >
        Production-grade applications I've contributed to — live platforms serving real users.
        Click any project to see the full details.
      </M.p>

      {projects.length === 0 && (
        <p className="text-white/30 text-center py-12">No projects yet. Add some in Settings.</p>
      )}

      <div className="grid md:grid-cols-3 gap-6" style={{ perspective: '1000px' }}>
        {projects.map((p, idx) => {
          const Icon = iconComponents[p.iconName] ?? FaCode
          return (
            <Card3D key={p.id || p.slug} delay={idx * 0.12}>
              <Link
                to={`/projects/${p.slug}`}
                className={`group rounded-2xl border ${p.border} bg-gradient-to-br ${p.gradient} p-6 flex flex-col gap-5 block h-full`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Icon floats forward in Z */}
                <div
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  <Icon className={`text-3xl ${p.iconColor}`} />
                </div>

                <div style={{ transform: 'translateZ(12px)' }}>
                  <h3 className="text-xl font-bold text-white group-hover:text-[var(--primary)] transition-colors">
                    {p.title}
                  </h3>
                  <p className={`text-sm font-semibold mt-1 ${p.iconColor}`}>{p.role}</p>
                </div>

                <p className="text-white/55 text-sm leading-relaxed flex-1" style={{ transform: 'translateZ(8px)' }}>
                  {p.tagline}
                </p>

                <div className="flex flex-wrap gap-1.5" style={{ transform: 'translateZ(6px)' }}>
                  {p.tech.slice(0, 4).map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/50 text-xs">{t}</span>
                  ))}
                  {p.tech.length > 4 && (
                    <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/40 text-xs">+{p.tech.length - 4} more</span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-white/40 group-hover:text-[var(--primary)] transition-colors pt-1 border-t border-white/10"
                  style={{ transform: 'translateZ(10px)' }}>
                  <span>View Details</span>
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Link>
            </Card3D>
          )
        })}
      </div>
    </section>
  )
}

export default Projects
