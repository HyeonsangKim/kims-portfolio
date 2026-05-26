'use client'

import Link from 'next/link'
import { FiAward, FiFileText, FiArrowUpRight } from 'react-icons/fi'
import { useI18n } from '@/lib/i18n'
import { awards, badgeStyleMap, badgeLabelMap, type Award } from '@/data/awards'

function KindIcon({ kind }: { kind: Award['kind'] }) {
  if (kind === 'paper') return <FiFileText className="w-3 h-3" />
  return <FiAward className="w-3 h-3" />
}

export default function AwardsPapers() {
  const { locale } = useI18n()

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Awards & Papers</h2>

      <div className="divide-y divide-white/[0.04]">
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
              <Link key={i} href={`/projects/${award.projectSlug}`}>
                {content}
              </Link>
            )
          }
          if (award.link) {
            return (
              <a key={i} href={award.link.url} target="_blank" rel="noopener noreferrer">
                {content}
              </a>
            )
          }
          return <div key={i}>{content}</div>
        })}
      </div>
    </div>
  )
}
