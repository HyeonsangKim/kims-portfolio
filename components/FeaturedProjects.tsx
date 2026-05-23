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
          transition={{ delay: 0.08 }}
          className="text-gray-400"
        >
          {locale === 'ko'
            ? 'WIGTN 팀과 함께한 사이드 프로젝트.'
            : locale === 'ja'
              ? 'WIGTNチームと共にしたサイドプロジェクト。'
              : 'Side projects built with the WIGTN team.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-8 mx-auto max-w-2xl rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-left"
        >
          <div className="text-[10px] tracking-[0.25em] uppercase text-gray-500 mb-1.5">
            About WIGTN
          </div>
          <p className="text-sm md:text-[15px] text-gray-300 leading-relaxed">
            {locale === 'ko' ? (
              <>
                AI 시대에 존재하는 여러 문제를 <span className="text-white font-medium">AI-Native하게 풀기 위해</span>, 가치관이 맞는 5명의 엔지니어가 모인 크루입니다. Harness Engineering 기반 플러그인 <span className="text-white font-medium">WigPlugin</span>을 오픈소스로 공개했고, 해커톤 수상 등을 거치며 연구·수상·오픈소스·제품 전반에서 활동합니다.
              </>
            ) : locale === 'ja' ? (
              <>
                AI時代に存在する様々な問題を<span className="text-white font-medium">AIネイティブに解く</span>ため、価値観の合うエンジニア5名が集まったクルーです。Harness Engineeringベースのプラグイン<span className="text-white font-medium">WigPlugin</span>をオープンソースで公開し、ハッカソン受賞などを経て研究・受賞・オープンソース・プロダクトの全領域で活動しています。
              </>
            ) : (
              <>
                An <span className="text-white font-medium">independent crew of 5 AI engineers</span>, aligned on values, set out to solve real-world problems <span className="text-white font-medium">AI-natively</span>. We've open-sourced <span className="text-white font-medium">WigPlugin</span> (a harness-engineering plugin), placed at hackathons, and ship work across research, awards, open source, and products.
              </>
            )}
          </p>
        </motion.div>
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
