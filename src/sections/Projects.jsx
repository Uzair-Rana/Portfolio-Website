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

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.08 }}
      className="rounded-lg overflow-hidden border border-gray-300 bg-white hover:border-gray-400 hover:shadow-md transition-all"
    >
      <Link to={`/projects/${project.slug}`} className="block group">

        {/* ── Image top half — taller for real project screenshots ── */}
        <div className="relative h-56 overflow-hidden">
          <img src={bgImg} alt={project.title}
                className={`w-full h-full object-cover ${project.slug === 'aethermuse' ? 'object-center' : 'object-top'} group-hover:scale-110 transition-transform duration-700`}
                loading="lazy" />
          {/* gradient fade to card body */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
          {/* Role badge top-left */}
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest text-white"
            style={{
              background: `${project.accentColor || '#6366f1'}55`,
              border: `1px solid ${project.accentColor || '#6366f1'}60`,
            }}>
            {project.role}
          </span>
          {/* Icon top-right */}
          <div className="absolute top-3 right-3 w-9 h-9 rounded-lg flex items-center justify-center bg-white/80 border border-gray-300"
            style={{ color: project.accentColor || '#6366f1' }}>
            <Icon className="text-lg" />
          </div>
        </div>

        {/* ── Content bottom ── */}
        <div className="p-5 space-y-3">
          <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <p className="text-black text-sm font-serif italic leading-relaxed line-clamp-2">
            {project.tagline}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(project.tech || []).slice(0, 4).map((t) => (
              <span key={t} className="px-2 py-0.5 rounded-md bg-gray-100 border border-gray-300 text-gray-700 text-[9px] font-bold uppercase tracking-wide">
                {t}
              </span>
            ))}
          </div>

          {/* View link */}
          <div className="flex items-center gap-1.5 text-[10px] font-black text-blue-600 uppercase tracking-widest pt-1 border-t border-gray-200">
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
    <section id="projects" className="section-padding relative overflow-hidden bg-white">

      <div className="container-custom">
        {/* Header */}
        <div className="max-w-3xl mb-14 space-y-4">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            className="text-sm font-black text-red-600 uppercase tracking-[0.4em]"
          >
            Creative Portfolio
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-none"
          >
            Selected <span className="text-gradient-vibrant">Works</span>
          </motion.h2>
          <div className="w-32 h-[2px] bg-gradient-to-r from-blue-600 to-red-600 rounded-full" />
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            className="text-lg font-serif italic text-black max-w-xl leading-relaxed"
          >
            Production-grade platforms I've contributed to — live systems serving real users.
          </motion.p>
        </div>

        {projects.length === 0 && (
          <p className="text-black font-serif italic text-center py-16">No projects yet. Add some in Settings.</p>
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
