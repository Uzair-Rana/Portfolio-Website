import { motion } from 'framer-motion'
import { skillGroups } from '../data/skills.js'
import {
  SiVuedotjs, SiReact, SiTailwindcss, SiJavascript,
  SiPython, SiDjango, SiGraphql, SiPostgresql,
  SiGithub, SiPostman,
} from 'react-icons/si'
import { FaDatabase, FaCode } from 'react-icons/fa'

/* — Icon map — */
const iconMap = {
  'Vue.js': SiVuedotjs,
  'React.js': SiReact,
  'Tailwind CSS': SiTailwindcss,
  'JavaScript (ES6+)': SiJavascript,
  'Python': SiPython,
  'Django': SiDjango,
  'REST API Development': SiDjango,
  'GraphQL': SiGraphql,
  'PostgreSQL': SiPostgresql,
  'DBeaver': FaDatabase,
  'Git & GitHub': SiGithub,
  'VS Code': FaCode,
  'Postman': SiPostman,
  'Webhooks': FaCode,
  'WebSockets': FaCode,
  'ElevenLabs': FaCode,
  'Twilio': FaCode,
  'LangGraph': FaCode,
  'MCP': FaCode,
  'CloudSkills': FaCode,
}

/* — Category config — */
const categoryConfig = {
  'Frontend': {
    dot: 'bg-cyan-400', label: 'text-cyan-400', border: 'border-cyan-500/25',
    barColor: 'from-cyan-500 to-blue-500',
    img: '/images/web-design.jpg', imgLabel: 'UI / Frontend',
    desc: 'Building responsive, performant user interfaces with modern JavaScript frameworks and utility-first CSS.',
  },
  'Backend': {
    dot: 'bg-emerald-400', label: 'text-emerald-400', border: 'border-emerald-500/25',
    barColor: 'from-emerald-500 to-teal-500',
    img: '/images/coding-main.jpg', imgLabel: 'Backend / API',
    desc: 'Designing scalable server-side systems, RESTful and GraphQL APIs with Django and Python. Webhooks, websockets, and third‑party integrations included.',
  },
  'Database & AI': {
    dot: 'bg-blue-400', label: 'text-blue-400', border: 'border-blue-500/25',
    barColor: 'from-blue-500 to-indigo-500',
    img: '/images/developer-desktop.jpg', imgLabel: 'Data & AI',
    desc: 'Database management with PostgreSQL, plus AI tooling like LangGraph, MCP, and more.',
  },
  'Tools & Technologies': {
    dot: 'bg-violet-400', label: 'text-violet-400', border: 'border-violet-500/25',
    barColor: 'from-violet-500 to-purple-500',
    img: '/images/coding-setup.jpg', imgLabel: 'Dev Tools',
    desc: 'Streamlining development with Git, VS Code, Postman, and other industry-standard tooling.',
  },
}

/* — Marquee images — includes project screenshots — */
const marqueeImages = [
  { src: '/images/project-searchatlas.jpg', label: 'Search Atlas' },
  { src: '/images/project-aethermuse.jpg', label: 'AetherMuse' },
  { src: '/images/project-enginehire.jpg', label: 'EngineHire' },
  { src: '/images/coding-setup.jpg', label: 'Dev Setup' },
  { src: '/images/developer-desktop.jpg', label: 'Desktop' },
  { src: '/images/coding-main.jpg', label: 'Coding' },
  { src: '/images/bg-abstract-1.jpg', label: 'Abstract' },
  { src: '/images/workspace-1.jpg', label: 'Workspace' },
  { src: '/images/programming-1.jpg', label: 'Programming' },
  { src: '/images/coding-alt.jpg', label: 'Alt Setup' },
  { src: '/images/bg-code-screen.jpg', label: 'Code Screen' },
  { src: '/images/bg-tech-1.jpg', label: 'Tech' },
]

