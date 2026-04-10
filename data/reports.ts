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

  wigvo: {
    slug: 'wigvo',
    oneLiner: {
      en: 'Break language barriers in Korea. Call anyone, in any language.',
      ko: '한국의 언어 장벽을 허문다. 누구든, 어떤 언어로든 전화하라.',
      ja: '韓国の言語の壁を打ち破る。誰にでも、どんな言語でも電話できる。',
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

  wigvu: {
    slug: 'wigvu',
    oneLiner: {
      en: 'Learn Korean through the content you love — K-Drama, K-POP, YouTube, and more.',
      ko: '좋아하는 콘텐츠로 한국어를 배운다 — K-드라마, K-POP, 유튜브, 그 이상.',
      ja: '好きなコンテンツで韓国語を学ぶ — K-ドラマ、K-POP、YouTubeなど。',
    },
    solution: {
      en: [
        'Browse real Korean content — K-Drama clips, K-POP lyrics, news articles and YouTube videos — curated by difficulty and topic.',
        'Every sentence is translated with context-aware AI. Key expressions, grammar patterns and cultural nuances are automatically extracted.',
        'Track progress with AI-generated quizzes, vocabulary lists and comprehension scores.',
      ],
      ko: [
        '진짜 한국 콘텐츠를 탐색한다 — K-드라마 클립, K-POP 가사, 뉴스 기사, 유튜브 영상을 난이도와 주제별로 큐레이션.',
        '모든 문장은 컨텍스트 인식 AI로 번역된다. 핵심 표현, 문법 패턴, 문화적 뉘앙스가 자동 추출된다.',
        'AI 생성 퀴즈, 단어장, 이해도 점수로 진행 상황을 추적한다.',
      ],
      ja: [
        '本物の韓国コンテンツを閲覧 — K-ドラマクリップ、K-POP歌詞、ニュース記事、YouTube動画を難易度とトピックでキュレーション。',
        'すべての文は文脈認識AIで翻訳される。重要表現、文法パターン、文化的ニュアンスが自動抽出される。',
        'AI生成のクイズ、単語帳、理解度スコアで進捗を追跡する。',
      ],
    },
    sourceUrl: 'https://wigtn.com/projects/wigvu',
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
