'use client'

import { useMemo } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiGithub, FiExternalLink } from 'react-icons/fi'
import { useI18n } from '@/lib/i18n'
import { projects } from '@/data/projects'
import {
  careerStoryBlocksV1,
  projectStoryBlockSlotLabels,
  projectStoryBlockSlotOrder,
  type CareerReportKey,
} from '@/data/career-reports'
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

const linkIcon = { github: FiGithub, external: FiExternalLink } as const

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { locale } = useI18n()

  const project = projects.find((p) => p.id === slug)
  const storyBlock = careerStoryBlocksV1[slug as CareerReportKey]

  const heroDiagramKey = useMemo(() => {
    if (!storyBlock?.visuals) return undefined
    for (const slot of projectStoryBlockSlotOrder) {
      const key = storyBlock.visuals[slot]?.diagramKey
      if (key) return key
    }
    return undefined
  }, [storyBlock])

  const HeroDiagram = heroDiagramKey ? diagramComponents[heroDiagramKey] : null

  const sidebarSections = useMemo(
    () => projectStoryBlockSlotOrder
      .filter((slot) => storyBlock?.[slot]?.[locale])
      .map((slot) => ({ id: `slot-${slot}`, label: projectStoryBlockSlotLabels[slot][locale] })),
    [storyBlock, locale],
  )

  if (!project) {
    return (
      <div className="py-32 text-center">
        <p className="text-gray-500">Project not found.</p>
        <Link href="/#projects" className="text-cyan-400 text-sm mt-4 inline-block">← Back</Link>
      </div>
    )
  }

  return (
    <div className="py-12 md:py-20">
      <DetailSidebar
        sections={sidebarSections}
        backHref="/#projects"
        backLabel="Projects"
      />

      <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-cyan-400 transition-colors mb-8 xl:hidden">
        <FiArrowLeft className="w-3.5 h-3.5" />
        Back to Projects
      </Link>

      <motion.header
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{project.title}</h1>
            <p className="text-sm text-gray-500 mt-1">{project.tagline}</p>
          </div>
          <div className="flex gap-3">
            {project.links.map((link) => {
              const Icon = linkIcon[link.icon]
              const isGithub = link.icon === 'github'
              return (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 text-sm font-medium rounded-lg px-4 py-2 transition-all duration-200 ${
                    isGithub
                      ? 'bg-white/[0.06] text-white border border-white/10 hover:bg-white/[0.12] hover:border-white/20'
                      : 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 hover:bg-cyan-400/20 hover:border-cyan-400/40'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </a>
              )
            })}
          </div>
        </div>

        {storyBlock && (
          <p className="text-[15px] text-gray-400 leading-relaxed max-w-2xl mt-4">
            {storyBlock.oneLiner[locale]}
          </p>
        )}

        {project.media.type === 'youtube' && (
          <div className="mt-6 aspect-video rounded-xl overflow-hidden border border-white/[0.06]">
            <iframe
              src={`https://www.youtube.com/embed/${project.media.videoId}?rel=0`}
              title={`${project.title} demo`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
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

      {storyBlock && (
        <CareerDetailContent
          reportKey={slug as CareerReportKey}
          storyBlock={storyBlock}
          slotOrder={projectStoryBlockSlotOrder}
          slotLabels={projectStoryBlockSlotLabels}
          isProject={true}
          locale={locale}
          heroDiagramKey={heroDiagramKey}
        />
      )}

      <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/[0.06]">
        {project.tech.map((t) => (
          <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white/[0.04] text-gray-500 border border-white/[0.06]">
            {t}
          </span>
        ))}
      </div>

      <RelatedItems
        label={locale === 'ko' ? '다른 프로젝트' : locale === 'ja' ? '他のプロジェクト' : 'Other projects'}
        items={projects
          .filter((p) => p.id !== slug)
          .map((p) => ({
            href: `/projects/${p.id}`,
            title: p.title,
            subtitle: p.description[locale],
            badge: p.badges.find((b) => b.variant === 'award')?.label,
          }))}
      />
    </div>
  )
}
