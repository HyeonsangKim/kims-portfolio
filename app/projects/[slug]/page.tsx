'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
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

const linkIcon = { github: FiGithub, external: FiExternalLink } as const

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { locale } = useI18n()

  const project = projects.find((p) => p.id === slug)
  const storyBlock = careerStoryBlocksV1[slug as CareerReportKey]

  if (!project) {
    return (
      <div className="py-32 text-center">
        <p className="text-gray-500">Project not found.</p>
        <Link href="/#projects" className="text-blue-400 text-sm mt-4 inline-block">← Back</Link>
      </div>
    )
  }

  return (
    <div className="py-12 md:py-20">
      <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-8">
        <FiArrowLeft className="w-3.5 h-3.5" />
        Back to Projects
      </Link>

      <header className="mb-10">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{project.title}</h1>
            <p className="text-sm text-gray-500 mt-1">{project.tagline}</p>
          </div>
          <div className="flex gap-2">
            {project.links.map((link) => {
              const Icon = linkIcon[link.icon]
              return (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white border border-white/10 rounded-full px-3 py-1.5 transition-colors"
                >
                  <Icon className="w-3 h-3" />
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
      </header>

      {storyBlock && (
        <CareerDetailContent
          reportKey={slug as CareerReportKey}
          storyBlock={storyBlock}
          slotOrder={projectStoryBlockSlotOrder}
          slotLabels={projectStoryBlockSlotLabels}
          isProject={true}
          locale={locale}
        />
      )}

      <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/[0.06]">
        {project.tech.map((t) => (
          <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white/[0.04] text-gray-500 border border-white/[0.06]">
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}
