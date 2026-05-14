import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

const expertiseItems = [
  {
    id: 'api',
    label: 'API Integration',
    icon: FaPlug,
    color: 'text-indigo-400',
    desc: 'Expertise in Twilio, ElevenLabs, and financial data APIs.',
  },
  {
    id: 'automation',
    label: 'Automation',
    icon: FaCogs,
    color: 'text-pink-400',
    desc: 'Streamlining workflows and event-driven architectures.',
  },
  {
    id: 'scalable',
    label: 'Scalable Design',
    icon: FaServer,
    color: 'text-violet-400',
    desc: 'Clean backend architectures and database optimization.',
  },
  {
    id: 'langgraph',
    label: 'AI Agents',
    icon: FaRobot,
    color: 'text-emerald-400',
    desc: 'Stateful AI workflows using LangGraph and MCP.',
  },
]

function Skills() {
  return (
    <section id="skills" className="section-padding relative overflow-hidden bg-[#020617]/50">
      <div className="container-custom flex flex-col items-center">
        {/* Header - Centered */}
        <div className="max-w-3xl mb-24 text-center space-y-6">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xs font-black text-indigo-400 uppercase tracking-[0.4em]"
          >
            Capabilities
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-display text-4xl sm:text-6xl lg:text-8xl font-black text-white tracking-tighter"
          >
            Technical <span className="text-gradient-vibrant">Ecosystem</span>
          </motion.h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full mx-auto" />
        </div>

        <div className="grid lg:grid-cols-12 gap-16 w-full max-w-7xl items-start">
          {/* Left: Skills Progress - Balanced and Centered within its column */}
          <div className="lg:col-span-7 space-y-12">
            {skillGroups.map((group, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-6"
              >
                <h3 className="text-sm font-black text-gray-500 uppercase tracking-[0.3em] border-l-2 border-indigo-500 pl-4">{group.category}</h3>
                <div className="flex flex-wrap gap-4">
                  {group.skills.map((skill, j) => {
                    const Icon = iconMap[skill.name] || FaCode
                    return (
                      <motion.div 
                        key={j}
                        whileHover={{ y: -5, scale: 1.05 }}
                        className="flex items-center gap-4 px-6 py-3 glass-card-vibrant border-white/5 group"
                      >
                        <Icon className="text-xl text-gray-400 group-hover:text-indigo-400 transition-colors" />
                        <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors uppercase tracking-widest">{skill.name}</span>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Expertise Cards - Modern Staggered Grid */}
          <div className="lg:col-span-5 grid sm:grid-cols-2 gap-6 pt-12 lg:pt-0">
            {expertiseItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className={`glass-card-vibrant p-8 border-white/5 space-y-6 hover:bg-white/[0.05] transition-all group ${i % 2 !== 0 ? 'sm:translate-y-12' : ''}`}
              >
                <div className={`p-4 w-fit rounded-2xl bg-white/5 border border-white/10 ${item.color} group-hover:scale-110 transition-transform shadow-xl`}>
                  <item.icon className="text-3xl" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-black text-white tracking-tight uppercase">{item.label}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills;
