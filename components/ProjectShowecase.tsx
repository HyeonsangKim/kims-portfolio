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
      ko: 'OEM Pre-Installed App Platform — 특화폰 B2B 서비스 + 정부 R&D 리딩.',
      en: 'OEM pre-installed app platform — leading B2B specialized-phone services and Government R&D.',
      ja: 'OEMプリインストールアプリプラットフォーム — 特化スマホB2Bサービスと政府R&Dを統括。',
    } as L,
    projects: [
      {
        name: "ODIYA (Location)",
        desc: {
          ko: '자녀 위치 조회 서비스. 노란마켓·공부폰 OEM 탑재로 30,000+ 사용자 대상 React Native 앱 + Spring Boot 백엔드 운영.',
          en: 'Child location-tracking service. Pre-installed on Yellow Market & Studyphone OEM devices, serving 30,000+ users with React Native app + Spring Boot backend.',
          ja: '子供位置確認サービス。イエローマーケット・スタディフォンOEM搭載で30,000+ユーザー対象のReact Nativeアプリ + Spring Bootバックエンドを運用。',
        } as L,
        highlights: {
          ko: ["App Store / Google Play 출시 및 30,000+ 사용자 운영", "Redis 이중 큐 배치 아키텍처 — 분당 수만 건 처리, DB 쓰기 부하 95% 감소·반복 장애 해결", "Haversine 기반 SQL 지오펜싱으로 안심존 출이탈 감지", "Hotupdater + Supabase 기반 코드푸시 적용 및 사내 매뉴얼 작성"],
          en: ["Shipped to App Store / Google Play, operating with 30,000+ users", "Redis dual-queue batch — tens of thousands writes/min, 95% DB load reduction, resolved recurring outages", "Haversine SQL geofencing for safe-zone entry/exit detection", "Hotupdater + Supabase code-push integration with internal documentation"],
          ja: ["App Store / Google Playリリース、30,000+ユーザーを運用", "Redis二重キューバッチ — 毎分数万件処理、DB書き込み負荷95%削減・再発障害を解消", "HaversineベースSQLジオフェンシングで安心ゾーン出入検知", "Hotupdater + Supabaseベースのコードプッシュ適用と社内マニュアル作成"],
        } as LA,
        stack: ['React Native', 'Spring Boot', 'Redis', 'Supabase', 'Hotupdater']
      },
      {
        name: "Mohani (Parental Control)",
        desc: {
          ko: '자녀 디바이스 관리 서비스. 노란마켓·공부폰 OEM 탑재. Samsung Knox SDK + AccessibilityService 기반 시스템 레벨 차단·원격 제어 제공.',
          en: 'Parental device management service. Pre-installed on Yellow Market & Studyphone OEM. System-level blocking and remote control via Samsung Knox SDK + AccessibilityService.',
          ja: '子供デバイス管理サービス。イエローマーケット・スタディフォンOEM搭載。Samsung Knox SDK + AccessibilityServiceでシステムレベル遮断・遠隔制御を提供。',
        } as L,
        highlights: {
          ko: ["Samsung Knox Firewall 기반 API 도메인 차단 구현", "AccessibilityService 기반 앱 실시간 감지·차단 구현", "FCM command/request-response 구조 설계 및 원격 제어 구현", "Android FCM Broadcast ANR 분석·해결 (RN Bridge Queue 병목·Knox IPC 지연)", "무거운 Native 작업을 백그라운드 비동기 처리로 분리하여 ANR 해소"],
          en: ["Samsung Knox Firewall-based API domain blocking", "AccessibilityService-based real-time app detection & blocking", "FCM command/request-response architecture for remote device control", "Resolved Android FCM Broadcast ANR (RN Bridge Queue & Knox IPC bottleneck)", "Offloaded heavy native work to background async to eliminate ANR"],
          ja: ["Samsung Knox FirewallベースAPIドメイン遮断実装", "AccessibilityServiceベースのアプリリアルタイム検知・遮断実装", "FCM command/request-response構造設計と遠隔制御実装", "Android FCM Broadcast ANR分析・解決（RN Bridge Queue・Knox IPC遅延）", "重いNative処理をバックグラウンド非同期に分離しANR解消"],
        } as LA,
        stack: ['React Native', 'Android Native', 'Knox SDK', 'FCM', 'Java/Kotlin']
      },
      {
        name: { ko: 'OEM 통합 서버', en: 'OEM Integration Server', ja: 'OEM統合サーバー' } as L,
        desc: {
          ko: 'OEM 앱 통합 인증 서버 + 통합 페이지. 인증/비즈니스 서버 분리 구조와 Webhook 기반 이벤트 동기화로 OEM 서비스 백본 설계·운영.',
          en: 'OEM unified auth server + integration page. Designed and operated OEM service backbone with auth/business separation and Webhook event sync.',
          ja: 'OEMアプリ統合認証サーバー + 統合ページ。認証/ビジネスサーバー分離構造とWebhookイベント同期でOEMサービスのバックボーンを設計・運用。',
        } as L,
        highlights: {
          ko: ["인증 서버와 비즈니스 서버 분리 구조 설계", "Token Rotation + Token Family Tracking 기반 인증 구조 구현", "Refresh Token 탈취 시 전체 토큰 패밀리 즉시 폐기", "Redis 기반 Rate Limiting 정책 설계", "OEM 서비스 간 Webhook 이벤트 동기화 + 통합 페이지 개발·운영"],
          en: ["Auth/business server separation architecture", "Token Rotation + Token Family Tracking-based auth architecture", "Instant family-wide revocation on Refresh Token theft", "Redis-based Rate Limiting policy design", "Webhook event sync across OEM services + integration page operation"],
          ja: ["認証サーバーとビジネスサーバーの分離構造設計", "Token Rotation + Token Family Trackingベース認証構造実装", "Refresh Token奪取時にトークンファミリー全体を即時無効化", "RedisベースRate Limitingポリシー設計", "OEMサービス間Webhookイベント同期 + 統合ページ開発・運用"],
        } as LA,
        stack: ['Spring Boot', 'MariaDB', 'Redis', 'JWT', 'Webhook']
      },
      {
        name: { ko: 'KOCCA 한국어 평가 시스템', en: 'KOCCA Korean Assessment', ja: 'KOCCA韓国語評価システム' } as L,
        desc: {
          ko: '정부지원사업 R&D. 외국인 학생 대상 한국어 시험 웹 플랫폼. Next.js Server Components 기반 프론트·백엔드 통합 구현.',
          en: 'Government R&D project. Korean assessment web platform for foreign students. Integrated frontend/backend on Next.js Server Components.',
          ja: '政府支援事業R&D。外国人学生向け韓国語試験Webプラットフォーム。Next.js Server Componentsベースでフロント・バックエンド統合実装。',
        } as L,
        highlights: {
          ko: ["외국인 학생 대상 한국어 시험 웹 플랫폼 프론트·백엔드 구현", "외부 STT 연동을 위한 WAV 녹음 (16kHz) + AWS S3 업로드 파이프라인 구현", "서버 Nginx 리버스 프록시 설정 및 SSL 배포 환경 세팅", "PostgreSQL 스키마 설계 + Prisma ORM 쿼리 구현"],
          en: ["Built full-stack Korean assessment platform for foreign students", "WAV recording (16kHz) + AWS S3 upload pipeline for external STT integration", "Nginx reverse proxy + SSL deployment environment setup", "PostgreSQL schema design + Prisma ORM queries"],
          ja: ["外国人学生向け韓国語試験Webプラットフォームのフロント・バックエンド実装", "外部STT連携のためのWAV録音（16kHz）+ AWS S3アップロードパイプライン実装", "サーバーNginxリバースプロキシ設定とSSL配備環境構築", "PostgreSQLスキーマ設計 + Prisma ORMクエリ実装"],
        } as LA,
        stack: ['Next.js', 'Server Components', 'Prisma', 'PostgreSQL', 'Nginx', 'AWS S3']
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
