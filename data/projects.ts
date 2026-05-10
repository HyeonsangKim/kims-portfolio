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
  | 'from-sky-500 to-blue-600'
  | 'from-rose-500 to-pink-500'
  | 'from-fuchsia-500 to-purple-600'

export interface ProjectLink {
  label: string
  url: string
  icon: 'github' | 'external'
}

export interface ProjectGalleryImage {
  src: string
  alt: string
  caption?: string
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
  /**
   * Architecture diagrams, screenshots, and result charts shown only inside
   * `ProjectReportOverlay` (i.e. after clicking "View Full Report"). Kept off
   * the row + accordion so the project list stays scan-friendly.
   */
  gallery?: ProjectGalleryImage[]
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
    gallery: [
      {
        src: '/images/projects/trae_hackthon_seoul.png',
        alt: 'WIGENT — Build with TRAE Seoul Grand Prize',
        caption: 'Build with TRAE Seoul (ByteDance) Grand Prize — 3 engineers, 3.5 hours, 0 merge conflicts.',
      },
    ],
  },
  {
    id: 'wigtnflake',
    num: '03',
    title: 'WIGTN FLAKE',
    tagline: 'Purpose-Driven Neighborhood Intelligence',
    description: {
      ko: 'WIGTN FLAKE는 창업·투자·이사처럼 수억 원이 걸린 결정을 멀티 에이전트 토론으로 풀어내는 동네 인텔리전스 플랫폼입니다. "무엇을 하고 싶은지" 목적을 선택하면 GPT-4o 오케스트레이터가 5명의 Cortex 전문가를 소환해 부동산·유동인구·카드매출·통신계약 4개 데이터셋을 교차 토론하고, Top 3 동네 + 6개월 예측 + 이상 시그널 + 실행 액션을 자동 생성합니다.\nSnowflake AI & Data Hackathon Korea 2026 Tech Track 2등 수상작.',
      en: 'WIGTN FLAKE turns Snowflake Cortex into a purpose-driven neighborhood-intelligence platform for billion-won decisions — opening a cafe, allocating rental-appliance ad budget, finding a billboard site, real-estate investing. A GPT-4o orchestrator summons 5 Cortex-powered experts who cross-debate four datasets (real estate, foot traffic, card sales, telecom) and answer with a Top 3 ranking, anomaly badges, a 6-month forecast, and an action checklist.\n2nd Place at Snowflake AI & Data Hackathon Korea 2026 (Tech Track).',
      ja: 'WIGTN FLAKEは、創業・投資・引越しなど数億円が動く意思決定をマルチエージェント議論で解く地域インテリジェンス基盤。ユーザーが「何をしたいか」目的を選ぶと、GPT-4oオーケストレーターがCortex専門家5名を召喚し、不動産・人流・カード売上・通信契約の4データセットを横断議論。Top 3地域 + 6ヶ月予測 + 異常シグナル + アクションを自動生成。Snowflake AI & Data Hackathon Korea 2026 Tech Track 2位。',
    },
    badges: [
      { label: '2nd Place', variant: 'award' },
      { label: 'Snowflake', variant: 'active' },
    ],
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Snowflake Cortex', 'GPT-4o', 'snowflake-sdk', 'Vega-Lite', 'SSE'],
    links: [
      { label: 'GitHub', url: 'https://github.com/wigtn/wigtn-for-snowflake', icon: 'github' },
      { label: 'News', url: 'https://www.newswire.co.kr/newsRead.php?no=1033575', icon: 'external' },
    ],
    gradient: 'from-sky-500 to-blue-600',
    media: { type: 'youtube', videoId: '1YzSp3SdzTk' },
  },
  {
    id: 'wigvo',
    num: '04',
    title: 'WIGVO',
    tagline: 'Real-time Phone Interpreter',
    description: {
      ko: 'WIGVO는 일반 전화선 위에서 동작하는 실시간 음성 통역 시스템입니다. 방향별로 OpenAI Realtime 세션을 두 개 병렬로 돌리는 듀얼 세션 아키텍처와 소프트웨어 전용 에코 캔슬레이션 파이프라인으로 평균 557ms 지연, 148건 실통화 0건의 에코 루프를 달성했습니다. 수신자는 앱 설치 없이 일반 전화로 받기만 하면 됩니다.\nACL 2026 System Demonstrations 채택.',
      en: 'Real-time voice translation for PSTN phone calls. A dual-session architecture (two parallel OpenAI Realtime sessions, one per speaker) and a software-only echo-cancellation pipeline deliver 557ms average latency and zero echo-loop incidents across 148 production calls. Recipients answer a normal phone call — no app required.\nAccepted at ACL 2026 System Demonstrations.',
      ja: 'PSTN電話線上で動作するリアルタイム音声通訳システム。話者ごとにOpenAI Realtimeセッションを2つ並列で動かすデュアルセッションアーキテクチャと、ソフトウェアのみのエコーキャンセレーションパイプラインで平均557msのレイテンシ、本番148コールでエコーループ0件を達成。受信者はアプリ不要で普通の電話に出るだけ。ACL 2026 System Demonstrations採択。',
    },
    badges: [
      { label: 'ACL 2026', variant: 'award' },
      { label: 'Live', variant: 'live' },
    ],
    tech: ['Python 3.12', 'FastAPI', 'OpenAI Realtime API', 'Whisper-1', 'Silero VAD', 'Twilio', 'React Native (Expo 54)', 'Cloud Run'],
    links: [
      { label: 'Live', url: 'https://wigvo-web-gzjzn35jyq-du.a.run.app/', icon: 'external' },
      { label: 'GitHub', url: 'https://github.com/wigtn/wigvo-v2', icon: 'github' },
    ],
    gradient: 'from-violet-500 to-fuchsia-500',
    media: { type: 'youtube', videoId: '_ixVEnHJxjk' },
    gallery: [
      {
        src: '/images/projects/wigvo_architecture.png',
        alt: 'WIGVO dual-session echo-gating architecture',
        caption: 'Dual-session relay — Session A translates user voice to G.711 for Twilio; Session B processes PSTN audio through the 3-stage filter pipeline.',
      },
      {
        src: '/images/projects/wigvo_screenshot_call.png',
        alt: 'WIGVO call screen',
        caption: 'Live PSTN translation — recipient answers a normal phone call, no app required.',
      },
      {
        src: '/images/projects/wigvo_latency_histogram.png',
        alt: 'WIGVO E2E latency distribution',
        caption: 'E2E latency distribution from 148 production calls — Session A 555ms P50, Session B 2,868ms P50.',
      },
      {
        src: '/images/projects/wigvo_utterance_scatter.png',
        alt: 'WIGVO utterance length vs latency',
        caption: 'Utterance length × latency — Pearson r=0.400 (p<0.001).',
      },
    ],
  },
  {
    id: 'timelens',
    num: '05',
    title: 'TimeLens',
    tagline: 'AI Cultural Heritage Guide',
    description: {
      ko: 'TimeLens는 AI 기반 문화유산 가이드 앱입니다. 카메라로 문화재를 비추면 실시간으로 AI 큐레이터가 역사적 맥락을 설명하고, AR 복원 시각화를 제공합니다. 기획 및 프론트엔드 리드를 담당했습니다.',
      en: 'AI-powered cultural heritage companion. Point your camera at artifacts for real-time AI curator explanations with historical context and AR restoration visualizations. Led product planning and frontend.',
      ja: 'AI文化遺産ガイドアプリ。カメラで文化財を映すとAIキュレーターがリアルタイムで歴史的背景を解説し、AR復元を可視化。企画及びフロントエンドリードを担当。',
    },
    badges: [
      { label: 'Live', variant: 'live' },
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'YOLOv8', 'FastAPI', 'Google Cloud Run'],
    links: [
      { label: 'Live', url: 'https://timelens-852253134165.asia-northeast3.run.app/', icon: 'external' },
      { label: 'GitHub', url: 'https://github.com/wigtn/wigtn-timelens', icon: 'github' },
    ],
    gradient: 'from-amber-500 to-orange-500',
    media: { type: 'youtube', videoId: 'ITaMtVO5jFg' },
    gallery: [
      {
        src: '/images/projects/timelens_logo.png',
        alt: 'TimeLens — AI cultural heritage guide',
        caption: 'AI museum curator — point your camera at an artifact and get real-time historical context with AR restoration.',
      },
    ],
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
