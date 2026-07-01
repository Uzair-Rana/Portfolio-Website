import { FaWhatsapp, FaEnvelope, FaLinkedin } from 'react-icons/fa'
import { useSettings } from '../context/SettingsContext.jsx'
import { motion } from 'framer-motion'

function FloatingButtons() {
  const { settings } = useSettings()

  return (
    <div className="fixed bottom-6 right-6 z-50 flex gap-4">
      {/* LinkedIn Button */}
      <motion.a
        href={settings.linkedin}
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{ scale: 1.15, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className="group relative w-12 h-12 flex items-center justify-center text-indigo-400 hover:text-indigo-300 transition-all duration-300"
      >
        <FaLinkedin className="text-2xl" />
      </motion.a>

      {/* WhatsApp Button */}
      <motion.a
        href={settings.whatsapp}
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.15, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className="group relative w-12 h-12 flex items-center justify-center text-green-400 hover:text-green-300 transition-all duration-300"
      >
        <FaWhatsapp className="text-2xl" />
      </motion.a>

      {/* Email Button */}
      <motion.a
        href={`mailto:${settings.email}`}
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ scale: 1.15, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className="group relative w-12 h-12 flex items-center justify-center text-pink-400 hover:text-pink-300 transition-all duration-300"
      >
        <FaEnvelope className="text-2xl" />
      </motion.a>
    </div>
  )
}

export default FloatingButtons
