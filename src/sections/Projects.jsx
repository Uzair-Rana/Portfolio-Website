import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaBrain, FaMicrophone, FaUserTie, FaCode, FaRocket, FaStar } from 'react-icons/fa'
import { useSettings } from '../context/SettingsContext.jsx'

const iconComponents = {
  brain: FaBrain, microphone: FaMicrophone, usertie: FaUserTie,
  code: FaCode, rocket: FaRocket, star: FaStar,
}

function Card3D({ children, delay = 0 }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"])

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className="relative h-[400px] md:h-[450px] w-full rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-[1px]"
    >
      <div
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="absolute inset-3 md:inset-4 grid place-content-center rounded-[1.5rem] md:rounded-[2rem] bg-slate-900/90 shadow-2xl border border-white/10"
      >
        {children}
      </div>
    </motion.div>
  )
}

function Projects() {
  const { data } = useSettings()
  const projects = data.projects

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-indigo-600 vibrant-glow opacity-10" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-pink-600 vibrant-glow opacity-10" />

      <div className="container-custom flex flex-col items-center text-center">
        {/* Header - Symmetrical */}
        <div className="max-w-4xl mb-12 md:mb-24 space-y-4 md:space-y-6">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] md:text-xs font-black text-indigo-400 uppercase tracking-[0.4em]"
          >
            Creative Portfolio
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-display text-4xl sm:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-none"
          >
            Selected <span className="text-gradient-vibrant">Works</span>
          </motion.h2>
          <div className="w-20 md:w-32 h-[2px] bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full mx-auto" />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-lg md:text-2xl font-serif italic text-gray-500 max-w-2xl mx-auto leading-relaxed pt-4"
          >
            A curated selection of my most impactful projects, built with a focus on precision and performance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 w-full max-w-7xl">
          {projects.map((p, idx) => {
            const Icon = iconComponents[p.iconName] ?? FaCode
            return (
              <Card3D key={p.id || p.slug} delay={idx * 0.1}>
                <Link
                  to={`/projects/${p.slug}`}
                  className="flex flex-col items-center text-center p-6 md:p-8 space-y-4 md:space-y-6 w-full h-full justify-between"
                >
                  <div 
                    style={{ transform: "translateZ(50px)" }}
                    className="p-4 md:p-6 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 text-white group-hover:scale-110 transition-transform"
                  >
                    <Icon className="text-3xl md:text-4xl text-indigo-400" />
                  </div>

                  <div style={{ transform: "translateZ(30px)" }} className="space-y-2 md:space-y-4">
                    <h3 className="text-xl md:text-3xl font-black text-white tracking-tight uppercase">
                      {p.title}
                    </h3>
                    <p className="text-gray-500 text-sm md:text-base font-serif italic leading-relaxed line-clamp-3">
                      {p.description || p.tagline}
                    </p>
                  </div>

                  <div 
                    style={{ transform: "translateZ(20px)" }}
                    className="flex items-center gap-2 md:gap-3 text-[10px] md:text-xs font-black text-indigo-400 uppercase tracking-widest group"
                  >
                    View Project
                    <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
              </Card3D>
            )
          })}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12 md:py-20 glass-card-vibrant rounded-3xl w-full max-w-3xl">
            <p className="text-gray-500 font-black uppercase tracking-widest text-sm">Workspace is empty</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects;
