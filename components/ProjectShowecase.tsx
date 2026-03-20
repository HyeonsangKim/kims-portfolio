'use client'
import { useRef, useState, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    id: 1,
    company: "Soundmind",
    role: "Frontend & Backend",
    period: "2025.02 - Present",
    projects: [
      {
        name: "Mohani (Parental Control)",
        desc: "학부모 대상 자녀 스마트폰 사용 관리 앱으로, 앱 차단·콘텐츠 필터링·사용 통계를 제공하는 플랫폼입니다.",
        highlights: ["유튜브 쇼츠, 카톡 숏폼 등 10개+ 앱 콘텐츠 필터링", "DNS VPN + Accessibility Service 듀얼 아키텍처", "Spring Boot + Redis SSO 통합 인증 서버", "Docker + Nginx + SSL 자동화 배포"],
        stack: ['React Native', 'Android Native', 'Spring Boot', 'Redis', 'Docker']
      },
      {
        name: "ODYA (Location)",
        desc: "제한된 네트워크 환경에서 IPC 통신과 Redis를 활용한 고가용성 위치 추적 시스템입니다.",
        highlights: ["Android Native Module & IPC 통신", "Redis 기반 실시간 위치 데이터 파이프라인", "FCM 활용 자녀-부모 간 양방향 푸시 알림", "React Native CLI 크로스 플랫폼 배포"],
        stack: ['React Native', 'Spring Boot', 'Redis', 'FCM', 'Native Modules']
      },
      {
        name: "KOCCA 세종어학당 평가 시스템",
        desc: "KOCCA 국가 과제로, 학생 음성 녹음 제출 및 교수진 평가·피드백 워크플로우를 지원하는 교육용 웹 플랫폼입니다.",
        highlights: ["Next.js 15 SSR 아키텍처", "Prisma & PostgreSQL 스키마 설계", "Server Actions 기반 파일 처리", "Nginx 리버스 프록시 및 SSL 보안 강화"],
        stack: ['Next.js 15', 'TypeScript', 'Prisma', 'PostgreSQL', 'Nginx']
      },
      {
        name: "Launcher (Offline)",
        desc: "인터넷이 없는 환경에서도 S3와 로컬 파일 시스템을 연동해 대용량 콘텐츠를 재생하는 런처입니다.",
        highlights: ["Android 커스텀 런처 및 키오스크 모드", "대용량 비디오 청크 다운로드/캐싱", "S3 API 콘텐츠 버전 관리"],
        stack: ['React Native', 'Amazon S3', 'FileSystem', 'Android']
      },
    ],
    color: "from-blue-500 to-cyan-400"
  },
  {
    id: 2,
    company: "Purple Academy",
    role: "Frontend Developer",
    period: "2023.06 - 2024.06",
    projects: [
      {
        name: "LMS App Migration",
        desc: "5,000여 개의 웹 콘텐츠를 제작하고, React Native로 마이그레이션 하고, GSAP/SVG로 인터랙티브한 경험을 구현했습니다.",
        highlights: ["5000개가 넘는 유아용 영아 학습 컨턴츠 웹 제작","Web → React Native 앱 마이그레이션", "SVG Path 활용 인터랙티브 학습 구현"],
        stack: ['React Native', 'React', 'GSAP', 'TypeScript']
      }
    ],
    color: "from-purple-500 to-pink-400"
  },
  {
    id: 3,
    company: "IEZLAB",
    role: "Backend Developer",
    period: "2022.04 - 2023.03",
    projects: [
      {
        name: "R&D Visualization",
        desc: "자바 스프링과 Jquery, Thyme-leaf등을 활용해 웹을 제작 하였습니다.",
        highlights: ["Jquery, Spring을 활용한 와인 이커머스 제작", "Spring Boot/JPA 사내 ERP 구축", "레거시 데이터 시각화"],
        stack: ['React', 'Canvas API', 'Spring Boot', 'JPA']
      }
    ],
    color: "from-orange-400 to-amber-500"
  }
]

