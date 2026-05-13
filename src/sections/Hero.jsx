import { m as M } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaGithub, FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaCode } from 'react-icons/fa'
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

  // Dynamic stats — project count comes from live data
  const statDefs = [
    { icon: FaBriefcase, value: `${data.experiences.length || 1}+`, label: 'Year Experience', color: 'text-[var(--primary)]' },
    { icon: FaCode, value: `${data.projects.length}`, label: 'Live Projects', color: 'text-[var(--accent)]' },
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#080b14]">

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.07] blur-[100px]"
          style={{ background: 'var(--primary)' }} />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full opacity-[0.07] blur-[100px]"
          style={{ background: 'var(--accent)' }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.15) 1px,transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-white/[0.04] hidden lg:block" />
        <div className="absolute right-[8%] top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full border border-white/[0.025] hidden lg:block" />
      </div>

      <div className="relative z-10 container-padding mx-auto max-w-6xl pt-28 pb-20 flex flex-col lg:flex-row items-center gap-16">

        {/* ── Left: text ── */}
        <div className="flex-1 text-center lg:text-left">

          {/* Availability badge */}
          {settings.available && (
            <M.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              {settings.availableText}
            </M.div>
          )}

          {/* Name — both parts shimmer */}
          <M.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className="name-gradient">{settings.firstName || 'M. Uzair'}</span>
            <br />
            <span className="name-gradient" style={{ animationDelay: '0.6s' }}>
              {settings.lastName || 'Anjum'}
            </span>
          </M.h1>

          <M.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-xl sm:text-2xl font-semibold text-white/70"
          >
            {settings.title}
          </M.p>

          <M.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 text-white/55 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
          >
            {settings.bio}
          </M.p>

          <M.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-3 flex items-center justify-center lg:justify-start gap-1.5 text-white/35 text-sm"
          >
            <FaMapMarkerAlt className="text-[var(--primary)]" />
            {settings.location}
          </M.div>

          {/* Tech badges */}
          <M.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 flex flex-wrap gap-2 justify-center lg:justify-start"
          >
            {techBadges.map(({ icon: Icon, label, color }, i) => (
              <M.span
                key={label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.45 + i * 0.07 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-white/70"
              >
                <Icon className={color} />
                {label}
              </M.span>
            ))}
          </M.div>

          {/* CTA buttons */}
          <M.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            <a href="#projects"
              className="px-6 py-3 rounded-xl bg-[var(--primary)] text-black font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-[var(--primary)]/20">
              View My Work
            </a>
            <Link to="/contact"
              className="px-6 py-3 rounded-xl border border-white/20 text-white/80 font-semibold text-sm hover:bg-white/5 transition-colors inline-flex items-center gap-2">
              <FaEnvelope className="text-[var(--primary)]" />
              Get In Touch
            </Link>
            <a href={settings.github} target="_blank" rel="noreferrer"
              className="px-6 py-3 rounded-xl border border-white/20 text-white/80 font-semibold text-sm hover:bg-white/5 transition-colors inline-flex items-center gap-2">
              <FaGithub />
              GitHub
            </a>
          </M.div>
        </div>

        {/* ── Right: avatar + stats ── */}
        <M.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="flex-shrink-0 flex flex-col items-center gap-5"
        >
          {/* Avatar with Open to Work badge */}
          <div className="relative">
            {/* Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] blur-3xl opacity-25 scale-110" />
            {/* Decorative rings */}
            <div className="absolute -inset-3 rounded-full border border-dashed border-white/10" />
            <div className="absolute -inset-1.5 rounded-full border border-white/8" />
            {/* Photo */}
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full border-2 border-white/15 overflow-hidden bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20">
              <img
                src={settings.photoUrl}
                alt={`${settings.firstName} ${settings.lastName}`}
                fetchpriority="high"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-center"
              />
              {/* Open to Work overlay badge on image */}
              {settings.openToWork && (
                <div className="absolute bottom-0 left-0 right-0 py-2 flex items-center justify-center gap-1.5 bg-gradient-to-t from-emerald-600/90 to-emerald-500/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-white text-[11px] font-bold tracking-widest uppercase">
                    Open to Work
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Stats — dynamic, hidden if toggled off */}
          {settings.showStats && (
            <div className="flex items-stretch gap-3">
              {statDefs.map(({ icon: Icon, value, label, color }, i) => (
                <M.div
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                  className="flex flex-col items-center justify-center px-5 py-3 rounded-2xl bg-white/5 border border-white/10 min-w-[100px] gap-1"
                >
                  <Icon className={`text-lg ${color}`} />
                  <span className="text-xl font-extrabold heading-gradient leading-none">{value}</span>
                  <span className="text-[11px] text-white/45 text-center leading-tight">{label}</span>
                </M.div>
              ))}
            </div>
          )}
        </M.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/25 text-xs">
        <span>Scroll</span>
        <div className="w-0.5 h-6 bg-gradient-to-b from-white/30 to-transparent rounded-full animate-bounce" />
      </div>
    </section>
  )
}

export default Hero
