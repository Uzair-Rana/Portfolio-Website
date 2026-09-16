import { useParams, Link, useNavigate } from 'react-router-dom'
import { m as M } from 'framer-motion'
import { FaArrowLeft, FaCertificate, FaFlask, FaCheckCircle, FaStar, FaMedal } from 'react-icons/fa'
import { useSettings } from '../context/SettingsContext.jsx'

const iconComponents = {
    certificate: FaCertificate,
    flask: FaFlask,
    star: FaStar,
    medal: FaMedal,
    award: FaMedal,
}

function CertificationDetail() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const { data } = useSettings()
    const certifications = data.certifications

    const cert = certifications.find((c) => c.slug === slug)

    if (!cert) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6 text-center px-4">
                <p className="text-6xl font-extrabold text-gray-200">404</p>
                <p className="text-gray-600 text-lg">Certification not found.</p>
                <Link to="/#certifications" className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-all">
                    Back
                </Link>
            </div>
        )
    }

    const Icon = iconComponents[cert.iconName] ?? FaCertificate
    const others = certifications.filter((c) => c.slug !== slug)

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">

            <div className="relative z-10 container-padding mx-auto max-w-5xl pt-28 pb-24">

                <button onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm transition-colors mb-10 group">
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
                    Back
                </button>

                {/* Hero */}
                <M.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    className={`rounded-lg border border-gray-300 bg-gray-50 p-8 sm:p-12 mb-10`}>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                        <div className="w-20 h-20 rounded-lg bg-gray-100 border border-gray-300 flex items-center justify-center flex-shrink-0">
                            <Icon className={`text-4xl ${cert.iconColor}`} />
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">{cert.title}</h1>
                            </div>
                            <p className={`text-base font-semibold ${cert.iconColor} mb-3`}>{cert.issuer}</p>
                            <p className="text-gray-700 text-base leading-relaxed max-w-2xl">{cert.tagline}</p>
                        </div>
                    </div>
                </M.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left */}
                    <div className="lg:col-span-2 space-y-6">

                        {cert.details?.length > 0 && (
                            <M.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                                className="glass-card-vibrant rounded-lg p-7 border border-gray-300">
                                <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                                    <span className="w-1 h-5 rounded-full inline-block bg-blue-600" />
                                    Details
                                </h2>
                                <ul className="space-y-3.5">
                                    {cert.details.map((detail, idx) => (
                                        <li key={idx} className="flex gap-3">
                                            <FaCheckCircle className="text-blue-600 text-lg flex-shrink-0 mt-0.5" />
                                            <p className="text-gray-700 text-sm leading-relaxed">{detail}</p>
                                        </li>
                                    ))}
                                </ul>
                            </M.div>
                        )}

                        {cert.skills?.length > 0 && (
                            <M.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
                                className="glass-card-vibrant rounded-lg p-7 border border-gray-300">
                                <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                                    <span className="w-1 h-5 rounded-full inline-block bg-blue-600" />
                                    Skills Covered
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {cert.skills.map((skill, idx) => (
                                        <span key={idx}
                                            className="inline-flex items-center px-3 py-2 rounded-lg bg-gray-100 text-gray-800 text-sm font-medium border border-gray-300">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </M.div>
                        )}
                    </div>

                    {/* Right */}
                    {cert.highlights?.length > 0 && (
                        <M.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                            <div className="glass-card-vibrant rounded-lg p-7 border border-gray-300 space-y-5 h-fit sticky top-32">
                                {cert.highlights.map((h, idx) => (
                                    <div key={idx}>
                                        <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">{h.label}</p>
                                        <p className="text-gray-900 font-bold text-base">{h.value}</p>
                                    </div>
                                ))}
                            </div>
                        </M.div>
                    )}
                </div>
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{cert.title}</h1>
                                <span className="px-3 py-1 rounded-full text-xs font-bold border"
                                    style={{ color: cert.accentColor, borderColor: `${cert.accentColor}40`, background: `${cert.accentColor}15` }}>
                                    Completed
                                </span>
                            </div>
                            <p className={`text-base font-semibold ${cert.iconColor}`}>{cert.issuer}</p>
                            {cert.tagline && (
                                <p className="text-white/60 text-base leading-relaxed mt-3 max-w-2xl">{cert.tagline}</p>
                            )}
                        </div>
                    </div>
                </M.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left */}
                    <div className="lg:col-span-2 space-y-6">

                        {cert.details?.length > 0 && (
                            <M.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                                className="glass-card rounded-2xl p-7">
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
                        )}

                        {cert.skills?.length > 0 && (
                            <M.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }}
                                className="glass-card rounded-2xl p-7">
                                <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                                    <span className="w-1 h-5 rounded-full inline-block" style={{ background: cert.accentColor }} />
                                    Skills Covered
                                </h2>
                                <div className="flex flex-wrap gap-2.5">
                                    {cert.skills.map((s) => (
                                        <span key={s} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-medium">{s}</span>
                                    ))}
                                </div>
                            </M.div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-5">
                        {cert.highlights?.length > 0 && (
                            <M.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}
                                className="glass-card rounded-2xl p-6">
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
                        )}

                        {others.length > 0 && (
                            <M.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                                className="glass-card rounded-2xl p-6">
                                <h3 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4">Other Certifications</h3>
                                <div className="space-y-3">
                                    {others.map((oc) => {
                                        const OtherIcon = iconComponents[oc.iconName] ?? FaCertificate
                                        return (
                                            <Link key={oc.slug} to={`/certifications/${oc.slug}`}
                                                className={`flex items-center gap-3 p-3 rounded-xl border ${oc.border} bg-gradient-to-br ${oc.gradient} hover:-translate-y-0.5 transition-transform duration-200 group`}>
                                                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                                                    <OtherIcon className={`text-lg ${oc.iconColor}`} />
                                                </div>
                                                <p className="text-white/80 text-sm font-semibold group-hover:text-white transition-colors flex-1 leading-snug">{oc.title}</p>
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
