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
    <section id="certifications" className="section-padding relative overflow-hidden bg-white">

      <div className="relative z-10 container-custom flex flex-col items-center">
        {/* Header - Centered */}
        <div className="max-w-4xl mb-12 md:mb-24 text-center space-y-4 md:space-y-6">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs md:text-sm font-black text-red-600 uppercase tracking-[0.4em]"
          >
            Achievements
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-display text-4xl sm:text-6xl lg:text-8xl font-black text-gray-900 tracking-tighter leading-none"
          >
            Certifications
          </motion.h2>
          <div className="w-24 md:w-32 h-[2px] bg-gradient-to-r from-blue-600 to-red-600 rounded-full mx-auto" />
        </div>

        {certifications.length === 0 && (
          <p className="text-gray-600 text-center py-12 font-serif italic text-2xl">No certifications yet. Add some in Settings.</p>
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
                  className="group relative block glass-card-vibrant p-6 md:p-10 border-gray-300 hover:border-red-400 hover:shadow-md overflow-hidden rounded-lg h-full transition-all"
                >
                  <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="p-5 rounded-lg bg-gray-100 border border-gray-300 text-red-600 group-hover:scale-110 transition-transform shadow-sm">
                      <Icon className="text-3xl md:text-4xl" />
                    </div>

                    <div className="flex-1 space-y-3">
                      <h3 className="text-xl md:text-2xl font-black text-gray-900 group-hover:text-red-600 transition-colors uppercase tracking-tight leading-snug">
                        {cert.title}
                      </h3>
                      <p className="text-black text-sm md:text-base font-serif italic leading-relaxed">
                        {cert.tagline}
                      </p>
                      <div className="pt-2">
                        <span className="inline-block px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border border-pink-500/30 bg-pink-500/10 text-pink-400 shadow-lg">
                          Completed
                        </span>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-2 text-xs font-black text-gray-400 group-hover:text-white transition-colors uppercase tracking-[0.2em]">
                      Details
                      <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>

                  {/* Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-500" />
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Certifications
