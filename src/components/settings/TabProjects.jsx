import { useState } from 'react'
import { FaPlus, FaTrash, FaEdit, FaCheck, FaTimes, FaArrowLeft } from 'react-icons/fa'
import { useSettings } from '../../context/SettingsContext.jsx'

const COLOR_OPTIONS = [
    { label: 'Violet', iconColor: 'text-violet-400', accentColor: '#a78bfa', gradient: 'from-violet-500/20 to-purple-500/10', gradientStrong: 'from-violet-600/30 to-purple-600/20', border: 'border-violet-500/20' },
    { label: 'Pink', iconColor: 'text-pink-400', accentColor: '#f472b6', gradient: 'from-pink-500/20 to-rose-500/10', gradientStrong: 'from-pink-600/30 to-rose-600/20', border: 'border-pink-500/20' },
    { label: 'Cyan', iconColor: 'text-cyan-400', accentColor: '#22d3ee', gradient: 'from-cyan-500/20 to-blue-500/10', gradientStrong: 'from-cyan-600/30 to-blue-600/20', border: 'border-cyan-500/20' },
    { label: 'Emerald', iconColor: 'text-emerald-400', accentColor: '#34d399', gradient: 'from-emerald-500/20 to-green-500/10', gradientStrong: 'from-emerald-600/30 to-green-600/20', border: 'border-emerald-500/20' },
    { label: 'Amber', iconColor: 'text-amber-400', accentColor: '#fbbf24', gradient: 'from-amber-500/20 to-yellow-500/10', gradientStrong: 'from-amber-600/30 to-yellow-600/20', border: 'border-amber-500/20' },
]

const ICON_OPTIONS = ['brain', 'microphone', 'usertie', 'code', 'rocket', 'star']

const EMPTY = {
    title: '', role: '', url: '', tagline: '', overview: '',
    bullets: '', tech: '', iconName: 'brain', colorIdx: 0,
}

const inputCls = 'w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-white/85 text-sm placeholder-white/25 focus:outline-none focus:border-[var(--primary)]/50 transition-colors'

function Label({ children }) {
    return <label className="block text-xs text-white/40 uppercase tracking-wider mb-1.5">{children}</label>
}

