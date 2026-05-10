'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FiHome, FiCpu, FiBriefcase, FiAward, FiLayers, FiMail } from 'react-icons/fi'

const links = [
  { id: 'home', icon: <FiHome />, label: 'Home' },
  { id: 'skills', icon: <FiCpu />, label: 'Skills' },
  { id: 'career', icon: <FiBriefcase />, label: 'Career' },
  { id: 'awards', icon: <FiAward />, label: 'Awards' },
  { id: 'projects', icon: <FiLayers />, label: 'Projects' },
  { id: 'contact', icon: <FiMail />, label: 'Contact' },
]

export default function FloatingDock() {
  const [activeId, setActiveId] = useState('home')

  // ✅ Scroll Spy (그대로 유지)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-45% 0px -45% 0px', 
      threshold: 0, 
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }, observerOptions)

    links.forEach((link) => {
      const element = document.getElementById(link.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div 
      className="fixed right-6 top-1/2 -translate-y-1/2 z-[999] flex flex-col gap-5 items-center pointer-events-none"
    >
      {links.map((link) => (
        <DockIcon 
          key={link.id} 
          isActive={activeId === link.id} 
          {...link} 
        />
      ))}
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function DockIcon({ id, icon, label, isActive }: { id: string, icon: any, label: string, isActive: boolean }) {
  const scrollToSection = () => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else {
        if(id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative flex items-center justify-center pointer-events-auto">
      <motion.div
        onClick={scrollToSection}
        // ✅ 물리 효과 제거 후 고정 크기(w-12 h-12 = 48px) 적용
        className={`w-6 h-6 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center text-white cursor-pointer relative group backdrop-blur-md transition-all duration-300`}
        
        // ✅ 활성화 상태 애니메이션 (배경, 테두리, 그림자만 부드럽게 변경)
        animate={{
          borderColor: isActive ? "rgba(168, 85, 247, 0.8)" : "rgba(255, 255, 255, 0.1)", 
          backgroundColor: isActive ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.3)",
          boxShadow: isActive 
            ? "0 0 15px rgba(168, 85, 247, 0.4)"
            : "0 0 0px rgba(0,0,0,0)",
          scale: isActive ? 1.1 : 1 // 활성화된 것만 살짝 1.1배 강조 (선택 사항)
        }}
        // 기본 마우스 호버 시 살짝 밝아지는 효과 정도는 남겨둠 (UX상 클릭 가능함을 알리기 위해)
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-sm sm:text-xl relative z-10">
          {icon}
        </span>
        
        {/* Tooltip (왼쪽) */}
        <span className="absolute right-full mr-4 bg-black/80 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
          {label}
        </span>
      </motion.div>

      {/* ✅ 활성화 표시 점 (Active Indicator) */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0, x: -10 }}
            className="absolute left-full ml-3 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,1)]"
          />
        )}
      </AnimatePresence>
    </div>
  )
}