export default function ProjectShowcase() {
  const containerRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [tabState, setTabState] = useState<{ [key: number]: number }>({ 1: 0, 2: 0, 3: 0 })

  useLayoutEffect(() => {
    // ✅ 모바일/데스크탑 분기 처리 (모바일 성능 최적화)
    const mm = gsap.matchMedia()

    const ctx = gsap.context(() => {
      // 1024px 이상(데스크탑)에서만 Pinning & Stacking 효과 적용
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${experiences.length * 100}%`,
            pin: true,
            scrub: 1,
            onUpdate: (self) => {
              const index = Math.min(
                Math.round(self.progress * (experiences.length - 1)),
                experiences.length - 1
              )
              setActiveCardIndex(index)
            }
          }
        })

        cardsRef.current.forEach((card, i) => {
          if (i === 0) return
          
          tl.to(cardsRef.current[i - 1], {
            scale: 0.9,
            opacity: 0,
            yPercent: -10,
            duration: 1,
            ease: "power2.inOut"
          }, ">")

          tl.from(card, {
            yPercent: 120,
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power2.inOut"
          }, "<")
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    // ✅ 모바일: min-h-[100dvh] 및 일반 스크롤 / 데스크탑: h-screen 고정
    <section ref={containerRef} className="relative min-h-[100dvh] lg:h-screen text-white selection:bg-white/20 py-20 lg:py-0">
      
      <div className="max-w-7xl mx-auto h-full px-6 flex flex-col lg:flex-row items-center relative z-10">
        
        {/* --- Left Text Panel --- */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center h-auto lg:h-full z-10 mb-12 lg:mb-0 lg:pointer-events-none sticky top-24 lg:static">
          <div className="lg:pr-20 space-y-4 lg:space-y-8 text-center lg:text-left">
            <h2 className="text-4xl lg:text-7xl font-bold tracking-tighter leading-[1.1] drop-shadow-2xl">
              Career <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${experiences[activeCardIndex].color} transition-all duration-700`}>
                Journey.
              </span>
            </h2>
            
            {/* 데스크탑에서만 보이는 추가 설명 */}
            <div className="hidden lg:block relative h-24 overflow-hidden">
               {experiences.map((exp, i) => (
                  <p 
                    key={exp.id}
                    className={`absolute top-0 left-0 text-xl lg:text-2xl text-slate-300 font-light leading-relaxed transition-all duration-700 transform
                      ${i === activeCardIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                    `}
                  >
                   {i === 0 && "Leading offline-first mobile & web solutions."}
                   {i === 1 && "Innovating EdTech with interactive UX."}
                   {i === 2 && "R&D and Full-stack system architecture."}
                  </p>
               ))}
            </div>
            
            {/* 데스크탑용 인디케이터 */}
            <div className="hidden lg:flex gap-2">
              {experiences.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ease-out 
                  ${i <= activeCardIndex ? `w-12 bg-gradient-to-r ${experiences[activeCardIndex].color}` : 'w-2 bg-white/10'}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* --- Right Card Panel --- */}
        <div className="w-full lg:w-1/2 relative h-auto lg:h-full flex flex-col lg:items-center lg:justify-center lg:perspective-[2000px] gap-8 lg:gap-0">
            {experiences.map((exp, i) => {
              const currentProjectIndex = tabState[exp.id] || 0
              const currentProject = exp.projects[currentProjectIndex]

              return (
                <div 
                  key={exp.id}
                  ref={(el) => { cardsRef.current[i] = el }}
                  // ✅ 모바일: relative (세로 나열) / 데스크탑: absolute (겹침)
                  className={`
                    w-full relative 
                    lg:absolute lg:inset-0 lg:max-w-[500px] lg:h-[620px] lg:m-auto
                  `}
                  style={{ zIndex: i }}
                >
                  <div className="w-full h-full rounded-[2rem] p-[1px] bg-gradient-to-b from-white/15 to-transparent backdrop-blur-md shadow-2xl overflow-hidden ring-1 ring-white/10">
                    <div className="relative h-full w-full bg-[#0a0a0a]/95 rounded-[31px] p-6 sm:p-8 lg:p-10 flex flex-col hover:bg-[#0f0f0f] transition-colors duration-500">
                      
                      {/* Glow Effect */}
                      <div className={`absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br ${exp.color} opacity-20 blur-[90px] rounded-full pointer-events-none`} />

                      {/* Header */}
                      <div className="relative z-10 mb-6 border-b border-white/5 pb-4">
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 tracking-widest uppercase py-1 px-3 rounded-full bg-white/5">
                             {exp.period}
                           </span>
                           <span className="text-2xl sm:text-3xl font-bold text-white/5 font-mono">0{exp.id}</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">{exp.company}</h3>
                        <p className={`text-sm font-medium bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                          {exp.role}
                        </p>
                      </div>

                      {/* TABS (프로젝트 2개 이상일 때) */}
                      {exp.projects.length > 1 && (
                        <div className="relative z-10 flex flex-wrap gap-1 p-1 mb-6 bg-white/5 rounded-xl border border-white/5">
                          {exp.projects.map((proj, idx) => (
                            <button
                              key={idx}
                              onClick={() => setTabState(prev => ({ ...prev, [exp.id]: idx }))}
                              className={`flex-1 min-w-[60px] text-[10px] sm:text-xs font-bold py-2 rounded-lg transition-all duration-300
                                ${currentProjectIndex === idx 
                                  ? `bg-slate-800 text-white shadow-lg` 
                                  : 'text-slate-500 hover:text-slate-300'}
                              `}
                            >
                              {proj.name.split(' ')[0]}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Content */}
                      <div className="relative z-10 flex-grow flex flex-col gap-4 animate-fadeIn">
                        {exp.projects.length > 1 && (
                            <h4 className="text-lg sm:text-xl font-bold text-slate-200">
                                {currentProject.name}
                            </h4>
                        )}

                        <p className="text-slate-400 leading-relaxed text-sm min-h-[40px] lg:min-h-[60px]">
                          {currentProject.desc}
                        </p>
                        
                        <ul className="space-y-2 mt-2">
                          {currentProject.highlights.map((item, idx) => (
                            <li key={idx} className="flex items-start text-xs sm:text-[13px] text-slate-300">
                              <span className={`flex-shrink-0 w-1.5 h-1.5 mt-1.5 mr-2.5 rounded-full bg-gradient-to-r ${exp.color}`} />
                              <span className="flex-1 leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech Stack */}
                      <div className="relative z-10 mt-6 pt-6 border-t border-white/5">
                        <div className="flex flex-wrap gap-2">
                          {currentProject.stack.map(s => (
                            <span key={s} className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-white/5 text-slate-400 border border-white/5">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}