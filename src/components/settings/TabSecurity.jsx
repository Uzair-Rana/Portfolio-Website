import { useState } from 'react'
import { FaLock, FaEye, FaEyeSlash, FaCheck, FaShieldAlt, FaUnlockAlt } from 'react-icons/fa'
import { useSettings } from '../../context/SettingsContext.jsx'

function PwInput({ label, value, onChange, placeholder, autoFocus }) {
    const [show, setShow] = useState(false)
    return (
        <div>
            {label && <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">{label}</label>}
            <div className="relative">
                <input
                    type={show ? 'text' : 'password'}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    autoFocus={autoFocus}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-white/85 text-sm pr-10 placeholder-white/25 focus:outline-none focus:border-[var(--primary)]/50 transition-colors"
                />
                <button type="button" onClick={() => setShow(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                    {show ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
        </div>
    )
}

function Flash({ msg }) {
    if (!msg) return null
    return (
        <p className={`text-xs px-3 py-2 rounded-lg ${msg.type === 'ok'
                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
            }`}>
            {msg.text}
        </p>
    )
}

export default function TabSecurity() {
    const { hasPassword, checkPassword, setPassword, removePassword } = useSettings()
    const isSet = hasPassword()

    // Change password form
    const [current, setCurrent] = useState('')
    const [newPw, setNewPw] = useState('')
    const [confirm, setConfirm] = useState('')
    const [msg, setMsg] = useState(null)

    // Remove password form
    const [removePw, setRemovePw] = useState('')
    const [removeMsg, setRemoveMsg] = useState(null)

    const flash = (type, text) => { setMsg({ type, text }); setTimeout(() => setMsg(null), 3500) }
    const flashRm = (type, text) => { setRemoveMsg({ type, text }); setTimeout(() => setRemoveMsg(null), 3500) }

    const handleChange = (e) => {
        e.preventDefault()
        // Must verify current password before allowing change
        if (isSet && !checkPassword(current)) {
            flash('err', 'Current password is incorrect')
            setCurrent('')
            return
        }
        if (newPw.length < 4) { flash('err', 'New password must be at least 4 characters'); return }
        if (newPw !== confirm) { flash('err', 'Passwords do not match'); return }
        setPassword(newPw)
        setCurrent(''); setNewPw(''); setConfirm('')
        flash('ok', isSet ? 'Password updated successfully' : 'Password set successfully')
    }

    const handleRemove = (e) => {
        e.preventDefault()
        // Must verify current password before removing
        if (!checkPassword(removePw)) {
            flashRm('err', 'Incorrect password — cannot remove protection')
            setRemovePw('')
            return
        }
        removePassword()
        setRemovePw('')
        flashRm('ok', 'Password removed. Settings are now unprotected.')
    }

    return (
        <div className="space-y-5">

            {/* Status banner */}
            <div className={`flex items-center gap-3 p-4 rounded-xl border ${isSet
                    ? 'border-emerald-500/20 bg-emerald-500/8'
                    : 'border-amber-500/20 bg-amber-500/8'
                }`}>
                {isSet
                    ? <FaShieldAlt className="text-emerald-400 flex-shrink-0" />
                    : <FaUnlockAlt className="text-amber-400 flex-shrink-0" />
                }
                <div>
                    <p className={`text-sm font-semibold ${isSet ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {isSet ? 'Settings are password protected' : 'No password set'}
                    </p>
                    <p className="text-white/35 text-xs mt-0.5">
                        {isSet
                            ? 'A correct password is required every time settings are opened.'
                            : 'Anyone can open settings. Set a password to protect them.'}
                    </p>
                </div>
            </div>

            {/* ── Set / Change password ── */}
            <form onSubmit={handleChange} className="space-y-3">
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest">
                    {isSet ? 'Change Password' : 'Set Password'}
                </p>

                {/* Only show current password field if one is already set */}
                {isSet && (
                    <PwInput
                        label="Current Password"
                        value={current}
                        onChange={setCurrent}
                        placeholder="Enter your current password"
                    />
                )}

                <PwInput
                    label={isSet ? 'New Password' : 'Password'}
                    value={newPw}
                    onChange={setNewPw}
                    placeholder="At least 4 characters"
                    autoFocus={!isSet}
                />
                <PwInput
                    label="Confirm Password"
                    value={confirm}
                    onChange={setConfirm}
                    placeholder="Repeat the password"
                />

                <Flash msg={msg} />

                <button type="submit"
                    className="w-full py-2.5 rounded-xl bg-[var(--primary)] text-black font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                    <FaCheck className="text-xs" />
                    {isSet ? 'Update Password' : 'Set Password'}
                </button>
            </form>

            {/* ── Remove password (only shown when one is set) ── */}
            {isSet && (
                <div className="pt-4 border-t border-white/8 space-y-3">
                    <p className="text-rose-400/80 text-xs font-bold uppercase tracking-widest">
                        Remove Password Protection
                    </p>
                    <p className="text-white/35 text-xs leading-relaxed">
                        You must enter your current password to remove protection. Once removed, anyone can open settings.
                    </p>
                    <form onSubmit={handleRemove} className="space-y-3">
                        <PwInput
                            label="Current Password"
                            value={removePw}
                            onChange={setRemovePw}
                            placeholder="Enter current password to confirm"
                        />
                        <Flash msg={removeMsg} />
                        <button type="submit"
                            className="w-full py-2.5 rounded-xl bg-rose-500/15 border border-rose-500/25 text-rose-400 font-bold text-sm flex items-center justify-center gap-2 hover:bg-rose-500/25 transition-colors">
                            Remove Password Protection
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}
