import { useParams, Link, useNavigate } from 'react-router-dom'
import { m as M, AnimatePresence } from 'framer-motion'
import { FaArrowLeft, FaGraduationCap, FaStar, FaBook, FaChartLine, FaCheckCircle, FaCode, FaExternalLinkAlt } from 'react-icons/fa'
import { educationList } from '../data/education.js'

function EducationDetail() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const edu = educationList.find((e) => e.slug === slug)

    if (!edu) {
        return (
            <div className="min-h-screen bg-[#080b14] flex flex-col items-center justify-center gap-6 text-center px-4">
                <p className="text-6xl font-extrabold text-white/10">404</p>
                <p className="text-white/60 text-lg">Education record not found.</p>
                <Link to="/#education" className="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-black font-bold text-sm">
                    Back
                </Link>
            </div>
        )
    }

    const fyp = edu.fyp

    return (
        <div className="min-h-screen bg-[#080b14] relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <div className="absolute -top-60 -left-60 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.05]"
                    style={{ background: 'var(--highlight)' }} />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.04]"
                    style={{ background: 'var(--primary)' }} />
            </div>

            <div className="relative z-10 container-padding mx-auto max-w-5xl pt-28 pb-24">

                {/* Back */}
                <button onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors mb-10 group">
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
                    Back
                </button>

                {/* ── Hero block ── */}
                <M.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="glass-card rounded-3xl p-8 sm:p-12 mb-8"
                >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center flex-shrink-0">
                            <FaGraduationCap className="text-4xl text-[var(--primary)]" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">{edu.degree}</h1>
                            <p className="text-[var(--primary)] font-bold text-lg">{edu.institution}</p>
                            <p className="text-white/40 text-sm mt-0.5">{edu.period}</p>
                            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--highlight)]/10 border border-[var(--highlight)]/20">
                                <FaStar className="text-[var(--highlight)]" />
                                <span className="text-[var(--highlight)] font-extrabold text-xl">{edu.cgpa}</span>
                                <span className="text-white/40 text-sm">/ {edu.cgpaMax} CGPA</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-8">
                        <div className="flex justify-between text-xs text-white/40 mb-2">
                            <span>Academic Performance</span>
                            <span>{edu.cgpaPct}%</span>
                        </div>
                        <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
                            <M.div
                                initial={{ width: 0 }}
                                animate={{ width: `${edu.cgpaPct}%` }}
                                transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
                                className="h-full rounded-full bg-gradient-to-r from-[var(--highlight)] to-[var(--primary)]"
                            />
                        </div>
                    </div>
                </M.div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* ── Left: main content ── */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* About degree */}
                        <M.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="glass-card rounded-2xl p-7"
                        >
                            <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                                <span className="w-1 h-5 rounded-full inline-block bg-[var(--primary)]" />
                                About This Degree
                            </h2>
                            <div className="space-y-3">
                                {edu.details.map((d, i) => (
                                    <p key={i} className="text-white/65 text-sm leading-relaxed">{d}</p>
                                ))}
                            </div>
                        </M.div>

                        {/* Key courses */}
                        <M.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.18 }}
                            className="glass-card rounded-2xl p-7"
                        >
                            <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                                <span className="w-1 h-5 rounded-full inline-block bg-[var(--primary)]" />
                                Key Courses
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-2.5">
                                {edu.courses.map((c) => (
                                    <div key={c} className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10">
                                        <FaBook className="text-[var(--primary)] text-xs flex-shrink-0" />
                                        <span className="text-white/70 text-sm">{c}</span>
                                    </div>
                                ))}
                            </div>
                        </M.div>

                        {/* ── Final Year Project ── */}
                        {fyp && (
                            <M.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.55, delay: 0.26 }}
                                className="rounded-2xl border border-amber-500/25 bg-gradient-to-br from-amber-500/10 to-orange-500/5 overflow-hidden"
                            >
                                {/* FYP header */}
                                <div className="px-7 pt-7 pb-5 border-b border-amber-500/15">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center flex-shrink-0">
                                            <FaChartLine className="text-2xl text-amber-400" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
                                                    {fyp.subtitle}
                                                </span>
                                            </div>
                                            <h2 className="text-xl font-extrabold text-white leading-snug">{fyp.title}</h2>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-white/60 text-sm leading-relaxed">{fyp.description}</p>
                                </div>

                                {/* FYP body */}
                                <div className="px-7 py-6 space-y-6">

                                    {/* Contributions */}
                                    <div>
                                        <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3">
                                            What I Built
                                        </h3>
                                        <ul className="space-y-2.5">
                                            {fyp.bullets.map((b, i) => (
                                                <M.li
                                                    key={i}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.35, delay: 0.35 + i * 0.06 }}
                                                    className="flex items-start gap-3 text-white/65 text-sm leading-relaxed"
                                                >
                                                    <FaCheckCircle className="mt-0.5 flex-shrink-0 text-amber-400" />
                                                    {b}
                                                </M.li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Tech stack */}
                                    <div>
                                        <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3">
                                            Tech Stack
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {fyp.tech.map((t) => (
                                                <span key={t}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium">
                                                    <FaCode className="text-[10px]" />
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Outcomes grid */}
                                    <div>
                                        <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3">
                                            Project Details
                                        </h3>
                                        <div className="grid sm:grid-cols-2 gap-3">
                                            {fyp.outcomes.map(({ label, value }) => (
                                                <div key={label} className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                                                    <p className="text-xs text-white/35 uppercase tracking-wider mb-0.5">{label}</p>
                                                    <p className="text-white/80 text-sm font-semibold">{value}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </M.div>
                        )}
                    </div>

                    {/* ── Sidebar ── */}
                    <div className="space-y-5">
                        <M.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.12 }}
                            className="glass-card rounded-2xl p-6"
                        >
                            <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4">Details</h3>
                            <div className="space-y-4">
                                {edu.highlights.map(({ label, value }) => (
                                    <div key={label}>
                                        <span className="text-xs text-white/35 uppercase tracking-wider block mb-0.5">{label}</span>
                                        <span className="text-white/80 text-sm font-medium">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </M.div>

                        {/* FYP quick stats in sidebar */}
                        {fyp && (
                            <M.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.22 }}
                                className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-orange-500/5 p-6"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <FaChartLine className="text-amber-400" />
                                    <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest">FYP Snapshot</h3>
                                </div>
                                <div className="space-y-3">
                                    {fyp.outcomes.map(({ label, value }) => (
                                        <div key={label}>
                                            <span className="text-xs text-white/35 uppercase tracking-wider block mb-0.5">{label}</span>
                                            <span className="text-white/75 text-sm font-medium">{value}</span>
                                        </div>
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

export default EducationDetail
