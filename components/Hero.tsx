'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  
  const [titleIndex, setTitleIndex] = useState(0)
  const titles = [
    { text: "AI Product Engineer", gradient: "from-purple-400 via-pink-500 to-rose-500" },
    { text: "Frontend Developer", gradient: "from-cyan-400 via-blue-500 to-indigo-600" },
    { text: "App Developer", gradient: "from-emerald-400 via-teal-500 to-cyan-600" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = nameRef.current?.querySelectorAll('.char')
      if (chars) {
        gsap.fromTo(chars, 
          { opacity: 0, y: 100, rotateX: -90 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.05, ease: "back.out(1.7)" }
        )
      }
      gsap.to(containerRef.current, {
        opacity: 0,
        y: -100,
        scale: 0.95,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const name = "I'm Hyeonsang Kim"

  return (
    <section ref={containerRef} className="relative h-screen flex flex-col items-center justify-center z-10 px-4">
      <div className="relative overflow-visible py-2">
        <h1 ref={nameRef} className="text-4xl sm:text-7xl font-bold perspective-text text-center pb-4 sm:pb-6 leading-tight">
          {name.split('').map((char, i) => (
            <span key={i} className="char inline-block bg-gradient-to-r from-white via-purple-100 to-gray-400 bg-clip-text text-transparent">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>
      </div>

      <div className="w-full flex items-center justify-center relative min-h-[40px] sm:min-h-[60px] overflow-visible">
        <AnimatePresence mode="wait">
          <motion.p
            key={titleIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            // ✅ 여기도 pb-2 추가하여 텍스트 잘림 방지
            className={`text-xl sm:text-4xl font-light tracking-wide bg-gradient-to-r ${titles[titleIndex].gradient} bg-clip-text text-transparent text-center px-4 pb-2`}
          >
            {titles[titleIndex].text}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Credential strip — 0-second visibility for external validation signals */}
      <motion.button
        type="button"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        onClick={() => {
          const el = document.getElementById('awards')
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }}
        className="mt-6 sm:mt-8 group flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md hover:bg-white/[0.08] hover:border-white/20 transition-all"
        aria-label="Jump to Awards & Papers section"
      >
        <span className="text-[10px] sm:text-xs font-bold tracking-widest text-violet-300/90">
          ACL 2026 PAPER
        </span>
        <span className="w-px h-3 bg-white/10" />
        <span className="text-[10px] sm:text-xs font-bold tracking-widest text-amber-300/90">
          TRAE GRAND PRIZE
        </span>
        <span className="w-px h-3 bg-white/10 hidden sm:block" />
        <span className="text-[10px] sm:text-xs font-bold tracking-widest text-sky-300/90 hidden sm:inline">
          SNOWFLAKE TOP 3
        </span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 animate-bounce"
      >
        <span className="text-gray-500 text-xs sm:text-sm">Scroll Down</span>
      </motion.div>
    </section>
  )
}