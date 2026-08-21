'use client'

import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'

const intro = {
  ko: 'AI 프로덕트 엔지니어 · 풀스택 엔지니어',
  en: 'AI Product Engineer · Full-Stack Engineer',
  ja: 'AIプロダクトエンジニア · フルスタックエンジニア',
}

const sub = {
  ko: 'Soundmind에서 OEM 사전탑재 서비스와 MX팀을 리딩했고, 현재 WIGTN에서 AI-native 워크플로우와 실제 AI 시스템을 연구·개발합니다.',
  en: 'Previously led the MX team and OEM pre-installed services at Soundmind. Now researching and building AI-native workflows and production AI systems with WIGTN.',
  ja: 'SoundmindでMXチームとOEM事前搭載サービスをリードし、現在はWIGTNでAIネイティブなワークフローと実環境向けAIシステムを研究・開発しています。',
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
