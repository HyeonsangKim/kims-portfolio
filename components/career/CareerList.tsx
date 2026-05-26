'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { experiences, getName } from '@/data/experiences'

export default function CareerList() {
  const { locale } = useI18n()

  return (
    <section id="career" className="py-16">
      <h2 className="text-2xl font-bold text-white mb-8 tracking-tight">Career</h2>

      <div className="space-y-10">
        {experiences.map((exp) => (
          <div key={exp.id} className="group">
            <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 mb-3">
              <h3 className="text-lg font-semibold text-white">{exp.company}</h3>
              <span className="text-sm text-gray-400">{exp.role}</span>
              <span className="text-sm text-gray-500">{exp.period}</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">{exp.tagline[locale]}</p>

            <div className="space-y-3 pl-4 border-l border-white/[0.06]">
              {exp.projects.map((proj) => (
                <Link
                  key={proj.reportKey}
                  href={`/career/${proj.reportKey}`}
                  className="block group/item py-3 px-4 -ml-4 rounded-lg hover:bg-white/[0.03] transition-colors"
                >
                  <div className="flex items-baseline gap-3 mb-1.5">
                    <span className="text-[15px] font-medium text-white group-hover/item:text-blue-400 transition-colors">
                      {getName(proj.name, locale)}
                    </span>
                    <span className="text-xs text-gray-600">→</span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-1">{proj.desc[locale]}</p>
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
          </div>
        ))}
      </div>
    </section>
  )
}
