import { m as M } from 'framer-motion'
import { FaReact, FaPython, FaGithub, FaNodeJs, FaCogs, FaCode, FaNetworkWired } from 'react-icons/fa'
import { SiTailwindcss, SiPostgresql, SiReactrouter, SiPycharm, SiWebstorm, SiPostman, SiSlack, SiStackoverflow, SiHtml5, SiCss3, SiJavascript, SiTypescript, SiRedux, SiDjango } from 'react-icons/si'

const iconMap = {
  React: FaReact,
  JSX: FaReact,
  'Tailwind CSS': SiTailwindcss,
  'React Router DOM': SiReactrouter,
  Axios: FaCode,
  Python: FaPython,
  Django: SiDjango,
  'Django REST Framework': SiDjango,
  Webhooks: FaNetworkWired,
  Authentication: FaCode,
  PostgreSQL: SiPostgresql,
  DBeaver: FaReact,
  'Git & GitHub': FaGithub,
  'Node.js': FaNodeJs,
  'VS Code': FaReact,
  PyCharm: SiPycharm,
  WebStorm: SiWebstorm,
  HTML5: SiHtml5,
  CSS3: SiCss3,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  'HTTP / REST APIs': FaNetworkWired,
  Langfuse: FaCogs,
  Postman: SiPostman,
  Slack: SiSlack,
  'Stack Overflow': SiStackoverflow,
  DiffChecker: FaCode,
}

function SkillCard({ title, items }) {
  return (
    <M.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }} className="rounded-xl border border-white/10 bg-white/5 p-5">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map((it) => {
          const Icon = iconMap[it]
          return (
            <M.div key={it} whileHover={{ scale: 1.05, rotateY: 6 }} className="group flex items-center gap-2 rounded-md bg-neutral-900/60 py-2 px-3 hover:bg-neutral-800">
              {Icon ? <Icon className="text-[var(--primary)]" /> : <div className="h-2 w-2 rounded-full bg-[var(--primary)]" />}
              <span className="text-base">{it}</span>
            </M.div>
          )
        })}
      </div>
    </M.div>
  )
}

export default SkillCard
