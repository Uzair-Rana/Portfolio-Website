import { useState } from 'react'
import { FaPaperPlane, FaFileUpload } from 'react-icons/fa'
import { useSettings } from '../context/SettingsContext.jsx'

function ContactForm() {
  const { settings } = useSettings()
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    subject: '', 
    message: '',
    attachment: null
  })
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  const setFile = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.files[0] }))

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return false
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return false
    return true
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) { setStatus('error'); return }
    setStatus('sending')

    try {
      // Build WhatsApp message
      const message = `
*New Message from Portfolio*

👤 Name: ${form.name}
📧 Email: ${form.email}
${form.subject ? `📝 Subject: ${form.subject}` : ''}
${form.attachment ? `📎 Attachment: ${form.attachment.name}` : ''}

💬 Message:
${form.message}
      `.trim()
      
      // Encode for URL
      const encodedMessage = encodeURIComponent(message)
      
      // Open WhatsApp
      window.open(`${settings.whatsapp}?text=${encodedMessage}`, '_blank')

      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '', attachment: null })
    } catch (err) {
      console.error('Contact form error:', err)
      setStatus('error')
    }
  }

  const inputClass =
    'w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[var(--primary)]/50 focus:bg-white/8 transition-all'

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Name *</label>
          <input
            value={form.name}
            onChange={set('name')}
            placeholder="Your name"
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Email *</label>
          <input
            type="email"
            value={form.email}
            onChange={set('email')}
            placeholder="your@email.com"
            className={inputClass}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Subject</label>
        <input
          value={form.subject}
          onChange={set('subject')}
          placeholder="What's this about?"
          className={inputClass}
        />
      </div>

      <div className="relative">
        <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Message *</label>
        <textarea
          value={form.message}
          onChange={set('message')}
          placeholder="Tell me about your project or opportunity..."
          rows={5}
          className={`${inputClass} resize-none pr-12`}
          required
        />
        <label className="absolute bottom-3 right-3 p-2 rounded-lg text-white/60 hover:text-[var(--primary)] cursor-pointer transition-all">
          <FaFileUpload size={18} />
          <input
            type="file"
            id="attachment"
            className="hidden"
            onChange={setFile('attachment')}
          />
        </label>
      </div>

      {form.attachment && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/80">
          <FaFileUpload className="text-[var(--primary)]" />
          <span className="text-sm truncate flex-1">{form.attachment.name}</span>
          <button
            type="button"
            onClick={() => setForm((f) => ({ ...f, attachment: null }))}
            className="text-white/40 hover:text-white/80 transition-all"
          >
            ×
          </button>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full py-3 rounded-xl bg-[var(--primary)] text-black font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-[var(--primary)]/20"
      >
        {status === 'sending' ? (
          <>
            <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <FaPaperPlane />
            Send Message
          </>
        )}
      </button>

      {status === 'success' && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
          <span>✓</span> Message sent successfully! I'll get back to you soon.
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm">
          <span>✕</span> Please fill in all required fields with valid information.
        </div>
      )}
    </form>
  )
}

export default ContactForm
