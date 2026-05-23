'use client'
import { useRef, useState, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiLayers, FiArrowRight, FiFileText } from 'react-icons/fi'
import { useI18n, Locale } from '@/lib/i18n'
import OemArchitectureOverlay from './career/OemArchitectureOverlay'
import ArchitectureOverlay, { type ArchitectureKey as DiagramArchitectureKey } from './career/ArchitectureOverlay'
import CareerReportOverlay from './career/CareerReportOverlay'
import type { CareerReportKey } from '@/data/career-reports'

type ArchKey = 'oem-integration-server' | DiagramArchitectureKey

const companyGradientCss: Record<string, string> = {
  'from-blue-500 to-cyan-400': 'linear-gradient(135deg, #3b82f6, #22d3ee)',
  'from-purple-500 to-pink-400': 'linear-gradient(135deg, #a855f7, #f472b6)',
  'from-orange-400 to-amber-500': 'linear-gradient(135deg, #fb923c, #f59e0b)',
}

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
        name: { ko: 'OEM 통합 서버', en: 'OEM Integration Server', ja: 'OEM統合サーバー' } as L,
        desc: {
          ko: 'OEM 앱 통합 인증 서버 + 통합 페이지. 인증/비즈니스 분리부터 비동기 재처리·RBAC·Audit log까지 OEM 백본 전반 설계·운영.',
          en: 'OEM unified auth server + integration page. End-to-end backbone — auth separation, async retry, RBAC, audit log.',
          ja: 'OEMアプリ統合認証サーバー + 統合ページ。認証分離から非同期再処理・RBAC・Audit logまでOEMバックボーンを設計・運用。',
        } as L,
        highlights: {
          ko: [
            "인증/비즈니스 서버 분리 — 인증 장애 전파 차단",
            "Token Rotation + Token Family Tracking — Refresh Token 재사용 공격 탐지·세션 즉시 무효화",
            "Redis Rate Limiting + Webhook 이벤트 전파 — 과부하 방지·polling 트래픽 제거",
            "Retry + DLQ 비동기 처리 + DLQ 관리자 콘솔(목록/재시도/포기)",
            "RBAC 권한 분리 + lifecycle PII 암호화·익명화 + Audit log",
          ],
          en: [
            "Auth/business server separation — auth outages no longer propagate",
            "Token Rotation + Token Family Tracking — detects Refresh Token reuse, instantly revokes session family",
            "Redis Rate Limiting + Webhook event propagation — prevents overload, removes polling",
            "Retry + DLQ async + DLQ admin console (list/retry/abandon)",
            "RBAC + lifecycle PII encryption/anonymization + Audit log",
          ],
          ja: [
            "認証/ビジネスサーバー分離 — 認証障害の伝播を遮断",
            "Token Rotation + Token Family Tracking — Refresh Token再利用攻撃検知・セッション即時無効化",
            "Redis Rate Limiting + Webhookイベント伝播 — 過負荷防止・polling削除",
            "Retry + DLQ非同期処理 + DLQ管理コンソール（一覧/再試行/放棄）",
            "RBAC + lifecycle PII暗号化・匿名化 + Audit log",
          ],
        } as LA,
        stack: ['Spring Boot', 'MariaDB', 'Redis', 'JWT', 'Webhook', 'DLQ'],
        architectureKey: 'oem-integration-server' as ArchKey,
        reportKey: 'oem-integration-server' as CareerReportKey,
      },
      {
        name: "Mohani (Parental Control)",
        desc: {
          ko: '자녀 디바이스 관리 서비스. 노란마켓·공부폰 OEM 탑재. Samsung Knox SDK + AccessibilityService 기반 시스템 레벨 차단·원격 제어 제공.',
          en: 'Parental device management service. Pre-installed on Yellow Market & Studyphone OEM. System-level blocking and remote control via Samsung Knox SDK + AccessibilityService.',
          ja: '子供デバイス管理サービス。イエローマーケット・スタディフォンOEM搭載。Samsung Knox SDK + AccessibilityServiceでシステムレベル遮断・遠隔制御を提供。',
        } as L,
        highlights: {
          ko: [
            "Samsung Knox Firewall 기반 API 도메인 차단 — 보호자 정책 기반 디바이스 도메인 제어",
            "AccessibilityService 기반 앱 실시간 감지·차단 시스템 — 실시간 사용 제어",
            "FCM 기반 command/request-response 구조 설계 — 원격 디바이스 제어 구현",
            "Android Broadcast timeout / RN Bridge Queue 병목 / Knox IPC 지연 분석 — 반복 ANR 원인 파악",
            "무거운 Native 작업을 백그라운드 비동기 구조로 분리 — 실시간 제어 안정성 확보",
          ],
          en: [
            "Samsung Knox Firewall API domain blocking — guardian-policy-driven device domain control",
            "AccessibilityService-based real-time app detection & blocking system",
            "FCM command/request-response architecture — remote device control",
            "Diagnosed recurring ANR — Android Broadcast timeout / RN Bridge Queue / Knox IPC latency",
            "Offloaded heavy native work to background async — restored real-time control stability",
          ],
          ja: [
            "Samsung Knox FirewallベースAPIドメイン遮断 — 保護者ポリシーに基づくデバイスドメイン制御",
            "AccessibilityServiceベースのアプリリアルタイム検知・遮断システム — リアルタイム使用制御",
            "FCMベースのcommand/request-response構造設計 — 遠隔デバイス制御実装",
            "Android Broadcast timeout / RN Bridge Queueボトルネック / Knox IPC遅延を分析 — 反復ANR原因究明",
            "重いNative処理をバックグラウンド非同期構造に分離 — リアルタイム制御の安定性確保",
          ],
        } as LA,
        stack: ['React Native', 'Android Native', 'Knox SDK', 'FCM', 'Java/Kotlin'],
        architectureKey: 'mohani' as ArchKey,
        reportKey: 'mohani' as CareerReportKey,
      },
      {
        name: "ODIYA (Location)",
        desc: {
          ko: '자녀 위치 조회 서비스. 노란마켓·공부폰 OEM 사전탑재. React Native 앱 + Spring Boot 백엔드로 분당 수천 건의 위치 데이터를 안정 처리.',
          en: 'Child location-tracking service. Pre-installed on Yellow Market & Studyphone OEM. React Native app + Spring Boot backend handling thousands of location events per minute.',
          ja: '子供位置確認サービス。イエローマーケット・スタディフォンOEM事前搭載。React Nativeアプリ + Spring Bootバックエンドで分間数千件の位置データを安定処理。',
        } as L,
        highlights: {
          ko: [
            "App Store / Google Play 출시 · 분당 3,000~5,000건 위치 데이터 처리",
            "Redis buffering + batch processing 아키텍처 재설계 — DB write 부하 95% 감소, 인프라 증설 없이 안정화",
            "Haversine distance 기반 안심존 출입 감지 (위치 좌표 계산)",
            "HotUpdater + Supabase OTA 코드푸시 파이프라인 구축 및 운영 프로세스 정립",
            "OEM 사전탑재 확산으로 B2B 매출 약 230% 성장에 기여",
          ],
          en: [
            "Shipped to App Store / Google Play · 3,000~5,000 location events/min in production",
            "Redis buffering + batch architecture — 95% DB write reduction, stabilized service without infra scale-up",
            "Haversine-based safe-zone entry/exit detection (coordinate distance calc)",
            "HotUpdater + Supabase OTA code-push pipeline + operational process documented",
            "OEM pre-install rollout drove ~230% B2B revenue growth",
          ],
          ja: [
            "App Store / Google Playリリース · 分間3,000~5,000件の位置データ処理",
            "Redis buffering + batch processingアーキテクチャ再設計 — DB write負荷95%削減、インフラ増設なしで安定化",
            "Haversine distanceベースの安心ゾーン出入検知（位置座標計算）",
            "HotUpdater + Supabase OTAコードプッシュパイプライン構築および運用プロセス整備",
            "OEM事前搭載拡大によりB2B売上約230%成長に貢献",
          ],
        } as LA,
        stack: ['React Native', 'Spring Boot', 'Redis', 'Supabase', 'HotUpdater'],
        architectureKey: 'odiya' as ArchKey,
        reportKey: 'odiya' as CareerReportKey,
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
        stack: ['Next.js', 'Server Components', 'Prisma', 'PostgreSQL', 'Nginx', 'AWS S3'],
        architectureKey: 'kocca' as ArchKey,
        reportKey: 'kocca' as CareerReportKey,
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
      ko: '퍼플 잉글리시 — 영어 교육 모바일 앱 / 웹 플랫폼.',
      en: 'Purple English — English-learning mobile app / web platform.',
      ja: 'パープルイングリッシュ — 英語教育モバイルアプリ / Webプラットフォーム。',
    } as L,
    projects: [
      {
        name: { ko: '퍼플 잉글리시', en: 'Purple English', ja: 'パープルイングリッシュ' } as L,
        desc: {
          ko: '영어 교육 모바일 앱 / 웹 플랫폼. 기존 React 웹 코드베이스를 React Native 앱으로 마이그레이션하고, 모바일·웹 채널을 일원화하여 5,000+ 인터랙티브 학습 활동을 운영.',
          en: 'English-learning mobile app / web platform. Migrated the legacy React web codebase to React Native, unified mobile/web channels, and shipped 5,000+ interactive learning activities.',
          ja: '英語教育モバイルアプリ / Webプラットフォーム。既存のReact WebコードベースをReact Nativeアプリへ移行し、モバイル・Webチャネルを一元化して5,000+のインタラクティブ学習アクティビティを運用。',
        } as L,
        highlights: {
          ko: [
            "기존 React 웹 코드베이스 → React Native 앱 마이그레이션 + App Store / Google Play 출시",
            "Custom Hook 기반 비즈니스 로직 모듈화 — 웹·앱 공통 로직 재사용 구조 구축",
            "GSAP + SVG Path Animation 기반 알파벳 트레이싱 기능 구현",
            "모바일·웹 채널 일원화 + 5,000+ 인터랙티브 학습 활동 제작",
          ],
          en: [
            "Migrated legacy React web codebase → React Native app, shipped to App Store / Google Play",
            "Custom Hook-based business logic modularization — shared logic across web and app",
            "Alphabet tracing built with GSAP + SVG Path Animation",
            "Unified mobile/web channels + 5,000+ interactive learning activities",
          ],
          ja: [
            "既存のReact WebコードベースをReact Nativeアプリへ移行 + App Store / Google Playリリース",
            "Custom Hookベースのビジネスロジックモジュール化 — Web/アプリ共通ロジック再利用構造の構築",
            "GSAP + SVG Path Animationベースのアルファベットトレーシング機能実装",
            "モバイル・Webチャネル一元化 + 5,000+のインタラクティブ学習アクティビティ制作",
          ],
        } as LA,
        stack: ['React Native', 'React', 'GSAP', 'SVG', 'Custom Hooks', 'TypeScript'],
        reportKey: 'purple-english' as CareerReportKey,
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
      ko: 'AIGOSEO — 고문헌 번역 플랫폼. 정부 R&D 풀스택 개발.',
      en: 'AIGOSEO — ancient manuscript translation platform. Government R&D full-stack delivery.',
      ja: 'AIGOSEO — 古文献翻訳プラットフォーム。政府R&Dフルスタック開発。',
    } as L,
    projects: [
      {
        name: "AIGOSEO",
        desc: {
          ko: '고문헌 번역 플랫폼 (정부 R&D). Canvas API 기반 글자 단위 세그멘테이션과 Spring Boot 백엔드, 고문헌 디지털화 자동화 파이프라인을 구축하여 정부 과제 산출물을 납품.',
          en: 'Ancient manuscript translation platform (Government R&D). Built character-level segmentation with Canvas API, Spring Boot backend, and an automated digitization pipeline; delivered as a national R&D output.',
          ja: '古文献翻訳プラットフォーム（政府R&D）。Canvas APIベースの文字単位セグメンテーションとSpring Bootバックエンド、古文献デジタル化自動化パイプラインを構築し、政府課題成果物を納品。',
        } as L,
        highlights: {
          ko: [
            "Canvas API 기반 글자 단위 이미지 세그멘테이션 시스템 구현",
            "Spring Boot + JPA 기반 백엔드 API 설계·개발",
            "고문헌 디지털화 자동화 파이프라인 구축",
            "정부 R&D 과제 산출물 납품 완료",
          ],
          en: [
            "Canvas API character-level image segmentation system",
            "Spring Boot + JPA backend API design & implementation",
            "Automated digitization pipeline for ancient manuscripts",
            "National R&D project deliverable shipped to government",
          ],
          ja: [
            "Canvas APIベースの文字単位画像セグメンテーションシステム実装",
            "Spring Boot + JPAベースのバックエンドAPI設計・開発",
            "古文献デジタル化自動化パイプラインの構築",
            "政府R&D課題成果物の納品完了",
          ],
        } as LA,
        stack: ['Canvas API', 'Spring Boot', 'JPA', 'JavaScript'],
        reportKey: 'aigoseo' as CareerReportKey,
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
  const [archOverlay, setArchOverlay] = useState<ArchKey | null>(null)
  const [reportOverlay, setReportOverlay] = useState<CareerReportKey | null>(null)
  const [reportContext, setReportContext] = useState<{
    company: string
    role: string
    period: string
    projectName: string
    gradientCss: string
  } | null>(null)

  const archButtonLabel: Record<Locale, string> = {
    ko: '서버 아키텍처 보기',
    en: 'View Server Architecture',
    ja: 'サーバーアーキテクチャを見る',
  }

  const reportButtonLabel: Record<Locale, string> = {
    ko: '전체 리포트 보기',
    en: 'View Full Report',
    ja: 'フルレポートを見る',
  }

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
                    lg:absolute lg:inset-0 lg:max-w-[500px] lg:h-[720px] lg:m-auto
                  `}
                  style={{ zIndex: i }}
                >
                  <div className="w-full h-full rounded-[2rem] p-[1px] bg-gradient-to-b from-white/15 to-transparent backdrop-blur-md shadow-2xl overflow-hidden ring-1 ring-white/10">
                    <div className="relative h-full w-full bg-[#0a0a0a]/95 rounded-[31px] p-5 sm:p-7 lg:p-9 flex flex-col hover:bg-[#0f0f0f] transition-colors duration-500">

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

                        {(('architectureKey' in currentProject && currentProject.architectureKey) ||
                          ('reportKey' in currentProject && currentProject.reportKey)) && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {'reportKey' in currentProject && currentProject.reportKey && (
                              <button
                                type="button"
                                onClick={() => {
                                  setReportContext({
                                    company: exp.company,
                                    role: exp.role,
                                    period: exp.period,
                                    projectName: getName(currentProject.name, locale),
                                    gradientCss: companyGradientCss[exp.color] ?? companyGradientCss['from-blue-500 to-cyan-400'],
                                  })
                                  setReportOverlay(currentProject.reportKey ?? null)
                                }}
                                /* Primary CTA — gradient bg + lift on hover so it
                                   visually pulls the reader into the detail report. */
                                style={{
                                  background:
                                    companyGradientCss[exp.color] ??
                                    companyGradientCss['from-blue-500 to-cyan-400'],
                                }}
                                className="group/btn relative inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-white px-3.5 py-1.5 rounded-full ring-1 ring-white/25 shadow-md shadow-black/30 hover:shadow-lg hover:shadow-black/40 hover:-translate-y-0.5 hover:ring-white/40 transition-all duration-200"
                              >
                                <FiFileText className="w-3 h-3" />
                                {reportButtonLabel[locale]}
                                <FiArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
                              </button>
                            )}
                            {'architectureKey' in currentProject && currentProject.architectureKey && (
                              <button
                                type="button"
                                onClick={() => setArchOverlay(currentProject.architectureKey ?? null)}
                                className="group/btn inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-slate-300 hover:text-white transition-colors px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 bg-white/[0.03] hover:bg-white/[0.06]"
                              >
                                <FiLayers className="w-3 h-3" />
                                {archButtonLabel[locale]}
                                <FiArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
                              </button>
                            )}
                          </div>
                        )}
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

      <OemArchitectureOverlay
        isOpen={archOverlay === 'oem-integration-server'}
        onClose={() => setArchOverlay(null)}
      />

      <ArchitectureOverlay
        architectureKey={
          archOverlay === 'oem-integration-server' || archOverlay === null
            ? null
            : archOverlay
        }
        onClose={() => setArchOverlay(null)}
      />

      <CareerReportOverlay
        reportKey={reportOverlay}
        gradientCss={reportContext?.gradientCss ?? 'linear-gradient(135deg, #3b82f6, #22d3ee)'}
        company={reportContext?.company ?? ''}
        period={reportContext?.period ?? ''}
        role={reportContext?.role ?? ''}
        projectName={reportContext?.projectName ?? ''}
        onClose={() => setReportOverlay(null)}
      />
    </section>
  )
}
