'use client'

import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiX,
  FiExternalLink,
  FiTarget,
  FiZap,
  FiCpu,
  FiLayers,
  FiClock,
  FiBookOpen,
  FiBarChart2,
  FiCheckCircle,
  FiRefreshCw,
  FiImage,
  FiPlay,
} from 'react-icons/fi'
import type { Project, Gradient } from '@/data/projects'
import { pickL, type ProjectReport } from '@/data/reports'
import { useI18n, type Locale } from '@/lib/i18n'

const gradientMap: Record<Gradient, string> = {
  'from-violet-500 to-fuchsia-500': 'linear-gradient(135deg, #8b5cf6, #d946ef)',
  'from-amber-500 to-orange-500': 'linear-gradient(135deg, #f59e0b, #f97316)',
  'from-emerald-500 to-teal-500': 'linear-gradient(135deg, #10b981, #14b8a6)',
  'from-sky-500 to-cyan-500': 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
  'from-sky-500 to-blue-600': 'linear-gradient(135deg, #0ea5e9, #2563eb)',
  'from-rose-500 to-pink-500': 'linear-gradient(135deg, #f43f5e, #ec4899)',
  'from-fuchsia-500 to-purple-600': 'linear-gradient(135deg, #d946ef, #9333ea)',
}

const ui: Record<string, Record<Locale, string>> = {
  caseStudy: { en: 'Case Study', ko: '케이스 스터디', ja: 'ケーススタディ' },
  fullReport: {
    en: 'Full report on wigtn.com ↗',
    ko: 'wigtn.com 전체 리포트 ↗',
    ja: 'wigtn.comの完全版レポート ↗',
  },
  problem: { en: 'The Problem', ko: '문제', ja: '課題' },
  solution: { en: 'The Solution', ko: '해결', ja: 'ソリューション' },
  metrics: { en: 'Key Metrics', ko: '핵심 지표', ja: '主要指標' },
  stack: { en: 'Tech Stack', ko: '기술 스택', ja: '技術スタック' },
  architecture: { en: 'Architecture', ko: '아키텍처', ja: 'アーキテクチャ' },
  visuals: { en: 'Architecture & Visuals', ko: '아키텍처 & 시각자료', ja: 'アーキテクチャ・ビジュアル' },
  deepDives: { en: 'Technical Deep Dives', ko: '기술 심화', ja: '技術ディープダイブ' },
  timeline: { en: 'Timeline', ko: '타임라인', ja: 'タイムライン' },
  lessons: { en: 'Lessons Learned', ko: '배운 점', ja: '学び' },
  whatWorked: { en: 'What Worked', ko: '잘된 것', ja: 'うまくいったこと' },
  whatChange: {
    en: "What We'd Change",
    ko: '바꿀 것',
    ja: '変えたいこと',
  },
  numbers: { en: 'By the Numbers', ko: '숫자로 보기', ja: '数字で見る' },
}

const t = (key: keyof typeof ui, locale: Locale) => ui[key][locale] ?? ui[key].en

interface Section {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  show: boolean
}

