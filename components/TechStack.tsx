'use client'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
// 아이콘 import
import { 
  SiNextdotjs, SiReact, SiTypescript, SiJavascript, SiHtml5, SiCss3, 
  SiNestjs, SiSpring, SiMongodb, SiPostgresql, SiMysql,
  SiNodedotjs, SiDocker, SiGit
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
    // { name: "HTML5", icon: <SiHtml5 />, color: "text-orange-500" },
    // { name: "CSS3", icon: <SiCss3 />, color: "text-blue-600" },
  ],
  Backend: [
    { name: "NestJS", icon: <SiNestjs />, color: "text-red-600" },
    { name: "Java", icon: <FaJava />, color: "text-orange-400" },
    { name: "Spring Boot", icon: <SiSpring />, color: "text-green-500" },
    { name: "Node.js", icon: <SiNodedotjs />, color: "text-green-600" }
  ],
  Database: [
    { name: "MongoDB", icon: <SiMongodb />, color: "text-green-500" },
    { name: "PostgreSQL", icon: <SiPostgresql />, color: "text-blue-300" },
    { name: "MySQL", icon: <SiMysql />, color: "text-blue-500" },
  ],
  DevOps: [
    { name: "Docker", icon: <SiDocker />, color: "text-blue-500" },
    { name: "Git", icon: <SiGit />, color: "text-orange-600" }
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
    // 초기값을 0으로 둡니다.
    const [randomValues, setRandomValues] = useState({ y: 0, duration: 0, delay: 0 });
    const [isMounted, setIsMounted] = useState(false);
    
    // 모바일 터치 상태
    const [isTouched, setIsTouched] = useState(false);

    useEffect(() => {
        // ✅ 2. Linter Error 해결: setTimeout(..., 0)으로 감싸기
        // 이렇게 하면 렌더링 사이클을 방해하지 않고 비동기(Asynchronous)로 상태를 업데이트하므로
        // 'synchronous state update' 에러가 사라집니다.
        const timer = setTimeout(() => {
            setIsMounted(true);
            setRandomValues({
                y: Math.random() * 10 - 5,
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2
            });
        }, 0);

        return () => clearTimeout(timer);
    }, []); 

    const handleInteraction = () => {
        setIsTouched(!isTouched);
    };

    return (
      <motion.div
        variants={itemVariants}
        // 클릭 시 모바일 터치 효과 토글
        onClick={handleInteraction}
        className="group relative flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 cursor-pointer"
      >
        <motion.div
          // isMounted가 true일 때만 랜덤 애니메이션 실행
          animate={isMounted ? { y: [0, randomValues.y, 0] } : {}}
          transition={{ 
            duration: randomValues.duration, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: randomValues.delay 
          }}
          className="w-full h-full flex flex-col items-center justify-center relative z-10"
        >
          {/* 아이콘: isTouched(모바일) 혹은 group-hover(PC) 상태일 때 활성화 */}
          <div 
            className={`
              text-5xl sm:text-6xl mb-3 transition-all duration-300 drop-shadow-lg
              ${(isTouched) ? 'scale-110 grayscale-0 opacity-100' : 'scale-100 grayscale opacity-50 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100'}
              ${(isTouched || 'group-hover') ? skill.color : ''} 
            `}
          >
             {skill.icon}
          </div>
          
          {/* 라벨 텍스트 */}
          <span 
            className={`
              absolute -bottom-2 text-xs font-medium text-gray-300 bg-black/50 px-2 py-1 rounded backdrop-blur-sm transition-all duration-300
              ${isTouched ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}
            `}
          >
            {skill.name}
          </span>
        </motion.div>
        
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