import { useState } from 'react'
import { FaPlus, FaTrash, FaEdit, FaCheck, FaTimes, FaArrowLeft } from 'react-icons/fa'
import { useSettings } from '../../context/SettingsContext.jsx'

const COLOR_OPTIONS = [
    { label: 'Cyan', iconColor: 'text-cyan-400', accentColor: '#22d3ee', gradient: 'from-cyan-500/20 to-blue-500/10', border: 'border-cyan-500/20' },
    { label: 'Violet', iconColor: 'text-violet-400', accentColor: '#a78bfa', gradient: 'from-violet-500/20 to-purple-500/10', border: 'border-violet-500/20' },
    { label: 'Amber', iconColor: 'text-amber-400', accentColor: '#fbbf24', gradient: 'from-amber-500/20 to-yellow-500/10', border: 'border-amber-500/20' },
    { label: 'Pink', iconColor: 'text-pink-400', accentColor: '#f472b6', gradient: 'from-pink-500/20 to-rose-500/10', border: 'border-pink-500/20' },
    { label: 'Emerald', iconColor: 'text-emerald-400', accentColor: '#34d399', gradient: 'from-emerald-500/20 to-green-500/10', border: 'border-emerald-500/20' },
]

const ICON_OPTIONS = ['certificate', 'flask', 'star', 'award', 'medal']

const EMPTY = {
    title: '', issuer: '', tagline: '', details: '', skills: '',
    iconName: 'certificate', colorIdx: 0,
}

const inputCls = 'w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-white/85 text-sm placeholder-white/25 focus:outline-none focus:border-[var(--primary)]/50 transition-colors'

function Label({ children }) {
    return <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">{children}</label>
}

