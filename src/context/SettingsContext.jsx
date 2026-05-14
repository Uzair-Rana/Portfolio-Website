import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'portfolio_settings'
const DATA_KEY = 'portfolio_data'
const PASS_KEY = 'portfolio_pass_hash'

export const PALETTES = [
    { name: 'Sky Blue', primary: '#38bdf8', accent: '#a78bfa', secondary: '#f472b6' },
    { name: 'Emerald', primary: '#34d399', accent: '#60a5fa', secondary: '#f472b6' },
    { name: 'Violet', primary: '#a78bfa', accent: '#f472b6', secondary: '#38bdf8' },
    { name: 'Amber', primary: '#fbbf24', accent: '#f87171', secondary: '#a78bfa' },
    { name: 'Rose', primary: '#fb7185', accent: '#f59e0b', secondary: '#a78bfa' },
    { name: 'Teal', primary: '#2dd4bf', accent: '#818cf8', secondary: '#f472b6' },
]

export const DEFAULT_SETTINGS = {
    firstName: 'M. Uzair',
    lastName: 'Anjum',
    title: 'Full Stack Engineer',
    bio: 'Building scalable, production-grade web applications with Django & PostgreSQL on the backend, and Vue.js / React.js on the frontend. 1+ year of hands-on industry experience.',
    location: 'Lahore, Pakistan',
    email: 'uzairanjummrana@gmail.com',
    phone: '+92 310-7575202',
    github: 'https://github.com/Uzair-Rana',
    photoUrl: '/images/profile.jpg',
    available: true,
    availableText: 'Available for opportunities',
    openToWork: true,
    showStats: true,
    paletteIdx: 0,
}

export const DEFAULT_PROJECTS = [
    {
        id: 'search-atlas',
        slug: 'search-atlas',
        title: 'Search Atlas',
        role: 'Django Developer',
        url: 'https://searchatlas.com/',
        iconName: 'brain',
        iconColor: 'text-violet-400',
        gradient: 'from-violet-500/20 to-purple-500/10',
        gradientStrong: 'from-violet-600/30 to-purple-600/20',
        border: 'border-violet-500/20',
        accentColor: '#a78bfa',
        tech: ['Django', 'GraphQL', 'LangGraph', 'MCP', 'CloudSkills', 'PostgreSQL'],
        tagline: 'AI-powered SEO automation platform for agencies and enterprise brands.',
        overview: 'Search Atlas is a production-grade AI-powered SEO automation and optimization platform built for digital marketing agencies and enterprise brands.',
        bullets: [
            'Contributed to the development of an AI-powered SEO automation platform.',
            'Built and maintained scalable backend services using Django and PostgreSQL.',
            'Implemented GraphQL APIs for flexible and efficient data communication.',
            'Integrated LangGraph and automation workflows to streamline SEO operations.',
            'Enhanced platform performance, maintainability, and production scalability.',
        ],
        highlights: [
            { label: 'Platform Type', value: 'AI-Powered SEO Automation' },
            { label: 'My Role', value: 'Django Developer' },
            { label: 'Team', value: 'SystemsD, Lahore' },
            { label: 'Status', value: 'Live in Production' },
        ],
    },
    {
        id: 'aethermuse',
        slug: 'aethermuse',
        title: 'AetherMuse.ai',
        role: 'Backend Developer',
        url: 'https://aethermuse.ai/',
        iconName: 'microphone',
        iconColor: 'text-pink-400',
        gradient: 'from-pink-500/20 to-rose-500/10',
        gradientStrong: 'from-pink-600/30 to-rose-600/20',
        border: 'border-pink-500/20',
        accentColor: '#f472b6',
        tech: ['Django', 'Twilio', 'ElevenLabs', 'PostgreSQL', 'REST API'],
        tagline: 'AI-powered business communication platform with real-time voice integration.',
        overview: 'AetherMuse.ai is an AI-powered business assistant platform focused on real-time client communication and AI voice integration.',
        bullets: [
            'Developed backend systems for an AI-powered business communication platform.',
            'Built real-time client communication workflows and admin notification systems.',
            'Integrated Twilio for SMS and communication services.',
            'Integrated ElevenLabs for AI voice capabilities.',
            'Designed secure, scalable APIs to support production-grade business operations.',
        ],
        highlights: [
            { label: 'Platform Type', value: 'AI Business Communication' },
            { label: 'My Role', value: 'Backend Developer' },
            { label: 'Team', value: 'SystemsD, Lahore' },
            { label: 'Status', value: 'Live in Production' },
        ],
    },
    {
        id: 'enginehire',
        slug: 'enginehire',
        title: 'EngineHire',
        role: 'Full-Stack Developer',
        url: 'https://enginehire.io',
        iconName: 'usertie',
        iconColor: 'text-cyan-400',
        gradient: 'from-cyan-500/20 to-blue-500/10',
        gradientStrong: 'from-cyan-600/30 to-blue-600/20',
        border: 'border-cyan-500/20',
        accentColor: '#22d3ee',
        tech: ['Django', 'Vue.js', 'PostgreSQL', 'REST API', 'Automation'],
        tagline: 'Recruitment and onboarding automation platform for modern hiring teams.',
        overview: 'EngineHire is a full-stack recruitment and onboarding automation platform designed to streamline the entire hiring lifecycle.',
        bullets: [
            'Developed a recruitment and onboarding automation platform.',
            'Built full-stack features covering candidate management and workflow automation.',
            'Designed responsive frontend interfaces using Vue.js.',
            'Developed scalable backend systems with Django and PostgreSQL.',
            'Integrated business process automation to improve operational efficiency.',
        ],
        highlights: [
            { label: 'Platform Type', value: 'Recruitment Automation' },
            { label: 'My Role', value: 'Full-Stack Developer' },
            { label: 'Team', value: 'SystemsD, Lahore' },
            { label: 'Status', value: 'Live in Production' },
        ],
    },
]

