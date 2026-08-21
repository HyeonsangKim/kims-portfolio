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
  icon: 'github' | 'gitlab' | 'external'
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
    title: 'WIGTN Plugin for Claude Code',
    tagline: 'Parallel AI development workflow',
    description: {
      ko: 'Claude Code용 오픈소스 개발 워크플로우 플러그인입니다. v0.1.16 기준 11개 전문 에이전트·5개 커맨드·7개 스킬이 PRD, 화면정의, 병렬 구현, 근거 기반 리뷰, 안전한 커밋·PR을 하나의 계약으로 연결합니다. 세션의 재사용 가능한 학습만 4단 게이트로 일반화해 축적하는 Knowledge Wiki도 포함합니다.',
      en: 'An open-source development workflow plugin for Claude Code. As of v0.1.16, 11 specialized agents, 5 commands, and 7 skills connect PRD, screen specification, parallel implementation, evidence-backed review, and safe commit/PR handoff. It also includes a gated Knowledge Wiki that turns reusable session learning into generalized articles.',
      ja: 'Claude Code向けのオープンソース開発ワークフロープラグイン。v0.1.16時点で11の専門エージェント・5コマンド・7スキルが、PRD、画面仕様、並列実装、根拠ベースのレビュー、安全なコミット・PRを一つの契約でつなぎます。再利用可能なセッション学習だけを4段階ゲートで一般化して蓄積するKnowledge Wikiも含みます。',
    },
    badges: [{ label: 'v0.1.16', variant: 'active' }, { label: 'Open Source', variant: 'active' }],
    tech: ['Claude Code', '11 Agents', '5 Commands', '7 Skills', 'Bash Hooks', 'Knowledge Wiki'],
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
        caption: 'WIGTN Plugin for Claude Code v0.1.16 — 11 agents, 5 commands, and 7 skills connect specification, parallel delivery, evidence-backed review, and gated knowledge capture.',
      },
    ],
  },
  {
    id: 'wigtncodex',
    num: '02',
    title: 'WIGTN Plugin for Codex',
    tagline: 'Selective, evidence-first lifecycle skills',
    description: {
      ko: 'Codex의 기본 자율성은 유지하고 PRD·WorkGraph·화면정의·인수 검증·Git 권한처럼 결과가 명확해야 하는 순간에만 얇은 계약을 더하는 오픈소스 플러그인입니다. v0.4.0의 10개 스킬은 자연어로 선택되며, 전체 구현·검증 루프와 Knowledge Wiki는 명시적으로 켰을 때만 동작합니다.',
      en: 'An open-source plugin that keeps ordinary Codex work unconstrained and adds thin contracts only where outcomes must be explicit: PRDs, resumable WorkGraphs, screen specs, acceptance evidence, and Git authority. Its 10 skills in v0.4.0 are selected through natural language, while full verified delivery and Knowledge Wiki capture remain explicit opt-ins.',
      ja: '通常のCodex作業は自由なまま、PRD、再開可能なWorkGraph、画面仕様、受入証拠、Git権限など結果を明確にすべき場面だけに薄い契約を加えるオープンソースプラグインです。v0.4.0の10スキルは自然言語で選択され、完全な実装・検証ループとKnowledge Wikiは明示的なオプトイン時のみ動作します。',
    },
    badges: [{ label: 'v0.4.0', variant: 'active' }, { label: 'Open Source', variant: 'active' }],
    tech: ['OpenAI Codex', '10 Skills', 'Evidence Contract', 'WorkGraph', 'Knowledge Wiki'],
    links: [
      { label: 'GitHub', url: 'https://github.com/wigtn/wigtn-plugins-codex', icon: 'github' },
    ],
    gradient: 'from-sky-500 to-cyan-500',
    media: { type: 'none' },
  },
  {
    id: 'wigent',
    num: '03',
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
    num: '04',
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
    num: '05',
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
    num: '06',
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
  {
    id: 'custos',
    num: '07',
    title: 'WIGTN-CUSTOS',
    tagline: 'Self-Evolving GitLab Repo Custodian',
    description: {
      ko: 'WIGTN-CUSTOS는 GitLab 리포에 상주하며 MR 리뷰부터 머지된 코드 감시, 이슈 발급까지 24/7 스스로 돌보는 자가진화 리포 커스토디언입니다. 핵심은 자가발전입니다. 봇은 "팀이 머지했는가"가 아니라 "머지된 뒤 실제로 사고가 났는가"(Truth ≠ Consent)를 진실 신호로 삼아, 그 신호로 스킬 confidence를 재보정하고 사고에서 새 탐지 규칙을 합성해 점점 우리 팀 시니어가 되어갑니다. 라이브 trajectory 기준 도구 선택의 77%가 에이전트 주도이고 Senior Score 91/100을 골든셋으로 측정합니다.\nGoogle Cloud Rapid Agent Hackathon 2026 · GitLab Track (심사 중).',
      en: 'WIGTN-CUSTOS is a self-evolving repo custodian that lives inside a GitLab repo and runs 24/7: reviewing MRs, watching merged code, and filing issues on its own. The heart of it is self-evolution. It judges by post-merge truth rather than approval (Truth ≠ Consent), using real incidents to recalibrate skill confidence and synthesize new detection rules, growing into your team’s senior over time. On the live trajectory 77% of tool selections are agent-driven, and a 91/100 Senior Score is measured on a golden set.\nGoogle Cloud Rapid Agent Hackathon 2026 · GitLab Track (judging in progress).',
      ja: 'WIGTN-CUSTOSはGitLabリポジトリに常駐し、MRレビューからマージ済みコードの監視、Issue発行まで24/7自ら世話する自己進化型リポ・カストディアンです。核心は自己進化です。「チームがマージしたか」ではなく「マージ後に実際に事故が起きたか」（Truth ≠ Consent）を真実信号とし、その信号でスキルのconfidenceを再調整し、事故から新しい検出ルールを合成して、次第にチームのシニアになっていきます。ライブtrajectoryでツール選択の77%がエージェント主導、Senior Score 91/100をゴールデンセットで測定。Google Cloud Rapid Agent Hackathon 2026 · GitLab Track（審査中）。',
    },
    badges: [
      { label: 'Self-Evolving Agent', variant: 'active' },
      { label: 'Rapid Agent Hackathon', variant: 'active' },
    ],
    tech: ['Python 3.13', 'FastAPI', 'Vertex AI Gemini 3', 'Google ADK', 'GitLab MCP', 'Semgrep', 'Cloud Run', 'Firestore'],
    links: [
      { label: 'GitLab', url: 'https://gitlab.com/wigtn1/wigtn-gitlab-custos', icon: 'gitlab' },
      { label: 'Live Dashboard', url: 'https://wigtn-bot-api-959369840538.europe-west1.run.app/dashboard', icon: 'external' },
    ],
    gradient: 'from-amber-500 to-orange-500',
    media: { type: 'none' },
    gallery: [
      {
        src: '/images/projects/custos.svg',
        alt: 'Custos architecture — 2 lanes + self-evolution spine',
        caption: 'Custos: a Reactive lane (4-persona MR review) + a Proactive lane (6h merged-code sweep) over GitLab native MCP, with a self-evolution spine that recalibrates skills from post-merge truth and graduates incident-induced rules through a zero-false-positive gate.',
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
