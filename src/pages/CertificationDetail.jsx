import { useParams, Link, useNavigate } from 'react-router-dom'
import { m as M } from 'framer-motion'
import { FaArrowLeft, FaCertificate, FaFlask, FaCheckCircle } from 'react-icons/fa'
import { certifications } from '../data/certifications.js'

const iconComponents = {
    certificate: FaCertificate,
    flask: FaFlask,
}

function CertificationDetail() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const cert = certifications.find((c) => c.slug === slug)

    if (!cert) {
        return (
            <div className="min-h-screen bg-[#080b14] flex flex-col items-center justify-center gap-6 text-center px-4">
                <p className="text-6xl font-extrabold text-white/10">404</p>
                <p className="text-white/60 text-lg">Certification not found.</p>
                <Link to="/#certifications" className="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-black font-bold text-sm">
                    Back
                </Link>
            </div>
        )
    }

    const Icon = iconComponents[cert.iconName]
    const others = certifications.filter((c) => c.slug !== slug)

    return (
        <div className="min-h-screen bg-[#080b14] relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <div className="absolute -top-60 -right-60 w-[600px] h-[600px] rounded-full blur-[120px] opacity-[0.05]"
                    style={{ background: cert.accentColor }} />
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
                    className={`rounded-3xl border ${cert.border} bg-gradient-to-br ${cert.gradient} p-8 sm:p-12 mb-10`}
                >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                            <Icon className={`text-4xl ${cert.iconColor}`} />
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{cert.title}</h1>
                                <span
                                    className="px-3 py-1 rounded-full text-xs font-bold border"
                                    style={{ color: cert.accentColor, borderColor: `${cert.accentColor}40`, background: `${cert.accentColor}15` }}
                                >
                                    Completed
                                </span>
                            </div>
                            <p className={`text-base font-semibold ${cert.iconColor}`}>{cert.issuer}</p>
                            <p className="text-white/60 text-base leading-relaxed mt-3 max-w-2xl">{cert.tagline}</p>
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
                                <span className="w-1 h-5 rounded-full inline-block" style={{ background: cert.accentColor }} />
                                Overview
                            </h2>
                            <div className="space-y-3">
                                {cert.details.map((d, i) => (
                                    <div key={i} className="flex items-start gap-3 text-white/65 text-sm leading-relaxed">
                                        <FaCheckCircle className="mt-0.5 flex-shrink-0" style={{ color: cert.accentColor }} />
                                        {d}
                                    </div>
                                ))}
                            </div>
                        </M.div>

                        <M.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.18 }}
                            className="glass-card rounded-2xl p-7"
                        >
                            <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                                <span className="w-1 h-5 rounded-full inline-block" style={{ background: cert.accentColor }} />
                                Skills Covered
                            </h2>
                            <div className="flex flex-wrap gap-2.5">
                                {cert.skills.map((s) => (
                                    <span key={s} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-medium">
                                        {s}
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
                                {cert.highlights.map(({ label, value }) => (
                                    <div key={label}>
                                        <span className="text-xs text-white/35 uppercase tracking-wider block mb-0.5">{label}</span>
                                        <span className="text-white/80 text-sm font-medium">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </M.div>

                        {others.length > 0 && (
                            <M.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="glass-card rounded-2xl p-6"
                            >
                                <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4">Other Certifications</h3>
                                <div className="space-y-3">
                                    {others.map((oc) => {
                                        const OtherIcon = iconComponents[oc.iconName]
                                        return (
                                            <Link
                                                key={oc.slug}
                                                to={`/certifications/${oc.slug}`}
                                                className={`flex items-center gap-3 p-3 rounded-xl border ${oc.border} bg-gradient-to-br ${oc.gradient} hover:-translate-y-0.5 transition-transform duration-200 group`}
                                            >
                                                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                                                    <OtherIcon className={`text-lg ${oc.iconColor}`} />
                                                </div>
                                                <p className="text-white/80 text-sm font-semibold group-hover:text-white transition-colors flex-1 leading-snug">
                                                    {oc.title}
                                                </p>
                                                <FaArrowLeft className="text-white/20 text-xs rotate-180 group-hover:text-white/60 flex-shrink-0" />
                                            </Link>
                                        )
                                    })}
                                </div>
                            </M.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CertificationDetail
