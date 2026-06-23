import type { Locale } from '@/lib/i18n'

export type BadgeVariant = 'live' | 'preparing' | 'active' | 'award'

// 색은 award만 컬러로 살리고 나머지(live/active/preparing)는 중성 회색으로 다운그레이드.
// 한 행 안에 4색이 섞이던 시각 노이즈를 줄이고, 상(award) 라벨만 시선이 향하게 한다.
export const badgeStyle: Record<BadgeVariant, string> = {
  live: 'bg-white/[0.04] text-gray-300 border-white/15',
  preparing: 'bg-white/[0.04] text-gray-400 border-white/15',
  active: 'bg-white/[0.04] text-gray-300 border-white/15',
  award: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
}

// award를 우선 노출하기 위한 정렬 순서. 숫자 작을수록 먼저 (왼쪽).
export const badgePriority: Record<BadgeVariant, number> = {
  award: 0,
  live: 1,
  active: 2,
  preparing: 3,
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
    | { type: 'image'; src: string; alt: string }
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
    title: 'WIGTN Coding',
    tagline: 'Claude Code plugin ecosystem',
    description: {
      ko: 'WIGTN Coding은 Claude Code 마켓플레이스에 공개된 AI 개발 워크플로우 플러그인입니다(44★). 13개의 전문 에이전트가 병렬로 PRD 생성, 화면정의서, 아키텍처 결정, 빌드, 코드 리뷰, 커밋까지 자동화합니다.',
      en: 'AI development workflow plugin on Claude Code marketplace (44★). 13 specialized agents run in parallel to automate PRD, screen spec, architecture, build, review, and commit.',
      ja: 'Claude Codeマーケットプレイス公開のAI開発ワークフロープラグイン（44★）。13の専門エージェントが並列でPRD生成、画面定義書、アーキテクチャ決定、ビルド、レビュー、コミットまで自動化。',
    },
    badges: [{ label: '44★', variant: 'award' }, { label: 'Open Source', variant: 'active' }],
    tech: ['Claude Code', 'TypeScript', 'MCP', 'Bash hooks'],
    links: [
      { label: 'wigtn.com', url: 'https://wigtn.com/projects/wigtn-coding', icon: 'external' },
      { label: 'GitHub', url: 'https://github.com/wigtn/wigtn-plugins-with-claude-code', icon: 'github' },
    ],
    gradient: 'from-rose-500 to-pink-500',
    media: { type: 'none' },
    gallery: [
      {
        src: '/images/projects/wigtncoding.svg',
        alt: 'WIGTN Coding — Claude Code plugin overview',
        caption: 'WIGTN Coding — 13 agents, 4 skills, and 5 commands orchestrated in a single pipeline (/prd → /screen-spec → /implement → /auto-commit).',
      },
    ],
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
        src: '/images/projects/wigent.svg',
        alt: 'WIGENT — multi-agent AI debate architecture',
        caption: 'WIGENT — PM agent dynamically spawns / retires domain experts, one orchestrator streams the full debate.',
      },
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
      { label: 'News', url: 'https://www.newswire.co.kr/newsRead.php?no=1033575', icon: 'external' },
      { label: 'GitHub', url: 'https://github.com/wigtn/wigtn-for-snowflake', icon: 'github' },
    ],
    gradient: 'from-sky-500 to-blue-600',
    media: { type: 'youtube', videoId: '1YzSp3SdzTk' },
    gallery: [
      {
        src: '/images/projects/wigtnflake.svg',
        alt: 'WIGTN FLAKE — purpose-driven neighborhood intelligence',
        caption: 'WIGTN FLAKE — GPT-4o orchestrator + 5 Cortex expert personas + 4 datasets. Debate triggers ML, not the other way around.',
      },
    ],
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
        src: '/images/projects/wigvo_architecture.svg',
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
    id: 'myunzy',
    num: '05',
    title: '면지 (Myunzy)',
    tagline: 'Tool-Call Harness over a Small Korean Model',
    description: {
      ko: '면지는 내 이력서와 실제 채용공고로 AI 면접관을 자동으로 만들어 음성으로 모의면접을 진행하는 플랫폼입니다. LG의 한국어 특화 오픈 모델 EXAONE-4.5를 도구호출 하네스 위에서 굴려, GPT급 자유연기 없이도 끝까지 일관되게 압박·평가하고 한국어 답변의 머뭇거림·표현까지 분석하며 세션 안에서 약점을 학습(자가진화)합니다. mock만으로 전 기능이 동작하고, env만 켜면 EXAONE·음성·외부 API로 무중단 승격됩니다.\nOBA Weekendthon S1 전체 메인 프라이즈 Top 6 · LG U+ Voice AI 트랙(EXAONE).',
      en: 'An AI mock-interview platform that auto-generates an interviewer from your résumé and a real job posting and runs the interview by voice. It drives EXAONE-4.5, LG’s Korean-specialized open model, through a tool-call harness so a small model can pressure and evaluate consistently to the end, read the hesitations and phrasing in Korean answers, and self-evolve within a session, all without free-form acting. Everything works on mock alone; flipping env vars promotes it to live EXAONE, voice, and external APIs with no downtime.\nTop 6 overall (main prize) at OBA Weekendthon S1 · LG U+ Voice AI Track (EXAONE).',
      ja: '自分の履歴書と実際の求人票からAI面接官を自動生成し、音声で模擬面接を行うプラットフォーム。LGの韓国語特化オープンモデルEXAONE-4.5をツール呼び出しハーネスの上で回し、GPT級の自由演技なしでも最後まで一貫して圧迫・評価し、韓国語の回答のためらいや言い回しまで分析し、セッション内で弱点を学習（自己進化）します。mockだけで全機能が動作し、env切替でEXAONE・音声・外部APIへ無停止昇格。OBA Weekendthon S1 全体メインプライズTop 6 · LG U+ Voice AIトラック（EXAONE）。',
    },
    badges: [
      { label: 'Top 6', variant: 'award' },
      { label: 'OBA Weekendthon', variant: 'active' },
    ],
    tech: ['Next.js 16', 'React 19', 'Python 3.14', 'FastAPI', 'EXAONE-4.5', 'DeepAgents', 'LangGraph', 'Qwen3 STT/TTS'],
    links: [
      { label: 'GitHub', url: 'https://github.com/wigtn/myunzy-hackathone', icon: 'github' },
    ],
    gradient: 'from-emerald-500 to-teal-500',
    media: { type: 'none' },
    gallery: [
      {
        src: '/images/projects/myunzy.svg',
        alt: 'Myunzy tool-call harness over EXAONE-4.5',
        caption: 'Myunzy: a deterministic harness (DeepAgents analog) wraps a small open model. wrap_tool_call validates and retries, LangGraph controls the turn loop, and state.py self-evolves the weakness profile. Mock-first, zero-key.',
      },
    ],
  },
  /* Temporarily hidden per feedback (2026-05-24) — kept here so they can be
     restored quickly. Reason: portfolio reads cleaner with 4 hero projects;
     these two add noise for the recruiter scan. */
  // {
  //   id: 'timelens',
  //   num: '05',
  //   title: 'TimeLens',
  //   tagline: 'AI Cultural Heritage Guide',
  //   description: {
  //     ko: 'TimeLens는 AI 기반 문화유산 가이드 앱입니다. 카메라로 문화재를 비추면 실시간으로 AI 큐레이터가 역사적 맥락을 설명하고, AR 복원 시각화를 제공합니다. 기획 및 프론트엔드 리드를 담당했습니다.',
  //     en: 'AI-powered cultural heritage companion. Point your camera at artifacts for real-time AI curator explanations with historical context and AR restoration visualizations. Led product planning and frontend.',
  //     ja: 'AI文化遺産ガイドアプリ。カメラで文化財を映すとAIキュレーターがリアルタイムで歴史的背景を解説し、AR復元を可視化。企画及びフロントエンドリードを担当。',
  //   },
  //   badges: [
  //     { label: 'Live', variant: 'live' },
  //   ],
  //   tech: ['Next.js', 'React', 'TypeScript', 'YOLOv8', 'FastAPI', 'Google Cloud Run'],
  //   links: [
  //     { label: 'Live', url: 'https://timelens-852253134165.asia-northeast3.run.app/', icon: 'external' },
  //     { label: 'GitHub', url: 'https://github.com/wigtn/wigtn-timelens', icon: 'github' },
  //   ],
  //   gradient: 'from-amber-500 to-orange-500',
  //   media: { type: 'youtube', videoId: 'ITaMtVO5jFg' },
  //   gallery: [
  //     {
  //       src: '/images/projects/timelens_logo.png',
  //       alt: 'TimeLens — AI cultural heritage guide',
  //       caption: 'AI museum curator — point your camera at an artifact and get real-time historical context with AR restoration.',
  //     },
  //   ],
  // },
  // {
  //   id: 'wigex',
  //   num: '06',
  //   title: 'WIGEX',
  //   tagline: 'Travel Expense Tracker + OCR',
  //   description: {
  //     ko: 'WIGEX는 여행 경비 관리 앱입니다. OCR로 영수증을 자동 인식하고, 환율 변환과 경비 분류를 자동으로 처리합니다.',
  //     en: 'Travel expense tracker with receipt OCR, automatic currency conversion, and expense categorization.',
  //     ja: '旅行経費管理アプリ。OCRでレシートを自動認識し、為替変換と経費分類を自動処理。',
  //   },
  //   badges: [{ label: 'Preparing', variant: 'preparing' }],
  //   tech: ['React Native', 'OCR', 'FastAPI', 'Supabase'],
  //   links: [{ label: 'GitHub', url: 'https://github.com/wigtn', icon: 'github' }],
  //   gradient: 'from-sky-500 to-cyan-500',
  //   media: { type: 'video', src: '/videos/wigex_video.mp4' },
  // },
]
