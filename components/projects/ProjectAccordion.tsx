'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink, FiPlay, FiArrowRight, FiFileText } from 'react-icons/fi'
import { useState } from 'react'
import type { Project, ProjectLink, Gradient } from '@/data/projects'
import { badgeStyle } from '@/data/projects'
import { useI18n, type Locale } from '@/lib/i18n'
import { projectReports } from '@/data/reports'
import ProjectReportOverlay from './ProjectReportOverlay'
import CareerReportOverlay from '@/components/career/CareerReportOverlay'
import { careerStoryBlocksV1, type CareerReportKey } from '@/data/career-reports'

// WIGTN 사이드 프로젝트는 Career와 동일한 9슬롯 v1 모달로 렌더해서
// 통일감을 확보한다. 각 프로젝트의 모달 헤더에 필요한 메타데이터
// (period / role)를 한 곳에 모아둔다. company는 모두 'WIGTN'.
const wigtnReportMeta: Record<string, { period: string; role: string }> = {
  wigent: { period: '2026-03', role: 'Co-creator · Hackathon' },
  wigtnflake: { period: '2026-04', role: 'Lead Engineer · Hackathon' },
  wigplugin: { period: '2026', role: 'Creator · Open Source' },
  wigvo: { period: '2026', role: 'Side Project' },
}

const wigtnReportKeys = new Set<string>(Object.keys(wigtnReportMeta))

const iconMap = {
  github: FiGithub,
  external: FiExternalLink,
} as const

const reportLabel: Record<Locale, string> = {
  ko: '전체 리포트 보기',
  en: 'View Full Report',
  ja: '詳細レポートを見る',
}

const gradientCssMap: Record<Gradient, string> = {
  'from-violet-500 to-fuchsia-500': 'linear-gradient(135deg, #8b5cf6, #d946ef)',
  'from-amber-500 to-orange-500': 'linear-gradient(135deg, #f59e0b, #f97316)',
  'from-emerald-500 to-teal-500': 'linear-gradient(135deg, #10b981, #14b8a6)',
  'from-sky-500 to-cyan-500': 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
  'from-sky-500 to-blue-600': 'linear-gradient(135deg, #0ea5e9, #2563eb)',
  'from-rose-500 to-pink-500': 'linear-gradient(135deg, #f43f5e, #ec4899)',
  'from-fuchsia-500 to-purple-600': 'linear-gradient(135deg, #d946ef, #9333ea)',
}

