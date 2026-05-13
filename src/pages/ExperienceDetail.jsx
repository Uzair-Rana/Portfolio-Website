import { useParams, Link, useNavigate } from 'react-router-dom'
import { m as M } from 'framer-motion'
import { FaArrowLeft, FaBriefcase, FaCheckCircle } from 'react-icons/fa'
import { experiences } from '../data/experience.js'

function ExperienceDetail() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const exp = experiences.find((e) => e.slug === slug)

    if (!exp) {
        return (
            <div className="min-h-screen bg-[#080b14] flex flex-col items-center justify-center gap-6 text-center px-4">
                <p className="text-6xl font-extrabold text-white/10">404</p>
                <p className="text-white/60 text-lg">Experience not found.</p>
                <Link to="/#experience" className="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-black font-bold text-sm">
                    Back
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#080b14] relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <div className="absolute -top-60 -right-60 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.05]"
                    style={{ background: 'var(--primary)' }} />
            </div>

            <div className="relative z-10 container-padding mx-auto max-w-5xl pt-28 pb-24">

                <button onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors mb-10 group">
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
                    Back
                </button>

                {/* Hero block */}
                <M.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="glass-card rounded-3xl p-8 sm:p-12 mb-10"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center flex-shrink-0">
                            <FaBriefcase className="text-4xl text-[var(--primary)]" />
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{exp.role}</h1>
                                {exp.current && (
                                    <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                                        Current
                                    </span>
                                )}
                            </div>
                            <p className="text-[var(--primary)] font-bold text-lg">{exp.company}</p>
                            <p className="text-white/40 text-sm mt-0.5">{exp.location} · {exp.period}</p>
                            <p className="text-white/60 text-base leading-relaxed mt-3 max-w-2xl">{exp.tagline}</p>
                        </div>
                    </div>
                </M.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left */}
                    <div className="lg:col-span-2 space-y-6">

                        <M.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="glass-card rounded-2xl p-7"
                        >
                            <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                                <span className="w-1 h-5 rounded-full inline-block bg-[var(--primary)]" />
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

                        <M.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.18 }}
                            className="glass-card rounded-2xl p-7"
                        >
                            <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                                <span className="w-1 h-5 rounded-full inline-block bg-[var(--primary)]" />
                                Tech Stack Used
                            </h2>
                            <div className="flex flex-wrap gap-2.5">
                                {exp.tech.map((t) => (
                                    <span key={t} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-medium">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </M.div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-5">
                        <M.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.12 }}
                            className="glass-card rounded-2xl p-6"
                        >
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

                        {/* Key projects worked on */}
                        <M.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="glass-card rounded-2xl p-6"
                        >
                            <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4">Projects at this Role</h3>
                            <div className="space-y-2">
                                {[
                                    { name: 'Search Atlas', slug: 'search-atlas', color: 'text-violet-400' },
                                    { name: 'AetherMuse.ai', slug: 'aethermuse', color: 'text-pink-400' },
                                    { name: 'EngineHire', slug: 'enginehire', color: 'text-cyan-400' },
                                ].map((p) => (
                                    <Link
                                        key={p.slug}
                                        to={`/projects/${p.slug}`}
                                        className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors group"
                                    >
                                        <span className={`text-sm font-medium ${p.color}`}>{p.name}</span>
                                        <FaArrowLeft className="text-white/20 text-xs rotate-180 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        </M.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExperienceDetail
