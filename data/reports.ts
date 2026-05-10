/**
 * Case-study style project reports.
 *
 * Content is sourced from https://wigtn.com/projects/<slug>
 * and https://github.com/wigtn.
 *
 * i18n: every prose field is a `L<T>` = { en: T; ko?: T; ja?: T }.
 * English is always required; ko/ja fall back to English if missing.
 * Language-agnostic fields (numbers, tech names, URLs, dates) stay as plain strings.
 */

import type { Locale } from '@/lib/i18n'

/** Localized text helper — English required, others optional. */
export type L<T> = { en: T; ko?: T; ja?: T }

/** Pick a localized value with fallback to English. */
export function pickL<T>(field: L<T> | undefined, locale: Locale): T | undefined {
  if (!field) return undefined
  return field[locale] ?? field.en
}

export interface ReportMetric {
  value: string
  label: L<string>
}

export interface ReportTechGroup {
  category: L<string>
  items: string[]
}

export interface ReportSection {
  title: L<string>
  body: L<string>
}

export interface ReportTimelineItem {
  time: string
  title: L<string>
  body?: L<string>
}

export interface ReportLessons {
  worked?: L<string[]>
  wouldChange?: L<string[]>
}

export interface ProjectReport {
  slug: string
  oneLiner: L<string>
  problem?: L<string[]>
  solution?: L<string[]>
  metrics?: ReportMetric[]
  techStack?: ReportTechGroup[]
  architecture?: ReportSection[]
  deepDives?: ReportSection[]
  timeline?: ReportTimelineItem[]
  lessons?: ReportLessons
  byTheNumbers?: { label: L<string>; value: string }[]
  sourceUrl?: string
}

