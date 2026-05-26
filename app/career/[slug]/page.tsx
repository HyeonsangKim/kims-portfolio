'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'
import { useI18n } from '@/lib/i18n'
import {
  careerReports,
  careerStoryBlockSlotLabels,
  careerStoryBlockSlotOrder,
  careerStoryBlocksV1,
  projectStoryBlockSlotLabels,
  projectStoryBlockSlotOrder,
  wigtnProjectKeys,
  type CareerReportKey,
} from '@/data/career-reports'
import { experiences, getName } from '@/data/experiences'
import CareerDetailContent from '@/components/career/CareerDetailContent'

export default function CareerDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { locale } = useI18n()

  const reportKey = slug as CareerReportKey
  const storyBlock = careerStoryBlocksV1[reportKey]
  const legacy = careerReports[reportKey]
  const isProject = wigtnProjectKeys.has(reportKey)

  const slotOrder = isProject ? projectStoryBlockSlotOrder : careerStoryBlockSlotOrder
  const slotLabels = isProject ? projectStoryBlockSlotLabels : careerStoryBlockSlotLabels

  const exp = experiences.flatMap((e) =>
    e.projects.filter((p) => p.reportKey === reportKey).map((p) => ({
      company: e.company,
      role: e.role,
      period: e.period,
      projectName: getName(p.name, locale),
    }))
  )[0]

  if (!storyBlock && !legacy) {
    return (
      <div className="py-32 text-center">
        <p className="text-gray-500">Report not found.</p>
        <Link href="/#career" className="text-blue-400 text-sm mt-4 inline-block">← Back</Link>
      </div>
    )
  }

  return (
    <div className="py-12 md:py-20">
      <Link href="/#career" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-8">
        <FiArrowLeft className="w-3.5 h-3.5" />
        Back to Career
      </Link>

      <header className="mb-12">
        {exp && (
          <p className="text-sm text-gray-500 mb-2">
            {exp.company} · {exp.role} · {exp.period}
          </p>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
          {exp?.projectName ?? slug}
        </h1>
        {storyBlock && (
          <p className="text-[15px] text-gray-400 leading-relaxed max-w-2xl">
            {storyBlock.oneLiner[locale]}
          </p>
        )}
      </header>

      <CareerDetailContent
        reportKey={reportKey}
        storyBlock={storyBlock ?? undefined}
        legacy={legacy ?? undefined}
        slotOrder={slotOrder}
        slotLabels={slotLabels}
        isProject={isProject}
        locale={locale}
      />
    </div>
  )
}
