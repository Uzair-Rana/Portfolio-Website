import { motion } from 'framer-motion'
import { FaArrowRight, FaGithub, FaLinkedin, FaFilePdf, FaWhatsapp, FaEnvelope } from 'react-icons/fa'
import { SiDjango, SiPostgresql, SiVuedotjs, SiReact } from 'react-icons/si'
import { useSettings } from '../context/SettingsContext.jsx'

const techBadges = [
  { icon: SiDjango, label: 'Django', color: 'text-emerald-400' },
  { icon: SiPostgresql, label: 'PostgreSQL', color: 'text-blue-400' },
  { icon: SiVuedotjs, label: 'Vue.js', color: 'text-green-400' },
  { icon: SiReact, label: 'React.js', color: 'text-cyan-400' },
]

export default function Hero() {
  const { settings, data } = useSettings()

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020617]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/coding-setup.jpg" 
          alt="" 
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-15"
          loading="eager" 
          fetchPriority="high" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#020617]/60 to-[#020617]" />
      </div>

      {/* Animated Glow Blobs */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-[800px] h-[800px] bg-indigo-600/20 vibrant-glow"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-32 -right-32 w-[700px] h-[700px] bg-pink-600/20 vibrant-glow"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full container-custom flex flex-col items-center text-center pt-72 pb-24 gap-10">

        {/* Available Badge */}
        {settings.available && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-emerald-500/30 bg-emerald-500/15 text-emerald-400 text-xs font-black tracking-[0.3em] uppercase backdrop-blur-md"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
            </span>
            {settings.availableText}
          </motion.div>
        )}

        {/* Role Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-serif italic text-xl md:text-2xl text-pink-400 tracking-wide"
        >
          Full Stack Engineer · Lahore, Pakistan
        </motion.p>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-0 leading-none"
        >
          <h1 className="font-display font-black tracking-tighter text-white"
            style={{ fontSize: 'clamp(4rem, 12vw, 9rem)', lineHeight: 0.9 }}
          >
            <span className="text-gradient-vibrant">
              {settings.firstName || 'M. Uzair'}
            </span>
            {' '}
            <span className="text-white">
              {settings.lastName || 'Anjum'}
            </span>
          </h1>
          <p className="text-gray-300 font-serif italic text-xl md:text-3xl mt-8 max-w-3xl mx-auto leading-relaxed">
            {settings.bio}
          </p>
        </motion.div>

        {/* Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.8, type: "spring" }}
          className="relative mt-10"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/40 via-purple-500/30 to-pink-500/40 blur-3xl scale-125" />
          <div className="relative w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[420px] rounded-3xl overflow-hidden border border-white/20">
            <img
              src={settings.photoUrl || '/images/profile.jpg'}
              alt={`${settings.firstName} ${settings.lastName}`}
              className="w-full h-full object-cover object-top"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/70 via-transparent to-transparent" />
          </div>
          {settings.openToWork && (
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-6 py-2.5 rounded-full bg-emerald-500 text-white text-xs font-black uppercase tracking-[0.3em] whitespace-nowrap flex items-center gap-2 shadow-2xl shadow-emerald-500/30"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              Open to Work
            </motion.span>
          )}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col items-center justify-center gap-4 mt-10"
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a 
              href="#projects"
              className="group relative overflow-hidden px-10 py-4 bg-white text-black font-black rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 uppercase tracking-tighter text-lg"
            >
              <span className="relative z-10">View Work</span>
              <FaArrowRight className="group-hover:translate-x-2 transition-transform text-sm relative z-10" />
            </a>
            <a 
              href={settings.resumeUrl} download
              className="group px-10 py-4 rounded-2xl font-black text-white hover:bg-white/10 transition-all border-2 border-white/20 uppercase tracking-tighter text-lg flex items-center gap-3 backdrop-blur-md"
            >
              <FaFilePdf className="text-xl" />
              Resume
            </a>
          </div>
          <div className="flex gap-3">
            <a 
              href={settings.github} 
              target="_blank" 
              rel="noreferrer"
              className="group w-14 h-14 rounded-2xl flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all backdrop-blur-md"
            >
              <FaGithub className="text-xl group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href={settings.linkedin} 
              target="_blank" 
              rel="noreferrer"
              className="group w-14 h-14 rounded-2xl flex items-center justify-center border border-white/20 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all backdrop-blur-md"
            >
              <FaLinkedin className="text-xl group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href={settings.whatsapp} 
              target="_blank" 
              rel="noreferrer"
              className="group w-14 h-14 rounded-2xl flex items-center justify-center border border-white/20 text-white/70 hover:text-green-400 hover:border-green-400/40 hover:bg-green-400/5 transition-all backdrop-blur-md"
            >
              <FaWhatsapp className="text-xl group-hover:scale-110 transition-transform" />
            </a>
            <a 
              href={`mailto:${settings.email}`} 
              className="group w-14 h-14 rounded-2xl flex items-center justify-center border border-white/20 text-white/70 hover:text-indigo-400 hover:border-indigo-400/40 hover:bg-indigo-400/5 transition-all backdrop-blur-md"
            >
              <FaEnvelope className="text-xl group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* Tech Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-6"
        >
          {techBadges.map((Tech, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.3 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 flex items-center gap-3 hover:border-white/30 hover:bg-white/10 transition-all backdrop-blur-md"
            >
              <Tech.icon className={`text-2xl ${Tech.color}`} />
              <span className="text-xs font-black text-gray-300 uppercase tracking-[0.2em]">{Tech.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        {settings.showStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex items-center gap-4 md:gap-8 mt-6"
          >
            {[
              { val: `${data.experiences.length}+`, label: 'Years Experience' },
              { val: data.projects.length, label: 'Projects Built' },
              { val: '3.57', label: 'CGPA' },
            ].map(({ val, label }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.6 + i * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="text-center px-6 py-4 rounded-2xl border border-white/10 bg-white/5 min-w-[120px] backdrop-blur-md"
              >
                <p className="text-2xl md:text-4xl font-black text-gradient-vibrant leading-none">{val}</p>
                <p className="text-xs text-gray-400 uppercase tracking-[0.2em] font-bold mt-1.5">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>


    </section>
  )
}
