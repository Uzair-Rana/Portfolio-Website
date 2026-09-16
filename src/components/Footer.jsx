import { Link } from 'react-router-dom'
import { FaGithub, FaEnvelope, FaMapMarkerAlt, FaHeart, FaLinkedin, FaTwitter, FaFilePdf, FaWhatsapp } from 'react-icons/fa'
import { useSettings } from '../context/SettingsContext.jsx'

export default function Footer() {
  const year = new Date().getFullYear()
  const { settings } = useSettings()
  const fullName = `${settings.firstName} ${settings.lastName}`.trim()

  return (
    <footer className="bg-white border-t border-gray-300 py-20 md:py-28 relative overflow-hidden">

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 mb-16 md:mb-20">
          {/* Brand Identity */}
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="relative w-16 h-16 flex-shrink-0">
                <img
                  src={settings.photoUrl}
                  alt={fullName}
                  className="relative w-16 h-16 rounded-full object-cover border-2 border-gray-600 grayscale hover:grayscale-0 transition-all duration-500"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-3xl md:text-4xl font-black text-gray-900 tracking-tighter leading-none">{fullName}</h3>
                <p className="text-sm md:text-base font-black text-blue-600 uppercase tracking-[0.25em]">{settings.title}</p>
              </div>
            </div>
            <p className="text-gray-700 text-base md:text-lg font-serif italic leading-relaxed">
              {settings.bio}
            </p>
          </div>

          {/* Navigation & Contact */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Symmetrical Navigation Column */}
            <div className="space-y-8">
              <h4 className="text-xs md:text-sm font-black text-gray-900 uppercase tracking-[0.4em]">Explore</h4>
              <nav className="flex flex-col gap-4">
                {[
                  { name: 'About', href: '#about' },
                  { name: 'Skills', href: '#skills' },
                  { name: 'Projects', href: '#projects' },
                  { name: 'Experience', href: '#experience' },
                  { name: 'Feedback', href: '#feedback' },
                ].map((link) => (
                  <a key={link.name} href={link.href} className="text-sm md:text-base font-bold text-gray-600 hover:text-blue-600 transition-colors uppercase tracking-widest">
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Symmetrical Contact Column */}
            <div className="space-y-8">
              <h4 className="text-xs md:text-sm font-black text-gray-900 uppercase tracking-[0.4em]">Inquiries</h4>
              <div className="flex flex-col gap-6">
                <a href={`mailto:${settings.email}`} className="group flex flex-col gap-2">
                  <span className="text-xs md:text-sm font-black text-gray-600 uppercase tracking-widest">Email Address</span>
                  <span className="text-sm md:text-base text-gray-800 font-bold group-hover:text-blue-600 transition-colors">{settings.email}</span>
                </a>
                <a href={settings.resumeUrl} download className="group flex flex-col gap-2">
                  <span className="text-xs md:text-sm font-black text-gray-600 uppercase tracking-widest">Download Resume</span>
                  <span className="flex items-center gap-2 text-sm md:text-base text-gray-800 font-bold group-hover:text-blue-600 transition-colors">
                    <FaFilePdf />
                    Resume
                  </span>
                </a>
                <div className="flex flex-col gap-3">
                  <span className="text-xs md:text-sm font-black text-gray-600 uppercase tracking-widest">Social</span>
                  <div className="flex gap-4 flex-wrap">
                    {[
                      { icon: FaGithub, href: settings.github },
                      { icon: FaLinkedin, href: settings.linkedin },
                      { icon: FaWhatsapp, href: settings.whatsapp },
                      { icon: FaEnvelope, href: `mailto:${settings.email}` },
                    ].map((social, i) => (
                      <a
                        key={i}
                        href={social.href}
                        target={social.href.startsWith('mailto:') ? '_self' : '_blank'}
                        rel="noreferrer"
                        className="w-12 h-12 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:border-gray-400 transition-all"
                      >
                        <social.icon className="text-lg" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 md:pt-12 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 text-[9px] md:text-xs font-black text-gray-600 uppercase tracking-[0.4em] text-center md:text-left">
          <p>© {year} {fullName}. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-3 md:gap-4">
            <span>Designed with</span>
            <FaHeart className="text-red-500 animate-pulse" />
            <span>by {settings.firstName}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
