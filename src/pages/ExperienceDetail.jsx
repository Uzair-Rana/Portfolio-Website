import { useParams, Link, useNavigate } from 'react-router-dom'
import { m as M } from 'framer-motion'
import { FaArrowLeft, FaBriefcase, FaCheckCircle } from 'react-icons/fa'
import { useSettings } from '../context/SettingsContext.jsx'

function ExperienceDetail() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const { data } = useSettings()
    const experiences = data.experiences

    const exp = experiences.find((e) => e.slug === slug)

    if (!exp) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6 text-center px-4">
                <p className="text-6xl font-extrabold text-gray-200">404</p>
                <p className="text-gray-600 text-lg">Experience not found.</p>
                <Link to="/#experience" className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-all">
                    Back
                </Link>
            </div>
        )
    }

    // Projects linked to this experience — read from context so they stay in sync
    const { data: { projects } } = useSettings()

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <div className="absolute -top-60 -right-60 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.05]"
                    style={{ background: 'var(--primary)' }} />
            </div>

            <div className="relative z-10 container-padding mx-auto max-w-5xl pt-28 pb-24">

                <button onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm transition-colors mb-10 group">
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
                    Back
                </button>

                {/* Hero */}
                <M.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    className="glass-card-vibrant rounded-lg p-8 sm:p-12 mb-10 border border-gray-300">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                        <div className="w-20 h-20 rounded-lg bg-blue-100 border border-blue-300 flex items-center justify-center flex-shrink-0">
                            <FaBriefcase className="text-4xl text-blue-600" />
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{exp.role}</h1>
                                {exp.current && (
                                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold border border-green-300">
                                        Current
                                    </span>
                                )}
                            </div>
                            <p className="text-blue-600 font-bold text-lg">{exp.company}</p>
                            <p className="text-gray-600 text-sm mt-0.5">{exp.location} · {exp.period}</p>
                            {exp.tagline && (
                                <p className="text-black text-base leading-relaxed mt-3 max-w-2xl">{exp.tagline}</p>
                            )}
                        </div>
                    </div>
                </M.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left */}
                    <div className="lg:col-span-2 space-y-6">

                        {exp.bullets?.length > 0 && (
                            <M.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                                className="glass-card-vibrant rounded-lg p-7 border border-gray-300">
                                <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                                    <span className="w-1 h-5 rounded-full inline-block bg-blue-600" />
                                    Responsibilities
                                </h2>
                                <ul className="space-y-3.5">
                                    {exp.bullets.map((b, i) => (
                                        <li key={i} className="flex items-start gap-3 text-white/70 text-sm leading-relaxed">
                                            <FaCheckCircle className="mt-0.5 flex-shrink-0 text-base text-[var(--primary)]" />
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </M.div>
                        )}

                        {exp.tech?.length > 0 && (
                            <M.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }}
                                className="glass-card rounded-2xl p-7">
                                <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                                    <span className="w-1 h-5 rounded-full inline-block bg-[var(--primary)]" />
                                    Tech Stack Used
                                </h2>
                                <div className="flex flex-wrap gap-2.5">
                                    {exp.tech.map((t) => (
                                        <span key={t} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-medium">{t}</span>
                                    ))}
                                </div>
                            </M.div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-5">
                        {exp.highlights?.length > 0 && (
                            <M.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}
                                className="glass-card rounded-2xl p-6">
                                <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4">Details</h3>
                                <div className="space-y-4">
                                    {exp.highlights.map(({ label, value }) => (
                                        <div key={label}>
                                            <span className="text-xs text-white/35 uppercase tracking-wider block mb-0.5">{label}</span>
                                            <span className="text-white/80 text-sm font-medium">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </M.div>
                        )}

                        {/* Projects at this role — from context, always in sync */}
                        {projects.length > 0 && (
                            <M.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                                className="glass-card rounded-2xl p-6">
                                <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4">Projects at this Role</h3>
                                <div className="space-y-2">
                                    {projects.map((p) => (
                                        <Link key={p.slug} to={`/projects/${p.slug}`}
                                            className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors group">
                                            <span className={`text-sm font-medium ${p.iconColor}`}>{p.title}</span>
                                            <FaArrowLeft className="text-white/20 text-xs rotate-180 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all" />
                                        </Link>
                                    ))}
                                </div>
                            </M.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExperienceDetail
