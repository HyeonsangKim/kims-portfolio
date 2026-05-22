'use client'

import { motion } from 'framer-motion'
import { FiAward, FiFileText, FiArrowUpRight } from 'react-icons/fi'
import { useI18n } from '@/lib/i18n'
import {
  awards,
  badgeStyleMap,
  badgeLabelMap,
  type Award,
} from '@/data/awards'

function KindIcon({ kind }: { kind: Award['kind'] }) {
  if (kind === 'paper') return <FiFileText className="w-3.5 h-3.5" />
  return <FiAward className="w-3.5 h-3.5" />
}

function AwardRow({ award, index }: { award: Award; index: number }) {
  const { locale } = useI18n()

  const handleClick = () => {
    if (!award.projectSlug) return
    const projectSection = document.getElementById('projects')
    if (projectSection) {
      projectSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const isClickable = !!award.projectSlug

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <div
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onClick={isClickable ? handleClick : undefined}
        onKeyDown={
          isClickable
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleClick()
                }
              }
            : undefined
        }
        className={`group grid items-center gap-3 sm:gap-5 py-4 sm:py-5 px-2 sm:px-4 border-b border-white/10 transition-colors grid-cols-[3rem_5.5rem_1fr_auto] sm:grid-cols-[4rem_8.5rem_1fr_auto] ${
          isClickable ? 'cursor-pointer hover:bg-white/[0.02]' : ''
        }`}
      >
        {/* Year */}
        <span className="text-xs sm:text-sm font-mono text-gray-500 tracking-wider">
          {award.date}
        </span>

        {/* Badge — fixed-width column ensures event titles align across rows */}
        <span
          className={`inline-flex items-center justify-center gap-1 px-2 py-0.5 rounded-md border text-[9px] sm:text-[10px] font-bold tracking-widest w-fit ${badgeStyleMap[award.badge]}`}
        >
          <KindIcon kind={award.kind} />
          <span className="hidden sm:inline">{badgeLabelMap[award.badge][locale]}</span>
        </span>

        {/* Event + result */}
        <div className="min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
            <h3 className="text-sm sm:text-base font-semibold text-white truncate">
              {award.event}
            </h3>
            <span className="text-[11px] sm:text-xs text-gray-500 truncate">
              {award.organizer}
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5 truncate">
            {award.result[locale]}
          </p>
        </div>

        {/* Action arrow */}
        {isClickable && (
          <FiArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
        )}
        {award.link && !isClickable && (
          <a
            href={award.link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-gray-500 hover:text-white transition-colors"
            aria-label={award.link.label}
          >
            <FiArrowUpRight className="w-4 h-4" />
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function AwardsPapers() {
  const { locale } = useI18n()

  const heading: Record<typeof locale, string> = {
    ko: 'Awards',
    en: 'Awards',
    ja: 'Awards',
  }
  const subtitle: Record<typeof locale, string> = {
    ko: '외부 검증 기록.',
    en: 'External validation.',
    ja: '外部検証記録。',
  }

  return (
    <section className="relative py-20 lg:py-28 px-6 max-w-5xl mx-auto z-10">
      <div className="mb-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent mb-3"
        >
          {heading[locale]}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 text-sm sm:text-base"
        >
          {subtitle[locale]}
        </motion.p>
      </div>

      {/* Achievements list — scales to N rows */}
      <div className="border-t border-white/10">
        {awards.map((a, i) => (
          <AwardRow key={a.id} award={a} index={i} />
        ))}
      </div>
    </section>
  )
}
