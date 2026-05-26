'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useI18n } from '@/lib/i18n'

const sections = [
  { id: 'about', label: { ko: 'About', en: 'About', ja: 'About' } },
  { id: 'career', label: { ko: 'Career', en: 'Career', ja: 'Career' } },
  { id: 'projects', label: { ko: 'Projects', en: 'Projects', ja: 'Projects' } },
  { id: 'awards', label: { ko: 'Awards', en: 'Awards', ja: 'Awards' } },
  { id: 'contact', label: { ko: 'Contact', en: 'Contact', ja: 'Contact' } },
]

const localeLabels = { ko: 'KO', en: 'EN', ja: 'JA' } as const

export default function Nav() {
  const { locale, setLocale } = useI18n()
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0a0a0f]/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold text-white tracking-tight hover:text-gray-300 transition-colors">
          Hyeonsang Kim
        </Link>

        <div className="flex items-center gap-6">
          <ul className="hidden md:flex items-center gap-5">
            {sections.map((s) => (
              <li key={s.id}>
                <Link
                  href={isHome ? `#${s.id}` : `/#${s.id}`}
                  className="text-[13px] text-gray-400 hover:text-white transition-colors"
                >
                  {s.label[locale]}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1 border border-white/10 rounded-full px-1 py-0.5">
            {(['ko', 'en', 'ja'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`text-[11px] px-2 py-0.5 rounded-full transition-colors ${
                  locale === l
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {localeLabels[l]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