function MediaEmbed({ project }: { project: Project }) {
  const [ytLoaded, setYtLoaded] = useState(false)
  const m = project.media

  switch (m.type) {
    case 'youtube':
      return (
        <div className="rounded-xl overflow-hidden border border-white/10 bg-black aspect-video">
          {!ytLoaded ? (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setYtLoaded(true)
              }}
              className="relative w-full h-full group cursor-pointer"
            >
              <img
                src={`https://img.youtube.com/vi/${m.videoId}/hqdefault.jpg`}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FiPlay className="w-5 h-5 text-black ml-0.5" />
                </div>
              </div>
            </button>
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${m.videoId}?autoplay=1&rel=0`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              loading="lazy"
              className="w-full h-full"
              title={project.title}
            />
          )}
        </div>
      )

    case 'video':
      return (
        <div className="rounded-xl overflow-hidden border border-white/10 bg-black aspect-video">
          {/* Demo video — no speech, captions not applicable */}
          <video
            src={m.src}
            controls
            playsInline
            preload="none"
            className="w-full h-full object-cover"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )

    case 'image':
      return (
        <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40 aspect-video flex items-center justify-center">
          <img
            src={m.src}
            alt={m.alt}
            className="w-full h-full object-contain p-3 md:p-5"
            loading="lazy"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )

    default:
      return null
  }
}

function TechTags({ tech }: { tech: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tech.map((t) => (
        <span
          key={t}
          className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/5 text-gray-300 border border-white/5"
        >
          {t}
        </span>
      ))}
    </div>
  )
}

function LinkList({ links }: { links: ProjectLink[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {links.map((link) => {
        const Icon = iconMap[link.icon]
        return (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <Icon className="w-3.5 h-3.5" />
            {link.label}
          </a>
        )
      })}
    </div>
  )
}

/**
 * Primary CTA: clearly a button (solid gradient fill, arrow, shadow).
 * Opens the full case-study overlay.
 */
function ReportCTA({
  onClick,
  label,
  gradient,
}: {
  onClick: () => void
  label: string
  gradient: string
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white shadow-lg shadow-black/30 transition-transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white/30"
      style={{ backgroundImage: gradient }}
    >
      <FiFileText className="w-4 h-4" />
      <span>{label}</span>
      <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
    </button>
  )
}

export default function ProjectAccordion({
  project,
  isOpen,
}: {
  project: Project
  isOpen: boolean
}) {
  const { locale } = useI18n()
  const hasMedia = project.media.type !== 'none' && !wigtnReportKeys.has(project.id)
  const report = projectReports[project.id]
  // WIGTN 프로젝트는 Career와 동일 v1 모달을 띄운다.
  const wigtnKey = wigtnReportKeys.has(project.id) && careerStoryBlocksV1[project.id as CareerReportKey]
    ? (project.id as CareerReportKey)
    : null
  const [reportOpen, setReportOpen] = useState(false)
  const [wigtnReportOpen, setWigtnReportOpen] = useState(false)

  const gradientCss =
    gradientCssMap[project.gradient] ?? gradientCssMap['from-violet-500 to-fuchsia-500']

  // WIGTN 프로젝트면 9슬롯 CTA를, 아니면 기존 legacy 리포트 CTA를 노출한다.
  const reportCTA = wigtnKey ? (
    <ReportCTA
      label={reportLabel[locale]}
      onClick={() => setWigtnReportOpen(true)}
      gradient={gradientCss}
    />
  ) : report ? (
    <ReportCTA
      label={reportLabel[locale]}
      onClick={() => setReportOpen(true)}
      gradient={gradientCss}
    />
  ) : null

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="accordion"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          className="overflow-hidden"
        >
          <div
            className="pt-4 pb-8 pl-4 md:pl-16 pr-4 md:pr-4 mx-2 md:mx-0 rounded-b-xl bg-white/[0.03] backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {hasMedia ? (
              <div className="flex flex-col md:flex-row gap-5">
                <div className="w-full md:w-[58%] shrink-0 space-y-3">
                  <MediaEmbed project={project} />
                  <TechTags tech={project.tech} />
                  <LinkList links={project.links} />
                </div>
                <div className="w-full md:w-[42%] md:pt-2 space-y-4">
                  <p className="text-gray-400 leading-relaxed text-sm whitespace-pre-line">
                    {project.description[locale]}
                  </p>
                  <div className="flex flex-wrap gap-2 md:hidden">
                    {project.badges.map((b) => (
                      <span
                        key={b.label}
                        className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${badgeStyle[b.variant]}`}
                      >
                        {b.label}
                      </span>
                    ))}
                  </div>
                  {reportCTA}
                </div>
              </div>
            ) : (
              <div className="max-w-2xl space-y-4">
                <p className="text-gray-400 leading-relaxed text-sm whitespace-pre-line">
                  {project.description[locale]}
                </p>
                <div className="flex flex-wrap gap-2 md:hidden">
                  {project.badges.map((b) => (
                    <span
                      key={b.label}
                      className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${badgeStyle[b.variant]}`}
                    >
                      {b.label}
                    </span>
                  ))}
                </div>
                <TechTags tech={project.tech} />
                <LinkList links={project.links} />
                {reportCTA}
              </div>
            )}
          </div>
        </motion.div>
      )}
      {reportOpen && report && (
        <ProjectReportOverlay
          project={project}
          report={report}
          onClose={() => setReportOpen(false)}
        />
      )}
      {wigtnReportOpen && wigtnKey && (
        <CareerReportOverlay
          reportKey={wigtnKey}
          gradientCss={gradientCss}
          company="WIGTN"
          period={wigtnReportMeta[wigtnKey].period}
          role={wigtnReportMeta[wigtnKey].role}
          projectName={project.title}
          youtubeId={project.media.type === 'youtube' ? project.media.videoId : undefined}
          onClose={() => setWigtnReportOpen(false)}
        />
      )}
    </AnimatePresence>
  )
}