export default function TabProjects() {
    const { data, addProject, updateProject, deleteProject } = useSettings()
    const [editing, setEditing] = useState(null) // null | 'new' | project.id
    const [form, setForm] = useState(EMPTY)

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

    const startNew = () => {
        setForm(EMPTY)
        setEditing('new')
    }

    const startEdit = (p) => {
        const colorIdx = COLOR_OPTIONS.findIndex(c => c.iconColor === p.iconColor)
        setForm({
            title: p.title || '',
            role: p.role || '',
            url: p.url || '',
            tagline: p.tagline || '',
            overview: p.overview || p.tagline || '',
            bullets: (p.bullets || []).join('\n'),
            tech: (p.tech || []).join(', '),
            iconName: p.iconName || 'brain',
            colorIdx: colorIdx >= 0 ? colorIdx : 0,
        })
        setEditing(p.id)
    }

    const cancel = () => setEditing(null)

    const save = () => {
        if (!form.title.trim()) return
        const col = COLOR_OPTIONS[form.colorIdx]
        const techArr = form.tech.split(',').map(t => t.trim()).filter(Boolean)
        const bullArr = form.bullets.split('\n').map(b => b.trim()).filter(Boolean)
        const slug = form.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

        const payload = {
            title: form.title,
            role: form.role,
            url: form.url,
            tagline: form.tagline,
            overview: form.overview || form.tagline,
            bullets: bullArr,
            tech: techArr,
            iconName: form.iconName,
            iconColor: col.iconColor,
            accentColor: col.accentColor,
            gradient: col.gradient,
            gradientStrong: col.gradientStrong,
            border: col.border,
            highlights: [
                { label: 'My Role', value: form.role },
                { label: 'URL', value: form.url },
                { label: 'Status', value: 'Live' },
            ],
        }

        if (editing === 'new') {
            addProject({ id: `${slug}-${Date.now()}`, slug, ...payload })
        } else {
            updateProject(editing, payload)
        }
        setEditing(null)
    }

    /* ── Edit / Add form ── */
    if (editing !== null) {
        return (
            <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center gap-3 pb-2 border-b border-white/8">
                    <button onClick={cancel} className="text-white/40 hover:text-white transition-colors">
                        <FaArrowLeft className="text-xs" />
                    </button>
                    <p className="text-white font-bold text-sm flex-1">
                        {editing === 'new' ? '+ Add New Project' : 'Edit Project'}
                    </p>
                    <button onClick={cancel} className="text-white/30 hover:text-white/60 transition-colors">
                        <FaTimes className="text-xs" />
                    </button>
                </div>

                {/* Basic info */}
                <div>
                    <Label>Project Title *</Label>
                    <input value={form.title} onChange={e => set('title', e.target.value)}
                        className={inputCls} placeholder="e.g. Search Atlas" />
                </div>
                <div>
                    <Label>Your Role *</Label>
                    <input value={form.role} onChange={e => set('role', e.target.value)}
                        className={inputCls} placeholder="e.g. Django Developer" />
                </div>
                <div>
                    <Label>Live URL</Label>
                    <input value={form.url} onChange={e => set('url', e.target.value)}
                        className={inputCls} placeholder="https://example.com" />
                </div>

                {/* Tagline */}
                <div>
                    <Label>Tagline (shown on card)</Label>
                    <input value={form.tagline} onChange={e => set('tagline', e.target.value)}
                        className={inputCls} placeholder="One-line description shown on the project card" />
                </div>

                {/* Overview / Description */}
                <div>
                    <Label>Full Description / Overview</Label>
                    <textarea value={form.overview} onChange={e => set('overview', e.target.value)}
                        rows={4} className={`${inputCls} resize-none`}
                        placeholder="Detailed description shown on the project detail page..." />
                </div>

                {/* Bullet points */}
                <div>
                    <Label>Contributions (one per line)</Label>
                    <textarea value={form.bullets} onChange={e => set('bullets', e.target.value)}
                        rows={5} className={`${inputCls} resize-none`}
                        placeholder={"Built scalable backend with Django\nImplemented GraphQL APIs\nIntegrated third-party services"} />
                    <p className="text-white/25 text-[10px] mt-1">Each line becomes a bullet point on the detail page</p>
                </div>

                {/* Tech stack */}
                <div>
                    <Label>Tech Stack (comma separated)</Label>
                    <input value={form.tech} onChange={e => set('tech', e.target.value)}
                        className={inputCls} placeholder="Django, PostgreSQL, Vue.js, REST API" />
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
                                className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${form.colorIdx === i
                                        ? 'border-white/40 bg-white/10'
                                        : 'border-white/10 hover:border-white/25'
                                    }`}
                                style={{ color: c.accentColor }}>
                                {c.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Save */}
                <button onClick={save}
                    className="w-full py-3 rounded-xl bg-[var(--primary)] text-black font-bold text-sm flex items-center justify-center gap-2 mt-2 hover:opacity-90 transition-opacity">
                    <FaCheck /> {editing === 'new' ? 'Add Project' : 'Save Changes'}
                </button>
            </div>
        )
    }

    /* ── List view ── */
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <p className="text-white/50 text-xs uppercase tracking-widest font-bold">
                    Projects ({data.projects.length})
                </p>
                <button onClick={startNew}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--primary)]/15 border border-[var(--primary)]/30 text-[var(--primary)] text-xs font-semibold hover:bg-[var(--primary)]/25 transition-colors">
                    <FaPlus className="text-[10px]" /> Add Project
                </button>
            </div>

            {data.projects.length === 0 && (
                <div className="text-center py-8 space-y-2">
                    <p className="text-white/25 text-sm">No projects yet.</p>
                    <button onClick={startNew} className="text-[var(--primary)] text-xs hover:underline">
                        Add your first project →
                    </button>
                </div>
            )}

            {data.projects.map(p => (
                <div key={p.id}
                    className={`rounded-xl border ${p.border} bg-gradient-to-br ${p.gradient} p-4`}>
                    <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-semibold text-sm truncate">{p.title}</p>
                            <p className={`text-xs ${p.iconColor} truncate mt-0.5`}>{p.role}</p>
                            {p.tagline && (
                                <p className="text-white/40 text-xs mt-1 line-clamp-2 leading-relaxed">{p.tagline}</p>
                            )}
                            {p.tech?.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {p.tech.slice(0, 3).map(t => (
                                        <span key={t} className="px-1.5 py-0.5 rounded bg-white/5 text-white/35 text-[10px]">{t}</span>
                                    ))}
                                    {p.tech.length > 3 && (
                                        <span className="text-white/25 text-[10px]">+{p.tech.length - 3}</span>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="flex gap-1.5 flex-shrink-0">
                            <button onClick={() => startEdit(p)}
                                className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                                title="Edit">
                                <FaEdit className="text-[10px]" />
                            </button>
                            <button onClick={() => { if (window.confirm(`Delete "${p.title}"?`)) deleteProject(p.id) }}
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