function Skills() {
  return (
    <section id="skills" className="section-padding relative overflow-hidden">

      {/* — Section background — */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="/images/bg-abstract-3.jpg" alt="" aria-hidden="true"
          className="absolute top-0 left-0 w-1/2 h-1/2 object-cover"
          style={{ opacity: 0.35 }} loading="lazy" />
        <img src="/images/bg-abstract-2.jpg" alt="" aria-hidden="true"
          className="absolute bottom-0 right-0 w-1/2 h-1/2 object-cover"
          style={{ opacity: 0.35 }} loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/60 via-[#020617]/50 to-[#020617]/60" />
        <div className="absolute top-1/3 left-[-8%] w-72 h-72 bg-indigo-600/12 vibrant-glow" />
        <div className="absolute bottom-1/4 right-[-8%] w-72 h-72 bg-pink-600/12 vibrant-glow" />
      </div>

      <div className="relative z-10 container-custom">

        {/* Header */}
        <div className="max-w-3xl mb-16 text-center mx-auto space-y-5">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            className="text-sm font-black text-pink-400 uppercase tracking-[0.4em]"
          >
            Capabilities
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter"
          >
            Technical <span className="text-gradient-vibrant">Ecosystem</span>
          </motion.h2>
          <div className="w-32 h-[2px] bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full mx-auto" />
        </div>

        {/* — Skill category cards — */}
        <div className="space-y-6 max-w-5xl mx-auto">
          {skillGroups.map((group, gIdx) => {
            const cfg = categoryConfig[group.category] || categoryConfig['Frontend']
            const isEven = gIdx % 2 === 0

            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: gIdx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} rounded-2xl overflow-hidden border ${cfg.border} bg-white/[0.025]`}
              >
                {/* — Content box — */}
                <div className="flex-1 p-6 flex flex-col justify-between gap-5 min-h-[220px]">

                  {/* Top: heading + desc */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2 h-2 rounded-full ${cfg.dot} flex-shrink-0`} />
                      <h3 className={`text-[11px] font-black uppercase tracking-[0.35em] ${cfg.label}`}>
                        {group.category}
                      </h3>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed font-medium">
                      {cfg.desc}
                    </p>
                  </div>

                  {/* Middle: skill chips */}
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, sIdx) => {
                      const Icon = iconMap[skill.name] || FaCode
                      return (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.88 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: gIdx * 0.06 + sIdx * 0.04 }}
                          whileHover={{ y: -2, scale: 1.05, transition: { duration: 0.15 } }}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/20 group cursor-default"
                        >
                          <Icon className={`text-sm ${cfg.label} flex-shrink-0`} />
                          <span className="text-[11px] font-bold text-gray-200 group-hover:text-white transition-colors uppercase tracking-wide whitespace-nowrap">
                            {skill.name}
                          </span>
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Bottom: progress bars */}
                  <div className="space-y-2.5">
                    {group.skills.map((skill) => (
                      <div key={skill.name} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">{skill.name}</span>
                          <span className={`text-xs font-black ${cfg.label}`}>{skill.level}%</span>
                        </div>
                        <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
                            className={`h-full rounded-full bg-gradient-to-r ${cfg.barColor}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* — Side image — fixed width, fills height — */}
                <div className="relative w-full lg:w-56 h-44 lg:h-auto flex-shrink-0 overflow-hidden">
                  <img
                    src={cfg.img}
                    alt={cfg.imgLabel}
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  {/* Gradient blends toward the content box */}
                  <div className={`absolute inset-0 ${isEven
                    ? 'bg-gradient-to-r from-[#020617]/70 via-[#020617]/30 to-transparent'
                    : 'bg-gradient-to-l from-[#020617]/70 via-[#020617]/30 to-transparent'
                    }`} />
                  {/* Bottom label */}
                  <span className="absolute bottom-3 left-3 right-3 text-white/70 text-sm font-black uppercase tracking-[0.25em]">
                    {cfg.imgLabel}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* — Marquee strip — */}
      <div className="relative z-10 mt-16 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #020617, transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #020617, transparent)' }} />

        <div className="marquee-track flex gap-4"
          style={{ animation: 'marqueeScroll 35s linear infinite' }}>
          {[...marqueeImages, ...marqueeImages].map((img, i) => (
            <div key={i}
              className="flex-shrink-0 relative w-96 h-64 rounded-2xl overflow-hidden border border-white/10 group">
              <img src={img.src} alt={img.label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/65 to-transparent" />
              <span className="absolute bottom-3 left-4 text-white/80 text-sm font-black uppercase tracking-[0.2em]">
                {img.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
