import type { Locale } from '@/lib/i18n'

export type BadgeVariant = 'live' | 'preparing' | 'active' | 'award'

export const badgeStyle: Record<BadgeVariant, string> = {
  live: 'bg-green-500/15 text-green-400 border-green-500/30',
  preparing: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  active: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  award: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
}

export type Gradient =
  | 'from-violet-500 to-fuchsia-500'
  | 'from-amber-500 to-orange-500'
  | 'from-emerald-500 to-teal-500'
  | 'from-sky-500 to-cyan-500'
  | 'from-rose-500 to-pink-500'

export interface ProjectLink {
  label: string
  url: string
  icon: 'github' | 'external'
}

export interface Project {
  id: string
  num: string
  title: string
  tagline: string
  description: Record<Locale, string>
  badges: { label: string; variant: BadgeVariant }[]
  tech: string[]
  links: ProjectLink[]
  gradient: Gradient
  media:
    | { type: 'youtube'; videoId: string }
    | { type: 'video'; src: string }
    | { type: 'none' }
}

export const projects: Project[] = [
  {
    id: 'wigvo',
    num: '01',
    title: 'WIGVO',
    tagline: 'Real-time Phone Translation',
    description: {
      ko: 'WIGVO는 실시간 전화 통번역 솔루션입니다. 듀얼 AI 세션 아키텍처로 에코 없는 양방향 통번역을 구현했으며, 557ms 평균 지연시간으로 169건 이상의 실제 통화를 처리했습니다. ACL 2026 System Demonstration에 채택되었습니다.',
      en: 'Real-time phone translation system with dual AI session architecture — zero echo, 557ms avg latency, 169+ live calls processed. Accepted at ACL 2026 System Demonstration.',
      ja: 'リアルタイム電話通訳ソリューション。デュアルAIセッションアーキテクチャでエコーゼロの双方向通訳を実現。平均遅延557ms、169件以上の実通話を処理。ACL 2026 System Demonstrationに採択。',
    },
    badges: [
      { label: 'Live', variant: 'live' },
      { label: 'ACL 2026', variant: 'award' },
    ],
    tech: ['React Native', 'WebSocket', 'OpenAI Realtime API', 'FastAPI', 'Twilio', 'Docker'],
    links: [
      { label: 'Live', url: 'https://wigvo-web-gzjzn35jyq-du.a.run.app/', icon: 'external' },
      { label: 'GitHub', url: 'https://github.com/wigtn/wigvo-v2', icon: 'github' },
    ],
    gradient: 'from-violet-500 to-fuchsia-500',
    media: { type: 'youtube', videoId: '_ixVEnHJxjk' },
  },
  {
    id: 'timelens',
    num: '02',
    title: 'TimeLens',
    tagline: 'AI Cultural Heritage Guide',
    description: {
      ko: 'TimeLens는 AI 기반 문화유산 가이드 앱입니다. 카메라로 문화재를 비추면 실시간으로 AI 큐레이터가 역사적 맥락을 설명하고, AR 복원 시각화를 제공합니다. 기획 및 프론트엔드 리드를 담당했습니다.',
      en: 'AI-powered cultural heritage companion. Point your camera at artifacts for real-time AI curator explanations with historical context and AR restoration visualizations. Led product planning and frontend.',
      ja: 'AI文化遺産ガイドアプリ。カメラで文化財を映すとAIキュレーターがリアルタイムで歴史的背景を解説し、AR復元を可視化。企画及びフロントエンドリードを担当。',
    },
    badges: [
      { label: 'Live', variant: 'live' },
      { label: 'Competition', variant: 'award' },
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'YOLOv8', 'FastAPI', 'Google Cloud Run'],
    links: [
      { label: 'Live', url: 'https://timelens-852253134165.asia-northeast3.run.app/', icon: 'external' },
      { label: 'GitHub', url: 'https://github.com/wigtn/wigtn-timelens', icon: 'github' },
    ],
    gradient: 'from-amber-500 to-orange-500',
    media: { type: 'youtube', videoId: 'ITaMtVO5jFg' },
  },
  {
    id: 'wigvu',
    num: '03',
    title: 'WIGVU',
    tagline: 'AI Korean Language Learning',
    description: {
      ko: 'WIGVU는 AI 기반 한국어 학습 앱입니다. 개인 맞춤형 커리큘럼과 실시간 발음 교정, 대화 연습 기능을 제공합니다.',
      en: 'AI-powered Korean language learning app with personalized curriculum, real-time pronunciation correction, and conversation practice.',
      ja: 'AI韓国語学習アプリ。パーソナライズされたカリキュラムとリアルタイム発音矯正、会話練習機能を提供。',
    },
    badges: [{ label: 'Preparing', variant: 'preparing' }],
    tech: ['React Native', 'STT', 'TTS', 'LLM', 'Supabase'],
    links: [{ label: 'GitHub', url: 'https://github.com/wigtn', icon: 'github' }],
    gradient: 'from-emerald-500 to-teal-500',
    media: { type: 'none' },
  },
  {
    id: 'wigex',
    num: '04',
    title: 'WIGEX',
    tagline: 'Travel Expense Tracker + OCR',
    description: {
      ko: 'WIGEX는 여행 경비 관리 앱입니다. OCR로 영수증을 자동 인식하고, 환율 변환과 경비 분류를 자동으로 처리합니다.',
      en: 'Travel expense tracker with receipt OCR, automatic currency conversion, and expense categorization.',
      ja: '旅行経費管理アプリ。OCRでレシートを自動認識し、為替変換と経費分類を自動処理。',
    },
    badges: [{ label: 'Preparing', variant: 'preparing' }],
    tech: ['React Native', 'OCR', 'FastAPI', 'Supabase'],
    links: [{ label: 'GitHub', url: 'https://github.com/wigtn', icon: 'github' }],
    gradient: 'from-sky-500 to-cyan-500',
    media: { type: 'video', src: '/videos/wigex_video.mp4' },
  },
  {
    id: 'wigplugin',
    num: '05',
    title: 'WigPlugin',
    tagline: 'Claude Code Plugin Collection',
    description: {
      ko: 'WigPlugin은 Claude Code를 위한 커스텀 플러그인 모음입니다. 코드 리뷰, PRD 분석, 병렬 빌드 등 개발 워크플로우를 자동화합니다.',
      en: 'Custom Claude Code plugin ecosystem automating code review, PRD analysis, and parallel builds for developer workflows.',
      ja: 'Claude Code用カスタムプラグインコレクション。コードレビュー、PRD分析、並列ビルドなど開発ワークフローを自動化。',
    },
    badges: [{ label: 'Active', variant: 'active' }],
    tech: ['TypeScript', 'Claude API', 'MCP', 'Bash'],
    links: [{ label: 'GitHub', url: 'https://github.com/wigtn', icon: 'github' }],
    gradient: 'from-rose-500 to-pink-500',
    media: { type: 'none' },
  },
]
