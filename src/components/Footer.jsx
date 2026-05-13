import { Link } from 'react-router-dom'
import { FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart } from 'react-icons/fa'
import { SiDjango, SiReact, SiPostgresql, SiVuedotjs } from 'react-icons/si'
import { useSettings } from '../context/SettingsContext.jsx'

export default function Footer() {
  const year = new Date().getFullYear()
  const { settings } = useSettings()
  const fullName = `${settings.firstName} ${settings.lastName}`.trim()

  return (
    <footer className="mt-0 border-t border-white/5 bg-[#060810]">
      <div className="container-padding mx-auto max-w-6xl py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">

          {/* ── Brand with profile image ── */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* Profile photo */}
              <div className="relative w-12 h-12 flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] opacity-60" />
                <img
                  src={settings.photoUrl}
                  alt={fullName}
                  className="relative w-12 h-12 rounded-full object-cover object-center border-2 border-[var(--primary)]/30"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              </div>
              <div>
                <p className="font-bold text-base text-white leading-tight">{fullName}</p>
                <p className="text-white/40 text-xs mt-0.5">{settings.title}</p>
              </div>
            </div>

            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Full Stack Engineer building scalable, production-grade web applications with Django, PostgreSQL, Vue.js &amp; React.js.
            </p>

            <div className="mt-3 flex items-center gap-1.5 text-white/30 text-xs">
              <FaMapMarkerAlt className="text-[var(--primary)]" />
              {settings.location}
            </div>

            {/* Availability badge */}
            {settings.available && (
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {settings.availableText}
              </div>
            )}
          </div>

          {/* ── Quick links ── */}
          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'About', href: '#about' },
                { name: 'Skills', href: '#skills' },
                { name: 'Experience', href: '#experience' },
                { name: 'Projects', href: '#projects' },
                { name: 'Education', href: '#education' },
                { name: 'Contact', href: '/contact', isRouter: true },
              ].map((link) =>
                link.isRouter ? (
                  <Link key={link.name} to={link.href}
                    className="text-white/40 text-sm hover:text-[var(--primary)] transition-colors">
                    {link.name}
                  </Link>
                ) : (
                  <a key={link.name} href={link.href}
                    className="text-white/40 text-sm hover:text-[var(--primary)] transition-colors">
                    {link.name}
                  </a>
                )
              )}
            </div>
          </div>

          {/* ── Contact ── */}
          <div>
            <h4 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-4">Contact</h4>
            <div className="space-y-3">
              <a href={`mailto:${settings.email}`}
                className="flex items-center gap-2.5 text-white/40 text-sm hover:text-[var(--primary)] transition-colors">
                <FaEnvelope className="text-[var(--primary)] flex-shrink-0" />
                {settings.email}
              </a>
              <a href={`tel:${settings.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2.5 text-white/40 text-sm hover:text-[var(--primary)] transition-colors">
                <FaPhone className="text-[var(--primary)] flex-shrink-0" />
                {settings.phone}
              </a>
              <a href={settings.github} target="_blank" rel="noreferrer"
                className="flex items-center gap-2.5 text-white/40 text-sm hover:text-[var(--primary)] transition-colors">
                <FaGithub className="text-[var(--primary)] flex-shrink-0" />
                {settings.github.replace('https://', '')}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            © {year} {fullName}. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-white/25 text-xs">
            <span>Built with</span>
            <FaHeart className="text-rose-500 text-xs" />
            <span>using</span>
            <SiReact className="text-cyan-400" title="React" />
            <SiDjango className="text-emerald-400" title="Django" />
            <SiVuedotjs className="text-green-400" title="Vue.js" />
            <SiPostgresql className="text-blue-400" title="PostgreSQL" />
          </div>
        </div>
      </div>
    </footer>
  )
}
