import { motion } from 'framer-motion'
import { FaGithub, FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaCode, FaArrowRight } from 'react-icons/fa'
import { SiDjango, SiPostgresql, SiVuedotjs, SiReact } from 'react-icons/si'
import { useSettings } from '../context/SettingsContext.jsx'

const techBadges = [
  { icon: SiDjango, label: 'Django', color: 'text-emerald-400' },
  { icon: SiPostgresql, label: 'PostgreSQL', color: 'text-blue-400' },
  { icon: SiVuedotjs, label: 'Vue.js', color: 'text-green-400' },
  { icon: SiReact, label: 'React.js', color: 'text-cyan-400' },
]

function Hero() {
  const { settings, data } = useSettings()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617] noise-bg pt-20">
      {/* ── Background Symmetry ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-indigo-600/10 vibrant-glow" />
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/15 vibrant-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-600/15 vibrant-glow" />
      </div>

      <div className="relative z-10 w-full container-custom flex flex-col items-center text-center mx-auto py-12 md:py-32">
        {/* Availability Badge */}
        {settings.available && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 md:mb-12 px-5 py-2 rounded-full glass-card-vibrant border-white/20 text-[10px] font-black tracking-[0.3em] text-emerald-400 uppercase flex items-center gap-3"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            {settings.availableText}
          </motion.div>
        )}

        {/* ── NAME SECTION ── */}
        <div className="relative w-full space-y-4 md:space-y-6">
          <div className="flex items-center justify-center gap-4 md:gap-6">
            <div className="hidden sm:block w-8 md:w-12 h-[1px] bg-gradient-to-r from-transparent to-indigo-500/50" />
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-serif italic text-lg md:text-2xl text-indigo-400/90"
            >
              Creative Developer
            </motion.span>
            <div className="hidden sm:block w-8 md:w-12 h-[1px] bg-gradient-to-l from-transparent to-pink-500/50" />
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="heading-huge font-display text-white tracking-tight flex flex-col items-center"
          >
            <span className="text-gradient-vibrant drop-shadow-[0_10px_30px_rgba(99,102,241,0.3)]">
              {settings.firstName || 'M. Uzair'}
            </span>
            <span className="text-white/90 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              {settings.lastName || 'Anjum'}
            </span>
          </motion.h1>
        </div>

        {/* ── SUBTITLE & BIO ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-8 md:mt-12 space-y-4 md:space-y-6 max-w-2xl px-4"
        >
          <h2 className="text-xl md:text-3xl font-black text-white tracking-tight uppercase">
            {settings.title}
          </h2>
          <p className="text-lg md:text-2xl font-serif italic text-gray-400 leading-relaxed">
            {settings.bio}
          </p>
        </motion.div>

        {/* ── CTAs - Row on all screens ── */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 md:mt-16 flex flex-row items-center justify-center gap-3 md:gap-8 w-full px-4"
        >
          <a 
            href="#projects" 
            className="group flex-1 sm:flex-none px-4 sm:px-14 py-4 md:py-6 bg-white text-black font-black rounded-xl md:rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 md:gap-4 uppercase tracking-tighter text-sm sm:text-lg md:text-xl sm:min-w-[260px]"
          >
            <span>Projects</span>
            <FaArrowRight className="group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform text-xs md:text-base" />
          </a>
          <a 
            href="/contact" 
            className="flex-1 sm:flex-none px-4 sm:px-14 py-4 md:py-6 glass-card-vibrant rounded-xl md:rounded-2xl font-black text-white hover:bg-white/10 active:scale-95 transition-all border-white/10 uppercase tracking-tighter text-sm sm:text-lg md:text-xl sm:min-w-[260px] flex items-center justify-center"
          >
            Contact
          </a>
        </motion.div>

        {/* ── TECH STACK ── */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-4"
        >
          {techBadges.map((Tech, i) => (
            <div key={i} className="px-4 md:px-6 py-3 glass-card-vibrant rounded-2xl border-white/5 flex items-center gap-3 group hover:border-white/20 transition-all">
              <Tech.icon className={`text-lg md:text-xl ${Tech.color}`} />
              <span className="text-[9px] md:text-[10px] font-black text-gray-500 group-hover:text-white uppercase tracking-[0.2em]">{Tech.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <div className="w-[1px] h-10 md:h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  )
}

export default Hero;
