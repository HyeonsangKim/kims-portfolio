'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'
import { projects, badgeStyle, badgePriority } from '@/data/projects'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

const linkIcon = { github: FiGithub, external: FiExternalLink } as const

export default function ProjectList() {
  const { locale } = useI18n()

  return (
    <section id="projects" className="py-16">
      <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Projects</h2>
      <p className="text-sm text-gray-500 mb-8">WIGTN — 5인 AI 개발 크루의 사이드 프로젝트</p>

      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((p) => (
          <Link
            key={p.id}
            href={`/projects/${p.id}`}
            className="group block p-5 rounded-xl border border-white/[0.06] hover:border-white/[0.12] bg-white/[0.02] hover:bg-white/[0.04] transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-[15px] font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">{p.tagline}</p>
              </div>
              <div className="flex gap-1.5">
                {[...p.badges].sort((a, b) => badgePriority[a.variant] - badgePriority[b.variant]).map((b) => (
                  <span
                    key={b.label}
                    className={`text-[10px] px-2 py-0.5 rounded-full border ${badgeStyle[b.variant]}`}
                  >
                    {b.label}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-3">
              {p.description[locale]}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {p.tech.slice(0, 4).map((t) => (
                  <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.04] text-gray-500">
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                {p.links.map((link) => {
                  const Icon = linkIcon[link.icon]
                  return (
                    <span
                      key={link.url}
                      className="text-gray-500 hover:text-white transition-colors"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        window.open(link.url, '_blank')
                      }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                  )
                })}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
