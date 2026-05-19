'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiBriefcase, FiTarget, FiCheckCircle } from 'react-icons/fi'
import { useI18n, type Locale } from '@/lib/i18n'
import { careerReports, type CareerReportKey } from '@/data/career-reports'

const ui: Record<string, Record<Locale, string>> = {
  eyebrow: { ko: '경력 리포트', en: 'Career Report', ja: 'キャリアレポート' },
  about: { ko: 'About', en: 'About', ja: 'About' },
  role: { ko: 'My Role', en: 'My Role', ja: 'My Role' },
  highlights: { ko: 'Highlights', en: 'Highlights', ja: 'Highlights' },
}

const t = (key: keyof typeof ui, locale: Locale) => ui[key][locale] ?? ui[key].en

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

  const report = reportKey ? careerReports[reportKey] : null

  return createPortal(
    <AnimatePresence>
      {report && (
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
            <button
              onClick={onClose}
              aria-label="close"
              className="absolute top-4 right-4 md:top-5 md:right-5 z-20 p-2 rounded-full bg-black/50 hover:bg-white/15 border border-white/15 text-gray-200 hover:text-white transition-colors backdrop-blur"
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
            <div className="px-6 md:px-12 py-10 md:py-14 space-y-12">
              <ReportSection title={t('about', locale)} icon={FiBriefcase} gradientCss={gradientCss}>
                <p className="text-[15px] text-gray-300 leading-relaxed">{report.about[locale]}</p>
              </ReportSection>

              <ReportSection title={t('role', locale)} icon={FiTarget} gradientCss={gradientCss}>
                <p className="text-[15px] text-gray-300 leading-relaxed">{report.role[locale]}</p>
              </ReportSection>

              <ReportSection title={t('highlights', locale)} icon={FiCheckCircle} gradientCss={gradientCss}>
                <ul className="space-y-3">
                  {report.highlights[locale].map((item, i) => (
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

function ReportSection({
  title,
  icon: Icon,
  gradientCss,
  children,
}: {
  title: string
  icon: React.ComponentType<{ className?: string }>
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