export const DEFAULT_EXPERIENCES = [
    {
        id: 'systemsd',
        slug: 'systemsd',
        company: 'SystemsD',
        location: 'Johar Town, Lahore',
        role: 'Full-Stack Developer',
        period: '2025 – Present',
        current: true,
        tagline: 'Building scalable production web applications in a collaborative team environment.',
        summary: [
            'Backend development with Django & PostgreSQL',
            'API integration & automation workflows',
            'Cross-functional team collaboration',
        ],
        bullets: [
            'Develop and maintain scalable web applications in a collaborative team environment.',
            'Build and optimize backend systems using Django and PostgreSQL.',
            'Collaborate with cross-functional teams to deliver product features on schedule.',
            'Integrate APIs, third-party services, and automation workflows.',
            'Ensure clean, maintainable code and optimize production system performance.',
        ],
        tech: ['Django', 'PostgreSQL', 'Vue.js', 'React.js', 'GraphQL', 'REST API', 'Git'],
        highlights: [
            { label: 'Company', value: 'SystemsD' },
            { label: 'Location', value: 'Johar Town, Lahore' },
            { label: 'Duration', value: '2025 – Present' },
            { label: 'Type', value: 'Full-Time' },
        ],
    },
]

export const DEFAULT_CERTIFICATIONS = [
    {
        id: 'cca',
        slug: 'cca',
        title: 'Certificate in Computer Applications (CCA)',
        issuer: 'Professional Certification Body',
        tagline: 'Core computer applications and productivity tools certification.',
        iconName: 'certificate',
        iconColor: 'text-cyan-400',
        gradient: 'from-cyan-500/20 to-blue-500/10',
        border: 'border-cyan-500/20',
        accentColor: '#22d3ee',
        highlights: [
            { label: 'Certificate', value: 'CCA' },
            { label: 'Type', value: 'Professional Certification' },
            { label: 'Status', value: 'Completed' },
        ],
        details: [
            'Completed a comprehensive certification covering core computer applications.',
            'Gained proficiency in office productivity suites and document management.',
        ],
        skills: ['Microsoft Office Suite', 'Document Management', 'Spreadsheet Analysis', 'Presentation Design'],
    },
    {
        id: 'intl-conference',
        slug: 'intl-conference',
        title: 'International Conference on Science and Technology',
        issuer: 'International Academic Body',
        tagline: 'Participant in an international academic conference bridging science and technology.',
        iconName: 'flask',
        iconColor: 'text-violet-400',
        gradient: 'from-violet-500/20 to-purple-500/10',
        border: 'border-violet-500/20',
        accentColor: '#a78bfa',
        highlights: [
            { label: 'Event', value: 'International Conference' },
            { label: 'Type', value: 'Academic Participation' },
            { label: 'Status', value: 'Completed' },
        ],
        details: [
            'Participated in an international academic conference on science and technology.',
            'Engaged with researchers and industry professionals from diverse backgrounds.',
        ],
        skills: ['Research Exposure', 'Academic Networking', 'Technical Discourse'],
    },
]

/* ── Simple hash (not cryptographic — just obfuscation for localStorage) ── */
function simpleHash(str) {
    let h = 0
    for (let i = 0; i < str.length; i++) {
        h = (Math.imul(31, h) + str.charCodeAt(i)) | 0
    }
    return h.toString(36)
}

