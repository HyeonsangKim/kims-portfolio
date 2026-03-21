'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink, FiPlay } from 'react-icons/fi'
import { useState } from 'react'
import type { Project, ProjectLink } from '@/data/projects'
import { badgeStyle } from '@/data/projects'
import { useI18n } from '@/lib/i18n'

const iconMap = {
  github: FiGithub,
  external: FiExternalLink,
} as const

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
    <div className="flex gap-4">
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

export default function ProjectAccordion({
  project,
  isOpen,
}: {
  project: Project
  isOpen: boolean
}) {
  const { locale } = useI18n()
  const hasMedia = project.media.type !== 'none'

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
                <div className="w-full md:w-[42%] md:pt-2">
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {project.description[locale]}
                  </p>
                  <div className="flex flex-wrap gap-2 md:hidden mt-3">
                    {project.badges.map((b) => (
                      <span
                        key={b.label}
                        className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${badgeStyle[b.variant]}`}
                      >
                        {b.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-2xl space-y-4">
                <p className="text-gray-400 leading-relaxed text-sm">
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
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
