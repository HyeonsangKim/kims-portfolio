'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import { experiences, getName } from '@/data/experiences'
import { careerStoryBlocksV1, type CareerReportKey } from '@/data/career-reports'

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }

export default function CareerList() {
  const { locale } = useI18n()

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
        className="space-y-10"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {experiences.map((exp) => (
          <motion.div key={exp.id} className="group" variants={fadeUp}>
            <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 mb-3">
              <h3 className="text-lg font-semibold text-white">{exp.company}</h3>
              <span className="text-sm text-cyan-400/70">{exp.role}</span>
              <span className="text-sm text-gray-500">{exp.period}</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">{exp.tagline[locale]}</p>

            <div className="space-y-3 pl-4 border-l border-cyan-400/20">
              {exp.projects.map((proj) => (
                <Link
                  key={proj.reportKey}
                  href={`/career/${proj.reportKey}`}
                  className="block group/item py-3 px-4 -ml-4 rounded-lg hover:bg-cyan-400/[0.03] transition-colors"
                >
                  <div className="flex items-baseline gap-3 mb-1.5">
                    <span className="text-[15px] font-medium text-white group-hover/item:text-cyan-400 transition-colors">
                      {getName(proj.name, locale)}
                    </span>
                    <span className="text-xs text-cyan-400/40">→</span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-1">{proj.desc[locale]}</p>
                  {careerStoryBlocksV1[proj.reportKey as CareerReportKey]?.oneLiner?.[locale] && (
                    <p className="text-xs text-gray-600 line-clamp-2 mt-1.5 max-h-0 overflow-hidden group-hover/item:max-h-16 transition-all duration-300">
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
        ))}
      </motion.div>
    </section>
  )
}
