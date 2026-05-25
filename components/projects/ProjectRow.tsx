'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiChevronRight, FiGithub, FiExternalLink } from 'react-icons/fi'
import type { Project, Gradient } from '@/data/projects'
import { badgeStyle, badgePriority } from '@/data/projects'
import ProjectAccordion from './ProjectAccordion'

const linkIconMap = {
  github: FiGithub,
  external: FiExternalLink,
} as const

const gradientMap: Record<Gradient, string> = {
  'from-violet-500 to-fuchsia-500': 'linear-gradient(to right, #8b5cf6, #d946ef)',
  'from-amber-500 to-orange-500': 'linear-gradient(to right, #f59e0b, #f97316)',
  'from-emerald-500 to-teal-500': 'linear-gradient(to right, #10b981, #14b8a6)',
  'from-sky-500 to-cyan-500': 'linear-gradient(to right, #0ea5e9, #06b6d4)',
  'from-sky-500 to-blue-600': 'linear-gradient(to right, #0ea5e9, #2563eb)',
  'from-rose-500 to-pink-500': 'linear-gradient(to right, #f43f5e, #ec4899)',
  'from-fuchsia-500 to-purple-600': 'linear-gradient(to right, #d946ef, #9333ea)',
}

export default function ProjectRow({
  project,
  index,
  isOpen,
  onToggle,
}: {
  project: Project
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  const showGradient = isOpen || isHovered
  const cssGradient = gradientMap[project.gradient] ?? 'linear-gradient(to right, #8b5cf6, #d946ef)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onToggle()
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group cursor-pointer border-b border-white/10 transition-colors duration-300 ${
          isOpen ? 'bg-white/[0.03]' : 'hover:bg-white/[0.02]'
        }`}
      >
        <div className="flex items-center gap-4 md:gap-6 py-6 md:py-8 px-2 md:px-4">
          {/* Number */}
          <span className="text-sm text-gray-600 font-mono w-8 shrink-0">
            {project.num}
          </span>

          {/* Name + Tagline */}
          <div className="flex-1 min-w-0">
            <h3
              className="text-2xl md:text-3xl font-bold transition-all duration-300"
              style={
                showGradient
                  ? {
                      backgroundImage: cssGradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }
                  : { color: 'white' }
              }
            >
              {project.title}
            </h3>
            <p className="text-gray-500 text-sm md:text-base mt-1 truncate">
              {project.tagline}
            </p>
          </div>

          {/* Badges (desktop) — award 우선 정렬해서 상/논문이 먼저 시선 잡힘. */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {[...project.badges]
              .sort((a, b) => badgePriority[a.variant] - badgePriority[b.variant])
              .map((b) => (
                <span
                  key={b.label}
                  className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${badgeStyle[b.variant]}`}
                >
                  {b.label}
                </span>
              ))}
          </div>

          {/* Quick links — GitHub / Live 등을 행 자체에서 바로 클릭 가능하게 노출 (accordion 펼치지 않아도). */}
          {project.links.length > 0 && (
            <div className="hidden md:flex items-center gap-1 shrink-0">
              {project.links.map((link) => {
                const Icon = linkIconMap[link.icon]
                return (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`${project.title} — ${link.label}`}
                    title={link.label}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/15 bg-white/[0.04] text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/10 transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                )
              })}
            </div>
          )}

          {/* Arrow */}
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            className="shrink-0"
          >
            <FiChevronRight className="w-5 h-5 text-gray-500" />
          </motion.div>
        </div>
      </div>

      <ProjectAccordion project={project} isOpen={isOpen} />
    </motion.div>
  )
}
