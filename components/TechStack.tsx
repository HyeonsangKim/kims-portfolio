'use client'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  SiNextdotjs, SiReact, SiTypescript, SiJavascript,
  SiNestjs, SiSpring, SiMongodb, SiPostgresql, SiMysql,
  SiNodedotjs, SiDocker, SiGit, SiPython, SiFastapi, SiGooglecloud, SiSupabase, SiRedis,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'

type Category = 'Frontend' | 'Backend' | 'Database' | 'DevOps'

interface Skill {
  name: string
  icon: React.ReactNode
  color: string
}

const skills: Record<Category, Skill[]> = {
  Frontend: [
    { name: 'Next.js', icon: <SiNextdotjs />, color: 'text-white' },
    { name: 'React', icon: <SiReact />, color: 'text-blue-400' },
    { name: 'React Native', icon: <SiReact />, color: 'text-violet-500' },
    { name: 'TypeScript', icon: <SiTypescript />, color: 'text-blue-500' },
    { name: 'JavaScript', icon: <SiJavascript />, color: 'text-yellow-400' },
  ],
  Backend: [
    { name: 'NestJS', icon: <SiNestjs />, color: 'text-red-600' },
    { name: 'Java', icon: <FaJava />, color: 'text-orange-400' },
    { name: 'Spring Boot', icon: <SiSpring />, color: 'text-green-500' },
    { name: 'Node.js', icon: <SiNodedotjs />, color: 'text-green-600' },
    { name: 'Python', icon: <SiPython />, color: 'text-yellow-300' },
    { name: 'FastAPI', icon: <SiFastapi />, color: 'text-teal-400' },
  ],
  Database: [
    { name: 'MongoDB', icon: <SiMongodb />, color: 'text-green-500' },
    { name: 'PostgreSQL', icon: <SiPostgresql />, color: 'text-blue-300' },
    { name: 'MySQL', icon: <SiMysql />, color: 'text-blue-500' },
    { name: 'Supabase', icon: <SiSupabase />, color: 'text-emerald-400' },
    { name: 'Redis', icon: <SiRedis />, color: 'text-red-500' },
  ],
  DevOps: [
    { name: 'Docker', icon: <SiDocker />, color: 'text-blue-500' },
    { name: 'Git', icon: <SiGit />, color: 'text-orange-600' },
    { name: 'Cloud Run', icon: <SiGooglecloud />, color: 'text-blue-400' },
  ],
}

export default function TechStack() {
  const [active, setActive] = useState<Category>('Frontend')

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Tech Stack</h2>

      <div className="flex flex-wrap gap-2 mb-8">
        {(Object.keys(skills) as Category[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              active === cat
                ? 'bg-white/[0.08] text-white border border-white/[0.12]'
                : 'text-gray-500 hover:text-gray-300 border border-transparent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4"
        >
          {skills[active].map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col items-center gap-2 py-4 rounded-xl border border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.02] transition-colors group"
            >
              <div className={`text-2xl ${skill.color} opacity-60 group-hover:opacity-100 transition-opacity`}>
                {skill.icon}
              </div>
              <span className="text-[11px] text-gray-500 group-hover:text-gray-300 transition-colors">
                {skill.name}
              </span>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
