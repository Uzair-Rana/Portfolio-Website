import { m as M } from 'framer-motion'
import { FaCode, FaRocket, FaUsers, FaLightbulb, FaMapMarkerAlt, FaEnvelope, FaPhone, FaGithub } from 'react-icons/fa'

const strengths = [
  { icon: FaCode, label: 'Full-Stack Development', desc: 'End-to-end web apps from DB schema to polished UI', color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
  { icon: FaRocket, label: 'API Integration', desc: 'Third-party APIs, automation workflows, webhooks', color: 'text-violet-400', bg: 'bg-violet-400/10' },
  { icon: FaUsers, label: 'Team Collaboration', desc: 'Cross-functional teams, Git workflows, code reviews', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  { icon: FaLightbulb, label: 'Clean Code', desc: 'Maintainable, scalable, and well-documented solutions', color: 'text-amber-400', bg: 'bg-amber-400/10' },
]

const quickInfo = [
  { icon: FaMapMarkerAlt, label: 'Location', value: 'Lahore, Pakistan', href: null, color: 'text-rose-400' },
  { icon: FaEnvelope, label: 'Email', value: 'uzairanjummrana@gmail.com', href: 'mailto:uzairanjummrana@gmail.com', color: 'text-[var(--primary)]' },
  { icon: FaPhone, label: 'Phone', value: '+92 310-7575202', href: 'tel:+923107575202', color: 'text-emerald-400' },
  { icon: FaGithub, label: 'GitHub', value: 'github.com/Uzair-Rana', href: 'https://github.com/Uzair-Rana', color: 'text-violet-400' },
]

/* 3D tilt card — rotates on hover using mouse position */
function TiltCard({ children, className, delay = 0 }) {
  return (
    <M.div
      initial={{ opacity: 0, y: 40, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        rotateY: 6,
        rotateX: -4,
        scale: 1.03,
        z: 30,
        transition: { duration: 0.25, ease: 'easeOut' },
      }}
      style={{ transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </M.div>
  )
}

function About() {
  return (
    <section id="about" className="container-padding mx-auto max-w-6xl py-20" style={{ perspective: '1200px' }}>

      <M.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="mb-3"
      >
        <span className="text-sm font-semibold text-[var(--primary)] uppercase tracking-widest">Who I Am</span>
      </M.div>

      <M.h2
        initial={{ opacity: 0, y: 20, rotateX: -20 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl sm:text-5xl font-extrabold heading-gradient mb-10"
      >
        About Me
      </M.h2>

      {/* Bio card — slides in from left with 3D flip */}
      <M.div
        initial={{ opacity: 0, x: -60, rotateY: -12 }}
        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
        className="glass-card rounded-2xl p-6 sm:p-8 mb-6"
      >
        <div className="space-y-4">
          {[
            "Motivated and detail-oriented Full-Stack Developer with 1+ year of hands-on industry experience building scalable, production-grade web applications at SystemsD, Lahore.",
            "I specialize in backend development using Django and PostgreSQL, with strong frontend expertise in Vue.js, React.js, and Tailwind CSS. I've contributed to live production systems including AI-powered SEO platforms, business assistant tools, and recruitment automation.",
            "Passionate about building clean, maintainable, and high-performance software solutions. I thrive in collaborative environments and continuously push to advance my technical expertise.",
          ].map((text, idx) => (
            <p key={idx} className="text-white/65 leading-relaxed text-base sm:text-lg">{text}</p>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickInfo.map(({ icon: Icon, label, value, href, color }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <Icon className={`text-sm ${color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-white/35 uppercase tracking-wider leading-none mb-0.5">{label}</p>
                {href ? (
                  <a href={href} target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noreferrer' : undefined}
                    className={`${color} text-sm font-medium hover:underline truncate block`}>
                    {value}
                  </a>
                ) : (
                  <p className="text-white/75 text-sm font-medium">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </M.div>

      {/* Strength cards — 3D tilt on hover, staggered entry */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ perspective: '800px' }}>
        {strengths.map(({ icon: Icon, label, desc, color, bg }, idx) => (
          <TiltCard key={label} delay={idx * 0.1} className="glass-card rounded-2xl p-5 cursor-default">
            <div className={`w-10 h-10 rounded-xl ${bg} border border-white/10 flex items-center justify-center mb-3`}>
              <Icon className={`text-lg ${color}`} />
            </div>
            <h3 className="font-bold text-white text-sm mb-1.5">{label}</h3>
            <p className="text-white/45 text-xs leading-relaxed">{desc}</p>
          </TiltCard>
        ))}
      </div>
    </section>
  )
}

export default About
