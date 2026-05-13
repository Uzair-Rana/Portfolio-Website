import { useRef, useState } from 'react'
import { m as M, AnimatePresence } from 'framer-motion'
import {
    FaTimes, FaUser, FaPalette, FaCamera, FaCheck, FaInfoCircle,
    FaLock, FaEye, FaEyeSlash, FaToggleOn, FaUndo,
    FaProjectDiagram, FaBriefcase, FaCertificate, FaShieldAlt,
} from 'react-icons/fa'
import { useSettings, PALETTES } from '../context/SettingsContext.jsx'
import TabProjects from './settings/TabProjects.jsx'
import TabExperience from './settings/TabExperience.jsx'
import TabCertifications from './settings/TabCertifications.jsx'
import TabSecurity from './settings/TabSecurity.jsx'

/* ── Shared primitives ── */
function Toggle({ value, onChange, label }) {
    return (
        <button onClick={() => onChange(!value)} className="flex items-center justify-between w-full">
            <span className="text-white/70 text-sm">{label}</span>
            <div className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${value ? 'bg-[var(--primary)]' : 'bg-white/10'}`}>
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${value ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </div>
        </button>
    )
}

function Field({ label, value, onChange, placeholder, type = 'text', rows }) {
    const cls = 'w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-white/85 text-sm placeholder-white/25 focus:outline-none focus:border-[var(--primary)]/50 transition-colors'
    return (
        <div>
            {label && <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">{label}</label>}
            {rows
                ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} placeholder={placeholder} className={`${cls} resize-none`} />
                : <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={cls} />
            }
        </div>
    )
}

function SectionHead({ icon: Icon, label }) {
    return (
        <div className="flex items-center gap-2 pt-5 pb-2 border-t border-white/8">
            <Icon className="text-[var(--primary)] text-sm" />
            <span className="text-xs font-bold text-white/50 uppercase tracking-widest">{label}</span>
        </div>
    )
}

/* ── Password gate ── */
function PasswordGate({ onUnlock }) {
    const { hasPassword, checkPassword, setPassword } = useSettings()
    const isSet = hasPassword()

    // State for unlock form
    const [pw, setPw] = useState('')
    const [show, setShow] = useState(false)
    const [err, setErr] = useState('')

    // State for first-time setup form
    const [newPw, setNewPw] = useState('')
    const [confirm, setConfirm] = useState('')
    const [showNew, setShowNew] = useState(false)
    const [showConf, setShowConf] = useState(false)
    const [setupErr, setSetupErr] = useState('')

    // ── Unlock existing password ──
    const handleUnlock = (e) => {
        e.preventDefault()
        if (checkPassword(pw)) {
            onUnlock()
        } else {
            setErr('Incorrect password')
            setPw('')
        }
    }

    // ── First-time: set a password then unlock ──
    const handleSetup = (e) => {
        e.preventDefault()
        if (newPw.length < 4) { setSetupErr('Password must be at least 4 characters'); return }
        if (newPw !== confirm) { setSetupErr('Passwords do not match'); return }
        setPassword(newPw)
        onUnlock()
    }

    // ── No password set yet — force creation ──
    if (!isSet) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <FaLock className="text-2xl text-amber-400" />
                </div>
                <div className="text-center">
                    <h3 className="text-white font-bold text-lg">Create a Password</h3>
                    <p className="text-white/40 text-sm mt-1 leading-relaxed">
                        Set a password to protect your settings.<br />You'll need it every time you open this panel.
                    </p>
                </div>
                <form onSubmit={handleSetup} className="w-full space-y-3">
                    {/* New password */}
                    <div>
                        <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">New Password</label>
                        <div className="relative">
                            <input
                                type={showNew ? 'text' : 'password'}
                                value={newPw}
                                onChange={e => { setNewPw(e.target.value); setSetupErr('') }}
                                placeholder="At least 4 characters"
                                autoFocus
                                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white/85 text-sm pr-10 focus:outline-none focus:border-[var(--primary)]/50 transition-colors"
                            />
                            <button type="button" onClick={() => setShowNew(s => !s)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                                {showNew ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    {/* Confirm password */}
                    <div>
                        <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConf ? 'text' : 'password'}
                                value={confirm}
                                onChange={e => { setConfirm(e.target.value); setSetupErr('') }}
                                placeholder="Repeat password"
                                className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white/85 text-sm pr-10 focus:outline-none focus:border-[var(--primary)]/50 transition-colors"
                            />
                            <button type="button" onClick={() => setShowConf(s => !s)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                                {showConf ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    {setupErr && (
                        <p className="text-rose-400 text-xs px-1">{setupErr}</p>
                    )}
                    <button type="submit"
                        className="w-full py-3 rounded-xl bg-[var(--primary)] text-black font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                        <FaCheck className="text-xs" /> Set Password & Enter
                    </button>
                </form>
            </div>
        )
    }

    // ── Password already set — show unlock form ──
    return (
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center">
                <FaLock className="text-2xl text-[var(--primary)]" />
            </div>
            <div className="text-center">
                <h3 className="text-white font-bold text-lg">Settings Protected</h3>
                <p className="text-white/40 text-sm mt-1">Enter your password to access settings</p>
            </div>
            <form onSubmit={handleUnlock} className="w-full space-y-3">
                <div className="relative">
                    <input
                        type={show ? 'text' : 'password'}
                        value={pw}
                        onChange={e => { setPw(e.target.value); setErr('') }}
                        placeholder="Enter password"
                        autoFocus
                        className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white/85 text-sm pr-10 focus:outline-none focus:border-[var(--primary)]/50 transition-colors"
                    />
                    <button type="button" onClick={() => setShow(s => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                        {show ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                {err && <p className="text-rose-400 text-xs px-1">{err}</p>}
                <button type="submit"
                    className="w-full py-3 rounded-xl bg-[var(--primary)] text-black font-bold text-sm hover:opacity-90 transition-opacity">
                    Unlock Settings
                </button>
            </form>
        </div>
    )
}

/* ── Profile tab ── */
function TabProfile() {
    const { settings, update } = useSettings()
    const fileRef = useRef(null)

    const handlePhoto = (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = ev => update({ photoUrl: ev.target.result })
        reader.readAsDataURL(file)
    }

    return (
        <div className="space-y-4">
            <SectionHead icon={FaCamera} label="Profile Photo" />
            <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--primary)]/30 flex-shrink-0">
                    <img src={settings.photoUrl} alt="Profile" className="w-full h-full object-cover object-center" />
                    {settings.openToWork && (
                        <div className="absolute bottom-0 left-0 right-0 bg-emerald-500 text-white text-[8px] font-bold text-center py-0.5 leading-none tracking-wider">
                            OPEN
                        </div>
                    )}
                </div>
                <div className="flex-1 space-y-2">
                    <button onClick={() => fileRef.current?.click()}
                        className="w-full py-2 rounded-xl bg-[var(--primary)]/15 border border-[var(--primary)]/30 text-[var(--primary)] text-xs font-semibold hover:bg-[var(--primary)]/25 transition-colors">
                        Upload New Photo
                    </button>
                    <button onClick={() => update({ photoUrl: '/images/profile.jpg' })}
                        className="w-full py-2 rounded-xl bg-white/5 border border-white/10 text-white/50 text-xs hover:bg-white/8 transition-colors">
                        Reset to Default
                    </button>
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
            </div>

            <SectionHead icon={FaUser} label="Identity" />
            <Field label="First Name" value={settings.firstName} onChange={v => update({ firstName: v })} placeholder="M. Uzair" />
            <Field label="Last Name" value={settings.lastName} onChange={v => update({ lastName: v })} placeholder="Anjum" />
            <Field label="Job Title" value={settings.title} onChange={v => update({ title: v })} placeholder="Full Stack Engineer" />
            <Field label="Bio" value={settings.bio} onChange={v => update({ bio: v })} rows={3} />

            <SectionHead icon={FaInfoCircle} label="Contact Info" />
            <Field label="Location" value={settings.location} onChange={v => update({ location: v })} placeholder="Lahore, Pakistan" />
            <Field label="Email" value={settings.email} onChange={v => update({ email: v })} type="email" />
            <Field label="Phone" value={settings.phone} onChange={v => update({ phone: v })} placeholder="+92 310-0000000" />
            <Field label="GitHub" value={settings.github} onChange={v => update({ github: v })} placeholder="https://github.com/username" />

            <SectionHead icon={FaToggleOn} label="Status" />
            <Toggle value={settings.available} onChange={v => update({ available: v })} label="Show availability badge" />
            {settings.available && (
                <Field value={settings.availableText} onChange={v => update({ availableText: v })} placeholder="Available for opportunities" />
            )}
            <Toggle value={settings.openToWork} onChange={v => update({ openToWork: v })} label="Open to Work tag on photo" />
            <Toggle value={settings.showStats} onChange={v => update({ showStats: v })} label="Show stats below photo" />

            <SectionHead icon={FaPalette} label="Color Theme" />
            <div className="grid grid-cols-3 gap-2">
                {PALETTES.map((p, i) => (
                    <button key={p.name} onClick={() => update({ paletteIdx: i })}
                        className={`relative rounded-xl p-3 border transition-all ${settings.paletteIdx === i ? 'border-white/40 bg-white/10' : 'border-white/8 bg-white/3 hover:bg-white/8'}`}>
                        <div className="w-full h-5 rounded-lg mb-1.5" style={{ background: `linear-gradient(135deg, ${p.primary}, ${p.accent})` }} />
                        <p className="text-white/60 text-[10px] text-center leading-none">{p.name}</p>
                        {settings.paletteIdx === i && (
                            <div className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full bg-[var(--primary)] flex items-center justify-center">
                                <FaCheck className="text-black text-[7px]" />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}

/* ── Tab definitions ── */
const TABS = [
    { id: 'profile', label: 'Profile', icon: FaUser, component: TabProfile },
    { id: 'projects', label: 'Projects', icon: FaProjectDiagram, component: TabProjects },
    { id: 'exp', label: 'Experience', icon: FaBriefcase, component: TabExperience },
    { id: 'certs', label: 'Certs', icon: FaCertificate, component: TabCertifications },
    { id: 'security', label: 'Security', icon: FaShieldAlt, component: TabSecurity },
]

/* ── Main panel ── */
export default function SettingsPanel({ open, onClose }) {
    const { resetAll } = useSettings()
    const [unlocked, setUnlocked] = useState(false)
    const [activeTab, setActiveTab] = useState('profile')

    // Reset lock when panel closes
    const handleClose = () => { setUnlocked(false); onClose() }

    const ActiveComponent = TABS.find(t => t.id === activeTab)?.component ?? TabProfile

    return (
        <AnimatePresence>
            {open && (
                <>
                    <M.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }} className="fixed inset-0 z-[60] bg-black/60" onClick={handleClose} />

                    <M.aside key="drawer"
                        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                        className="fixed top-0 right-0 h-full w-full max-w-sm z-[70] bg-[#0d1120] border-l border-white/8 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8 flex-shrink-0">
                            <div>
                                <h2 className="text-white font-bold text-base">Portfolio Settings</h2>
                                <p className="text-white/35 text-xs mt-0.5">Changes save automatically</p>
                            </div>
                            <button onClick={handleClose}
                                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all">
                                <FaTimes className="text-xs" />
                            </button>
                        </div>

                        {!unlocked ? (
                            <PasswordGate onUnlock={() => setUnlocked(true)} />
                        ) : (
                            <>
                                {/* Tab bar */}
                                <div className="flex border-b border-white/8 flex-shrink-0 overflow-x-auto">
                                    {TABS.map(t => {
                                        const Icon = t.icon
                                        return (
                                            <button key={t.id} onClick={() => setActiveTab(t.id)}
                                                className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 text-[10px] font-semibold uppercase tracking-wider transition-colors border-b-2 ${activeTab === t.id
                                                    ? 'border-[var(--primary)] text-[var(--primary)]'
                                                    : 'border-transparent text-white/35 hover:text-white/60'
                                                    }`}>
                                                <Icon className="text-sm" />
                                                {t.label}
                                            </button>
                                        )
                                    })}
                                </div>

                                {/* Tab content */}
                                <div className="flex-1 overflow-y-auto px-5 py-4">
                                    <ActiveComponent />
                                </div>

                                {/* Footer */}
                                <div className="px-5 py-4 border-t border-white/8 flex gap-3 flex-shrink-0">
                                    <button onClick={() => { if (window.confirm('Reset all settings to defaults?')) resetAll() }}
                                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/50 text-sm hover:bg-white/10 transition-colors">
                                        <FaUndo className="text-xs" /> Reset
                                    </button>
                                    <button onClick={handleClose}
                                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--primary)] text-black font-bold text-sm hover:opacity-90 transition-opacity">
                                        <FaCheck /> Done
                                    </button>
                                </div>
                            </>
                        )}
                    </M.aside>
                </>
            )}
        </AnimatePresence>
    )
}
