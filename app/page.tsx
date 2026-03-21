'use client'
import Hero from '@/components/Hero'
import Intro from '@/components/Intro'
import FloatingDock from '@/components/FloatingDock'
import LanguageToggle from '@/components/LanguageToggle'
import dynamic from 'next/dynamic'

const Orb = dynamic(() => import('@/components/Orb'), { ssr: false })
const TechStack = dynamic(() => import('@/components/TechStack'), { ssr: false })
const ProjectShowcase = dynamic(() => import('@/components/ProjectShowecase'), { ssr: false })
const FeaturedProjects = dynamic(() => import('@/components/FeaturedProjects'), { ssr: false })
const Contact = dynamic(() => import('@/components/Contact'), { ssr: false })

export default function Home() {
  return (
    <main className="relative bg-black min-h-screen text-white selection:bg-purple-500/30 overflow-x-hidden">
      {/* 배경 요소 */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-40">
           <Orb hoverIntensity={0.4} rotateOnHover={true} />
        </div>
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
      </div>

      <LanguageToggle />

      <div className="relative z-10 pb-32">

        <div id="home">
            <Hero />
        </div>

        <div className="h-[15vh]" />

        <Intro />

        <div className="h-[20vh]" />

        <section id="skills">
            <TechStack />
        </section>

        <div className="h-[20vh]" />

        <section id="career">
            <ProjectShowcase />
        </section>

        <div className="h-[20vh]" />

        <section id="projects">
            <FeaturedProjects />
        </section>

        <div className="h-[20vh]" />

        <section id="contact">
            <Contact />
        </section>

        <footer className="h-40 flex items-center justify-center text-gray-600 text-sm border-t border-white/5">
          <p>© 2025 Hyeonsang Kim. Built with Next.js 16 & React.</p>
        </footer>
      </div>

      <FloatingDock />
    </main>
  )
}
