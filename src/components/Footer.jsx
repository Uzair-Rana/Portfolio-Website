import { Link } from 'react-router-dom'
import { FaGithub, FaEnvelope, FaMapMarkerAlt, FaHeart, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { useSettings } from '../context/SettingsContext.jsx'

export default function Footer() {
  const year = new Date().getFullYear()
  const { settings } = useSettings()
  const fullName = `${settings.firstName} ${settings.lastName}`.trim()

  return (
    <footer className="bg-[#020617] border-t border-white/5 py-16 md:py-24 noise-bg relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 vibrant-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600/10 vibrant-glow" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-16 md:mb-24">
          {/* Brand Identity */}
          <div className="space-y-6 md:space-y-8 max-w-md">
            <div className="flex items-center gap-6">
              <div className="relative w-12 md:w-16 h-12 md:h-16 flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 opacity-20" />
                <img
                  src={settings.photoUrl}
                  alt={fullName}
                  className="relative w-12 md:w-16 h-12 md:h-16 rounded-full object-cover border border-white/10 grayscale hover:grayscale-0 transition-all duration-500"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-2xl md:text-4xl font-black text-white tracking-tighter leading-none">{fullName}</h3>
                <p className="text-[10px] md:text-xs font-black text-indigo-400 uppercase tracking-[0.2em]">{settings.title}</p>
              </div>
            </div>
            <p className="text-gray-500 text-base md:text-lg font-serif italic leading-relaxed">
              {settings.bio}
            </p>
          </div>

          <div className="flex flex-wrap gap-12 md:gap-24">
            {/* Symmetrical Navigation Column */}
            <div className="space-y-6 md:space-y-8">
              <h4 className="text-[10px] md:text-xs font-black text-white uppercase tracking-[0.4em]">Explore</h4>
              <nav className="flex flex-col gap-3 md:gap-4">
                {[
                  { name: 'About', href: '#about' },
                  { name: 'Skills', href: '#skills' },
                  { name: 'Projects', href: '#projects' },
                  { name: 'Experience', href: '#experience' },
                ].map((link) => (
                  <a key={link.name} href={link.href} className="text-sm md:text-base font-bold text-gray-500 hover:text-indigo-400 transition-colors uppercase tracking-widest">
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Symmetrical Contact Column */}
            <div className="space-y-6 md:space-y-8">
              <h4 className="text-[10px] md:text-xs font-black text-white uppercase tracking-[0.4em]">Inquiries</h4>
              <div className="flex flex-col gap-4 md:gap-6">
                <a href={`mailto:${settings.email}`} className="group flex flex-col gap-1">
                  <span className="text-[9px] md:text-[10px] font-black text-gray-600 uppercase tracking-widest">Email Address</span>
                  <span className="text-sm md:text-base text-white font-bold group-hover:text-indigo-400 transition-colors">{settings.email}</span>
                </a>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] md:text-[10px] font-black text-gray-600 uppercase tracking-widest">Social</span>
                  <div className="flex gap-4">
                    {[
                      { icon: FaGithub, href: settings.github },
                      { icon: FaLinkedin, href: '#' },
                      { icon: FaTwitter, href: '#' },
                    ].map((social, i) => (
                      <a key={i} href={social.href} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <social.icon className="text-lg md:text-xl" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 text-[8px] md:text-[10px] font-black text-gray-600 uppercase tracking-[0.4em] text-center md:text-left">
          <p>© {year} {fullName}. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-3 md:gap-4">
            <span>Designed with</span>
            <FaHeart className="text-pink-500 animate-pulse" />
            <span>by {settings.firstName}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
