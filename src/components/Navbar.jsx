import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { m as M, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaGithub, FaCog } from 'react-icons/fa'
import ThemeToggle from './ThemeToggle.jsx'
import { useSettings } from '../context/SettingsContext.jsx'

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Certifications', href: '#certifications' },
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
      <M.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? 'bg-[#080b14]/90 backdrop-blur-xl border-b border-white/5 shadow-xl shadow-black/20'
            : 'bg-transparent'
          }`}
      >
        <nav className="container-padding mx-auto max-w-6xl flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] opacity-80" />
              <img
                src={settings.photoUrl}
                alt={displayName}
                className="relative w-9 h-9 rounded-full object-cover object-center border-2 border-[var(--primary)]/40"
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>
            <span className="font-bold text-lg text-white group-hover:text-[var(--primary)] transition-colors duration-200">
              {displayName}
            </span>
          </Link>

          {/* ── Desktop nav links ── */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link, i) =>
              isHome ? (
                <M.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 + i * 0.06 }}
                  className="px-3 py-1.5 rounded-lg text-sm text-white/55 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  {link.name}
                </M.a>
              ) : (
                <M.div key={link.name} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.1 + i * 0.06 }}>
                  <Link to={`/${link.href}`} className="px-3 py-1.5 rounded-lg text-sm text-white/55 hover:text-white hover:bg-white/5 transition-all duration-200 block">
                    {link.name}
                  </Link>
                </M.div>
              )
            )}
          </div>

          {/* ── Desktop right actions ── */}
          <M.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="hidden lg:flex items-center gap-2"
          >
            <ThemeToggle />
            <a href={settings.github} target="_blank" rel="noreferrer"
              className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/55 hover:text-white hover:border-white/30 transition-all"
              aria-label="GitHub">
              <FaGithub />
            </a>
            {/* Settings gear */}
            <button
              onClick={onOpenSettings}
              className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/55 hover:text-white hover:border-[var(--primary)]/50 hover:bg-[var(--primary)]/10 transition-all"
              aria-label="Open settings"
              title="Settings"
            >
              <FaCog className="text-sm" />
            </button>
            <Link to="/contact"
              className="px-4 py-2 rounded-lg bg-[var(--primary)] text-black text-sm font-bold hover:opacity-90 transition-opacity shadow-lg shadow-[var(--primary)]/20">
              Hire Me
            </Link>
          </M.div>

          {/* ── Mobile: settings + hamburger ── */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={onOpenSettings}
              className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/55 hover:text-white transition-all"
              aria-label="Open settings"
            >
              <FaCog className="text-sm" />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/5 transition-all"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <M.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <FaTimes />
                  </M.span>
                ) : (
                  <M.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <FaBars />
                  </M.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </M.header>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <M.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#080b14]/96 backdrop-blur-xl border-b border-white/10 shadow-2xl lg:hidden"
          >
            <div className="container-padding mx-auto max-w-6xl py-4 flex flex-col gap-0.5">
              {navLinks.map((link, i) =>
                isHome ? (
                  <M.a key={link.name} href={link.href}
                    initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: i * 0.04 }}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-xl text-white/65 hover:text-white hover:bg-white/5 transition-all text-base">
                    {link.name}
                  </M.a>
                ) : (
                  <M.div key={link.name} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2, delay: i * 0.04 }}>
                    <Link to={`/${link.href}`} className="px-4 py-3 rounded-xl text-white/65 hover:text-white hover:bg-white/5 transition-all text-base block">
                      {link.name}
                    </Link>
                  </M.div>
                )
              )}
              <div className="pt-3 mt-2 border-t border-white/10 flex gap-3">
                <a href={settings.github} target="_blank" rel="noreferrer"
                  className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm text-center hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                  <FaGithub /> GitHub
                </a>
                <Link to="/contact"
                  className="flex-1 py-2.5 rounded-xl bg-[var(--primary)] text-black text-sm font-bold text-center hover:opacity-90 transition-opacity">
                  Hire Me
                </Link>
              </div>
            </div>
          </M.div>
        )}
      </AnimatePresence>
    </>
  )
}
