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
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white">
      {/* Background - light theme */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-50 via-white to-blue-50"></div>

      {/* Removed animated glow blobs for cleaner look */}

      {/* Main Content */}
      <div className="relative z-10 w-full container-custom flex flex-col items-center text-center pt-20 sm:pt-24 md:pt-32 lg:pt-40 xl:pt-48 pb-16 sm:pb-20 md:pb-24 gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-4">

        {/* Available Badge */}
        {settings.available && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full border border-green-200 bg-green-50 text-green-700 text-[10px] sm:text-xs font-black tracking-[0.25em] sm:tracking-[0.3em] uppercase"
          >
            <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-full w-full bg-emerald-400" />
            </span>
            {settings.availableText}
          </motion.div>
        )}

        {/* Role Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-serif italic text-base sm:text-lg md:text-xl lg:text-2xl text-red-600 tracking-wide"
        >
          Full-Stack Developer · Lahore, Pakistan
        </motion.p>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-0 leading-none"
        >
          <h1 className="font-display font-black tracking-tighter"
            style={{ fontSize: 'clamp(2.5rem, 10vw, 9rem)', lineHeight: 0.9 }}
          >
            <span className="text-gradient-vibrant">
              {settings.firstName || 'M. Uzair'}
            </span>
            {' '}
            <span className="text-gray-900">
              {settings.lastName || 'Anjum'}
            </span>
          </h1>
          <p className="text-black font-serif italic text-sm sm:text-lg md:text-xl lg:text-3xl mt-4 sm:mt-6 md:mt-8 max-w-lg sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed">
            {settings.bio}
          </p>
        </motion.div>

        {/* Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative mt-6 sm:mt-8 md:mt-10"
        >
          <div className="w-48 h-60 sm:w-56 sm:h-72 md:w-64 md:h-80 lg:w-80 lg:h-[420px] rounded-lg overflow-hidden border border-gray-300 shadow-lg">
            <img
              src={settings.photoUrl || '/images/profile.jpg'}
              alt={`${settings.firstName} ${settings.lastName}`}
              className="w-full h-full object-cover object-top"
              fetchPriority="high"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent" />
          </div>
          {settings.openToWork && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute -bottom-4 sm:-bottom-5 left-1/2 -translate-x-1/2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-green-600 text-white text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] whitespace-nowrap flex items-center gap-1.5 sm:gap-2 shadow-lg"
            >
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white animate-pulse" />
              Open to Work
            </motion.span>
          )}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 md:mt-10"
        >
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href="#projects"
              className="group relative overflow-hidden px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-blue-600 text-white font-black rounded-lg shadow-md hover:bg-blue-700 active:scale-95 transition-all flex items-center gap-2 sm:gap-3 uppercase tracking-tighter text-sm sm:text-lg"
            >
              <span className="relative z-10">View Work</span>
              <FaArrowRight className="group-hover:translate-x-2 transition-transform text-xs sm:text-sm relative z-10" />
            </a>
            <a
              href={settings.resumeUrl} download
              className="group px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-lg font-black text-gray-700 hover:bg-gray-200 transition-all border-2 border-gray-300 uppercase tracking-tighter text-sm sm:text-lg flex items-center gap-2 sm:gap-3"
            >
              <FaFilePdf className="text-lg sm:text-xl" />
              Resume
            </a>
          </div>
          <div className="flex gap-2 sm:gap-3">
            <a
              href={settings.github}
              target="_blank"
              rel="noreferrer"
              className="group w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center border border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400 hover:bg-gray-100 transition-all"
            >
              <FaGithub className="text-lg sm:text-xl group-hover:scale-110 transition-transform" />
            </a>
            <a
              href={settings.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center border border-gray-300 text-gray-600 hover:text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition-all"
            >
              <FaLinkedin className="text-lg sm:text-xl group-hover:scale-110 transition-transform" />
            </a>
            <a
              href={settings.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="group w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center border border-gray-300 text-gray-600 hover:text-green-600 hover:border-green-400 hover:bg-green-50 transition-all"
            >
              <FaWhatsapp className="text-lg sm:text-xl group-hover:scale-110 transition-transform" />
            </a>
            <a
              href={`mailto:${settings.email}`}
              className="group w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center border border-gray-300 text-gray-600 hover:text-red-600 hover:border-red-400 hover:bg-red-50 transition-all"
            >
              <FaEnvelope className="text-lg sm:text-xl group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* Tech Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-6"
        >
          {techBadges.map((Tech, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.3 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="px-3 sm:px-5 py-2 sm:py-3 rounded-lg border border-gray-200 bg-gray-50 flex items-center gap-2 sm:gap-3 hover:border-gray-300 hover:bg-gray-100 transition-all"
            >
              <Tech.icon className={`text-lg sm:text-2xl ${Tech.color}`} />
              <span className="text-[10px] sm:text-xs font-black text-gray-700 uppercase tracking-[0.15em] sm:tracking-[0.2em]">{Tech.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        {settings.showStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-8 mt-4 sm:mt-6"
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
                className="text-center px-4 sm:px-6 py-3 sm:py-4 rounded-lg border border-gray-200 bg-gray-50 min-w-[100px] sm:min-w-[120px]"
              >
                <p className="text-xl sm:text-2xl md:text-4xl font-black text-gradient-vibrant leading-none">{val}</p>
                <p className="text-[10px] sm:text-xs text-gray-600 uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold mt-1 sm:mt-1.5">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>


    </section>
  )
}
