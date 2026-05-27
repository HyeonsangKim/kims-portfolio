'use client'

import { useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { projects, badgeStyle, badgePriority } from '@/data/projects'

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function ProjectList() {
  const { locale } = useI18n()

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    e.currentTarget.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`
  }, [])

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)'
  }, [])

  return (
    <section id="projects" className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-white tracking-tight mb-2 glitch-hover">Projects</h2>
        <p className="text-sm text-gray-500 mb-8">WIGTN — 5인 AI 개발 크루의 사이드 프로젝트</p>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-2 gap-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        transition={{ staggerChildren: 0.08 }}
      >
        {projects.map((p) => (
          <motion.div key={p.id} variants={cardVariants}>
            <Link
              href={`/projects/${p.id}`}
              className="group block p-5 rounded-xl border border-white/[0.06] hover:border-cyan-400/20 bg-white/[0.02] hover:bg-cyan-400/[0.03] transition-all duration-300"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transition: 'transform 0.15s ease-out, border-color 0.3s, background-color 0.3s' }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-[15px] font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{p.tagline}</p>
                </div>
                <div className="flex gap-1.5">
                  {[...p.badges].sort((a, b) => badgePriority[a.variant] - badgePriority[b.variant]).map((b) => (
                    <span
                      key={b.label}
                      className={`text-[10px] px-2 py-0.5 rounded-full border ${badgeStyle[b.variant]}`}
                    >
                      {b.label}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-3">
                {p.description[locale]}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.slice(0, 4).map((t) => (
                    <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] text-gray-500">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-[11px] text-gray-600 group-hover:text-cyan-400 transition-colors">
                  Detail →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
