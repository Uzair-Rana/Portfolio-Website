import { motion } from 'framer-motion'
import { FaCode, FaRocket, FaUsers, FaLightbulb, FaMapMarkerAlt, FaEnvelope, FaPhone, FaGithub } from 'react-icons/fa'
import { useSettings } from '../context/SettingsContext.jsx'

const strengths = [
  { icon: FaCode, label: 'Full-Stack Development', desc: 'Build complete applications—database design, backend APIs, responsive interfaces', color: 'text-indigo-400' },
  { icon: FaRocket, label: 'Problem-Solving', desc: 'Debug performance issues, optimize queries, fix what breaks in production', color: 'text-pink-400' },
  { icon: FaUsers, label: 'Team Work', desc: 'Mentor juniors, code review, Git workflows, ship features together', color: 'text-violet-400' },
  { icon: FaLightbulb, label: 'Practical Code', desc: 'Write code that works, not code that looks impressive. Pragmatic over perfect.', color: 'text-emerald-400' },
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
    <section id="about" className="section-padding relative overflow-hidden bg-white">

      {/* Removed excessive background effects for cleaner look */}

      <div className="relative z-10 container-custom">
        {/* Header */}
        <div className="max-w-4xl mb-16 md:mb-24 space-y-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs md:text-sm font-black text-red-600 uppercase tracking-[0.4em]"
          >
            Who I Am
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-display text-4xl sm:text-6xl lg:text-8xl font-black text-gray-900 tracking-tighter leading-none"
          >
            Full-Stack Developer <span className="text-gradient-vibrant">Building Real Solutions</span>
          </motion.h2>
          <div className="w-24 md:w-32 h-[2px] bg-gradient-to-r from-blue-600 to-red-600 rounded-full" />
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
            <div className="space-y-5 text-black text-lg md:text-xl leading-relaxed">
              <p>
                I'm a full-stack developer based in Lahore, Pakistan. I've spent the last couple of years building
                web applications and custom software—mostly backend work with Django and databases, but I handle
                frontends too (React, Vue, whatever the job needs). Right now I'm at DevNest System building custom
                solutions for clients.
              </p>
              <p>
                I like solving real problems. Slow endpoints? I'll optimize the queries and add caching. Repetitive
                workflows? Automate them. I use AI tools like Claude in my daily work to write and review code faster.
                I'm also into mentoring junior devs and working through the messy parts of production systems.
              </p>
            </div>

            {/* Coding image inline — proportional height */}
            <div className="relative rounded-lg overflow-hidden border border-gray-300 h-44">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-300">
              {quickInfo.map((info, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className={`p-4 rounded-lg bg-gray-100 border border-gray-300 ${info.color} group-hover:scale-110 transition-transform shadow-sm`}>
                    <info.icon className="text-xl" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs text-gray-600 uppercase tracking-[0.2em] font-black">{info.label}</p>
                    {info.href ? (
                      <a href={info.href}
                        target={info.href.startsWith('http') ? '_blank' : undefined}
                        rel={info.href.startsWith('http') ? 'noreferrer' : undefined}
                        className={`${info.color} font-bold text-base truncate block hover:underline`}>
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-gray-900 font-bold tracking-tight text-base truncate">{info.value}</p>
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
              className="relative rounded-lg overflow-hidden border border-gray-300 h-36"
            >
              <img
                src="/images/web-design.jpg"
                alt="Web design process"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
              <span className="absolute bottom-2.5 left-3.5 text-gray-700 font-black text-xs uppercase tracking-widest">
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
                className="glass-card-vibrant p-5 space-y-2 transition-all group rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg bg-gray-100 border border-gray-300 ${s.color} group-hover:scale-110 transition-transform`}>
                    <s.icon className="text-lg" />
                  </div>
                  <h3 className="text-sm font-black text-gray-900 tracking-tight uppercase">{s.label}</h3>
                </div>
                <p className="text-black text-xs font-serif italic leading-relaxed pl-1">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
