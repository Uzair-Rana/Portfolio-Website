import { motion } from 'framer-motion'
import ContactForm from '../components/ContactForm.jsx'
import { FaComments } from 'react-icons/fa'

function Feedback() {
  return (
    <section id="feedback" className="section-padding relative overflow-hidden bg-white">

      <div className="relative z-10 container-custom flex flex-col items-center">
        {/* Header */}
        <div className="max-w-3xl mb-12 md:mb-16 text-center space-y-4 md:space-y-6">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs md:text-sm font-black text-red-600 uppercase tracking-[0.4em]"
          >
            Let's Connect
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl sm:text-6xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-none"
          >
            Send Me a <span className="text-gradient-vibrant">Message</span>
          </motion.h2>
          <div className="w-24 md:w-32 h-[2px] bg-gradient-to-r from-blue-600 to-red-600 rounded-full mx-auto" />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl font-serif italic text-black max-w-2xl mx-auto leading-relaxed pt-4"
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
          <div className="glass-card-vibrant rounded-lg p-6 md:p-10 border border-gray-300 shadow-md">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-300">
              <div className="p-4 rounded-lg bg-blue-100 border border-blue-300">
                <FaComments className="text-2xl text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-gray-900">Drop a Message</h3>
                <p className="text-sm text-gray-600">It will be sent directly to my WhatsApp!</p>
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
