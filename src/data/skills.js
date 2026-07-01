export const skillGroups = [
  {
    category: 'Frontend',
    color: 'from-cyan-500/20 to-blue-500/10',
    border: 'border-cyan-500/20',
    accent: 'text-cyan-400',
    skills: [
      { name: 'Vue.js', level: 85 },
      { name: 'React.js', level: 80 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'JavaScript (ES6+)', level: 82 },
    ],
  },
  {
    category: 'Backend',
    color: 'from-emerald-500/20 to-green-500/10',
    border: 'border-emerald-500/20',
    accent: 'text-emerald-400',
    skills: [
      { name: 'Python', level: 88 },
      { name: 'Django', level: 87 },
      { name: 'REST API Development', level: 85 },
      { name: 'GraphQL', level: 70 },
      { name: 'Webhooks', level: 80 },
      { name: 'WebSockets', level: 75 },
      { name: 'ElevenLabs', level: 78 },
      { name: 'Twilio', level: 80 },
    ],
  },
  {
    category: 'Database & AI',
    color: 'from-blue-500/20 to-indigo-500/10',
    border: 'border-blue-500/20',
    accent: 'text-blue-400',
    skills: [
      { name: 'PostgreSQL', level: 83 },
      { name: 'DBeaver', level: 75 },
      { name: 'LangGraph', level: 72 },
      { name: 'MCP', level: 68 },
    ],
  },
  {
    category: 'Tools & Technologies',
    color: 'from-violet-500/20 to-purple-500/10',
    border: 'border-violet-500/20',
    accent: 'text-violet-400',
    skills: [
      { name: 'Git & GitHub', level: 88 },
      { name: 'VS Code', level: 92 },
      { name: 'Postman', level: 82 },
      { name: 'CloudSkills', level: 70 },
    ],
  },
]

// Legacy export kept for backward compat
export const skills = {
  frontend: ['Vue.js', 'React.js', 'Tailwind CSS', 'JavaScript (ES6+)'],
  backend: ['Python', 'Django', 'REST API Development', 'GraphQL', 'Webhooks', 'WebSockets', 'ElevenLabs', 'Twilio'],
  devtools: ['PostgreSQL', 'DBeaver', 'Git & GitHub', 'VS Code'],
  observability: ['Postman', 'HTTP / REST APIs'],
  collaboration: ['Slack', 'GitHub'],
}
