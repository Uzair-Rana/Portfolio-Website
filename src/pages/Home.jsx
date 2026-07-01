import Hero from '../sections/Hero.jsx'
import About from '../sections/About.jsx'
import Skills from '../sections/Skills.jsx'
import Experience from '../sections/Experience.jsx'
import Projects from '../sections/Projects.jsx'
import Education from '../sections/Education.jsx'
import Certifications from '../sections/Certifications.jsx'
import Feedback from '../sections/Feedback.jsx'
import SectionDivider from '../components/SectionDivider.jsx'

function Home() {
  return (
    <main className="bg-[#080b14]">
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Education />
      <SectionDivider />
      <Certifications />
      <SectionDivider />
      <Feedback />
    </main>
  )
}

export default Home
