import { useState } from 'react'
import { FaLock, FaEye, FaEyeSlash, FaCheck, FaTrash } from 'react-icons/fa'
import { useSettings } from '../../context/SettingsContext.jsx'

function PwInput({ label, value, onChange, placeholder }) {
    const [show, setShow] = useState(false)
    return (
        <div>
            <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">{label}</label>
            <div className="relative">
                <input
                    type={show ? 'text' : 'password'}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-white/85 text-sm pr-10 placeholder-white/25 focus:outline-none focus:border-[var(--primary)]/50 transition-colors"
                />
                <button type="button" onClick={() => setShow(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                    {show ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
        </div>
    )
}

export default function TabSecurity() {
    const { hasPassword, checkPassword, setPassword, clearPassword } = useSettings()
    const isSet = hasPassword()

    const [current, setCurrent] = useState('')
    const [newPw, setNewPw] = useState('')
    const [confirm, setConfirm] = useState('')
    const [msg, setMsg] = useState(null) // { type: 'ok'|'err', text }

    const flash = (type, text) => { setMsg({ type, text }); setTimeout(() => setMsg(null), 3000) }

    const handleSet = (e) => {
        e.preventDefault()
        if (isSet && !checkPassword(current)) { flash('err', 'Current password is incorrect'); return }
        if (newPw.length < 4) { flash('err', 'Password must be at least 4 characters'); return }
        if (newPw !== confirm) { flash('err', 'Passwords do not match'); return }
        setPassword(newPw)
        setCurrent(''); setNewPw(''); setConfirm('')
        flash('ok', isSet ? 'Password updated successfully' : 'Password set successfully')
    }

    const handleRemove = () => {
        if (!checkPassword(current)) { flash('err', 'Current password is incorrect'); return }
        clearPassword()
        setCurrent('')
        flash('ok', 'Password removed. Settings are now open.')
    }

    return (
        <div className="space-y-5">
            {/* Status */}
            <div className={`flex items-center gap-3 p-4 rounded-xl border ${isSet ? 'border-emerald-500/20 bg-emerald-500/10' : 'border-white/10 bg-white/5'}`}>
                <FaLock className={isSet ? 'text-emerald-400' : 'text-white/30'} />
                <div>
                    <p className={`text-sm font-semibold ${isSet ? 'text-emerald-400' : 'text-white/50'}`}>
                        {isSet ? 'Settings are password protected' : 'No password set'}
                    </p>
                    <p className="text-white/35 text-xs mt-0.5">
                        {isSet ? 'A password is required to open settings.' : 'Anyone can open settings. Set a password to protect them.'}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSet} className="space-y-3">
                {isSet && (
                    <PwInput label="Current Password" value={current} onChange={setCurrent} placeholder="Enter current password" />
                )}
                <PwInput label={isSet ? 'New Password' : 'Set Password'} value={newPw} onChange={setNewPw} placeholder="At least 4 characters" />
                <PwInput label="Confirm Password" value={confirm} onChange={setConfirm} placeholder="Repeat password" />

                {msg && (
                    <p className={`text-xs px-3 py-2 rounded-lg ${msg.type === 'ok' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                        {msg.text}
                    </p>
                )}

                <button type="submit"
                    className="w-full py-2.5 rounded-xl bg-[var(--primary)] text-black font-bold text-sm flex items-center justify-center gap-2">
                    <FaCheck /> {isSet ? 'Update Password' : 'Set Password'}
                </button>
            </form>

            {isSet && (
                <div className="pt-4 border-t border-white/8">
                    <p className="text-white/40 text-xs mb-3">Remove password protection</p>
                    <div className="flex gap-2">
                        <PwInput label="" value={current} onChange={setCurrent} placeholder="Enter current password to remove" />
                        <button onClick={handleRemove}
                            className="flex-shrink-0 mt-0 px-4 py-2.5 rounded-xl bg-rose-500/15 border border-rose-500/25 text-rose-400 text-xs font-semibold hover:bg-rose-500/25 transition-colors self-end">
                            <FaTrash />
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
