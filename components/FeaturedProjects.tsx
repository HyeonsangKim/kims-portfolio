'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import ProjectRow from './projects/ProjectRow'
import { useI18n } from '@/lib/i18n'

export default function FeaturedProjects() {
  const { locale } = useI18n()
  const [openId, setOpenId] = useState<string | null>(null)

  const handleToggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }, [])

  return (
    <section id="projects" className="relative py-32 px-6 max-w-7xl mx-auto z-10">
      <div className="mb-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent mb-4"
        >
          Selected Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-400"
        >
          {locale === 'ko' ? 'WIGTN 크루와 함께 만든 사이드 프로젝트.' : locale === 'ja' ? 'WIGTNクルーと作ったサイドプロジェクト。' : 'Side projects built with WIGTN crew.'}
        </motion.p>
      </div>

      <div className="border-t border-white/10">
        {projects.map((project, i) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={i}
            isOpen={openId === project.id}
            onToggle={() => handleToggle(project.id)}
          />
        ))}
      </div>
    </section>
  )
}
