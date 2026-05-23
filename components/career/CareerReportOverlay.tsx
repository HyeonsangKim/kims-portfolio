'use client'

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentType,
} from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiX,
  FiBriefcase,
  FiTarget,
  FiCheckCircle,
  FiCompass,
  FiAlertTriangle,
  FiCpu,
  FiGitBranch,
  FiFlag,
  FiPlayCircle,
  FiTrendingUp,
  FiRefreshCw,
} from 'react-icons/fi'
import { useI18n, type Locale } from '@/lib/i18n'
import {
  careerReports,
  careerStoryBlockSlotLabels,
  careerStoryBlockSlotOrder,
  careerStoryBlocksV1,
  type CareerReportKey,
  type CareerStoryBlockSlot,
  type CareerStoryBlockV1,
  type SlotVisuals,
} from '@/data/career-reports'
import OdiyaArchitectureDiagram from './diagrams/OdiyaArchitectureDiagram'
import MohaniArchitectureDiagram from './diagrams/MohaniArchitectureDiagram'
import KoccaArchitectureDiagram from './diagrams/KoccaArchitectureDiagram'

const ui: Record<string, Record<Locale, string>> = {
  eyebrow: { ko: '경력 리포트', en: 'Career Report', ja: 'キャリアレポート' },
  about: { ko: 'About', en: 'About', ja: 'About' },
  role: { ko: 'My Role', en: 'My Role', ja: 'My Role' },
  highlights: { ko: 'Highlights', en: 'Highlights', ja: 'Highlights' },
  oneLiner: { ko: '한 줄 요약', en: 'TL;DR', ja: '一行要約' },
}

const t = (key: keyof typeof ui, locale: Locale) => ui[key][locale] ?? ui[key].en

const slotIconMap: Record<CareerStoryBlockSlot, ComponentType<{ className?: string }>> = {
  context: FiCompass,
  problem: FiAlertTriangle,
  hypothesis: FiCpu,
  alternatives: FiGitBranch,
  decision: FiFlag,
  execution: FiPlayCircle,
  result: FiTrendingUp,
}

