'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { useI18n } from '@/lib/i18n'
import { experiences, getName } from '@/data/experiences'
import { careerStoryBlocksV1, type CareerReportKey } from '@/data/career-reports'

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

const companyColor: Record<string, { text: string; border: string; bg: string; hover: string }> = {
  Soundmind: {
    text: 'text-cyan-400',
    border: 'border-cyan-400/20',
    bg: 'hover:bg-cyan-400/[0.04]',
    hover: 'group-hover/item:text-cyan-400',
  },
  'Purple Academy': {
    text: 'text-purple-400',
    border: 'border-purple-400/20',
    bg: 'hover:bg-purple-400/[0.04]',
    hover: 'group-hover/item:text-purple-400',
  },
  IEZLAB: {
    text: 'text-amber-400',
    border: 'border-amber-400/20',
    bg: 'hover:bg-amber-400/[0.04]',
    hover: 'group-hover/item:text-amber-400',
  },
}

const defaultColor = companyColor.Soundmind

export default function CareerList() {
  const { locale } = useI18n()
  const detailLabel = locale === 'ko' ? '상세 보기' : locale === 'ja' ? '詳細' : 'Detail'

  return (
    <section id="career" className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-white tracking-tight mb-8 glitch-hover">Career</h2>
      </motion.div>

      <motion.div
        className="space-y-12"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {experiences.map((exp) => {
          const colors = companyColor[exp.company] ?? defaultColor

          return (
            <motion.div key={exp.id} variants={fadeUp}>
              <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 mb-2">
                <h3 className={`text-2xl font-bold ${colors.text}`}>{exp.company}</h3>
                <span className="text-sm text-gray-300">{exp.role}</span>
                <span className="text-sm text-gray-500">{exp.period}</span>
              </div>
              <p className="text-sm text-gray-500 mb-4">{exp.tagline[locale]}</p>

              <div className={`space-y-2 pl-4 border-l-2 ${colors.border}`}>
                {exp.projects.map((proj) => (
                  <Link
                    key={proj.reportKey}
                    href={`/career/${proj.reportKey}`}
                    className={`group/item block py-3 px-4 -ml-4 rounded-r-lg ${colors.bg} transition-all border-l-2 border-transparent hover:${colors.border.replace('border-', 'border-')}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[15px] font-medium text-white ${colors.hover} transition-colors`}>
                        {getName(proj.name, locale)}
                      </span>
                      <span className={`flex items-center gap-1 text-[11px] text-gray-500 ${colors.hover} transition-colors`}>
                        {detailLabel}
                        <FiArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-1">{proj.desc[locale]}</p>
                    {careerStoryBlocksV1[proj.reportKey as CareerReportKey]?.oneLiner?.[locale] && (
                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 mt-1.5">
                        {careerStoryBlocksV1[proj.reportKey as CareerReportKey]?.oneLiner[locale]}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {proj.stack.slice(0, 5).map((t) => (
                        <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] text-gray-500">
                          {t}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
