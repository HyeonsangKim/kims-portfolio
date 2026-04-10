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
  | 'from-fuchsia-500 to-purple-600'

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
    id: 'wigplugin',
    num: '01',
    title: 'WigPlugin',
    tagline: 'Claude Code Plugin Collection',
    description: {
      ko: 'WigPlugin은 Claude Code 마켓플레이스에 공개된 AI 개발 워크플로우 플러그인입니다(44★). 12개의 전문 에이전트가 병렬로 PRD 생성, 아키텍처 결정, 빌드, 코드 리뷰, 커밋까지 자동화합니다.',
      en: 'AI development workflow plugin on Claude Code marketplace (44★). 12 specialized agents run in parallel to automate PRD, architecture, build, review, and commit.',
      ja: 'Claude Codeマーケットプレイス公開のAI開発ワークフロープラグイン（44★）。12の専門エージェントが並列でPRD生成、アーキテクチャ決定、ビルド、レビュー、コミットまで自動化。',
    },
    badges: [{ label: 'Active', variant: 'active' }, { label: '44★', variant: 'award' }],
    tech: ['TypeScript', 'Claude API', 'MCP', 'Bash'],
    links: [{ label: 'GitHub', url: 'https://github.com/wigtn/wigtn-plugins-with-claude-code', icon: 'github' }],
    gradient: 'from-rose-500 to-pink-500',
    media: { type: 'none' },
  },
  {
    id: 'wigent',
    num: '02',
    title: 'WIGENT',
    tagline: 'Multi-Agent AI Debate Platform',
    description: {
      ko: 'Wigent는 사용자가 주제를 입력하면 AI 에이전트들이 실시간으로 토론하는 멀티 에이전트 플랫폼입니다. PM 에이전트가 주제를 분석해 전문가 에이전트를 동적 생성/퇴장시키며, 7가지 에이전틱 패턴을 적용했습니다.\n Build with TRAE 해커톤 1등 수상작.',
      en: 'Multi-agent AI debate platform where autonomous agents discuss topics in real-time. PM agent dynamically spawns/retires domain experts. Implements 7 agentic design patterns.\n1st Place at Build with TRAE Hackathon.',
      ja: 'ユーザーがテーマを入力するとAIエージェントがリアルタイムで議論するマルチエージェントプラットフォーム。PMエージェントが専門家を動的に生成・退場。7つのエージェンティックパターンを適用。Build with TRAEハッカソン1位。',
    },
    badges: [
      { label: 'Live', variant: 'live' },
      { label: '1st Place', variant: 'award' },
    ],
    tech: ['Next.js 16', 'React 19', 'GPT-4o', 'SSE Streaming', 'Framer Motion', 'TypeScript'],
    links: [
      { label: 'Live', url: 'https://traewigentonxb.vercel.app', icon: 'external' },
      { label: 'GitHub', url: 'https://github.com/wigtn/wigent', icon: 'github' },
    ],
    gradient: 'from-fuchsia-500 to-purple-600',
    media: { type: 'none' },
  },
  {
    id: 'wigvo',
    num: '03',
    title: 'WIGVO',
    tagline: 'Real-time Phone Translation',
    description: {
      ko: 'WIGVO는 실시간 전화 통번역 솔루션입니다. 듀얼 AI 세션 아키텍처로 에코 없는 양방향 통번역을 구현했으며, 앱 설치 없이 일반 전화로 실시간 통번역이 가능합니다.',
      en: 'Real-time phone translation system with dual AI session architecture — zero echo, bidirectional translation via regular phone calls without app installation.',
      ja: 'リアルタイム電話通訳ソリューション。デュアルAIセッションアーキテクチャでエコーゼロの双方向通訳を実現。アプリ不要で一般電話からリアルタイム通訳が可能。',
    },
    badges: [
      { label: 'Live', variant: 'live' },
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
    num: '04',
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
    num: '05',
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
    num: '06',
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
]
