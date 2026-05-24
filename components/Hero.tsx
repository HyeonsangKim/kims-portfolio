'use client'
import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = nameRef.current?.querySelectorAll('.char')
      if (chars) {
        gsap.fromTo(chars,
          { opacity: 0, y: 100, rotateX: -90 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.05, ease: "back.out(1.7)" }
        )
      }
      // ScrollTrigger toggleActions로 임계점 통과 시점에 한 번에 fade out한다.
      // 이전 scrub:1은 스크롤 위치에 비례해 opacity를 계속 변경시켜,
      // 사용자가 중간 위치에 스크롤을 멈추면 글씨가 흐릿하게 박힌 채로
      // 남는 UX 문제가 있었다. 임계점 트리거 + 짧은 transition으로 교체.
      gsap.to(containerRef.current, {
        opacity: 0,
        y: -60,
        scale: 0.96,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'bottom 70%',
          toggleActions: 'play none none reverse',
        },
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
              {char === ' ' ? ' ' : char}
            </span>
          ))}
        </h1>
      </div>

      <div className="w-full flex items-center justify-center relative min-h-[40px] sm:min-h-[60px] overflow-visible">
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "circOut", delay: 0.6 }}
          className="text-xl sm:text-4xl font-light tracking-wide bg-gradient-to-r from-purple-400 via-pink-500 to-rose-500 bg-clip-text text-transparent text-center px-4 pb-2"
        >
          AI Product Engineer
        </motion.p>
      </div>

      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'circOut', delay: 1.1 }}
        className="mt-3 sm:mt-4 text-[11px] sm:text-sm tracking-[0.18em] sm:tracking-[0.22em] uppercase text-gray-400 text-center px-4"
      >
        <span className="text-white/85">Soundmind</span>
        <span className="mx-2 text-white/25">/</span>
        <span className="text-white/55">WIGTN Crew</span>
      </motion.p>

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
