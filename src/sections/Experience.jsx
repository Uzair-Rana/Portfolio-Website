import { m as M } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaBriefcase, FaArrowRight } from 'react-icons/fa'
import { useSettings } from '../context/SettingsContext.jsx'

function Experience() {
  const { data } = useSettings()
  const experiences = data.experiences

  return (
    <section id="experience" className="container-padding mx-auto max-w-6xl py-20" style={{ perspective: '1200px' }}>
      <M.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="mb-3"
      >
        <span className="text-sm font-semibold text-[var(--primary)] uppercase tracking-widest">
          Where I've Worked
        </span>
      </M.div>

      <M.h2
        initial={{ opacity: 0, y: 30, rotateX: -15 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl sm:text-5xl font-extrabold heading-gradient mb-12"
      >
        Experience
      </M.h2>

      {experiences.length === 0 && (
        <p className="text-white/30 text-center py-12">No experience yet. Add some in Settings.</p>
      )}

      <div className="space-y-5">
        {experiences.map((exp, idx) => (
          <M.div
            key={exp.id || exp.slug}
            initial={{ opacity: 0, x: -80, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotateY: 2, x: 6, transition: { duration: 0.2 } }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Link
              to={`/experience/${exp.slug}`}
              className="group glass-card rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6 block"
            >
              {/* Icon — pops forward */}
              <div
                className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center flex-shrink-0"
                style={{ transform: 'translateZ(16px)' }}
              >
                <FaBriefcase className="text-2xl text-[var(--primary)]" />
              </div>

              <div className="flex-1 min-w-0" style={{ transform: 'translateZ(8px)' }}>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-[var(--primary)] transition-colors">
                    {exp.role}
                  </h3>
                  {exp.current && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-[var(--primary)] font-semibold text-sm">{exp.company}</p>
                <p className="text-white/40 text-xs mt-0.5">{exp.location}</p>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                  {(exp.summary || []).map((s, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-white/55 text-sm">
                      <span className="w-1 h-1 rounded-full bg-[var(--primary)] flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end gap-3 flex-shrink-0" style={{ transform: 'translateZ(12px)' }}>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm whitespace-nowrap">
                  {exp.period}
                </span>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-white/30 group-hover:text-[var(--primary)] transition-colors">
                  <span className="hidden sm:inline text-xs">Details</span>
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </div>
            </Link>
          </M.div>
        ))}
      </div>
    </section>
  )
}

export default Experience
