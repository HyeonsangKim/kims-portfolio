'use client'
import { motion } from 'framer-motion'
import { useI18n, Locale } from '@/lib/i18n'

const locales: { code: Locale; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ko', label: 'KO' },
  { code: 'ja', label: 'JA' },
]

export default function LanguageToggle() {
  const { locale, setLocale } = useI18n()

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="fixed top-6 right-6 z-50 flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
    >
      {locales.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLocale(code)}
          className={`relative px-3 py-1.5 text-xs font-bold tracking-wider rounded-full transition-all duration-300
            ${locale === code
              ? 'text-white'
              : 'text-gray-500 hover:text-gray-300'
            }
          `}
        >
          {locale === code && (
            <motion.div
              layoutId="locale-bg"
              className="absolute inset-0 bg-white/10 border border-white/20 rounded-full"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{label}</span>
        </button>
      ))}
    </motion.div>
  )
}
