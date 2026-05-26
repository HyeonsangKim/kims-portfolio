'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'
import type { Locale } from '@/lib/i18n'

interface SidebarSection {
  id: string
  label: string
}

export default function DetailSidebar({
  sections,
  backHref,
  backLabel,
}: {
  sections: SidebarSection[]
  backHref: string
  backLabel: string
}) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 },
    )

    for (const section of sections) {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [sections])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 z-40 w-40">
      <nav className="flex flex-col gap-1 rounded-xl border border-white/[0.06] bg-[#0a0a0f]/80 backdrop-blur-md p-3">
        <Link
          href={backHref}
          className="flex items-center gap-2 text-[11px] text-gray-500 hover:text-cyan-400 transition-colors pb-2 mb-1 border-b border-white/[0.06]"
        >
          <FiArrowLeft className="w-3 h-3" />
          {backLabel}
        </Link>

        {sections.map((section) => {
          const isActive = activeId === section.id
          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className={`relative text-left text-[11px] px-2 py-1.5 rounded-md transition-colors ${
                isActive
                  ? 'text-cyan-400 bg-cyan-400/[0.06]'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-3 rounded-full bg-cyan-400"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              <span className="ml-1">{section.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
