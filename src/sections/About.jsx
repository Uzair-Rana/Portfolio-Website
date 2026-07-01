import { motion } from 'framer-motion'
import { FaCode, FaRocket, FaUsers, FaLightbulb, FaMapMarkerAlt, FaEnvelope, FaPhone, FaGithub } from 'react-icons/fa'
import { useSettings } from '../context/SettingsContext.jsx'

const strengths = [
  { icon: FaCode, label: 'Full-Stack Development', desc: 'End-to-end web apps from DB schema to polished UI', color: 'text-indigo-400' },
  { icon: FaRocket, label: 'API Integration', desc: 'Third-party APIs, automation workflows, webhooks', color: 'text-pink-400' },
  { icon: FaUsers, label: 'Team Collaboration', desc: 'Cross-functional teams, Git workflows, code reviews', color: 'text-violet-400' },
  { icon: FaLightbulb, label: 'Clean Code', desc: 'Maintainable, scalable, and well-documented solutions', color: 'text-emerald-400' },
]

function About() {
  const { settings } = useSettings()

  const quickInfo = [
    { icon: FaMapMarkerAlt, label: 'Location', value: settings.location, href: null, color: 'text-rose-400' },
    { icon: FaEnvelope, label: 'Email', value: settings.email, href: `mailto:${settings.email}`, color: 'text-indigo-400' },
    { icon: FaPhone, label: 'Phone', value: settings.phone, href: `tel:${settings.phone}`, color: 'text-emerald-400' },
    { icon: FaGithub, label: 'GitHub', value: 'github.com/Uzair-Rana', href: settings.github, color: 'text-violet-400' },
  ]

  return (
    <section id="about" className="section-padding relative overflow-hidden">

      {/* ── Subtle image background ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/developer-desktop.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.35 }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617]/60 via-[#020617]/50 to-[#020617]/60" />
      </div>

      <div className="absolute top-1/2 left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 vibrant-glow z-0" />
      <div className="absolute top-1/2 right-[-10%] w-[40%] h-[40%] bg-pink-600/10 vibrant-glow z-0" />

      <div className="relative z-10 container-custom">
        {/* Header */}
        <div className="max-w-4xl mb-16 md:mb-24 space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs md:text-sm font-black text-pink-400 uppercase tracking-[0.4em]"
          >
            The Architect
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-display text-4xl sm:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-none"
          >
            Crafting Digital <span className="text-gradient-vibrant">Precision</span>
          </motion.h2>
          <div className="w-24 md:w-32 h-[2px] bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full" />
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-5 gap-12 md:gap-16 items-start">

          {/* Left — Text + contacts (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-8"
          >
            <div className="space-y-5 text-gray-200 text-lg md:text-xl font-serif italic leading-relaxed">
              <p>
                Motivated and detail-oriented Full-Stack Developer with 1+ year of hands-on industry experience
                building scalable, production-grade web applications at SystemsD, Lahore.
              </p>
              <p>
                I specialize in backend development using Django and PostgreSQL, with strong frontend expertise
                in Vue.js, React.js, and Tailwind CSS.
              </p>
            </div>

            {/* Coding image inline — proportional height */}
            <div className="relative rounded-xl overflow-hidden border border-white/10 h-44">
              <img
                src="/images/coding-main.jpg"
                alt="Coding workspace"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/70 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="text-white font-black text-sm uppercase tracking-widest">At work</span>
              </div>
            </div>

            {/* Quick info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
              {quickInfo.map((info, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className={`p-4 rounded-2xl bg-white/10 border border-white/20 ${info.color} group-hover:scale-110 transition-transform shadow-lg`}>
                    <info.icon className="text-xl" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs text-gray-400 uppercase tracking-[0.2em] font-black">{info.label}</p>
                    {info.href ? (
                      <a href={info.href}
                        target={info.href.startsWith('http') ? '_blank' : undefined}
                        rel={info.href.startsWith('http') ? 'noreferrer' : undefined}
                        className={`${info.color} font-bold text-base truncate block hover:underline`}>
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-white font-bold tracking-tight text-base truncate">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Strength cards + side image (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Side image — shorter, less dominant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-xl overflow-hidden border border-white/8 h-36"
            >
              <img
                src="/images/web-design.jpg"
                alt="Web design process"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/70 to-transparent" />
              <span className="absolute bottom-2.5 left-3.5 text-white/60 font-black text-xs uppercase tracking-widest">
                Creative Process
              </span>
            </motion.div>

            {/* Strength cards */}
            {strengths.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass-card-vibrant p-5 border-white/5 space-y-2 hover:bg-white/[0.05] transition-all group rounded-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${s.color} group-hover:scale-110 transition-transform`}>
                    <s.icon className="text-lg" />
                  </div>
                  <h3 className="text-sm font-black text-white tracking-tight uppercase">{s.label}</h3>
                </div>
                <p className="text-gray-500 text-xs font-serif italic leading-relaxed pl-1">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
