import { m as M } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaCertificate, FaFlask, FaArrowRight, FaStar, FaMedal } from 'react-icons/fa'
import { useSettings } from '../context/SettingsContext.jsx'

const iconComponents = {
  certificate: FaCertificate,
  flask: FaFlask,
  star: FaStar,
  medal: FaMedal,
  award: FaMedal,
}

function Certifications() {
  const { data } = useSettings()
  const certifications = data.certifications

  return (
    <section id="certifications" className="container-padding mx-auto max-w-6xl py-20" style={{ perspective: '1200px' }}>
      <M.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="mb-3"
      >
        <span className="text-sm font-semibold text-[var(--primary)] uppercase tracking-widest">
          Achievements
        </span>
      </M.div>

      <M.h2
        initial={{ opacity: 0, y: 30, rotateX: -15 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl sm:text-5xl font-extrabold heading-gradient mb-12"
      >
        Certifications
      </M.h2>

      {certifications.length === 0 && (
        <p className="text-white/30 text-center py-12">No certifications yet. Add some in Settings.</p>
      )}

      <div className="space-y-5">
        {certifications.map((cert, idx) => {
          const Icon = iconComponents[cert.iconName] ?? FaCertificate
          // Alternate: even = slide from left, odd = slide from right
          const fromLeft = idx % 2 === 0
          return (
            <M.div
              key={cert.id || cert.slug}
              initial={{ opacity: 0, x: fromLeft ? -70 : 70, rotateY: fromLeft ? -12 : 12 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                rotateY: fromLeft ? 3 : -3,
                scale: 1.015,
                transition: { duration: 0.2 },
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <Link
                to={`/certifications/${cert.slug}`}
                className={`group rounded-2xl border ${cert.border} bg-gradient-to-br ${cert.gradient} p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6 block`}
              >
                <div
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0"
                  style={{ transform: 'translateZ(18px)' }}
                >
                  <Icon className={`text-2xl ${cert.iconColor}`} />
                </div>

                <div className="flex-1 min-w-0" style={{ transform: 'translateZ(10px)' }}>
                  <h3 className="text-xl font-bold text-white group-hover:text-[var(--primary)] transition-colors leading-snug mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">{cert.tagline}</p>
                  <span
                    className="inline-block mt-3 px-2.5 py-0.5 rounded-full text-xs font-semibold border"
                    style={{ color: cert.accentColor, borderColor: `${cert.accentColor}40`, background: `${cert.accentColor}15` }}
                  >
                    Completed
                  </span>
                </div>

                <div
                  className="flex items-center gap-1.5 text-sm font-semibold text-white/30 group-hover:text-[var(--primary)] transition-colors flex-shrink-0"
                  style={{ transform: 'translateZ(14px)' }}
                >
                  <span className="hidden sm:inline text-xs">Details</span>
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Link>
            </M.div>
          )
        })}
      </div>
    </section>
  )
}

export default Certifications