function load(key, fallback) {
    try {
        const raw = localStorage.getItem(key)
        return raw ? JSON.parse(raw) : fallback
    } catch { return fallback }
}

function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch { }
}

const SettingsContext = createContext(null)

export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState(() => ({
        ...DEFAULT_SETTINGS,
        ...load(STORAGE_KEY, {}),
    }))

    const [data, setData] = useState(() => ({
        projects: load(DATA_KEY + '_projects', DEFAULT_PROJECTS),
        experiences: load(DATA_KEY + '_experiences', DEFAULT_EXPERIENCES),
        certifications: load(DATA_KEY + '_certifications', DEFAULT_CERTIFICATIONS),
    }))

    /* Apply theme vars */
    useEffect(() => {
        const p = PALETTES[settings.paletteIdx] ?? PALETTES[0]
        document.documentElement.style.setProperty('--primary', p.primary)
        document.documentElement.style.setProperty('--accent', p.accent)
        document.documentElement.style.setProperty('--secondary', p.secondary)
    }, [settings.paletteIdx])

    /* Persist settings */
    useEffect(() => { save(STORAGE_KEY, settings) }, [settings])

    /* Persist data */
    useEffect(() => { save(DATA_KEY + '_projects', data.projects) }, [data.projects])
    useEffect(() => { save(DATA_KEY + '_experiences', data.experiences) }, [data.experiences])
    useEffect(() => { save(DATA_KEY + '_certifications', data.certifications) }, [data.certifications])

    const update = useCallback((patch) => setSettings((p) => ({ ...p, ...patch })), [])
    const resetAll = useCallback(() => {
        // NOTE: Password is intentionally NOT cleared on reset.
        // Only the Security tab can change/remove the password after verifying the current one.
        setSettings(DEFAULT_SETTINGS)
        setData({ projects: DEFAULT_PROJECTS, experiences: DEFAULT_EXPERIENCES, certifications: DEFAULT_CERTIFICATIONS })
    }, [])

    /* ── Data CRUD ── */
    const addProject = useCallback((p) => setData((d) => ({ ...d, projects: [...d.projects, p] })), [])
    const updateProject = useCallback((id, patch) => setData((d) => ({ ...d, projects: d.projects.map((p) => p.id === id ? { ...p, ...patch } : p) })), [])
    const deleteProject = useCallback((id) => setData((d) => ({ ...d, projects: d.projects.filter((p) => p.id !== id) })), [])

    const addExperience = useCallback((e) => setData((d) => ({ ...d, experiences: [...d.experiences, e] })), [])
    const updateExperience = useCallback((id, patch) => setData((d) => ({ ...d, experiences: d.experiences.map((e) => e.id === id ? { ...e, ...patch } : e) })), [])
    const deleteExperience = useCallback((id) => setData((d) => ({ ...d, experiences: d.experiences.filter((e) => e.id !== id) })), [])

    const addCertification = useCallback((c) => setData((d) => ({ ...d, certifications: [...d.certifications, c] })), [])
    const updateCertification = useCallback((id, patch) => setData((d) => ({ ...d, certifications: d.certifications.map((c) => c.id === id ? { ...c, ...patch } : c) })), [])
    const deleteCertification = useCallback((id) => setData((d) => ({ ...d, certifications: d.certifications.filter((c) => c.id !== id) })), [])

    /* ── Password ── */
    // hasPassword: returns true if a password hash exists in localStorage
    const hasPassword = () => !!localStorage.getItem(PASS_KEY)
    // checkPassword: returns true only if the provided password matches the stored hash
    const checkPassword = (pw) => !!pw && simpleHash(pw) === localStorage.getItem(PASS_KEY)
    // setPassword: stores a new password hash — only callable after verifying current password in TabSecurity
    const setPassword = (pw) => { if (pw) localStorage.setItem(PASS_KEY, simpleHash(pw)) }
    // removePassword: removes password protection — only callable from TabSecurity after verifying current password
    const removePassword = () => localStorage.removeItem(PASS_KEY)

    return (
        <SettingsContext.Provider value={{
            settings, update, resetAll, PALETTES,
            data,
            addProject, updateProject, deleteProject,
            addExperience, updateExperience, deleteExperience,
            addCertification, updateCertification, deleteCertification,
            hasPassword, checkPassword, setPassword, removePassword,
        }}>
            {children}
        </SettingsContext.Provider>
    )
}

export function useSettings() {
    const ctx = useContext(SettingsContext)
    if (!ctx) throw new Error('useSettings must be used inside SettingsProvider')
    return ctx
}
