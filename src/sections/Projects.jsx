import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaBrain, FaMicrophone, FaUserTie, FaCode, FaRocket, FaStar } from 'react-icons/fa'
import { useSettings } from '../context/SettingsContext.jsx'

const iconComponents = {
  brain: FaBrain, microphone: FaMicrophone, usertie: FaUserTie,
  code: FaCode, rocket: FaRocket, star: FaStar,
}

const projectImages = {
  'search-atlas': '/images/project-searchatlas.jpg',
  'aethermuse': '/images/project-aethermuse.jpg',
  'enginehire': '/images/project-enginehire.jpg',
}
const fallbackImages = [
  '/images/bg-tech-1.jpg',
  '/images/bg-code-screen.jpg',
  '/images/programming-1.jpg',
  '/images/coding-alt.jpg',
  '/images/workspace-1.jpg',
]

function ProjectCard({ project, idx }) {
  const Icon = iconComponents[project.iconName] ?? FaCode
  const bgImg = projectImages[project.slug] || fallbackImages[idx % fallbackImages.length]

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 20 })
  const sy = useSpring(y, { stiffness: 200, damping: 20 })
  const rotateX = useTransform(sy, [-0.5, 0.5], ['10deg', '-10deg'])
  const rotateY = useTransform(sx, [-0.5, 0.5], ['-10deg', '10deg'])

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="rounded-2xl overflow-hidden border border-white/10 bg-[#0a0f1e]"
    >
      <Link to={`/projects/${project.slug}`} className="block group">

        {/* ── Image top half — taller for real project screenshots ── */}
        <div className="relative h-56 overflow-hidden">
          <img src={bgImg} alt={project.title}
                className={`w-full h-full object-cover ${project.slug === 'aethermuse' ? 'object-center' : 'object-top'} group-hover:scale-110 transition-transform duration-700`}
                loading="lazy" />
          {/* gradient fade to card body */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0f1e]" />
          {/* Role badge top-left */}
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest text-white"
            style={{
              background: `${project.accentColor || '#6366f1'}55`,
              border: `1px solid ${project.accentColor || '#6366f1'}60`,
            }}>
            {project.role}
          </span>
          {/* Icon top-right */}
          <div className="absolute top-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center bg-black/40 border border-white/10"
            style={{ color: project.accentColor || '#6366f1' }}>
            <Icon className="text-lg" />
          </div>
        </div>

        {/* ── Content bottom ── */}
        <div className="p-5 space-y-3" style={{ transform: 'translateZ(20px)' }}>
          <h3 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-indigo-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-500 text-sm font-serif italic leading-relaxed line-clamp-2">
            {project.tagline}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(project.tech || []).slice(0, 4).map((t) => (
              <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/8 text-gray-600 text-[9px] font-bold uppercase tracking-wide">
                {t}
              </span>
            ))}
          </div>

          {/* View link */}
          <div className="flex items-center gap-1.5 text-[10px] font-black text-indigo-400 uppercase tracking-widest pt-1 border-t border-white/5">
            View Project
            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function Projects() {
  const { data } = useSettings()
  const projects = data.projects

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="/images/bg-code-screen.jpg" alt="" aria-hidden="true"
          className="absolute top-0 right-0 w-1/2 h-1/2 object-cover"
          style={{ opacity: 0.35 }} loading="lazy" />
        <img src="/images/coding-alt.jpg" alt="" aria-hidden="true"
          className="absolute bottom-0 left-0 w-1/2 h-1/2 object-cover"
          style={{ opacity: 0.35 }} loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/60 via-[#020617]/50 to-[#020617]/60" />
      </div>
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-indigo-600 vibrant-glow opacity-8" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-600 vibrant-glow opacity-8" />

      <div className="container-custom">
        {/* Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            className="text-sm font-black text-pink-400 uppercase tracking-[0.4em]"
          >
            Creative Portfolio
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-none"
          >
            Selected <span className="text-gradient-vibrant">Works</span>
          </motion.h2>
          <div className="w-32 h-[2px] bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full" />
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            className="text-lg font-serif italic text-gray-300 max-w-xl leading-relaxed"
          >
            Production-grade platforms I've contributed to — live systems serving real users.
          </motion.p>
        </div>

        {projects.length === 0 && (
          <p className="text-gray-600 font-serif italic text-center py-16">No projects yet. Add some in Settings.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: '1000px' }}>
          {projects.map((p, idx) => (
            <ProjectCard key={p.id || p.slug} project={p} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
