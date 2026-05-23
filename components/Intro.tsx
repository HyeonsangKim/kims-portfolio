'use client'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

export default function Intro() {
  const { t } = useI18n()
  const containerRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. 수직 라인 애니메이션
      gsap.fromTo(lineRef.current,
        { height: 0, opacity: 0 },
        {
          height: 120, // 길이 약간 증가
          opacity: 1,
          duration: 1.5,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          }
        }
      )

      // 2. 텍스트 등장
      const texts = textRef.current?.children
      if (texts) {
        gsap.fromTo(texts,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 65%", // 등장 타이밍을 조금 더 늦춤 (여백이 많아졌으므로)
              toggleActions: "play none none reverse"
            }
          }
        )
      }
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    // ✅ py-20 -> py-40으로 변경하여 섹션 자체의 여백을 대폭 확보
    <section ref={containerRef} className="relative min-h-[80vh] flex flex-col items-center justify-center py-40 px-6">
      
      {/* 장식용 수직 라인 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-30 h-0" ref={lineRef} />

      <div ref={textRef} className="max-w-4xl mx-auto text-center z-10">
        <h2 className="text-sm md:text-base font-bold tracking-[0.2em] text-purple-400 mb-8 uppercase">
          {t('intro.subtitle') as string}
        </h2>

        <h3 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-10 leading-tight">
          {t('intro.heading1') as string}<br />
          <span className="text-gray-600">{t('intro.heading2') as string}</span>
        </h3>

        <div className="space-y-5 max-w-3xl mx-auto text-left text-base md:text-lg text-gray-300 leading-relaxed font-light">
          <p>{t('intro.paragraph1') as string}</p>
          <p>{t('intro.paragraph2') as string}</p>
          <p>{t('intro.paragraph3') as string}</p>
        </div>
      </div>
    </section>
  )
}