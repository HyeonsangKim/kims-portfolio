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
    role: "MX Team Lead",
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
          ko: '자녀 스마트폰 관리 앱. Android Native Module 7개(Java/Kotlin↔JS Bridge)로 시스템 레벨 앱 차단·콘텐츠 차단·사용 제한을 제공합니다.',
          en: 'Parental device management app with 7 Android Native Modules (Java/Kotlin↔JS Bridge) for system-level app blocking, content filtering, and usage limits.',
          ja: '子供スマートフォン管理アプリ。Android Native Module 7個（Java/Kotlin↔JS Bridge）でシステムレベルのアプリ遮断・コンテンツ遮断・使用制限を提供。',
        } as L,
        highlights: {
          ko: ["Android Native Module 7개 (Java/Kotlin↔JS Bridge)", "AccessibilityService 기반 앱 차단 시스템", "유튜브 쇼츠·카카오톡 실시간 콘텐츠 차단", "Samsung Knox Firewall API 도메인 차단"],
          en: ["7 Android Native Modules (Java/Kotlin↔JS Bridge)", "AccessibilityService-based app blocking", "YouTube Shorts & KakaoTalk real-time content blocking", "Samsung Knox Firewall API domain blocking"],
          ja: ["Android Native Module 7個 (Java/Kotlin↔JS Bridge)", "AccessibilityServiceベースのアプリ遮断", "YouTubeショート・カカオトーク リアルタイムコンテンツ遮断", "Samsung Knox Firewall APIドメイン遮断"],
        } as LA,
        stack: ['React Native', 'Android Native', 'Spring Boot', 'Knox SDK', 'Docker']
      },
      {
        name: "SSO Auth Server",
        desc: {
          ko: 'MSA 기반 SSO 인증 서버. JWT 듀얼 토큰 + Token Rotation으로 사내 3개 서비스의 인증 백본으로 운영 중.',
          en: 'MSA-based SSO auth server. JWT dual-token with Token Rotation, serving as auth backbone for 3 internal services.',
          ja: 'MSAベースSSO認証サーバー。JWTデュアルトークン + Token Rotationで社内3サービスの認証基盤として運用中。',
        } as L,
        highlights: {
          ko: ["JWT 듀얼 토큰 + Token Family Tracking", "AES-256-GCM 개인정보 암호화", "Redis Rate Limiting 11종 정책", "유저 유형별 차별화된 인증 정책"],
          en: ["JWT dual-token + Token Family Tracking", "AES-256-GCM PII encryption", "Redis Rate Limiting (11 policies)", "Differentiated auth policies per user type"],
          ja: ["JWTデュアルトークン + Token Family Tracking", "AES-256-GCM個人情報暗号化", "Redis Rate Limiting 11種ポリシー", "ユーザータイプ別差別化認証ポリシー"],
        } as LA,
        stack: ['Spring Boot', 'MariaDB', 'Redis', 'JWT', 'Flyway']
      },
      {
        name: "ODYA (Location)",
        desc: {
          ko: '30,000+ 유저 위치 관리 플랫폼. Redis 이중 큐 배치 아키텍처로 DB 부하 95% 감소.',
          en: 'Location management platform for 30,000+ users. Redis dual-queue batch architecture reduced DB load by 95%.',
          ja: '30,000+ユーザー位置管理プラットフォーム。Redis二重キューバッチでDB負荷95%削減。',
        } as L,
        highlights: {
          ko: ["Redis 이중 큐 배치 아키텍처, DB 부하 95% 감소", "AES-256 좌표 암호화 + Haversine 지오펜싱", "Activity Recognition API 기반 배터리 최적화", "App Store/Google Play 동시 출시 (30,000+ 유저)"],
          en: ["Redis dual-queue batch architecture, 95% DB load reduction", "AES-256 coordinate encryption + Haversine geofencing", "Activity Recognition API for battery optimization", "Shipped to App Store & Google Play (30,000+ users)"],
          ja: ["Redis二重キューバッチ、DB負荷95%削減", "AES-256座標暗号化 + Haversineジオフェンシング", "Activity Recognition APIでバッテリー最適化", "App Store/Google Play同時リリース（30,000+）"],
        } as LA,
        stack: ['React Native', 'Spring Boot', 'Redis', 'FCM', 'Native Modules']
      },
      {
        name: { ko: 'KOCCA 세종어학당 평가 시스템', en: 'KOCCA Language Assessment', ja: 'KOCCA世宗学堂評価システム' } as L,
        desc: {
          ko: '한국어 말하기/발음 평가 웹 플랫폼. 녹음 → S3 → STT → 채점 전체 파이프라인 제공.',
          en: 'Korean speaking/pronunciation assessment platform. Full pipeline: recording → S3 → STT → grading.',
          ja: '韓国語スピーキング/発音評価Webプラットフォーム。録音→S3→STT→採点の全パイプライン。',
        } as L,
        highlights: {
          ko: ["AudioWorklet 커스텀 WAV 녹음기 (16kHz)", "녹음 → S3 → STT → 채점 파이프라인", "학생/교사/관리자 3-role 접근 제어", "Prisma + PostgreSQL 스키마, JWT 인증"],
          en: ["Custom AudioWorklet WAV recorder (16kHz)", "Recording → S3 → STT → grading pipeline", "3-role access control (student/teacher/admin)", "Prisma + PostgreSQL schema, JWT auth"],
          ja: ["AudioWorkletカスタムWAV録音機（16kHz）", "録音→S3→STT→採点パイプライン", "学生/教師/管理者 3-roleアクセス制御", "Prisma + PostgreSQLスキーマ、JWT認証"],
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
          ko: ["5,000개+ 유아용 영어 학습 콘텐츠 웹 제작", "Web → React Native 앱 마이그레이션", "GSAP + SVG Path 인터랙티브 학습 구현"],
          en: ["Built 5,000+ early childhood English learning web activities", "Web → React Native app migration", "Interactive learning with GSAP + SVG Path animations"],
          ja: ["5,000以上の幼児向け英語学習Webコンテンツ制作", "Web → React Nativeアプリマイグレーション", "GSAP + SVG Pathインタラクティブ学習実装"],
        } as LA,
        stack: ['React Native', 'React', 'GSAP', 'TypeScript']
      }
    ],
    color: "from-purple-500 to-pink-400"
  },
  {
    id: 3,
    company: "IEZLAB",
    role: "Full-Stack Developer",
    period: "2022.04 - 2023.03",
    tagline: {
      ko: 'R&D and Full-stack system architecture.',
      en: 'R&D and Full-stack system architecture.',
      ja: 'R&Dとフルスタックシステムアーキテクチャ。',
    } as L,
    projects: [
      {
        name: "AIGOSEO",
        desc: {
          ko: '고문헌 번역 플랫폼 (정부 R&D). Canvas API로 글자 단위 이미지 세그멘테이션을 구현하여 AI 모델 전처리 파이프라인 제공.',
          en: 'Ancient manuscript translation platform (Government R&D). Canvas API character-level image segmentation for AI model preprocessing.',
          ja: '古文献翻訳プラットフォーム（政府R&D）。Canvas APIで文字単位の画像セグメンテーションを実装しAIモデル前処理を提供。',
        } as L,
        highlights: {
          ko: ["Canvas API 기반 글자 단위 이미지 세그멘테이션", "Spring Boot + JPA 백엔드 API", "정부 R&D 납품 완료"],
          en: ["Canvas API character-level image segmentation",  "Spring Boot + JPA backend API", "Government R&D delivered"],
          ja: ["Canvas APIベースの文字単位画像セグメンテーション", "Spring Boot + JPA バックエンドAPI", "政府R&D納品完了"],
        } as LA,
        stack: ['Canvas API', 'Spring Boot', 'JPA', 'JavaScript']
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
