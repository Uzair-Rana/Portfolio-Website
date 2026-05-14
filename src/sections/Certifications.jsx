import { motion } from 'framer-motion'
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
    <section id="certifications" className="section-padding relative overflow-hidden bg-[#020617]/50">
      <div className="container-custom flex flex-col items-center">
        {/* Header - Centered */}
        <div className="max-w-4xl mb-12 md:mb-24 text-center space-y-4 md:space-y-6">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] md:text-xs font-black text-indigo-400 uppercase tracking-[0.4em]"
          >
            Achievements
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-display text-4xl sm:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-none"
          >
            Certifications
          </motion.h2>
          <div className="w-20 md:w-32 h-[2px] bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full mx-auto" />
        </div>

        {certifications.length === 0 && (
          <p className="text-white/30 text-center py-12 font-serif italic text-xl">No certifications yet. Add some in Settings.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-6xl">
          {certifications.map((cert, idx) => {
            const Icon = iconComponents[cert.iconName] ?? FaCertificate
            return (
              <motion.div
                key={cert.id || cert.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  to={`/certifications/${cert.slug}`}
                  className="group relative block glass-card-vibrant p-6 md:p-10 border-white/5 hover:border-indigo-500/30 overflow-hidden rounded-3xl h-full"
                >
                  <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-indigo-400 group-hover:scale-110 transition-transform shadow-xl">
                      <Icon className="text-2xl md:text-3xl" />
                    </div>

                    <div className="flex-1 space-y-2">
                      <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight leading-snug">
                        {cert.title}
                      </h3>
                      <p className="text-gray-500 text-sm md:text-base font-serif italic leading-relaxed">
                        {cert.tagline}
                      </p>
                      <div className="pt-2">
                        <span className="inline-block px-3 py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 shadow-lg">
                          Completed
                        </span>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 text-[10px] md:text-xs font-black text-gray-600 group-hover:text-white transition-colors uppercase tracking-[0.2em]">
                      DETAILS
                      <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>

                  {/* Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500" />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Certifications;
