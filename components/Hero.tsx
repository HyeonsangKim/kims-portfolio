'use client'
import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function TypeWriter({ text, delay }: { text: string; delay: number }) {
  const [displayed, setDisplayed] = useState('')
  const [showCursor, setShowCursor] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setShowCursor(true)
      let i = 0
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1))
        i++
        if (i >= text.length) clearInterval(interval)
      }, 60)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(startTimer)
  }, [text, delay])

  return (
    <span>
      {displayed}
      {showCursor && <span className="inline-block w-[3px] h-[1em] bg-cyan-400 ml-0.5 align-middle animate-pulse" />}
    </span>
  )
}

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
        <p className="text-xl sm:text-4xl font-mono tracking-wide text-cyan-400 text-center px-4 pb-2">
          <TypeWriter text="AI Product Engineer" delay={800} />
        </p>
      </div>

      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'circOut', delay: 2.2 }}
        className="mt-3 sm:mt-4 text-[11px] sm:text-sm tracking-[0.18em] sm:tracking-[0.22em] uppercase text-gray-400 text-center px-4 font-mono"
      >
        <span className="text-cyan-400/50">$</span>
        <span className="mx-2 text-white/20">~</span>
        <span className="text-white/85">WIGTN Crew</span>
        <span className="mx-2 text-white/20">/</span>
        <span className="text-white/55">AI Product Engineer</span>
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-10"
      >
        <span className="text-gray-600 text-xs sm:text-sm font-mono animate-pulse">&darr; scroll</span>
      </motion.div>
    </section>
  )
}
