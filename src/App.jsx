import { lazy, Suspense, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import SettingsPanel from './components/SettingsPanel.jsx'
import Home from './pages/Home.jsx'

const Contact = lazy(() => import('./pages/Contact.jsx'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail.jsx'))
const ExperienceDetail = lazy(() => import('./pages/ExperienceDetail.jsx'))
const EducationDetail = lazy(() => import('./pages/EducationDetail.jsx'))
const CertificationDetail = lazy(() => import('./pages/CertificationDetail.jsx'))

function PageLoader() {
  return (
    <div className="min-h-screen bg-[#080b14] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[var(--primary)] border-t-transparent animate-spin" />
    </div>
  )
}

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#080b14] text-white">
      <Navbar onOpenSettings={() => setSettingsOpen(true)} />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/experience/:slug" element={<ExperienceDetail />} />
          <Route path="/education/:slug" element={<EducationDetail />} />
          <Route path="/certifications/:slug" element={<CertificationDetail />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
      <Footer />
      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  )
}

export default App
