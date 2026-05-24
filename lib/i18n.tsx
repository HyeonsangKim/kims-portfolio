'use client'
import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export type Locale = 'ko' | 'en' | 'ja'

const translations = {
  // Hero - titles are already English, keep as-is

  // Intro
  intro: {
    subtitle: {
      ko: 'Who I am',
      en: 'Who I am',
      ja: 'Who I am',
    },
    heading1: {
      ko: 'AI Product Engineer',
      en: 'AI Product Engineer',
      ja: 'AI Product Engineer',
    },
    heading2: {
      ko: 'Based in Seoul.',
      en: 'Based in Seoul.',
      ja: 'Based in Seoul.',
    },
    paragraph1: {
      ko: '현재 사운드마인드 MX팀 리드로 모바일 앱, 인증 서버, 웹 플랫폼 개발을 총괄하고 있습니다. React Native, Next.js, Spring Boot 기반으로 특화폰 서비스를 설계·운영하며, 장애 대응·아키텍처 개선·인증 및 보안 설계까지 end-to-end로 경험해왔습니다.',
      en: 'Currently leading the MX team at Soundmind, owning the mobile app, auth server, and web platform end-to-end. I design and operate specialized-device services on React Native, Next.js, and Spring Boot, covering incident response, architecture evolution, and authentication and security design.',
      ja: '現在、サウンドマインドのMXチームリードとして、モバイルアプリ・認証サーバー・Webプラットフォームの開発を統括しています。React Native、Next.js、Spring Bootをベースに特化スマホサービスを設計・運用し、障害対応・アーキテクチャ改善・認証およびセキュリティ設計までend-to-endで経験してきました。',
    },
    paragraph2: {
      ko: '또한 5인 개발 크루 WIGTN에서 AI-native 개발 워크플로우를 연구하고 있습니다. WIGTN은 AI 시대에 AI를 네이티브하게 활용해 실제 세상의 문제를 풀고 새로운 개발 방식을 연구하기 위해 모인 크루입니다. Claude Code 기반 Harness Engineering 워크플로우를 설계하고 오픈소스로 공유했으며, 이를 기반으로 실시간 AI 음성 번역 시스템(WIGVO), 멀티에이전트 토론 플랫폼 등 다양한 프로젝트를 개발했습니다.',
      en: 'I also research AI-native development workflows with WIGTN, a 5-engineer crew. WIGTN is a crew gathered to solve real-world problems by using AI natively and to explore new ways of building software in the AI era. We designed and open-sourced a Claude Code based Harness Engineering workflow, and on top of it shipped projects including a real-time AI voice translation system (WIGVO) and a multi-agent debate platform.',
      ja: 'また、5人の開発クルーWIGTNでAIネイティブな開発ワークフローを研究しています。WIGTNはAI時代にAIをネイティブに活用して現実世界の問題を解き、新しい開発スタイルを探求するために集まったクルーです。Claude CodeベースのHarness Engineeringワークフローを設計してオープンソースで公開し、それを基盤にリアルタイムAI音声翻訳システム（WIGVO）、マルチエージェント討論プラットフォームなど多様なプロジェクトを開発してきました。',
    },
    paragraph3: {
      ko: '이 과정에서 ByteDance Build with TRAE 2026 해커톤 우승, Snowflake AI & Data Hackathon Korea 준우승 등의 성과를 경험했으며, AI를 단순 생산성 도구가 아니라 실제 개발·운영 프로세스 자체를 재구성하는 방향으로 활용하는 엔지니어가 되고자 합니다.',
      en: 'Along the way, our work won the ByteDance Build with TRAE 2026 hackathon and took second place at the Snowflake AI & Data Hackathon Korea. My goal is to be an engineer who uses AI not as a productivity add-on but as a way to redesign the development and operations process itself.',
      ja: 'この過程でByteDance Build with TRAE 2026ハッカソン優勝、Snowflake AI & Data Hackathon Korea準優勝などの成果を経験し、AIを単なる生産性ツールではなく、実際の開発・運用プロセス自体を再構成する方向で活用するエンジニアになりたいと考えています。',
    },
  },

  // Career
  career: {
    heading: {
      ko: 'Career',
      en: 'Career',
      ja: 'Career',
    },
    journey: {
      ko: 'Journey.',
      en: 'Journey.',
      ja: 'Journey.',
    },
    soundmind: {
      tagline: {
        ko: 'OEM Pre-Installed App Platform — 특화폰 B2B 서비스 + 정부 R&D 리딩.',
        en: 'OEM pre-installed app platform — leading B2B specialized-phone services and Government R&D.',
        ja: 'OEMプリインストールアプリプラットフォーム — 特化スマホB2Bサービスと政府R&Dを統括。',
      },
    },
    purple: {
      tagline: {
        ko: '퍼플 잉글리시 — 영어 교육 모바일 앱 / 웹 플랫폼.',
        en: 'Purple English — English-learning mobile app / web platform.',
        ja: 'パープルイングリッシュ — 英語教育モバイルアプリ / Webプラットフォーム。',
      },
    },
    iezlab: {
      tagline: {
        ko: 'AIGOSEO — 고문헌 번역 플랫폼. 정부 R&D 풀스택 개발.',
        en: 'AIGOSEO — ancient manuscript translation platform. Government R&D full-stack delivery.',
        ja: 'AIGOSEO — 古文献翻訳プラットフォーム。政府R&Dフルスタック開発。',
      },
    },
  },

  // Career - Projects
  projects: {
    mohani: {
      desc: {
        ko: '학부모 대상 자녀 스마트폰 사용 관리 앱으로, 앱 차단·콘텐츠 필터링·사용 통계를 제공하는 플랫폼입니다.',
        en: 'Parental device management platform with app blocking, content filtering, and usage statistics for 10+ apps including YouTube Shorts and KakaoTalk.',
        ja: '保護者向けの子供スマートフォン管理アプリ。アプリブロック・コンテンツフィルタリング・使用統計を提供するプラットフォームです。',
      },
      highlights: {
        ko: ["유튜브 쇼츠, 카톡 숏폼 등 10개+ 앱 대상 콘텐츠 필터링 시스템 구축", "DNS VPN + Accessibility Service 듀얼 아키텍처 설계", "Spring Boot + Redis SSO 통합 인증 서버 설계", "Docker + Nginx + SSL 자동화 배포 파이프라인"],
        en: ["Content filtering system targeting 10+ apps (YouTube Shorts, KakaoTalk)", "Dual architecture: DNS VPN + Accessibility Service", "Spring Boot + Redis SSO authentication server", "Docker + Nginx + SSL automated deployment pipeline"],
        ja: ["YouTube Shorts、KakaoTalkなど10以上のアプリ対象コンテンツフィルタリング", "DNS VPN + Accessibility Service デュアルアーキテクチャ設計", "Spring Boot + Redis SSO統合認証サーバー設計", "Docker + Nginx + SSL自動化デプロイパイプライン"],
      },
    },
    odya: {
      desc: {
        ko: '30,000+ 사용자 대상 위치 추적 플랫폼. JPA 직접 Write에서 Redis Write-behind 캐싱으로 아키텍처를 재설계하여 DB 부하 95% 감소 및 서버 장애를 해결했습니다.',
        en: 'Location tracking platform for 30,000+ users. Redesigned from direct JPA writes to Redis write-behind caching, reducing DB load by 95% and eliminating server outages.',
        ja: '30,000人以上のユーザー向け位置追跡プラットフォーム。JPA直接WriteからRedis Write-behindキャッシュにアーキテクチャを再設計し、DB負荷95%削減・サーバー障害を解決。',
      },
      highlights: {
        ko: ["Redis Write-behind 캐싱으로 분당 30,000건 처리, DB 부하 95% 감소", "Android Native Module & IPC 통신 구현", "FCM 활용 자녀-부모 간 양방향 푸시 알림", "React Native CLI로 iOS/Android 양쪽 스토어 출시"],
        en: ["Redis write-behind caching: 30,000 writes/min, 95% DB load reduction", "Android Native Module & IPC communication", "Bidirectional parent-child push notifications via FCM", "Shipped to both App Store and Google Play via React Native CLI"],
        ja: ["Redis Write-behindキャッシュで毎分30,000件処理、DB負荷95%削減", "Android Native Module & IPC通信実装", "FCMによる親子間双方向プッシュ通知", "React Native CLIでiOS/Android両ストアリリース"],
      },
    },
    kocca: {
      name: {
        ko: 'KOCCA 세종어학당 평가 시스템',
        en: 'KOCCA Language Assessment System',
        ja: 'KOCCA世宗学堂評価システム',
      },
      desc: {
        ko: 'KOCCA 국가 과제로, 학생 음성 녹음 제출 및 교수진 평가·피드백 워크플로우를 지원하는 교육용 웹 플랫폼입니다.',
        en: 'National R&D educational web platform supporting student voice recording submissions and faculty assessment/feedback workflows.',
        ja: 'KOCCA国家課題として、学生の音声録音提出と教授陣の評価・フィードバックワークフローを支援する教育用Webプラットフォーム。',
      },
      highlights: {
        ko: ["Next.js 15 SSR 아키텍처", "Prisma & PostgreSQL 스키마 설계", "Server Actions 기반 파일 처리", "Nginx 리버스 프록시 및 SSL 보안 강화"],
        en: ["Next.js 15 SSR architecture", "Prisma & PostgreSQL schema design", "Server Actions-based file handling", "Nginx reverse proxy with SSL"],
        ja: ["Next.js 15 SSRアーキテクチャ", "Prisma & PostgreSQLスキーマ設計", "Server Actionsベースのファイル処理", "Nginxリバースプロキシ及びSSLセキュリティ強化"],
      },
    },
    launcher: {
      desc: {
        ko: '인터넷이 없는 환경에서도 S3와 로컬 파일 시스템을 연동해 대용량 콘텐츠를 재생하는 런처입니다.',
        en: 'Offline-first launcher that syncs S3 with local file system to play large-scale content without internet.',
        ja: 'インターネットがない環境でもS3とローカルファイルシステムを連動し、大容量コンテンツを再生するランチャー。',
      },
      highlights: {
        ko: ["Android 커스텀 런처 및 키오스크 모드", "대용량 비디오 청크 다운로드/캐싱", "S3 API 콘텐츠 버전 관리"],
        en: ["Android custom launcher & kiosk mode", "Large-scale video chunk download/caching", "S3 API content version management"],
        ja: ["Androidカスタムランチャー＆キオスクモード", "大容量ビデオチャンクダウンロード/キャッシュ", "S3 APIコンテンツバージョン管理"],
      },
    },
    lms: {
      desc: {
        ko: '5,000여 개의 웹 콘텐츠를 제작하고, React Native로 마이그레이션 하고, GSAP/SVG로 인터랙티브한 경험을 구현했습니다.',
        en: 'Built 5,000+ web learning activities, migrated to React Native, and implemented interactive experiences with GSAP/SVG.',
        ja: '5,000以上のWeb学習コンテンツを制作し、React Nativeへ移行、GSAP/SVGでインタラクティブな体験を実装。',
      },
      highlights: {
        ko: ["5,000개가 넘는 영유아 학습 콘텐츠 웹 제작", "Web → React Native 앱 마이그레이션", "SVG Path 활용 인터랙티브 학습 구현"],
        en: ["Built 5,000+ early childhood learning web activities", "Web → React Native app migration", "Interactive learning with SVG Path animations"],
        ja: ["5,000以上の幼児向け学習Webコンテンツ制作", "Web → React Nativeアプリマイグレーション", "SVG Pathを活用したインタラクティブ学習実装"],
      },
    },
    iezlab: {
      desc: {
        ko: 'Java Spring과 jQuery, Thymeleaf 등을 활용해 웹을 제작했습니다.',
        en: 'Built web applications using Java Spring, jQuery, and Thymeleaf.',
        ja: 'Java SpringとjQuery、Thymeleafを活用してWebを制作。',
      },
      highlights: {
        ko: ["jQuery, Spring을 활용한 와인 이커머스 제작", "Spring Boot/JPA 사내 ERP 구축", "레거시 데이터 시각화"],
        en: ["Wine e-commerce platform with jQuery & Spring", "In-house ERP system with Spring Boot/JPA", "Legacy data visualization"],
        ja: ["jQuery、Springを活用したワインEC制作", "Spring Boot/JPA社内ERP構築", "レガシーデータ可視化"],
      },
    },
  },

  // Featured Projects (Side projects)
  featured: {
    heading: {
      ko: 'Selected Works',
      en: 'Selected Works',
      ja: 'Selected Works',
    },
    subtitle: {
      ko: 'WIGTN 팀에서 만든 프로젝트들입니다.',
      en: 'Side projects built with WIGTN crew.',
      ja: 'WIGTNチームで作ったプロジェクトです。',
    },
    wigvo: {
      ko: 'WIGVO는 실시간 전화 통번역 솔루션입니다. 듀얼 AI 세션 아키텍처로 에코 없는 양방향 통번역을 구현했으며, 557ms 평균 지연시간으로 169건 이상의 실제 통화를 처리했습니다.',
      en: 'Real-time phone translation system with dual AI session architecture — zero echo, 557ms avg latency, 169+ live calls processed.',
      ja: 'リアルタイム電話通訳ソリューション。デュアルAIセッションアーキテクチャでエコーゼロの双方向通訳を実現。平均遅延557ms、169件以上の実通話を処理。',
    },
    timelens: {
      ko: 'TimeLens는 AI 기반 문화유산 가이드 앱입니다. 카메라로 문화재를 비추면 실시간으로 AI 큐레이터가 역사적 맥락을 설명하고, AR 복원 시각화를 제공합니다. 기획 및 프론트엔드 리드를 담당했습니다.',
      en: 'AI-powered cultural heritage companion. Point your camera at artifacts for real-time AI curator explanations with historical context and AR restoration visualizations. Led product planning and frontend development.',
      ja: 'AI文化遺産ガイドアプリ。カメラで文化財を映すとAIキュレーターがリアルタイムで歴史的背景を解説し、AR復元を可視化。企画及びフロントエンドリードを担当。',
    },
    wigex: {
      ko: 'WIGEX는 여행 경비 관리 앱입니다. OCR로 영수증을 자동 인식하고, 환율 변환과 경비 분류를 자동으로 처리합니다.',
      en: 'Travel expense tracker with receipt OCR, automatic currency conversion, and expense categorization.',
      ja: '旅行経費管理アプリ。OCRでレシートを自動認識し、為替変換と経費分類を自動処理。',
    },
    wigplugin: {
      ko: 'WigPlugin은 Claude Code를 위한 커스텀 플러그인 모음입니다. 코드 리뷰, PRD 분석, 병렬 빌드 등 개발 워크플로우를 자동화합니다.',
      en: 'Custom Claude Code plugin ecosystem automating code review, PRD analysis, and parallel builds for developer workflows.',
      ja: 'Claude Code用カスタムプラグインコレクション。コードレビュー、PRD分析、並列ビルドなど開発ワークフローを自動化。',
    },
  },

  // Contact
  contact: {
    desc: {
      ko: '새로운 프로젝트 논의나 커피챗은 언제나 환영입니다.',
      en: 'Always open for new projects and coffee chats.',
      ja: '新しいプロジェクトの相談やコーヒーチャットはいつでも歓迎です。',
    },
  },
} as const

type Translations = typeof translations

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (path: string) => string | string[]
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('ko')

  const t = useCallback((path: string): string | string[] => {
    const keys = path.split('.')
    let result: unknown = translations
    for (const key of keys) {
      if (result && typeof result === 'object' && key in result) {
        result = (result as Record<string, unknown>)[key]
      } else {
        return path // fallback
      }
    }
    if (result && typeof result === 'object' && locale in (result as Record<string, unknown>)) {
      return (result as Record<string, unknown>)[locale] as string | string[]
    }
    return path
  }, [locale])

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
