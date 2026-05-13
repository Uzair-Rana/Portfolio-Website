import { useState } from 'react'
import { m as M, AnimatePresence } from 'framer-motion'
import { skillGroups } from '../data/skills.js'
import {
  SiVuedotjs, SiReact, SiTailwindcss, SiJavascript,
  SiPython, SiDjango, SiGraphql, SiPostgresql,
  SiGithub, SiPostman,
} from 'react-icons/si'
import {
  FaDatabase, FaCode, FaPlug, FaCogs, FaRobot,
  FaServer, FaMicrophone, FaNetworkWired, FaChevronDown,
} from 'react-icons/fa'

/* ── Skill bar icons ── */
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
}

/* ── Additional expertise data with details ── */
const expertiseItems = [
  {
    id: 'api',
    label: 'Third-Party API Integration',
    icon: FaPlug,
    color: 'text-cyan-400',
    border: 'border-cyan-500/25',
    bg: 'from-cyan-500/15 to-cyan-500/5',
    desc: 'Experienced in integrating external APIs into production systems — including payment gateways, communication services, and data providers.',
    points: [
      'Twilio for SMS and voice communication workflows',
      'ElevenLabs for AI-powered voice synthesis',
      'CoinGecko & Binance for cryptocurrency market data',
      'RESTful and GraphQL API consumption',
      'Webhook design, implementation, and debugging',
    ],
  },
  {
    id: 'automation',
    label: 'Workflow Automation',
    icon: FaCogs,
    color: 'text-violet-400',
    border: 'border-violet-500/25',
    bg: 'from-violet-500/15 to-violet-500/5',
    desc: 'Built automation pipelines that reduce manual effort and streamline business operations across multiple production platforms.',
    points: [
      'Recruitment and onboarding workflow automation (EngineHire)',
      'SEO task automation using LangGraph and AI agents (Search Atlas)',
      'Document processing and business process automation',
      'Scheduled jobs and background task management',
      'Event-driven architectures with webhooks',
    ],
  },
  {
    id: 'scalable',
    label: 'Scalable System Design',
    icon: FaServer,
    color: 'text-emerald-400',
    border: 'border-emerald-500/25',
    bg: 'from-emerald-500/15 to-emerald-500/5',
    desc: 'Designed and contributed to backend architectures built to handle growth — with clean separation of concerns and maintainable codebases.',
    points: [
      'Multi-tenant system architecture patterns',
      'PostgreSQL schema design and query optimization',
      'Django ORM best practices for large datasets',
      'RESTful API design with versioning and pagination',
      'Production deployment support and monitoring',
    ],
  },
  {
    id: 'langgraph',
    label: 'LangGraph & AI Agents',
    icon: FaRobot,
    color: 'text-amber-400',
    border: 'border-amber-500/25',
    bg: 'from-amber-500/15 to-amber-500/5',
    desc: 'Worked with LangGraph to build stateful AI agent workflows integrated into production SEO automation pipelines.',
    points: [
      'LangGraph for multi-step AI agent orchestration',
      'MCP (Model Context Protocol) integration',
      'AI-driven SEO workflow automation (Search Atlas)',
      'Stateful graph-based task execution',
      'Integration with Django backend services',
    ],
  },
  {
    id: 'voice',
    label: 'AI Voice Integration',
    icon: FaMicrophone,
    color: 'text-pink-400',
    border: 'border-pink-500/25',
    bg: 'from-pink-500/15 to-pink-500/5',
    desc: 'Integrated AI voice capabilities into a live business communication platform, enabling natural voice interactions for clients.',
    points: [
      'ElevenLabs API for realistic AI voice synthesis',
      'Twilio voice call management and routing',
      'Real-time audio streaming and processing',
      'Admin notification systems with voice alerts',
      'Production deployment on AetherMuse.ai',
    ],
  },
  {
    id: 'deployment',
    label: 'Production Deployment',
    icon: FaNetworkWired,
    color: 'text-blue-400',
    border: 'border-blue-500/25',
    bg: 'from-blue-500/15 to-blue-500/5',
    desc: 'Contributed to deploying and maintaining live production systems serving real users, with a focus on reliability and performance.',
    points: [
      'Production support for 3 live platforms',
      'Environment configuration and secrets management',
      'Performance optimization and bottleneck resolution',
      'Bug triage and hotfix deployment',
      'Collaboration with DevOps using Git workflows',
    ],
  },
]

