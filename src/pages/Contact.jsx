import ContactForm from '../components/ContactForm.jsx'
import { m as M } from 'framer-motion'
import { FaEnvelope, FaPhone, FaGithub, FaMapMarkerAlt } from 'react-icons/fa'

const contactInfo = [
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'uzairanjummrana@gmail.com',
    href: 'mailto:uzairanjummrana@gmail.com',
    color: 'text-[var(--primary)]',
    bg: 'bg-[var(--primary)]/10',
  },
  {
    icon: FaPhone,
    label: 'Phone',
    value: '+92 310-7575202',
    href: 'tel:+923107575202',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    value: 'github.com/Uzair-Rana',
    href: 'https://github.com/Uzair-Rana',
    color: 'text-violet-400',
    bg: 'bg-violet-400/10',
  },
  {
    icon: FaMapMarkerAlt,
    label: 'Location',
    value: 'Lahore, Pakistan',
    href: null,
    color: 'text-rose-400',
    bg: 'bg-rose-400/10',
  },
]

function Contact() {
  return (
    <section className="min-h-screen bg-[#080b14] relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[var(--primary)] opacity-[0.05] blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[var(--accent)] opacity-[0.05] blur-[100px]" />
      </div>

      <div className="relative z-10 container-padding mx-auto max-w-6xl pt-28 pb-20">
        {/* Header */}
        <M.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-3"
        >
          <span className="text-sm font-semibold text-[var(--primary)] uppercase tracking-widest">Let's Talk</span>
        </M.div>

        <M.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-4xl sm:text-5xl font-extrabold heading-gradient mb-4"
        >
          Get In Touch
        </M.h1>

        <M.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/50 text-base mb-12 max-w-xl"
        >
          Have a project in mind or want to discuss an opportunity? I'd love to hear from you. Drop a message and I'll get back to you promptly.
        </M.p>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact info — left */}
          <M.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {contactInfo.map(({ icon: Icon, label, value, href, color, bg }) => (
              <div
                key={label}
                className="glass-card rounded-2xl p-5 flex items-center gap-4"
              >
                <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`text-lg ${color}`} />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noreferrer' : undefined}
                      className={`${color} text-sm font-medium hover:underline`}
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-white/80 text-sm font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Availability note */}
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-emerald-400 text-sm font-semibold">Available for opportunities</span>
              </div>
              <p className="text-white/40 text-xs leading-relaxed">
                Open to full-time roles, freelance projects, and collaborations. Response time: within 24 hours.
              </p>
            </div>
          </M.div>

          {/* Form — right */}
          <M.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3 glass-card rounded-2xl p-8"
          >
            <h2 className="text-xl font-bold text-white mb-6">Send a Message</h2>
            <ContactForm />
          </M.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
