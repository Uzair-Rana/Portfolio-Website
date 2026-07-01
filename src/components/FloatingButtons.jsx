import { FaWhatsapp, FaEnvelope, FaLinkedin, FaSms, FaShareAlt, FaCopy, FaCheck } from 'react-icons/fa'
import { useSettings } from '../context/SettingsContext.jsx'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

function FloatingButtons() {
  const { settings } = useSettings()
  const [shareMenuOpen, setShareMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  // Extract phone number from settings.phone (remove non-digit characters)
  const cleanPhone = settings.phone.replace(/\D/g, '')

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      setShareMenuOpen(false)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  const shareOptions = [
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      color: 'text-green-400',
      hoverBg: 'hover:bg-green-500/20',
      href: `${settings.whatsapp}?text=${encodeURIComponent(`Check out ${settings.firstName}'s portfolio! ${window.location.href}`)}`,
      target: '_blank',
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      color: 'text-pink-400',
      hoverBg: 'hover:bg-pink-500/20',
      href: `mailto:?subject=${encodeURIComponent(`${settings.firstName} ${settings.lastName}'s Portfolio`)}&body=${encodeURIComponent(`Check out ${settings.firstName}'s portfolio! ${window.location.href}`)}`,
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      color: 'text-indigo-400',
      hoverBg: 'hover:bg-indigo-500/20',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
      target: '_blank',
    },
    {
      icon: copied ? FaCheck : FaCopy,
      label: copied ? 'Copied!' : 'Copy Link',
      color: copied ? 'text-emerald-400' : 'text-yellow-400',
      hoverBg: 'hover:bg-yellow-500/20',
      onClick: handleCopyLink,
    },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col md:flex-row gap-4 items-center">
      {/* Share Button & Menu */}
      <div className="relative">
        <AnimatePresence>
          {shareMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute bottom-16 right-0 md:bottom-0 md:right-16 flex flex-col md:flex-row gap-2 bg-[#0d1120] border border-white/10 rounded-2xl p-3 shadow-2xl"
            >
              {shareOptions.map((option, i) => {
                const Icon = option.icon
                if (option.onClick) {
                  return (
                    <button
                      key={i}
                      onClick={option.onClick}
                      className={`flex flex-col items-center gap-1 p-3 rounded-xl ${option.hoverBg} transition-all`}
                    >
                      <Icon className={`text-xl ${option.color}`} />
                      <span className="text-[10px] font-semibold text-white/70">{option.label}</span>
                    </button>
                  )
                }
                return (
                  <a
                    key={i}
                    href={option.href}
                    target={option.target}
                    rel="noreferrer"
                    onClick={() => setShareMenuOpen(false)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl ${option.hoverBg} transition-all`}
                  >
                    <Icon className={`text-xl ${option.color}`} />
                    <span className="text-[10px] font-semibold text-white/70">{option.label}</span>
                  </a>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Share Toggle Button */}
        <motion.button
          onClick={() => setShareMenuOpen(!shareMenuOpen)}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          whileHover={{ scale: 1.15, y: -4 }}
          whileTap={{ scale: 0.95 }}
          className={`group relative w-12 h-12 flex items-center justify-center transition-all duration-300 ${shareMenuOpen ? 'text-yellow-300 bg-yellow-500/20 rounded-xl border border-yellow-500/30' : 'text-yellow-400 hover:text-yellow-300'}`}
        >
          <FaShareAlt className="text-2xl" />
        </motion.button>
      </div>

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

      {/* SMS Button */}
      <motion.a
        href={`sms:${cleanPhone}`}
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        whileHover={{ scale: 1.15, y: -4 }}
        whileTap={{ scale: 0.95 }}
        className="group relative w-12 h-12 flex items-center justify-center text-blue-400 hover:text-blue-300 transition-all duration-300"
      >
        <FaSms className="text-2xl" />
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