/* ── Skill bar ── */
function SkillBar({ name, level, accent }) {
  const Icon = iconMap[name]
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Icon && <Icon className={`text-sm ${accent}`} />}
          <span className="text-white/80 text-sm font-medium">{name}</span>
        </div>
        <span className="text-white/40 text-xs">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] skill-bar-fill"
          style={{ '--bar-width': `${level}%` }}
        />
      </div>
    </div>
  )
}

/* ── Dot color map for expertise bullet points ── */
const dotColorMap = {
  'text-cyan-400': 'bg-cyan-400',
  'text-violet-400': 'bg-violet-400',
  'text-emerald-400': 'bg-emerald-400',
  'text-amber-400': 'bg-amber-400',
  'text-pink-400': 'bg-pink-400',
  'text-blue-400': 'bg-blue-400',
}

/* ── Expandable expertise card ── */
function ExpertiseCard({ item, isOpen, onToggle }) {
  const Icon = item.icon
  const dotBg = dotColorMap[item.color] || 'bg-white'
  return (
    <M.div
      layout
      className={`rounded-2xl border ${item.border} bg-gradient-to-br ${item.bg} overflow-hidden cursor-pointer`}
      onClick={onToggle}
      whileHover={{ scale: isOpen ? 1 : 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header — always visible */}
      <div className="flex items-center gap-3 px-5 py-4">
        <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
          <Icon className={`text-base ${item.color}`} />
        </div>
        <span className="flex-1 text-white/85 text-sm font-semibold leading-snug">{item.label}</span>
        <M.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0"
        >
          <FaChevronDown className={`text-xs ${isOpen ? item.color : 'text-white/25'} transition-colors`} />
        </M.div>
      </div>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <M.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 border-t border-white/8 space-y-3">
              <p className="text-white/55 text-xs leading-relaxed">{item.desc}</p>
              <ul className="space-y-1.5">
                {item.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-white/65 text-xs leading-relaxed">
                    <span className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${dotBg}`} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </M.div>
        )}
      </AnimatePresence>
    </M.div>
  )
}

/* ── Main section ── */
function Skills() {
  const [openId, setOpenId] = useState(null)

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <section id="skills" className="container-padding mx-auto max-w-6xl py-20">

      <M.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="mb-3"
      >
        <span className="text-sm font-semibold text-[var(--primary)] uppercase tracking-widest">My Toolkit</span>
      </M.div>

      <M.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="text-4xl sm:text-5xl font-extrabold heading-gradient mb-12"
      >
        Technical Skills
      </M.h2>

      {/* Skill bar groups */}
      <div className="grid sm:grid-cols-2 gap-6">
        {skillGroups.map((group, gIdx) => (
          <M.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: gIdx * 0.08 }}
            className={`rounded-2xl border ${group.border} bg-gradient-to-br ${group.color} p-6 space-y-5`}
          >
            <h3 className={`text-base font-bold uppercase tracking-wider ${group.accent}`}>
              {group.category}
            </h3>
            <div className="space-y-4">
              {group.skills.map((skill) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} accent={group.accent} />
              ))}
            </div>
          </M.div>
        ))}
      </div>

      {/* ── Additional Expertise — interactive expandable cards ── */}
      <M.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
        className="mt-12 pt-10 border-t border-white/10"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/70 font-bold text-lg">Additional Expertise</p>
            <p className="text-white/35 text-sm mt-0.5">Click any card to expand details</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-xs">
            {expertiseItems.length} areas
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {expertiseItems.map((item, i) => (
            <M.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <ExpertiseCard
                item={item}
                isOpen={openId === item.id}
                onToggle={() => toggle(item.id)}
              />
            </M.div>
          ))}
        </div>
      </M.div>
    </section>
  )
}

export default Skills