export default function CareerReportOverlay({
  reportKey,
  gradientCss,
  company,
  period,
  role,
  projectName,
  onClose,
}: {
  reportKey: CareerReportKey | null
  gradientCss: string
  company: string
  period: string
  role: string
  projectName: string
  onClose: () => void
}) {
  const { locale } = useI18n()
  const open = reportKey !== null

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (typeof document === 'undefined') return null

  const storyBlock = reportKey ? careerStoryBlocksV1[reportKey] : undefined
  const legacy = reportKey ? careerReports[reportKey] : null
  const hasContent = storyBlock || legacy

  return createPortal(
    <AnimatePresence>
      {reportKey && hasContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm overflow-y-auto"
          onClick={onClose}
          data-modal-scroll-container
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative mx-auto my-4 md:my-8 w-full max-w-5xl rounded-2xl border border-white/10 bg-[#0a0a0f] shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="close"
              className="absolute top-4 right-4 md:top-5 md:right-5 z-30 p-2 rounded-full bg-black/50 hover:bg-white/15 border border-white/15 text-gray-200 hover:text-white transition-colors backdrop-blur"
            >
              <FiX className="w-5 h-5" />
            </button>

            {/* Header */}
            <header className="relative px-6 md:px-12 pr-16 md:pr-20 pt-10 md:pt-14 pb-8 md:pb-10 overflow-hidden rounded-t-2xl">
              <div aria-hidden className="absolute inset-0 opacity-20" style={{ background: gradientCss }} />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.08), transparent 60%)',
                }}
              />
              <div className="relative">
                <div className="text-[11px] uppercase tracking-[0.25em] text-gray-400 mb-3">
                  {t('eyebrow', locale)} · {period}
                </div>
                <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1 mb-2">
                  <span className="text-base md:text-lg font-semibold text-white/70">{company}</span>
                  <span className="text-white/30">·</span>
                  <span className="text-sm md:text-base text-white/50">{role}</span>
                </div>
                <h2
                  className="text-3xl md:text-5xl font-bold tracking-tight"
                  style={{
                    backgroundImage: gradientCss,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {projectName}
                </h2>

              </div>
            </header>

            {/* Body */}
            {storyBlock ? (
              <StoryBlockBody
                data={storyBlock}
                locale={locale}
                gradientCss={gradientCss}
                /* v1 mode keeps the legacy `highlights` as a top-of-modal
                   "주요 성과" box so visitors get the quick-scan summary
                   before the 8-slot narrative. */
                highlights={legacy?.highlights[locale]}
                role={legacy?.role[locale]}
              />
            ) : (
              legacy && <LegacyBody data={legacy} locale={locale} gradientCss={gradientCss} />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

/* ────────────── v1: 9-slot story body ────────────── */

function StoryBlockBody({
  data,
  locale,
  gradientCss,
  highlights,
  role,
}: {
  data: CareerStoryBlockV1
  locale: Locale
  gradientCss: string
  highlights?: string[]
  role?: string
}) {
  const slots = careerStoryBlockSlotOrder
  const [activeSlot, setActiveSlot] = useState<CareerStoryBlockSlot>(slots[0])
  const sectionRefs = useRef<Record<CareerStoryBlockSlot, HTMLElement | null>>(
    {} as Record<CareerStoryBlockSlot, HTMLElement | null>,
  )
  const chipRefs = useRef<Record<CareerStoryBlockSlot, HTMLButtonElement | null>>(
    {} as Record<CareerStoryBlockSlot, HTMLButtonElement | null>,
  )
  const scrollContainerRef = useRef<HTMLElement | null>(null)
  // While we drive a smooth scroll via handleJump, suppress IntersectionObserver
  // updates so the active chip doesn't flicker across slots in mid-flight.
  const jumpLockRef = useRef(false)

  // Grab the modal's scroll container once mounted — the observer needs it
  // as `root` because the modal scrolls itself, not the window.
  useLayoutEffect(() => {
    scrollContainerRef.current = document.querySelector<HTMLElement>(
      '[data-modal-scroll-container]',
    )
  }, [])

  // Track which section is currently in view to highlight the matching chip.
  //
  // We deliberately do not pick "the section with the largest intersectionRatio"
  // — that strategy flips active state as adjacent sections trade visibility
  // near the boundary, which read as a flickering / jumping chip on screen.
  // Instead: IntersectionObserver acts purely as a wake-up trigger, and we
  // pick "the last section whose top has crossed a trigger line just below the
  // sticky chip strip." That guarantees exactly one active slot per scroll
  // position and updates monotonically as the user scrolls down.
  useEffect(() => {
    const root = scrollContainerRef.current
    if (!root) return

    const pickActive = () => {
      if (jumpLockRef.current) return
      const containerTop = root.getBoundingClientRect().top
      // Trigger line sits just below the sticky chip strip (~56px) with a
      // bit of breathing room so the active state flips when a section's
      // heading visually reaches the chip strip.
      const triggerLine = containerTop + 100

      let candidate: CareerStoryBlockSlot | null = null
      let smallestDistance = Infinity
      for (const slot of slots) {
        const el = sectionRefs.current[slot]
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top <= triggerLine) {
          const distance = triggerLine - top
          if (distance < smallestDistance) {
            smallestDistance = distance
            candidate = slot
          }
        }
      }
      // Before any section has crossed the trigger line, keep the first chip
      // active so the modal never opens with an empty selection.
      const next = candidate ?? slots[0]
      setActiveSlot((prev) => (prev === next ? prev : next))
    }

    const observer = new IntersectionObserver(pickActive, {
      root,
      rootMargin: '0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    })
    slots.forEach((slot) => {
      const el = sectionRefs.current[slot]
      if (el) observer.observe(el)
    })
    pickActive()
    return () => observer.disconnect()
  }, [slots])

  // Keep the active chip visible inside the horizontal scroll strip on mobile.
  // We drive `scrollLeft` on the chip strip directly instead of calling
  // `chip.scrollIntoView({ block: 'nearest' })`, because `scrollIntoView` will
  // also adjust ancestor scroll containers — which would jolt the modal
  // vertically every time the active slot changed (the exact "막 튐" feeling
  // reported during scrolling).
  //
  // Only auto-scroll the strip when the active chip is actually clipped — on
  // desktop the strip fits all chips, so this becomes a no-op and the chips
  // stop sliding back and forth as the active state updates during scroll.
  const chipStripRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const chip = chipRefs.current[activeSlot]
    const strip = chipStripRef.current
    if (!chip || !strip) return
    const stripRect = strip.getBoundingClientRect()
    const chipRect = chip.getBoundingClientRect()
    const fullyVisible =
      chipRect.left >= stripRect.left && chipRect.right <= stripRect.right
    if (fullyVisible) return
    const target = chip.offsetLeft - strip.clientWidth / 2 + chip.offsetWidth / 2
    strip.scrollTo({ left: target, behavior: 'smooth' })
  }, [activeSlot])

  const handleJump = (slot: CareerStoryBlockSlot) => {
    const target = sectionRefs.current[slot]
    if (!target) return
    setActiveSlot(slot)
    // Smooth scroll animations run ~400–600ms; lock the observer for a little
    // longer so the chip stays on the user's pick until the scroll settles.
    jumpLockRef.current = true
    window.setTimeout(() => {
      jumpLockRef.current = false
    }, 700)

    const container =
      scrollContainerRef.current ??
      target.closest<HTMLElement>('[data-modal-scroll-container]')
    if (!container) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    const containerRect = container.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    // Sticky TOC is ~44px on mobile, ~52px on desktop; leave breathing room.
    const stickyOffset = 72
    container.scrollTo({
      top: container.scrollTop + (targetRect.top - containerRect.top) - stickyOffset,
      behavior: 'smooth',
    })
  }

  const hasOverview = (highlights && highlights.length > 0) || (role && role.length > 0)

  return (
    <>
      {/* Overview — quick-scan box that revives the legacy "Highlights" + role
          summary so v1 modal still answers "what is this project?" at a glance. */}
      {hasOverview && (
        <div className="px-6 md:px-12 pt-6 md:pt-8 pb-2 md:pb-4">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 md:p-6">
            <div className="flex items-center gap-2.5 mb-4">
              <span
                aria-hidden
                className="w-1 h-4 rounded-full"
                style={{ background: gradientCss }}
              />
              <h3 className="text-[13px] md:text-sm font-semibold tracking-wide text-white/90">
                {locale === 'ko' ? '핵심 성과' : locale === 'ja' ? '主要成果' : 'Highlights'}
              </h3>
            </div>
            {role && (
              <p className="text-[13px] md:text-[14px] text-gray-400 leading-relaxed mb-4">
                {role}
              </p>
            )}
            {highlights && highlights.length > 0 && (
              <ul className="space-y-2.5">
                {highlights.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-baseline gap-3 text-[13px] md:text-[14px] text-gray-300 leading-relaxed"
                  >
                    <span
                      aria-hidden
                      className="shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full"
                      style={{ background: gradientCss }}
                    />
                    <span className="flex-1 min-w-0">{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Sticky TOC — desktop: top of body, mobile: horizontal scroll strip */}
      <nav
        aria-label="report sections"
        className="sticky top-0 z-20 -mt-px border-y border-white/10 bg-[#0a0a0f]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0a0a0f]/80"
      >
        <div
          ref={chipStripRef}
          className="px-3 md:px-8 py-2.5 md:py-3 overflow-x-auto no-scrollbar"
        >
          <ul className="flex items-center gap-1.5 md:gap-2 min-w-max">
            {slots.map((slot) => {
              const active = slot === activeSlot
              const Icon = slotIconMap[slot]
              return (
                <li key={slot}>
                  <button
                    ref={(el) => {
                      chipRefs.current[slot] = el
                    }}
                    type="button"
                    onClick={() => handleJump(slot)}
                    className={`group flex items-center gap-1.5 rounded-full border px-2.5 md:px-3 py-1 md:py-1.5 text-[11px] md:text-[12px] font-medium tracking-tight transition-all ${
                      active
                        ? 'border-white/40 text-white shadow-sm'
                        : 'border-white/10 text-gray-400 hover:text-white hover:border-white/30'
                    }`}
                    style={
                      active
                        ? {
                            background: gradientCss,
                            // gradient + light text reads cleanly; soften alpha for less weight.
                            opacity: 0.95,
                          }
                        : undefined
                    }
                    aria-current={active ? 'true' : undefined}
                  >
                    <Icon className="w-3 h-3 md:w-3.5 md:h-3.5" aria-hidden />
                    <span>{careerStoryBlockSlotLabels[slot][locale]}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>

      <div className="px-6 md:px-12 py-10 md:py-14 space-y-12">
        {slots.map((slot) => (
          <StorySection
            key={slot}
            slot={slot}
            text={data[slot][locale]}
            visuals={data.visuals?.[slot]}
            locale={locale}
            gradientCss={gradientCss}
            registerRef={(el) => {
              sectionRefs.current[slot] = el
            }}
          />
        ))}
      </div>
    </>
  )
}

function StorySection({
  slot,
  text,
  visuals,
  locale,
  gradientCss,
  registerRef,
}: {
  slot: CareerStoryBlockSlot
  text: string
  visuals?: SlotVisuals
  locale: Locale
  gradientCss: string
  registerRef: (el: HTMLElement | null) => void
}) {
  const Icon = slotIconMap[slot]
  return (
    <section
      ref={registerRef}
      data-slot={slot}
      id={`story-${slot}`}
      // Account for the sticky TOC when jumping via anchor or scrollIntoView.
      className="scroll-mt-20 md:scroll-mt-24"
    >
      <div className="flex items-center gap-3 mb-5">
        <span
          aria-hidden
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
          style={{ background: gradientCss }}
        >
          <Icon className="w-4 h-4" />
        </span>
        <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
          {careerStoryBlockSlotLabels[slot][locale]}
        </h3>
      </div>
      <p className="text-[15px] text-gray-300 leading-relaxed whitespace-pre-line">
        {text}
      </p>

      {visuals?.bullets && visuals.bullets[locale]?.length > 0 && (
        <ul className="mt-5 space-y-2.5">
          {visuals.bullets[locale].map((item, i) => (
            <li
              key={i}
              className="flex items-baseline gap-3 text-[14px] text-gray-200 leading-relaxed"
            >
              <span
                aria-hidden
                className="shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full"
                style={{ background: gradientCss }}
              />
              <span className="flex-1 min-w-0">{item}</span>
            </li>
          ))}
        </ul>
      )}

      {visuals?.metrics && visuals.metrics.length > 0 && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
          {visuals.metrics.map((m, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
            >
              <div
                className="text-xl md:text-2xl font-bold tracking-tight"
                style={{
                  backgroundImage: gradientCss,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {m.value}
              </div>
              <div className="mt-1.5 text-[12px] md:text-[13px] text-gray-400 leading-snug">
                {m.label[locale]}
              </div>
            </div>
          ))}
        </div>
      )}

      {visuals?.table && (
        <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-[13px] md:text-[14px]">
            <thead>
              <tr className="bg-white/[0.04]">
                {visuals.table.columns.map((col, i) => (
                  <th
                    key={i}
                    className="text-left px-3 md:px-4 py-2.5 font-semibold text-white/85 border-b border-white/10"
                  >
                    {col[locale]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visuals.table.rows.map((row, i) => {
                const isSelected = visuals.table?.selectedRow === i
                return (
                  <tr
                    key={i}
                    className="border-b border-white/5 last:border-b-0 relative"
                    style={
                      isSelected
                        ? {
                            background: `linear-gradient(90deg, ${gradientCss.replace('linear-gradient(135deg, ', 'rgba(').replace(')', ', 0.18)')} 0%, transparent 100%)`,
                          }
                        : undefined
                    }
                  >
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className={`px-3 md:px-4 py-3 leading-relaxed align-top ${
                          isSelected ? 'text-white font-medium' : 'text-gray-300'
                        }`}
                      >
                        {j === 0 && isSelected ? (
                          <span className="inline-flex items-baseline gap-1.5">
                            <span
                              aria-hidden
                              className="text-amber-300 leading-none"
                              style={{ fontSize: '0.95em' }}
                            >
                              ★
                            </span>
                            <span>{cell[locale]}</span>
                          </span>
                        ) : (
                          cell[locale]
                        )}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {visuals?.diagramKey && (
        <div className="mt-6 rounded-xl border border-white/10 bg-black/40 p-2 sm:p-4 md:p-6 overflow-x-auto">
          {visuals.diagramKey === 'odiya' && <OdiyaArchitectureDiagram />}
          {visuals.diagramKey === 'mohani' && <MohaniArchitectureDiagram />}
          {visuals.diagramKey === 'kocca' && <KoccaArchitectureDiagram />}
          <div className="mt-3 text-[11px] text-gray-500 text-right">
            {locale === 'ko' && '카드의 ‘서버 아키텍처 보기’ 버튼으로 더 크게 열 수 있음'}
            {locale === 'en' && 'Open larger via the “View Server Architecture” button on the card'}
            {locale === 'ja' && 'カードの「サーバーアーキテクチャを見る」ボタンで拡大表示可能'}
          </div>
        </div>
      )}

    </section>
  )
}

/* ────────────── Legacy 3-slot body (about / role / highlights) ────────────── */

function LegacyBody({
  data,
  locale,
  gradientCss,
}: {
  data: { about: Record<Locale, string>; role: Record<Locale, string>; highlights: Record<Locale, string[]> }
  locale: Locale
  gradientCss: string
}) {
  return (
    <div className="px-6 md:px-12 py-10 md:py-14 space-y-12">
      <ReportSection title={ui.about[locale]} icon={FiBriefcase} gradientCss={gradientCss}>
        <p className="text-[15px] text-gray-300 leading-relaxed">{data.about[locale]}</p>
      </ReportSection>

      <ReportSection title={ui.role[locale]} icon={FiTarget} gradientCss={gradientCss}>
        <p className="text-[15px] text-gray-300 leading-relaxed">{data.role[locale]}</p>
      </ReportSection>

      <ReportSection title={ui.highlights[locale]} icon={FiCheckCircle} gradientCss={gradientCss}>
        <ul className="space-y-3">
          {data.highlights[locale].map((item, i) => (
            <li key={i} className="flex items-baseline gap-3 text-[14px] text-gray-300 leading-relaxed">
              <span
                aria-hidden
                className="shrink-0 w-1.5 h-1.5 mt-2 rounded-full"
                style={{ background: gradientCss }}
              />
              <span className="flex-1 min-w-0">{item}</span>
            </li>
          ))}
        </ul>
      </ReportSection>
    </div>
  )
}

function ReportSection({
  title,
  icon: Icon,
  gradientCss,
  children,
}: {
  title: string
  icon: ComponentType<{ className?: string }>
  gradientCss: string
  children: React.ReactNode
}) {
  return (
    <section>
      <div className="flex items-center gap-3 mb-5">
        <span
          aria-hidden
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
          style={{ background: gradientCss }}
        >
          <Icon className="w-4 h-4" />
        </span>
        <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight">{title}</h3>
      </div>
      {children}
    </section>
  )
}
