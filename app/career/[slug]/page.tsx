'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
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
import DetailSidebar from '@/components/DetailSidebar'
import RelatedItems from '@/components/RelatedItems'
import OdiyaArchitectureDiagram from '@/components/career/diagrams/OdiyaArchitectureDiagram'
import MohaniArchitectureDiagram from '@/components/career/diagrams/MohaniArchitectureDiagram'
import KoccaArchitectureDiagram from '@/components/career/diagrams/KoccaArchitectureDiagram'
import PurpleArchitectureDiagram from '@/components/career/diagrams/PurpleArchitectureDiagram'
import AigoseoArchitectureDiagram from '@/components/career/diagrams/AigoseoArchitectureDiagram'
import OemArchitectureDiagram from '@/components/career/diagrams/OemArchitectureDiagram'

const diagramComponents: Record<string, React.ComponentType> = {
  odiya: OdiyaArchitectureDiagram,
  mohani: MohaniArchitectureDiagram,
  kocca: KoccaArchitectureDiagram,
  purple: PurpleArchitectureDiagram,
  aigoseo: AigoseoArchitectureDiagram,
  oem: OemArchitectureDiagram,
}

export default function CareerDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { locale } = useI18n()

  const reportKey = slug as CareerReportKey
  const storyBlock = careerStoryBlocksV1[reportKey]
  const legacy = careerReports[reportKey]
  const isProject = wigtnProjectKeys.has(reportKey)

  const slotOrder = isProject ? projectStoryBlockSlotOrder : careerStoryBlockSlotOrder
  const slotLabels = isProject ? projectStoryBlockSlotLabels : careerStoryBlockSlotLabels

  const heroDiagramKey = useMemo(() => {
    if (!storyBlock?.visuals) return undefined
    for (const slot of slotOrder) {
      const key = storyBlock.visuals[slot]?.diagramKey
      if (key) return key
    }
    return undefined
  }, [storyBlock, slotOrder])

  const HeroDiagram = heroDiagramKey ? diagramComponents[heroDiagramKey] : null

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
        <Link href="/#career" className="text-cyan-400 text-sm mt-4 inline-block">← Back</Link>
      </div>
    )
  }

  const sidebarSections = useMemo(
    () => slotOrder
      .filter((slot) => storyBlock?.[slot]?.[locale])
      .map((slot) => ({ id: `slot-${slot}`, label: slotLabels[slot][locale] })),
    [slotOrder, storyBlock, slotLabels, locale],
  )

  return (
    <div className="py-12 md:py-20">
      <DetailSidebar
        sections={sidebarSections}
        backHref="/#career"
        backLabel="Career"
      />

      <Link href="/#career" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cyan-400 transition-colors mb-8 xl:hidden">
        <FiArrowLeft className="w-3.5 h-3.5" />
        Back to Career
      </Link>

      <motion.header
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {exp && (
          <p className="text-sm text-cyan-400/60 mb-2">
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
      </motion.header>

      {HeroDiagram && (
        <motion.div
          className="mb-14 rounded-xl border border-cyan-400/10 bg-white/[0.01] p-4 overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <HeroDiagram />
        </motion.div>
      )}

      <CareerDetailContent
        reportKey={reportKey}
        storyBlock={storyBlock ?? undefined}
        legacy={legacy ?? undefined}
        slotOrder={slotOrder}
        slotLabels={slotLabels}
        isProject={isProject}
        locale={locale}
        heroDiagramKey={heroDiagramKey}
      />

      <RelatedItems
        label={locale === 'ko' ? '다른 프로젝트' : locale === 'ja' ? '他のプロジェクト' : 'More from this team'}
        items={experiences.flatMap((e) =>
          e.projects
            .filter((p) => p.reportKey !== reportKey)
            .map((p) => ({
              href: `/career/${p.reportKey}`,
              title: getName(p.name, locale),
              subtitle: p.desc[locale],
            }))
        )}
      />
    </div>
  )
}
