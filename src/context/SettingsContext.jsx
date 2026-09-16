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
    title: 'Full-Stack Developer',
    bio: 'I build web applications and custom software. Backend work with Django and databases, frontend with React or Vue. Currently at DevNest System solving real problems.',
    location: 'Lahore, Pakistan',
    email: 'uzairanjummrana@gmail.com',
    phone: '+92 310-7575202',
    github: 'https://github.com/Uzair-Rana',
    linkedin: 'https://www.linkedin.com/in/uzi-anjum',
    whatsapp: 'https://wa.me/923107575202',
    resumeUrl: '/Resume/Uzair Anjum(CV).pdf',
    photoUrl: '/images/profile.jpg',
    available: true,
    availableText: 'Open to work',
    openToWork: true,
    showStats: false,
    paletteIdx: 0,
}

export const DEFAULT_PROJECTS = [
    {
        id: 'search-atlas',
        slug: 'search-atlas',
        title: 'Search Atlas',
        role: 'Backend Developer',
        url: 'https://searchatlas.com/',
        iconName: 'brain',
        iconColor: 'text-violet-400',
        gradient: 'from-violet-500/20 to-purple-500/10',
        gradientStrong: 'from-violet-600/30 to-purple-600/20',
        border: 'border-violet-500/20',
        accentColor: '#a78bfa',
        tech: ['Django', 'GraphQL', 'PostgreSQL', 'LangGraph', 'REST API'],
        tagline: 'SEO automation platform that helps agencies scale their content strategy.',
        overview: 'Search Atlas is an SEO automation tool used by marketing agencies to manage keywords, content, and optimization workflows at scale. I worked on the backend infrastructure, building APIs and integrations to power the platform\'s core features.',
        bullets: [
            'Built and maintained Django backend services handling SEO data processing.',
            'Designed GraphQL APIs for flexible data querying across the platform.',
            'Integrated third-party APIs to automate SEO workflows and keyword research.',
            'Optimized database queries to handle large-scale data operations efficiently.',
            'Deployed and monitored production systems to ensure reliability.',
        ],
        highlights: [
            { label: 'Platform Type', value: 'SEO Automation' },
            { label: 'My Role', value: 'Backend Developer' },
            { label: 'Team', value: 'SystemsD' },
            { label: 'Status', value: 'Production' },
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
        tagline: 'Business communication platform that automates client messaging and AI voice interactions.',
        overview: 'AetherMuse.ai connects businesses with AI-powered communication tools. Clients can interact via voice, SMS, or chat, and admins get intelligent notifications and analytics. I built the backend to handle real-time messaging, integrate third-party services, and manage the data flow.',
        bullets: [
            'Built Django backend for handling client communication workflows and admin notifications.',
            'Integrated Twilio to send and receive SMS messages reliably at scale.',
            'Connected ElevenLabs API to enable natural-sounding AI voice interactions.',
            'Designed REST APIs that frontend and mobile apps consume.',
            'Set up database schemas and queries to efficiently track conversations and client data.',
            'Handled edge cases and failures—what happens when Twilio is down? When a message fails?',
        ],
        highlights: [
            { label: 'Platform Type', value: 'Communication Automation' },
            { label: 'My Role', value: 'Backend Developer' },
            { label: 'Team', value: 'SystemsD' },
            { label: 'Status', value: 'Production' },
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
        tech: ['Django', 'Vue.js', 'PostgreSQL', 'REST API', 'Document Processing'],
        tagline: 'Platform that automates recruiting tasks like candidate tracking and document handling.',
        overview: 'EngineHire helps recruiting teams manage candidates, track applications, and automate onboarding workflows. Instead of juggling spreadsheets and emails, recruiters can track candidates in one place, generate offer letters, and send automated onboarding documents. I built both the frontend and backend.',
        bullets: [
            'Built the full application—frontend UI for recruiters, backend APIs, and database design.',
            'Created Vue.js interfaces that make managing candidates intuitive and fast.',
            'Developed Django APIs to handle candidate data, documents, and workflow automation.',
            'Integrated document generation to automatically create offer letters and contracts.',
            'Set up PostgreSQL schemas to efficiently store and query hiring pipeline data.',
            'Worked through real recruiting workflows to understand what actually matters to users.',
        ],
        highlights: [
            { label: 'Platform Type', value: 'Recruitment Automation' },
            { label: 'My Role', value: 'Full-Stack Developer' },
            { label: 'Team', value: 'SystemsD' },
            { label: 'Status', value: 'Production' },
        ],
    },
]

export const DEFAULT_EXPERIENCES = [
    {
        id: 'devnest',
        slug: 'devnest',
        company: 'DevNest System',
        location: 'Lahore, Pakistan',
        role: 'Full-Stack Developer',
        period: 'September 2026 – Present',
        current: true,
        tagline: 'Building custom software solutions and web applications from scratch.',
        summary: [
            'Full-stack development across mobile and web platforms',
            'Custom software solutions for clients',
            'Database design and backend optimization',
        ],
        bullets: [
            'Develop custom software and web solutions tailored to client needs.',
            'Build full-stack applications from database design to deployment.',
            'Create responsive, user-focused interfaces and scalable backends.',
            'Work directly with clients to understand requirements and deliver on time.',
            'Own projects end-to-end, making technical decisions and handling deployment.',
        ],
        tech: ['React.js', 'Node.js', 'Django', 'PostgreSQL', 'MongoDB', 'React Native', 'Tailwind CSS'],
        highlights: [
            { label: 'Company', value: 'DevNest System' },
            { label: 'Location', value: 'Lahore, Pakistan' },
            { label: 'Duration', value: 'September 2026 – Present' },
            { label: 'Type', value: 'Full-Time' },
        ],
    },
    {
        id: 'systemsd',
        slug: 'systemsd',
        company: 'SystemsD',
        location: 'Johar Town, Lahore',
        role: 'Full-Stack Developer',
        period: 'January 2025 – August 2026',
        current: false,
        tagline: 'Built scalable backend systems and optimized performance for production apps.',
        summary: [
            'Database query optimization and Redis caching',
            'Email and notification workflow automation',
            'Junior developer mentoring',
        ],
        bullets: [
            'Debugged performance issues on high-traffic endpoints by analyzing database queries.',
            'Optimized N+1 query problems and added Redis caching, cutting load times significantly.',
            'Automated email and notification workflows, eliminating repetitive manual work for the team.',
            'Mentored junior developers on REST API design and cloud deployment practices.',
            'Used AI tools like Claude and Cursor to write and review code more effectively.',
        ],
        tech: ['Django', 'PostgreSQL', 'Vue.js', 'React.js', 'Redis', 'REST API', 'Git'],
        highlights: [
            { label: 'Company', value: 'SystemsD' },
            { label: 'Location', value: 'Johar Town, Lahore' },
            { label: 'Duration', value: 'January 2025 – August 2026' },
            { label: 'Type', value: 'Full-Time' },
        ],
    },
]

export const DEFAULT_CERTIFICATIONS = [
    {
        id: 'cca',
        slug: 'cca',
        title: 'Certificate in Computer Applications (CCA)',
        issuer: 'Professional Certification Program',
        tagline: 'Foundational certification in computer applications and office tools.',
        iconName: 'certificate',
        iconColor: 'text-cyan-400',
        gradient: 'from-cyan-500/20 to-blue-500/10',
        border: 'border-cyan-500/20',
        accentColor: '#22d3ee',
        highlights: [
            { label: 'Certification', value: 'CCA' },
            { label: 'Type', value: 'Professional Certificate' },
            { label: 'Status', value: 'Completed' },
        ],
        details: [
            'Completed certification covering office productivity tools, document management, and computing fundamentals.',
            'Practical training in spreadsheets, presentations, and digital collaboration tools.',
            'Foundation for professional computer skills in business environments.',
        ],
        skills: ['Microsoft Office', 'Google Suite', 'Document Management', 'Spreadsheets', 'Presentations'],
    },
    {
        id: 'intl-conference',
        slug: 'intl-conference',
        title: 'International Conference on Science and Technology',
        issuer: 'Academic Conference',
        tagline: 'Participated in international academic conference on emerging tech and research.',
        iconName: 'flask',
        iconColor: 'text-violet-400',
        gradient: 'from-violet-500/20 to-purple-500/10',
        border: 'border-violet-500/20',
        accentColor: '#a78bfa',
        highlights: [
            { label: 'Event', value: 'International Conference' },
            { label: 'Focus', value: 'Science & Technology' },
            { label: 'Status', value: 'Attended' },
        ],
        details: [
            'Attended international conference connecting academic researchers with industry professionals.',
            'Explored cutting-edge developments at the intersection of science, technology, and practical applications.',
            'Networked with scholars and practitioners working on emerging technical challenges.',
        ],
        skills: ['Research', 'Networking', 'Technical Knowledge', 'Industry Trends'],
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
        // Clear old cached experience data to load fresh defaults
        if (key === 'portfolio_data_experiences') {
            localStorage.removeItem(key)
            return fallback
        }
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
