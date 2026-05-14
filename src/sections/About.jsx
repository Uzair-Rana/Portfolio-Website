import { motion } from 'framer-motion'
import { FaCode, FaRocket, FaUsers, FaLightbulb, FaMapMarkerAlt, FaEnvelope, FaPhone, FaGithub } from 'react-icons/fa'

const strengths = [
  { icon: FaCode, label: 'Full-Stack Development', desc: 'End-to-end web apps from DB schema to polished UI', color: 'text-indigo-400' },
  { icon: FaRocket, label: 'API Integration', desc: 'Third-party APIs, automation workflows, webhooks', color: 'text-pink-400' },
  { icon: FaUsers, label: 'Team Collaboration', desc: 'Cross-functional teams, Git workflows, code reviews', color: 'text-violet-400' },
  { icon: FaLightbulb, label: 'Clean Code', desc: 'Maintainable, scalable, and well-documented solutions', color: 'text-emerald-400' },
]

const quickInfo = [
  { icon: FaMapMarkerAlt, label: 'Location', value: 'Lahore, Pakistan', href: null, color: 'text-rose-400' },
  { icon: FaEnvelope, label: 'Email', value: 'uzairanjummrana@gmail.com', href: 'mailto:uzairanjummrana@gmail.com', color: 'text-indigo-400' },
  { icon: FaPhone, label: 'Phone', value: '+92 310-7575202', href: 'tel:+923107575202', color: 'text-emerald-400' },
  { icon: FaGithub, label: 'GitHub', value: 'github.com/Uzair-Rana', href: 'https://github.com/Uzair-Rana', color: 'text-violet-400' },
]

function About() {
  return (
    <section id="about" className="section-padding noise-bg relative overflow-hidden">
      {/* Background Glows for balance */}
      <div className="absolute top-1/2 left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 vibrant-glow" />
      <div className="absolute top-1/2 right-[-10%] w-[40%] h-[40%] bg-pink-600/10 vibrant-glow" />

      <div className="container-custom flex flex-col items-center text-center">
        {/* Header - Centered */}
        <div className="max-w-4xl mb-12 md:mb-24 space-y-4 md:space-y-6">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] md:text-xs font-black text-indigo-400 uppercase tracking-[0.4em]"
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
          <div className="w-20 md:w-32 h-[2px] bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full mx-auto" />
        </div>

        {/* Content - Balanced Grid */}
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-start w-full max-w-7xl">
          {/* Bio - Left Side but balanced */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8 text-left"
          >
            <div className="space-y-4 md:space-y-6 text-gray-400 text-lg md:text-2xl font-serif italic leading-relaxed">
              <p>
                Motivated and detail-oriented Full-Stack Developer with 1+ year of hands-on industry experience building scalable, production-grade web applications at SystemsD, Lahore.
              </p>
              <p>
                I specialize in backend development using Django and PostgreSQL, with strong frontend expertise in Vue.js, React.js, and Tailwind CSS.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 pt-6 md:pt-8 border-t border-white/5">
              {quickInfo.map((info, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className={`p-3 md:p-4 rounded-2xl bg-white/5 border border-white/10 ${info.color} group-hover:scale-110 transition-transform`}>
                    <info.icon className="text-lg md:text-xl" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[9px] md:text-[10px] text-gray-600 uppercase tracking-[0.2em] font-black">{info.label}</p>
                    <p className="text-white font-bold tracking-tight text-sm md:text-base truncate">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Strengths - Right Side Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {strengths.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="glass-card-vibrant p-6 md:p-8 border-white/5 space-y-4 hover:bg-white/[0.05] transition-all group text-left rounded-2xl md:rounded-[1.5rem] h-fit"
              >
                <div className={`p-3 md:p-4 w-fit rounded-xl bg-white/5 border border-white/10 ${s.color} group-hover:scale-110 group-hover:bg-white/10 transition-transform shadow-xl`}>
                  <s.icon className="text-xl md:text-2xl" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-black text-white tracking-tight uppercase">{s.label}</h3>
                  <p className="text-gray-500 text-sm md:text-base font-serif italic leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About;
