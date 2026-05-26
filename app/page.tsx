'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'
import CareerList from '@/components/career/CareerList'
import ProjectList from '@/components/projects/ProjectList'
import dynamic from 'next/dynamic'

const TechStack = dynamic(() => import('@/components/TechStack'), { ssr: false })
const AwardsPapers = dynamic(() => import('@/components/AwardsPapers'), { ssr: false })
const Contact = dynamic(() => import('@/components/Contact'), { ssr: false })

export default function Home() {
  const { t, locale } = useI18n()

  return (
    <>
      {/* Hero + About Me */}
      <section id="about" className="pt-20 pb-16 md:pt-28 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-10 items-start"
        >
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-gray-500 uppercase mb-4">
              {t('intro.subtitle') as string}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
              {t('intro.heading1') as string}
            </h1>
            <p className="text-lg text-gray-500 mb-8">
              {t('intro.heading2') as string}
            </p>
            <div className="space-y-4 text-[15px] text-gray-300 leading-relaxed">
              <p>{t('intro.paragraph1') as string}</p>
              <p>{t('intro.paragraph2') as string}</p>
              <p>{t('intro.paragraph3') as string}</p>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="w-44 h-44 rounded-2xl overflow-hidden border border-white/[0.06]">
              <Image
                src="/images/me.JPEG"
                alt="Hyeonsang Kim"
                width={176}
                height={176}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Tech Stack */}
      <section id="skills" className="py-16 border-t border-white/[0.04]">
        <TechStack />
      </section>

      {/* Career */}
      <div className="border-t border-white/[0.04]">
        <CareerList />
      </div>

      {/* Projects */}
      <div className="border-t border-white/[0.04]">
        <ProjectList />
      </div>

      {/* Awards */}
      <section id="awards" className="py-16 border-t border-white/[0.04]">
        <AwardsPapers />
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 border-t border-white/[0.04]">
        <Contact />
      </section>
    </>
  )
}
