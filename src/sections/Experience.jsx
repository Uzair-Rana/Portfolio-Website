import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaBriefcase, FaArrowRight, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa'
import { useSettings } from '../context/SettingsContext.jsx'

function Experience() {
  const { data } = useSettings()
  const experiences = data.experiences

  return (
    <section id="experience" className="section-padding relative overflow-hidden bg-white">

      <div className="relative z-10 container-custom flex flex-col items-center">
        {/* Header - Centered */}
        <div className="max-w-4xl mb-12 md:mb-24 text-center space-y-4 md:space-y-6">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs md:text-sm font-black text-red-600 uppercase tracking-[0.4em]"
          >
            Career
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-display text-4xl sm:text-6xl lg:text-8xl font-black text-gray-900 tracking-tighter leading-none"
          >
            Professional <span className="text-gradient-vibrant">Journey</span>
          </motion.h2>
          <div className="w-24 md:w-32 h-[2px] bg-gradient-to-r from-blue-600 to-red-600 rounded-full mx-auto" />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-lg md:text-2xl font-serif italic text-black max-w-2xl mx-auto leading-relaxed pt-4"
          >
            A timeline of my professional growth and the impactful roles I've held in the industry.
          </motion.p>
        </div>

        <div className="space-y-4 md:space-y-8 w-full max-w-5xl">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id || exp.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                to={`/experience/${exp.slug}`}
                className="group relative block glass-card-vibrant p-6 md:p-10 border-gray-300 hover:border-blue-400 hover:shadow-md overflow-hidden rounded-lg transition-all"
              >
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
                  <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-8">
                    <div className="p-5 rounded-lg bg-gray-100 border border-gray-300 text-blue-600 group-hover:scale-110 transition-transform shadow-sm">
                      <FaBriefcase className="text-3xl md:text-4xl" />
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl md:text-3xl font-black text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">
                          {exp.role}
                        </h3>
                        {exp.current && (
                          <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-xs font-black uppercase tracking-widest border border-green-300 shadow-sm">
                            Present
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs md:text-sm font-serif italic text-black">
                        <span className="text-gray-800 font-bold uppercase tracking-widest not-italic text-xs md:text-sm">
                          {exp.company}
                        </span>
                        <span className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-xs" />
                          {exp.location}
                        </span>
                        <span className="flex items-center gap-2">
                          <FaCalendarAlt className="text-xs" />
                          {exp.period}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs md:text-sm font-black text-gray-600 group-hover:text-blue-600 transition-colors uppercase tracking-[0.2em]">
                    VIEW CASE
                    <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>

                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>

        {experiences.length === 0 && (
          <div className="text-center py-12 md:py-20 glass-card-vibrant rounded-3xl w-full max-w-3xl">
            <p className="text-gray-400 font-black uppercase tracking-widest text-sm">Experience history is currently empty</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Experience
