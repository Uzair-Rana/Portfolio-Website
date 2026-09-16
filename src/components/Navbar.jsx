import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaGithub, FaCog } from 'react-icons/fa'
import ThemeToggle from './ThemeToggle.jsx'
import { useSettings } from '../context/SettingsContext.jsx'

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Feedback', href: '#feedback' },
]

export default function Navbar({ onOpenSettings }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { settings } = useSettings()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location])

  const displayName = `${settings.firstName} ${settings.lastName}`.trim() || 'Uzair Anjum'

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
            ? 'py-4 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm'
            : 'py-6 bg-transparent'
          }`}
      >
        <nav className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="relative w-10 h-10 flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-white opacity-10 group-hover:scale-110 transition-transform" />
              <img
                src={settings.photoUrl}
                alt={displayName}
                className="relative w-10 h-10 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>
            <span className="font-display font-black text-xl text-gray-900 tracking-tight uppercase">
              {displayName}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2 bg-gray-100 p-1 rounded-full border border-gray-300">
            {navLinks.map((link) => (
              isHome ? (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest text-gray-600 hover:text-gray-900 hover:bg-white transition-all"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={`/${link.href}`}
                  className="px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest text-gray-600 hover:text-gray-900 hover:bg-white transition-all"
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a href={settings.github} target="_blank" rel="noreferrer"
              className="p-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-all"
            >
              <FaGithub className="text-lg" />
            </a>
            <button
              onClick={onOpenSettings}
              className="px-6 py-3 rounded-lg bg-blue-600 text-white text-xs font-black uppercase tracking-widest hover:bg-blue-700 active:scale-95 transition-all"
            >
              Settings
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#020617] lg:hidden flex flex-col items-center justify-center p-8 gap-8"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-display text-4xl font-black text-white uppercase tracking-tighter"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => { onOpenSettings(); setMobileOpen(false); }}
              className="mt-8 px-10 py-5 rounded-full bg-white text-black font-black uppercase tracking-widest"
            >
              Settings
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