export default function TabCertifications() {
    const { data, addCertification, updateCertification, deleteCertification } = useSettings()
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState(EMPTY)

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

    const startNew = () => { setForm(EMPTY); setEditing('new') }

    const startEdit = (c) => {
        const colorIdx = COLOR_OPTIONS.findIndex(o => o.iconColor === c.iconColor)
        setForm({
            title: c.title || '',
            issuer: c.issuer || '',
            tagline: c.tagline || '',
            details: (c.details || []).join('\n'),
            skills: (c.skills || []).join(', '),
            iconName: c.iconName || 'certificate',
            colorIdx: colorIdx >= 0 ? colorIdx : 0,
        })
        setEditing(c.id)
    }

    const cancel = () => setEditing(null)

    const save = () => {
        if (!form.title.trim()) return
        const col = COLOR_OPTIONS[form.colorIdx]
        const slug = form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').slice(0, 50)
        const detArr = form.details.split('\n').map(d => d.trim()).filter(Boolean)
        const sklArr = form.skills.split(',').map(s => s.trim()).filter(Boolean)

        const payload = {
            title: form.title,
            issuer: form.issuer,
            tagline: form.tagline,
            details: detArr.length > 0 ? detArr : [form.tagline],
            skills: sklArr,
            iconName: form.iconName,
            iconColor: col.iconColor,
            accentColor: col.accentColor,
            gradient: col.gradient,
            border: col.border,
            highlights: [
                { label: 'Certificate', value: form.title },
                { label: 'Issuer', value: form.issuer },
                { label: 'Status', value: 'Completed' },
            ],
        }

        if (editing === 'new') {
            addCertification({ id: `${slug}-${Date.now()}`, slug, ...payload })
        } else {
            updateCertification(editing, payload)
        }
        setEditing(null)
    }

    /* ── Edit / Add form ── */
    if (editing !== null) {
        return (
            <div className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-white/8">
                    <button onClick={cancel} className="text-white/40 hover:text-white transition-colors">
                        <FaArrowLeft className="text-xs" />
                    </button>
                    <p className="text-white font-bold text-sm flex-1">
                        {editing === 'new' ? '+ Add Certification' : 'Edit Certification'}
                    </p>
                    <button onClick={cancel} className="text-white/30 hover:text-white/60">
                        <FaTimes className="text-xs" />
                    </button>
                </div>

                <div>
                    <Label>Certificate Title *</Label>
                    <input value={form.title} onChange={e => set('title', e.target.value)}
                        className={inputCls} placeholder="e.g. Certificate in Computer Applications" />
                </div>
                <div>
                    <Label>Issuer / Organization</Label>
                    <input value={form.issuer} onChange={e => set('issuer', e.target.value)}
                        className={inputCls} placeholder="e.g. Professional Certification Body" />
                </div>
                <div>
                    <Label>Tagline (shown on card)</Label>
                    <input value={form.tagline} onChange={e => set('tagline', e.target.value)}
                        className={inputCls} placeholder="One-line description shown on the card" />
                </div>

                {/* Full description */}
                <div>
                    <Label>Description (one per line — shown on detail page)</Label>
                    <textarea value={form.details} onChange={e => set('details', e.target.value)}
                        rows={4} className={`${inputCls} resize-none`}
                        placeholder={"Completed a comprehensive certification program\nGained proficiency in office productivity tools"} />
                    <p className="text-white/25 text-[10px] mt-1">Each line becomes a paragraph on the detail page</p>
                </div>

                {/* Skills */}
                <div>
                    <Label>Skills Covered (comma separated)</Label>
                    <input value={form.skills} onChange={e => set('skills', e.target.value)}
                        className={inputCls} placeholder="Microsoft Office, Document Management, Spreadsheets" />
                </div>

                {/* Icon */}
                <div>
                    <Label>Icon</Label>
                    <div className="flex gap-2 flex-wrap">
                        {ICON_OPTIONS.map(ic => (
                            <button key={ic} onClick={() => set('iconName', ic)}
                                className={`px-3 py-1.5 rounded-lg text-xs border transition-all capitalize ${form.iconName === ic
                                        ? 'border-[var(--primary)]/60 bg-[var(--primary)]/15 text-[var(--primary)]'
                                        : 'border-white/10 text-white/40 hover:border-white/25'
                                    }`}>
                                {ic}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Color */}
                <div>
                    <Label>Card Color</Label>
                    <div className="flex gap-2 flex-wrap">
                        {COLOR_OPTIONS.map((c, i) => (
                            <button key={c.label} onClick={() => set('colorIdx', i)}
                                className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${form.colorIdx === i ? 'border-white/40 bg-white/10' : 'border-white/10 hover:border-white/25'
                                    }`}
                                style={{ color: c.accentColor }}>
                                {c.label}
                            </button>
                        ))}
                    </div>
                </div>

                <button onClick={save}
                    className="w-full py-3 rounded-xl bg-[var(--primary)] text-black font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                    <FaCheck /> {editing === 'new' ? 'Add Certification' : 'Save Changes'}
                </button>
            </div>
        )
    }

    /* ── List view ── */
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <p className="text-white/50 text-xs uppercase tracking-widest font-bold">
                    Certifications ({data.certifications.length})
                </p>
                <button onClick={startNew}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--primary)]/15 border border-[var(--primary)]/30 text-[var(--primary)] text-xs font-semibold hover:bg-[var(--primary)]/25 transition-colors">
                    <FaPlus className="text-[10px]" /> Add
                </button>
            </div>

            {data.certifications.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-white/25 text-sm">No certifications yet.</p>
                    <button onClick={startNew} className="text-[var(--primary)] text-xs hover:underline mt-1">
                        Add your first certification →
                    </button>
                </div>
            )}

            {data.certifications.map(c => (
                <div key={c.id}
                    className={`rounded-xl border ${c.border} bg-gradient-to-br ${c.gradient} p-4`}>
                    <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-semibold text-sm leading-snug">{c.title}</p>
                            <p className={`text-xs ${c.iconColor} mt-0.5`}>{c.issuer}</p>
                            {c.tagline && (
                                <p className="text-white/40 text-xs mt-1 line-clamp-2 leading-relaxed">{c.tagline}</p>
                            )}
                            {c.skills?.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {c.skills.slice(0, 3).map(s => (
                                        <span key={s} className="px-1.5 py-0.5 rounded bg-white/5 text-white/35 text-[10px]">{s}</span>
                                    ))}
                                    {c.skills.length > 3 && (
                                        <span className="text-white/25 text-[10px]">+{c.skills.length - 3}</span>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="flex gap-1.5 flex-shrink-0">
                            <button onClick={() => startEdit(c)}
                                className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                                title="Edit">
                                <FaEdit className="text-[10px]" />
                            </button>
                            <button onClick={() => { if (window.confirm(`Delete "${c.title}"?`)) deleteCertification(c.id) }}
                                className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 hover:bg-rose-500/20 transition-colors"
                                title="Delete">
                                <FaTrash className="text-[10px]" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
