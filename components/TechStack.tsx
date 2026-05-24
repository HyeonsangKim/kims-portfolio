'use client'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
// 아이콘 import
import {
  SiNextdotjs, SiReact, SiTypescript, SiJavascript,
  SiNestjs, SiSpring, SiMongodb, SiPostgresql, SiMysql,
  SiNodedotjs, SiDocker, SiGit, SiPython, SiFastapi, SiGooglecloud, SiSupabase, SiRedis,
} from 'react-icons/si'
import { FaJava } from 'react-icons/fa'

type SkillCategory = 'Frontend' | 'Backend' | 'Database' | 'DevOps'

interface Skill {
  name: string
  icon: React.ReactNode
  color: string
}

// ✅ 1. 타입 에러 해결: "spring" 뒤에 as const를 붙여서 정확한 리터럴 타입임을 명시
const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.8 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100 } 
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  },
  exit: { opacity: 0 }
}

const skills: Record<SkillCategory, Skill[]> = {
  Frontend: [
    { name: "Next.js", icon: <SiNextdotjs />, color: "text-white" },
    { name: "React", icon: <SiReact />, color: "text-blue-400" },
    { name: "React Native", icon: <SiReact />, color: "text-violet-500" },
    { name: "TypeScript", icon: <SiTypescript />, color: "text-blue-500" },
    { name: "JavaScript", icon: <SiJavascript />, color: "text-yellow-400" },
  ],
  Backend: [
    { name: "NestJS", icon: <SiNestjs />, color: "text-red-600" },
    { name: "Java", icon: <FaJava />, color: "text-orange-400" },
    { name: "Spring Boot", icon: <SiSpring />, color: "text-green-500" },
    { name: "Node.js", icon: <SiNodedotjs />, color: "text-green-600" },
    { name: "Python", icon: <SiPython />, color: "text-yellow-300" },
    { name: "FastAPI", icon: <SiFastapi />, color: "text-teal-400" },
  ],
  Database: [
    { name: "MongoDB", icon: <SiMongodb />, color: "text-green-500" },
    { name: "PostgreSQL", icon: <SiPostgresql />, color: "text-blue-300" },
    { name: "MySQL", icon: <SiMysql />, color: "text-blue-500" },
    { name: "Supabase", icon: <SiSupabase />, color: "text-emerald-400" },
    { name: "Redis", icon: <SiRedis />, color: "text-red-500" },
  ],
  DevOps: [
    { name: "Docker", icon: <SiDocker />, color: "text-blue-500" },
    { name: "Git", icon: <SiGit />, color: "text-orange-600" },
    { name: "Cloud Run", icon: <SiGooglecloud />, color: "text-blue-400" },
  ]
}

export default function TechStack() {
    const [activeTab, setActiveTab] = useState<SkillCategory>('Frontend')
  
    return (
      <section className="py-32 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
          >
            Tech Universe
          </motion.h2>
          <p className="text-gray-400 text-lg">Hover (or Tap) over the stars to explore.</p>
        </div>
  
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {(Object.keys(skills) as SkillCategory[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
                activeTab === tab 
                  ? "bg-white/10 border-white/40 text-white shadow-[0_0_15px_rgba(255,255,255,0.3)]" 
                  : "bg-transparent border-white/5 text-gray-500 hover:text-gray-300 hover:border-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
  
        <div className="min-h-[400px]">
          <AnimatePresence mode='wait'>
            <motion.div 
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto"
            >
              {skills[activeTab].map((skill) => (
                <FloatingIcon key={skill.name} skill={skill} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    )
  }

  function FloatingIcon({ skill }: { skill: Skill }) {
    // 모바일 터치 상태
    const [isTouched, setIsTouched] = useState(false);

    const handleInteraction = () => {
        setIsTouched(!isTouched);
    };

    // 이전 버전은 각 아이콘이 Math.random() 기반 y 오프셋으로 floating
    // 했는데, 그 결과 "어떤 아이콘은 가운데, 어떤 아이콘은 위/아래로
    // 어긋난" 시각 정렬이 만들어졌다. 카드 안에서 아이콘이 정확히
    // 가운데 박혀 보이는 것이 통일감에 훨씬 중요하므로 floating은
    // 제거하고 hover/touch 시 미세 scale-up만 남긴다.
    return (
      <motion.div
        variants={itemVariants}
        // 클릭 시 모바일 터치 효과 토글
        onClick={handleInteraction}
        className="group relative flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 cursor-pointer"
      >
        <div
          className="w-full h-full flex flex-col items-center justify-center relative z-10"
        >
          {/* 아이콘: isTouched(모바일) 혹은 group-hover(PC) 상태일 때 활성화 */}
          <div 
            className={`
              text-5xl sm:text-6xl mb-1 transition-all duration-300 drop-shadow-lg
              ${(isTouched) ? 'scale-110 grayscale-0 opacity-100' : 'scale-100 grayscale opacity-50 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100'}
              ${(isTouched || 'group-hover') ? skill.color : ''} 
            `}
          >
             {skill.icon}
          </div>
          
          {/* 라벨 텍스트 - 항상 표시 */}
          <span className="text-xs font-medium text-gray-400 mt-1 transition-colors duration-300 group-hover:text-gray-200">
            {skill.name}
          </span>
        </div>

        {/* Glow 배경 효과 */}
        <div
            className={`
                absolute inset-0 bg-white/5 rounded-full blur-xl transition-opacity duration-500 pointer-events-none
                ${isTouched ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
            `}
        />
      </motion.div>
    )
  }