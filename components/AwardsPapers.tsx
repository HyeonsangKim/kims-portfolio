'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiAward, FiFileText, FiArrowUpRight } from 'react-icons/fi'
import { useI18n } from '@/lib/i18n'
import { awards, badgeStyleMap, badgeLabelMap, type Award } from '@/data/awards'

function KindIcon({ kind }: { kind: Award['kind'] }) {
  if (kind === 'paper') return <FiFileText className="w-3 h-3" />
  return <FiAward className="w-3 h-3" />
}

const rowVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35 } },
}

export default function AwardsPapers() {
  const { locale } = useI18n()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-white tracking-tight mb-6 glitch-hover">Awards</h2>

      <motion.div
        className="divide-y divide-white/[0.04]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        transition={{ staggerChildren: 0.06 }}
      >
        {awards.map((award, i) => {
          const isClickable = !!award.projectSlug

          const content = (
            <div
              className={`group grid items-center gap-3 py-4 px-3 rounded-lg transition-colors grid-cols-[3rem_5.5rem_1fr_auto] sm:grid-cols-[4rem_7rem_1fr_auto] ${
                isClickable ? 'hover:bg-white/[0.02]' : ''
              }`}
            >
              <span className="text-xs font-mono text-gray-500">{award.date}</span>

              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[9px] font-semibold tracking-wider w-fit ${badgeStyleMap[award.badge]}`}>
                <KindIcon kind={award.kind} />
                <span className="hidden sm:inline">{badgeLabelMap[award.badge][locale]}</span>
              </span>

              <div className="min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                  <h3 className="text-sm font-medium text-white truncate">{award.event}</h3>
                  <span className="text-[11px] text-gray-500 truncate">{award.organizer}</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5 truncate">{award.result[locale]}</p>
              </div>

              {(isClickable || award.link) && (
                <FiArrowUpRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-white transition-colors" />
              )}
            </div>
          )

          if (isClickable) {
            return (
              <motion.div key={i} variants={rowVariants}>
                <Link href={`/projects/${award.projectSlug}`}>
                  {content}
                </Link>
              </motion.div>
            )
          }
          if (award.link) {
            return (
              <motion.div key={i} variants={rowVariants}>
                <a href={award.link.url} target="_blank" rel="noopener noreferrer">
                  {content}
                </a>
              </motion.div>
            )
          }
          return <motion.div key={i} variants={rowVariants}>{content}</motion.div>
        })}
      </motion.div>
    </motion.div>
  )
}