export const projectReports: Record<string, ProjectReport> = {
  wigplugin: {
    slug: 'wigplugin',
    oneLiner: {
      en: 'One plugin. 12 agents. From idea to production — in parallel.',
      ko: '플러그인 하나, 에이전트 12개. 아이디어부터 프로덕션까지 — 병렬로.',
      ja: 'プラグイン1つ、エージェント12体。アイデアから本番まで — 並列で。',
    },
    problem: {
      en: [
        'Sequential dev workflow (PRD → architecture → build → review) eats ~20 minutes of wall-clock time for a single feature.',
        'Junior devs lack structured guidance for full-stack delivery — deciding MSA vs. monolith, picking patterns, running a real review.',
        'Code quality and architectural consistency drift when multiple parallel tracks work without a shared contract.',
        'Coordinating multiple specialized roles by hand means context constantly slips between agents.',
      ],
      ko: [
        '순차 개발 워크플로우(PRD → 아키텍처 → 빌드 → 리뷰)는 기능 하나당 약 20분의 실시간을 먹는다.',
        '주니어 개발자는 풀스택 구현에 필요한 구조화된 가이드가 없다 — MSA vs 모놀리식 결정, 패턴 선택, 제대로 된 리뷰.',
        '공유 계약 없이 여러 트랙이 병렬로 작업하면 코드 품질과 아키텍처 일관성이 무너진다.',
        '여러 전문 역할을 수동으로 조율하면 에이전트 사이에서 컨텍스트가 계속 빠져나간다.',
      ],
      ja: [
        '順次開発ワークフロー（PRD → アーキテクチャ → ビルド → レビュー）は機能ひとつで約20分の実時間を消費する。',
        'ジュニア開発者にはフルスタック実装のための構造化されたガイドがない — MSA vs モノリス判断、パターン選択、本格的なレビュー。',
        '共有契約なしに複数トラックが並列作業すると、コード品質とアーキテクチャ一貫性が崩れる。',
        '複数の専門ロールを手動で調整すると、エージェント間でコンテキストが絶えず抜け落ちる。',
      ],
    },
    solution: {
      en: [
        'Three top-level commands that orchestrate the full workflow: `/prd`, `/implement --parallel`, `/auto-commit`.',
        '`/prd <feature>` produces a requirements document and phased task plan in ~30 seconds.',
        '`/implement --parallel` dispatches 4 specialized teams (Backend · Frontend · AI · Ops) simultaneously via a team-build coordinator.',
        '`/auto-commit` runs a 3-agent parallel code review with quality gates — ≥80 auto-commits, 60–79 triggers fixes, <60 blocks.',
        '`design-discovery` agent uses Verbalized Sampling over 20 style systems before any frontend work, so the UI is designed — not defaulted.',
      ],
      ko: [
        '전체 워크플로우를 지휘하는 최상위 커맨드 3개: `/prd`, `/implement --parallel`, `/auto-commit`.',
        '`/prd <feature>`는 약 30초 안에 요구사항 문서와 단계별 작업 계획을 생성한다.',
        '`/implement --parallel`은 team-build 코디네이터를 통해 4개 전문 팀(Backend · Frontend · AI · Ops)을 동시에 투입한다.',
        '`/auto-commit`은 3 에이전트 병렬 코드 리뷰를 품질 게이트와 함께 돌린다 — 80점 이상 자동 커밋, 60~79점은 수정 트리거, 60점 미만은 차단.',
        '`design-discovery` 에이전트는 프론트엔드 작업 전 20개 스타일 시스템을 대상으로 Verbalized Sampling을 수행한다. UI는 "디자인"되는 것이지 "기본값"이 아니다.',
      ],
      ja: [
        '全ワークフローを指揮する3つのトップレベルコマンド：`/prd`、`/implement --parallel`、`/auto-commit`。',
        '`/prd <feature>`は約30秒で要件定義書と段階的タスク計画を生成する。',
        '`/implement --parallel`はteam-buildコーディネーター経由で4つの専門チーム（Backend · Frontend · AI · Ops）を同時投入する。',
        '`/auto-commit`は3エージェント並列コードレビューを品質ゲートとともに実行 — 80点以上で自動コミット、60〜79点は修正トリガー、60点未満はブロック。',
        '`design-discovery`エージェントはフロントエンド作業前に20のスタイルシステムでVerbalized Samplingを行う。UIは「デザイン」されるもので「デフォルト」ではない。',
      ],
    },
    metrics: [
      {
        value: '~6 min',
        label: {
          en: 'Full Pipeline (vs. 20 min)',
          ko: '전체 파이프라인 (20분 대비)',
          ja: '全パイプライン（20分比）',
        },
      },
      {
        value: '12',
        label: {
          en: 'Specialized Agents',
          ko: '전문 에이전트',
          ja: '専門エージェント',
        },
      },
      {
        value: '20',
        label: {
          en: 'Design Styles',
          ko: '디자인 스타일',
          ja: 'デザインスタイル',
        },
      },
      {
        value: '44★',
        label: {
          en: 'GitHub Stars',
          ko: 'GitHub Stars',
          ja: 'GitHub Stars',
        },
      },
    ],
    techStack: [
      {
        category: {
          en: 'Plugin Core',
          ko: '플러그인 코어',
          ja: 'プラグインコア',
        },
        items: [
          'Claude Code Plugin manifest',
          'TypeScript',
          'Bash (safety hooks)',
          'MCP (Model Context Protocol)',
          'Apache 2.0',
        ],
      },
      {
        category: {
          en: 'Supported Targets',
          ko: '지원 타겟',
          ja: 'サポート対象',
        },
        items: [
          'React 19 · Next.js 16+ · Tailwind · Radix UI',
          'NestJS · Express · FastAPI · Prisma · Drizzle',
          'React Native 0.73+ · Expo SDK 52+',
          'WhisperX · OpenAI · Anthropic',
          'Docker · Kubernetes · GitHub Actions',
        ],
      },
      {
        category: {
          en: 'Design Methodology',
          ko: '디자인 방법론',
          ja: 'デザイン方法論',
        },
        items: [
          '20 style systems (Editorial → Kinetic Typography)',
          'Verbalized Sampling (VS) discovery',
          'Apple HIG + Material Design 3',
          'Motion · color · typography anti-patterns',
        ],
      },
    ],
    architecture: [
      {
        title: {
          en: 'Coordinators (4)',
          ko: '코디네이터 (4)',
          ja: 'コーディネーター (4)',
        },
        body: {
          en: 'team-build-coordinator dispatches parallel teams · parallel-review-coordinator merges 3-agent review scores · parallel-digging-coordinator runs a 4-category PRD analysis · architecture-decision picks MSA / Monolithic / Modular Monolith.',
          ko: 'team-build-coordinator는 병렬 팀을 투입 · parallel-review-coordinator는 3 에이전트 리뷰 점수를 병합 · parallel-digging-coordinator는 4개 카테고리 PRD 분석 수행 · architecture-decision은 MSA / 모놀리식 / 모듈러 모놀리식을 선택한다.',
          ja: 'team-build-coordinatorが並列チームを投入 · parallel-review-coordinatorが3エージェントのレビュースコアを統合 · parallel-digging-coordinatorが4カテゴリのPRD分析を実行 · architecture-decisionがMSA / モノリス / モジュラーモノリスを選択。',
        },
      },
      {
        title: {
          en: 'Developers (4)',
          ko: '개발자 (4)',
          ja: 'デベロッパー (4)',
        },
        body: {
          en: 'frontend-developer (React 19 + 20 design styles) · backend-architect (API, DB, patterns) · mobile-developer (React Native / Expo) · ai-agent (WhisperX, LLM integration).',
          ko: 'frontend-developer (React 19 + 20 디자인 스타일) · backend-architect (API, DB, 패턴) · mobile-developer (React Native / Expo) · ai-agent (WhisperX, LLM 통합).',
          ja: 'frontend-developer（React 19 + 20デザインスタイル）· backend-architect（API、DB、パターン）· mobile-developer（React Native / Expo）· ai-agent（WhisperX、LLM統合）。',
        },
      },
      {
        title: {
          en: 'Quality (4)',
          ko: '품질 (4)',
          ja: '品質 (4)',
        },
        body: {
          en: 'code-reviewer (100-point scoring) · prd-reviewer (completeness / feasibility / security / consistency) · code-formatter (multi-language auto-format) · design-discovery (VS-based style recommendation).',
          ko: 'code-reviewer (100점 스코어링) · prd-reviewer (완전성 / 실현가능성 / 보안 / 일관성) · code-formatter (다언어 자동 포매팅) · design-discovery (VS 기반 스타일 추천).',
          ja: 'code-reviewer（100点スコアリング）· prd-reviewer（完全性 / 実現可能性 / セキュリティ / 一貫性）· code-formatter（多言語自動フォーマット）· design-discovery（VSベースのスタイル推薦）。',
        },
      },
      {
        title: {
          en: 'Shared Memory Layer',
          ko: '공유 메모리 레이어',
          ja: '共有メモリレイヤー',
        },
        body: {
          en: 'The `team-memory-protocol` skill maintains a SHARED_CONTEXT file so parallel agents read from and write to one source of truth instead of losing state between hand-offs.',
          ko: '`team-memory-protocol` 스킬이 SHARED_CONTEXT 파일을 유지한다. 병렬 에이전트들이 하나의 진실 공급원에서 읽고 쓰기 때문에, 핸드오프 사이에 상태를 잃지 않는다.',
          ja: '`team-memory-protocol`スキルがSHARED_CONTEXTファイルを維持する。並列エージェントが単一の真実の源から読み書きするため、ハンドオフ間で状態を失わない。',
        },
      },
    ],
    deepDives: [
      {
        title: {
          en: 'Parallel Team Dispatch',
          ko: '병렬 팀 디스패치',
          ja: '並列チームディスパッチ',
        },
        body: {
          en: 'team-build-coordinator fans out to Backend / Frontend / AI / Ops teams based on PRD analysis, then rejoins at a quality gate. 6 min vs. 20 min sequential.',
          ko: 'team-build-coordinator가 PRD 분석을 바탕으로 Backend / Frontend / AI / Ops 팀에 팬아웃하고, 품질 게이트에서 다시 합류한다. 6분 vs 순차 20분.',
          ja: 'team-build-coordinatorがPRD分析に基づきBackend / Frontend / AI / Opsチームにファンアウトし、品質ゲートで再合流する。6分 vs 順次20分。',
        },
      },
      {
        title: {
          en: '4-Category PRD Analysis',
          ko: '4 카테고리 PRD 분석',
          ja: '4カテゴリPRD分析',
        },
        body: {
          en: 'parallel-digging-coordinator runs Completeness, Feasibility, Security and Consistency checks as 4 independent agents and cross-synthesizes findings.',
          ko: 'parallel-digging-coordinator가 완전성 · 실현가능성 · 보안 · 일관성 검사를 4개 독립 에이전트로 돌리고 결과를 교차 종합한다.',
          ja: 'parallel-digging-coordinatorが完全性・実現可能性・セキュリティ・一貫性の4チェックを独立エージェントで実行し、結果をクロス統合する。',
        },
      },
      {
        title: {
          en: '3-Agent Parallel Review',
          ko: '3 에이전트 병렬 리뷰',
          ja: '3エージェント並列レビュー',
        },
        body: {
          en: 'auto-commit distributes review across category-specialized agents, merges evidence-based 100-point scores, then enforces a zero-tolerance security policy.',
          ko: 'auto-commit이 카테고리별 전문 에이전트에 리뷰를 분산시키고, 증거 기반 100점 스코어를 병합한 뒤, 제로 톨러런스 보안 정책을 강제한다.',
          ja: 'auto-commitがカテゴリ別専門エージェントにレビューを分散し、エビデンスベースの100点スコアを統合、ゼロトレランスのセキュリティポリシーを適用する。',
        },
      },
      {
        title: {
          en: 'Verbalized Sampling Design Discovery',
          ko: 'Verbalized Sampling 디자인 디스커버리',
          ja: 'Verbalized Sampling デザインディスカバリー',
        },
        body: {
          en: 'design-discovery agent asks VS-style clarifying questions, then recommends from 20 styles with suitability percentages — design becomes a first-class step, not an afterthought.',
          ko: 'design-discovery 에이전트가 VS 스타일의 명확화 질문을 던진 뒤, 20개 스타일 중 적합도 퍼센트와 함께 추천한다. 디자인이 뒷단계가 아닌 1급 단계가 된다.',
          ja: 'design-discoveryエージェントがVS形式の明確化質問を行い、20スタイルから適合度％付きで推薦する。デザインが後付けではなく第一級のステップになる。',
        },
      },
      {
        title: {
          en: 'Tiered Code Review (Levels 3–4)',
          ko: '티어드 코드 리뷰 (Level 3–4)',
          ja: 'ティアード・コードレビュー（Level 3–4）',
        },
        body: {
          en: 'code-review-levels skill unlocks Level 3 (call chains, concurrency, data flow) and Level 4 (SOLID, scalability, architecture).',
          ko: 'code-review-levels 스킬이 Level 3(호출 체인, 동시성, 데이터 흐름)와 Level 4(SOLID, 확장성, 아키텍처)를 해제한다.',
          ja: 'code-review-levelsスキルがLevel 3（呼び出しチェーン、並行性、データフロー）とLevel 4（SOLID、スケーラビリティ、アーキテクチャ）を解放する。',
        },
      },
      {
        title: {
          en: 'Architecture Decision Agent',
          ko: '아키텍처 결정 에이전트',
          ja: 'アーキテクチャ決定エージェント',
        },
        body: {
          en: 'Analyzes PRD for domain complexity and NFRs, then returns a structured MSA vs. Monolithic vs. Modular Monolith recommendation with rationale — no more gut-feel splits.',
          ko: 'PRD에서 도메인 복잡도와 NFR을 분석한 뒤, MSA vs 모놀리식 vs 모듈러 모놀리식 구조화된 추천을 근거와 함께 반환한다. 감에 의존한 분리 끝.',
          ja: 'PRDからドメインの複雑度とNFRを分析し、MSA vs モノリス vs モジュラーモノリスの構造化された推薦を根拠とともに返す。勘に頼った分割は終わり。',
        },
      },
      {
        title: {
          en: 'Dangerous Command Blocker (Hook)',
          ko: '위험 커맨드 차단 (Hook)',
          ja: '危険コマンドブロッカー (Hook)',
        },
        body: {
          en: 'PreToolUse hook on Bash intercepts `rm -rf /`, `git push --force`, `DROP TABLE` and other destructive operations before they run.',
          ko: 'Bash의 PreToolUse 훅이 `rm -rf /`, `git push --force`, `DROP TABLE` 같은 파괴적 작업을 실행 전에 가로챈다.',
          ja: 'BashのPreToolUseフックが`rm -rf /`、`git push --force`、`DROP TABLE`など破壊的操作を実行前にインターセプトする。',
        },
      },
      {
        title: {
          en: 'Pattern Compliance Hooks',
          ko: '패턴 컴플라이언스 훅',
          ja: 'パターンコンプライアンスフック',
        },
        body: {
          en: 'PostToolUse hooks on `.tsx/.jsx/.css` enforce formatting, and on `.ts/.py/.go` run backend pattern-compliance checks — quality is continuous, not a final gate.',
          ko: '`.tsx/.jsx/.css`의 PostToolUse 훅이 포매팅을 강제하고, `.ts/.py/.go`에는 백엔드 패턴 컴플라이언스 검사가 돈다. 품질은 최종 게이트가 아닌 지속 프로세스.',
          ja: '`.tsx/.jsx/.css`のPostToolUseフックがフォーマットを強制し、`.ts/.py/.go`ではバックエンドパターン準拠チェックが走る。品質は最終ゲートではなく継続プロセス。',
        },
      },
    ],
    lessons: {
      worked: {
        en: [
          'Parallel-first design: fan out wherever possible, rejoin only at gates. Turned a 20-minute pipeline into ~6 minutes.',
          'Evidence-based scoring over vibes. 100-point rubric + category split makes review decisions auditable.',
          'Design discovery as a first-class step. VS-based recommendation beats "use whatever the model defaults to".',
          'team-memory-protocol: a shared context file prevents parallel agents from silently overwriting each other.',
          'Safety hooks at the Bash layer — destructive ops are blocked by the harness, not by vibes.',
        ],
        ko: [
          '병렬 우선 설계: 가능한 모든 곳에서 팬아웃, 게이트에서만 합류. 20분 파이프라인을 약 6분으로 단축.',
          '감이 아닌 증거 기반 스코어링. 100점 루브릭 + 카테고리 분할로 리뷰 결정이 감사 가능해짐.',
          '디자인 디스커버리를 1급 단계로. "모델 디폴트에 맡기기"보다 VS 기반 추천이 낫다.',
          'team-memory-protocol: 공유 컨텍스트 파일이 병렬 에이전트 간 조용한 덮어쓰기를 방지한다.',
          'Bash 레이어 안전 훅 — 파괴적 작업이 하네스 자체에서 차단된다.',
        ],
        ja: [
          '並列優先設計：可能な限りファンアウトし、ゲートでのみ合流。20分のパイプラインを約6分に短縮。',
          '勘ではなくエビデンスベースのスコアリング。100点ルーブリック＋カテゴリ分割でレビュー判断が監査可能に。',
          'デザインディスカバリーを第一級のステップに。「モデルのデフォルトに任せる」よりVSベース推薦が優る。',
          'team-memory-protocol：共有コンテキストファイルが並列エージェント間の暗黙の上書きを防ぐ。',
          'Bashレイヤーのセーフティフック — 破壊的操作はハーネス自体でブロックされる。',
        ],
      },
      wouldChange: {
        en: [
          'Coordinator logic is still plugin-side; a real orchestration runtime would simplify rollback on partial failure.',
          'Quality-gate thresholds (80 / 60) are hard-coded; should be tunable per-project for different risk appetites.',
          'Design style catalog is flat — grouping by use-case (marketing, dashboard, editorial) would speed discovery.',
        ],
        ko: [
          '코디네이터 로직이 아직 플러그인 쪽에 있다. 제대로 된 오케스트레이션 런타임이 있다면 부분 실패 롤백이 단순해질 것.',
          '품질 게이트 임계값(80 / 60)이 하드코딩되어 있다. 프로젝트별 리스크 허용치에 따라 튜닝 가능해야 한다.',
          '디자인 스타일 카탈로그가 플랫하다 — 용도별(마케팅, 대시보드, 에디토리얼) 그룹화가 디스커버리를 가속할 것.',
        ],
        ja: [
          'コーディネーターロジックはまだプラグイン側にある。本格的なオーケストレーションランタイムがあれば部分障害のロールバックが単純になるはず。',
          '品質ゲートの閾値（80 / 60）がハードコーディングされている。プロジェクト別のリスク許容度に応じて調整可能にすべき。',
          'デザインスタイルカタログがフラット — 用途別（マーケティング、ダッシュボード、エディトリアル）のグループ化がディスカバリーを加速する。',
        ],
      },
    },
    byTheNumbers: [
      { label: { en: 'Full pipeline runtime', ko: '전체 파이프라인 런타임', ja: '全パイプライン実行時間' }, value: '~6 min' },
      { label: { en: 'Sequential baseline', ko: '순차 처리 베이스라인', ja: '順次ベースライン' }, value: '~20 min' },
      { label: { en: 'Plugins', ko: '플러그인 수', ja: 'プラグイン数' }, value: '1 (wigtn-coding)' },
      { label: { en: 'Top-level commands', ko: '최상위 커맨드', ja: 'トップレベルコマンド' }, value: '3 (/prd, /implement, /auto-commit)' },
      { label: { en: 'Agents', ko: '에이전트', ja: 'エージェント' }, value: '12 (4 coord · 4 dev · 4 quality)' },
      { label: { en: 'Skills', ko: '스킬', ja: 'スキル' }, value: '3' },
      { label: { en: 'Hooks', ko: '훅', ja: 'フック' }, value: '4' },
      { label: { en: 'Design styles', ko: '디자인 스타일', ja: 'デザインスタイル' }, value: '20' },
      { label: { en: 'PRD analysis categories', ko: 'PRD 분석 카테고리', ja: 'PRD分析カテゴリ' }, value: '4' },
      { label: { en: 'Code review scoring', ko: '코드 리뷰 스코어링', ja: 'コードレビュースコアリング' }, value: '100-point · 5 categories' },
      { label: { en: 'Parallel review agents', ko: '병렬 리뷰 에이전트', ja: '並列レビューエージェント' }, value: '3' },
      { label: { en: 'GitHub stars', ko: 'GitHub 스타', ja: 'GitHub スター' }, value: '44' },
      { label: { en: 'License', ko: '라이선스', ja: 'ライセンス' }, value: 'Apache 2.0' },
    ],
    sourceUrl: 'https://github.com/wigtn/wigtn-plugins-with-claude-code',
  },

  wigent: {
    slug: 'wigent',
    oneLiner: {
      en: 'Drop a topic, watch AI agents debate it live — then a landing page writes itself from the conclusions.',
      ko: '주제를 던지면 AI 에이전트들이 실시간으로 토론하고, 그 결론으로 랜딩 페이지가 스스로 완성된다.',
      ja: 'トピックを投げれば、AIエージェントたちがリアルタイムで議論し、その結論からランディングページが自動生成される。',
    },
    problem: {
      en: [
        'Solo brainstorming is biased — you fall in love with your own idea and can\'t see blind spots.',
        'Team discussions are slow — it takes hours to reach a conclusion that might still be half-baked.',
        'AI chat tools are one-dimensional — ChatGPT gives you a single, agreeable response. There\'s no debate.',
      ],
      ko: [
        '혼자 하는 브레인스토밍은 편향된다 — 자기 아이디어에 빠져서 맹점을 못 본다.',
        '팀 토론은 느리다 — 반쯤 설익은 결론에 도달하는 데도 몇 시간이 걸린다.',
        'AI 챗 도구는 1차원적이다 — ChatGPT는 하나의 순응적 답변만 준다. 토론이 없다.',
      ],
      ja: [
        '一人のブレインストーミングは偏る — 自分のアイデアに惚れ込み、盲点が見えなくなる。',
        'チーム議論は遅い — 中途半端な結論に至るだけでも数時間かかる。',
        'AIチャットツールは一次元的 — ChatGPTは一つの従順な回答を返すだけ。議論がない。',
      ],
    },
    solution: {
      en: [
        'Multi-agent debate platform where a PM agent orchestrates auto-spawned domain experts in a Slack-style chat UI.',
        '30-turn free-format debate with automatic phase transitions — at turns 12 and 22, non-fixed agents are retired and replaced with new specialists.',
        'Results synthesize into a structured business idea, then render as a landing page from 9 design templates.',
        'Human-in-the-loop: users can reject results, triggering 8 additional debate turns without re-entering the conversation.',
      ],
      ko: [
        'PM 에이전트가 자동 스폰된 도메인 전문가들을 Slack 스타일 채팅 UI에서 지휘하는 멀티 에이전트 토론 플랫폼.',
        '자동 페이즈 전환이 있는 30턴 자유 형식 토론 — 턴 12와 22에서 고정되지 않은 에이전트가 퇴장하고 새 전문가로 교체된다.',
        '결과는 구조화된 비즈니스 아이디어로 합쳐진 뒤, 9개 디자인 템플릿 중 하나로 랜딩 페이지가 그려진다.',
        'Human-in-the-loop: 사용자가 결과를 거절하면 토론에 재진입하지 않고도 8턴이 추가된다.',
      ],
      ja: [
        'PMエージェントが自動生成されたドメイン専門家たちをSlack風チャットUIで指揮するマルチエージェント議論プラットフォーム。',
        '自動フェーズ遷移付き30ターン自由形式議論 — ターン12と22で非固定エージェントが退場し、新しい専門家に置き換わる。',
        '結果は構造化されたビジネスアイデアに統合され、9つのデザインテンプレートからランディングページが描画される。',
        'Human-in-the-loop：ユーザーが結果を却下すると、議論に再参加せずとも8ターンが追加される。',
      ],
    },
    metrics: [
      { value: '55 min', label: { en: 'To Working Prototype', ko: '동작 프로토타입까지', ja: '動作プロトタイプまで' } },
      { value: '26', label: { en: 'Commits', ko: '커밋', ja: 'コミット' } },
      { value: '0', label: { en: 'Merge Conflicts', ko: '머지 컨플릭트', ja: 'マージコンフリクト' } },
      { value: '8', label: { en: 'Agent Patterns', ko: '에이전트 패턴', ja: 'エージェントパターン' } },
    ],
    techStack: [
      {
        category: { en: 'Framework & Language', ko: '프레임워크 & 언어', ja: 'フレームワーク & 言語' },
        items: ['Next.js 16 (App Router)', 'React 19', 'TypeScript (strict)', 'Tailwind CSS v4', 'Framer Motion'],
      },
      {
        category: { en: 'AI & Backend', ko: 'AI & 백엔드', ja: 'AI & バックエンド' },
        items: ['OpenAI GPT-4o', 'SSE (Server-Sent Events)', 'AsyncGenerator orchestrator', 'AbortController'],
      },
      {
        category: { en: 'Frontend State', ko: '프론트엔드 상태', ja: 'フロントエンド状態' },
        items: ['React useReducer (13 event types)', 'SSE ReadableStream parser', 'Sandbox iframe', 'localStorage'],
      },
    ],
    architecture: [
      {
        title: { en: 'Orchestrator — AsyncGenerator', ko: '오케스트레이터 — AsyncGenerator', ja: 'オーケストレーター — AsyncGenerator' },
        body: {
          en: 'Controls the full lifecycle: 30 turns of debate, summarization, result synthesis, and landing-page generation. Yields typed events the API layer can forward.',
          ko: '전체 라이프사이클을 통제한다: 30턴 토론, 요약, 결과 합성, 랜딩 페이지 생성. API 레이어가 포워딩할 수 있는 타입드 이벤트를 yield한다.',
          ja: '全ライフサイクルを制御：30ターンの議論、要約、結果統合、ランディングページ生成。APIレイヤーがフォワード可能な型付きイベントをyieldする。',
        },
      },
      {
        title: { en: 'API Route — SSE Stream', ko: 'API 라우트 — SSE 스트림', ja: 'APIルート — SSEストリーム' },
        body: {
          en: 'Consumes the orchestrator via `for-await-of` and forwards every event as a Server-Sent Event to the client. One HTTP request, one stream, no polling.',
          ko: '`for-await-of`로 오케스트레이터를 소비하고 모든 이벤트를 Server-Sent Event로 클라이언트에 포워딩한다. HTTP 요청 하나, 스트림 하나, 폴링 없음.',
          ja: '`for-await-of`でオーケストレーターを消費し、全イベントをServer-Sent Eventとしてクライアントに転送する。HTTPリクエスト1つ、ストリーム1つ、ポーリングなし。',
        },
      },
      {
        title: { en: 'Frontend — useReducer', ko: '프론트엔드 — useReducer', ja: 'フロントエンド — useReducer' },
        body: {
          en: 'Parses the SSE stream and dispatches 13 event types into a single reducer that owns all UI state transitions.',
          ko: 'SSE 스트림을 파싱하고 13개 이벤트 타입을 모든 UI 상태 전환을 소유한 단일 리듀서에 디스패치한다.',
          ja: 'SSEストリームをパースし、13のイベントタイプを全UI状態遷移を所有する単一リデューサーにディスパッチする。',
        },
      },
      {
        title: { en: 'Contract-First Development', ko: '컨트랙트 우선 개발', ja: 'コントラクトファースト開発' },
        body: {
          en: 'A 281-line `types.ts` defined every interface the team would need before implementation. 3 people wrote backend, UI and hooks in parallel for 3.5 hours with zero merge conflicts.',
          ko: '281줄짜리 `types.ts`가 구현 전에 팀이 필요로 하는 모든 인터페이스를 정의했다. 3명이 백엔드, UI, 훅을 3.5시간 동안 병렬로 작성했는데 머지 컨플릭트 0건.',
          ja: '281行の`types.ts`が実装前にチームが必要とする全インターフェースを定義。3人がバックエンド、UI、フックを3.5時間並列で実装し、マージコンフリクトゼロ。',
        },
      },
    ],
    deepDives: [
      {
        title: { en: 'SSE + AsyncGenerator', ko: 'SSE + AsyncGenerator', ja: 'SSE + AsyncGenerator' },
        body: {
          en: 'Orchestrator yields typed events; the API consumes them via `for-await-of` and streams each one to the client as it happens.',
          ko: '오케스트레이터가 타입드 이벤트를 yield하면, API가 `for-await-of`로 소비해 발생 즉시 클라이언트에 스트리밍한다.',
          ja: 'オーケストレーターが型付きイベントをyieldし、APIが`for-await-of`で消費して発生と同時にクライアントにストリーミングする。',
        },
      },
      {
        title: { en: 'Speaker Selection Algorithm', ko: '스피커 선택 알고리즘', ja: 'スピーカー選択アルゴリズム' },
        body: {
          en: 'Filter online agents, exclude the last speaker, sort by speak-count ascending — keeps quiet agents in the loop and prevents any single voice from dominating.',
          ko: '온라인 에이전트를 필터링하고, 직전 스피커를 제외한 뒤, 발화 횟수 오름차순으로 정렬. 조용한 에이전트를 루프에 유지하고 한 명이 대화를 장악하지 못하게 한다.',
          ja: 'オンラインエージェントをフィルタし、直前のスピーカーを除外、発話回数の昇順でソート。静かなエージェントをループに保ち、単一の声が場を支配しないようにする。',
        },
      },
      {
        title: { en: 'Agent Persona Engineering', ko: '에이전트 페르소나 엔지니어링', ja: 'エージェントペルソナエンジニアリング' },
        body: {
          en: 'Specific speech patterns (e.g. "근데 이거 누가 쓰는데?" for PM) create natural conversation instead of generic LLM voice.',
          ko: '특정 말투(예: PM의 "근데 이거 누가 쓰는데?") 가 일반적인 LLM 목소리 대신 자연스러운 대화를 만든다.',
          ja: '特定の口調（例：PMの「근데 이거 누가 쓰는데?」）が一般的なLLMの声ではなく自然な会話を生み出す。',
        },
      },
      {
        title: { en: 'Random Inter-Agent Delay', ko: '에이전트 간 랜덤 딜레이', ja: 'エージェント間ランダム遅延' },
        body: {
          en: '800–2500ms delay injected between turns to break the instant-response illusion and make the debate feel human.',
          ko: '턴 사이에 800~2500ms 딜레이를 주입해 즉답 환상을 깨고 토론이 사람 같이 느껴지게 한다.',
          ja: 'ターン間に800〜2500msの遅延を注入し、即答の幻想を壊して議論を人間らしく感じさせる。',
        },
      },
      {
        title: { en: 'Dual-Path Rendering', ko: '듀얼 패스 렌더링', ja: 'デュアルパスレンダリング' },
        body: {
          en: 'Instant template selection runs in parallel with background GPT generation — users see a landing page immediately, then it upgrades in place.',
          ko: '즉시 템플릿 선택이 백그라운드 GPT 생성과 병렬로 돈다 — 사용자는 랜딩 페이지를 즉시 보고, 이후 제자리에서 업그레이드된다.',
          ja: '即時テンプレート選択とバックグラウンドGPT生成が並列で動く — ユーザーはランディングページを即座に見て、その後インプレースでアップグレードされる。',
        },
      },
      {
        title: { en: 'Forced Convergence Prompts', ko: '강제 수렴 프롬프트', ja: '強制収束プロンプト' },
        body: {
          en: 'After turn 25 the system prompt enforces conclusions: "No new ideas allowed." Without this agents debate forever.',
          ko: '턴 25 이후 시스템 프롬프트가 결론을 강제한다: "새 아이디어 금지". 이게 없으면 에이전트들은 영원히 토론한다.',
          ja: 'ターン25以降、システムプロンプトが結論を強制する：「新しいアイデア禁止」。これがないとエージェントは永遠に議論する。',
        },
      },
      {
        title: { en: 'GPT-4o Refusal Handling', ko: 'GPT-4o 거부 핸들링', ja: 'GPT-4o 拒否ハンドリング' },
        body: {
          en: 'Detects missing HTML tags in generation output and falls back to a minimal template — zero hard failures during the demo.',
          ko: '생성 출력에서 HTML 태그 누락을 감지하고 미니멀 템플릿으로 폴백한다 — 데모 중 하드 페일 0건.',
          ja: '生成出力のHTMLタグ欠落を検出し、ミニマルテンプレートにフォールバックする — デモ中のハードフェイル0件。',
        },
      },
      {
        title: { en: 'Reject → Continue Pattern', ko: 'Reject → Continue 패턴', ja: 'Reject → Continueパターン' },
        body: {
          en: 'Rejection triggers 8 more turns without the user re-entering the debate. One click, more signal.',
          ko: '거절 한 번이면 사용자가 토론에 재진입하지 않고도 8턴이 추가된다. 클릭 한 번, 시그널은 더.',
          ja: '却下一つでユーザーが議論に再参加せずとも8ターンが追加される。ワンクリック、より多くのシグナル。',
        },
      },
    ],
    timeline: [
      {
        time: '13:37',
        title: { en: 'PRD v2.0 — Slack UI + full-page swap', ko: 'PRD v2.0 — Slack UI + 페이지 전환', ja: 'PRD v2.0 — Slack UI + ページスワップ' },
        body: {
          en: 'Demo strategy locked, reverse-engineered from judging criteria.',
          ko: '데모 전략 확정. 심사 기준에서 역설계.',
          ja: 'デモ戦略確定。審査基準から逆算。',
        },
      },
      {
        time: '13:43',
        title: { en: 'types.ts contract (281 lines)', ko: 'types.ts 컨트랙트 (281줄)', ja: 'types.tsコントラクト（281行）' },
        body: {
          en: 'Interface surface frozen, unblocking parallel work.',
          ko: '인터페이스 표면 고정, 병렬 작업 해제.',
          ja: 'インターフェース面を凍結、並列作業を解放。',
        },
      },
      {
        time: '13:48',
        title: { en: 'P1 + P2 + P3 committed in parallel', ko: 'P1 + P2 + P3 병렬 커밋', ja: 'P1 + P2 + P3を並列コミット' },
        body: {
          en: 'Backend, UI and hooks all landed within a minute of each other.',
          ko: '백엔드, UI, 훅이 서로 1분 안에 모두 랜딩.',
          ja: 'バックエンド、UI、フックが互いに1分以内に全て着地。',
        },
      },
      {
        time: '13:54',
        title: { en: 'End-to-end prototype working', ko: 'E2E 프로토타입 동작', ja: 'E2Eプロトタイプ動作' },
        body: {
          en: '55 minutes from PRD to live debate.',
          ko: 'PRD부터 라이브 토론까지 55분.',
          ja: 'PRDからライブ議論まで55分。',
        },
      },
      {
        time: '14:48',
        title: { en: 'Rounds → free 30-turn debate', ko: '라운드 → 자유 30턴 토론', ja: 'ラウンド → 自由30ターン議論' },
        body: {
          en: "Real meetings don't announce 'Round 2' — the discrete rounds felt robotic.",
          ko: "실제 회의는 '2라운드'를 선언하지 않는다 — 이산적 라운드는 로봇 같았다.",
          ja: "実際の会議は「2ラウンド目」と宣言しない — 離散的なラウンドはロボット的だった。",
        },
      },
      {
        time: '15:06',
        title: { en: '9 design templates — instant render', ko: '9개 디자인 템플릿 — 즉시 렌더', ja: '9つのデザインテンプレート — 即時レンダー' },
        body: {
          en: 'Eliminated the 60-second wait for GPT HTML generation.',
          ko: 'GPT HTML 생성 60초 대기를 제거.',
          ja: 'GPT HTML生成の60秒待機を排除。',
        },
      },
      {
        time: '15:13',
        title: { en: 'Forced convergence prompts', ko: '강제 수렴 프롬프트', ja: '強制収束プロンプト' },
        body: {
          en: 'Agents actually reach conclusions by turn 25+.',
          ko: '에이전트들이 턴 25+에서 실제로 결론에 도달.',
          ja: 'エージェントがターン25+で実際に結論に到達。',
        },
      },
      {
        time: '15:55',
        title: { en: 'Final commit — ship it', ko: '최종 커밋 — 출시', ja: '最終コミット — 出荷' },
        body: { en: 'Lint clean, demo recorded.', ko: '린트 클린, 데모 녹화 완료.', ja: 'Lintクリーン、デモ録画完了。' },
      },
    ],
    lessons: {
      worked: {
        en: [
          '5 minutes defining types.ts prevented every merge conflict for the next 3 hours.',
          'Demo-driven architecture — designed backwards from the judging criteria.',
          'Fearless pivoting — four pivots in 3 hours, each completed in ~30 minutes.',
          'Claude Code for parallel generation: P2 emitted 10 Slack UI components in a single shot.',
        ],
        ko: [
          'types.ts 정의에 쓴 5분이 이후 3시간 동안의 모든 머지 컨플릭트를 막았다.',
          '데모 주도 아키텍처 — 심사 기준에서 역방향으로 설계.',
          '겁 없는 피벗 — 3시간 동안 4번 피벗, 각각 약 30분 내 완료.',
          '병렬 생성을 위한 Claude Code: P2가 Slack UI 컴포넌트 10개를 한 번에 뽑아냄.',
        ],
        ja: [
          'types.ts定義に使った5分が、その後3時間の全マージコンフリクトを防いだ。',
          'デモ駆動アーキテクチャ — 審査基準から逆算して設計。',
          '恐れなきピボット — 3時間で4回のピボット、それぞれ約30分で完了。',
          '並列生成のためのClaude Code：P2がSlack UIコンポーネント10個を一発で出力。',
        ],
      },
      wouldChange: {
        en: [
          'Let the user participate mid-debate — current flow is spectator-only.',
          'Model tiering — only critical turns need GPT-4o; the rest could use GPT-4o-mini at 1/10th the cost.',
          'Zero tests shipped — orchestrator, reducer and SSE parser all need unit coverage.',
          'Drag-and-drop landing-page editor would beat reject-only iteration.',
        ],
        ko: [
          '사용자가 토론 중간에 참여하게 — 지금은 관중 전용.',
          '모델 티어링 — 중요한 턴만 GPT-4o가 필요. 나머지는 GPT-4o-mini로 비용 1/10.',
          '테스트 제로로 출시 — 오케스트레이터, 리듀서, SSE 파서 모두 유닛 커버리지 필요.',
          '드래그앤드롭 랜딩 페이지 에디터가 거절 전용 이터레이션보다 낫다.',
        ],
        ja: [
          'ユーザーが議論の途中で参加できるように — 今は観客専用。',
          'モデルティアリング — 重要なターンだけGPT-4oが必要。残りはGPT-4o-miniでコスト1/10。',
          'テストゼロで出荷 — オーケストレーター、リデューサー、SSEパーサー全てユニットカバレッジ必要。',
          'ドラッグ＆ドロップのランディングページエディターが却下のみのイテレーションより優れる。',
        ],
      },
    },
    byTheNumbers: [
      { label: { en: 'Development time', ko: '개발 시간', ja: '開発時間' }, value: '3.5 hours' },
      { label: { en: 'Commits', ko: '커밋', ja: 'コミット' }, value: '26' },
      { label: { en: 'Working prototype', ko: '동작 프로토타입', ja: '動作プロトタイプ' }, value: '55 min' },
      { label: { en: 'Source files', ko: '소스 파일', ja: 'ソースファイル' }, value: '26' },
      { label: { en: 'Components', ko: '컴포넌트', ja: 'コンポーネント' }, value: '16 (8 chat + 8 other)' },
      { label: { en: 'SSE event types', ko: 'SSE 이벤트 타입', ja: 'SSEイベントタイプ' }, value: '13' },
      { label: { en: 'GPT-4o calls / session', ko: 'GPT-4o 호출 / 세션', ja: 'GPT-4o呼び出し / セッション' }, value: '~35' },
      { label: { en: 'Design templates', ko: '디자인 템플릿', ja: 'デザインテンプレート' }, value: '9' },
      { label: { en: 'Prompt functions', ko: '프롬프트 함수', ja: 'プロンプト関数' }, value: '7' },
      { label: { en: 'Agent patterns', ko: '에이전트 패턴', ja: 'エージェントパターン' }, value: '8' },
      { label: { en: 'Team members', ko: '팀 멤버', ja: 'チームメンバー' }, value: '3' },
      { label: { en: 'Merge conflicts', ko: '머지 컨플릭트', ja: 'マージコンフリクト' }, value: '0' },
    ],
    sourceUrl: 'https://wigtn.com/projects/wigent',
  },

  wigtnflake: {
    slug: 'wigtnflake',
    oneLiner: {
      en: 'Pick a goal — open a cafe, allocate rental-ad budget, find a billboard site. Five Cortex-powered experts cross-debate four real datasets and answer with a Top 3 ranking, anomaly badges, and a 6-month forecast.',
      ko: '목적을 고르면 — 카페 창업, 렌탈 광고 예산, 광고판 입지 — Cortex 전문가 5명이 네 개의 실데이터를 교차 토론해 Top 3 동네 + 이상 시그널 + 6개월 예측을 답으로 던진다.',
      ja: '目的を選べば — カフェ創業、レンタル広告予算、看板立地 — Cortex専門家5名が4つの実データを横断議論し、Top 3地域 + 異常シグナル + 6ヶ月予測を返す。',
    },
    problem: {
      en: [
        'Picking where to open a cafe, where to invest, or where to move is a billion-won decision — and most people make it on gut.',
        'The signals are out there (foot traffic, card sales, telecom contracts, real-estate prices) but they live in four different vendors with four different schemas. No one combines them.',
        'Professional consulting that actually does the cross-dataset read costs millions of won per report — out of reach for small business owners.',
        'Single-LLM tools (ChatGPT, Gemini) give one biased, hallucination-prone answer. There is no second opinion, no dissent, no data grounding.',
      ],
      ko: [
        '창업 입지, 부동산 투자, 거주지 이사는 수억 원짜리 결정인데, 대부분 감으로 한다.',
        '시그널은 흩어져 있다 — 유동인구, 카드매출, 통신계약, 부동산 시세. 네 개 벤더에 네 개 스키마. 아무도 합쳐주지 않는다.',
        '실제로 네 가지를 교차해서 읽어주는 전문 컨설팅은 보고서 한 건에 수백만 원. 소상공인에겐 진입 자체가 막힌다.',
        '단일 LLM 도구(ChatGPT, Gemini)는 편향되고 환각이 섞인 한 가지 답을 준다. 반론도, 교차 검증도, 데이터 그라운딩도 없다.',
      ],
      ja: [
        '創業立地、不動産投資、引越しは数億円が動く決定なのに、ほとんどが勘で決まる。',
        'シグナルは散らばっている — 人流、カード売上、通信契約、不動産価格。4ベンダー、4スキーマ、誰も統合しない。',
        '実際に4つを横断して読み解く専門コンサルは1レポート数百万円。個人事業主には入り口自体がない。',
        '単体LLMツール(ChatGPT, Gemini)は偏向と幻覚を混ぜた一つの答えを返すだけ。反論も交差検証もデータグラウンディングもない。',
      ],
    },
    solution: {
      en: [
        'Purpose-first UX — the user picks *what they want to do* (5 presets + free input), not a topic. Same district scores differently depending on the goal.',
        'Five-expert Cortex debate — PM facilitator, data analyst, forecast analyst, insight analyst, sentiment/news analyst — each grounded in real Snowflake data, not vibes.',
        'ANOMALY_DETECTION promoted from supporting role to demo climax — auto-injects "watch this district" badges into the ranking when something is statistically off.',
        'Hybrid AI: Cortex for SQL/forecast/report, GPT-4o for personas and function calling. Each model does what benchmarks say it does best.',
        '3-tier fallback ladder: Cortex Agent → Cortex Analyst direct call → GPT-4o function calling → GPT-4o pure reasoning. Trial-account ceiling never breaks the demo.',
      ],
      ko: [
        '목적 우선 UX — 사용자는 *무엇을 하고 싶은지* 고른다(5개 프리셋 + 자유 입력). 같은 동네라도 목적에 따라 점수가 달라진다.',
        '5인 Cortex 토론 — PM 진행자, 데이터 분석가, 예측 분석가, 인사이트 분석가, 감성/뉴스 분석가. 모두 실제 Snowflake 데이터에 그라운딩된다. 분위기가 아니라.',
        'ANOMALY_DETECTION을 보조에서 주연으로 승격 — 통계적 이상치가 잡히면 랭킹에 "지금 이 동네 주목" 배지를 자동 주입. 데모 클라이맥스.',
        '하이브리드 AI: Cortex는 SQL/예측/리포트, GPT-4o는 페르소나/함수콜링. 벤치마크가 잘한다고 한 일을 각자에게 맡긴다.',
        '3단 폴백 사다리: Cortex Agent → Cortex Analyst 직접 호출 → GPT-4o Function Calling → GPT-4o 순수 추론. Trial 계정 한계가 데모를 절대 깨지 않는다.',
      ],
      ja: [
        '目的優先UX — ユーザーは*何をしたいか*を選ぶ(5プリセット + 自由入力)。同じ地域でも目的によりスコアが変わる。',
        '5名Cortex議論 — PM進行役、データアナリスト、予測アナリスト、インサイトアナリスト、センチメント/ニュースアナリスト。全員Snowflake実データに接地、雰囲気ではない。',
        'ANOMALY_DETECTIONを脇役から主役に昇格 — 統計的異常を検知するとランキングに「今この地域注目」バッジを自動注入。デモのクライマックス。',
        'ハイブリッドAI：CortexはSQL/予測/レポート、GPT-4oはペルソナ/関数呼び出し。ベンチマークで得意と言われた仕事を各々に任せる。',
        '3段フォールバック：Cortex Agent → Cortex Analyst直接呼び出し → GPT-4o Function Calling → GPT-4o純粋推論。トライアル制約がデモを絶対に壊さない。',
      ],
    },
    metrics: [
      { value: '2nd', label: { en: 'Snowflake Hackathon 2026', ko: 'Snowflake 해커톤 2026', ja: 'Snowflakeハッカソン 2026' } },
      { value: '11', label: { en: 'Cortex Functions Used', ko: 'Cortex 기능 활용', ja: 'Cortex機能活用' } },
      { value: '4', label: { en: 'Datasets Cross-Queried', ko: '데이터셋 교차 조회', ja: 'データセット横断クエリ' } },
      { value: '5', label: { en: 'Experts per Session', ko: '세션당 전문가', ja: 'セッションあたり専門家' } },
    ],
    techStack: [
      {
        category: { en: 'Snowflake Cortex (11 functions)', ko: 'Snowflake Cortex (11개 기능)', ja: 'Snowflake Cortex (11機能)' },
        items: [
          'Cortex Agent (orchestration; Analyst-direct fallback)',
          'Cortex Analyst × 4 (text-to-SQL on Semantic YAML)',
          'Cortex LLM (claude-4-sonnet) — streaming markdown',
          'FORECAST × 3 (pre-trained time-series models)',
          'ANOMALY_DETECTION ⭐ (demo climax)',
          'AI_SENTIMENT · AI_CLASSIFY · data_to_chart',
          'Dynamic Tables × 2 (DT_DISTRICT_HEALTH / DNA)',
          'Python UDF × 2 (decoupling index, DNA similarity)',
          'Semantic Model YAML × 4',
        ],
      },
      {
        category: { en: 'Application', ko: '애플리케이션', ja: 'アプリケーション' },
        items: [
          'Next.js 16 (App Router · API Routes/SSE)',
          'React 19 (React Compiler)',
          'TypeScript 5.9 (strict)',
          'Tailwind CSS 4',
          'Framer Motion 12',
          'Vega-Lite 6 (chart rendering)',
        ],
      },
      {
        category: { en: 'AI Bridge & Data', ko: 'AI 브리지 & 데이터', ja: 'AIブリッジ & データ' },
        items: [
          'GPT-4o (debate personas · function calling)',
          'OpenAI SDK 6 (Cortex LLM via OpenAI-compatible endpoint)',
          'snowflake-sdk 1.15 (direct connection)',
          'Tavily (web search for news analyst)',
          'MOLIT public API (real-estate transactions)',
          'SPH · RichGo · NextTrade · AJD (4 datasets)',
        ],
      },
    ],
    architecture: [
      {
        title: { en: 'Brain Layer — GPT-4o Orchestrator', ko: 'Brain Layer — GPT-4o 오케스트레이터', ja: 'Brain Layer — GPT-4oオーケストレーター' },
        body: {
          en: 'Cortex inside Snowflake cannot yet drive a multi-agent debate with distinct personas reliably, so we put GPT-4o on top as the orchestrator. It owns turn-taking, persona dispatch, and reasoning across the five experts (PM facilitator, data analyst, forecast analyst, insight analyst, sentiment/news analyst).',
          ko: 'Snowflake 내부 Cortex로는 아직 멀티 에이전트 토론에 필요한 뚜렷한 페르소나 구현이 어렵다. 그래서 GPT-4o를 오케스트레이터로 얹었다. 턴 진행, 페르소나 디스패치, 5명 전문가(PM 진행자, 데이터 분석가, 예측 분석가, 인사이트 분석가, 감성/뉴스 분석가)에 걸친 추론을 책임진다.',
          ja: 'Snowflake内部Cortexだけではマルチエージェント議論に必要な明確なペルソナ表現が難しいため、GPT-4oをオーケストレーターとして上に置いた。ターン進行、ペルソナディスパッチ、5名の専門家にまたがる推論を担当する。',
        },
      },
      {
        title: { en: 'Data Layer — Cortex Analyst × 4', ko: 'Data Layer — Cortex Analyst × 4', ja: 'Data Layer — Cortex Analyst × 4' },
        body: {
          en: 'Per-dataset Semantic YAMLs (SPH foot traffic + card sales + KCB income, RichGo real estate, NextTrade equities, AJD telecom) feed Cortex Analyst, which converts each natural-language question into precise SQL. Forecast and anomaly answers come from FORECAST and ANOMALY_DETECTION called as the experts hand the floor to each other — debate triggers ML, not the other way around.',
          ko: '데이터셋별 Semantic YAML(SPH 유동인구+카드매출+KCB 자산소득, RichGo 부동산, NextTrade 주식, AJD 통신)이 Cortex Analyst의 입력이 된다. 자연어 질문이 정확한 SQL로 변환된다. 예측·이상치 답은 전문가들이 발언권을 넘기는 사이 FORECAST와 ANOMALY_DETECTION이 호출돼서 나온다. 토론이 ML을 부른다, 그 반대가 아니다.',
          ja: 'データセット別Semantic YAML(SPH人流+カード売上+KCB資産所得、RichGo不動産、NextTrade株式、AJD通信)がCortex Analystの入力になる。自然言語の質問が正確なSQLに変換される。予測・異常値の答えは専門家が発言を回す中でFORECASTとANOMALY_DETECTIONが呼ばれて出る。議論がMLを呼ぶ。逆ではない。',
        },
      },
      {
        title: { en: 'Render Layer — Cortex LLM Streaming Markdown', ko: 'Render Layer — Cortex LLM 스트리밍 마크다운', ja: 'Render Layer — Cortex LLM ストリーミングマークダウン' },
        body: {
          en: 'Final report is rendered by Cortex LLM (claude-4-sonnet) as streaming markdown — Top 3 ranking cards, anomaly badges, 6-month forecast charts (Vega-Lite), and a purpose-specific action checklist. Benchmarked at 17.3s / 1657 chars / 0 garbage tokens vs. snowflake-llama-3.3-70b at 38.4s with token collapse in some sessions.',
          ko: '최종 리포트는 Cortex LLM(claude-4-sonnet)이 스트리밍 마크다운으로 렌더링한다 — Top 3 랭킹 카드, 이상 시그널 배지, 6개월 예측 차트(Vega-Lite), 목적별 액션 체크리스트. 벤치 17.3초 / 1657자 / 가비지 0건. snowflake-llama-3.3-70b는 같은 태스크에서 38.4초 + 일부 세션 토큰 붕괴.',
          ja: '最終レポートはCortex LLM(claude-4-sonnet)がストリーミングマークダウンでレンダリング — Top 3ランキングカード、異常シグナルバッジ、6ヶ月予測チャート(Vega-Lite)、目的別アクションチェックリスト。ベンチで17.3秒/1657文字/ゴミトークン0、snowflake-llama-3.3-70bは同タスクで38.4秒+一部セッションでトークン崩壊。',
        },
      },
      {
        title: { en: '3-Tier Fallback Ladder', ko: '3단 폴백 사다리', ja: '3段フォールバックラダー' },
        body: {
          en: 'Tier 1: Cortex Agent runs Analyst×4 + data_to_chart. Tier 2 (when the trial account blocks Agent): Cortex Analyst is called as an endpoint directly. Tier 3: GPT-4o function calling with `execute_snowflake_sql`, `web_search`, `real_estate_transaction`, `statistical_analysis`. Tier 4: GPT-4o pure reasoning. The demo never crashes — it just downgrades gracefully.',
          ko: 'Tier 1: Cortex Agent가 Analyst×4 + data_to_chart 실행. Tier 2(Trial 계정이 Agent를 막을 때): Cortex Analyst를 Endpoint로 직접 호출. Tier 3: GPT-4o Function Calling — `execute_snowflake_sql`, `web_search`, `real_estate_transaction`, `statistical_analysis`. Tier 4: GPT-4o 순수 추론. 데모는 절대 죽지 않고, 우아하게 계급만 내려간다.',
          ja: 'Tier 1: Cortex AgentがAnalyst×4 + data_to_chart実行。Tier 2(トライアル制限時): Cortex AnalystをEndpoint直接呼び出し。Tier 3: GPT-4o Function Calling — `execute_snowflake_sql`, `web_search`, `real_estate_transaction`, `statistical_analysis`。Tier 4: GPT-4o純粋推論。デモは絶対に落ちず、優雅にダウングレードする。',
        },
      },
    ],
    deepDives: [
      {
        title: { en: 'Purpose Beats Topic', ko: '목적이 토픽을 이긴다', ja: '目的がトピックに勝つ' },
        body: {
          en: 'Most LLM products start with a free-text prompt. We started with five purpose cards (cafe / rental ads / billboard / investment / anomaly check) because the same district reads differently depending on the goal. Banpo-dong reads "saturated" to a cafe owner and "undervalued" to an investor. Topic-first asks the wrong question; purpose-first asks the right one.',
          ko: '대부분 LLM 제품은 자유 텍스트 프롬프트로 시작한다. 우리는 5개 목적 카드(카페 / 렌탈 / 광고판 / 투자 / 이상 시그널)로 시작했다. 같은 동네라도 목적에 따라 다르게 읽힌다. 반포동은 카페 사장에겐 "포화", 투자자에겐 "저평가". 토픽 우선은 틀린 질문을 던지고, 목적 우선은 맞는 질문을 던진다.',
          ja: 'ほとんどのLLM製品は自由テキストから始まる。我々は5つの目的カード(カフェ/レンタル/看板/投資/異常検知)から始めた。同じ地域でも目的により読みが変わる。盤浦洞はカフェ経営者には「飽和」、投資家には「低評価」。トピックファーストは間違った問いを投げ、目的ファーストは正しい問いを投げる。',
        },
      },
      {
        title: { en: 'Semantic YAML × 4 — Data Grounding', ko: 'Semantic YAML × 4 — 데이터 그라운딩', ja: 'Semantic YAML × 4 — データグラウンディング' },
        body: {
          en: 'Cortex Analyst is only as good as its Semantic Model. We hand-wrote four YAMLs (SPH, RichGo, NextTrade, AJD) with synonyms, dimension hierarchies, and pre-defined measures so a question like "30대 여성 직장인 유동인구 상위 동네" lands on the right columns. Cuts the hallucinated-column rate from "demo-killing" to "rare."',
          ko: 'Cortex Analyst는 Semantic Model 품질만큼만 잘한다. SPH/RichGo/NextTrade/AJD 4개 YAML을 동의어, 디멘전 계층, 사전 정의된 측정치까지 손으로 짰다. "30대 여성 직장인 유동인구 상위 동네" 같은 질문이 정확한 컬럼에 꽂히도록. 환각 컬럼 비율을 "데모 킬러"에서 "희귀 사건"으로 낮춤.',
          ja: 'Cortex AnalystはSemantic Model品質と同じだけ賢い。SPH/RichGo/NextTrade/AJDの4 YAMLを同義語、ディメンション階層、事前定義されたメジャーまで手書きした。「30代女性会社員の人流上位地域」のような問いが正確な列に着地するように。幻覚列率を「デモキラー」から「稀」に下げた。',
        },
      },
      {
        title: { en: 'Anomaly as Demo Climax', ko: 'Anomaly를 데모 클라이맥스로', ja: 'Anomalyをデモのクライマックスに' },
        body: {
          en: 'In v3 ANOMALY_DETECTION was a side feature. In v4 it became the demo climax — when the experts finish ranking, a final pass injects "watch this district" badges based on statistical outliers, and the panel literally reacts. Same Snowflake function, different staging.',
          ko: 'v3에서 ANOMALY_DETECTION은 보조 기능이었다. v4에서 데모 클라이맥스로 승격했다 — 전문가들이 랭킹을 끝내면, 마지막 패스에서 통계적 이상치 기반 "지금 이 동네 주목" 배지가 주입되고, 심사위원이 실제로 반응한다. 같은 Snowflake 기능, 다른 무대 연출.',
          ja: 'v3ではANOMALY_DETECTIONはサブ機能だった。v4でデモのクライマックスに昇格 — 専門家がランキングを終えると、最終パスで統計的外れ値に基づく「今この地域注目」バッジが注入され、審査員が実際に反応する。同じSnowflake機能、違う演出。',
        },
      },
      {
        title: { en: 'Hybrid Model Strategy', ko: '하이브리드 모델 전략', ja: 'ハイブリッドモデル戦略' },
        body: {
          en: 'Cortex LLM (claude-4-sonnet) for long Korean reports — 17.3s / 1657 chars / no garbage. GPT-4o for personas and function calling because Cortex personas felt flat and Cortex function calling was unreliable in the trial environment. We picked per task, not per principle.',
          ko: '긴 한글 리포트는 Cortex LLM(claude-4-sonnet) — 17.3초 / 1657자 / 가비지 없음. 페르소나와 Function Calling은 GPT-4o — Cortex 페르소나는 평평하게 느껴졌고 Trial 환경에서 Function Calling이 불안정. 원칙이 아니라 태스크별로 골랐다.',
          ja: '長い韓国語レポートはCortex LLM(claude-4-sonnet) — 17.3秒/1657文字/ゴミなし。ペルソナとFunction CallingはGPT-4o — Cortexペルソナは平板に感じ、トライアル環境でFunction Callingが不安定。原則ではなくタスク単位で選んだ。',
        },
      },
      {
        title: { en: 'Trial Account Workaround', ko: 'Trial 계정 우회', ja: 'トライアルアカウント回避' },
        body: {
          en: 'Snowflake trial blocks Cortex Agent, which is the official multi-tool orchestration entry point. We sidestepped it by calling Cortex Analyst as a REST endpoint directly — same Semantic Model, same SQL output, just one layer down. The fallback ladder catches the rest.',
          ko: 'Snowflake Trial은 Cortex Agent(공식 멀티 툴 오케스트레이션 입구)를 막는다. Cortex Analyst를 REST Endpoint로 직접 호출해서 한 계층 아래로 우회했다. 같은 Semantic Model, 같은 SQL 출력. 폴백 사다리가 나머지를 받쳐준다.',
          ja: 'SnowflakeトライアルはCortex Agent(公式マルチツール入口)をブロックする。Cortex AnalystをRESTエンドポイントとして直接呼び出し、一層下に回避した。同じSemantic Model、同じSQL出力。残りはフォールバックラダーが受け止める。',
        },
      },
      {
        title: { en: 'Token-Collapse Guard', ko: '토큰 붕괴 가드', ja: 'トークン崩壊ガード' },
        body: {
          en: 'Cortex LLM occasionally emits `<|reserved_special_token|>`, German nouns ("Dünnschicht"), or random surnames mid-stream. `hasGarbageTokens()` watches the stream live; first hit, we abort and fail over to GPT-4o without the user ever seeing junk in the report.',
          ko: 'Cortex LLM이 가끔 스트리밍 도중 `<|reserved_special_token|>`, 독일어 명사("Dünnschicht"), 무작위 성씨를 뱉는다. `hasGarbageTokens()`가 스트림을 라이브로 감시. 첫 번째 적중에서 즉시 중단하고 GPT-4o로 페일오버. 사용자는 리포트에서 쓰레기를 보지 않는다.',
          ja: 'Cortex LLMがストリーミング中に時々`<|reserved_special_token|>`、ドイツ語名詞(「Dünnschicht」)、ランダムな姓を吐く。`hasGarbageTokens()`がストリームをライブ監視。初ヒットで即中断しGPT-4oにフェイルオーバー。ユーザーはレポートでゴミを見ない。',
        },
      },
      {
        title: { en: '~90% Reuse from WIGENT', ko: 'WIGENT에서 ~90% 재활용', ja: 'WIGENTから~90%再利用' },
        body: {
          en: 'WIGENT (Build with TRAE 1st place) shipped a multi-agent orchestrator + SSE streaming + Slack-style chat in 3.5 hours. WIGTN FLAKE pivoted that codebase: the orchestrator, the SSE event protocol, the reducer, even the speaker-selection algorithm carried over. We spent the budget on the parts that were actually new — Cortex integration, Semantic YAMLs, fallback ladder.',
          ko: 'WIGENT(Build with TRAE 1등)는 3.5시간 만에 멀티 에이전트 오케스트레이터 + SSE 스트리밍 + Slack 스타일 채팅을 출시했다. WIGTN FLAKE는 그 코드베이스에서 피봇했다. 오케스트레이터, SSE 이벤트 프로토콜, 리듀서, 심지어 스피커 선택 알고리즘까지 그대로 가져왔다. 예산은 진짜 새로운 부분 — Cortex 통합, Semantic YAML, 폴백 사다리 — 에 썼다.',
          ja: 'WIGENT(Build with TRAE 1位)は3.5時間でマルチエージェントオーケストレーター + SSEストリーミング + Slack風チャットを出荷した。WIGTN FLAKEはそのコードベースからピボットした。オーケストレーター、SSEイベントプロトコル、リデューサー、スピーカー選択アルゴリズムまでそのまま継承。予算は本当に新しい部分 — Cortex統合、Semantic YAML、フォールバックラダー — に投じた。',
        },
      },
      {
        title: { en: 'Forced Convergence on Purpose', ko: '목적 기반 강제 수렴', ja: '目的駆動の強制収束' },
        body: {
          en: 'In WIGENT we forced agents to stop ideating after turn 25. Here we force them to *commit to a Top 3* — even "do not recommend" is a valid output, but it has to be a ranked, dataset-cited verdict, not a hedge. No "it depends" allowed in the final report.',
          ko: 'WIGENT에선 턴 25 이후 아이디어 발산을 강제로 멈췄다. 여기선 *Top 3 커밋*을 강제한다 — "추천 안 함"도 유효한 출력이지만, 데이터셋 인용이 붙은 랭킹 형태여야 한다. 최종 리포트에 "상황에 따라 다릅니다"는 허용 안 됨.',
          ja: 'WIGENTではターン25以降のアイデア発散を強制停止した。ここでは*Top 3への確約*を強制する — 「推奨しない」も有効な出力だが、データセット引用付きのランキング形式でなければならない。最終レポートに「場合による」は許されない。',
        },
      },
    ],
    timeline: [
      {
        time: '04-03',
        title: { en: 'Project kickoff · idea exploration', ko: '프로젝트 킥오프 · 아이디어 탐색', ja: 'プロジェクトキックオフ・アイデア探索' },
        body: {
          en: 'Snowflake Hackathon 2026 Korea registration. First idea board.',
          ko: 'Snowflake Hackathon 2026 Korea 등록. 첫 아이디어 보드.',
          ja: 'Snowflake Hackathon 2026 Korea登録。最初のアイデアボード。',
        },
      },
      {
        time: '04-04',
        title: { en: 'Cortex Agent / Analyst / LLM pipeline integrated', ko: 'Cortex Agent / Analyst / LLM 파이프라인 연결', ja: 'Cortex Agent / Analyst / LLMパイプライン統合' },
        body: {
          en: 'First end-to-end Snowflake call working through the Wigent orchestrator.',
          ko: 'Wigent 오케스트레이터를 통한 첫 E2E Snowflake 호출 성공.',
          ja: 'Wigentオーケストレーター経由の初E2E Snowflakeコール成功。',
        },
      },
      {
        time: '04-06',
        title: { en: 'DataPulse v2 PRD — 12-Cortex-feature multi-agent architecture', ko: 'DataPulse v2 PRD — 12개 Cortex 기능 멀티 에이전트 아키텍처', ja: 'DataPulse v2 PRD — Cortex 12機能マルチエージェント' },
        body: {
          en: 'First serious feature audit. 12 candidate Cortex functions ranked by demo value.',
          ko: '첫 본격 기능 감사. 데모 가치 기준 Cortex 후보 12개 랭킹.',
          ja: '初の本格機能監査。デモ価値基準でCortex候補12個をランキング。',
        },
      },
      {
        time: '04-10',
        title: { en: 'v3 — DNA profiling + FORECAST signal diagnosis', ko: 'v3 — DNA 프로파일링 + FORECAST 시그널 진단', ja: 'v3 — DNAプロファイリング + FORECASTシグナル診断' },
        body: {
          en: 'Dynamic Tables and Python UDFs added. District DNA scoring went live.',
          ko: 'Dynamic Tables와 Python UDF 추가. 동네 DNA 스코어링 가동.',
          ja: 'Dynamic TablesとPython UDF追加。地域DNAスコアリング稼働。',
        },
      },
      {
        time: '04-11',
        title: { en: 'Rebrand → WIGTN FLAKE · purpose-driven pivot', ko: '리브랜드 → WIGTN FLAKE · 목적 기반 피봇', ja: 'リブランド → WIGTN FLAKE · 目的駆動ピボット' },
        body: {
          en: 'The decisive turn: 5 purpose presets, autonomous agents, 9-section report layout. Topic-first thrown out.',
          ko: '결정적 전환: 5개 목적 프리셋, 자율 에이전트, 9개 섹션 리포트 레이아웃. 토픽 우선 폐기.',
          ja: '決定的な転換：5つの目的プリセット、自律エージェント、9セクションレポートレイアウト。トピックファースト廃棄。',
        },
      },
      {
        time: '04-27',
        title: { en: 'Final polish · intro video + TTS narration', ko: '최종 폴리싱 · 인트로 영상 + TTS 내레이션', ja: '最終仕上げ · イントロ映像 + TTSナレーション' },
        body: {
          en: 'Demo recorded. 79 commits over 25 days. Submitted.',
          ko: '데모 녹화. 25일 동안 79 커밋. 제출.',
          ja: 'デモ録画。25日間で79コミット。提出。',
        },
      },
    ],
    lessons: {
      worked: {
        en: [
          'Promoting ANOMALY_DETECTION from supporting role to demo climax — the panel reaction was the difference between "interesting" and "memorable."',
          'Hybrid model strategy was benchmark-driven, not vibes-driven. We measured Cortex vs Llama vs GPT-4o per task and let the numbers decide.',
          'Cortex Analyst direct-call as the Tier-2 fallback unblocked the trial-account ceiling without anyone in the demo noticing.',
          '~90% reuse from Wigent freed the team to spend the entire budget on the actually-new Snowflake parts.',
          'Purpose-first UX dodged the generic "AI chat" framing every other team showed up with.',
        ],
        ko: [
          'ANOMALY_DETECTION을 보조에서 데모 클라이맥스로 승격 — 심사위원 반응이 "흥미롭다"와 "기억에 남는다"의 차이를 만들었다.',
          '하이브리드 모델 전략은 벤치 기반이지 분위기 기반이 아니었다. Cortex vs Llama vs GPT-4o를 태스크별로 측정하고 숫자가 결정하게 했다.',
          'Cortex Analyst 직접 호출을 Tier-2 폴백으로 둔 게 Trial 계정 천장을 데모에서 아무도 모르게 뚫었다.',
          'Wigent에서 ~90% 재활용한 덕에 팀이 진짜 새로운 Snowflake 부분에 예산 전부를 쓸 수 있었다.',
          '목적 우선 UX가 다른 팀들이 다 들고 온 일반적인 "AI 챗" 프레이밍을 피했다.',
        ],
        ja: [
          'ANOMALY_DETECTIONを脇役からデモクライマックスに昇格 — 審査員の反応が「興味深い」と「記憶に残る」の差を生んだ。',
          'ハイブリッドモデル戦略はベンチ駆動で雰囲気駆動ではなかった。Cortex vs Llama vs GPT-4oをタスク単位で測定し数字に決めさせた。',
          'Cortex Analyst直接呼び出しをTier-2フォールバックに置いたことで、トライアル天井をデモで誰にも気付かれずに突破した。',
          'Wigentから~90%再利用したおかげで、チームは本当に新しいSnowflake部分に予算全てを投じられた。',
          '目的ファーストUXが、他チームが全員持ってきた一般的な「AIチャット」フレーミングを回避した。',
        ],
      },
      wouldChange: {
        en: [
          'Every purpose pivot forced re-tuning all four Semantic YAMLs by hand — a YAML schema linter would have caught half the wrong-column SQL early.',
          'Cortex per-query billing made a public live deploy infeasible inside trial limits. Should have planned a result-cache layer from Day 1, not Day 22.',
          'No tests at all — orchestrator, Cortex bridge, fallback ladder, garbage-token detector all need integration coverage before the next demo.',
          'The 4-dataset × 11-Cortex story did not survive without verbal explanation. Need a one-screen architecture diagram on the landing page so judges grasp the depth before the chat starts.',
        ],
        ko: [
          '목적이 피봇될 때마다 4개 Semantic YAML 전부를 손으로 재튜닝해야 했다. YAML 스키마 린터가 있었다면 잘못된 컬럼 SQL의 절반은 일찍 잡혔을 것.',
          'Cortex 쿼리당 과금 때문에 Trial 한도 안에서 퍼블릭 라이브 배포가 불가능했다. 결과 캐시 레이어를 22일째가 아니라 1일째에 계획했어야 했다.',
          '테스트가 아예 없다 — 오케스트레이터, Cortex 브리지, 폴백 사다리, 가비지 토큰 디텍터 전부 다음 데모 전에 통합 테스트 필요.',
          '4 데이터셋 × 11 Cortex 스토리가 구두 설명 없이는 안 전달됐다. 채팅 시작 전에 심사위원이 깊이를 파악하도록 랜딩 페이지에 한 화면짜리 아키텍처 다이어그램이 필요하다.',
        ],
        ja: [
          '目的がピボットするたびに4つのSemantic YAMLを全て手で再調整しなければならなかった。YAMLスキーマリンターがあれば誤った列SQLの半分は早期に捕まえられたはず。',
          'Cortexのクエリ単位課金でトライアル枠内のパブリックライブデプロイが不可能だった。結果キャッシュ層を22日目ではなく1日目に計画すべきだった。',
          'テストがゼロ — オーケストレーター、Cortexブリッジ、フォールバックラダー、ゴミトークン検出器全て次のデモまでに統合テストが必要。',
          '4データセット × 11 Cortexのストーリーは口頭説明なしでは伝わらなかった。チャット開始前に審査員が深度を把握できるよう、ランディングに1画面のアーキテクチャ図が必要。',
        ],
      },
    },
    byTheNumbers: [
      { label: { en: 'Development time', ko: '개발 시간', ja: '開発期間' }, value: '25 days' },
      { label: { en: 'Commits', ko: '커밋', ja: 'コミット' }, value: '79' },
      { label: { en: 'Cortex functions used', ko: 'Cortex 기능 사용', ja: 'Cortex機能使用' }, value: '11' },
      { label: { en: 'Datasets cross-queried', ko: '교차 조회 데이터셋', ja: '横断クエリデータセット' }, value: '4 (SPH · RichGo · NextTrade · AJD)' },
      { label: { en: 'Semantic Model YAMLs', ko: 'Semantic Model YAML', ja: 'Semantic Model YAML' }, value: '4' },
      { label: { en: 'AI experts per session', ko: '세션당 AI 전문가', ja: 'セッションあたりAI専門家' }, value: '5' },
      { label: { en: 'Pre-trained FORECAST models', ko: '사전학습 FORECAST 모델', ja: '事前学習FORECASTモデル' }, value: '3' },
      { label: { en: 'Dynamic Tables', ko: 'Dynamic Tables', ja: 'Dynamic Tables' }, value: '2' },
      { label: { en: 'Python UDFs', ko: 'Python UDF', ja: 'Python UDF' }, value: '2' },
      { label: { en: 'Fallback tiers', ko: '폴백 단계', ja: 'フォールバック段階' }, value: '3' },
      { label: { en: 'Reuse from WIGENT', ko: 'WIGENT에서 재활용', ja: 'WIGENTから再利用' }, value: '~90%' },
      { label: { en: 'Cortex LLM benchmark', ko: 'Cortex LLM 벤치', ja: 'Cortex LLMベンチ' }, value: '17.3s / 1657 chars / 0 garbage' },
      { label: { en: 'Hackathon result', ko: '해커톤 결과', ja: 'ハッカソン結果' }, value: '2nd Place · Tech Track' },
    ],
    sourceUrl: 'https://wigtn.com/projects/wigtn-flake',
  },

  wigvo: {
    slug: 'wigvo',
    oneLiner: {
      en: 'Break language barriers in Korea — call anyone, in any language. Accepted at ACL 2026 System Demonstrations.',
      ko: '한국의 언어 장벽을 허문다. 누구든, 어떤 언어로든 전화하라. ACL 2026 System Demonstrations 채택.',
      ja: '韓国の言語の壁を打ち破る。誰にでも、どんな言語でも電話できる。ACL 2026 System Demonstrations採択。',
    },
    problem: {
      en: [
        '2.2M foreign residents in Korea cannot make phone calls in Korean.',
        '2.8M Koreans abroad cannot call in local languages.',
        '390K registered hearing/speech impaired lack voice-call access.',
        '~40% of Gen MZ avoid phone calls entirely (call-phobic).',
        'Language barriers block everyday tasks: restaurant booking, hospital calls, landlord contact.',
      ],
      ko: [
        '한국 거주 외국인 220만 명은 한국어로 전화를 걸 수 없다.',
        '해외의 한국인 280만 명은 현지 언어로 전화할 수 없다.',
        '등록된 청각/언어 장애인 39만 명은 음성 통화 접근이 어렵다.',
        'MZ세대의 약 40%는 전화 통화 자체를 피한다(콜포비아).',
        '언어 장벽이 일상 업무를 막는다: 식당 예약, 병원 전화, 집주인 연락.',
      ],
      ja: [
        '韓国在住外国人220万人は韓国語で電話をかけられない。',
        '海外の韓国人280万人は現地言語で電話できない。',
        '登録された聴覚・言語障害者39万人は音声通話アクセスが困難。',
        'Z/ミレニアル世代の約40%が電話通話自体を避ける（コールフォビア）。',
        '言語の壁が日常業務を阻む：レストラン予約、病院電話、大家連絡。',
      ],
    },
    solution: {
      en: [
        'Dual-session architecture with two parallel OpenAI Realtime interpreters — one per direction.',
        'Software-only echo cancellation — no hardware loop, no DSP chip required.',
        'Works with any phone on any carrier; the recipient needs no app installed.',
        'Three modes: Voice-to-Voice, Text-to-Voice, and AI Agent proxy calling.',
      ],
      ko: [
        '방향별 OpenAI Realtime 통역기 2개가 병렬로 도는 듀얼 세션 아키텍처.',
        '소프트웨어 전용 에코 캔슬레이션 — 하드웨어 루프, DSP 칩 불필요.',
        '모든 통신사의 모든 전화기에서 동작하며, 수신자는 앱 설치가 필요 없다.',
        '3가지 모드: Voice-to-Voice, Text-to-Voice, AI Agent 프록시 통화.',
      ],
      ja: [
        '方向ごとにOpenAI Realtime通訳機2つが並列で動くデュアルセッションアーキテクチャ。',
        'ソフトウェアのみのエコーキャンセレーション — ハードウェアループもDSPチップも不要。',
        'すべてのキャリアのすべての電話で動作し、受信者はアプリ不要。',
        '3モード：Voice-to-Voice、Text-to-Voice、AIエージェントプロキシ通話。',
      ],
    },
    metrics: [
      { value: '557ms', label: { en: 'Avg Latency', ko: '평균 지연', ja: '平均レイテンシ' } },
      { value: '148', label: { en: 'Production Calls', ko: '프로덕션 통화', ja: '本番通話' } },
      { value: '$0.18', label: { en: '/min (33% ↓)', ko: '/분 (33% ↓)', ja: '/分（33% ↓）' } },
      { value: '0', label: { en: 'Echo Loops', ko: '에코 루프', ja: 'エコーループ' } },
    ],
    techStack: [
      {
        category: { en: 'AI & Audio', ko: 'AI & 오디오', ja: 'AI & オーディオ' },
        items: ['OpenAI Realtime API (Whisper-1)', 'GPT-4o-mini', 'Silero VAD (ONNX)', 'Twilio Media Streams (G.711 μ-law 8kHz)'],
      },
      {
        category: { en: 'Backend & Frontend', ko: '백엔드 & 프론트엔드', ja: 'バックエンド & フロントエンド' },
        items: ['Python 3.12', 'FastAPI · uvicorn · asyncio', 'Next.js · React 19 · Zustand · shadcn/ui', 'React Native (Expo SDK 54)'],
      },
      {
        category: { en: 'Infrastructure', ko: '인프라', ja: 'インフラ' },
        items: ['Google Cloud Run', 'Cloud Build', 'Secret Manager · Docker', 'Supabase (PostgreSQL)', 'COMET · pytest (434 tests)'],
      },
    ],
    architecture: [
      {
        title: { en: 'Layer 1 — Transport', ko: 'Layer 1 — 전송', ja: 'Layer 1 — トランスポート' },
        body: {
          en: 'Twilio Media Streams handle PSTN ↔ G.711 μ-law 8kHz; the browser talks PCM 16kHz over WebSocket. One bridge, zero carrier-specific code.',
          ko: 'Twilio Media Streams가 PSTN ↔ G.711 μ-law 8kHz를 처리하고, 브라우저는 WebSocket으로 PCM 16kHz를 말한다. 브리지 하나, 통신사별 코드 0줄.',
          ja: 'Twilio Media StreamsがPSTN ↔ G.711 μ-law 8kHzを処理し、ブラウザはWebSocket経由でPCM 16kHzを扱う。ブリッジ1つ、キャリア固有コード0行。',
        },
      },
      {
        title: { en: 'Layer 2 — AudioRouter (Strategy)', ko: 'Layer 2 — AudioRouter (Strategy)', ja: 'Layer 2 — AudioRouter (Strategy)' },
        body: {
          en: 'Delegates events to Voice-to-Voice, Text-to-Voice or Full-Agent pipelines via the Strategy pattern. Monolithic router refactor → 73% code reduction.',
          ko: 'Strategy 패턴으로 이벤트를 Voice-to-Voice, Text-to-Voice, Full-Agent 파이프라인에 위임한다. 모놀리식 라우터 리팩토링 → 코드 73% 감소.',
          ja: 'Strategyパターンでイベントを Voice-to-Voice、Text-to-Voice、Full-Agentパイプラインに委譲する。モノリシックルーターのリファクタリングで → コード73%削減。',
        },
      },
      {
        title: { en: 'Layer 3 — Dual Sessions', ko: 'Layer 3 — 듀얼 세션', ja: 'Layer 3 — デュアルセッション' },
        body: {
          en: 'Session A (browser → phone) and Session B (phone → browser) run in parallel with independent system prompts and a 6-turn sliding context window.',
          ko: 'Session A(브라우저 → 폰)와 Session B(폰 → 브라우저)가 독립 시스템 프롬프트와 6턴 슬라이딩 컨텍스트 윈도우로 병렬 실행된다.',
          ja: 'Session A（ブラウザ → 電話）とSession B（電話 → ブラウザ）が独立したシステムプロンプトと6ターンのスライディングコンテキストウィンドウで並列実行される。',
        },
      },
      {
        title: { en: 'STT / Translation Split', ko: 'STT / 번역 분리', ja: 'STT / 翻訳分離' },
        body: {
          en: 'Whisper-1 handles STT. GPT-4o-mini (temperature = 0) handles translation as a separate call — prevents Realtime API hallucinations from compounding.',
          ko: 'Whisper-1이 STT를 담당. GPT-4o-mini(temperature=0)가 번역을 별도 호출로 처리 — Realtime API 환각이 복리로 커지는 걸 방지.',
          ja: 'Whisper-1がSTTを担当。GPT-4o-mini（temperature=0）が翻訳を別呼び出しとして処理 — Realtime APIのハルシネーションが複利で広がるのを防ぐ。',
        },
      },
    ],
    deepDives: [
      {
        title: { en: 'Echo Gate — 7-stage evolution', ko: '에코 게이트 — 7단계 진화', ja: 'エコーゲート — 7段階進化' },
        body: {
          en: 'Silence-frame replacement (0xFF μ-law) instead of dropping audio. Maintains VAD stream continuity while blocking TTS echo feedback.',
          ko: '오디오 드롭 대신 무음 프레임 치환(0xFF μ-law). VAD 스트림 연속성을 유지하면서 TTS 에코 피드백을 차단한다.',
          ja: '音声ドロップではなく無音フレーム置換（0xFF μ-law）。VADストリームの連続性を維持しつつTTSエコーフィードバックを遮断する。',
        },
      },
      {
        title: { en: 'PSTN VAD — Independent Architecture', ko: 'PSTN VAD — 독립 아키텍처', ja: 'PSTN VAD — 独立アーキテクチャ' },
        body: {
          en: 'Local Silero VAD replaces Server VAD. Asymmetric hysteresis (160ms onset / 800ms offset) drops speech_stopped latency from 15–72s to 480ms.',
          ko: '로컬 Silero VAD가 Server VAD를 대체. 비대칭 히스테리시스(160ms 시작 / 800ms 끝)로 speech_stopped 지연을 15~72초에서 480ms로 줄였다.',
          ja: 'ローカルSilero VADがServer VADを置き換え。非対称ヒステリシス（160ms開始 / 800ms終了）でspeech_stopped遅延を15〜72秒から480msに短縮。',
        },
      },
      {
        title: { en: 'Whisper Hallucination Filter', ko: 'Whisper 환각 필터', ja: 'Whisperハルシネーションフィルター' },
        body: {
          en: '51 broadcast-style blocklist patterns + 4-layer text filter + 3-level Guardrail (L1 pass / L2 immediate TTS / L3 block + correction).',
          ko: '방송 스타일 블록리스트 51개 + 4 레이어 텍스트 필터 + 3 레벨 Guardrail (L1 통과 / L2 즉시 TTS / L3 차단+교정).',
          ja: '放送スタイルブロックリスト51件 + 4レイヤーテキストフィルター + 3レベルGuardrail（L1通過 / L2即時TTS / L3ブロック+訂正）。',
        },
      },
      {
        title: { en: 'Strategy Pattern — 3 Pipelines', ko: 'Strategy 패턴 — 3 파이프라인', ja: 'Strategyパターン — 3パイプライン' },
        body: {
          en: 'Refactored the monolithic router into VoiceToVoice, TextToVoice and FullAgent. 73% code reduction, easier to add new modes.',
          ko: '모놀리식 라우터를 VoiceToVoice, TextToVoice, FullAgent로 리팩토링. 코드 73% 감소, 새 모드 추가가 쉬워졌다.',
          ja: 'モノリシックルーターをVoiceToVoice、TextToVoice、FullAgentにリファクタリング。コード73%削減、新モード追加が容易に。',
        },
      },
    ],
    lessons: {
      worked: {
        en: [
          '"Drop vs Replace" paradigm — μ-law silence frames maintain VAD continuity where dropped frames would corrupt it.',
          'Separating translation to the Chat API prevents Realtime API hallucinations from infecting the transcript.',
          'Local Silero VAD outperforms Server VAD on narrowband PSTN audio.',
        ],
        ko: [
          '"Drop vs Replace" 패러다임 — μ-law 무음 프레임은 VAD 연속성을 유지하지만, 드롭된 프레임은 손상시킨다.',
          '번역을 Chat API로 분리하니 Realtime API 환각이 트랜스크립트를 오염시키지 못한다.',
          '로컬 Silero VAD가 협대역 PSTN 오디오에서 Server VAD를 능가.',
        ],
        ja: [
          '「Drop vs Replace」パラダイム — μ-law無音フレームはVAD連続性を維持するが、ドロップフレームは破損させる。',
          '翻訳をChat APIに分離することで、Realtime APIのハルシネーションがトランスクリプトを汚染しなくなる。',
          'ローカルSilero VADがナローバンドPSTN音声でServer VADを上回る。',
        ],
      },
      wouldChange: {
        en: [
          'Audio fingerprint via Pearson correlation failed — G.711 μ-law nonlinear quantization breaks the assumption.',
          'Fixed 2.5s echo gate solved echo loops but disrupted natural conversation flow.',
        ],
        ko: [
          'Pearson 상관을 이용한 오디오 핑거프린트는 실패 — G.711 μ-law 비선형 양자화가 전제를 깨뜨린다.',
          '고정 2.5초 에코 게이트는 에코 루프는 해결했지만 자연스러운 대화 흐름을 방해했다.',
        ],
        ja: [
          'Pearson相関によるオーディオフィンガープリントは失敗 — G.711 μ-law非線形量子化が前提を破壊する。',
          '固定2.5秒のエコーゲートはエコーループを解決したが、自然な会話の流れを妨げた。',
        ],
      },
    },
    byTheNumbers: [
      { label: { en: 'Publication', ko: '논문', ja: '論文' }, value: 'ACL 2026 · System Demonstrations (accepted)' },
      { label: { en: 'Echo loops', ko: '에코 루프', ja: 'エコーループ' }, value: '0 / 148' },
      { label: { en: 'Echo gate activations / call', ko: '에코 게이트 발동 / 통화', ja: 'エコーゲート発動 / 通話' }, value: '7.0 avg' },
      { label: { en: 'VAD false positives / call', ko: 'VAD 오탐 / 통화', ja: 'VAD誤検知 / 通話' }, value: '1.8 avg' },
      { label: { en: 'Hallucination blocks / call', ko: '환각 차단 / 통화', ja: 'ハルシネーションブロック / 通話' }, value: '0.7 avg' },
      { label: { en: 'Guardrail L2 activations', ko: 'Guardrail L2 발동', ja: 'Guardrail L2発動' }, value: '148 (normal)' },
      { label: { en: 'Guardrail L3 activations', ko: 'Guardrail L3 발동', ja: 'Guardrail L3発動' }, value: '0' },
      { label: { en: 'Session A P50 latency', ko: 'Session A P50 지연', ja: 'Session A P50レイテンシ' }, value: '555ms' },
      { label: { en: 'Session B P50 latency', ko: 'Session B P50 지연', ja: 'Session B P50レイテンシ' }, value: '2,868ms' },
      { label: { en: 'First message P50 latency', ko: '첫 메시지 P50 지연', ja: '初メッセージP50レイテンシ' }, value: '1,215ms' },
      { label: { en: 'T2V cost', ko: 'T2V 비용', ja: 'T2Vコスト' }, value: '$0.29 / min' },
      { label: { en: 'Mode distribution', ko: '모드 분포', ja: 'モード分布' }, value: 'T2V 68.6% · V2V 30.8% · Agent 0.6%' },
    ],
    sourceUrl: 'https://wigtn.com/projects/wigvo',
  },

  timelens: {
    slug: 'timelens',
    oneLiner: {
      en: 'AI museum curator in your pocket.',
      ko: '주머니 속 AI 박물관 큐레이터.',
      ja: 'ポケットの中のAI博物館キュレーター。',
    },
    solution: {
      en: [
        'Point your camera at a museum artifact and have an AI curator explain it in real time with historical context.',
        'AR restoration visualizes what the object looked like when it was new.',
        'Won the Google Gemini Live Agent Challenge.',
      ],
      ko: [
        '카메라를 박물관 유물에 비추면 AI 큐레이터가 역사적 맥락과 함께 실시간 설명을 해준다.',
        'AR 복원으로 유물이 새것이었을 때의 모습을 시각화한다.',
        'Google Gemini Live Agent Challenge 수상.',
      ],
      ja: [
        'カメラを博物館の遺物に向けると、AIキュレーターが歴史的文脈とともにリアルタイムで解説する。',
        'AR復元で遺物が新品だった頃の姿を可視化する。',
        'Google Gemini Live Agent Challenge受賞。',
      ],
    },
    sourceUrl: 'https://wigtn.com/projects/timelens',
  },

  wigex: {
    slug: 'wigex',
    oneLiner: {
      en: 'Plan, track, and relive every trip — from budget to boarding pass home.',
      ko: '모든 여행을 계획하고, 추적하고, 되돌아본다 — 예산부터 돌아오는 보딩패스까지.',
      ja: 'すべての旅行を計画し、追跡し、思い出す — 予算から帰りの搭乗券まで。',
    },
    problem: {
      en: [
        'Travelers lack integrated tools for budget planning and expense tracking across trips with multi-currency support.',
      ],
      ko: [
        '여행자들은 다통화 지원과 여행 전반의 예산 계획·경비 추적을 통합한 도구가 없다.',
      ],
      ja: [
        '旅行者には多通貨対応で、旅行全体の予算計画と経費追跡を統合したツールがない。',
      ],
    },
    solution: {
      en: [
        'Before the trip, AI builds your daily budget based on destination, travel style, and length of stay.',
        'During the trip, snap any receipt in any language — WIGEX reads it in seconds, converts to your home currency at the day-of-purchase rate, and tracks spending against your budget in real time.',
      ],
      ko: [
        '여행 전, AI가 목적지·여행 스타일·체류 기간을 기반으로 일일 예산을 만든다.',
        '여행 중에는 어떤 언어의 영수증이든 찍기만 하면 — WIGEX가 몇 초 안에 읽고, 구매일 환율로 본국 통화로 변환해, 실시간으로 예산 대비 지출을 추적한다.',
      ],
      ja: [
        '旅行前、AIが目的地・旅行スタイル・滞在期間に基づいて日次予算を構築する。',
        '旅行中は、どの言語のレシートでも撮影するだけで — WIGEXが数秒で読み取り、購入日のレートで母国通貨に変換、予算に対する支出をリアルタイムで追跡する。',
      ],
    },
    sourceUrl: 'https://wigtn.com/projects/wigex',
  },
}
