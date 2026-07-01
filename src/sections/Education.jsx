import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaGraduationCap, FaStar, FaArrowRight, FaCalendarAlt } from 'react-icons/fa'
import { educationList } from '../data/education.js'

function Education() {
  return (
    <section id="education" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="/images/bg-abstract-1.jpg" alt="" aria-hidden="true"
          className="absolute top-0 left-0 w-1/2 h-1/2 object-cover"
          style={{ opacity: 0.35 }} loading="lazy" />
        <img src="/images/workspace-2.jpg" alt="" aria-hidden="true"
          className="absolute bottom-0 right-0 w-1/2 h-1/2 object-cover"
          style={{ opacity: 0.35 }} loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/60 via-[#020617]/50 to-[#020617]/60" />
        <div className="absolute top-1/3 right-[-10%] w-72 h-72 bg-violet-600/10 vibrant-glow" />
        <div className="absolute bottom-1/4 left-[-10%] w-72 h-72 bg-amber-600/10 vibrant-glow" />
      </div>

      <div className="relative z-10 container-custom flex flex-col items-center">
        {/* Header - Centered */}
        <div className="max-w-4xl mb-12 md:mb-24 text-center space-y-4 md:space-y-6">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs md:text-sm font-black text-pink-400 uppercase tracking-[0.4em]"
          >
            Learning
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-display text-4xl sm:text-6xl lg:text-8xl font-black text-white tracking-tighter uppercase leading-none"
          >
            Education
          </motion.h2>
          <div className="w-24 md:w-32 h-[2px] bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full mx-auto" />
        </div>

        <div className="space-y-4 md:space-y-8 w-full max-w-5xl">
          {educationList.map((edu, idx) => (
            <motion.div
              key={edu.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                to={`/education/${edu.slug}`}
                className="group relative block glass-card-vibrant p-6 md:p-10 border-white/10 hover:border-indigo-500/40 overflow-hidden rounded-3xl"
              >
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
                  <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-8">
                    <div className="p-5 rounded-2xl bg-white/10 border border-white/20 text-indigo-400 group-hover:scale-110 transition-transform shadow-xl">
                      <FaGraduationCap className="text-3xl md:text-4xl" />
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <h3 className="text-xl md:text-3xl font-black text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight">
                        {edu.degree}
                      </h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs md:text-sm font-serif italic text-gray-400">
                        <span className="text-gray-200 font-bold uppercase tracking-widest not-italic text-xs md:text-sm">
                          {edu.institution}
                        </span>
                        <span className="flex items-center gap-2">
                          <FaCalendarAlt className="text-xs" />
                          {edu.period}
                        </span>
                      </div>
                      <div className="pt-2">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-widest shadow-lg">
                          <FaStar className="text-xs md:text-sm" />
                          {edu.cgpa} / {edu.cgpaMax} CGPA
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs md:text-sm font-black text-gray-400 group-hover:text-white transition-colors uppercase tracking-[0.2em]">
                    VIEW DETAILS
                    <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
