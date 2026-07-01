import { motion } from 'framer-motion'
import ContactForm from '../components/ContactForm.jsx'
import { FaComments } from 'react-icons/fa'

function Feedback() {
  return (
    <section id="feedback" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/images/bg-abstract-1.jpg" 
          alt="" 
          aria-hidden="true"
          className="absolute top-0 right-0 w-1/2 h-1/2 object-cover"
          style={{ opacity: 0.15 }} 
          loading="lazy" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/60 via-[#020617]/50 to-[#020617]/60" />
        <div className="absolute top-1/3 left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 vibrant-glow" />
        <div className="absolute bottom-1/4 right-[-10%] w-[40%] h-[40%] bg-pink-600/10 vibrant-glow" />
      </div>

      <div className="relative z-10 container-custom flex flex-col items-center">
        {/* Header */}
        <div className="max-w-3xl mb-12 md:mb-16 text-center space-y-4 md:space-y-6">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs md:text-sm font-black text-pink-400 uppercase tracking-[0.4em]"
          >
            Let's Connect
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-none"
          >
            Send Me a <span className="text-gradient-vibrant">Message</span>
          </motion.h2>
          <div className="w-24 md:w-32 h-[2px] bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full mx-auto" />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl font-serif italic text-gray-300 max-w-2xl mx-auto leading-relaxed pt-4"
          >
            Have a project in mind or just want to say hi? Send me a message and I'll get back to you asap.
          </motion.p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-3xl"
        >
          <div className="glass-card-vibrant rounded-3xl p-6 md:p-10 border border-white/10">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-pink-500/20 border border-white/10">
                <FaComments className="text-2xl text-gradient-vibrant" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-white">Drop a Message</h3>
                <p className="text-sm text-gray-400">It will be sent directly to my WhatsApp!</p>
              </div>
            </div>
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Feedback
