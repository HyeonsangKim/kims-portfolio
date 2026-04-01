'use client'
import { useRef, useState, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useI18n, Locale } from '@/lib/i18n'

gsap.registerPlugin(ScrollTrigger)

type L = Record<Locale, string>
type LA = Record<Locale, string[]>

const experiences = [
  {
    id: 1,
    company: "Soundmind",
    role: "Frontend & Backend",
    period: "2025.02 - Present",
    tagline: {
      ko: 'Leading offline-first mobile & web solutions.',
      en: 'Leading offline-first mobile & web solutions.',
      ja: 'オフラインファーストのモバイル＆Webソリューションをリード。',
    } as L,
    projects: [
      {
        name: "Mohani (Parental Control)",
        desc: {
          ko: '학부모 대상 자녀 스마트폰 사용 관리 앱으로, Samsung Knox Firewall API를 활용한 앱 제어와 사용 통계를 제공하는 플랫폼입니다.',
          en: 'Parental device management platform with app control powered by Samsung Knox Firewall API, real-time remote device control, and usage statistics.',
          ja: '保護者向けの子供スマートフォン管理アプリ。Samsung Knox Firewall APIを活用したアプリ制御と使用統計を提供するプラットフォームです。',
        } as L,
        highlights: {
          ko: ["Samsung Knox Firewall API를 활용한 앱 제어 시스템 구축", "4-tier 시스템 설계 (SSO + Business Server + Parent App + Child App)", "FCM 기반 동기식 명령/응답 패턴으로 실시간 원격 디바이스 제어", "Docker + Nginx + SSL 자동화 배포 파이프라인"],
          en: ["App control system using Samsung Knox Firewall API", "Designed 4-tier system (SSO + Business Server + Parent App + Child App) from scratch", "FCM-based synchronous command/response for real-time remote device control", "Docker + Nginx + SSL automated deployment pipeline"],
          ja: ["Samsung Knox Firewall APIを活用したアプリ制御システム構築", "4-tierシステム設計 (SSO + Business Server + Parent App + Child App)", "FCMベースの同期式コマンド/レスポンスでリアルタイムリモートデバイス制御", "Docker + Nginx + SSL自動化デプロイパイプライン"],
        } as LA,
        stack: ['React Native', 'Android Native', 'Spring Boot', 'Knox SDK', 'Docker']
      },
      {
        name: "SSO Auth Server",
        desc: {
          ko: 'MSA 기반 SSO 인증 서버를 처음부터 설계·구축. JWT 듀얼 토큰(Access + Refresh) + Token Rotation으로 3개 이상의 내부 제품의 인증 백본으로 운영 중.',
          en: 'Designed and built MSA-based SSO authentication server from scratch. JWT dual-token (Access + Refresh) with Token Rotation, serving as auth backbone for 3+ internal products.',
          ja: 'MSAベースのSSO認証サーバーをゼロから設計・構築。JWTデュアルトークン(Access + Refresh) + Token Rotationで3つ以上の社内プロダクトの認証基盤として運用中。',
        } as L,
        highlights: {
          ko: ["JWT Access + Refresh 듀얼 토큰 + Token Rotation 설계", "Webhook 기반 SSO ↔ 다운스트림 서버 이벤트 동기화", "Flyway 마이그레이션으로 멀티 서비스 DB 스키마 관리"],
          en: ["JWT dual-token (Access + Refresh) with Token Rotation", "Webhook-based event sync between SSO and downstream servers", "Flyway migrations for multi-service DB schema management"],
          ja: ["JWT Access + Refresh デュアルトークン + Token Rotation設計", "WebhookベースSSO ↔ ダウンストリームサーバーイベント同期", "Flyway マイグレーションでマルチサービスDBスキーマ管理"],
        } as LA,
        stack: ['Spring Boot', 'MariaDB', 'Redis', 'JWT', 'Flyway']
      },
      {
        name: "ODYA (Location)",
        desc: {
          ko: '20,000+ 사용자 대상 위치 추적 플랫폼. JPA 직접 Write에서 Redis Write-behind 캐싱으로 아키텍처를 재설계하여 DB 부하 95% 감소 및 서버 장애를 해결했습니다.',
          en: 'Location tracking platform for 20,000+ users. Redesigned from direct JPA writes to Redis write-behind caching, reducing DB load by 95% and eliminating server outages.',
          ja: '20,000人以上のユーザー向け位置追跡プラットフォーム。JPA直接WriteからRedis Write-behindキャッシュにアーキテクチャを再設計し、DB負荷95%削減・サーバー障害を解決。',
        } as L,
        highlights: {
          ko: ["Redis Write-behind 캐싱으로 분당 20,000건 처리, DB 부하 95% 감소", "Android Native Module & IPC 통신 구현", "FCM 활용 자녀-부모 간 양방향 푸시 알림", "React Native CLI로 iOS/Android 양쪽 스토어 출시"],
          en: ["Redis write-behind caching: 20,000 writes/min, 95% DB load reduction", "Android Native Module & IPC communication", "Bidirectional parent-child push notifications via FCM", "Shipped to both App Store and Google Play via React Native CLI"],
          ja: ["Redis Write-behindキャッシュで毎分20,000件処理、DB負荷95%削減", "Android Native Module & IPC通信実装", "FCMによる親子間双方向プッシュ通知", "React Native CLIでiOS/Android両ストアリリース"],
        } as LA,
        stack: ['React Native', 'Spring Boot', 'Redis', 'FCM', 'Native Modules']
      },
      {
        name: { ko: 'KOCCA 세종어학당 평가 시스템', en: 'KOCCA Language Assessment', ja: 'KOCCA世宗学堂評価システム' } as L,
        desc: {
          ko: 'KOCCA 국가 과제로, 학생 음성 녹음 제출 및 교수진 평가·피드백 워크플로우를 지원하는 교육용 웹 플랫폼입니다.',
          en: 'National R&D educational platform supporting student voice recording submissions and faculty assessment/feedback workflows.',
          ja: 'KOCCA国家課題。学生の音声録音提出と教授陣の評価・フィードバックワークフローを支援する教育用Webプラットフォーム。',
        } as L,
        highlights: {
          ko: ["Next.js 15 SSR 아키텍처", "Prisma & PostgreSQL 스키마 설계", "Server Actions 기반 파일 처리", "Nginx 리버스 프록시 및 SSL 보안 강화"],
          en: ["Next.js 15 SSR architecture", "Prisma & PostgreSQL schema design", "Server Actions-based file handling", "Nginx reverse proxy with SSL"],
          ja: ["Next.js 15 SSRアーキテクチャ", "Prisma & PostgreSQLスキーマ設計", "Server Actionsベースのファイル処理", "Nginxリバースプロキシ及びSSLセキュリティ強化"],
        } as LA,
        stack: ['Next.js 15', 'TypeScript', 'Prisma', 'PostgreSQL', 'Nginx']
      },
    ],
    color: "from-blue-500 to-cyan-400"
  },
  {
    id: 2,
    company: "Purple Academy",
    role: "Frontend Developer",
    period: "2023.06 - 2024.06",
    tagline: {
      ko: 'Innovating EdTech with interactive UX.',
      en: 'Innovating EdTech with interactive UX.',
      ja: 'インタラクティブUXでEdTechを革新。',
    } as L,
    projects: [
      {
        name: "LMS App Migration",
        desc: {
          ko: '5,000여 개의 웹 콘텐츠를 제작하고, React Native로 마이그레이션 하고, GSAP/SVG로 인터랙티브한 경험을 구현했습니다.',
          en: 'Built 5,000+ web learning activities, migrated to React Native, and implemented interactive experiences with GSAP/SVG.',
          ja: '5,000以上のWeb学習コンテンツを制作し、React Nativeへ移行、GSAP/SVGでインタラクティブな体験を実装。',
        } as L,
        highlights: {
          ko: ["5000개가 넘는 유아용 영아 학습 컨턴츠 웹 제작", "Web → React Native 앱 마이그레이션", "SVG Path 활용 인터랙티브 학습 구현"],
          en: ["Built 5,000+ early childhood learning web activities", "Web → React Native app migration", "Interactive learning with SVG Path animations"],
          ja: ["5,000以上の幼児向け学習Webコンテンツ制作", "Web → React Nativeアプリマイグレーション", "SVG Pathを活用したインタラクティブ学習実装"],
        } as LA,
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
    tagline: {
      ko: 'R&D and Full-stack system architecture.',
      en: 'R&D and Full-stack system architecture.',
      ja: 'R&Dとフルスタックシステムアーキテクチャ。',
    } as L,
    projects: [
      {
        name: "R&D Visualization",
        desc: {
          ko: '자바 스프링과 Jquery, Thyme-leaf등을 활용해 웹을 제작 하였습니다.',
          en: 'Built web applications using Java Spring, jQuery, and Thymeleaf.',
          ja: 'Java SpringとjQuery、Thymeleafを活用してWebを制作。',
        } as L,
        highlights: {
          ko: ["Jquery, Spring을 활용한 와인 이커머스 제작", "Spring Boot/JPA 사내 ERP 구축", "레거시 데이터 시각화"],
          en: ["Wine e-commerce platform with jQuery & Spring", "In-house ERP system with Spring Boot/JPA", "Legacy data visualization"],
          ja: ["jQuery、Springを活用したワインEC制作", "Spring Boot/JPA社内ERP構築", "レガシーデータ可視化"],
        } as LA,
        stack: ['React', 'Canvas API', 'Spring Boot', 'JPA']
      }
    ],
    color: "from-orange-400 to-amber-500"
  }
]

function getName(name: string | L, locale: Locale): string {
  if (typeof name === 'string') return name
  return name[locale]
}

export default function ProjectShowcase() {
  const { locale } = useI18n()
  const containerRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [tabState, setTabState] = useState<{ [key: number]: number }>({ 1: 0, 2: 0, 3: 0 })

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()

    const ctx = gsap.context(() => {
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

            <div className="hidden lg:block relative h-24 overflow-hidden">
               {experiences.map((exp, i) => (
                  <p
                    key={exp.id}
                    className={`absolute top-0 left-0 text-xl lg:text-2xl text-slate-300 font-light leading-relaxed transition-all duration-700 transform
                      ${i === activeCardIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                    `}
                  >
                   {exp.tagline[locale]}
                  </p>
               ))}
            </div>

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

                      {/* TABS */}
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
                              {getName(proj.name, locale).split(' ')[0]}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Content */}
                      <div className="relative z-10 flex-grow flex flex-col gap-4 animate-fadeIn">
                        {exp.projects.length > 1 && (
                            <h4 className="text-lg sm:text-xl font-bold text-slate-200">
                                {getName(currentProject.name, locale)}
                            </h4>
                        )}

                        <p className="text-slate-400 leading-relaxed text-sm min-h-[40px] lg:min-h-[60px]">
                          {currentProject.desc[locale]}
                        </p>

                        <ul className="space-y-2 mt-2">
                          {currentProject.highlights[locale].map((item: string, idx: number) => (
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