export default function ProjectReportOverlay({
  project,
  report,
  onClose,
}: {
  project: Project
  report: ProjectReport
  onClose: () => void
}) {
  const { locale } = useI18n()

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const gradient = gradientMap[project.gradient] ?? gradientMap['from-violet-500 to-fuchsia-500']

  // Resolve localized content once (English fallback baked in).
  const oneLiner = pickL(report.oneLiner, locale) ?? ''
  const problem = pickL(report.problem, locale)
  const solution = pickL(report.solution, locale)
  const worked = pickL(report.lessons?.worked, locale)
  const wouldChange = pickL(report.lessons?.wouldChange, locale)

  // visuals 섹션은 hero 비디오(youtube/video) 또는 갤러리 이미지 중 하나라도 있으면 노출.
  // → 다른 카드는 비디오를 accordion 안에만 보여줘서 "리포트엔 왜 없지?"라는 포맷 불일치가 생겼던 것을 해결.
  const hasHeroMedia = project.media.type === 'youtube' || project.media.type === 'video'
  const hasVisuals = hasHeroMedia || !!project.gallery?.length

  const sections: Section[] = useMemo(
    () => [
      { id: 'visuals', title: t('visuals', locale), icon: FiImage, show: hasVisuals },
      { id: 'problem', title: t('problem', locale), icon: FiTarget, show: !!problem?.length },
      { id: 'solution', title: t('solution', locale), icon: FiZap, show: !!solution?.length },
      { id: 'metrics', title: t('metrics', locale), icon: FiBarChart2, show: !!report.metrics?.length },
      { id: 'stack', title: t('stack', locale), icon: FiCpu, show: !!report.techStack?.length },
      { id: 'architecture', title: t('architecture', locale), icon: FiLayers, show: !!report.architecture?.length },
      { id: 'deep-dives', title: t('deepDives', locale), icon: FiBookOpen, show: !!report.deepDives?.length },
      { id: 'timeline', title: t('timeline', locale), icon: FiClock, show: !!report.timeline?.length },
      { id: 'lessons', title: t('lessons', locale), icon: FiCheckCircle, show: !!(worked?.length || wouldChange?.length) },
      { id: 'numbers', title: t('numbers', locale), icon: FiBarChart2, show: !!report.byTheNumbers?.length },
    ],
    [project.gallery, report, locale, problem, solution, worked, wouldChange, hasVisuals],
  )
  const visibleSections = sections.filter((s) => s.show)

  if (typeof document === 'undefined') return null

  const overlay = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative mx-auto my-4 md:my-8 w-full max-w-5xl rounded-2xl border border-white/10 bg-[#0a0a0f] shadow-2xl"
        >
          {/* Desktop: close button anchored to the card's top-right corner.
              Mobile users close via the bottom-of-modal action rendered after
              the body — keeps the affordance reachable when the case study
              scrolls past the viewport. */}
          <button
            onClick={onClose}
            aria-label="close"
            className="hidden md:flex absolute md:top-5 md:right-5 z-20 p-2 rounded-full bg-black/50 hover:bg-white/15 border border-white/15 text-gray-200 hover:text-white transition-colors backdrop-blur"
          >
            <FiX className="w-5 h-5" />
          </button>

          {/* Hero */}
          <header className="relative px-6 md:px-12 pr-16 md:pr-20 pt-10 md:pt-14 pb-8 md:pb-10 overflow-hidden rounded-t-2xl">
            <div
              aria-hidden
              className="absolute inset-0 opacity-20"
              style={{ background: gradient }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at top, rgba(255,255,255,0.08), transparent 60%)',
              }}
            />
            <div className="relative">
              <div className="text-[11px] uppercase tracking-[0.25em] text-gray-400 mb-3">
                {t('caseStudy', locale)} · {project.num}
              </div>
              <h2
                className="text-4xl md:text-6xl font-bold mb-4 tracking-tight"
                style={{
                  backgroundImage: gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {project.title}
              </h2>
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl">
                {oneLiner}
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-6">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-xs text-gray-200 transition-colors"
                  >
                    <FiExternalLink className="w-3 h-3" />
                    {link.label}
                  </a>
                ))}
                {report.sourceUrl && (
                  <a
                    href={report.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] hover:bg-white/10 text-xs text-gray-400 transition-colors"
                  >
                    {t('fullReport', locale)}
                  </a>
                )}
              </div>
            </div>
          </header>

          {/* Table of contents */}
          {visibleSections.length > 1 && (
            <nav className="px-6 md:px-12 py-4 border-y border-white/10 bg-white/[0.02]">
              <div className="flex flex-wrap gap-2">
                {visibleSections.map((s) => {
                  const Icon = s.icon
                  return (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        document
                          .getElementById(s.id)
                          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      <Icon className="w-3 h-3" />
                      {s.title}
                    </a>
                  )
                })}
              </div>
            </nav>
          )}

          {/* Body */}
          <div className="px-6 md:px-12 py-10 md:py-14 space-y-14">
            {hasVisuals && (
              <Section id="visuals" title={t('visuals', locale)} icon={FiImage} gradient={gradient}>
                {/* Hero 비디오 — 비디오를 가진 프로젝트는 리포트 첫 자리에 풀폭으로 보여줘서
                    accordion / 리포트 사이 포맷 일치를 보장한다. */}
                {hasHeroMedia && (
                  <div className="mb-4">
                    <HeroMedia project={project} />
                  </div>
                )}
                {project.gallery && project.gallery.length > 0 && (
                  <div
                    className={`grid gap-4 ${
                      project.gallery.length === 1 ? 'grid-cols-1' : 'sm:grid-cols-2'
                    }`}
                  >
                    {project.gallery.map((img, i) => (
                      <figure
                        key={i}
                        className="rounded-xl border border-white/10 bg-black/40 overflow-hidden flex flex-col"
                      >
                        {/* Uniform 16:9 frame with object-contain — diagrams stay readable, all cells align. */}
                        <div className="aspect-video bg-black/60 flex items-center justify-center p-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img.src}
                            alt={img.alt}
                            loading="lazy"
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        {img.caption && (
                          <figcaption className="px-4 py-3 text-[12px] text-gray-400 leading-snug border-t border-white/5">
                            {img.caption}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                )}
              </Section>
            )}

            {problem && problem.length > 0 && (
              <Section id="problem" title={t('problem', locale)} icon={FiTarget} gradient={gradient}>
                <ul className="space-y-3">
                  {problem.map((p, i) => (
                    <li
                      key={i}
                      className="flex items-baseline gap-3 text-[15px] text-gray-300 leading-relaxed"
                    >
                      <span aria-hidden className="shrink-0 text-rose-400/80">
                        —
                      </span>
                      <span className="flex-1 min-w-0">{p}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {solution && solution.length > 0 && (
              <Section id="solution" title={t('solution', locale)} icon={FiZap} gradient={gradient}>
                <ul className="space-y-3">
                  {solution.map((s, i) => (
                    <li
                      key={i}
                      className="flex items-baseline gap-3 text-[15px] text-gray-300 leading-relaxed"
                    >
                      <span aria-hidden className="shrink-0 text-emerald-400/80">
                        →
                      </span>
                      <span className="flex-1 min-w-0">{s}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {report.metrics && report.metrics.length > 0 && (
              <Section id="metrics" title={t('metrics', locale)} icon={FiBarChart2} gradient={gradient}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {report.metrics.map((m) => (
                    <div
                      key={m.value}
                      className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-5 text-center"
                    >
                      <div
                        className="text-3xl md:text-4xl font-bold tracking-tight"
                        style={{
                          backgroundImage: gradient,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {m.value}
                      </div>
                      <div className="text-[11px] uppercase tracking-widest text-gray-500 mt-2">
                        {pickL(m.label, locale)}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {report.techStack && report.techStack.length > 0 && (
              <Section id="stack" title={t('stack', locale)} icon={FiCpu} gradient={gradient}>
                <div className="grid gap-5 md:grid-cols-3">
                  {report.techStack.map((group, gi) => (
                    <div
                      key={gi}
                      className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
                    >
                      <div className="text-[11px] uppercase tracking-widest text-gray-500 mb-3">
                        {pickL(group.category, locale)}
                      </div>
                      <ul className="space-y-1.5">
                        {group.items.map((item) => (
                          <li key={item} className="text-sm text-gray-200">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {report.architecture && report.architecture.length > 0 && (
              <Section id="architecture" title={t('architecture', locale)} icon={FiLayers} gradient={gradient}>
                <div className="space-y-4">
                  {report.architecture.map((block, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
                    >
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-[10px] font-mono text-gray-500">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h4 className="text-base font-semibold text-white">
                          {pickL(block.title, locale)}
                        </h4>
                      </div>
                      {block.image && (
                        <figure className="ml-7 mb-3 rounded-lg overflow-hidden border border-white/10 bg-black/40">
                          <img
                            src={block.image.src}
                            alt={block.image.alt}
                            loading="lazy"
                            className="w-full h-auto object-contain p-2 sm:p-4"
                          />
                          {block.image.caption && (
                            <figcaption className="px-3 py-2 text-[11px] text-gray-500 border-t border-white/5">
                              {pickL(block.image.caption, locale)}
                            </figcaption>
                          )}
                        </figure>
                      )}
                      <p className="text-sm text-gray-400 leading-relaxed pl-7">
                        {pickL(block.body, locale)}
                      </p>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {report.deepDives && report.deepDives.length > 0 && (
              <Section
                id="deep-dives"
                title={t('deepDives', locale)}
                icon={FiBookOpen}
                gradient={gradient}
              >
                <div className="grid gap-3 md:grid-cols-2">
                  {report.deepDives.map((d, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-white/10 bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors"
                    >
                      <h5 className="text-sm font-semibold text-white mb-1.5">
                        {pickL(d.title, locale)}
                      </h5>
                      <p className="text-[13px] text-gray-400 leading-relaxed">
                        {pickL(d.body, locale)}
                      </p>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {report.timeline && report.timeline.length > 0 && (
              <Section id="timeline" title={t('timeline', locale)} icon={FiClock} gradient={gradient}>
                <ol className="relative border-l border-white/10 ml-2 space-y-5">
                  {report.timeline.map((tl, i) => (
                    <li key={i} className="pl-5 relative">
                      <span
                        aria-hidden
                        className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full"
                        style={{ background: gradient }}
                      />
                      <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="text-xs font-mono text-fuchsia-300/80">{tl.time}</span>
                        <h5 className="text-sm font-semibold text-white">
                          {pickL(tl.title, locale)}
                        </h5>
                      </div>
                      {tl.body && (
                        <p className="text-[13px] text-gray-400 mt-1 leading-relaxed">
                          {pickL(tl.body, locale)}
                        </p>
                      )}
                    </li>
                  ))}
                </ol>
              </Section>
            )}

            {(worked?.length || wouldChange?.length) && (
              <Section
                id="lessons"
                title={t('lessons', locale)}
                icon={FiCheckCircle}
                gradient={gradient}
              >
                <div className="grid gap-4 md:grid-cols-2">
                  {worked && worked.length > 0 && (
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-300 mb-3">
                        <FiCheckCircle className="w-3.5 h-3.5" />
                        {t('whatWorked', locale)}
                      </div>
                      <ul className="space-y-2">
                        {worked.map((w, i) => (
                          <li
                            key={i}
                            className="flex items-baseline gap-2 text-[13px] text-gray-300 leading-relaxed"
                          >
                            <span aria-hidden className="shrink-0 text-emerald-400/80">
                              ✓
                            </span>
                            <span className="flex-1 min-w-0">{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {wouldChange && wouldChange.length > 0 && (
                    <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-5">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-300 mb-3">
                        <FiRefreshCw className="w-3.5 h-3.5" />
                        {t('whatChange', locale)}
                      </div>
                      <ul className="space-y-2">
                        {wouldChange.map((w, i) => (
                          <li
                            key={i}
                            className="flex items-baseline gap-2 text-[13px] text-gray-300 leading-relaxed"
                          >
                            <span aria-hidden className="shrink-0 text-amber-400/80">
                              ↻
                            </span>
                            <span className="flex-1 min-w-0">{w}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Section>
            )}

            {report.byTheNumbers && report.byTheNumbers.length > 0 && (
              <Section id="numbers" title={t('numbers', locale)} icon={FiBarChart2} gradient={gradient}>
                <div className="rounded-xl border border-white/10 overflow-hidden">
                  <table className="w-full text-sm">
                    <tbody>
                      {report.byTheNumbers.map((row, i) => (
                        <tr
                          key={i}
                          className={i % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'}
                        >
                          <td className="px-4 py-2.5 text-gray-400">
                            {pickL(row.label, locale)}
                          </td>
                          <td className="px-4 py-2.5 text-right font-mono text-white">
                            {row.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>
            )}

            {/* Bottom-of-modal close action — primary affordance on mobile, a
                redundant fallback alongside the top-right X on desktop. */}
            <div className="pt-2 flex justify-center">
              <button
                onClick={onClose}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 md:py-2.5 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.1] text-sm text-gray-200 hover:text-white transition-colors"
              >
                <FiX className="w-4 h-4" />
                <span>
                  {locale === 'ko'
                    ? '닫기'
                    : locale === 'ja'
                      ? '閉じる'
                      : 'Close'}
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )

  return createPortal(overlay, document.body)
}

/**
 * Hero media slot inside the report's visuals section. Mirrors the embed
 * pattern used in ProjectAccordion's MediaEmbed so a viewer sees the same
 * video in either entry point — fixes the "report format looks different"
 * feedback for cards like WIGTN FLAKE that lead with a YouTube demo.
 */
function HeroMedia({ project }: { project: Project }) {
  const [ytLoaded, setYtLoaded] = useState(false)
  const m = project.media

  if (m.type === 'youtube') {
    return (
      <div className="rounded-xl overflow-hidden border border-white/10 bg-black aspect-video">
        {!ytLoaded ? (
          <button
            type="button"
            onClick={() => setYtLoaded(true)}
            className="relative w-full h-full group cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://img.youtube.com/vi/${m.videoId}/hqdefault.jpg`}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
              <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FiPlay className="w-6 h-6 text-black ml-0.5" />
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
  }

  if (m.type === 'video') {
    return (
      <div className="rounded-xl overflow-hidden border border-white/10 bg-black aspect-video">
        {/* Demo video — no speech, captions not applicable */}
        <video
          src={m.src}
          controls
          playsInline
          preload="none"
          className="w-full h-full object-cover"
        />
      </div>
    )
  }

  return null
}

function Section({
  id,
  title,
  icon: Icon,
  gradient,
  children,
}: {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  gradient: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-5">
        <span
          aria-hidden
          className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
          style={{ background: gradient }}
        >
          <Icon className="w-4 h-4" />
        </span>
        <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight">{title}</h3>
      </div>
      {children}
    </section>
  )
}
