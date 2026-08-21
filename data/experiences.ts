import type { Locale } from '@/lib/i18n'
import type { CareerReportKey } from './career-reports'

type L = Record<Locale, string>
type LA = Record<Locale, string[]>

export interface ExperienceProject {
  name: string | L
  desc: L
  highlights: LA
  stack: string[]
  reportKey: CareerReportKey
}

export interface Experience {
  id: number
  company: string
  role: string
  period: string
  tagline: L
  projects: ExperienceProject[]
  color: string
}

export function getName(name: string | L, locale: Locale): string {
  if (typeof name === 'string') return name
  return name[locale]
}

export const experiences: Experience[] = [
  {
    id: 1,
    company: 'Soundmind',
    role: 'MX Team Lead',
    period: '2025.02 - 2026.06',
    tagline: {
      ko: 'OEM Pre-Installed App Platform — 특화폰 B2B 서비스와 정부 R&D 리딩.',
      en: 'OEM pre-installed app platform — led B2B specialized-phone services and government R&D.',
      ja: 'OEMプリインストールアプリプラットフォーム — 特化スマホB2Bサービスと政府R&Dをリード。',
    },
    projects: [
      {
        name: 'ODIYA (Location)',
        desc: {
          ko: '자녀 위치 조회 서비스. OEM 사전탑재 채널로 대량 위치 데이터를 안정 처리.',
          en: 'Child location-tracking service. Handling high-volume location events on the OEM pre-install channel.',
          ja: '子供位置確認サービス。OEM事前搭載チャネルで大量の位置データを安定処理。',
        },
        highlights: {
          ko: ['Redis buffering + batch 아키텍처 — DB write 부하 95% 감소', 'OEM 사전탑재로 B2B 매출 약 230% 성장 기여'],
          en: ['Redis buffering + batch architecture — 95% DB write reduction', 'OEM pre-install drove ~230% B2B revenue growth'],
          ja: ['Redis buffering + batchアーキテクチャ — DB write負荷95%削減', 'OEM事前搭載拡大でB2B売上約230%成長に貢献'],
        },
        stack: ['React Native', 'Spring Boot', 'Redis', 'Supabase'],
        reportKey: 'odiya',
      },
      {
        name: 'Mohani (Parental Control)',
        desc: {
          ko: '자녀 디바이스 관리 서비스. 외부 MDM SDK + AccessibilityService 기반 시스템 레벨 차단.',
          en: 'Parental device management service. System-level blocking via external MDM SDK + AccessibilityService.',
          ja: '子供デバイス管理サービス。外部MDM SDK + AccessibilityServiceでシステムレベル遮断。',
        },
        highlights: {
          ko: ['다층 차단 트리거 + 응답성 이슈 진단·해결', '포그라운드 서비스 카운트로 화면 없는 앱 우회 차단'],
          en: ['Multi-trigger blocking + responsiveness issue diagnosis', 'Headless-app bypass closed via foreground-service counting'],
          ja: ['多層遮断トリガー + 応答性イシューの診断・解決', 'フォアグラウンドサービスカウントでヘッドレスアプリ回避を遮断'],
        },
        stack: ['React Native', 'Android Native', 'MDM SDK', 'Spring Boot'],
        reportKey: 'mohani',
      },
      {
        name: { ko: 'OEM 통합 서버', en: 'OEM Integration Server', ja: 'OEM統合サーバー' },
        desc: {
          ko: 'OEM 앱 통합 인증 서버. 토큰 재사용 탐지, Webhook 전달 추적, 라이프사이클 자동화까지 설계.',
          en: 'OEM unified auth server. Token reuse detection, webhook delivery tracing, lifecycle automation.',
          ja: 'OEMアプリ統合認証サーバー。トークン再利用検知、Webhook配信追跡、ライフサイクル自動化まで設計。',
        },
        highlights: {
          ko: ['비대칭 토큰 모델 + 재사용 탐지', 'Webhook DLQ + 운영자 콘솔'],
          en: ['Asymmetric token model + reuse detection', 'Webhook DLQ + operator console'],
          ja: ['非対称トークンモデル + 再利用検知', 'Webhook DLQ + 運用者コンソール'],
        },
        stack: ['Spring Boot', 'MariaDB', 'Redis', 'JWT', 'Next.js'],
        reportKey: 'oem-integration-server',
      },
      {
        name: { ko: 'KOCCA 한국어 평가', en: 'KOCCA Korean Assessment', ja: 'KOCCA韓国語評価' },
        desc: {
          ko: '정부 R&D. 외국인 학생 대상 한국어 시험 웹 플랫폼. 풀스택 구현 및 납품.',
          en: 'Government R&D. Korean assessment web platform for foreign students. Full-stack delivery.',
          ja: '政府R&D。外国人学生向け韓国語試験Webプラットフォーム。フルスタック実装・納品。',
        },
        highlights: {
          ko: ['자체 WAV 인코더 + 외부 STT 폴링', '4역할 RBAC + 학교별 멀티테넌트'],
          en: ['Hand-written WAV encoder + external STT polling', '4-role RBAC + school-level multitenancy'],
          ja: ['自作WAVエンコーダ + 外部STTポーリング', '4ロールRBAC + 学校別マルチテナント'],
        },
        stack: ['Next.js', 'Server Actions', 'Prisma', 'PostgreSQL'],
        reportKey: 'kocca',
      },
    ],
    color: 'from-blue-500 to-cyan-400',
  },
  {
    id: 2,
    company: 'Purple Academy',
    role: 'Frontend Developer',
    period: '2023.06 - 2024.06',
    tagline: {
      ko: '퍼플 잉글리시 — 영어 교육 모바일 앱 / 웹 플랫폼.',
      en: 'Purple English — English-learning mobile app / web platform.',
      ja: 'パープルイングリッシュ — 英語教育モバイルアプリ / Webプラットフォーム。',
    },
    projects: [
      {
        name: { ko: '퍼플 잉글리시', en: 'Purple English', ja: 'パープルイングリッシュ' },
        desc: {
          ko: '영어 교육 모바일 앱 / 웹 플랫폼. React → React Native 마이그레이션 후 양 스토어 출시.',
          en: 'English-learning mobile app / web. Migrated React → React Native and shipped to both stores.',
          ja: '英語教育モバイルアプリ / Web。React → React Nativeマイグレーション後、両ストアリリース。',
        },
        highlights: {
          ko: ['React → React Native 마이그레이션 + App Store / Play Store 출시', 'Custom Hook 기반 비즈니스 로직 모듈화'],
          en: ['React → React Native migration + App Store / Play Store launch', 'Custom Hook–based business logic modularization'],
          ja: ['React → React Nativeマイグレーション + App Store / Play Storeリリース', 'Custom Hookベースのビジネスロジックモジュール化'],
        },
        stack: ['React Native', 'React', 'GSAP', 'SVG', 'TypeScript'],
        reportKey: 'purple-english',
      },
    ],
    color: 'from-purple-500 to-pink-400',
  },
  {
    id: 3,
    company: 'IEZLAB',
    role: 'Full-Stack Developer',
    period: '2022.04 - 2023.03',
    tagline: {
      ko: 'AIGOSEO — 한자 고문헌 디지털화 플랫폼. 정부 R&D 풀스택 개발.',
      en: 'AIGOSEO — Hanja manuscript digitization platform. Government R&D full-stack delivery.',
      ja: 'AIGOSEO — 漢字古文献デジタル化プラットフォーム。政府R&Dフルスタック開発。',
    },
    projects: [
      {
        name: 'AIGOSEO',
        desc: {
          ko: '한자 고문헌 디지털화 정부 R&D. Canvas API 글자 단위 세그멘테이션 + Spring Boot 백엔드.',
          en: 'Government R&D for Hanja manuscript digitization. Canvas API character-level segmentation + Spring Boot backend.',
          ja: '漢字古文献デジタル化政府R&D。Canvas API文字単位セグメンテーション + Spring Bootバックエンド。',
        },
        highlights: {
          ko: ['Canvas API 글자 단위 이미지 세그멘테이션', '정부 R&D 산출물 납품 완료'],
          en: ['Canvas API character-level image segmentation', 'National R&D deliverable shipped'],
          ja: ['Canvas API文字単位画像セグメンテーション', '政府R&D成果物納品完了'],
        },
        stack: ['Canvas API', 'Spring Boot', 'JPA', 'JavaScript'],
        reportKey: 'aigoseo',
      },
    ],
    color: 'from-orange-400 to-amber-500',
  },
]
