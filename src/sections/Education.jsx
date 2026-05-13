import { m as M } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaGraduationCap, FaStar, FaArrowRight } from 'react-icons/fa'
import { educationList } from '../data/education.js'

function Education() {
  return (
    <section id="education" className="container-padding mx-auto max-w-6xl py-20" style={{ perspective: '1200px' }}>
      <M.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="mb-3"
      >
        <span className="text-sm font-semibold text-[var(--primary)] uppercase tracking-widest">
          Academic Background
        </span>
      </M.div>

      <M.h2
        initial={{ opacity: 0, y: 30, rotateX: -15 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl sm:text-5xl font-extrabold heading-gradient mb-12"
      >
        Education
      </M.h2>

      <div className="space-y-5">
        {educationList.map((edu, idx) => (
          <M.div
            key={edu.slug}
            initial={{ opacity: 0, x: 80, rotateY: 15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotateY: -2, x: -4, scale: 1.01, transition: { duration: 0.2 } }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Link
              to={`/education/${edu.slug}`}
              className="group glass-card rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6 block"
            >
              <div
                className="w-14 h-14 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center flex-shrink-0"
                style={{ transform: 'translateZ(20px)' }}
              >
                <FaGraduationCap className="text-2xl text-[var(--primary)]" />
              </div>

              <div className="flex-1 min-w-0" style={{ transform: 'translateZ(10px)' }}>
                <h3 className="text-xl font-bold text-white group-hover:text-[var(--primary)] transition-colors mb-1">
                  {edu.degree}
                </h3>
                <p className="text-[var(--primary)] font-semibold text-sm">{edu.institution}</p>
                <p className="text-white/40 text-xs mt-0.5">{edu.period}</p>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--highlight)]/10 border border-[var(--highlight)]/20">
                  <FaStar className="text-[var(--highlight)] text-xs" />
                  <span className="text-[var(--highlight)] font-bold text-sm">{edu.cgpa}</span>
                  <span className="text-white/40 text-xs">/ {edu.cgpaMax} CGPA</span>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end gap-3 flex-shrink-0" style={{ transform: 'translateZ(14px)' }}>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm whitespace-nowrap">
                  {edu.period}
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

export default Education
