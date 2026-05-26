'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'

const intro = {
  ko: 'MX 팀 리드 · 풀스택 엔지니어',
  en: 'MX Team Lead · Full-Stack Engineer',
  ja: 'MXチームリード · フルスタックエンジニア',
}

const sub = {
  ko: 'Soundmind에서 OEM 사전탑재 서비스를 리딩하고, WIGTN 크루에서 AI 워크플로우를 실험합니다.',
  en: 'Leading OEM pre-installed services at Soundmind. Experimenting with AI workflows at WIGTN crew.',
  ja: 'SoundmindでOEM事前搭載サービスをリード。WIGTNクルーでAIワークフローを実験中。',
}

export default function HeroClean() {
  const { locale } = useI18n()
  return (
    <section id="about" className="pt-24 pb-16 md:pt-32 md:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Hyeonsang Kim
        </h1>
        <p className="text-lg text-gray-400 mb-3">{intro[locale]}</p>
        <p className="text-[15px] text-gray-500 leading-relaxed max-w-xl">
          {sub[locale]}
        </p>
      </motion.div>
    </section>
  )
}
