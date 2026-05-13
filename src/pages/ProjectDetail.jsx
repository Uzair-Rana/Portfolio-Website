import { useParams, Link, useNavigate } from 'react-router-dom'
import { m as M } from 'framer-motion'
import { FaArrowLeft, FaExternalLinkAlt, FaCheckCircle, FaBrain, FaMicrophone, FaUserTie, FaCode, FaRocket, FaStar } from 'react-icons/fa'
import { useSettings } from '../context/SettingsContext.jsx'

const iconComponents = {
    brain: FaBrain, microphone: FaMicrophone, usertie: FaUserTie,
    code: FaCode, rocket: FaRocket, star: FaStar,
}

function ProjectDetail() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const project = projects.find((p) => p.slug === slug)

    if (!project) {
        return (
            <div className="min-h-screen bg-[#080b14] flex flex-col items-center justify-center gap-6 text-center px-4">
                <p className="text-6xl font-extrabold text-white/10">404</p>
                <p className="text-white/60 text-lg">Project not found.</p>
                <Link to="/#projects" className="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-black font-bold text-sm hover:opacity-90 transition-all">
                    Back to Projects
                </Link>
            </div>
        )
    }

    const Icon = iconComponents[project.iconName]
    const others = projects.filter((p) => p.slug !== slug)

    return (
        <div className="min-h-screen bg-[#080b14] relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <div
                    className="absolute -top-60 -right-60 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.06]"
                    style={{ background: project.accentColor }}
                />
            </div>

            <div className="relative z-10 container-padding mx-auto max-w-5xl pt-28 pb-24">

                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors mb-10 group"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
                    Back
                </button>

                {/* Hero block */}
                <M.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`rounded-3xl border ${project.border} bg-gradient-to-br ${project.gradientStrong} p-8 sm:p-12 mb-10`}
                >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                            <Icon className={`text-4xl ${project.iconColor}`} />
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{project.title}</h1>
                                <span
                                    className="px-3 py-1 rounded-full text-xs font-bold border"
                                    style={{ color: project.accentColor, borderColor: `${project.accentColor}40`, background: `${project.accentColor}15` }}
                                >
                                    Live
                                </span>
                            </div>
                            <p className={`text-base font-semibold ${project.iconColor} mb-3`}>{project.role}</p>
                            <p className="text-white/60 text-base leading-relaxed max-w-2xl">{project.tagline}</p>
                        </div>

                        <a
                            href={project.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-black hover:opacity-90 transition-all hover:scale-105 flex-shrink-0 self-start sm:self-center"
                            style={{ background: project.accentColor }}
                        >
                            <FaExternalLinkAlt className="text-xs" />
                            Visit Live
                        </a>
                    </div>
                </M.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left — main content */}
                    <div className="lg:col-span-2 space-y-6">

                        <M.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="glass-card rounded-2xl p-7"
                        >
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-1 h-5 rounded-full inline-block" style={{ background: project.accentColor }} />
                                Project Overview
                            </h2>
                            <p className="text-white/65 leading-relaxed text-base">{project.overview}</p>
                        </M.div>

                        <M.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.18 }}
                            className="glass-card rounded-2xl p-7"
                        >
                            <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                                <span className="w-1 h-5 rounded-full inline-block" style={{ background: project.accentColor }} />
                                My Contributions
                            </h2>
                            <ul className="space-y-3.5">
                                {project.bullets.map((b, i) => (
                                    <li key={i} className="flex items-start gap-3 text-white/70 text-sm leading-relaxed">
                                        <FaCheckCircle className="mt-0.5 flex-shrink-0 text-base" style={{ color: project.accentColor }} />
                                        {b}
                                    </li>
                                ))}
                            </ul>
                        </M.div>

                        <M.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.26 }}
                            className="glass-card rounded-2xl p-7"
                        >
                            <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                                <span className="w-1 h-5 rounded-full inline-block" style={{ background: project.accentColor }} />
                                Tech Stack
                            </h2>
                            <div className="flex flex-wrap gap-2.5">
                                {project.tech.map((t) => (
                                    <span key={t} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-medium">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </M.div>
                    </div>

                    {/* Right — sidebar */}
                    <div className="space-y-5">
                        <M.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.12 }}
                            className="glass-card rounded-2xl p-6"
                        >
                            <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4">Project Info</h3>
                            <div className="space-y-4">
                                {project.highlights.map(({ label, value }) => (
                                    <div key={label}>
                                        <span className="text-xs text-white/35 uppercase tracking-wider block mb-0.5">{label}</span>
                                        <span className="text-white/80 text-sm font-medium">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </M.div>

                        <M.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className={`rounded-2xl border ${project.border} bg-gradient-to-br ${project.gradient} p-6`}
                        >
                            <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-3">Live Platform</h3>
                            <p className="text-white/50 text-xs mb-4 leading-relaxed">
                                This is a production application currently serving real users.
                            </p>
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm text-black hover:opacity-90 transition-all"
                                style={{ background: project.accentColor }}
                            >
                                <FaExternalLinkAlt className="text-xs" />
                                Open {project.title}
                            </a>
                        </M.div>

                        <M.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.28 }}
                            className="glass-card rounded-2xl p-6"
                        >
                            <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4">Other Projects</h3>
                            <div className="space-y-3">
                                {others.map((op) => {
                                    const OtherIcon = iconComponents[op.iconName]
                                    return (
                                        <Link
                                            key={op.slug}
                                            to={`/projects/${op.slug}`}
                                            className={`flex items-center gap-3 p-3 rounded-xl border ${op.border} bg-gradient-to-br ${op.gradient} hover:-translate-y-0.5 transition-transform duration-200 group`}
                                        >
                                            <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                                                <OtherIcon className={`text-lg ${op.iconColor}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white/80 text-sm font-semibold group-hover:text-white transition-colors truncate">{op.title}</p>
                                                <p className={`text-xs ${op.iconColor} truncate`}>{op.role}</p>
                                            </div>
                                            <FaArrowLeft className="text-white/20 text-xs rotate-180 group-hover:text-white/60 flex-shrink-0" />
                                        </Link>
                                    )
                                })}
                            </div>
                        </M.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetail
