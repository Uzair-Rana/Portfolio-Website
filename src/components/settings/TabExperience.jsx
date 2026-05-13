import { useState } from 'react'
import { FaPlus, FaTrash, FaEdit, FaCheck, FaTimes, FaArrowLeft } from 'react-icons/fa'
import { useSettings } from '../../context/SettingsContext.jsx'

const EMPTY = {
    company: '', role: '', location: '', period: '',
    current: false, tagline: '', tech: '', summary: '', bullets: '',
}

const inputCls = 'w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-white/85 text-sm placeholder-white/25 focus:outline-none focus:border-[var(--primary)]/50 transition-colors'

function Label({ children }) {
    return <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">{children}</label>
}

export default function TabExperience() {
    const { data, addExperience, updateExperience, deleteExperience } = useSettings()
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState(EMPTY)

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

    const startNew = () => { setForm(EMPTY); setEditing('new') }

    const startEdit = (e) => {
        setForm({
            company: e.company || '',
            role: e.role || '',
            location: e.location || '',
            period: e.period || '',
            current: e.current || false,
            tagline: e.tagline || '',
            tech: (e.tech || []).join(', '),
            summary: (e.summary || []).join('\n'),
            bullets: (e.bullets || e.summary || []).join('\n'),
        })
        setEditing(e.id)
    }

    const cancel = () => setEditing(null)

    const save = () => {
        if (!form.company.trim() || !form.role.trim()) return
        const slug = form.company.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        const techArr = form.tech.split(',').map(t => t.trim()).filter(Boolean)
        const sumArr = form.summary.split('\n').map(s => s.trim()).filter(Boolean)
        const bulArr = form.bullets.split('\n').map(b => b.trim()).filter(Boolean)

        const payload = {
            company: form.company,
            role: form.role,
            location: form.location,
            period: form.period,
            current: form.current,
            tagline: form.tagline,
            tech: techArr,
            summary: sumArr.length > 0 ? sumArr : bulArr.slice(0, 3),
            bullets: bulArr.length > 0 ? bulArr : sumArr,
            highlights: [
                { label: 'Company', value: form.company },
                { label: 'Location', value: form.location },
                { label: 'Duration', value: form.period },
                { label: 'Type', value: 'Full-Time' },
            ],
        }

        if (editing === 'new') {
            addExperience({ id: `${slug}-${Date.now()}`, slug, ...payload })
        } else {
            updateExperience(editing, payload)
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
                        {editing === 'new' ? '+ Add Experience' : 'Edit Experience'}
                    </p>
                    <button onClick={cancel} className="text-white/30 hover:text-white/60">
                        <FaTimes className="text-xs" />
                    </button>
                </div>

                <div>
                    <Label>Company Name *</Label>
                    <input value={form.company} onChange={e => set('company', e.target.value)}
                        className={inputCls} placeholder="e.g. SystemsD" />
                </div>
                <div>
                    <Label>Your Role / Title *</Label>
                    <input value={form.role} onChange={e => set('role', e.target.value)}
                        className={inputCls} placeholder="e.g. Full-Stack Developer" />
                </div>
                <div>
                    <Label>Location</Label>
                    <input value={form.location} onChange={e => set('location', e.target.value)}
                        className={inputCls} placeholder="e.g. Johar Town, Lahore" />
                </div>
                <div>
                    <Label>Period</Label>
                    <input value={form.period} onChange={e => set('period', e.target.value)}
                        className={inputCls} placeholder="e.g. 2025 – Present" />
                </div>
                <div>
                    <Label>Tagline</Label>
                    <input value={form.tagline} onChange={e => set('tagline', e.target.value)}
                        className={inputCls} placeholder="Short description of the role" />
                </div>
                <div>
                    <Label>Tech Stack (comma separated)</Label>
                    <input value={form.tech} onChange={e => set('tech', e.target.value)}
                        className={inputCls} placeholder="Django, PostgreSQL, Vue.js" />
                </div>

                {/* Card summary — short bullets shown on home page card */}
                <div>
                    <Label>Card Summary (one per line — shown on home)</Label>
                    <textarea value={form.summary} onChange={e => set('summary', e.target.value)}
                        rows={3} className={`${inputCls} resize-none`}
                        placeholder={"Backend development with Django\nAPI integration\nTeam collaboration"} />
                    <p className="text-white/25 text-[10px] mt-1">3 short bullets shown on the home page card</p>
                </div>

                {/* Full bullets — shown on detail page */}
                <div>
                    <Label>Full Responsibilities (one per line — shown on detail page)</Label>
                    <textarea value={form.bullets} onChange={e => set('bullets', e.target.value)}
                        rows={5} className={`${inputCls} resize-none`}
                        placeholder={"Develop and maintain scalable web applications\nBuild backend systems using Django and PostgreSQL\nCollaborate with cross-functional teams"} />
                    <p className="text-white/25 text-[10px] mt-1">Full bullet points shown on the experience detail page</p>
                </div>

                {/* Current position toggle */}
                <button onClick={() => set('current', !form.current)}
                    className="flex items-center gap-2.5 text-sm text-white/60 hover:text-white/80 transition-colors">
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${form.current ? 'bg-[var(--primary)] border-[var(--primary)]' : 'border-white/20'
                        }`}>
                        {form.current && <FaCheck className="text-black text-[9px]" />}
                    </div>
                    Mark as current position
                </button>

                <button onClick={save}
                    className="w-full py-3 rounded-xl bg-[var(--primary)] text-black font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                    <FaCheck /> {editing === 'new' ? 'Add Experience' : 'Save Changes'}
                </button>
            </div>
        )
    }

    /* ── List view ── */
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <p className="text-white/50 text-xs uppercase tracking-widest font-bold">
                    Experience ({data.experiences.length})
                </p>
                <button onClick={startNew}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--primary)]/15 border border-[var(--primary)]/30 text-[var(--primary)] text-xs font-semibold hover:bg-[var(--primary)]/25 transition-colors">
                    <FaPlus className="text-[10px]" /> Add
                </button>
            </div>

            {data.experiences.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-white/25 text-sm">No experience yet.</p>
                    <button onClick={startNew} className="text-[var(--primary)] text-xs hover:underline mt-1">
                        Add your first role →
                    </button>
                </div>
            )}

            {data.experiences.map(e => (
                <div key={e.id} className="glass-card rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-white font-semibold text-sm">{e.role}</p>
                                {e.current && (
                                    <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">
                                        Current
                                    </span>
                                )}
                            </div>
                            <p className="text-[var(--primary)] text-xs mt-0.5">{e.company}</p>
                            <p className="text-white/35 text-xs">{e.location} · {e.period}</p>
                            {e.tagline && (
                                <p className="text-white/40 text-xs mt-1 line-clamp-1">{e.tagline}</p>
                            )}
                        </div>
                        <div className="flex gap-1.5 flex-shrink-0">
                            <button onClick={() => startEdit(e)}
                                className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                                title="Edit">
                                <FaEdit className="text-[10px]" />
                            </button>
                            <button onClick={() => { if (window.confirm(`Delete "${e.role} at ${e.company}"?`)) deleteExperience(e.id) }}
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
