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
      ko: 'MX팀 리드 — 모바일 앱·인증 서버·웹 플랫폼 4개 프로젝트 리딩.',
      en: 'MX Team Lead — driving 4 projects across mobile, auth, and web platforms.',
      ja: 'MXチームリード — モバイル・認証・Webプラットフォームの4プロジェクトを統括。',
    } as L,
    projects: [
      {
        name: "ODIYA (Location)",
        desc: {
          ko: '자녀 위치 조회 서비스. 30,000+ 활성 유저 대상 React Native 크로스플랫폼 앱과 Spring Boot 백엔드로 구성.',
          en: 'Child location-tracking service for 30,000+ active users. React Native cross-platform app with Spring Boot backend.',
          ja: '子供位置確認サービス。30,000+アクティブユーザー対象のReact Nativeクロスプラットフォームアプリ + Spring Bootバックエンド。',
        } as L,
        highlights: {
          ko: ["Redis 이중 큐 배치 아키텍처 — 분당 30,000건 처리, DB 쓰기 부하 95% 감소·반복 장애 해소", "AES-256 좌표 암호화 + Haversine 기반 SQL 지오펜싱 (안심존 이탈 감지)", "FCM 기반 양방향 푸시 알림 시스템 구현", "App Store/Google Play 동시 출시, 30,000+ 활성 유저 확보"],
          en: ["Redis dual-queue batch — 30,000 writes/min, 95% DB load reduction, eliminated recurring outages", "AES-256 coordinate encryption + Haversine SQL geofencing (safe-zone exit detection)", "Bidirectional FCM push notification system", "Shipped to App Store & Google Play, 30,000+ active users"],
          ja: ["Redis二重キューバッチ — 毎分30,000件処理、DB書き込み負荷95%削減・再発障害を解消", "AES-256座標暗号化 + HaversineベースSQLジオフェンシング（安心ゾーン離脱検知）", "FCMによる双方向プッシュ通知システム実装", "App Store/Google Play同時リリース、30,000+アクティブユーザー獲得"],
        } as LA,
        stack: ['React Native', 'Spring Boot', 'Redis', 'FCM', 'Native Modules']
      },
      {
        name: "SSO Auth Server",
        desc: {
          ko: 'Spring Boot MSA 기반 SSO 인증 서버. 인증/비즈니스 서버 분리 구조와 Webhook 기반 이벤트 동기화로 사내 인증 백본 운영.',
          en: 'Spring Boot MSA-based SSO auth server. Auth/business server separation with Webhook-driven event sync, serving as internal auth backbone.',
          ja: 'Spring Boot MSAベースSSO認証サーバー。認証/ビジネスサーバー分離構造とWebhookイベント同期で社内認証バックボーンを運用。',
        } as L,
        highlights: {
          ko: ["JWT Access/Refresh 이중 토큰 + Token Rotation 구현", "Token Family Tracking — 리프레시 토큰 탈취 시 전체 패밀리 즉시 폐기", "AES-256-GCM 개인정보(전화번호·이메일) 암호화", "Redis 기반 11개 Rate Limiting 정책 (IP/계정/엔드포인트별)", "Flyway 마이그레이션 + Webhook 이벤트 동기화"],
          en: ["JWT Access/Refresh dual-token with Token Rotation", "Token Family Tracking — instant family-wide revocation on refresh-token theft", "AES-256-GCM PII encryption ", "Redis-based 11 Rate Limiting policies (IP/account/endpoint)", "Flyway migrations + Webhook-based service event sync"],
          ja: ["JWT Access/Refresh デュアルトークン + Token Rotation実装", "Token Family Tracking — リフレッシュトークン奪取時にファミリー全体を即時無効化", "AES-256-GCM個人情報（電話番号・メール）暗号化", "Redisベース11種Rate Limitingポリシー（IP/アカウント/エンドポイント別）", "Flywayマイグレーション + Webhookサービス間イベント同期"],
        } as LA,
        stack: ['Spring Boot', 'MariaDB', 'Redis', 'JWT', 'Flyway']
      },
      {
        name: "Mohani (Parental Control)",
        desc: {
          ko: '자녀 디바이스 관리 앱. React Native + Samsung Knox SDK로 시스템 레벨 앱·콘텐츠 차단과 원격 제어 제공.',
          en: 'Parental device management app. System-level app/content blocking and remote control via React Native + Samsung Knox SDK.',
          ja: '子供デバイス管理アプリ。React Native + Samsung Knox SDKでシステムレベルのアプリ・コンテンツ遮断と遠隔制御を提供。',
        } as L,
        highlights: {
          ko: ["React Native Native Module 7개 구현 (Java↔JS Bridge)", "Samsung Knox Firewall API 도메인 차단", "AccessibilityService 기반 YouTube Shorts·카카오톡 실시간 감지·차단", "FCM command/request-response 구조 설계 및 원격 제어 구현", "Android FCM Broadcast ANR 분석·해결 (RN Bridge Queue 병목·Knox IPC 지연)"],
          en: ["7 React Native Native Modules (Java↔JS Bridge)", "Samsung Knox Firewall API domain blocking", "AccessibilityService-based real-time blocking of YouTube Shorts & KakaoTalk", "FCM command/request-response architecture for remote device control", "Resolved Android FCM Broadcast ANR (RN Bridge Queue & Knox IPC bottleneck)"],
          ja: ["React Native Native Module 7個実装（Java↔JS Bridge）", "Samsung Knox Firewall APIドメイン遮断", "AccessibilityServiceベース YouTube Shorts・カカオトーク リアルタイム検知・遮断", "FCM command/request-response構造設計と遠隔制御実装", "Android FCM Broadcast ANR分析・解決（RN Bridge Queue・Knox IPC遅延）"],
        } as LA,
        stack: ['React Native', 'Android Native', 'Knox SDK', 'FCM', 'Java/Kotlin']
      },
      {
        name: { ko: 'KOCCA 한국어 평가 시스템', en: 'KOCCA Korean Assessment', ja: 'KOCCA韓国語評価システム' } as L,
        desc: {
          ko: '국가 R&D 교육용 웹 플랫폼. Next.js Server Components 기반 프론트·백엔드 통합 구현 및 음성 평가 파이프라인 제공.',
          en: 'National R&D educational web platform. Integrated frontend/backend on Next.js Server Components with voice assessment pipeline.',
          ja: '国家R&D教育用Webプラットフォーム。Next.js Server Componentsベースのフロント・バックエンド統合実装と音声評価パイプラインを提供。',
        } as L,
        highlights: {
          ko: ["WAV 녹음 (16kHz 샘플링) + S3 업로드 파이프라인 구축", "Nginx 리버스 프록시 설정 및 SSL 인증서 적용으로 보안 강화", "PostgreSQL 스키마 설계 + Prisma ORM 쿼리 구현", "ExcelJS 기반 채점 결과 내보내기"],
          en: ["WAV recording (16kHz) + S3 upload pipeline", "Nginx reverse proxy with SSL hardening", "PostgreSQL schema design + Prisma ORM queries", "ExcelJS-based assessment result export"],
          ja: ["WAV録音（16kHzサンプリング）+ S3アップロードパイプライン構築", "Nginxリバースプロキシ設定とSSL証明書適用によるセキュリティ強化", "PostgreSQLスキーマ設計 + Prisma ORMクエリ実装", "ExcelJSベースの採点結果エクスポート"],
        } as LA,
        stack: ['Next.js', 'Server Components', 'Prisma', 'PostgreSQL', 'Nginx', 'ExcelJS']
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
