'use client'

import HeroClean from '@/components/HeroClean'
import CareerList from '@/components/career/CareerList'
import ProjectList from '@/components/projects/ProjectList'
import dynamic from 'next/dynamic'

const AwardsPapers = dynamic(() => import('@/components/AwardsPapers'), { ssr: false })
const Contact = dynamic(() => import('@/components/Contact'), { ssr: false })

export default function Home() {
  return (
    <>
      <HeroClean />

      <section id="career">
        <CareerList />
      </section>

      <section id="projects">
        <ProjectList />
      </section>

      <section id="awards" className="py-16">
        <AwardsPapers />
      </section>

      <section id="contact" className="py-16">
        <Contact />
      </section>
    </>
  )
}
