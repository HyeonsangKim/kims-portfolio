import type { Locale } from '@/lib/i18n'

type L = Record<Locale, string>
type LA = Record<Locale, string[]>

export type CareerReportKey =
  | 'oem-integration-server'
  | 'mohani'
  | 'odiya'
  | 'kocca'
  | 'purple-english'
  | 'aigoseo'
  // WIGTN 사이드 프로젝트 — 통일감을 위해 Career와 동일한 9슬롯 v1 구조로 운영
  | 'wigent'
  | 'wigtnflake'
  | 'wigplugin'
  | 'wigvo'
  | 'myunzy'

export interface CareerReport {
  about: L
  role: L
  highlights: LA
}

/**
 * Career Story Block v1 — CAR/STAR + Decision Log + Reflection.
 *
 * 9 slots that force the writer to answer "what / why / how / what failed /
 * what now" instead of bullet-listing achievements.
 *
 * If a project has both a legacy `careerReports[key]` and a
 * `careerStoryBlocksV1[key]`, the v1 form wins in the overlay.
 */
export interface CareerStoryBlockV1 {
  oneLiner: L
  context: L
  problem: L
  hypothesis: L
  alternatives: L
  decision: L
  execution: L
  result: L
  /**
   * What the writer would do differently next time. Kept separate from
   * `result` so achievements and limits don't get mixed in one slot.
   * Hidden from the visible slot order — kept in the type so historical
   * entries don't get lost if the feedback flips again.
   */
  improvements?: L
  reflection: L
  /**
   * Visual asset blocks per slot. The overlay renders these alongside the
   * prose so each section reads as a scannable page rather than a wall of
   * text — feedback was that prose-only sections feel like asking a reviewer
   * to read a book. Each slot can carry any combination of metric cards,
   * bullet highlights, and trade-off tables.
   */
  visuals?: Partial<Record<CareerStoryBlockSlot, SlotVisuals>>
}

export interface SlotMetric {
  /** Big number / phrase shown in the card (e.g. "95%", "MySQL CPU 100% → 안정"). */
  value: string
  /** One-line caption underneath. */
  label: L
}

export interface SlotTable {
  /** Column headers (e.g. ["후보", "장점", "단점"]). */
  columns: L[]
  /** Rows, each row matches `columns` length. */
  rows: L[][]
  /** Index of the row that was actually selected — rendered with gradient + ★ marker so the verdict is visually obvious. */
  selectedRow?: number
}

/**
 * Bar chart for outcomes that read better visually than in prose
 * (예: "부하 95% 감소" = before/after 막대). Two-series comparison only —
 * intentionally narrow so the modal stays scannable.
 */
export interface SlotChart {
  /** Chart variant. 'bar' = before/after 비교. */
  type: 'bar'
  /** Y-axis unit label (e.g. "분당 INSERT", "%"). */
  unitLabel?: L
  /** 2 data points: 보통 before / after. */
  data: { label: L; value: number }[]
  /** 차트 아래 caption — 출처·근거·해석 한 줄. */
  caption?: L
}

export interface SlotVisuals {
  /** "큰 숫자 + 한 줄 설명" 카드들. Result 같은 곳에서 강조용. */
  metrics?: SlotMetric[]
  /** Trade-off / 비교 / Ablation 같은 표. Alternatives 슬롯에서 강함. */
  table?: SlotTable
  /** 핵심 포인트 bullet — prose보다 빠른 스캔용. */
  bullets?: LA
  /** Before/after 막대 차트 — 운영 결과를 텍스트보다 직관적으로. */
  chart?: SlotChart
  /** Inline architecture diagram slug. Decision 슬롯에서 인라인 표시. */
  diagramKey?:
    | 'odiya'
    | 'mohani'
    | 'kocca'
    | 'purple'
    | 'aigoseo'
    | 'oem'
  /**
   * Static architecture image. WIGTN 사이드 프로젝트는 별도 SVG 다이어그램을
   * 다시 그리지 않고 wigtn.com / GitHub README에서 가져온 원본 이미지를
   * 그대로 인라인 표시한다 (정확도 + 통일감).
   */
  image?: {
    src: string
    alt: L
    caption?: L
  }
}

/**
 * Slots shown in the modal TOC and rendered as sections.
 *
 * `reflection` stays on the v1 interface so existing entries keep their text,
 * but the slot is intentionally not exported here — feedback was that the
 * "다시 한다면" section read as filler and should be removed from the
 * visible flow.
 */
export const careerStoryBlockSlotOrder = [
  'context',
  'problem',
  'hypothesis',
  'alternatives',
  'decision',
  'execution',
  'result',
] as const

export type CareerStoryBlockSlot = (typeof careerStoryBlockSlotOrder)[number]

export const careerStoryBlockSlotLabels: Record<
  CareerStoryBlockSlot,
  Record<Locale, string>
> = {
  context: { ko: '개요', en: 'Context', ja: '背景' },
  problem: { ko: '마주한 문제', en: 'Problem', ja: '問題' },
  hypothesis: { ko: '풀이 가설', en: 'Hypothesis', ja: '仮説' },
  alternatives: { ko: '검토한 대안', en: 'Alternatives', ja: '代替案' },
  decision: { ko: '선택과 근거', en: 'Decision', ja: '決定' },
  execution: { ko: '구현과 시행착오', en: 'Execution', ja: '実装と試行錯誤' },
  result: { ko: '성과', en: 'Result', ja: '成果' },
}

export const projectStoryBlockSlotOrder = [
  'context',
  'problem',
  'hypothesis',
  'decision',
  'execution',
  'result',
] as const

export const projectStoryBlockSlotLabels: Record<
  CareerStoryBlockSlot,
  Record<Locale, string>
> = {
  context: { ko: '개요', en: 'Overview', ja: '概要' },
  problem: { ko: '도전', en: 'Challenge', ja: '挑戦' },
  hypothesis: { ko: '접근', en: 'Approach', ja: 'アプローチ' },
  alternatives: { ko: '검토한 대안', en: 'Alternatives', ja: '代替案' },
  decision: { ko: '구조', en: 'Architecture', ja: 'アーキテクチャ' },
  execution: { ko: '실행', en: 'Execution', ja: '実行' },
  result: { ko: '결과 & 성과', en: 'Result & Impact', ja: '結果と成果' },
}

export const wigtnProjectKeys = new Set<CareerReportKey>(['wigent', 'wigtnflake', 'wigplugin', 'wigvo', 'myunzy'])

// Legacy 3-slot reports (about / role / highlights) — only Career projects use
// this form. WIGTN side projects rely entirely on the v1 9-slot story blocks
// below, so the legacy map is intentionally Partial.
export const careerReports: Partial<Record<CareerReportKey, CareerReport>> = {
  'oem-integration-server': {
    about: {
      ko: 'B2B 파트너사와 협력해 어린이용 특화 디바이스에 사전 탑재되는 자녀 안심 서비스의 통합 인증·권한 인프라. 파트너별 화이트라벨 서비스가 공유하는 단일 인증 인프라 위에서 자녀 위치 조회(오디야)와 자녀 디바이스 원격 제어(모하니)를 동시 수용해야 하며, 파트너 단위 권한 분리와 운영 추적성을 동시에 보장해야 하는 환경이었습니다.',
      en: 'A unified auth and authorization backbone for child-safety services pre-installed on OEM child-specialized devices through B2B partners. The infrastructure had to host multiple white-label services (Odiya for child location, Mohani for remote device control) on top of a single auth platform while keeping per-partner permission isolation and operational traceability.',
      ja: 'B2Bパートナーと協力し、子供向け特化デバイスに事前搭載される子供安心サービスの統合認証・権限インフラ。パートナー別ホワイトラベルサービスが共有する単一認証基盤上で、子供位置確認（オディヤ）と子供デバイス遠隔制御（モハニ）を同時に収容し、パートナー単位の権限分離と運用追跡性を保証する必要のある環境でした。',
    },
    role: {
      ko: '인증 서버와 비즈니스 서버를 분리해 인증 장애가 전체 서비스로 전파되지 않는 구조를 설계했고, Token Rotation·RBAC·Audit Log를 결합한 엔터프라이즈 보안 체계를 주도해 구축했습니다. Webhook 기반 이벤트 전파와 Retry + DLQ 구조로 서비스 간 인증 상태를 실시간 동기화하고, 메시지 유실 상황에서도 운영팀이 직접 재처리할 수 있는 도구까지 함께 제공했습니다.',
      en: 'Separated auth and business servers so authentication outages no longer propagate to product services, and led the build of an enterprise security stack combining Token Rotation, RBAC, and Audit Log. Webhook event propagation plus a Retry + DLQ pipeline keep cross-service auth state in sync in real time, with an admin console that lets operators reprocess messages directly when delivery fails.',
      ja: '認証サーバーとビジネスサーバーを分離し、認証障害が全サービスに波及しない構造を設計しました。Token Rotation・RBAC・Audit Logを組み合わせたエンタープライズセキュリティ体系を主導して構築。Webhookベースのイベント伝播とRetry + DLQ構造でサービス間認証状態をリアルタイム同期し、メッセージ消失時にも運用チームが直接再処理できるツールまで提供しました。',
    },
    highlights: {
      ko: [
        '여러 파트너 서비스가 공유하는 B2B 인증 인프라 주도 설계',
        '인증/비즈니스 서버 분리 — 인증 장애가 비즈니스 서비스로 전파되지 않는 구조 설계, 단일 인증 인프라 위에서 여러 파트너 서비스 수용',
        'Token Rotation + Token Family Tracking 기반 인증 — Refresh Token 재사용 공격 탐지 + 의심 세션 즉시 무효화',
        'Redis 기반 Rate Limiting 정책 적용 — 반복 요청·비정상 트래픽으로 인한 인증 서버 과부하 방지',
        'Webhook 기반 이벤트 전파 — 서비스 간 인증 상태 실시간 동기화 + polling 트래픽 제거',
        'Retry + DLQ 비동기 처리 + DLQ 관리자 콘솔(목록·상세·재시도·포기) — 메시지 유실 상황 운영팀 직접 재처리',
        'RBAC 기반 관리자·보호자 권한 구조 분리 — 역할별 접근 범위 제어',
        '사용자 라이프사이클 기반 암호화·익명화 정책 — 탈퇴·휴면 사용자 데이터 보관 및 삭제 자동화, PII 관리 운영 자동화',
        'Audit Log 기반 운영 이벤트 추적 — 장애 발생 시 원인을 사후 추적할 수 있는 기반 확보',
      ],
      en: [
        'Led the design of the B2B auth backbone shared by multiple partner services',
        'Separated auth and business servers — auth outages no longer propagate to product services; multiple partner services run on a single auth platform',
        'Token Rotation + Token Family Tracking — detects Refresh Token reuse and instantly invalidates the suspicious session family',
        'Redis-based rate limiting — protects the auth server from repeat requests and abnormal traffic',
        'Webhook event propagation — real-time auth-state sync across services, polling traffic eliminated',
        'Retry + DLQ async pipeline with admin console (list / detail / retry / abandon) — operators can reprocess dropped messages directly',
        'RBAC separating admin and guardian permissions — role-scoped access control',
        'User-lifecycle-driven encryption / anonymization — automated retention and deletion for churned and dormant users, automated PII operations',
        'Audit-log-based operational event tracking — post-incident root cause analysis grounded in evidence',
      ],
      ja: [
        '複数パートナーサービスが共有するB2B認証インフラを主導設計',
        '認証/ビジネスサーバー分離 — 認証障害がビジネスサービスに伝播しない構造、単一認証基盤上で複数パートナーサービスを収容',
        'Token Rotation + Token Family Tracking — Refresh Token再利用攻撃を検知し疑いセッション全体を即時無効化',
        'RedisベースRate Limiting — 反復リクエスト・異常トラフィックによる認証サーバー過負荷を防止',
        'Webhookイベント伝播 — サービス間認証状態をリアルタイム同期し、pollingトラフィックを除去',
        'Retry + DLQ非同期処理 + DLQ管理者コンソール（一覧・詳細・再試行・放棄）— メッセージ消失時にも運用者が直接再処理',
        'RBACによる管理者・保護者権限分離 — ロール別アクセス範囲制御',
        'ユーザーライフサイクルベースの暗号化・匿名化 — 退会・休眠ユーザーデータの保管および削除を自動化、PII管理運用を自動化',
        'Audit Logベース運用イベント追跡 — 障害発生時に原因を事後追跡できる基盤を確保',
      ],
    },
  },

  mohani: {
    about: {
      ko: '자녀 디바이스 원격 제어 서비스 모하니. 외부 MDM SDK와 AccessibilityService를 결합해 보호자 정책 기반 시스템 레벨 차단·원격 제어를 제공하며, 푸시 알림 기반 원격 명령을 안정적으로 처리해야 하는 환경이었습니다.',
      en: 'Mohani, a remote child-device control service. The product combined an external MDM SDK with AccessibilityService to provide guardian-policy-driven system-level blocking and remote control, with push-notification-based commands delivered reliably across the OEM fleet.',
      ja: 'モハニ — 子供デバイス遠隔制御サービス。外部MDM SDKとAccessibilityServiceを組み合わせ、保護者ポリシーに基づくシステムレベル遮断・遠隔制御を提供し、プッシュ通知ベースの遠隔コマンドを安定的に処理する必要のある環境でした。',
    },
    role: {
      ko: '외부 MDM SDK의 네트워크 도메인 차단과 AccessibilityService 기반 앱 실시간 감지·차단 시스템을 개발해 보호자 정책 기반 디바이스 도메인 제어와 실시간 사용 제어를 구현했습니다. React Native Bridge와 외부 SDK IPC, Android Broadcast가 얽힌 ANR 문제를 Native 비동기 분리로 해결해 원격 제어 안정성을 확보했습니다.',
      en: 'Built domain blocking through an external MDM SDK and AccessibilityService-based real-time app detection / blocking, implementing guardian-policy device-domain control and live usage control. Diagnosed and resolved a recurring ANR caused by React Native Bridge, external-SDK IPC, and Android Broadcast interactions by offloading heavy native work to a background async pipeline — restoring real-time control stability.',
      ja: '外部MDM SDKのネットワークドメイン遮断とAccessibilityServiceベースのアプリリアルタイム検知・遮断システムを開発し、保護者ポリシーに基づくデバイスドメイン制御とリアルタイム使用制御を実装。React Native Bridge・外部SDK IPC・Android Broadcastが絡んだANR問題をNative非同期分離で解決し、遠隔制御の安定性を確保しました。',
    },
    highlights: {
      ko: [
        '외부 MDM SDK 기반 네트워크 도메인 차단 — 보호자 정책 기반 디바이스 도메인 제어 지원',
        'AccessibilityService 기반 앱 실시간 감지·차단 시스템 — 제품 핵심 기능인 실시간 사용 제어 구현',
        '푸시 알림 기반 command / request-response 구조 설계 — 원격 디바이스 제어 기능 구현',
        'React Native Bridge Queue 병목 + 외부 SDK IPC 지연 + Android Broadcast timeout이 얽힌 ANR 문제 분석',
        '무거운 Native 작업을 백그라운드 비동기 처리 구조로 분리 — 반복 발생하던 ANR 제거',
      ],
      en: [
        'External MDM SDK–driven network-level domain blocking — guardian-policy device-domain control',
        "AccessibilityService-based real-time app detection / blocking — implemented the product's core live-usage-control feature",
        'Push-notification-based command / request-response architecture — remote device control',
        'Diagnosed an ANR caused by React Native Bridge Queue contention + external-SDK IPC latency + Android Broadcast timeout',
        'Offloaded heavy native work to a background async pipeline — eliminated the recurring ANR',
      ],
      ja: [
        '外部MDM SDKベースのネットワークドメイン遮断 — 保護者ポリシーに基づくデバイスドメイン制御',
        'AccessibilityServiceベースのアプリリアルタイム検知・遮断システム — 製品のコア機能であるリアルタイム使用制御を実装',
        'プッシュ通知ベースのcommand / request-response構造設計 — 遠隔デバイス制御',
        'React Native Bridge Queueボトルネック + 外部SDK IPC遅延 + Android Broadcast timeoutが絡んだANR問題を分析',
        '重いNative処理をバックグラウンド非同期処理構造に分離 — 反復発生していたANRを除去',
      ],
    },
  },

  odiya: {
    about: {
      ko: '자녀 실시간 위치 조회 서비스 오디야. OEM 사전탑재 채널 위에서 대량 위치 데이터를 처리하면서, 안심존 출입 감지와 자녀 디바이스 위치 알림을 안정적으로 제공해야 하는 환경이었습니다.',
      en: 'Odiya, a real-time child location-tracking service running on top of an OEM pre-install channel. The system had to handle high-volume location events while delivering safe-zone entry/exit detection and child-device location alerts without downtime.',
      ja: 'オディヤ — 子供のリアルタイム位置確認サービス。OEM事前搭載チャネル上で大量の位置データを処理しながら、安心ゾーン出入検知と子供デバイス位置通知を安定提供する必要のある環境でした。',
    },
    role: {
      ko: '대량 위치 데이터 처리 병목을 Redis 버퍼링·배치 구조 재설계로 해소해 DB 쓰기 부하를 95% 줄였고, 인프라 증설 비용 없이 서비스 운영을 안정화했습니다. Haversine distance 기반 안심존 출입 감지와 HotUpdater + Supabase OTA 코드 푸시 파이프라인까지 구축했고, App Store / Google Play 출시·운영을 담당하며 오디야 안정화·고도화 과정에서 B2B 사업 매출 약 230% 성장에 기여했습니다.',
      en: 'Re-architected the high-volume location pipeline with Redis buffering + batch processing, cutting DB write load by 95% and stabilizing the service without any infra scale-up. Implemented Haversine-based safe-zone entry/exit detection and built a HotUpdater + Supabase OTA code-push pipeline. Shipped and operated the app on App Store / Google Play, contributing to ~230% B2B revenue growth during Odiya stabilization and expansion.',
      ja: '大量位置データ処理ボトルネックをRedisバッファリング・バッチ構造再設計で解消し、DB書き込み負荷を95%削減、インフラ増設費用なしでサービス運用を安定化しました。Haversine distanceベースの安心ゾーン出入検知とHotUpdater + Supabase OTAコードプッシュパイプラインまで構築。App Store / Google Playリリース・運用を担当し、オディヤの安定化・高度化過程でB2B事業売上約230%成長に貢献しました。',
    },
    highlights: {
      ko: [
        'Redis 버퍼링 + 배치 처리 구조로 위치 데이터 처리 아키텍처 재설계 — DB 쓰기 부하 95% 감소, 인프라 증설 비용 없이 서비스 운영 안정화',
        '사용자 위치 좌표 기반 안심존 출입 감지 기능 구현 (Haversine distance 기반 위치 계산)',
        'HotUpdater + Supabase 기반 OTA 코드 푸시 파이프라인 구축 — 앱 스토어 심사 없이 긴급 버그 수정 및 기능 배포 가능한 운영 환경 확보',
        '위치 데이터 파티션 관리 및 배치 동기화 자동화 구축',
        'App Store / Google Play 출시·운영',
        '오디야 서비스 안정화 및 고도화 과정에 참여해 B2B 사업 매출 약 230% 성장에 기여',
      ],
      en: [
        'Re-architected the location pipeline with Redis buffering + batch processing — 95% DB write reduction, service stabilized without infra scale-up',
        'Implemented coordinate-based safe-zone entry/exit detection (Haversine distance)',
        'Built a HotUpdater + Supabase OTA code-push pipeline — ship fixes and features without app-store review',
        'Automated partition management and batch sync for location data',
        'Shipped and operated on App Store / Google Play',
        'Contributed to ~230% B2B revenue growth through Odiya stabilization and expansion',
      ],
      ja: [
        'Redisバッファリング + バッチ処理で位置データパイプラインを再設計 — DB書き込み負荷95%削減、インフラ増設なしで運用安定化',
        '位置座標ベースの安心ゾーン出入検知を実装（Haversine distance）',
        'HotUpdater + Supabase OTAコードプッシュパイプライン構築 — アプリストア審査なしで緊急修正・機能リリースを可能に',
        '位置データのパーティション管理・バッチ同期を自動化',
        'App Store / Google Playリリース・運用',
        'オディヤの安定化・高度化を通じてB2B事業売上約230%成長に貢献',
      ],
    },
  },

  kocca: {
    about: {
      ko: 'KOCCA 정부지원사업 R&D 과제로 진행한 외국인 학생 대상 한국어 능력 평가 웹 플랫폼. Next.js 기반 풀스택 구현과 외부 STT 연동 파이프라인을 운영 환경에 배포해야 하는 환경이었습니다.',
      en: 'A Korean-proficiency assessment web platform for foreign students, delivered as a KOCCA-funded national R&D project. Required a full-stack Next.js implementation and an external STT integration pipeline deployed to production.',
      ja: 'KOCCA政府支援事業R&D課題として進めた外国人学生向け韓国語能力評価Webプラットフォーム。Next.jsベースのフルスタック実装と外部STT連携パイプラインを本番環境にデプロイする必要のある環境でした。',
    },
    role: {
      ko: 'Next.js · Prisma · PostgreSQL 기반 풀스택으로 외국인 학생 대상 한국어 평가 웹 플랫폼을 구축하고, 외부 STT 연동을 위한 WAV 녹음(16kHz 샘플링) + AWS S3 업로드 파이프라인까지 운영 환경에 배포했습니다. Nginx 리버스 프록시·SSL 배포 환경을 구성해 정부 R&D 산출물로 납품 완료했습니다.',
      en: 'Delivered a full-stack Korean-assessment web platform on Next.js, Prisma, and PostgreSQL, including a WAV (16kHz) recording + AWS S3 upload pipeline for external STT integration. Set up the Nginx reverse-proxy and SSL deployment environment directly, and shipped the result as a national R&D deliverable.',
      ja: 'Next.js・Prisma・PostgreSQLベースのフルスタックで外国人学生向け韓国語評価Webプラットフォームを構築し、外部STT連携のためのWAV録音（16kHzサンプリング）+ AWS S3アップロードパイプラインまで本番環境にデプロイ。Nginxリバースプロキシ・SSLデプロイ環境を直接構成し、政府R&D成果物として納品完了しました。',
    },
    highlights: {
      ko: [
        '외국인 학생 대상 한국어 능력 평가 웹 플랫폼을 Next.js + Prisma + PostgreSQL 기반 풀스택으로 구현 → 정부지원사업 R&D 산출물 납품 완료',
        '외부 STT 연동을 위한 WAV 녹음(16kHz 샘플링) + AWS S3 업로드 파이프라인 구축 — 음성 평가 자동화 파이프라인 운영 환경 구성',
        'Nginx 리버스 프록시 설정 및 SSL 배포 환경 구성 — 운영 환경 보안 적용',
        'PostgreSQL 스키마 설계 및 Prisma ORM 쿼리 구현',
      ],
      en: [
        'Built the Korean-assessment web platform full-stack on Next.js + Prisma + PostgreSQL — delivered as a national R&D output',
        'WAV recording (16kHz) + AWS S3 upload pipeline for external STT — production-ready voice-assessment automation',
        'Nginx reverse proxy + SSL deployment configured for production security',
        'PostgreSQL schema design and Prisma ORM query implementation',
      ],
      ja: [
        '外国人学生向け韓国語能力評価WebプラットフォームをNext.js + Prisma + PostgreSQLベースのフルスタックで実装 → 政府支援事業R&D成果物納品完了',
        '外部STT連携のためのWAV録音（16kHzサンプリング）+ AWS S3アップロードパイプライン構築 — 音声評価自動化パイプラインを本番環境で構成',
        'Nginxリバースプロキシ設定とSSLデプロイ環境構成 — 本番環境のセキュリティ適用',
        'PostgreSQLスキーマ設計とPrisma ORMクエリ実装',
      ],
    },
  },

  'purple-english': {
    about: {
      ko: '퍼플 잉글리시는 어린이·청소년 대상 영어 교육 플랫폼으로, 알파벳 트레이싱부터 인터랙티브 학습 활동까지 다양한 학습 콘텐츠를 제공하는 모바일 앱·웹 통합 서비스입니다. 기존 React 기반 웹 서비스를 모바일 앱 채널로 확장하면서 학습자 접근성을 높이고, 웹과 앱 양쪽에서 동일한 학습 경험을 유지해야 하는 환경이었습니다.',
      en: 'Purple English is an English-education platform for children and teens, offering alphabet tracing and a wide range of interactive learning activities across mobile app and web. The team had to extend the existing React-based web service to a mobile-app channel while keeping the learning experience consistent across both surfaces.',
      ja: 'パープルイングリッシュは子供・青少年向け英語教育プラットフォームで、アルファベットトレーシングからインタラクティブ学習アクティビティまで多様な学習コンテンツを提供するモバイルアプリ・Web統合サービスです。既存のReactベースWebサービスをモバイルアプリチャネルに拡張しながら、Web/アプリ両方で同一の学習体験を維持する必要のある環境でした。',
    },
    role: {
      ko: '기존 React 웹 코드베이스를 React Native 기반 앱으로 마이그레이션해 App Store / Play Store에 출시했고, 웹과 앱 양쪽에서 공통으로 사용하는 비즈니스 로직을 Custom Hook 기반으로 모듈화해 채널 일원화를 진행했습니다. GSAP과 SVG Path Animation을 활용한 알파벳 트레이싱 기능을 구현했고, 인터랙티브 학습 활동을 다수 제작했습니다.',
      en: 'Migrated the existing React web codebase to a React Native app, shipped to App Store / Play Store, and unified channels by modularizing shared business logic as Custom Hooks for both web and app. Built the alphabet-tracing feature with GSAP + SVG Path Animation and personally authored a wide range of interactive learning activities.',
      ja: '既存のReact WebコードベースをReact NativeベースのアプリへマイグレーションしApp Store / Play Storeでリリース、Web/アプリ両方で共通利用するビジネスロジックをCustom Hookベースでモジュール化しチャネル一元化を進めました。GSAP + SVG Path Animationを活用したアルファベットトレーシング機能を実装し、多数のインタラクティブ学習アクティビティを直接制作しました。',
    },
    highlights: {
      ko: [
        '기존 React 웹 코드베이스 → React Native 앱 마이그레이션 및 App Store / Play Store 출시 — 모바일 채널까지 사업 영역 확장',
        'Custom Hook 기반 비즈니스 로직 모듈화 — 웹·앱 공통 로직 재사용 구조 구축',
        'GSAP + SVG Path Animation 기반 알파벳 트레이싱 기능 구현',
        '모바일·웹 채널 일원화 및 인터랙티브 학습 활동 다수 제작',
      ],
      en: [
        'Migrated React web codebase → React Native app, shipped to App Store / Play Store — extended the business to a mobile channel',
        'Custom Hook–based business-logic modularization — shared logic reused across web and app',
        'Alphabet tracing built with GSAP + SVG Path Animation',
        'Unified mobile / web channels and authored a wide range of interactive learning activities',
      ],
      ja: [
        '既存のReact WebコードベースをReact NativeアプリへマイグレーションしApp Store / Play Storeリリース — モバイルチャネルまで事業領域拡張',
        'Custom Hookベースのビジネスロジックモジュール化 — Web・アプリ共通ロジック再利用構造を構築',
        'GSAP + SVG Path Animationベースのアルファベットトレーシング機能を実装',
        'モバイル・Webチャネル一元化と多数のインタラクティブ学習アクティビティ制作',
      ],
    },
  },

  aigoseo: {
    about: {
      ko: 'AIGOSEO는 한자 고문헌을 디지털화하고 번역하는 정부 R&D 과제 기반 플랫폼으로, 고문헌 이미지를 글자 단위로 세분화하고 OCR·번역 파이프라인에 투입하는 자동화 시스템입니다. 한자 한 글자 단위의 정확한 세그멘테이션과 후속 OCR·번역 단계와의 일관된 백엔드 API 설계까지 책임져야 하는 환경이었습니다.',
      en: 'AIGOSEO is a national R&D–funded platform that digitizes and translates classical Chinese manuscripts by segmenting manuscript images down to a single character and feeding them into an OCR / translation pipeline. The project required accurate per-character segmentation alongside a consistent backend-API design for the downstream OCR and translation stages.',
      ja: 'AIGOSEOは漢字古文献をデジタル化・翻訳する政府R&D課題ベースのプラットフォームで、古文献画像を文字単位で細分化しOCR・翻訳パイプラインに投入する自動化システムです。漢字1文字単位の正確なセグメンテーションと後続OCR・翻訳ステップとの一貫したバックエンドAPI設計まで責任を持つ必要のある環境でした。',
    },
    role: {
      ko: 'Canvas API 기반 글자 단위 이미지 세그멘테이션 시스템을 구현하고 Spring Boot + JPA 기반 백엔드 API를 설계·개발해 고문헌 디지털화 자동화 파이프라인을 완성, 정부 R&D 과제 산출물로 납품 완료했습니다.',
      en: 'Implemented a Canvas API–based character-level image segmentation system and designed / built the Spring Boot + JPA backend API, completing an automated ancient-manuscript digitization pipeline that was delivered as a national R&D output.',
      ja: 'Canvas APIベースの文字単位画像セグメンテーションシステムを実装し、Spring Boot + JPAベースのバックエンドAPIを設計・開発して古文献デジタル化自動化パイプラインを完成、政府R&D課題成果物として納品完了しました。',
    },
    highlights: {
      ko: [
        'Canvas API 기반 글자 단위 이미지 세그멘테이션 시스템 구현 — 고문헌 이미지를 글자 단위로 자동 분할하는 처리 기능 구현',
        'Spring Boot + JPA 기반 백엔드 API 설계 및 개발 — 세그멘테이션·OCR·번역 단계를 연결하는 일관 파이프라인 구축 및 정부 R&D 과제 산출물 납품 완료',
      ],
      en: [
        'Canvas API–based character-level image segmentation — automatic character splitting of manuscript images',
        'Spring Boot + JPA backend API design and implementation — a consistent pipeline that connects segmentation, OCR, and translation stages, delivered as a national R&D output',
      ],
      ja: [
        'Canvas APIベースの文字単位画像セグメンテーションシステムを実装 — 古文献画像を文字単位で自動分割',
        'Spring Boot + JPAベースのバックエンドAPI設計・開発 — セグメンテーション・OCR・翻訳ステップを連結する一貫パイプラインを構築、政府R&D課題成果物として納品完了',
      ],
    },
  },
}

/**
 * Career Story Blocks (v1). Authored from CAREER_INTERVIEWS.md.
 *
 * Korean is the source of truth — `en` and `ja` fall back to `ko` while the
 * other projects are still on the legacy `CareerReport` shape.
 */
export const careerStoryBlocksV1: Partial<
  Record<CareerReportKey, CareerStoryBlockV1>
> = {
  odiya: {
    oneLiner: {
      ko: '외주사 코드의 DB 부하 사태(MySQL CPU 포화)를 Redis 버퍼 + 주기 배치 + 일자 파티션 구조로 재설계해 DB 쓰기 부하 ~95%를 줄이고, 인프라 증설 없이 운영을 안정화했습니다.',
      en: 'Reworked an inherited outsourced codebase that was driving MySQL CPU to saturation — a Redis buffer + periodic batch + daily partition setup cut DB write load by ~95% and stabilized operations without scaling infra.',
      ja: '外注コードのDB過負荷（MySQL CPU飽和）を、Redisバッファ + 周期バッチ + 日次パーティション構造で再設計し、DB書き込み負荷を~95%削減、インフラ増設なしで運用を安定化しました。',
    },
    context: {
      ko: '사운드마인드 합류 후 첫 프로젝트로 오디야를 맡았습니다. 외주사가 만든 부모-자녀 위치 공유 서비스(OEM 사전탑재 채널 포함)를 팀장으로서 리딩하며 위치 파이프라인 전체를 다시 설계했습니다.',
      en: 'First project after joining Soundmind. Took over the inherited parent-child location service (including the OEM pre-install channel) and re-designed the location pipeline end-to-end as team lead.',
      ja: 'サウンドマインド入社後の最初のプロジェクト。外注が作った親子位置共有サービス（OEM事前搭載チャネル含む）をチームリーダーとして引き継ぎ、位置パイプライン全体を設計し直した。',
    },
    problem: {
      ko: '외주사 코드는 자녀 단말 좌표 송출마다 JPA save() 단건 INSERT를 호출했고, 같은 흐름에서 안전구역 평가 SQL까지 누적돼 MySQL CPU가 포화 수준에 도달했습니다. 즉 "몰아치는 쓰기"와 "사용자마다 최신 좌표 한 건이면 충분한 읽기"가 같은 경로에서 직렬로 돌고 있었습니다. 단말 수 × 송출 빈도가 선형으로 늘어 인프라 증설 외에는 길이 보이지 않던 시점이었습니다.',
      en: 'The vendor code called JPA `save()` per coordinate from every child device, and safe-zone evaluation SQL piled onto the same flow — MySQL CPU reached saturation. The structural issue was that "burst writes" and "reads that only need the latest coordinate per user" were running serially on the same path. With load scaling linearly with devices × send rate, scaling infra looked like the only path.',
      ja: '外注コードは子供端末の座標送出ごとにJPA save() 単件INSERTを呼び、同じフローで安全ゾーン評価SQLまで累積してMySQL CPUが飽和水準に到達。本質的にはburst writeと「ユーザーごとの最新1点で十分なread」が同じpathで直列に動いていた構造でした。台数×送出頻度が線形に増え、インフラ増設以外の道が見えなかった時点。',
    },
    hypothesis: {
      ko: '들어오는 좌표는 짧은 시간에 몰아치는 쓰기 부하지만, 안전구역 판정은 사용자마다 가장 최근 좌표 한 건만 보면 됩니다. 들어오는 좌표를 그때그때 DB에 박을 필요가 없으니, 이미 운영 중인 Redis를 추가 자원 없이 버퍼로 재활용할 수 있다고 판단했습니다.',
      en: 'Coordinate ingestion is burst-heavy writes, but safe-zone evaluation only needs the latest coordinate per user — not every coordinate has to hit the DB. Redis was already in the stack, reusable as a buffer.',
      ja: '座標流入はburst write中心だが安全ゾーン評価はユーザーごとの最新1点で十分 — 全座標を即DBに書く必要はない。既存Redisを新規リソースなしでバッファとして再利用可能。',
    },
    alternatives: {
      ko: 'Kafka/SQS는 영구 로그·재처리·다중 컨슈머가 매력적이지만 운영 인력과 인프라 추가 부담이 컸고, DB-only 최적화는 절대량 한계가 명확했습니다. 외주사 인계 직후라 "새 자원 추가 없음"이 결정 축이었고, 운영 중인 Redis를 재활용하는 버퍼+배치 구조가 도메인 접근 패턴과 운영 비용 양쪽에 가장 잘 맞았습니다.',
      en: 'Kafka / SQS gave durable logs, replay and multi-consumer, but added operational headcount and infra we did not have; DB-only tuning had a hard ceiling on raw write volume. Right after the vendor handover, "no new resources" was the dominant axis — reusing the existing Redis as a buffer+batch layer fit both the access pattern and the operational cost the best.',
      ja: 'Kafka/SQSは永続ログ・再処理・多コンシューマが魅力だが運用人員・インフラの追加負担が大きく、DB-only最適化は絶対量の壁が明確でした。外注引継ぎ直後で「新規リソース追加なし」が決定軸となり、運用中のRedisを再利用するbuffer+batch構造がアクセスパターンと運用コストの両面でfitが最大でした。',
    },
    decision: {
      ko: 'Redis를 두 갈래로 활용했습니다. write는 큐 버퍼에 push한 뒤 주기 배치로 DB에 적재하고, read는 캐시 hit으로 흡수합니다. DB는 일자 단위 파티션으로 모델링하고 다음날 파티션 생성과 오래된 파티션 삭제를 자동화했습니다. 단일 Redis는 의도된 절충이며, 트래픽 임계치가 넘어가면 Sentinel/Cluster로 옮길 경로는 모니터링으로 열어두었습니다.',
      en: 'Redis split in two — writes push to a queue buffer, drained to the DB by a periodic batch; reads served from a cache. DB is day-partitioned, with next-day partitions created and old ones dropped on an automated schedule. Single-Redis is an intentional trade-off; the Sentinel / Cluster path is left open behind backlog-depth and batch-duration thresholds.',
      ja: 'Redisを2用途で — writeはキューバッファにpush後、周期バッチでDB投入、readはキャッシュhitで吸収。DBは日次パーティション + 翌日パーティション生成と古いパーティション削除を自動化。単一Redisは意図的trade-off（バックログ長・バッチ所要時間の閾値監視でSentinel/Cluster移行経路は確保）。',
    },
    execution: {
      ko: '처음부터 "버퍼 + 배치" 개념으로 직진했고, 다른 형태로 갔다가 옮긴 시행착오는 없었습니다. 운영 중에는 자녀 단말의 GPS 신호가 튀는 케이스(짧은 시간 안에 비현실적인 거리만큼 좌표가 점프하는 현상)가 안전구역 평가를 왜곡시키는 문제가 보여, 짧은 시간에 비현실적인 거리 이동이 잡히면 안전구역 평가를 건너뛰는 보조 규칙을 추가했습니다.',
      en: 'Went straight to "buffer + batch" — no detour or pivot. During operation, GPS-noise cases on child devices (coordinates jumping an unrealistic distance in a short window) were distorting safe-zone evaluation, so I added a guard rule that skips safe-zone evaluation when a coordinate moves an unrealistic distance in a short window.',
      ja: '最初から「バッファ + バッチ」で直進し、別形態から移ったような試行錯誤はありませんでした。運用中、子供端末のGPS信号が跳ねるケース（短時間に非現実的な距離で座標がジャンプする現象）が安全ゾーン評価を歪める問題が見え、短時間に非現実的な距離が動いた場合は安全ゾーン評価をスキップする補助ルールを追加しました。',
    },
    result: {
      ko: 'MySQL CPU 포화 사태가 해소되어, 인프라 증설 없이 운영이 안정화됐습니다. DB 쓰기 부하는 분당 INSERT 기준 약 95% 감소했고, 이 안정화가 OEM 사전탑재 채널 확장의 전제가 되어 회사 B2B 매출 약 230% 성장에 기여했습니다.',
      en: 'MySQL CPU stopped saturating — operations stabilised with zero new infra. DB write load down ~95% measured by inserts per minute. That stability became the prerequisite for the OEM pre-install channel expansion, contributing to ~230% B2B revenue growth at the company.',
      ja: 'MySQL CPU飽和事態を解消 — インフラ増設なしで運用安定化。DB書き込み負荷は分単位INSERT基準で~95%削減。この安定化がOEM事前搭載チャネル拡張の前提となり、会社B2B売上~230%成長に寄与。',
    },
    improvements: {
      ko: '두 가지를 다시 한다면 다르게 잡았을 것입니다. 첫째, 인계받은 외주사 코드에 운영 메트릭이 거의 없는 상태였기 때문에 DB CPU가 포화 수준까지 치솟는 것을 본 뒤에야 Redis 도입을 결정하는 사후 대응이 됐습니다. 인계 첫 단계에서 분당 INSERT 추이·DB CPU·버퍼 적체·배치 소요 시간을 관측 도구로 먼저 박아 임계점에 도달하기 전에 신호를 받는 쪽으로 가져갔어야 했습니다. 둘째, 운영 중 추가한 GPS 노이즈 보조 규칙의 임계값은 운영 데이터로 검증한 값이 아니라 직관으로 정한 휴리스틱이라, 거짓 양성 분포를 운영 데이터로 측정해 다시 잡는 것이 다음 단계입니다.',
      en: 'Two things I would do differently. First, the inherited vendor code had almost no operational metrics, so the Redis migration was reactive — it only kicked off after DB CPU hit saturation. From day one of the handover, I should have wired observability around inserts per minute, DB CPU, buffer backlog, and batch duration so we get signal before the threshold breaks. Second, the GPS-noise guard rule was set by intuition, not calibrated against production data — the next step is to measure the false-positive distribution from real traffic and re-tune the thresholds.',
      ja: 'やり直すなら2点は別の進め方をします。第一に、引継いだ外注コードに運用メトリクスがほぼ無く、DB CPU飽和水準到達を見てからRedis導入を決めた事後対応となりました。引継ぎ初日から分単位INSERT推移・DB CPU・バッファ滞留・バッチ所要時間を観測ツールで可視化し、閾値到達前にシグナルを受ける側に持っていくべきでした。第二に、運用中に追加したGPSノイズ補助ルールの閾値は運用データ検証なしの直感ヒューリスティックで、偽陽性分布を実運用データで測定し再調整するのが次のステップです。',
    },
    reflection: {
      ko: '다시 한다면 관측 지표를 처음부터 박았을 것입니다. Redis 도입은 "DB CPU가 포화 수준까지 치솟는 걸 보고" 시작한 사후 대응이었는데, 분당 INSERT 추이·Connection Pool 사용률·DB CPU%·버퍼 적체·배치 소요 시간을 관측 도구로 시각화했다면 임계점에 도달하기 전에 신호를 받을 수 있었을 것입니다. 단일 Redis 인스턴스가 SPOF로 남은 부분도 같은 맥락이라, 메트릭이 있었다면 Sentinel/Cluster 도입 우선순위를 더 일찍 올렸을 것이라 봅니다. 운영 중 추가한 GPS 튐 필터의 임계값도 데이터 분석 없이 직관으로 정한 휴리스틱이라, 휴리스틱을 데이터로 검증하는 단계를 건너뛴 점이 솔직히 후회됩니다.',
      en: 'If I were to start over, I would wire observability in from day one. The Redis migration was reactive, kicked off after watching DB CPU hit saturation. Charting inserts per minute, connection pool usage, DB CPU%, buffer backlog, and batch duration would have given me a signal before the threshold was breached. The single-Redis SPOF falls in the same category: with metrics in place I would have raised the priority on Sentinel or Cluster sooner. The GPS-noise heuristic is another honest regret — the thresholds were intuited, not validated against production data, and I skipped the step of grounding the heuristic in numbers.',
      ja: 'やり直すならobservabilityを初日から組み込みます。Redis導入は「DB CPUが飽和水準に達するのを見て」始めた事後対応で、分単位INSERT推移・Connection Pool使用率・DB CPU%・バッファ滞留・バッチ所要時間を観測ツールで可視化していれば、閾値到達前にシグナルを受けられたはずです。単一Redisが SPOFのまま残っている点も同じ流れで、メトリクスがあればSentinel/Cluster導入優先度を早く上げていたと考えます。運用中に追加したGPS雑音フィルタの閾値もデータ検証なしで直感で決めたヒューリスティックで、ヒューリスティックを数値で裏付ける段階を飛ばした点は率直に悔いが残ります。',
    },
    visuals: {
      problem: {
        metrics: [
          { value: '포화', label: { ko: 'MySQL CPU 도달 (지속적)', en: 'MySQL CPU saturation (sustained)', ja: 'MySQL CPU飽和（持続的）' } },
          { value: '주기적', label: { ko: '서버 다운', en: 'Server outages', ja: '定期的サーバーダウン' } },
          { value: '단건 INSERT', label: { ko: '좌표마다 1회', en: 'Per-coordinate INSERT', ja: '座標ごとに1回' } },
        ],
      },
      alternatives: {
        table: {
          columns: [
            { ko: '후보', en: 'Option', ja: '候補' },
            { ko: '장점', en: 'Upside', ja: '利点' },
            { ko: '단점', en: 'Downside', ja: '欠点' },
          ],
          rows: [
            [
              { ko: 'Kafka / SQS', en: 'Kafka / SQS', ja: 'Kafka / SQS' },
              { ko: '영구 로그·재처리·다중 컨슈머', en: 'Durable log, replay, multi-consumer', ja: '永続ログ・再処理・多コンシューマ' },
              { ko: '운영 인력·인프라 추가', en: 'Adds infra + headcount', ja: '運用人員・インフラ追加' },
            ],
            [
              { ko: 'DB-only 최적화', en: 'DB-only tuning', ja: 'DBのみ最適化' },
              { ko: '새 자원 0', en: 'No new resources', ja: '新規リソース0' },
              { ko: '절대량 한계 (파티션만 부분 채택)', en: 'Cap on raw write volume (partial — partitions only)', ja: '絶対量の壁 (パーティションのみ部分採用)' },
            ],
            [
              { ko: 'Redis 버퍼 + 주기 배치', en: 'Redis buffer + periodic batch', ja: 'Redisバッファ + 周期バッチ' },
              { ko: '기존 인프라 재활용 + 도메인 fit', en: 'Reuses existing infra, fits the access pattern', ja: '既存インフラ再利用・パターン合致' },
              { ko: 'Sentinel 없으면 SPOF', en: 'SPOF without Sentinel', ja: 'Sentinel無しではSPOF' },
            ],
          ],
          selectedRow: 2,
        },
      },
      decision: {
        diagramKey: 'odiya',
      },
      result: {
        // 95% 감소 수치는 아래 chart로 시각화 — 카드와 중복 X
        metrics: [
          { value: '0대', label: { ko: '인프라 추가 증설', en: 'New infra added', ja: 'インフラ追加' } },
          { value: '~230%', label: { ko: 'B2B 매출 성장 기여 (회사 발표 기준)', en: 'B2B revenue growth contributed', ja: 'B2B売上成長寄与' } },
        ],
        chart: {
          type: 'bar',
          unitLabel: { ko: '분당 INSERT (정규화)', en: 'INSERTs / min (normalized)', ja: '分単位INSERT (正規化)' },
          data: [
            { label: { ko: 'Before', en: 'Before', ja: 'Before' }, value: 100 },
            { label: { ko: 'After', en: 'After', ja: 'After' }, value: 5 },
          ],
          caption: { ko: '재설계 전후 DB 쓰기 부하 비교 (정규화 100 기준 — Redis 버퍼 + 60초 배치 적용 후 약 5 수준).', en: 'DB write load before vs after the redesign, normalized to 100 (drops to ~5 after Redis buffer + 60s batch).', ja: '再設計前後のDB書き込み負荷比較（100基準で正規化 — Redisバッファ + 60秒バッチ適用後は約5）。' },
        },
      },
    },
  },

  'oem-integration-server': {
    oneLiner: {
      ko: '서비스는 계속 추가되는데 매번 회원가입을 따로 받는 구조가 사용자 불편과 운영 부담으로 누적되고 있어, 통합 OEM 인증을 회사에 제안해 채택받고 팀장으로 리딩하며 JWT 기반 토큰 모델·재사용 탐지·메시지 전달 추적·복구·라이프사이클 자동화까지 처음부터 설계·구현했습니다.',
      en: 'New services kept being added and each one signed users up from scratch — that was hurting both UX and operations. I proposed a unified OEM auth platform, got it approved, and led the team that built it from zero: a JWT-based token model, reuse detection, message-delivery tracing and recovery, and an automated lifecycle.',
      ja: 'サービスが追加されるたびに会員登録をやり直す構造がユーザー体験と運用負荷の双方を圧迫していたため、統合OEM認証を社内に提案して採用され、チームリーダーとしてJWTベースのトークンモデル・再利用検知・メッセージ配信追跡と復旧・ライフサイクル自動化までゼロから設計・実装した。',
    },
    context: {
      ko: '오디야 안정화를 마무리하면서, 신규 서비스가 계속 붙는데 매번 따로 회원가입을 받는 구조는 UX와 운영 비용 양쪽에서 부담이 누적된다는 게 명확했습니다. 통합 OEM 인증을 회사에 제안해 채택받고, 팀장으로서 리딩하며 백엔드(Spring Boot)·운영자 대시보드(Next.js)·가입·마이페이지 WebView 세 컴포넌트를 처음부터 설계·구현했습니다.',
      en: 'After stabilising Odiya it was clear that, with new services queued, asking users to sign up separately per product was going to keep hurting UX and pile operational cost. I proposed a unified OEM auth platform, got it approved, and led the team — building three components from zero: backend (Spring Boot), operator dashboard (Next.js), and signup/mypage WebView.',
      ja: 'Odiyaの安定化を終え、新規サービスが追加されるたびにサイロ型の会員登録を求める構造はUXと運用コストの双方で負担が累積する点が明確になった。統合OEM認証を会社に提案して採用され、チームリーダーとしてバックエンド（Spring Boot）・運用ダッシュボード（Next.js）・加入・マイページWebViewの3コンポーネントをゼロから設計・実装した。',
    },
    problem: {
      ko: '핵심 위험은 데이터 정합성이었습니다. 부모-자녀 관계가 서비스마다 따로 저장되면 한 곳만 어긋나도 사용자 화면에서 데이터 불일치가 노출됩니다. 동시에 자녀 단말은 백그라운드 위치 전송 때문에 장수명 인증이 필요한데, 짧은 토큰 회전 모델로는 안드로이드 백그라운드 강제 종료와 네트워크 끊김 사이에 위치 전송이 빠져버립니다.',
      en: 'The structural risk of the silo pattern was consistency — links stored per-downstream meant any drift would surface as a user-facing incident. Child devices needed long-lived auth for background location reporting; the standard short access + refresh rotation drops out between Android background-kills and network toggles.',
      ja: 'サイロ構造の核心リスクは整合性 — 親子関係を下流ごとに分散保存すれば1箇所のずれが画面上の事故になる。子供端末は背景位置送出のため長寿命認証が必要だが、標準のaccess + refresh回転ではbackground kill・通信トグルの間に位置が抜ける。',
    },
    hypothesis: {
      ko: '네 가지 설계 결정을 처음부터 잡고 들어갔습니다. 부모/자녀 비대칭 토큰 모델, refresh 재사용 탐지를 처음부터, Webhook은 DLQ와 운영자 콘솔까지, 그리고 "서비스 탈퇴"와 "계정 탈퇴"는 다른 신호로 분리한다는 것입니다.',
      en: 'Four design bets, all from day 1 — asymmetric token model (standard for parents, long-lived for children), refresh-reuse detection up front rather than after an incident, webhooks need DLQ + operator console (in-memory retries alone aren’t enough), and "service withdrawal" vs "account withdrawal" stay as distinct signals.',
      ja: '4つの設計判断を初日から置いた — 非対称トークンモデル（親は標準、子供は長寿命）、refresh再利用検知を事故後ではなく最初から、Webhookはin-memoryリトライだけでは不十分なのでDLQ + 運用者コンソール、「サービス退会」と「アカウント退会」は別シグナルに分離。',
    },
    alternatives: {
      ko: '매니지드 인증(Auth0/Cognito/Firebase)·표준 OAuth(Spring Authorization Server)·Kafka/RabbitMQ 모두 검토했지만, 미성년자 도메인 제약과 자사 백엔드 통합이 1차 목표라는 점에서 자체 모델 + DLQ가 가장 잘 맞았습니다.',
      en: 'Evaluated managed auth (Auth0 / Cognito / Firebase), standard OAuth (Spring Authorization Server), and Kafka / RabbitMQ for webhooks — but minor-domain constraints and the "internal backend unification as day-one goal" axis made a self-built model + DLQ the better fit.',
      ja: 'マネージド認証（Auth0/Cognito/Firebase）・標準OAuth（Spring Authorization Server）・Kafka/RabbitMQを全て検討したが、未成年ドメイン制約と「自社バックエンド統合が一次目標」という軸で、自前モデル + DLQのfitが大きかった。',
    },
    decision: {
      ko: '토큰 모델을 부모/자녀 비대칭으로 분리했습니다. 자녀 쪽 토큰을 길게 잡은 이유는, 자녀폰의 백그라운드 강제 종료와 네트워크 끊김이 일상이라 표준 회전 패턴으로는 위치 전송이 끊기고 그게 곧 보호자 컴플레인으로 이어지기 때문입니다. 부모 쪽은 표준 회전, 자녀 쪽은 장수명 토큰을 DB에 안전하게 보관하는 구조로 풀었고, 회수된 토큰의 재사용이 감지되면 같은 묶음 전체를 즉시 무효화하고 감사 로그를 남깁니다. Webhook은 단계적 재시도 후 실패하면 별도 보관소로 보내 운영팀이 추적·재시도·포기할 수 있게 했고, 휴면 → 익명화 → 완전 삭제 라이프사이클은 자동으로 돌게 했습니다.',
      en: 'Asymmetric parent/child token model — standard rotation on the parent side, a longer-lived token on the child side held safely in the DB. The long-lived child token is intentional: background kills and network toggles are routine on child devices, the textbook short-access rotation drops the location stream, and a single missed location reading is a guardian complaint. Revoked-token reuse triggers an immediate family-wide invalidation with audit log; webhooks ride a staged retry pool and overflow into an operator-accessible holding area for trace / retry / dismiss; lifecycle is automated through dormant → anonymise → hard-delete.',
      ja: 'トークンモデルを親/子で非対称に — 親側は標準回転、子側はDB上で安全に保管する長寿命トークン。子トークンを長くしたのは、子供端末のbackground kill・通信トグルが日常で標準回転パターンでは位置送出が途切れ、それが即保護者苦情のため。回収済みトークンの再利用検知時はファミリー単位で即時無効化 + 監査ログ。Webhookは段階的リトライ後の失敗を別保管領域に送って運用が追跡・再試行・破棄できる形にし、休眠 → 匿名化 → 完全削除のライフサイクルは自動化。',
    },
    execution: {
      ko: '한 번에 완성된 설계가 아닙니다. 외부 QC와 내부 QC 단계에서 네 가지 빈틈이 차례로 드러났고, 그때마다 DB 스키마와 동작을 한 단계씩 보강했습니다. 위치 공유와 단말 통제를 한 번에 묶던 가입을 서비스 단위로 분리했고, 메모리 3회 재시도가 다 실패한 Webhook은 DLQ 테이블과 운영자 콘솔을 붙여 추적·복구 가능하게 만들었습니다. 직접 가입 사용자에게 두 번 발송되던 휴면 안내 경로를 차단했고, "한 서비스 데이터만 정리"와 "계정 자체 소멸 → JWT 즉시 차단" 신호를 별도 이벤트로 갈랐습니다.',
      en: 'The design did not land in one shot. Four gaps surfaced during external and internal QC, each closed by an iterative DB-schema and behaviour change. The previously all-or-nothing parent-child linkage was split so location-sharing and device-control can be opted into per service. Webhooks that failed all 3 in-memory retries became traceable and recoverable via a DLQ table and an operator console. The path that sent dormancy emails twice to direct-web signups was closed, and "clean up data in one service" was separated from "the account itself is gone, blacklist the JWT everywhere" as distinct events.',
      ja: '一度に決まった設計ではありません。外部QC・内部QC段階で4つの不足が順に表面化し、その都度DBスキーマと挙動を一段ずつ補強しました。位置共有と端末制御を一括で紐づけていた連携をサービス単位に分離し、メモリ内3回リトライが全失敗したWebhookはDLQテーブルと運用者コンソールを併設して追跡・復旧可能にしました。Web直接加入者に二重発送されていた休眠通知の経路を遮断し、「あるサービスのデータだけ整理」と「アカウント自体が消えるので全JWTを即時遮断」というシグナルを別イベントとして切り分けました。',
    },
    result: {
      ko: '여러 서비스가 부모-자녀 관계를 각자 따로 저장하던 구조를, 모두 OEM 인증 서버 한 곳을 바라보는 구조로 옮겼습니다. 이 통합 인증 아키텍처가 안정적으로 자리잡으면서 후속 사업 의사결정의 기반이 됐고, 그 위에서 모하니가 정식 사업화로 이어졌으며 오디야는 새 버전이 OEM 사전탑재 채널로 확장돼 회사 B2B 사업 규모를 한 단계 키울 수 있었습니다.',
      en: 'Where each service used to keep its own copy of parent-child relationships, all of them now read from the OEM auth server and sync signup / withdrawal / linkage events through webhooks. The unified auth architecture held up in production and became the foundation for the next round of business decisions: Mohani was greenlit for full productization, and a new version of Odiya shipped via the OEM pre-install channel — scaling the company’s B2B business another step up.',
      ja: '各サービスが自身のDBに親子関係を別々に保管していた構造から、すべてがOEM認証サーバー1箇所を参照し、加入・退会・連携イベントをWebhookで受けて同期する構造に移行しました。この統合認証アーキテクチャが安定して稼働したことが後続の事業判断の土台となり、モハニは正式な事業化が決定し、オディヤは新バージョンがOEM事前搭載チャネルへ展開され、会社のB2B事業規模をさらに一段拡大できました。',
    },
    improvements: {
      ko: '한 가지 다시 검토하고 갈 부분이 있습니다. 자녀 토큰을 DB에 암호화해 보관하는 패턴은 알고리즘 자체는 안전하지만, 결국 키 노출 위험이 운영팀의 관리 책임으로 남는 구조입니다. 같은 길을 다시 간다면 하드웨어/관리형 키 격리(HSM·KMS 계열)를 함께 두는 방향을 명시적으로 정책화했을 것입니다.',
      en: 'One area I would revisit. Storing the child token encrypted in the DB is safe in itself, but key-exposure risk ultimately stays the ops team’s management burden. If I were to do it again, I would lock in hardware / managed key isolation (HSM / KMS-class) as an explicit policy alongside the encryption.',
      ja: '再度検討すべき点が1つあります。子トークンをDB上で暗号化保管するパターンはアルゴリズム自体は安全ですが、結局鍵漏洩リスクが運用チームの管理責任として残ります。やり直すならハードウェア/マネージド鍵分離（HSM・KMS系）を明示的にポリシー化して併設するでしょう。',
    },
    reflection: {
      ko: '지금 시점에 명백히 잘못된 결정으로 보이는 부분은 없습니다. 다만 다시 한다면 두 가지는 검토하고 갈 것 같습니다. 하나는 OAuth 2.0 표준 솔루션 위에 도메인 제약을 얹는 구조입니다. 직접 만든 것이 도메인 특수성을 모델링하기에는 좋았지만, 외부 파트너 연동이 본격화되면 표준 프로토콜이 없다는 점이 결국 마이그레이션 비용으로 돌아옵니다. 다른 하나는 자녀 토큰을 DB에 암호화해 보관하는 패턴입니다. 알고리즘 자체는 안전하지만 결국 키 노출 위험이 운영 책임으로 남기 때문에, 같은 길을 다시 간다면 키 격리(HSM·KMS 계열)도 같이 검토했을 것입니다.',
      en: 'Looking back I don’t see anything clearly wrong, but two things I’d at least re-examine. One is whether to layer the domain constraints on top of a standard OAuth 2.0 solution. Building it bespoke was a good fit for the domain, but once external partners start integrating, missing the standard protocol becomes migration debt. The other is storing the child token encrypted in the DB. The algorithm itself is safe, but key exposure ultimately stays an operational liability, so today I’d at least put key isolation (HSM / KMS-class) on the table next to it.',
      ja: '現時点で明確に誤った決定だと思う部分はない。ただやり直すなら2点は検討すると思う。一つはOAuth 2.0標準ソリューションの上にドメイン制約を載せる構造で、自前で作ったほうがドメイン特殊性のモデリングには向いていたが、外部パートナー連携が本格化すれば標準プロトコル不在がそのままマイグレーション負債になる。もう一つは子トークンをDB上で暗号化保管するパターンで、アルゴリズム自体は安全でも、結局鍵漏洩リスクが運用責任として残るため、今なら鍵分離（HSM・KMS系）も併せて検討するだろう。',
    },
    visuals: {
      problem: {
        bullets: {
          ko: [
            '부모-자녀 관계를 서비스별로 따로 저장 → 한 곳만 어긋나도 사용자 화면에서 사고로 노출',
            '자녀 단말은 백그라운드 위치 송출용 장수명 인증 필요 — 일반 access/refresh 회전 패턴으로는 위치가 끊김',
            '미성년자 자가 탈퇴 금지 — 부모/자녀 탈퇴 처리가 비대칭이어야 함',
            'Webhook 단계적 재시도가 다 실패해도 운영팀이 추적·복구할 수단이 필요',
          ],
          en: [
            'Per-service storage of parent-child links → any drift turns into a user-facing outage',
            'Child devices need long-lived auth for background location — standard short access + refresh rotation drops the stream',
            'Minor self-withdrawal must be blocked — parent/child removal flows must stay asymmetric',
            'Even after the staged webhook retries fail, ops still need a recovery surface for delivery',
          ],
          ja: [
            'サービスごとに親子関係を分散保存 → 1箇所のずれが画面上の事故になる',
            '子供端末は背景位置送出のため長寿命認証が必要 — 通常のaccess + refresh回転では位置が途切れる',
            '未成年の自己退会は禁止 — 親と子で退会経路を非対称にする必要',
            'Webhookの段階的リトライが全失敗しても、運用が追跡・復旧する手段が必要',
          ],
        },
      },
      alternatives: {
        table: {
          columns: [
            { ko: '후보', en: 'Option', ja: '候補' },
            { ko: '장점', en: 'Upside', ja: '利点' },
            { ko: '단점', en: 'Downside', ja: '欠点' },
          ],
          rows: [
            [
              { ko: 'Auth0 / Cognito / Firebase Auth', en: 'Auth0 / Cognito / Firebase Auth', ja: 'Auth0 / Cognito / Firebase Auth' },
              { ko: '관리형 — 인프라·운영 부담 0', en: 'Managed — zero infra/ops burden', ja: 'マネージド — インフラ/運用負担0' },
              { ko: '미성년자 자가 탈퇴 금지·재가입 승인·장수명 자녀 토큰 같은 도메인 제약을 외부 서비스로 푸는 비용 > 내제 비용', en: 'Bending it around minor-self-withdrawal, re-signup approval, long-lived child tokens costs more than building it', ja: '未成年自己退会禁止・再加入承認・子供長寿命トークンを外部で解くコストが内製より高い' },
            ],
            [
              { ko: 'Spring Authorization Server (OAuth 2.0)', en: 'Spring Authorization Server (OAuth 2.0)', ja: 'Spring Authorization Server (OAuth 2.0)' },
              { ko: '표준 프로토콜 — 외부 파트너 연동에 유리', en: 'Standard protocol — friendly to future partner integrations', ja: '標準プロトコル — 将来のパートナー連携で有利' },
              { ko: '1차 목표가 자사 백엔드 통합이라 표준 제약이 더 부담 (외부 파트너 연동 시 마이그레이션 비용은 회고로 인정)', en: 'Internal backend unification was the day-one goal; protocol constraints outweighed portability (migration debt acknowledged in reflection)', ja: '一次目標が自社バックエンド統合のため標準制約のほうが負担（外部パートナー連携時のマイグレーション負債は振り返りで認識）' },
            ],
            [
              { ko: 'Kafka / RabbitMQ (Webhook용)', en: 'Kafka / RabbitMQ (webhooks)', ja: 'Kafka / RabbitMQ（Webhook用）' },
              { ko: '내구성 있는 메시지 큐', en: 'Durable message queue', ja: '耐久性のあるメッセージキュー' },
              { ko: '운영 인력·인프라 추가 부담 큼', en: 'Adds operational headcount + infra we did not have', ja: '運用人員・インフラ追加負担が大きい' },
            ],
            [
              { ko: '자체 모델 + DLQ 테이블 + 운영자 콘솔', en: 'Self-built model + DLQ table + operator console', ja: '自前モデル + DLQテーブル + 運用者コンソール' },
              { ko: '도메인 특수성에 정확히 맞춤 + 운영팀이 직접 개입 가능', en: 'Exact fit to the domain + ops team can intervene directly', ja: 'ドメイン特殊性に正確に合致 + 運用が直接介入可能' },
              { ko: '외부 파트너 연동 시 표준 부재가 마이그레이션 비용으로 환원', en: 'Lack of a standard becomes migration debt when external partners come', ja: '外部連携時、標準不在がマイグレーション負債に' },
            ],
          ],
          selectedRow: 3,
        },
      },
      decision: {
        diagramKey: 'oem',
        bullets: {
          ko: [
            '토큰 재사용 탐지 — 회수된 토큰의 재사용이 감지되면 같은 묶음 전체를 즉시 무효화 + 감사 로그',
            '비대칭 토큰 모델 — 자녀 쪽은 장수명 토큰을 DB에 안전 보관해 백그라운드 위치 송출이 끊기지 않게 처리',
            'Webhook 전달 추적 — 전용 비동기 풀에서 단계적 재시도 → 실패 시 별도 보관소 + 운영자 콘솔(목록·재시도·포기 + 감사 로그)',
            '라이프사이클 자동화 — 휴면 안내 → 익명화 → 완전 삭제 단계가 자동 진행',
          ],
          en: [
            'Reuse detection — a revoked-token reuse triggers an immediate family-wide invalidation + audit log',
            'Asymmetric token model — the child side holds a longer-lived token safely in the DB so background location reporting never breaks',
            'Webhook delivery tracing — dedicated async pool with staged retries → failures land in a holding area + operator console (list / retry / dismiss + audit)',
            'Lifecycle automation — dormancy notice → anonymise → hard-delete runs as an automated pipeline',
          ],
          ja: [
            '再利用検知 — 回収済みトークンの再利用検知時にファミリー単位で即時無効化 + 監査ログ',
            '非対称トークンモデル — 子側は長寿命トークンをDBで安全保管し背景位置送出が途切れない構造',
            'Webhook配信追跡 — 専用非同期プールで段階的リトライ → 失敗時は別保管領域 + 運用者コンソール（一覧・再試行・破棄 + 監査）',
            'ライフサイクル自動化 — 休眠通知 → 匿名化 → 完全削除が自動で進行',
          ],
        },
      },
      execution: {
        bullets: {
          ko: [
            '서비스 단위 가입 분리 — 같은 부모-자녀가 위치 공유와 단말 통제를 따로 신청할 수 있도록, 한 번에 묶이던 연동 구조를 서비스 단위로 갈랐습니다.',
            'Webhook 추적성 보강 — 일시 장애로 단계적 재시도가 모두 실패한 메시지가 사라지던 문제를 잡기 위해, 실패 메시지를 별도 보관하는 영역과 운영자가 직접 재시도·포기를 누를 수 있는 콘솔, 같은 메시지가 두 번 처리되지 않게 막는 중복 방지 제약을 함께 투입했습니다.',
            '휴면 안내 중복 발송 차단 — 웹에서 직접 가입한 사용자에게 안내 메일이 두 번 발송되던 경로를 차단했습니다.',
            '계정 탈퇴 신호 분리 — "한 서비스에서만 데이터를 정리하라"는 신호와 "계정 자체가 사라지니 모든 서비스에서 토큰까지 즉시 차단하라"는 신호를 별도 이벤트로 갈랐습니다.',
          ],
          en: [
            'Per-service linkage — split the previously all-or-nothing parent-child linkage so the same pair can opt into location-sharing and device-control independently.',
            'Webhook traceability — transient outages were silently dropping messages that failed all the staged retries. Shipped a separate failure-message holding area, an operator console with manual retry / dismiss, and a dedup constraint so the same message is never processed twice.',
            'Dormancy notice dedup — closed the path that was sending dormancy emails twice to direct web signups.',
            'Account-withdrawal signal split — separated "clean up data in one service" from "the account itself is gone, revoke its tokens everywhere" as distinct events.',
          ],
          ja: [
            'サービス単位の連携分離 — 同じ親子が位置共有と端末制御を別々に申請できるよう、一括で紐づいていた連携構造をサービス単位で切り分けました。',
            'Webhook追跡性の補強 — 一時障害で段階的リトライが全失敗したメッセージが消えていた問題を解くため、失敗メッセージを保管する別領域 + 運用者が手動で再試行・破棄を押せるコンソール + 同一メッセージが二度処理されない重複防止制約を投入しました。',
            '休眠通知二重送信の遮断 — Web直接加入者へ通知メールが二度発送されていた経路を遮断しました。',
            'アカウント退会シグナルの分離 — 「あるサービスでだけデータを整理せよ」というシグナルと「アカウント自体が消えるので全サービスでトークンまで即時遮断せよ」というシグナルを別イベントとして切り分けました。',
          ],
        },
      },
    },
  },

  mohani: {
    oneLiner: {
      ko: '자녀 단말 통제에서 "차단이 안 되는 버그"를 추적하다가 외부 MDM SDK 통합 시점에 생긴 CPU 과부하를 발견, 무거운 Native 작업을 백그라운드 스레드로 분리해 ANR을 해소하고 OS 레벨 MDM + AccessibilityService 다층 방어로 자녀 단말 제어를 안정화했습니다.',
      en: 'Tracking a "blocking does not fire" bug led me to a CPU-overload trail that appeared the moment an external MDM SDK was wired in — moving the heavy native calls onto a background executor cleared the recurring ANR and got the OS-level MDM + AccessibilityService defence-in-depth back to steady-state.',
      ja: '子供端末制御で「ブロックが効かない」バグを追跡する中で、外部MDM SDK統合タイミングに生じたCPU過負荷を発見、重いNative処理をバックグラウンドスレッドに分離してANRを解消し、OSレベルMDM + AccessibilityServiceの多層防御で子供端末制御を安定化させました。',
    },
    context: {
      ko: '부모 앱이 자녀 단말의 앱 차단·시간 제한·콘텐츠 차단을 원격 제어하는 제품입니다. 사업부 요구는 들어왔지만 일반 앱 권한으로 가능한지 검증되지 않은 상태였기에, AccessibilityService와 OS 레벨 MDM SDK 조합으로 시스템 레벨 차단이 가능하다는 기술 검증 보고서를 직접 작성해 출시 일정 근거를 만들었습니다. 이후 팀장으로서 자녀앱(RN+Native)·부모앱(RN)·서버(Spring Boot) 세 컴포넌트의 아키텍처를 주도해 설계·구현했습니다. 자녀 단말의 네트워크 단 도메인 차단은 네트워크 레벨 MDM SDK 기능을 별도 레이어로 함께 적용해 앱 단위 차단(AccessibilityService)과 OS 단위 제어 위에 보조 안전망을 두었습니다.',
      en: 'A product where the parent app drives the child device — app blocking, time limits, content filtering over the air. The business side asked for the feature without prior OS-level verification, so I wrote the feasibility report myself (AccessibilityService + an OS-level MDM SDK = system-level blocking works) to give the team a launch-date basis, then led the build of all three components: child app (RN + Native), parent app (RN), server (Spring Boot). Network-level domain blocking on the child device was layered on top via the same MDM SDK family, sitting alongside app-level (AccessibilityService) and OS-level controls as an additional safety net.',
      ja: '親アプリが子供端末のアプリブロック・時間制限・コンテンツブロックを遠隔制御する製品。事業側の要求は先行したが一般アプリ権限で技術的に可能か未検証状態のため、AccessibilityService + OSレベルMDM SDKでシステムレベル遮断が可能という技術検証レポートを自ら作成しリリース日程の根拠を作成、以降チームリーダーとして子供アプリ（RN+Native）・親アプリ（RN）・サーバー（Spring Boot）3コンポーネントのアーキテクチャを主導して設計・実装しました。子供端末のネットワーク層ドメイン遮断は同系MDM SDKのネットワーク機能を別レイヤーで併用し、アプリ単位遮断（AccessibilityService）とOS単位制御の上に補助セーフティネットを設けました。',
    },
    problem: {
      ko: '문제는 두 갈래로 들어왔습니다. 첫째는 ANR이었습니다. "차단이 안 된다"는 컴플레인을 추적하다 main thread가 잡혀 차단 로직 자체가 돌지 못하고 있음을 확인했고, 원인 추적 기준점은 시점 정보였습니다. 원래 없던 증상이 외부 MDM SDK 통합 이후부터 발생했기 때문입니다. 둘째는 우회 경로였습니다. PIP·음악·녹음처럼 화면 없이 도는 백그라운드 앱은 화면 전환 이벤트가 발화하지 않아 차단 자체가 작동하지 않았습니다.',
      en: 'Two parallel problems — (1) ANR: chasing "block does not fire" complaints, I found the main thread pinned so the blocking logic itself was not running; decisive clue was timing (only appeared after the external MDM SDK integration). (2) Bypass: headless apps (PIP / music / recorder) never fired the window-state-change event, so the block did not run at all.',
      ja: '問題は2方向 — ① ANR：「ブロックが効かない」苦情を追うとmainスレッドが詰まり遮断ロジック自体が回っていなかった。決定的手掛かりはタイミング（外部MDM SDK統合後にのみ発生）。② 回避：PIP・音楽・録音のような画面のない背景アプリは画面状態変化イベントが発火せず遮断自体が動作しない。',
    },
    hypothesis: {
      ko: '"변경 이력에서 가장 가까운 원인부터 의심한다"는 원칙으로 외부 MDM SDK 통합 시점을 강한 후보로 잡았고, 그 SDK 호출이 main thread를 잡고 있을 가능성을 가설로 설정했습니다.',
      en: 'Principle: blame whatever changed most recently first. Hypothesis — the external MDM SDK integration was the obvious candidate, and its calls were likely pinning the main thread.',
      ja: '原則 — 「変更履歴で最も近い原因から疑う」。外部MDM SDK統合時点を強い候補とし、そのSDK呼び出しがmainスレッドを詰まらせている可能性を仮説とした。',
    },
    alternatives: {
      ko: 'systrace, Perfetto, Crashlytics ANR thread dump는 정확도는 높지만 셋업과 학습 곡선 부담이 컸습니다. 시점 단서가 명확했기 때문에 Android Studio Logcat과 AI 코드 분석 보조를 조합해 더 가볍게 접근했습니다.',
      en: 'systrace / Perfetto / Crashlytics ANR thread dumps were precise but heavy on setup / learning curve. With the timing clue clear, I picked the lightweight path — Android Studio Logcat + AI as a reading partner.',
      ja: 'systrace・Perfetto・Crashlytics ANR thread dumpは精度は高いがセットアップ・学習コスト負担が大きかった。タイミング手掛かりが明確だったため、Android Studio Logcat + AIコード分析補助のpathを選択。',
    },
    decision: {
      ko: '무거운 Native 작업을 백그라운드 스레드로 분리했습니다. 외부 MDM SDK 호출을 비동기 실행자로 옮겨, main thread를 잡고 있던 경로를 끊었습니다. 차단 자체도 단일 트리거로는 우회되는 도메인이라 다층 방어를 함께 짰습니다.',
      en: 'Moved the heavy native work onto a background thread — the external MDM SDK calls now run async on a dedicated executor, severing the main-thread-pin path. Blocking itself was a defence-in-depth problem (single trigger is bypassable), so I composed multiple layers.',
      ja: '重いNative処理をバックグラウンドスレッドに分離 — 外部MDM SDK呼び出しを非同期executor上で動かし、mainスレッドpin経路を断ち切った。遮断自体も単一トリガーでは回避される領域のため、多層防御に構成。',
    },
    execution: {
      ko: '먼저 외부 MDM SDK 호출을 비동기 실행자로 옮겨 메인 스레드를 잡고 있던 경로를 끊었고, 그 과정에서 호출이 폭주하면 큐가 무한히 쌓이는 후속 문제가 확인돼 큐 적체 방지 장치를 함께 넣었습니다. 우회 차단은 처음에는 화면 전환 이벤트 트리거만으로 처리했지만 PIP·음악·녹음 같이 화면 없는 앱은 그 이벤트가 발화하지 않아, 포그라운드 서비스 시작·종료 카운트를 차단 판단에 더했습니다. 시간 안전망은 메인 폴링과 보조 폴링 이중화, 부모 정책 변경은 푸시 알림 즉시 발사와 보조 동기화로 단일 실패 지점이 없도록 묶었습니다.',
      en: 'First moved the SDK calls onto an async executor to sever the main-thread-pin path; that surfaced a new failure mode where bursts piled an unbounded queue, so I added backlog protection to kill the pile-up at the source. The bypass started with the window-state-change event alone, but headless apps (PIP, music, recorder) never fire it, so I added foreground-service start/stop counts to the blocking decision. The time safety net is doubled (main poll plus backup poll), and parent-policy propagation goes through push immediately with a backup sync, leaving no single failure point.',
      ja: 'まず外部MDM SDK呼び出しを非同期executorに移してmainスレッドpin経路を断ち切り、その過程でバースト時にキューが無限に積まれる新たな問題が見えたためbacklog防止策を入れました。回避は当初は画面状態変化イベントトリガのみで処理していましたが、PIP・音楽・録音のように画面のないアプリではこのイベントが発火せず、フォアグラウンドサービス開始・終了カウントを遮断判定に追加しました。時間安全網はメインポーリング + バックアップポーリングの2重化、親ポリシー変更はプッシュ即時 + バックアップ同期で単一障害点が残らないよう束ねました。',
    },
    result: {
      ko: '반복 발생하던 ANR이 제거되고 다층 방어가 정상 운영되면서, 단일 트리거로는 잡히지 않던 화면 없는 앱(PIP·음악·녹음)도 함께 차단되게 됐습니다. 사용자 측에서는 "차단이 안 된다"는 컴플레인이 사라졌고, 운영 측에서는 외부 SDK 큰 변경 후에도 회귀가 잡히는 구조가 만들어졌습니다.',
      en: 'Recurring ANR was eliminated and the multi-layer defence running as intended — headless apps that no single trigger could catch (PIP, music, recorder) are now blocked too. On the user side the "blocking does not fire" complaints stopped; on the operations side there is now a structure that catches regressions even after large external-SDK upgrades.',
      ja: '反復していたANRが除去され、多層防御が通常稼働することで、単一トリガでは捕まらなかった画面のないアプリ（PIP・音楽・録音）も合わせて遮断されるようになりました。ユーザー側では「ブロックが効かない」という苦情が消え、運用側では外部SDKの大きな変更後でも回帰が捕まる構造ができました。',
    },
    improvements: {
      ko: '두 가지를 다시 한다면 다르게 잡았을 것입니다. 첫째, AccessibilityService 클래스가 차단 트리거·우회 감지·PIN 검증·외부 SDK 호출을 한 곳에 모두 끌어안은 채 점점 무거워졌고, 새 기능을 넣을 때마다 사이드 이펙트 위험이 컸습니다. 도메인 단위로 잘라 단위 테스트가 가능한 구조로 가져가는 것이 다음 단계입니다. 둘째, ANR 진단이 사용자 컴플레인을 받은 다음에야 시작됐다는 점이 정직한 회고입니다. Google Play Console의 ANR 비율과 Firebase Crashlytics의 ANR 스레드 덤프를 운영 대시보드에 처음부터 박았더라면 사용자가 알려주기 전에 신호를 받을 수 있었습니다.',
      en: 'Two things I would do differently. First, the AccessibilityService class ended up owning block triggers, evasion detection, PIN verification, and external-SDK calls in a single place, getting heavier every release and raising side-effect risk on each new feature. The next step is to split it along domain lines into something that can be unit-tested. Second, the ANR diagnosis only started after users reported it — that is the honest reflection. Putting Google Play Console ANR rate and Firebase Crashlytics ANR thread dumps on the operations dashboard from day one would have surfaced the signal before the user did.',
      ja: 'やり直すなら2点は別の進め方をします。第一に、AccessibilityServiceクラスが遮断トリガ・回避検知・PIN検証・外部SDK呼び出しを1箇所に抱えたまま重くなり、新機能投入のたびに副作用リスクが大きくなりました。次段階はドメイン単位に分割して単体テスト可能な構造へ持っていくことです。第二に、ANR診断がユーザー苦情を受けてから始まった点が正直な振り返りです。Google Play ConsoleのANR比率とFirebase CrashlyticsのANRスレッドダンプを運用ダッシュボードに初日から組み込んでいれば、ユーザーが知らせる前にシグナルを受けられたはずです。',
    },
    reflection: {
      ko: '가장 정직한 회고는 사용자가 알려준 다음에야 진단이 시작됐다는 점입니다. Google Play Console ANR 비율이나 Firebase Crashlytics ANR thread dump를 처음부터 운영 대시보드에 박았다면 사용자가 컴플레인을 보내기 전에 신호를 받을 수 있었습니다. 또 AccessibilityService 클래스가 차단 트리거·우회 감지·PIN gateway·외부 SDK 호출을 한 곳에 다 끌어안은 채 무거워진 상태였고, 새 기능이 들어갈 때마다 사이드 이펙트 위험이 컸습니다. 다시 한다면 도메인 단위로 분리하고 테스트 가능한 구조로 갔을 것입니다.',
      en: 'The honest reflection is that diagnosis only started after a user reported the issue. Google Play Console ANR rate and Firebase Crashlytics ANR thread dumps should have been on the operations dashboard from day one. Separately, the AccessibilityService class ended up owning block triggers, evasion detection, PIN verification, and external-SDK calls all in one place, getting heavier every release and raising side-effect risk on every new feature. Splitting it along domain lines into something unit-testable is the do-over.',
      ja: '最も正直な振り返りは、ユーザーが知らせてくれた後で診断が始まった点です。Google Play Console ANR比率やFirebase Crashlytics ANR thread dumpを初日から運用ダッシュボードに組み込んでいれば、ユーザーが苦情を送る前にシグナルを得られたはずです。また、AccessibilityServiceクラスがブロックトリガ・回避検知・PIN検証・外部SDK呼び出しを一箇所に抱えたまま重くなり、新機能投入のたびに副作用リスクが大きくなりました。ドメイン単位に分割して単体テスト可能な構造へ持っていくのが次のやり直しです。',
    },
    visuals: {
      problem: {
        bullets: {
          ko: [
            '컴플레인 패턴: "차단이 안 된다" — 백그라운드 서비스 사망이 아니라 main thread pin',
            '결정적 단서: 외부 MDM SDK 통합 이후부터 증상 발생 (변경 이력 기반 시점 단서)',
            '우회 경로: PIP·음악 재생·녹음 앱처럼 화면 없는 백그라운드 앱은 화면 전환 이벤트가 발화하지 않음',
          ],
          en: [
            'Complaint pattern: "blocking does not fire" — background service was alive, the main thread was pinned',
            'Decisive clue: symptom only began after the external MDM SDK integration (change-history timing signal)',
            'Bypass path: headless background apps (PIP, music players, recorders) never fire the window-state-change event',
          ],
          ja: [
            '苦情パターン：「ブロックが効かない」 — 背景サービスは生きており、mainスレッドが詰まっていた',
            '決定的手掛かり：外部MDM SDK統合後に症状が出始めた（変更履歴ベースのタイミング手掛かり）',
            '回避経路：PIP・音楽再生・録音アプリのような画面のない背景アプリは画面状態変化イベントが発火しない',
          ],
        },
      },
      alternatives: {
        table: {
          columns: [
            { ko: '진단 도구', en: 'Diagnostic tool', ja: '診断ツール' },
            { ko: '정확도', en: 'Precision', ja: '精度' },
            { ko: '비용', en: 'Cost', ja: 'コスト' },
          ],
          rows: [
            [
              { ko: 'systrace / Perfetto', en: 'systrace / Perfetto', ja: 'systrace / Perfetto' },
              { ko: '높음 — main thread block 시점 정확히 포착', en: 'High — pinpoints main-thread blocks', ja: '高 — mainスレッドブロック地点を正確に捕捉' },
              { ko: '셋업 시간·학습 곡선 부담 (시점 단서가 명확해 불필요)', en: 'Setup + learning curve heavy (timing clue made it unnecessary)', ja: 'セットアップ時間・学習曲線負担（タイミング手掛かりで不要）' },
            ],
            [
              { ko: 'Firebase Crashlytics ANR thread dump', en: 'Firebase Crashlytics ANR thread dump', ja: 'Firebase Crashlytics ANR thread dump' },
              { ko: '높음 — 사용자 단말의 실제 ANR stack 확보', en: 'High — captures real on-device ANR stacks', ja: '高 — 実機ANRスタックを取得' },
              { ko: '사전 셋업 필요 — 사고 시점에는 미구비 (회고 항목)', en: 'Needs prior setup — not in place when the bug hit (reflection item)', ja: '事前セットアップ必要 — 事故時には未整備（振り返り項目）' },
            ],
            [
              { ko: 'Android Studio Logcat + AI 코드 분석 보조', en: 'Android Studio Logcat + AI code reading', ja: 'Android Studio Logcat + AIコード分析' },
              { ko: '시점 단서가 명확할 때 충분', en: 'Sufficient when the timing clue is clear', ja: 'タイミング手掛かりが明確な場合に十分' },
              { ko: '낮음 — 기존 도구로 즉시 시작 가능', en: 'Low — can start with existing tools', ja: '低 — 既存ツールで即時開始可能' },
            ],
          ],
          selectedRow: 2,
        },
      },
      decision: {
        diagramKey: 'mohani',
      },
      execution: {
        bullets: {
          ko: [
            '① 앱 전환 감지 — Accessibility 이벤트 기반 (포그라운드 앱 전환 캡처)',
            '② 시간 초과 검사 — 주기 폴링 (사용 시간 누적 만료 감지)',
            '③ 백그라운드 앱 감지 — 포그라운드 서비스 시작·종료 카운트 추적 (PIP·음악·녹음 등 화면 없는 앱 우회 차단)',
            '④ 정책 변경 즉시 반영 — 로컬 설정 변경 리스너 (부모 정책 변경이 자녀 단말에 즉시 적용)',
            '⑤ 원격 차단 명령 — 푸시 알림 기반 (부모가 즉시 발사하는 원격 차단)',
            '★ 외부 MDM SDK 호출은 비동기 실행자로 직렬화 + 큐 적체 방지로 main thread pin 차단',
          ],
          en: [
            '① App transition — Accessibility-event-based foreground-app capture',
            '② Time-overrun check — periodic poll for cumulative usage expiry',
            '③ Headless background detection — foreground-service start/stop counts (closes PIP / music / recorder bypass)',
            '④ Instant policy propagation — local-store change listener (parent policy hits the child device immediately)',
            '⑤ Remote block command — push-notification-driven immediate block',
            '★ External MDM SDK calls serialised on an async executor + backlog protection — no more main-thread pin',
          ],
          ja: [
            '① アプリ遷移 — Accessibilityイベントベース（フォアグラウンドアプリ遷移をキャプチャ）',
            '② 時間超過チェック — 周期ポーリング（使用時間累積期限）',
            '③ 背景アプリ検知 — フォアグラウンドサービス開始・終了カウント追跡（PIP・音楽・録音などheadlessアプリ回避を遮断）',
            '④ ポリシー変更即時反映 — ローカルストア変更リスナー（親ポリシー変更が子供端末に即時適用）',
            '⑤ 遠隔遮断コマンド — プッシュ通知駆動の即時遮断',
            '★ 外部MDM SDK呼び出しは非同期executorで直列化 + backlog防止でmainスレッドpinを遮断',
          ],
        },
      },
      result: {
        metrics: [
          { value: '다층 방어', label: { ko: '하나가 우회당해도 나머지가 잡는 구조 — 앱 전환 감지·주기 폴링·화면 없는 앱 감지·정책 변경 즉시 반영·원격 차단 명령', en: 'Multiple independent triggers — when one is bypassed the others still catch it (app transition · periodic poll · headless-app detection · instant policy propagation · remote block command)', ja: '多層防御 — 1つが回避されても他が捕える構造（アプリ遷移・周期ポーリング・ヘッドレスアプリ検知・ポリシー即時反映・遠隔遮断コマンド）' } },
          { value: '이중 안전망', label: { ko: '차단 누락 지연 — 메인 폴링이 돌고 실패해도 보조 폴링이 한 번 더 잡고, 부모 정책 변경은 푸시 즉시 + 보조 동기화로 이중화', en: 'Doubled safety net — main poll plus a backup poll, and parent policy changes go out via push with a backup sync', ja: '二重安全網 — メインポーリングが回り、失敗時もバックアップが捕え、親ポリシー変更はプッシュ即時 + バックアップ同期で二重化' } },
          { value: 'PIP·음악·녹음', label: { ko: '화면 없는 앱도 차단 — 포그라운드 서비스 시작·종료 카운트 추적으로 단일 트리거가 못 잡던 우회 경로 봉쇄', en: 'Headless apps blocked too — tracking foreground-service start/stop counts closes the bypass single-trigger schemes miss', ja: '画面のないアプリも遮断 — フォアグラウンドサービスの開始・終了カウント追跡で単一トリガでは捕えられない回避経路を封鎖' } },
        ],
      },
    },
  },

  kocca: {
    oneLiner: {
      ko: '외국인 학생의 한국어 발음을 정확하게 평가하려면 STT가 받는 음성 포맷을 클라이언트에서 만들어 변환 손실을 없애야 했고, 발음과 말하기의 응시 흐름을 단계 단위로 분리해 안정적으로 운영해야 했습니다. Soundmind 시기 정부 R&D 과제로 진행된 외국인 학생 대상 한국어 평가 플랫폼을 팀장으로서 리딩하며 자체 WAV 인코더부터 외부 한국형 STT 폴링 통신, 응시 state machine, 미들웨어 RBAC, 컨테이너 보안 강화까지 풀스택으로 책임지고 산출물로 납품했습니다.',
      en: 'During my Soundmind tenure I shipped a full-stack Korean-speaking assessment platform for foreign learners under a Korean government R&D programme. A hand-written WAV encoder matched to the STT input spec, a polling integration with the contractually-mandated Korean-tuned STT, a pronunciation / speaking exam state machine, middleware RBAC, and a hardened container image — all delivered as a single-owner R&D deliverable.',
      ja: 'Soundmind在籍中、外国人学習者向け韓国語発音・スピーキング評価のR&Dをフルスタックでリーディングして出荷しました。自作WAVエンコーダ、外部韓国語型STTとのポーリング連携、発音・スピーキングの受験state machine、ミドルウェアRBAC、コンテナのセキュリティ強化を主導して政府R&D成果物として納品しました。',
    },
    context: {
      ko: '정부 R&D 과제로 진행한 외국인 학생 대상 한국어 평가 플랫폼입니다. 4역할(학생·교사·교사보조·관리자) RBAC, 학교별 멀티테넌트, 다단계 시험 회차 state machine 구조 안에서, 팀장으로서 App Router·Server Action·Route Handler·DB 스키마·컨테이너 배포까지 리딩하며 핵심 설계를 담당했습니다.',
      en: 'A government-funded Korean-speaking assessment platform for foreign learners. Four user roles (student · teacher · sub-teacher · admin) with RBAC, school-level multitenancy, and a multi-stage exam-status state machine. As team lead I led the full stack: App Router, Server Action, Route Handler, DB schema, container deployment.',
      ja: '政府R&D課題として進められた外国人学習者向け韓国語評価プラットフォーム。4ロール（学生・教師・教師補助・管理者）RBAC・学校別マルチテナント・多段階の試験回次state machine構造の中で、チームリーダーとしてApp Router・Server Action・Route Handler・DBスキーマ・コンテナデプロイをリーディングし、コア設計を担当しました。',
    },
    problem: {
      ko: '핵심은 STT 포맷 제약이었습니다. 외부 한국형 STT가 특정 PCM 포맷만 받기 때문에 MediaRecorder의 webm/opus를 그대로 보내면 서버 ffmpeg 변환이 필요해 응답 지연, 트랜스코딩 손실, iOS Safari 호환성 문제가 누적됩니다. 동시에 응시 흐름(발음·말하기 단계 분리)의 안정적인 운영, 4역할 RBAC, 학교별 멀티테넌트 격리까지 한 설계 안에서 잡아야 했습니다.',
      en: 'Core problem was the STT format constraint — the external Korean STT only accepts a specific PCM format, so sending MediaRecorder webm/opus through it would force a server-side ffmpeg step (latency, transcoding loss, iOS Safari issues). On top of that — a reliable exam flow (pronunciation and speaking stages split), 4-tier RBAC, and school-level multitenant isolation all had to land in one design.',
      ja: '中核はSTTフォーマット制約 — 外部韓国語型STTが特定のPCMフォーマットのみ受領するため、MediaRecorder webm/opusをそのまま送るとサーバーffmpeg変換が必要となり応答遅延・トランスコード損失・iOS Safari問題が累積。同時に受験フロー（発音・スピーキング段階分離）の安定運用、4ロールRBAC、学校別マルチテナント隔離を一つの設計で押さえる必要があった。',
    },
    hypothesis: {
      ko: '클라이언트에서 STT가 받는 정확한 포맷을 직접 만들면 서버 변환을 통째로 제거할 수 있고 트랜스코딩 손실도 없습니다. STT는 결과를 받기까지 시간이 걸리는 작업이라, 단발 요청보다 폴링 패턴이 적합하다고 판단했습니다.',
      en: 'If the client generates exactly the format the STT expects, the entire server-conversion step disappears + zero transcoding loss. STT is long-running, so polling fits better than a single round-trip.',
      ja: 'クライアント側でSTTが受け取る正確なフォーマットを直接生成すれば、サーバー変換段階を丸ごと消去 + トランスコード損失0。STTはlong-running作業のため単発リクエストよりポーリングパターンが適合。',
    },
    alternatives: {
      ko: 'MediaRecorder는 서버 변환 비용을 피할 수 없고, Google/AWS STT는 외국인 한국어 학습자 도메인에 학습 데이터가 약했습니다. 무엇보다 R&D 사양상 한국형 STT가 요구 항목이라 외부 STT는 계약상 후보 자체가 아니었습니다.',
      en: 'MediaRecorder can’t avoid the server-conversion penalty; Google / AWS STT are weak on this domain and the R&D spec mandated a Korean-tuned STT anyway, so non-Korean STTs were off the table by contract.',
      ja: 'MediaRecorderはサーバー変換コストを回避できず、Google/AWS STTはドメイン学習が弱い + R&D仕様で韓国語型STTが要件のため外部STTは契約上不可。',
    },
    decision: {
      ko: '자체 WAV 인코더(STT가 요구하는 sample rate로 클라이언트 캡처 + ScriptProcessor + 표준 WAV 헤더 직접 작성)와 외부 STT 폴링으로 풀스택을 구성했습니다.',
      en: 'Hand-written WAV encoder (client capture at the STT-required sample rate + ScriptProcessor + standard WAV header written by hand) + external-STT polling as the full-stack composition.',
      ja: '自作WAVエンコーダ（STTが要求するsample rateでクライアントキャプチャ + ScriptProcessor + 標準WAVヘッダ直接記述）+ 外部STTポーリングでフルスタック構成。',
    },
    execution: {
      ko: '처음에는 녹음 데이터를 `useState`로 관리했는데 단계 전환 사이에 일어나는 리렌더가 음성 일부를 날리는 케이스가 보였습니다. 원인은 React 상태 업데이트의 비동기 특성이라 `useRef`로 옮겨 음성 누적을 리렌더 사이클 밖으로 빼냈고, 동시에 발음과 말하기는 흐름이 달라 한 state machine으로 묶으면 분기 조건이 복잡해져 따로 잘랐습니다. 학교별 격리는 쿼리 한 곳만 빠뜨려도 다른 학교 데이터가 새는 위험이 있어, 모든 응시·채점 쿼리에 학교 식별자 필터 강제 + 미들웨어가 토큰 소속 학교와 요청 경로 학교 식별자 일치를 검증하는 이중 계층으로 묶었습니다. 녹음 음성은 오브젝트 스토리지에 적재해 채점·재청취 경로를 유지합니다.',
      en: 'First pass kept recorded blobs in `useState`, but stage transitions caused re-renders that dropped chunks of audio (React state updates are async, so the latest blob array could overwrite an in-flight append). Moved the accumulator into `useRef` to pull it outside the render cycle. Pronunciation and speaking flows diverged enough that one combined state machine bloated the branching, so I split them. School isolation is two-layered because a single missed query filter would leak across tenants: every exam and grading query carries a school-id filter, and middleware verifies the token’s school matches the route’s school id. Recorded audio is persisted to object storage to keep the grading and replay paths intact.',
      ja: '最初は録音Blobを`useState`で管理しましたが、段階遷移ごとの再レンダ中に音声の一部が消えるケースが出ました（Reactの状態更新は非同期で、最新の配列が進行中のappendを上書きしてしまう）。蓄積を`useRef`に移して描画サイクルの外に出しました。発音とスピーキングはフローが異なり一つのstate machineにまとめると分岐が膨れるため分離。学校別隔離はクエリ1箇所のフィルタ漏れで他校データが漏れる危険があるため、全受験・採点クエリに学校識別子フィルタを強制 + ミドルウェアがトークン所属校とルートの学校識別子一致を検証する2層構造で固めました。録音音声はオブジェクトストレージに保存して採点・再聴経路を維持します。',
    },
    result: {
      ko: '정부 R&D 산출물 납품을 완료했습니다. 자체 WAV 인코더와 STT 폴링이 안정 동작하면서 외부 STT 호환과 음성 정확도를 동시에 확보했고, 학교별 멀티테넌트로 한 DB에서 다수 학교가 동시에 응시·채점 회차를 운영할 수 있게 됐습니다. 컨테이너 보안 강화로 외부에 노출되는 runner 이미지의 공격 표면이 줄어든 상태로 배포됐습니다.',
      en: 'Shipped as the R&D deliverable. The hand-written WAV encoder and STT polling held up in production, securing both external STT compatibility and recording fidelity; school-level multitenancy let many schools run exam / grading cycles concurrently against a single DB, and the hardened container image shipped with a reduced runner attack surface.',
      ja: '政府R&D成果物の納品を完了しました。自作WAVエンコーダとSTTポーリングが安定動作することで外部STT互換と音声精度を同時に確保し、学校別マルチテナントで一つのDB上で複数校が同時に受験・採点回次を運用できるようになりました。コンテナセキュリティ強化により外部に公開されるrunnerイメージの攻撃面を縮小した状態でデプロイされました。',
    },
    improvements: {
      ko: '두 가지를 다시 한다면 다르게 잡았을 것입니다. 첫째, 자체 WAV 인코더에 사용한 ScriptProcessor는 W3C에서 더 이상 권장하지 않는 API로, 권장은 AudioWorklet입니다. 현재는 정상 동작하지만 브라우저가 ScriptProcessor 지원을 빼는 시점이 오면 마이그레이션이 필요하므로, 같은 길을 다시 간다면 AudioWorklet 기반으로 시작했을 것입니다. 둘째, 외부 STT 단일 벤더에 의존하는 구조라 서비스가 다운되면 응시 자체가 멈춥니다. R&D 사양상 해당 STT 사용이 요구사항이었더라도, 응답을 받지 못한 응시 데이터를 큐에 적재해 STT 복구 후 재처리하는 복구 경로는 만들어 두었어야 한다고 생각합니다.',
      en: 'Two things I would do differently. First, the hand-written WAV encoder relies on ScriptProcessor, which W3C now marks as discouraged — the recommended modern equivalent is AudioWorklet. It works today, but the day a browser drops ScriptProcessor support this code needs a migration; if I started over, it would be AudioWorklet from day one. Second, the single-vendor STT dependency means the exam itself stops when that STT goes down. Even though the R&D specification required that STT, I should have built a recovery path that queues unanswered submissions and replays them once the service recovers.',
      ja: 'やり直すなら2点は別の進め方をします。第一に、自作WAVエンコーダで使用したScriptProcessorはW3Cが現在は推奨しないAPIで、推奨はAudioWorkletです。現在は正常動作しますがブラウザがScriptProcessorサポートを切るタイミングが来れば移行が必要なので、やり直すならAudioWorkletベースで始めていたと思います。第二に、外部STT単一ベンダ依存のためサービスダウン時に受験自体が止まります。R&D仕様上当該STT使用が要件であったとしても、応答を受けられなかった受験データをキューに積みSTT復旧後に再処理する復旧経路は作っておくべきだったと考えます。',
    },
    reflection: {
      ko: '자체 WAV 인코더의 ScriptProcessor는 W3C에서 deprecated 상태이고 권장은 AudioWorklet입니다. 현재 동작하지만 브라우저가 ScriptProcessor 지원을 빼는 시점이 오면 마이그레이션이 필요하므로 다시 한다면 AudioWorklet 기반으로 시작했을 것입니다. 또 외부 STT 단일 벤더에 의존하는 구조라 서비스 다운 시 응시 자체가 멈춥니다. R&D 사양상 해당 STT 사용이 요구사항이었더라도, 응답을 받지 못한 응시 데이터를 큐에 적재해 STT 복구 후 재처리하는 대체 경로는 만들어 두었어야 한다고 생각합니다.',
      en: 'The WAV encoder uses `ScriptProcessor`, which W3C now marks as deprecated; AudioWorklet is the recommended modern equivalent. It works today, but the day a browser removes `ScriptProcessor` support, this code needs migration. If I started over, it would be AudioWorklet from the start. The other regret is the single-vendor STT dependency: when that STT goes down, the exam itself stops. Even though the R&D specification required that STT specifically, I should have built a fallback path that queues the submissions it did not answer and replays them once the service recovers.',
      ja: '自作WAVエンコーダのScriptProcessorはW3Cでdeprecated状態であり、推奨はAudioWorkletです。現在動作しますがブラウザがScriptProcessorサポートを切るタイミングが来れば移行が必要なので、やり直すならAudioWorkletベースで始めていたと思います。また外部STT単一ベンダーに依存する構造なのでサービスダウン時に受験そのものが止まります。R&D仕様上当該STT使用が要件であったとしても、応答を受け取れなかった受験データをキューに積みSTT復旧後に再処理する代替経路は作っておくべきだったと考えます。',
    },
    visuals: {
      problem: {
        bullets: {
          ko: [
            'STT 포맷 제약 — 외부 한국형 STT는 특정 PCM 포맷만 수용 (MediaRecorder webm/opus 그대로 보내면 서버 ffmpeg 변환 + 트랜스코딩 손실 + iOS Safari 호환성 문제)',
            '응시 흐름 — 발음·말하기 state machine을 단계별 beep·녹음·자동 전환까지 운영',
            '4역할 RBAC — 학생·교사·교사보조·관리자를 인증·인가 흐름에 자연스럽게 녹임',
            '학교별 멀티테넌트 — 한 학교 사고가 다른 학교로 번지지 않도록 격리 + 컨테이너 공격 표면 축소',
          ],
          en: [
            'STT format constraint — the external Korean STT only accepts a specific PCM format (sending MediaRecorder webm/opus would mean server ffmpeg + transcoding loss + iOS Safari compatibility issues)',
            'Exam flows — pronunciation + speaking state machines with stage-by-stage beep / recording / auto-transition',
            '4-role RBAC — student / teacher / sub-teacher / admin dropped cleanly into the auth flow',
            'School-level multitenancy — one school’s incident must not propagate to others + container attack surface reduced',
          ],
          ja: [
            'STTフォーマット制約 — 外部韓国語型STTは特定のPCMフォーマットのみ受領（MediaRecorder webm/opusをそのまま送ると サーバーffmpeg変換 + トランスコード損失 + iOS Safari互換性問題が累積）',
            '受験フロー — 発音・スピーキングのstate machineを段階ごとのbeep・録音・自動遷移まで運用',
            '4ロールRBAC — 学生・教師・教師補助・管理者を認証・認可フローに自然に組み込む',
            '学校別マルチテナント — 一校の事故が他校に波及しない隔離 + コンテナ攻撃面の縮小',
          ],
        },
      },
      alternatives: {
        table: {
          columns: [
            { ko: '후보', en: 'Option', ja: '候補' },
            { ko: '장점', en: 'Upside', ja: '利点' },
            { ko: '단점', en: 'Downside', ja: '欠点' },
          ],
          rows: [
            [
              { ko: 'MediaRecorder API (webm/opus)', en: 'MediaRecorder API (webm/opus)', ja: 'MediaRecorder API (webm/opus)' },
              { ko: '브라우저 기본 — 구현 비용 0', en: 'Browser default — zero implementation cost', ja: 'ブラウザ既定 — 実装コスト0' },
              { ko: '서버 ffmpeg 변환 필수 — 응답 지연·트랜스코딩 손실·iOS Safari 호환성 문제', en: 'Server ffmpeg conversion required — latency, transcoding loss, iOS Safari issues', ja: 'サーバーffmpeg変換必須 — 遅延・損失・iOS Safari問題' },
            ],
            [
              { ko: 'Google Cloud STT / AWS Transcribe', en: 'Google Cloud STT / AWS Transcribe', ja: 'Google Cloud STT / AWS Transcribe' },
              { ko: '관리형 — 인프라 부담 0', en: 'Managed — zero infra burden', ja: 'マネージド — インフラ負担0' },
              { ko: '외국인 한국어 학습자 도메인 학습 데이터 약함 + R&D 사양상 한국형 STT 요구 (계약상 불가)', en: 'Weak on foreign-Korean-learner domain + the R&D spec mandated a Korean-tuned STT (off the table by contract)', ja: '外国人韓国語学習者ドメインの学習データが弱い + R&D仕様で韓国語型STTが要件（契約上不可）' },
            ],
            [
              { ko: '자체 WAV 인코더 + 외부 STT 폴링', en: 'Hand-written WAV encoder + external STT polling', ja: '自作WAVエンコーダ + 外部STTポーリング' },
              { ko: '서버 변환 단계 제거 + STT 포맷 정확히 일치', en: 'Eliminates server-side conversion + exact STT format match', ja: 'サーバー変換段階を消去 + STT形式に正確一致' },
              { ko: 'ScriptProcessor는 W3C deprecated — 장기적으로 AudioWorklet 마이그레이션 필요', en: 'ScriptProcessor is W3C-deprecated — long-term AudioWorklet migration needed', ja: 'ScriptProcessorはW3C deprecated — 長期的にAudioWorklet移行が必要' },
            ],
          ],
          selectedRow: 2,
        },
      },
      decision: {
        diagramKey: 'kocca',
      },
      execution: {
        bullets: {
          ko: [
            '① STT가 요구하는 sample rate로 클라이언트 직접 캡처 — 서버 리샘플링 + 트래픽 폭증 동시 회피',
            '② ScriptProcessor 기반 처리 — AudioWorklet 호환이 부족했던 시기의 지연·CPU 부하 균형점 + 모노 1채널로 STT 입력 사양 정확 일치 + 트래픽/메모리 절반',
            '③ 표준 WAV 헤더 직접 작성 — STT가 받는 정확한 포맷을 클라이언트에서 생성',
            '★ 응시 흐름 안정성 — 발음·말하기 state machine 분리, 녹음 데이터는 `useState`가 아닌 `useRef`로 누적해 리렌더 사이 음성 유실 방지',
            '★ Server Action(인증, 부수효과) vs Route Handler(데이터, 단순 조회) 의도적 분리 — 클라이언트 번들 가벼움',
            '★ 학교별 격리 — 모든 응시·채점 쿼리에 학교 식별자 필터 강제 + 미들웨어가 토큰 소속 학교와 요청 경로 학교 식별자 일치 검증',
          ],
          en: [
            '① Client captures at the STT-required sample rate — avoids both server resampling and bandwidth bloat',
            '② ScriptProcessor-based processing — the latency/CPU balance point when AudioWorklet support was thin + mono 1-channel matches the STT input spec exactly + halves bandwidth and memory',
            '③ Standard WAV header written by hand — produces the exact format the STT expects on the client',
            '★ Exam-flow stability — pronunciation + speaking split into state machines, recordings accumulated in `useRef` (not `useState`) so re-renders never drop audio',
            '★ Server Action (auth, side-effect) vs Route Handler (data, simple fetch) split keeps the client bundle lean by design',
            '★ School-level isolation — every exam/grading query carries a school-id filter and middleware verifies the token’s school matches the route’s school id',
          ],
          ja: [
            '① STTが要求するsample rateでクライアント直接キャプチャ — サーバーリサンプリングとトラフィック膨張を同時回避',
            '② ScriptProcessorベース処理 — AudioWorklet互換が薄かった時期の遅延・CPU負荷の均衡点 + モノ1チャネルでSTT入力仕様に正確一致 + トラフィック/メモリ半減',
            '③ 標準WAVヘッダを直接記述 — STTが受け取る正確な形式をクライアントで生成',
            '★ 受験フロー安定性 — 発音・スピーキングのstate machineに分離、録音Blobは`useState`ではなく`useRef`で累積し再レンダ中の音声消失を防止',
            '★ Server Action（認証、副作用）vs Route Handler（データ、単純fetch）の意図的分離でクライアントバンドルを軽く',
            '★ 学校別隔離 — すべての受験・採点クエリに学校識別子フィルタを強制 + ミドルウェアがトークンの所属校とルートの学校識別子一致を検証',
          ],
        },
      },
      result: {
        metrics: [
          { value: '폴링 주기 최적화', label: { ko: 'STT 서버 호출 감소 — 폴링 주기를 늘려 호출 수를 절반 수준으로. 사용자 인지 지연 약간은 음성 채점 UX에서 감수할 만한 절충', en: 'STT server calls cut — relaxed polling roughly halves the request count. Small perceived-delay increase is negligible in scoring UX', ja: 'STTサーバー呼び出し削減 — ポーリング周期を延ばし呼び出し数を約半減。体感遅延の微増は採点UXで許容可能なtrade-off' } },
          { value: '4역할', label: { ko: 'RBAC (학생 / 교사·교사보조 / 관리자) — 미들웨어 + API 라우트 이중 검증', en: 'RBAC (student / teacher + sub-teacher / admin) — middleware + API-route double verification', ja: 'RBAC（学生 / 教師・教師補助 / 管理者）— ミドルウェア + APIルートの2層検証' } },
        ],
      },
    },
  },

  'purple-english': {
    oneLiner: {
      ko: '교육 회사의 R&D 신사업을 모바일 앱 채널로 확장하는 의사결정을 1년차 사원이 주도했습니다. 웹에서 풀 수 없던 음성 콘텐츠 보안과 모바일 브라우저 호환성 한계를 React Native 마이그레이션으로 우회했고, RN 경험이 없었음에도 기존 React 코드의 모듈화·컴포넌트화를 먼저 정비해 학습 곡선을 낮춘 뒤 마이그레이션을 완수했습니다. App Store와 Play Store에 출시하면서 앱 채널 신사업의 길이 열렸습니다.',
      en: 'As a junior engineer with one year of experience I led the call to push our education-platform R&D into a mobile app channel — the web couldn’t solve the audio-content security and per-browser compatibility problems we kept hitting. I had no React Native experience yet, so I first modularised and componentised the existing React code to flatten the RN learning curve, then completed the migration and shipped to both the App Store and Play Store — opening the app-channel revenue line.',
      ja: '教育会社のR&D新事業をモバイルアプリチャネルに拡張する意思決定を1年目社員が主導 — Webで解けなかった音声コンテンツのセキュリティ・モバイルブラウザ互換性の限界をReact Native移行で迂回し、RN経験がない状態でも既存のReactコードをモジュール化・コンポーネント化することで学習曲線を下げてから移行を完了、App Store / Play Storeリリースでアプリチャネル新事業の道を開きました。',
    },
    context: {
      ko: 'Purple Academy(교육 회사)에서 프론트엔드 1년 재직, 2명 팀에서 1년차 사원이지만 프로젝트 리딩 위치로 결정권 보유. 기존 제품은 React 기반 웹 서비스로 어린이·청소년 대상 영어 교육 콘텐츠(알파벳 트레이싱·인터랙티브 학습 활동 등)를 다수 운영 중인 환경.',
      en: 'One year as a frontend engineer at Purple Academy (an education company), two-person team — formally junior but in a lead position with decision rights. The existing product was a React web service delivering a wide range of interactive English-learning activities for children and teens.',
      ja: 'Purple Academy（教育会社）でフロントエンドとして1年在籍、2名チームで1年目社員ながらプロジェクトリーディング位置で決定権を保有。既存プロダクトはReactベースのWebサービスで、子供・青少年向け英語教育コンテンツ（アルファベットトレース・インタラクティブ学習アクティビティなど）を多数運用中の環境。',
    },
    problem: {
      ko: '두 갈래의 압박이 동시에 들어왔습니다. 첫째는 웹 환경에서의 음성 재생 보안이었습니다. 학습 콘텐츠인 음성 자산이 노출되면 사업 가치가 무너지는데, 브라우저에서 이를 견고하게 막을 방법이 없었습니다. 둘째는 모바일 브라우저 호환성이었습니다. 사용자 핸드폰마다 브라우저 종류와 버전이 달라 대응 매트릭스가 폭증했고, 일부 환경에서는 정상 동작 자체가 불가능했습니다. 결론은 명확했습니다. 앱 출시 없이는 사업이 진전될 수 없었습니다.',
      en: 'Two parallel pressures. (1) Audio-content security on the web — the audio assets *are* the product, and once they leak the business value collapses, but the browser gives you almost nothing to defend that surface. (2) Mobile browser compatibility — the per-browser, per-version matrix on user devices kept growing, and some configurations were outright broken. The conclusion was unambiguous: without a native app, this business could not move forward.',
      ja: '2方向同時の圧力。① Web環境での音声再生セキュリティ — 学習コンテンツである音声資産が漏洩すれば事業価値が崩れるが、ブラウザで堅牢に防ぐ方法がない。② モバイルブラウザ互換性 — ユーザーのスマホごとにブラウザ種別・バージョンが異なり対応マトリックスが膨張、一部環境では正常動作自体が不可能。結論は明確 — アプリリリースなしには事業が前進できない。',
    },
    hypothesis: {
      ko: '가설은 단순했습니다. "React Native 경험은 없지만, 기존 React 코드를 컴포넌트·모듈 단위로 강하게 분리해두면 RN으로 옮기는 학습 곡선은 낮을 것이다." 마이그레이션 자체보다 직전의 준비 작업(코드베이스 정리)이 성공의 관건이라고 판단했습니다.',
      en: 'Simple hypothesis: "I haven’t shipped React Native yet, but if I get the existing React codebase into properly modular components first, the migration learning curve drops sharply." The success lever wasn’t the migration itself — it was the preparation step right before it.',
      ja: '仮説は単純 — 「React Native経験はないが、既存のReactコードをコンポーネント・モジュール単位で強く分離しておけばRN移行の学習曲線は低い」。移行そのものより、その直前の準備作業（コードベース整理）が成功の鍵だと見た。',
    },
    alternatives: {
      ko: '정직하게 말하면 Flutter, Capacitor, PWA, 모바일 웹 강화 같은 다른 옵션을 명시적으로 비교하지 않았습니다. 기존 React 자산을 가장 직접적으로 재사용할 수 있는 RN이 자명한 선택이었고, 1년차 사원에 2명 팀의 자원 한계에서 비교 검토 비용 자체가 부담이었습니다. 이 부분은 회고 영역으로 남깁니다.',
      en: 'Honestly — I did not explicitly evaluate Flutter / Capacitor / PWA / mobile-web hardening. RN was the most direct reuse path for our existing React assets and felt self-evident; given the resourcing (one junior, two-person team) the cost of running a real comparison itself felt prohibitive. Acknowledged as a reflection-area gap.',
      ja: '正直に言えばFlutter・Capacitor・PWA・モバイルWeb強化のような他の選択肢を明示的に比較しなかった。既存のReact資産を最も直接的に再利用できるRNが自明な選択肢と見ており、1年目社員 + 2名チームのリソース制約下では比較検討コスト自体が負担。この点は振り返り領域。',
    },
    decision: {
      ko: '본인이 결정했습니다. 1년차 사원이지만 프로젝트 리딩 위치였기에 결정권을 가졌고, 결정 근거는 세 가지였습니다. 첫째 음성 보안(웹에서 풀기 어려운 문제), 둘째 브라우저 대응 비용(모바일 브라우저 매트릭스의 한계), 셋째 학습 곡선(모듈화 선행으로 낮출 수 있다는 사전 평가)입니다. 실행 전제는 마이그레이션 직전에 React 코드베이스의 모듈화·컴포넌트화를 충분히 정비하는 것이었습니다.',
      en: 'I made the call. Junior on paper but lead in practice, decision resting on three reasons — (1) audio-content security is unsolvable on the web, (2) the mobile-browser matrix had become too expensive, (3) the RN learning curve could be flattened by preparing the React codebase first. Execution pre-condition was non-negotiable: invest enough in modularising and componentising the React codebase before starting the migration itself.',
      ja: '本人が決定。1年目社員ですがプロジェクトリーディング位置で決定権を持ち、根拠は3つ — ① 音声セキュリティ（Webで解きにくい問題）② ブラウザ対応コスト（モバイルブラウザマトリックスの限界）③ 学習曲線（モジュール化先行で下げられるという事前評価）。実行前提は移行直前にReactコードベースのモジュール化・コンポーネント化を十分整備すること。',
    },
    execution: {
      ko: '먼저 기존 React 코드의 모듈화·컴포넌트화에 시간을 들였습니다. UI/로직 분리, Custom Hook으로 비즈니스 로직 추출, 의존성 정리를 거친 뒤 RN으로 점진 마이그레이션을 진행했습니다. RN 자체는 처음 다루는 환경이라 학습하면서 옮기는 흐름이었지만, 사전에 정비된 코드 구조 덕에 컴포넌트 단위로 작업이 명확하게 끊겼습니다. 최종적으로 양 스토어(App Store, Google Play) 출시까지 도달했습니다.',
      en: 'Preparation phase — separated UI from logic, lifted business logic into custom hooks, tidied dependencies inside the React codebase. Then the RN migration started, progressively, component by component. RN was new to me, so I was learning as I ported, but the prior cleanup meant each unit of migration had a clean boundary. Ended with shipping to both App Store and Google Play.',
      ja: '準備段階 — UI/ロジック分離、Custom Hookによるビジネスロジック抽出、依存性整理。その後RNへの段階的移行を進めた。RN自体は初めて扱う環境だったので学習しながら移行する流れだったが、事前に整備したコード構造のおかげでコンポーネント単位の作業が明確に切り分けられた。最終的に両ストア（App Store・Google Play）リリースまで到達。',
    },
    result: {
      ko: 'App Store와 Google Play 양 스토어 출시에 도달했고, 그 결과로 앱 버전 기반의 신사업이 가능해졌습니다. 모바일 채널 자체가 닫혀 있던 상태에서 진행 가능한 상태로 바뀌었다는 점이 이 프로젝트의 핵심 임팩트입니다.',
      en: 'Shipped to both the App Store and Google Play, opening an app-channel business line for the company. The point of impact is that the mobile channel had been effectively closed before, and was open after.',
      ja: 'App Store / Google Play両ストアへのリリースに到達し、その結果としてアプリ版を基盤とする新事業が可能になりました。モバイルチャネル自体が閉じていた状態から進行可能な状態に変わった点が本プロジェクトの核心インパクトです。',
    },
    improvements: {
      ko: '두 가지를 다시 한다면 다르게 잡았을 것입니다. 첫째, React Native 외 옵션(Capacitor, Flutter, PWA)을 명시적으로 비교하지 않았습니다. 당시에는 React 자산 재사용이라는 단일 기준으로 자명한 선택이었지만, 시니어 관점에서 보면 결정 자체를 검증하는 절차가 빠진 셈입니다. 같은 선택을 다시 내려도 비교 표 한 장이라도 만들어 결정 근거를 남기는 쪽이 더 견고했을 것입니다. 둘째, 모듈화·컴포넌트화 정비를 사전에 진행한 것은 옳은 판단이었지만 마이그레이션 중에도 일부 영역은 결국 RN 전용으로 분기되었기 때문에, 어디까지가 공유 가능하고 어디부터는 분기인지를 더 일찍 결정 매트릭스로 정리했어야 했다고 봅니다.',
      en: 'Two things I would do differently. First, I did not formally compare React Native against Flutter, Capacitor, or PWA. At the time, "reuse our React assets directly" felt self-evident, but stepping back as a senior would, the missing step was the verification of the decision itself — even a one-page comparison would have made the choice more defensible. Second, prepping the codebase with modularisation and componentisation before the migration was the right call, but some areas still diverged into RN-only branches mid-flight; I should have written down a sharper decision matrix earlier on where the shared code ends and where the platform-specific code begins.',
      ja: 'やり直すなら2点は別の進め方をします。第一に、React Native以外の選択肢（Flutter・Capacitor・PWA）を明示的に比較しませんでした。当時はReact資産再利用という単一基準で自明な選択でしたが、シニア視点で見ると決定そのものを検証する手順が抜けていました。同じ選択を再び下すとしても、比較表1枚でも残しておく方がより堅固でした。第二に、モジュール化・コンポーネント化を事前に進めたのは正しい判断でしたが、移行中も一部領域はRN専用に分岐したため、共有可能な範囲と分岐すべき範囲をもっと早く決定マトリックスとして整理しておくべきだったと考えます。',
    },
    reflection: {
      ko: '가장 정직한 회고는 RN 외 다른 옵션(Flutter·Capacitor·PWA)을 명시적으로 비교하지 않았다는 점입니다. 그 시점에는 React 자산 재사용이라는 단일 기준으로 자명한 선택이었지만, 시니어 관점에서 보면 결정 자체를 검증하는 절차가 빠진 셈입니다. 또 모듈화·컴포넌트화 정비를 사전에 진행한 것은 옳은 판단이었지만, 마이그레이션 중에도 일부 영역은 RN 전용으로 결국 분기되었기 때문에, 어디까지가 공유 가능하고 어디부터는 분기였는지를 더 일찍 결정 매트릭스로 정리했어야 했다고 봅니다.',
      en: 'The honest reflection is that I did not formally compare React Native against Flutter, Capacitor, or PWA. At the time, "reuse our React assets directly" felt like a self-evident criterion, but stepping back as a senior would, the missing step is the verification of the decision itself — even one explicit comparison would have made the choice stronger. The other reflection is on the cleanup work: prepping the codebase before the migration was the right call, but some areas still diverged into RN-only branches mid-flight, and I should have written down a sharper decision matrix earlier — where the shared code ends and where the platform-specific code begins.',
      ja: '最も正直な振り返りは、RN以外の選択肢（Flutter・Capacitor・PWA）を明示的に比較しなかった点です。当時はReact資産再利用という単一基準で自明な選択でしたが、シニア視点で見ると決定そのものを検証するステップが抜けていました。またモジュール化・コンポーネント化を事前に進めたのは正しい判断でしたが、移行中も一部領域はRN専用に分岐したという点で、共有可能な範囲と分岐すべき範囲をもっと早く決定マトリックスとして整理すべきだったと考えます。',
    },
    visuals: {
      decision: { diagramKey: 'purple' },
    },
  },

  aigoseo: {
    oneLiner: {
      ko: 'IEZLAB(SI 회사) 시기, 한자 고문헌 디지털화 정부 R&D 과제에서 발주처가 사진과 한자 영역 좌표값을 제공하면 Canvas API로 좌표에 맞춰 이미지를 한 글자씩 자르는 시스템을 구현하고 Spring Boot + JPA 백엔드 API까지 풀스택으로 책임져 정부 R&D 산출물로 납품했습니다.',
      en: 'During my time at IEZLAB (a system-integration company), I worked on a government-funded R&D project to digitise classical Korean Hanja manuscripts. The client supplied scans and per-character coordinates; I built the Canvas-API system that sliced the images into single Hanja characters according to those coordinates, plus the Spring Boot + JPA backend API around it — delivered end-to-end as a national R&D output.',
      ja: 'IEZLAB（SI会社）在籍中、漢字古文献デジタル化政府R&D課題で、発注元が画像と漢字領域の座標値を提供すると、その座標に合わせてCanvas APIで画像を1文字ずつ切り出すシステムを実装し、Spring Boot + JPAバックエンドAPIまでフルスタック責任で政府R&D成果物として納品しました。',
    },
    context: {
      ko: 'IEZLAB(SI 회사)에서 한자 고문헌 디지털화 정부 R&D 과제에 참여. GPT 같은 LLM이 없던 시절이라 Vision API · SAM · LLM 기반 OCR 같은 현대 도구가 부재해, 사진을 한 글자씩 정확히 자르는 작업을 손으로 구현해야 했습니다.',
      en: 'At IEZLAB (a system-integration shop) I worked on a government R&D project to digitise classical Hanja manuscripts. This was pre-LLM era — no Vision APIs, no SAM, no LLM-driven OCR — so cutting an image into individual Hanja characters had to be built by hand rather than orchestrated from off-the-shelf models.',
      ja: 'IEZLAB（SI会社）で漢字古文献デジタル化政府R&D課題に参加。GPTのようなLLMが無かった時代でVision API・SAM・LLMベースOCRなどの現代的ツールが不在のため、写真を1文字ずつ正確に切り出す作業を手で実装する必要があった。',
    },
    problem: {
      ko: '책임 범위를 정확히 분리하면, 한자별 영역 좌표 자체는 발주처가 산출해 제공했고, 본인은 그 좌표에 맞춰 사진을 한 글자씩 정확히 자르는 시스템과 후속 OCR·번역 파이프라인으로 연결되는 백엔드 API 구현을 담당했습니다. 알고리즘 결정자가 아니라 발주처 사양을 시스템으로 통합하는 구현 책임이었습니다.',
      en: 'Precise scope — the client produced the per-character coordinates themselves. My job was the system that consumed those coordinates and sliced the image into individual characters precisely, plus the backend API that fed the downstream OCR / translation pipeline. Integration owner, not algorithm designer.',
      ja: '責任範囲を正確に — 漢字ごとの領域座標自体は発注元が算出して提供し、本人はその座標に合わせて写真を1文字ずつ正確に切り出すシステム + 後続のOCR・翻訳パイプラインに繋がるバックエンドAPI実装が担当。アルゴリズム決定者ではなく、発注元仕様をシステムとして統合する実装責任。',
    },
    hypothesis: {
      ko: 'Canvas API의 `getImageData` / `putImageData`로 픽셀 좌표 기반 이미지 분할을 직접 다루면, 발주처 좌표 사양을 그대로 받아 시각화·분할이 가능합니다. 발주처가 좌표를 확인·수정하며 즉시 분할 결과를 검수해야 하는 워크플로우였기 때문에, 클라이언트 측 즉시 렌더링이 핵심이라고 판단했습니다.',
      en: 'Hypothesis: Canvas’s `getImageData` / `putImageData` would let me do pixel-coordinate-based slicing directly, consuming the client’s coordinate spec as-is. The workflow needed the client to inspect and tweak coordinates with the slicing result rendering immediately — client-side rendering was the load-bearing requirement.',
      ja: '仮説 — Canvas APIの`getImageData` / `putImageData`でピクセル座標ベースの画像分割を直接扱えば、発注元の座標仕様をそのまま受け取って可視化・分割が可能。発注元が座標を確認・修正しながら分割結果を即座に検収するワークフローのため、クライアント側の即時レンダリングが鍵。',
    },
    alternatives: {
      ko: 'OpenCV.js는 비전 라이브러리지만 본인 책임이 알고리즘이 아니라 좌표 기반 분할이라 과한 도구였습니다. 서버사이드 이미지 처리(Sharp / ImageMagick)는 발주처 검수 루프에서 서버 왕복 부담이 컸고, 백엔드는 SI 회사 표준 스택을 따라 Spring Boot + JPA로 갔습니다.',
      en: 'OpenCV.js — a vision library, but my responsibility was coordinate-driven slicing not algorithm design, so OpenCV would have been overkill. Server-side image processing (Sharp / ImageMagick) would have added a network round-trip into the client’s review loop every time they tweaked a coordinate. Backend followed the SI shop’s house stack — Spring Boot + JPA.',
      ja: 'OpenCV.jsはビジョンライブラリだが、本人の責任がアルゴリズムではなく座標ベース分割のためoverkill。サーバーサイド画像処理（Sharp / ImageMagick）は発注元の検収ループにround-trip負担が大きい。バックエンドはSI会社標準スタックに沿ってSpring Boot + JPA。',
    },
    decision: {
      ko: '클라이언트는 Canvas API, 백엔드는 Spring Boot + JPA. 좌표 기반 분할 결과를 발주처가 즉시 확인할 수 있도록 클라이언트 측 즉시 렌더링을 우선하고, 후속 OCR·번역 단계로 결과를 전달하는 통합 API를 백엔드에서 제공하는 구조.',
      en: 'Client-side Canvas API for slicing, Spring Boot + JPA for the backend. Prioritise client-side rendering so the operator can inspect slice results instantly, and expose a clean backend API that forwards the result into the downstream OCR / translation stages.',
      ja: 'クライアントはCanvas API、バックエンドはSpring Boot + JPA。座標ベース分割結果を発注元が即座に確認できるようクライアント側の即時レンダリングを優先し、後続のOCR・翻訳段階へ結果を渡す統合APIをバックエンド側で提供する構造。',
    },
    execution: {
      ko: '시간이 꽤 지난 프로젝트라 세부 구현(좌표 경계 픽셀 처리, 발주처 좌표계와 화면 좌표 정합 등)을 자세히 회고하기는 어려움. 다만 LLM이 없던 시기에 Canvas API의 픽셀 단위 처리와 발주처 결과 round-trip 검수 워크플로우를 직접 체득한 것이 이후 모든 프로젝트의 기반이 됐다고 생각합니다.',
      en: 'Enough time has passed that I can’t honestly recall the fine-grained details (pixel edge handling at coordinate boundaries, coordinate-system alignment with the client). What I can say is that the pre-LLM environment forced me to learn Canvas pixel-level work and to run a tight inspection round-trip with the client, and that carried forward into every project since.',
      ja: '時間がかなり経過したプロジェクトのため、細かい実装事項（座標境界のピクセル処理・発注元との座標系整合性など）を詳細に振り返るのは難しい。ただLLMが無かった時代にCanvas APIのピクセル単位処理・発注元結果のround-trip検収ワークフローを直接体得したことは、以降の全プロジェクトの基盤になったと考える。',
    },
    result: {
      ko: '정부 R&D 과제 산출물 납품을 완료했습니다. 후속 OCR·번역 단계와의 통합이 의도대로 연결되어 한자 고문헌 디지털화 자동화 파이프라인의 일부가 됐습니다.',
      en: 'The deliverable was accepted as a national R&D output. The slicing system fed into the downstream OCR / translation stages as intended, becoming part of the automated Hanja-manuscript digitisation pipeline.',
      ja: '政府R&D課題の成果物納品を完了しました。後続のOCR・翻訳段階との統合が意図通り接続され、漢字古文献デジタル化自動化パイプラインの一部となりました。',
    },
    improvements: {
      ko: '같은 과제를 지금 다시 한다면 SAM, YOLO, LLM 기반 OCR로 좌표 추출과 이미지 분할이 상당 부분 자동화 가능합니다. 발주처가 제공하는 좌표에만 의존하지 않고 자체 분할 모델을 함께 두는 방향이 자연스럽고, 발주처 좌표는 검증·보정 신호로 활용해 양쪽 결과가 어긋날 때만 사람이 개입하는 파이프라인이 다음 단계입니다.',
      en: 'If I picked this up today, SAM, YOLO, or LLM-backed OCR would automate much of the coordinate extraction and slicing. The natural next step would be to add a self-contained segmentation model alongside the client-supplied coordinates, using the client coordinates as a verification / correction signal — humans only step in when the two pipelines disagree.',
      ja: '同じ課題を今やり直すならSAM・YOLO・LLMベースOCRで座標抽出と画像分割が相当部分自動化可能です。発注元が提供する座標だけに依存せず自前のセグメンテーションモデルを併設し、発注元座標は検証・補正シグナルとして活用、両者の結果が食い違ったときだけ人が介入するパイプラインが次のステップです。',
    },
    reflection: {
      ko: '지금 시점에서 같은 과제를 다시 한다면 SAM·YOLO·LLM 기반 OCR 같은 도구로 좌표 추출·이미지 분할이 상당 부분 자동화 가능합니다. 다만 그 시기에 LLM·AI 보조 도구가 없는 환경에서 Canvas API의 픽셀 단위 처리·좌표 시스템 정합성·발주처 사양과의 round-trip 검수 워크플로우를 체득한 것이, 이후 모든 프로젝트에서 "외부 사양을 시스템으로 통합하는 책임"의 기반이 됐습니다.',
      en: 'If I picked up the same project today, tools like SAM, YOLO, or LLM-backed OCR would automate much of the coordinate extraction and slicing. But living through the pre-LLM version of this work — Canvas pixel-level operations, coordinate-system alignment, the tight inspection loop with the client — became the foundation for "owning the integration of an external specification into a real system" that I have leaned on in every later project.',
      ja: '現在の時点で同じ課題をやり直すなら、SAM・YOLO・LLMベースOCRのようなツールで座標抽出・画像分割が相当部分自動化可能です。ただし当時のLLM・AI補助ツールがない環境でCanvas APIのピクセル単位処理・座標系整合性・発注元仕様とのround-trip検収ワークフローを直接体得したことは、以降の全プロジェクトにおける「外部仕様をシステムとして統合する責任」の基盤になりました。',
    },
    visuals: {
      decision: { diagramKey: 'aigoseo' },
    },
  },

  /* ───────── WIGTN 사이드 프로젝트 ───────── */

  wigent: {
    oneLiner: {
      ko: 'Build with TRAE Seoul(ByteDance) 해커톤 대상 수상작. 여러 AI 에이전트가 토론으로 결론에 도달하고, 그 결과물이 사업 아이디어 보고서와 랜딩 페이지로 바로 나오는 멀티에이전트 토론 플랫폼.',
      en: 'Grand Prize winner at Build with TRAE Seoul (ByteDance). Multiple AI agents debate to a conclusion, and the output drops directly into a business idea report and landing page — a multi-agent debate platform.',
      ja: 'Build with TRAE Seoul（ByteDance）ハッカソン大賞受賞作。複数のAIエージェントが議論で結論に到達し、その成果がビジネスアイデアレポートとランディングページとして即座に出力されるマルチエージェント議論プラットフォーム。',
    },
    context: {
      ko: '당일치기 해커톤 두 번째 출전이었습니다. 첫 해커톤에서 열심히 준비했는데 수상자들은 라이브 데모 없이 촬영된 동영상으로도 수상하는 모습을 봤기에, 이번에는 프로젝트를 완성한 뒤 동영상 촬영으로 출품하겠다는 전략을 세워갔습니다. 그런데 심사기준이 배포된 프로젝트 URL을 제출하고, 사람 심사위원과 AI 심사위원이 직접 테스트하는 방식이었습니다. 전략이 완전히 어긋나서 멘붕 상태로 시간을 허비했고, 3시간 정도 남았을 때 Agent의 본질을 떠올렸습니다. 사람이 Agent를 만드는 이유는 결국 "자동화" 또는 "자율적인 의사결정을 통한 보조"인데, 단순히 답변을 생성하는 AI가 아니라, 서로 다른 관점이 충돌하고 검증되면서 결론이 만들어지는 과정을 보여주고 싶었습니다.',
      en: 'This was my second one-day hackathon. At the first one I had prepared hard but noticed that winners shipped pre-recorded videos without live demos, so I came in with a strategy: finish the project, then record a polished video. Except the judging format was different — submit a deployed URL and let human judges and an AI judge test it live. My entire plan fell apart and I froze, burning time. With about three hours left I stepped back and thought about what an agent actually is. People build agents for "automation" or "autonomous decision-making as an assistant" — I wanted to show not just an AI generating answers, but a process where different perspectives clash and get verified before a conclusion forms.',
      ja: '当日完結型ハッカソンへの2回目の出場でした。1回目で一生懸命準備したのに受賞者はライブデモなしの収録動画で入賞していたので、今回は完成後に動画を撮影して提出する戦略で臨みました。ところが審査基準がデプロイ済みURLを提出し、人間審査員とAI審査員が直接テストする方式でした。戦略が完全に外れてパニック状態で時間を浪費し、残り約3時間でAgentの本質を思い出しました。人がAgentを作る理由は「自動化」か「自律的な意思決定による補助」であり、単に答えを生成するAIではなく、異なる視点が衝突し検証されながら結論が形成される過程を見せたいと思いました。',
    },
    problem: {
      ko: '남은 3시간 안에 배포까지 완료할 수 있는 시스템을 설계해야 했습니다. 시간이 부족했기에 해커톤 주제였던 "에이전트"의 본질에 집중했고, 에이전트 정의에 맞는 시스템을 보여주고 싶었습니다. 평소 에이전트에 대한 철학은 단순한 자동화 파이프라인이 아니라, 사용자의 의도를 분석하고 근거 있는 판단을 내릴 수 있는 시스템이었기에, 사용자의 의도를 다중 각도에서 분석하고 대안을 도출할 수 있는 "에이전트 토론 플랫폼"을 설계하게 됐습니다.',
      en: 'With three hours left, we had to design a system that could be deployed within that window. The tight timeline pushed us to focus on the essence of the hackathon theme: "agents," and we wanted to show a system that truly fits the definition. My view on agents has always been that they are not just automation pipelines but systems that can analyze user intent and make evidence-based decisions. That led to designing an "agent debate platform" capable of dissecting a user\'s intent from multiple angles and deriving alternatives.',
      ja: '残り3時間で、デプロイまで完了できるシステムを設計する必要がありました。時間が限られていたからこそハッカソンのテーマ「エージェント」の本質に集中し、エージェントの定義に合ったシステムを見せたいと考えました。エージェントに対する考えは単なる自動化パイプラインではなく、ユーザーの意図を分析し根拠ある判断を下せるシステムというものだったため、ユーザーの意図を多角的に分析し代替案を導出できる「エージェント討論プラットフォーム」を設計することになりました。',
    },
    hypothesis: {
      ko: '진짜 에이전틱한 시스템이란 뭔가를 생각했을 때, 핵심은 오케스트레이터(진행자)가 사용자의 도메인에 맞는 전문가 에이전트를 동적으로 생성하고, 토론이 깊어지면 새로운 전문가를 소환하고, 더 이상 필요 없는 에이전트는 퇴장시키는 것까지 전부 사용자 개입 없이 자율적으로 돌아가면서 결론에 도달하는 구조라고 봤습니다. 그래서 에이전트들이 채팅 UI 안에서 자유 토론으로 충돌하고 수렴한 결과가 그대로 사업 아이디어 보고서와 랜딩 페이지로 나오는 흐름을 목표로 잡았습니다.',
      en: 'What does a truly "agentic" system look like? I concluded the key is an orchestrator that dynamically spawns domain-matched expert agents, brings in new specialists as the debate deepens, and retires those no longer needed — all autonomously, converging toward a conclusion without user intervention. So the target was a flow where agents debate freely inside a chat UI and the converged output drops straight into a business-idea report and landing page.',
      ja: '本当にエージェンティックなシステムとは何かを考えた時、核心はオーケストレーター（進行役）がユーザーのドメインに合った専門家エージェントを動的に生成し、議論が深まれば新たな専門家を召喚し、不要になったエージェントは退場させる — この全過程がユーザーの介入なく自律的に回りながら結論に到達する構造だと判断しました。そこでエージェントたちがチャットUI内で自由議論により衝突・収束した結果がそのままビジネスアイデアレポートとランディングページとして出力される流れを目標に据えました。',
    },
    alternatives: {
      ko: '단일 챗봇·룰 기반 토론 시뮬레이터·외부 LLM 토론 API도 검토했지만, 모두 발화권 회수와 수렴 강제가 약했습니다. 사용자가 결과를 거절하면 다시 토론이 이어져야 한다는 Human-in-the-Loop 요구까지 합쳐, 직접 오케스트레이터 + 상태 머신을 짜는 쪽이 가장 정확했습니다.',
      en: 'Looked at single chatbots, rule-based debate simulators, and off-the-shelf LLM debate APIs — none of them gave us strong enough convergence control or a clean way to reclaim the floor. Layer in the Human-in-the-Loop requirement (the user can reject and the debate has to continue), and building our own orchestrator + state machine was the most accurate path.',
      ja: '単一チャットボット・ルールベース議論シミュレーター・外部LLM議論APIも検討しましたが、いずれも発話権の回収と収束強制が弱かったです。ユーザーが結果を拒絶すると議論が再開する必要があるというHuman-in-the-Loop要件まで合わせると、オーケストレーター + 状態マシンを自前で組む方が最も精度が高かったです。',
    },
    decision: {
      ko: 'AsyncGenerator 기반 오케스트레이터 + SSE 스트림 + useReducer 상태 머신의 3-layer 분리를 채택했습니다. 오케스트레이터는 30턴 자유 토론을 돌리고, 12·22턴에 비고정 에이전트를 교체해 특정 관점이 토론을 지배하지 않도록 하면서 새로운 시각이 지속적으로 유입되게 만들었습니다. 자유 토론만 계속되면 결론 없이 발산하기 쉬웠기 때문에 25턴 이후에는 강제로 실행 가능한 방향으로 압축되도록 설계했습니다. 토론 결과는 단순 텍스트 요약으로 끝나지 않고, 구조화된 사업 아이디어로 정제된 뒤 9종 디자인 템플릿 중 하나로 실제 랜딩 페이지 형태의 결과물로 즉시 변환됩니다.',
      en: 'Settled on a three-layer split: an AsyncGenerator orchestrator + SSE stream + useReducer state machine on the client. The orchestrator runs a 30-turn free debate and swaps non-fixed agents at turns 12 and 22 so no single perspective dominates while fresh viewpoints keep flowing in. Because unchecked free debate easily diverges without reaching a conclusion, turn 25 onward forces compression toward actionable direction. The debate output does not end as a text summary; it is distilled into a structured business idea and instantly converted into an actual landing page via one of nine design templates.',
      ja: 'AsyncGeneratorベースのオーケストレーター + SSEストリーム + useReducer状態マシンという3層分離を採用しました。オーケストレーターは30ターンの自由議論を回し、12・22ターン目に非固定エージェントを入れ替えて特定の視点が議論を支配しないようにしつつ新たな視角が継続的に流入する形にしました。自由議論だけでは結論なく発散しやすいため、25ターン以降は実行可能な方向へ強制的に圧縮されるよう設計しました。議論結果は単純なテキスト要約で終わらず、構造化されたビジネスアイデアに精製された後、9種のデザインテンプレートから実際のランディングページ形態の成果物に即時変換されます。',
    },
    execution: {
      ko: 'PM 에이전트(오케스트레이터)는 항상 존재하며 토론을 진행하는 역할입니다. 각 에이전트가 주제에서 크게 벗어나지 않도록 하네스 역할도 하면서, 토픽별 전문가는 동적으로 소환되고, 디자이너 에이전트는 3턴에 합류합니다. 사용자가 결과 랜딩 페이지를 거절하면 PM이 거절을 공지하고 추가 8턴 토론 → 새 랜딩 페이지 생성. 토론에 직접 텍스트를 입력하지 않고도 사람의 결정이 시스템에 반영되는 Human-in-the-Loop 구조입니다.',
      en: 'The PM agent (orchestrator) is always present and drives the debate, also acting as a harness to keep each agent from drifting off-topic. Topic-specific experts spawn dynamically, and a Designer agent joins at turn 3. When the user rejects the landing page, the PM announces the rejection, the team runs 8 more turns, and a new landing page is generated. The user influences the system without ever typing into the debate itself: Human-in-the-Loop by structure.',
      ja: 'PMエージェント（オーケストレーター）は常に存在し、議論を進行する役割です。各エージェントがテーマから大きく逸れないようハーネスの役割も担いつつ、トピック別専門家は動的に召喚され、デザイナーエージェントは3ターン目に合流します。ユーザーが結果のランディングページを拒絶するとPMが拒絶を告知し、追加8ターンの議論 → 新しいランディングページが生成されます。議論に直接テキストを入力せずに人の判断がシステムに反映されるHuman-in-the-Loop構造です。',
    },
    result: {
      ko: 'Build with TRAE Seoul(ByteDance) 대상 수상. 26 커밋·0 머지 충돌로 PRD부터 동작 데모까지 완성했고, 채팅 UI가 그대로 랜딩 페이지로 전환되는 흐름이 심사 핵심 포인트로 작용했습니다. 오케스트레이터 + 상태 머신이 토론의 발산을 막고 수렴으로 끌고 가는 척추 역할을 했습니다.',
      en: 'Won the Grand Prize at the Build with TRAE Seoul (ByteDance) hackathon. Shipped 26 commits with 0 merge conflicts, going from PRD to a working demo where the chat UI morphs into a landing page — the judges flagged that transition as the decisive moment. The orchestrator + state machine acted as the spine keeping the debate from diverging.',
      ja: 'Build with TRAE Seoul（ByteDance）大賞受賞。26コミット・マージ衝突0件でPRDから動作デモまでを完成させ、チャットUIがそのままランディングページに変わる流れが審査の決め手として作用しました。オーケストレーター + 状態マシンが議論の発散を防ぎ収束へ導く脊柱の役割を果たしました。',
    },
    reflection: {
      ko: '"에이전트가 모여 토론한다"는 아이디어 자체는 누구나 떠올릴 수 있습니다. 문제는 토론이 발산하지 않게 만드는 쪽이었고, 결국 차이를 만든 건 채팅 UI 뒤에 숨어 있는 오케스트레이터와 상태 머신이었습니다. 모델을 뭘 쓰느냐보다, 수렴을 강제하는 구조를 어떻게 짜느냐가 결과물 품질을 결정한다는 걸 이 프로젝트에서 가장 또렷이 느꼈습니다.',
      en: 'Anyone can picture "agents debating." The hard part is keeping that debate from flying apart — and the real differentiator turned out to be the orchestrator and state machine hiding behind the chat UI. What model you pick matters less than how you force convergence; that is the sharpest lesson from this project.',
      ja: '「エージェントが議論する」というアイデア自体は誰でも思いつきます。難しいのは発散を防ぐ側で、結局差を作ったのはチャットUIの裏に隠れたオーケストレーターと状態マシンでした。どのモデルを使うかより、収束を強制する構造をどう組むかが結果物の品質を左右する — このプロジェクトで最も鮮明に感じた教訓です。',
    },
    visuals: {
      decision: {
        image: {
          src: '/images/projects/wigent.svg',
          alt: { ko: 'WIGENT 아키텍처 — 3 lane 자율 사이클', en: 'WIGENT architecture — 3-lane autonomy', ja: 'WIGENTアーキテクチャ — 3レーン自律サイクル' },
        },
      },
    },
  },

  wigtnflake: {
    oneLiner: {
      ko: 'WIGENT의 멀티 에이전트 토론 경험을 바탕으로, Snowflake가 정해준 4개 데이터셋 + 11개 Cortex 기능을 단일 사용자 플로우에 녹여낸 목적 기반 동네 인텔리전스 플랫폼. Snowflake AI & Data Hackathon Korea 2026 Tech Track 2위.',
      en: 'Took the multi-agent debate playbook we proved with WIGENT and rebuilt it on top of Snowflake\'s four fixed datasets and 11 Cortex capabilities — a purpose-driven neighborhood-intelligence platform. 2nd place at Snowflake AI & Data Hackathon Korea 2026 (Tech Track).',
      ja: 'WIGENTで実証したマルチエージェント議論の経験を基に、Snowflakeが指定した4つのデータセット + 11個のCortex機能を単一ユーザーフローに織り込んだ目的駆動型の地域インテリジェンス基盤。Snowflake AI & Data Hackathon Korea 2026 Tech Track 2位。',
    },
    context: {
      ko: 'Snowflake AI & Data Hackathon Korea 2026 Tech Track에 출전한 프로젝트입니다. 이 해커톤은 Snowflake Cortex 기반으로 데이터 활용 서비스를 만드는 대회였고, 참가 조건으로 데이터셋 4종(부동산 시세·유동인구·카드매출·통신계약)과 사용 가능한 Cortex 기능 11종이 미리 정해져 있었습니다. 정해진 데이터셋과 Cortex 기능을 어떻게 에이전틱하게 풀어낼 수 있을까 고민하다가, WIGENT에서 멀티 에이전트 토론 구조가 결과물까지 만들어냈던 경험이 떠올랐고 같은 접근을 이 제약 위에 얹는 것이 출발점이 됐습니다.',
      en: 'This was our entry for the Snowflake AI & Data Hackathon Korea 2026 Tech Track, a competition to build data-driven services on top of Snowflake Cortex. The rules fixed four datasets (real-estate prices, foot traffic, card sales, telecom contracts) and the catalog of 11 Cortex capabilities we could use. While thinking about how to present these fixed datasets and Cortex features in an agentic way, I recalled what we had proven with WIGENT: the multi-agent debate structure can produce the final artifact. That became the starting point for layering the same approach on top of these constraints.',
      ja: 'Snowflake AI & Data Hackathon Korea 2026 Tech Trackに出場したプロジェクトです。この大会はSnowflake Cortex基盤でデータ活用サービスを作る競技で、参加条件としてデータセット4種（不動産価格・人流・カード売上・通信契約）と使用可能なCortex機能11種が事前に決められていました。決められたデータセットとCortex機能をどうエージェンティックに表現できるか考えた時、WIGENTでマルチエージェント議論構造が成果物まで作り出した経験が思い浮かび、同じアプローチをこの制約の上に載せることが出発点になりました。',
    },
    problem: {
      ko: '실제 사용자는 "어느 동네에 카페를 열까?" 같은 목적은 가지고 있지만, 어떤 데이터를 조합해서 봐야 하는지는 모릅니다. 핵심 제약은 두 가지였습니다. 첫째, 데이터셋이 고정되어 있어 사용자의 질문 의도를 해석해서 필요한 데이터를 시스템이 스스로 조합해야 했습니다. 둘째, Cortex 기능 11종을 "다 써봤다"는 체크리스트가 아니라 토론 흐름 안에서 각 기능이 필요한 시점에 자동으로 호출되게 만들어야 했습니다. 그냥 전부 호출만 하면 화면은 SQL 로그가 되고 토론은 흩어집니다.',
      en: 'Two constraints sat at the core. First, with the datasets fixed, the system had to auto-route user questions to the right dataset — when someone asks about café location scouting, the system needs real-estate prices and foot traffic simultaneously, and you cannot push that choice to the user. Second, the 11 Cortex capabilities had to fire at the right moment inside the debate flow, not just parade as a feature checklist. Calling them all blindly turns the screen into an SQL log and scatters the debate.',
      ja: '中核制約は2つ。第一に、データセットが固定されているためユーザーの質問から適切なデータセットへ自動ルーティングが必要でした。「カフェ創業の立地」を聞いた時に不動産価格と人流を同時に拾わなければならず、その判断をユーザーに任せることはできませんでした。第二に、Cortex機能11種を「全部使った」というチェックリストではなく、議論の流れの中で各機能が必要なタイミングで自動呼び出しされる形にする必要がありました。全部をただ呼ぶだけでは画面はSQLログになり議論は発散します。',
    },
    hypothesis: {
      ko: '하나의 모델이 단일 관점으로 결론을 내리는 것보다, 서로 다른 전문성을 가진 에이전트가 같은 질문을 각자 분석하고 검증하는 편이 실제 의사결정 과정에 더 가깝다고 판단했습니다. 그래서 사용자는 SQL을 모른 채 목적만 던지고, GPT-4o 오케스트레이터가 그 목적에 맞는 5명의 Cortex 전문가를 동적으로 소환해 4개 데이터셋을 교차 조회하며 토론하는 구조를 잡았습니다. Cortex 기능 11개는 토론 중간에 자동 호출되어 각 전문가의 발언 근거로 흘러 들어가게 묶었습니다.',
      en: 'Hypothesis: "the user states a purpose, never SQL — and a GPT-4o orchestrator dynamically summons five purpose-tuned Cortex specialists who cross-query the four datasets through debate." The 11 Cortex functions get auto-called mid-debate and surface as evidence inside each specialist\'s turn.',
      ja: '仮説 — 「ユーザーはSQLを知らずに目的だけを投げ、GPT-4oオーケストレーターがその目的に合う5名のCortex専門家を動的に召喚して4データセットを横断照会しながら議論する」。11個のCortex機能は議論の途中で自動呼び出しされ、各専門家の発言根拠として流れ込む形に束ねます。',
    },
    alternatives: {
      ko: 'Cortex 기능별 단일 호출 데모, 룰 기반 추천 엔진, 일반 BI 대시보드를 검토했습니다. 단일 호출 데모는 기능은 다 보여줄 수 있지만 사용자 입장에서 "그래서 뭘 해야 하는데?"가 빠집니다. BI 대시보드는 시각화는 강하지만 SQL을 모르는 사용자가 직접 질문을 던지는 흐름을 만들 수 없었습니다. 결국 Cortex 기능 카탈로그를 하나의 흐름에 녹이면서 SQL을 감추는 구조는 멀티 에이전트 토론밖에 없었습니다. 추가로 Cortex Agent가 trial 한계에 걸리면 데모 중간에 멈출 위험이 있어서, 3-tier fallback(Cortex Agent → Cortex Analyst 직접 → GPT-4o Function Calling)을 함께 설계했습니다.',
      en: 'Evaluated three alternatives: per-capability Cortex demos, rules-based recommendation engines, and standard BI dashboards. Single-capability demos can show every feature, but the user is left asking "so what do I do?" BI dashboards are strong on visualization but cannot let a non-SQL user throw questions freely. The only path that wove the Cortex catalog into one flow while keeping SQL invisible was multi-agent debate. On top of that, the Cortex Agent trial limit could halt the demo mid-run, so we designed a three-tier fallback alongside it (Cortex Agent → Cortex Analyst direct → GPT-4o Function Calling).',
      ja: 'Cortex機能別の単一呼び出しデモ、ルールベース推薦エンジン、一般的なBIダッシュボードを検討しました。単一呼び出しデモは機能を見せられますが「で、何をすればいいの？」がユーザーに残ります。BIダッシュボードは可視化は強いもののSQLを知らないユーザーが自由に質問を投げる流れは作れませんでした。結局Cortex機能カタログを一つの流れに織り込みつつSQLを隠す構造はマルチエージェント議論しかありませんでした。加えてCortex Agentがtrial限界に引っかかるとデモ途中で止まるリスクがあるため、3層フォールバック（Cortex Agent → Cortex Analyst直接 → GPT-4o Function Calling）を併せて設計しました。',
    },
    decision: {
      ko: 'GPT-4o 오케스트레이터 + 5 Cortex 전문가(PM 진행자·데이터 분석가·예측 분석가·인사이트 분석가·감성 분석가)의 토론 구조를 채택했습니다. Cortex Analyst가 text-to-SQL로 4개 데이터셋(SPH·RichGo·NextTrade·AJD)에 동시 질의하고, ANOMALY_DETECTION·FORECAST는 Promise.all로 병렬 실행해 결과가 웨어하우스에서 합쳐진 뒤 데이터 분석가가 합본 결론을 발언합니다. 4종 Semantic Model YAML + 2종 Dynamic Tables + 2종 Python UDF로 Cortex 기능 11종을 단일 사용자 플로우에 녹였습니다.',
      en: 'Settled on a GPT-4o orchestrator + five Cortex specialists (PM facilitator, data analyst, forecaster, insight analyst, sentiment analyst) debating in turns. Cortex Analyst issues text_to_sql across four datasets (SPH / RichGo / NextTrade / AJD) in parallel; ANOMALY_DETECTION and FORECAST run side by side via Promise.all, merge in the warehouse, and the data analyst speaks the combined finding. Four Semantic Model YAMLs + two Dynamic Tables + two Python UDFs wove all 11 Cortex capabilities into a single user flow.',
      ja: 'GPT-4oオーケストレーター + 5 Cortex専門家（PM進行役・データ分析家・予測分析家・インサイト分析家・センチメント分析家）の議論構造を採用。Cortex Analystがtext-to-SQLで4データセット（SPH・RichGo・NextTrade・AJD）に並列照会し、ANOMALY_DETECTION・FORECASTはPromise.allで並列実行、結果がウェアハウスで統合されてからデータ分析家が合算結論を発言します。4種のSemantic Model YAML + 2種Dynamic Tables + 2種Python UDFで11個のCortex機能を単一ユーザーフローに織り込みました。',
    },
    execution: {
      ko: '사용자가 5개 목적 카드 또는 자유 입력으로 시작하면, 오케스트레이터가 목적별 전문가를 부르고 토론 도중 ANOMALY_DETECTION·FORECAST가 이상치·예측을 잡는 순간 자동으로 발화권을 가져와 끼어듭니다. 결론은 Top 3 동네 + 이상 시그널 배지 + 예측 차트 + 액션 체크리스트가 한 화면에 정리됩니다.',
      en: 'Users start from one of five purpose cards or free input. The orchestrator summons purpose-matched specialists, and mid-debate ANOMALY_DETECTION or FORECAST auto-claims the floor the moment it catches an outlier or projection. The conclusion lands on one screen: Top 3 districts + anomaly badges + forecast charts + action checklist. Step-by-step flow in the cards below.',
      ja: 'ユーザーが5つの目的カードまたは自由入力で開始すると、オーケストレーターが目的別の専門家を呼び、議論中にANOMALY_DETECTION・FORECASTが外れ値・予測を捕える瞬間に自動的に発話権を取り割り込みます。結論はTop 3地域 + 異常シグナルバッジ + 予測チャート + アクションチェックリストが1画面に整理されます。段階別フローは下のカード参照。',
    },
    result: {
      ko: 'Snowflake AI & Data Hackathon Korea 2026 Tech Track 2위. Cortex 11종을 단일 사용자 흐름에 녹인 점과 3-tier fallback으로 trial 한계 상황에서도 데모가 끊기지 않게 만든 점이 심사 포인트였습니다.',
      en: '2nd place in Snowflake AI & Data Hackathon Korea 2026 Tech Track. The judges flagged two things: weaving 11 Cortex capabilities into one user flow, and the three-tier fallback that kept the demo running even when Cortex trial limits hit. Metrics in the cards below.',
      ja: 'Snowflake AI & Data Hackathon Korea 2026 Tech Track 2位。11個のCortex機能を単一ユーザーフローに織り込んだ点、3層フォールバックでtrial限界状況下でもデモが途切れないようにした点が審査ポイントでした。詳細メトリクスは下のカード参照。',
    },
    reflection: {
      ko: 'WIGENT는 "토론 구조"가 산출물을 만든다는 검증이었고, WIGTN FLAKE는 "제약 안에서 같은 구조를 어떻게 녹이는가"라는 다른 질문이었습니다. 데이터셋이 고정돼 있으면 라우팅 책임이 오케스트레이터로 더 크게 옮겨가고, 도구(Cortex)가 정해져 있으면 "도구가 토론에 끼어드는 권한"을 어디서 끊을지가 핵심 결정이 됩니다. 제약이 강한 환경일수록 시스템 디자인의 무게가 커진다는 점을 가장 또렷이 느낀 프로젝트입니다.',
      en: 'WIGENT proved that the debate structure can produce the artifact. WIGTN FLAKE asked a different question: "how do you weave the same structure inside a fixed set of constraints?" When the datasets are fixed, more of the routing weight shifts to the orchestrator; when the tools (Cortex) are fixed, the key decision becomes where exactly tools are allowed to interrupt the debate. Tighter constraints made the system-design weight bigger — that is the lesson I felt most sharply on this one.',
      ja: 'WIGENTは「議論構造」が成果物を生むという検証で、WIGTN FLAKEは「制約の中で同じ構造をどう織り込むか」という別の問いでした。データセットが固定されているとルーティング責任がオーケストレーターにより大きく寄り、ツール（Cortex）が固定されていると「ツールが議論に割り込む権限」をどこで切るかが核心決定になります。制約が強い環境ほどシステムデザインの重みが大きくなる点を最も明確に感じたプロジェクトです。',
    },
    visuals: {
      decision: {
        image: {
          src: '/images/projects/wigtnflake.svg',
          alt: { ko: 'WIGTN FLAKE 아키텍처', en: 'WIGTN FLAKE architecture', ja: 'WIGTN FLAKEアーキテクチャ' },
        },
      },
      execution: {
        bullets: {
          ko: [
            '입력 — 목적 카드 5종(카페·렌탈·광고판·투자·이상 시그널) 또는 자유 입력',
            '토론 중 가로채기 — ANOMALY_DETECTION·FORECAST가 이상치·예측 잡는 즉시 발화권 회수',
            '한 화면 결론 — Top 3 동네 + 이상 시그널 배지 + 예측 차트 + 액션 체크리스트',
          ],
          en: [
            'Input — 5 purpose cards (cafe / rental / billboard / investment / anomaly) or free text',
            'Interrupt mid-debate — ANOMALY_DETECTION / FORECAST claims the floor the moment it lands a signal',
            'One-screen conclusion — Top 3 districts + anomaly badges + forecast charts + action checklist',
          ],
          ja: [
            '入力 — 目的カード5種（カフェ・レンタル・看板・投資・異常シグナル）または自由入力',
            '議論中の割り込み — ANOMALY_DETECTION・FORECASTが信号を捕えた瞬間に発話権を奪取',
            '1画面結論 — Top 3地域 + 異常バッジ + 予測チャート + アクションチェックリスト',
          ],
        },
      },
      result: {
        metrics: [
          {
            value: '2위',
            label: { ko: 'Snowflake AI & Data Hackathon Korea 2026 Tech Track', en: 'Snowflake AI & Data Hackathon Korea 2026 Tech Track', ja: 'Snowflake AI & Data Hackathon Korea 2026 Tech Track' },
          },
          {
            value: '11종',
            label: { ko: 'Cortex 기능을 단일 사용자 흐름에 통합', en: 'Cortex capabilities woven into one user flow', ja: 'Cortex機能を単一ユーザーフローに統合' },
          },
          {
            value: '3-tier',
            label: { ko: 'Fallback으로 trial 한계에도 데모 끊김 0', en: 'Fallback kept demo uptime at 100% under trial limits', ja: 'フォールバックでtrial限界下でもデモ途切れ0' },
          },
        ],
      },
    },
  },

  wigplugin: {
    oneLiner: {
      ko: 'PRD 작성 → 화면정의서 → 병렬 빌드 → 코드 리뷰 → 커밋까지 한 파이프라인으로 돌리는 Claude Code 플러그인. 13개 에이전트·5개 커맨드·4개 스킬을 묶어 오픈소스로 공개.',
      en: 'A Claude Code plugin that runs PRD → screen spec → parallel build → code review → commit as a single pipeline. Bundles 13 agents, 5 commands, and 4 skills. Open-sourced.',
      ja: 'PRD作成 → 画面定義書 → 並列ビルド → コードレビュー → コミットまでを1パイプラインで回すClaude Codeプラグイン。13エージェント・5コマンド・4スキルを束ねてオープンソース公開。',
    },
    context: {
      ko: '사운드마인드에서 팀장으로 여러 프로젝트를 동시에 리딩하면서, 회사 내에서 실질적으로 프로젝트 경험이 가장 많은 사람이 저 혼자다 보니 점점 한계를 느끼기 시작했습니다. 모든 프로젝트를 직접 챙기다 보니 병목이 생겼고, 결국 중요한 건 제가 일하는 방식을 팀 전체가 공유할 수 있어야 한다는 생각에 도달했습니다.\n\n특히 저는 구현 전에 항상 PRD를 먼저 작성하고, 설계 검증을 거친 뒤 개발에 들어가는 흐름으로 일해왔습니다. 구현 단계에서 발생하는 문제 대부분이 개발 능력보다 초기 요구사항과 설계 정렬 실패에서 시작된다는 걸 반복적으로 경험했기 때문입니다. 이 과정을 팀원들도 자연스럽게 따라갈 수 있으면 좋겠다고 생각했습니다.\n\n하지만 AI를 실제 개발 흐름 안에 적용해보니, 단순히 AI를 잘 사용하는 것만으로는 결과물 품질을 안정적으로 유지하기 어렵다는 문제를 계속 체감했습니다. 한 세션 안에서 역할과 컨텍스트가 섞이기 시작하면 결과물이 쉽게 흔들렸고, 결국 문제는 AI 성능이 아니라, AI가 어떤 흐름과 책임 구조 안에서 동작하느냐였습니다.\n\n그래서 제가 실제로 사용하던 작업 방식을 Claude Code 기반 플러그인 형태로 구조화했고, 팀 전체가 같은 흐름 위에서 작업할 수 있도록 만들었습니다. 이후에는 다른 개발자들도 사용할 수 있게 오픈소스로 공개했습니다.',
      en: 'As team lead at Soundmind running multiple projects simultaneously, I was practically the only person with real project experience in the company, and the bottleneck was becoming obvious. Every project depended on me, so I concluded that what mattered most was making my way of working something the whole team could share.\n\nI always write the PRD first, validate the design, and only then start building — I wanted the team to follow that same flow naturally.\n\nBut once I started applying AI inside the actual development workflow, I kept running into the same issue: simply "using AI well" wasn\'t enough to keep output quality stable. The moment roles and context got mixed in a single session, results started drifting. I realized we needed the workflow itself to be structured so the AI could behave consistently.\n\nSo I turned my working process into a Claude Code plugin, put the whole team on the same rails, and later open-sourced it for other developers.',
      ja: 'サウンドマインドでチームリーダーとして複数プロジェクトを同時にリードする中、社内で実質的にプロジェクト経験が最も豊富なのが自分一人という状況で、徐々に限界を感じ始めました。すべてのプロジェクトを自ら管理するうちにボトルネックが生じ、結局重要なのは自分の働き方をチーム全体が共有できることだという結論に至りました。\n\n特に私は実装前に必ずPRDを先に書き、設計検証を経てから開発に入る流れで仕事をしてきましたが、このプロセスをチームメンバーも自然に踏襲できればと考えました。\n\nしかしAIを実際の開発フローに適用してみると、単にAIをうまく使うだけでは成果物の品質を安定的に維持するのが難しいという問題を繰り返し実感しました。一つのセッション内で役割とコンテキストが混ざり始めると結果物が容易に揺らぎ、結局AIが一貫した方式で動作できるワークフロー自体が必要だと判断しました。\n\nそこで実際に使っていた作業方式をClaude Codeベースのプラグイン形態に構造化し、チーム全体が同じフロー上で作業できるようにしました。その後、他の開発者も使えるようオープンソースで公開しました。',
    },
    problem: {
      ko: '실제로 AI를 개발 흐름에 넣어보니, 생각보다 빨리 한계가 드러났습니다.\n\n가장 먼저 부딪힌 건 컨텍스트 오염이었습니다. 한 세션에서 PRD를 쓰다가 바로 구현으로 넘어가면, AI가 앞에서 했던 기획 의도에 끌려가서 코드가 이상한 방향으로 흘렀습니다. 그 다음은 역할 경계 문제였습니다. PM처럼 방향을 잡는 일과 개발자처럼 코드를 짜는 일을 같은 흐름에서 시키면, 어느 순간 둘 다 어중간해졌습니다. 마지막으로 검증 문제가 있었습니다. AI가 만든 결과물을 매번 사람이 직접 확인해야 하면 결국 손으로 하는 것과 속도 차이가 없어졌습니다.\n\n이 세 가지가 따로 도는 게 아니라 서로 엮여 있었기에, 한꺼번에 잡을 수 있는 구조가 필요하다고 판단했습니다.',
      en: 'Once AI was seriously embedded in the development process, several issues kept surfacing.\n\nWhen PRD, design, and implementation shared a single session, the output would drift toward earlier context. When PM, architect, developer, and reviewer roles operated in the same flow, responsibility boundaries blurred and quality variance grew. When humans had to manually review every AI output, the productivity advantage disappeared.\n\nI concluded that without designing context management, role separation, and automated validation together, an AI-driven development workflow could not run reliably.',
      ja: 'AIを開発プロセスに本格的に組み込み始めてから、いくつかの問題を繰り返し実感しました。\n\n一つのセッション内でPRD・設計・実装が混在すると、以前のコンテキストに引きずられて成果物が容易に揺らぎました。PM・アーキテクト・開発・レビューの役割が同じフロー内で同時に動作すると責任境界が曖昧になり品質のばらつきが大きくなりました。AI生成物を人が毎回直接検収しなければならないと、結局生産性の利点が消失しました。\n\nコンテキスト管理・役割分離・自動検証が一緒に設計されなければ、AIベースの開発ワークフローを安定的に運用するのは難しいと判断しました。',
    },
    hypothesis: {
      ko: '이 문제들은 따로따로 해결되는 게 아니라, 하나의 파이프라인 안에서 동시에 잡아야 한다고 봤습니다.\n\nPRD 단계에서는 Completeness·Feasibility·Security·Consistency 4개 검증 에이전트가 명세 자체를 먼저 점검하게 했습니다. 구현에 들어가기 전에 방향이 틀어질 여지를 줄이기 위해서였습니다.\n\n구현 단계에서는 Backend·Frontend·AI Server·Ops를 독립된 팀처럼 병렬 실행하되, SHARED_CONTEXT 파일 하나로 필요한 인터페이스·데이터 스키마·결과 포맷만 공유하고 이전 단계의 내부 시행착오는 공유하지 않는 구조로 만들었습니다. 이렇게 하면 각 팀의 컨텍스트가 섞이지 않으면서도 결과물은 맞물리게 됩니다.\n\n커밋 단계에서는 3개의 리뷰 에이전트가 코드 품질을 자동 점수화하고, Security Critical 이슈는 점수와 관계없이 즉시 차단하도록 설계했습니다. 사람이 매번 직접 검수하지 않아도 최소한의 신뢰 선을 유지하기 위한 장치였습니다.',
      en: 'These problems cannot be picked off one by one — they need to be controlled inside a single pipeline at the same time.\n\nAt the PRD stage, four validation agents (Completeness, Feasibility, Security, Consistency) check the spec itself before implementation begins, catching directional drift early.\n\nAt the build stage, Backend, Frontend, AI Server, and Ops run as independent parallel teams, sharing only interfaces, data schemas, and result formats through a single SHARED_CONTEXT file — internal trial-and-error from prior stages stays out. Each team\'s context stays clean while the outputs still interlock.\n\nAt the commit stage, three review agents auto-score code quality, and Security Critical issues are blocked regardless of score — a safety floor that holds without requiring manual review every time.',
      ja: 'これらの問題は一つずつ解決できるものではなく、一つのパイプライン内で同時に制御する必要がありました。\n\nPRD段階ではCompleteness・Feasibility・Security・Consistencyの4検証エージェントが仕様自体を先に点検し、方向逸脱を早期に捕えるようにしました。\n\n実装段階ではBackend・Frontend・AI Server・Opsを独立チームとして並列実行しつつ、SHARED_CONTEXTファイル一つでインターフェース・データスキーマ・結果フォーマットのみを共有し、前段階の内部試行錯誤は共有しない構造にしました。各チームのコンテキストが混ざらずに成果物は噛み合う形です。\n\nコミット段階では3つのレビューエージェントがコード品質を自動スコア化し、Security Criticalはスコアに関係なく即時遮断 — 人が毎回直接検収しなくても最低限の信頼線を維持する仕組みです。',
    },
    alternatives: {
      ko: '에이전트마다 개별 호출하는 기존 방식과 단일 메가 에이전트로 통합하는 방식을 검토했습니다. 개별 호출은 한 에이전트가 끝나면 다음 에이전트에게 이전 결과를 다시 전달해야 해서, 단계가 늘수록 컨텍스트 전달 비용이 누적되고 중간에 정보가 변질될 위험이 커졌습니다. 메가 에이전트는 반대로 하나가 PRD 작성·설계·구현·리뷰를 전부 떠안는 구조라 어느 단계에서 문제가 생겼는지 추적이 안 됐고, 실제로 돌려보면 앞 단계 판단에 뒤 단계가 끌려가는 문제가 반복됐습니다.',
      en: 'Evaluated two alternatives: invoking each agent individually and merging everything into a single mega-agent. Individual invocations require passing prior results to the next agent at every handoff — context-transfer cost piles up and information degrades mid-chain. The mega-agent has the opposite problem: one agent owns PRD, design, implementation, and review all at once, making it impossible to trace which stage introduced an issue. In practice, later stages kept drifting toward earlier decisions.',
      ja: 'エージェントごとに個別呼び出しする方式と単一メガエージェントに統合する方式を検討しました。個別呼び出しは一つが終わるたびに次へ結果を受け渡す必要があり、段階が増えるほどコンテキスト引き渡しコストが累積して途中で情報が変質するリスクが大きくなりました。メガエージェントは逆にPRD作成・設計・実装・レビューをすべて一つが担うため、どの段階で問題が生じたか追跡できず、実際に回すと前段階の判断に後段階が引きずられる問題が繰り返されました。',
    },
    decision: {
      ko: '핵심 목표는 역할 충돌 없이 병렬 개발을 가능하게 만드는 것이었습니다. 이를 위해 단일 플러그인 안에 13 에이전트 + 5 커맨드 + 4 스킬 + 4 안전 훅을 묶었습니다. 핵심은 `/prd → /screen-spec → /implement → /auto-commit` 파이프라인이고, `/screen-spec`은 UI 프로젝트에서 PRD와 구현 사이에 화면정의서 5종을 자동 생성하는 선택적 게이트, `/implement`는 4개 팀에 자동 병렬 분배, `/auto-commit`은 3개 리뷰 에이전트 점수 합산 후 80점 이상이면 자동 머지·Security Critical은 점수 무관 강제 차단입니다.',
      en: 'One plugin bundles 13 agents + 5 commands + 4 skills + 20 design styles + 4 safety hooks. The spine is `/prd → /screen-spec → /implement → /auto-commit`: `/screen-spec` is a selective gate that auto-generates five screen-specification artifacts for UI projects between PRD and build; `/implement` auto-dispatches to four teams in parallel; `/auto-commit` aggregates three reviewer scores — commit at ≥80, Security Critical force-fails regardless.',
      ja: '単一プラグインで13エージェント + 5コマンド + 4スキル + 20デザインスタイル + 4安全フックを束ねました。核心は `/prd → /screen-spec → /implement → /auto-commit` パイプライン: `/screen-spec` はUIプロジェクトでPRDとビルドの間に画面定義書5種を自動生成する選択的ゲート、`/implement` は4チームに自動並列分配、`/auto-commit` は3レビュアースコアを集計してスコア80以上で自動マージ、Security Criticalはスコア無関係に強制遮断します。',
    },
    execution: {
      ko: '한 흐름으로 보면 단순합니다. `/prd`가 PRD + 단계별 task plan을 만들면서 4 카테고리 품질 게이트를 통과시키고, UI 프로젝트면 `/screen-spec`이 IA·유저 플로우·화면 명세·와이어프레임·개발 핸드오프 5종을 생성합니다. `/implement`는 설계 에이전트 병렬 실행 후 4팀(Backend·Frontend·AI Server·Ops) 동시 가동, `/auto-commit`은 3 리뷰 점수 합산 + 4 안전 훅이 백그라운드에서 위험 명령·빠진 검증을 차단합니다.',
      en: 'Linearly the flow is simple. `/prd` produces a PRD + phased task plan while running a four-category quality gate; for UI projects `/screen-spec` generates five artifacts (IA, user flow, screen spec, wireframe, dev handoff). `/implement` runs design agents in parallel, then fires four teams (Backend, Frontend, AI Server, Ops) concurrently; `/auto-commit` aggregates three review scores while four safety hooks block risky commands and missing checks in the background.',
      ja: '一連の流れは単純です。`/prd` がPRD + 段階別タスクプランを作りつつ4カテゴリ品質ゲートを通し、UIプロジェクトでは `/screen-spec` がIA・ユーザーフロー・画面仕様・ワイヤーフレーム・開発ハンドオフの5種を生成。`/implement` は設計エージェントの並列実行後に4チーム（Backend・Frontend・AI Server・Ops）を同時稼働、`/auto-commit` は3レビュースコアを集計しつつ4安全フックが危険コマンドや漏れた検証をバックグラウンドで遮断します。',
    },
    result: {
      ko: 'WIGTN-Coding을 Claude Code 플러그인으로 오픈소스 공개해 다른 개발자도 동일 워크플로우 위에서 작업할 수 있게 다듬었습니다. 이 워크플로우 위에서 WIGENT(TRAE 대상)·WIGTN FLAKE(Snowflake Tech Track 2위)·WIGVO 등 후속 프로젝트가 모두 만들어졌고, GitHub 별 약 44개 받은 상태입니다.',
      en: 'Released WIGTN-Coding as an open-source Claude Code plugin so other engineers can run the same workflow end-to-end. Every downstream project — WIGENT (TRAE Grand Prize), WIGTN FLAKE (Snowflake Tech Track 2nd), WIGVO — was built on top of this workflow, and the repo currently sits at ~44 GitHub stars.',
      ja: 'WIGTN-CodingをClaude Codeプラグインとしてオープンソース公開し、他の開発者も同じワークフロー上でエンドツーエンドに作業できる形に整備しました。このワークフロー上でWIGENT（TRAE大賞）・WIGTN FLAKE（Snowflake Tech Track 2位）・WIGVOなど後続プロジェクトがすべて構築され、現在GitHubで約44スターを獲得した状態です。',
    },
    reflection: {
      ko: '팀원들이 이 플러그인 위에서 WIGENT·WIGTN FLAKE·WIGVO를 만들어내는 걸 보면서, 처음에 의도했던 "내 작업 방식의 이식"이 실제로 동작한다는 걸 확인했습니다. 결국 AI 도구의 가치는 답의 품질이 아니라, 사람이 매번 사이를 잇지 않아도 파이프라인이 끝까지 도는 구조에 있었습니다.',
      en: 'Watching teammates ship WIGENT, WIGTN FLAKE, and WIGVO on top of this plugin confirmed that the original intent — transferring my working process — actually worked. The value of AI tooling turned out to be not the quality of individual answers, but a pipeline structure that runs end-to-end without a human stitching every gap.',
      ja: 'チームメンバーがこのプラグイン上でWIGENT・WIGTN FLAKE・WIGVOを作り上げるのを見て、当初意図していた「自分の作業方式の移植」が実際に機能することを確認しました。結局AIツールの価値は個々の回答の品質ではなく、人が毎回間を繋がなくてもパイプラインが最後まで回る構造にありました。',
    },
    visuals: {
      problem: {
        bullets: {
          ko: [
            '컨텍스트 오염 — PRD·설계·구현이 한 세션에 섞이면 이전 컨텍스트에 끌려가 결과물이 쉽게 흔들림',
            '역할 경계 부재 — PM·아키텍트·개발·리뷰가 같은 흐름에서 동시 동작하면 책임 경계가 흐려지고 품질 편차 증가',
            '검증 부재 — AI 결과물을 사람이 매번 직접 검수하면 생산성 이점이 사라짐',
          ],
          en: [
            'Context contamination — when PRD, design, and implementation share one session, output drifts toward earlier context',
            'No role boundary — PM, architect, developer, reviewer operating in the same flow blurs responsibility and increases quality variance',
            'No validation — manual review of every AI output eliminates the productivity advantage',
          ],
          ja: [
            'コンテキスト汚染 — PRD・設計・実装が1セッションに混在すると以前のコンテキストに引きずられ成果物が容易に揺らぐ',
            '役割境界の不在 — PM・アーキテクト・開発・レビューが同じフローで同時動作すると責任境界が曖昧になり品質のばらつきが増加',
            '検証の不在 — AI生成物を毎回人が直接検収すると生産性の利点が消失',
          ],
        },
      },
      decision: {
        image: {
          src: '/images/projects/wigtncoding.svg',
          alt: { ko: 'WIGTN Coding 플러그인 아키텍처', en: 'WIGTN Coding plugin architecture', ja: 'WIGTN Codingプラグインアーキテクチャ' },
        },
        // 12 에이전트의 3 분류 — 본문에서 빼고 표로 시각화해 한눈에 잡힘
        table: {
          columns: [
            { ko: '카테고리', en: 'Category', ja: 'カテゴリ' },
            { ko: '에이전트 4종', en: '4 agents', ja: 'エージェント4種' },
            { ko: '역할', en: 'Role', ja: '役割' },
          ],
          rows: [
            [
              { ko: 'Coordinators', en: 'Coordinators', ja: 'Coordinators' },
              { ko: 'team-build · parallel-review · parallel-digging · architecture-decision', en: 'team-build · parallel-review · parallel-digging · architecture-decision', ja: 'team-build · parallel-review · parallel-digging · architecture-decision' },
              { ko: '병렬 분배·점수 합산·아키텍처 결정', en: 'Parallel dispatch · score merge · architecture decisions', ja: '並列分配・スコア集計・アーキテクチャ決定' },
            ],
            [
              { ko: 'Developers', en: 'Developers', ja: 'Developers' },
              { ko: 'frontend · backend · mobile · ai-agent', en: 'frontend · backend · mobile · ai-agent', ja: 'frontend · backend · mobile · ai-agent' },
              { ko: 'React 19 · Next.js 16 · RN · WhisperX/OpenAI/Anthropic', en: 'React 19 · Next.js 16 · React Native · WhisperX/OpenAI/Anthropic', ja: 'React 19 · Next.js 16 · React Native · WhisperX/OpenAI/Anthropic' },
            ],
            [
              { ko: 'Quality', en: 'Quality', ja: 'Quality' },
              { ko: 'code-reviewer · prd-reviewer · code-formatter · design-discovery', en: 'code-reviewer · prd-reviewer · code-formatter · design-discovery', ja: 'code-reviewer · prd-reviewer · code-formatter · design-discovery' },
              { ko: '100점 스코어·PRD 갭 분석·자동 포맷·디자인 스타일 추천', en: '100-pt scoring · PRD gap analysis · auto-format · style picker', ja: '100点スコア・PRDギャップ分析・自動フォーマット・スタイル推薦' },
            ],
          ],
        },
      },
      // 4 안전 훅 + 20 디자인 스타일 — 본문에서 빼고 bullets로
      execution: {
        bullets: {
          ko: [
            '4 안전 훅 (백그라운드 자동 실행) — Dangerous Command Blocker · Pipeline Completion 알림 · Frontend Formatting 리마인더 · Backend Pattern Compliance 체크',
            '3 스킬 — code-review-levels(Level 3 deep review·Level 4 architecture review) · design-system-reference(20 스타일 가이드) · team-memory-protocol(병렬 빌드 공유 컨텍스트)',
            '20 디자인 스타일 — Editorial · Brutalist · Glassmorphism · Swiss Minimal · Neomorphism · Bento Grid · Dark Mode First · Retro Pixel · Maximalist · 3D Immersive · Liquid Glass · Claymorphism · Neobrutalism · Aurora/Gradient Mesh · Terminal/Hacker · Kinetic Typography 등 (각각 anti-pattern 체크리스트 동반)',
          ],
          en: [
            '4 safety hooks (run in background) — Dangerous Command Blocker · Pipeline Completion reminder · Frontend Formatting reminder · Backend Pattern Compliance check',
            '4 skills — code-review-levels (Level 3 deep · Level 4 architecture review) · design-system-reference (20 style guides) · screen-spec (5-artifact UI spec generation) · team-memory-protocol (shared context across parallel builds)',
            '20 design styles — Editorial · Brutalist · Glassmorphism · Swiss Minimal · Neomorphism · Bento Grid · Dark Mode First · Retro Pixel · Maximalist · 3D Immersive · Liquid Glass · Claymorphism · Neobrutalism · Aurora/Gradient Mesh · Terminal/Hacker · Kinetic Typography, … (each with an anti-pattern checklist)',
          ],
          ja: [
            '4安全フック（バックグラウンド自動実行） — Dangerous Command Blocker · Pipeline Completion通知 · Frontend Formattingリマインダー · Backend Pattern Complianceチェック',
            '4スキル — code-review-levels（Level 3 deep review · Level 4 architecture review）· design-system-reference（20スタイルガイド）· screen-spec（5種UI仕様自動生成）· team-memory-protocol（並列ビルド共有コンテキスト）',
            '20デザインスタイル — Editorial · Brutalist · Glassmorphism · Swiss Minimal · Neomorphism · Bento Grid · Dark Mode First · Retro Pixel · Maximalist · 3D Immersive · Liquid Glass · Claymorphism · Neobrutalism · Aurora/Gradient Mesh · Terminal/Hacker · Kinetic Typographyなど（各自anti-patternチェックリスト付き）',
          ],
        },
      },
      result: {
        metrics: [
          { value: '13 agents', label: { ko: '단일 파이프라인 통합 (PRD → 화면정의서 → 빌드 → 리뷰 → 커밋)', en: 'Bundled into one pipeline (PRD → screen spec → build → review → commit)', ja: '単一パイプライン統合（PRD → 画面定義書 → ビルド → レビュー → コミット）' } },
          { value: '44', label: { ko: 'GitHub stars (오픈소스 공개 후 수신, 외부 개발자 사용 신호)', en: 'GitHub stars after open-sourcing — signal of external adoption', ja: 'GitHubスター（オープンソース公開後、外部開発者の採用シグナル）' } },
        ],
      },
    },
  },

  wigvo: {
    oneLiner: {
      ko: '일반 전화선(PSTN) 위에서 동작하는 실시간 음성 통역 시스템. 듀얼 세션 + 에코 게이팅 아키텍처로 평균 557ms 지연, 148건 실통화 0건 에코 루프를 달성했고 ACL 2026 System Demonstrations에 채택됐습니다.',
      en: 'A real-time voice translation system that runs over the regular PSTN. A dual-session + echo-gating architecture hits ~557ms average latency and 0 echo loops across 148 live calls; accepted to ACL 2026 System Demonstrations.',
      ja: '一般電話線（PSTN）上で動作するリアルタイム音声通訳システム。デュアルセッション + エコーゲーティングアーキテクチャで平均557msの遅延・148件の実通話で0件のエコーループを達成し、ACL 2026 System Demonstrationsに採択されました。',
    },
    context: {
      ko: '부동산 중개소, 병원, 동네 수리점 같은 곳은 아직도 전화가 유일한 창구입니다. 온라인 예약이 안 되는 곳에 뭔가를 문의하려면 결국 전화를 걸어야 하는데, 국내 거주 외국인(220만 명)에게는 언어 장벽이, 통화 불안을 느끼는 세대에게는 심리적 장벽이, 청각·언어 장애인에게는 물리적 장벽이 있습니다.\n\n기존 음성 번역 기술은 양쪽 다 앱을 깔아야 동작하는 구조라 이 문제를 풀 수 없었습니다. 저희가 목표로 잡은 건 수신자가 아무것도 설치하지 않아도 일반 전화를 받기만 하면 양방향 통역이 바로 동작하는 시스템이었고, 그러려면 통화 매개체를 PSTN(SIP)으로 가져가면서 양쪽 오디오를 실시간으로 처리해야 했습니다.',
      en: 'Real-estate brokerages, hospitals, and neighborhood repair shops still rely on phone calls as their only gateway. Yet for foreign residents in Korea (2.2 million), people with call anxiety, and those with hearing or speech impairments, a single phone call remains a real barrier. Existing speech translation technology assumes app-to-app environments (wideband audio + client-side AEC), so it simply does not work when the called party picks up a plain PSTN phone with nothing installed. To build a system where the receiver just answers a normal phone and two-way translation runs immediately, we had to use PSTN/SIP as the transport, process both sides through STT → translation → TTS in real time, and prevent echo loops at the same time.',
      ja: '不動産仲介、病院、地域の修理店などは今でも電話が唯一の窓口です。しかし在韓外国人（220万人）、通話不安を感じる世代、聴覚・言語障害者にとって電話一本は依然として大きな壁です。既存の音声翻訳技術はアプリ対アプリ環境（広帯域オーディオ + クライアント側AEC）を前提に作られており、受信者が何もインストールしていない一般電話（PSTN）では動作しませんでした。受信者がアプリなしで電話を取るだけで双方向通訳が即座に動くシステムを作るには、通話媒体をPSTN（SIP）にしつつ発信者・受信者双方の音声をリアルタイムでSTT → 翻訳 → TTS処理し、エコーループまで防ぐ必要がありました。',
    },
    problem: {
      ko: '핵심 문제는 세 가지였습니다. 첫째, 오디오 환경 격차입니다. 일반 앱(16~24kHz PCM16 + 클라이언트 AEC)과 달리 PSTN은 G.711 μ-law 8kHz 협대역 코덱에 80~600ms 가변 지연이 깔립니다. 둘째, 에코 루프입니다. AI가 만든 TTS 음성이 PSTN을 타고 돌아와 다시 STT → 번역 → TTS로 입력되는데, 초기 테스트에서 10통 중 8통이 이 루프에 빠졌습니다. 셋째, VAD 실패입니다. OpenAI Server VAD는 깨끗한 광대역 입력을 가정해서 PSTN 잡음(RMS 50~200)을 "발화 중"으로 잡고 `speech_stopped` 이벤트가 15~72초 늦게 발화하거나 아예 안 옵니다.',
      en: 'Three problems sat at the core. (1) Audio environment gap — unlike high-bandwidth app environments (16-24kHz PCM16 with client-side AEC), PSTN runs on a G.711 μ-law 8kHz narrowband codec with 80-600ms variable delay. (2) Echo loops — the AI\'s TTS audio comes back through PSTN and re-enters the STT → translation → TTS chain; in initial testing, 8 out of 10 test calls fell into this loop. (3) VAD failure — OpenAI Server VAD assumes a clean wideband signal, so PSTN background noise (RMS 50-200) registers as "speech in progress" and `speech_stopped` fires 15-72 seconds late, or not at all.',
      ja: '中核の問題は3つ。(1) オーディオ環境ギャップ — 通常アプリ（16~24kHz PCM16 + クライアント側AEC）と異なり、PSTNはG.711 μ-law 8kHz狭帯域コーデックに80~600msの可変遅延が乗ります。(2) エコーループ — AIが生成したTTS音声がPSTNを経由して戻り再びSTT → 翻訳 → TTSに入力される現象で、初期テストでは10通中8通がこのループに落ちました。(3) VAD失敗 — OpenAI Server VADはクリーンな広帯域入力を前提とするため、PSTN背景ノイズ（RMS 50~200）を「発話中」と誤判定し、`speech_stopped`イベントが15~72秒遅れて発火するか、まったく発火しません。',
    },
    hypothesis: {
      ko: '"방향별로 독립된 OpenAI Realtime 세션을 두 개 병렬로 돌리고, 두 세션 사이는 소프트웨어 전용 에코 게이팅 파이프라인으로 분리하면" 에코 루프와 저지연을 동시에 잡을 수 있다고 봤습니다.',
      en: 'Hypothesis: run two independent OpenAI Realtime sessions in parallel — one per direction — and isolate them with a software-only echo-gating pipeline. That should let us hold both no-echo and sub-second latency at once.',
      ja: '「方向ごとに独立したOpenAI Realtimeセッションを並列で2つ回し、両セッションをソフトウェア専用のエコーゲーティングパイプラインで分離すれば」エコーループと低遅延を同時に成立できると考えました。',
    },
    alternatives: {
      ko: '단일 세션 + 하드웨어 AEC, 단일 세션 + 후처리 노이즈 캔슬레이션도 검토했지만 PSTN 환경 변동성(통신사·단말·코덱)에서는 일관된 결과를 못 냈습니다. 또 SaaS 통역 솔루션은 양쪽 통화자 모두에게 클라이언트 설치를 요구해 제품 가설(앱 없이 일반 전화로 받기)에 맞지 않았습니다.',
      en: 'Considered single-session + hardware AEC and single-session + post-processing noise cancellation, but neither stayed consistent across the PSTN variability we faced (carrier / device / codec). Off-the-shelf SaaS translation services required client install on both ends, which broke our product hypothesis (no-app, regular phone).',
      ja: '単一セッション + ハードウェアAEC、単一セッション + 後処理ノイズキャンセルも検討しましたが、PSTN環境の変動性（キャリア・端末・コーデック）下では一貫した結果を出せませんでした。またSaaS通訳ソリューションは双方の通話者にクライアントインストールを要求し、製品仮説（アプリなし・普通の電話）に合いませんでした。',
    },
    decision: {
      ko: 'Dual-Session Echo Gating 아키텍처를 채택했습니다. 방향별 Realtime 세션 2개를 분리해서 돌리고, 두 세션 사이에 소프트웨어 에코 게이트를 두며, STT와 번역을 분리해 환각으로 인한 문장 추가를 차단했습니다.',
      en: 'Settled on a Dual-Session Echo Gating architecture. The shape in one line — two per-direction Realtime sessions kept separate, a software echo gate sitting between them, and STT split from translation so hallucinated additions can\'t leak in. Detailed configuration in the cards below.',
      ja: 'Dual-Session Echo Gatingアーキテクチャを採用しました。一行で要約すると — 方向ごとのRealtimeセッション2つを分離して回し、両セッションの間にソフトウェアエコーゲートを設置、STTと翻訳を分離して幻覚による文の追加を遮断しました。詳細構成は下のカードを参照。',
    },
    execution: {
      ko: '7단계 진화로 매 단계마다 깨지는 지점을 차례로 잡았습니다. 단일 세션은 에코를 못 잡았고, 단순 듀얼은 두 세션이 서로의 TTS를 듣고 무한 발화 루프에 빠졌습니다. 그 위에 (1) Echo Gate로 TTS 출력 시점에 자기 음성을 차단, (2) Energy Gate로 RMS 임계치 기반 PSTN 노이즈 필터링, (3) Silero VAD로 OpenAI Server VAD가 15~72초씩 지연되던 발화 종료 감지를 클라이언트 측에서 480ms 이내로 단축, (4) 세션 상태 공유 컨트롤러, (5) 발화권 우선순위 룰, (6) STT와 Translation 분리(Whisper-1 vs GPT-4o-mini), (7) 6-turn sliding context로 메모리 부담 통제까지 단계적으로 쌓아 운영 환경에서 종단 간 지연을 557ms까지 끌어내렸습니다.',
      en: 'Seven rounds of iteration, each pinpointing the specific layer that was breaking. A single session couldn\'t catch echo at all; a naïve dual ended in an infinite loop. On top of that we stacked: (1) Echo Gate — block your own voice when TTS is playing; (2) Energy Gate — filter PSTN noise via RMS threshold; (3) Silero VAD — replaced OpenAI Server VAD\'s 15-72 second speech-end delay with sub-480ms client-side detection; (4) shared session-state controller; (5) speaking-turn priority rules; (6) STT-Translation split (Whisper-1 vs GPT-4o-mini); (7) 6-turn sliding context to keep memory pressure bounded. In production this brought end-to-end latency down to ~557ms.',
      ja: '7段階の進化で毎段階の破綻点を順に潰しました。単一セッションではエコーを捕えられず、単純なデュアルは無限発話ループに陥りました。その上に (1) Echo Gate — TTS出力時に自音声を遮断、(2) Energy Gate — RMS閾値でPSTNノイズをフィルタ、(3) Silero VAD — OpenAI Server VADで15~72秒かかっていた発話終了検出をクライアント側で480ms以内に短縮、(4) セッション状態共有コントローラー、(5) 発話権優先順位ルール、(6) STT-翻訳分離（Whisper-1 vs GPT-4o-mini）、(7) 6ターンスライディングコンテキストでメモリ負担を制御 — と段階的に積み上げ、本番でエンドツーエンド遅延を557msまで詰めました。',
    },
    result: {
      ko: '실측 기준 평균 종단 간 지연 약 557ms, 148건의 실통화에서 0건의 에코 루프를 기록했습니다. 시스템 논문이 ACL 2026 System Demonstrations Track에 채택됐고, 수신자는 앱 설치 없이 일반 전화로 받기만 하면 양방향 통역이 동작하는 운영 단계에 도달했습니다. 대상 사용자는 국내 거주 외국인(2024년 기준 220만 명) · 재외 국민(280만 명) · 청각·언어 장애인(등록 39만 명) · 통화 회피 세대(MZ 약 40%)까지 포함합니다.',
      en: 'Measured ~557ms average end-to-end latency and 0 echo loops across 148 live production calls. The system paper was accepted to the ACL 2026 System Demonstrations Track, and the product reached the stage where the called party just picks up a regular phone — no install — and two-way translation runs. Target users span foreign residents in Korea (2.2M in 2024), overseas Koreans (2.8M), the hearing/speech-impaired (390K registered), and call-phobic Gen MZ (~40%).',
      ja: '実測平均エンド・ツー・エンド遅延約557ms、148件の実通話でエコーループ0件を記録しました。システム論文がACL 2026 System Demonstrations Trackに採択され、受信者がアプリなしで普通の電話で出るだけで双方向通訳が動作する運用段階に到達しました。対象ユーザーは在韓外国人（2024年220万人）・在外韓国人（280万人）・聴覚/言語障害者（登録39万人）・通話回避世代（MZ約40%）まで含みます。',
    },
    reflection: {
      ko: '에코 게이팅을 하드웨어 AEC가 아닌 소프트웨어 파이프라인으로 풀기로 한 결정이 핵심이었습니다. PSTN 환경 변동성을 정면으로 받는 대신 게이팅·VAD·상태 공유 3축으로 분해해 각각을 측정·튜닝 가능한 단위로 만들었기 때문에, 7단계 진화 안에서 정확히 어디가 깨지는지를 매번 짚을 수 있었습니다.',
      en: 'The pivotal call was choosing to solve echo with a software pipeline rather than hardware AEC. Instead of taking PSTN variability head-on, we decomposed the problem into gating, VAD, and shared state — three measurable, tunable axes. Across the seven iterations that decomposition let us pinpoint exactly which piece was breaking, every time.',
      ja: 'エコーゲーティングをハードウェアAECではなくソフトウェアパイプラインで解決した決定が核心でした。PSTN環境の変動性を正面から受ける代わりにゲーティング・VAD・状態共有の3軸に分解し、それぞれを測定・チューニング可能な単位にしたため、7段階の進化の中で毎回どこが壊れているかを正確に指摘できました。',
    },
    visuals: {
      decision: {
        image: {
          src: '/images/projects/wigvo_architecture.svg',
          alt: { ko: 'WIGVO Dual-Session Echo Gating 아키텍처', en: 'WIGVO Dual-Session Echo Gating architecture', ja: 'WIGVO Dual-Session Echo Gatingアーキテクチャ' },
          caption: { ko: '브라우저 클라이언트 ↔ 릴레이 서버(WebSocket) ↔ Twilio(PSTN). 방향별 Realtime 세션 2개를 AudioRouter가 3 파이프라인에 위임, 각 세션은 6턴 슬라이딩 컨텍스트를 독립 유지.', en: 'Browser ↔ relay server (WebSocket) ↔ Twilio (PSTN). The AudioRouter delegates two per-direction Realtime sessions across three pipelines; each session keeps its own 6-turn sliding context.', ja: 'ブラウザクライアント ↔ リレーサーバー（WebSocket）↔ Twilio（PSTN）。AudioRouterが方向ごとのRealtimeセッション2つを3パイプラインに委譲、各セッションは6ターンスライディングコンテキストを独立保持。' },
        },
        // decision 본문의 디테일을 카드 bullets로 분리해 본문은 짧게, 시각은 한눈에
        bullets: {
          ko: [
            '듀얼 세션 — Session A(브라우저→전화) · Session B(전화→브라우저)가 각자 system prompt와 6턴 슬라이딩 컨텍스트를 독립 유지',
            'AudioRouter — Strategy 패턴으로 V2V / T2V / FullAgent 3 파이프라인에 이벤트 위임',
            'STT-Translation 분리 — Realtime API의 Whisper-1은 STT만 담당, 번역은 GPT-4o-mini(temperature=0)가 별도 처리 + context_prune_keep=0으로 환각 문장 추가 차단',
          ],
          en: [
            'Dual sessions — Session A (browser→phone) and Session B (phone→browser) each keep their own system prompt and 6-turn sliding context',
            'AudioRouter — Strategy-pattern delegation across three pipelines (V2V / T2V / FullAgent)',
            'STT-Translation split — the Realtime API\'s Whisper-1 only handles STT; translation runs separately on GPT-4o-mini (temperature=0) with context_prune_keep=0 to block hallucinated additions',
          ],
          ja: [
            'デュアルセッション — Session A（ブラウザ→電話）とSession B（電話→ブラウザ）が独自のsystem promptと6ターンスライディングコンテキストを独立保持',
            'AudioRouter — StrategyパターンでV2V / T2V / FullAgent 3パイプラインにイベント委譲',
            'STT-翻訳分離 — Realtime APIのWhisper-1はSTTのみ、翻訳はGPT-4o-mini（temperature=0）で別途処理 + context_prune_keep=0で幻覚による文の追加を遮断',
          ],
        },
      },
      result: {
        metrics: [
          { value: '~557ms', label: { ko: '평균 종단 간 지연 (실측, 148건 통화 기준)', en: 'Average end-to-end latency (measured across 148 calls)', ja: '平均エンド・ツー・エンド遅延（148通話の実測）' } },
          { value: '0 / 148', label: { ko: '에코 루프 발생 / 실통화 (소프트웨어 게이팅 적용 후)', en: 'Echo loops / live calls after software gating', ja: 'エコーループ発生 / 実通話（ソフトウェアゲーティング適用後）' } },
          { value: 'ACL 2026', label: { ko: 'System Demonstrations Track 채택', en: 'System Demonstrations Track accepted', ja: 'System Demonstrations Track採択' } },
        ],
      },
    },
  },

  myunzy: {
    oneLiner: {
      ko: '내 이력서와 실제 채용공고로 AI 면접관을 자동으로 만들고, 작은 한국어 오픈 모델(EXAONE-4.5)을 음성·도구호출 하네스 위에서 굴려 끝까지 일관되게 압박하고 평가하며 세션 안에서 약점까지 학습하는 모의면접 플랫폼입니다. OBA Weekendthon S1 전체 Top 6, LG U+ Voice AI 트랙(EXAONE).',
      en: 'A mock-interview platform that auto-generates an AI interviewer from your résumé and a real job posting, then runs a small Korean open model (EXAONE-4.5) on a voice and tool-call harness so it can pressure, evaluate, and learn your weak points consistently across a whole session. Top 6 overall at OBA Weekendthon S1, LG U+ Voice AI Track (EXAONE).',
      ja: '自分の履歴書と実際の求人票からAI面接官を自動生成し、小さな韓国語オープンモデル（EXAONE-4.5）を音声・ツール呼び出しハーネスの上で動かして、最後まで一貫して圧迫し評価し、セッション内で弱点まで学習する模擬面接プラットフォームです。OBA Weekendthon S1 全体Top 6、LG U+ Voice AIトラック（EXAONE）。',
    },
    context: {
      ko: 'OBA Weekendthon은 1박 2일 동안 후원사 Open API와 오픈소스로 제품을 만드는 빌드 캠프였습니다. 심사 기준을 뜯어보니 "API·오픈소스 활용도"가 공통심사와 피어리뷰 양쪽에서 25%씩, 사실상 이중으로 걸려 있었습니다. 그래서 우리가 내린 결론은 분명했습니다. 직접 모델을 만들기보다, 오픈소스와 오픈모델을 잘 활용해 제품을 만드는 쪽에 점수가 몰려 있다는 것이었습니다.\n\n우리가 고른 건 LG U+ 트랙이었습니다. 자격요건이 두 가지였는데 둘 다 선택이 아니라 강제였습니다. 하나는 EXAONE를 실제로 쓰는 것, 다른 하나는 음성(Voice AI)으로 동작하는 것이었습니다. GPT-4o로 자유롭게 연기시키는 길은 처음부터 막혀 있었고, 작은 한국어 오픈 모델인 EXAONE-4.5로, 그것도 목소리로 굴러가는 제품을 만들어야 했습니다.\n\n마침 팀원들이 실제로 취업과 이직 면접을 앞두고 있던 시기였습니다. 그래서 우리가 당장 쓰고 싶은 것이 그대로 주제가 됐습니다. 그리고 EXAONE는 트랙이 강제한 모델이긴 했지만, 면접이라는 주제에는 오히려 유리한 카드였습니다. EXAONE는 LG가 만든 한국어 특화 오픈 모델이라 한국어 답변의 뉘앙스를 잘 잡는데, 면접은 한국어로 진행되고 우리가 하려던 일도 결국 지원자의 한국어 답변을 이해하고 머뭇거림이나 표현까지 분석하는 거였으니까요. 작은 모델이라는 점이 한국어 안에서는 약점이 아니었던 셈입니다. 진짜 질문은 여기서 나왔습니다. 한국어에 강한 작은 오픈 모델을, 그것도 음성으로 굴려서, 끝까지 무너지지 않는 면접관을 만들 수 있을까?',
      en: 'OBA Weekendthon was a 1.5-day build camp where you ship a product on sponsor Open APIs and open source. Reading the rubric closely, "API / open-source usage" counted for 25% on both the panel score and the peer review, effectively a double weight. So our own conclusion was clear: the points were concentrated on building a product by *using* open source and open models well, rather than on building your own model.\n\nThe track we entered was LG U+, and its eligibility came with two hard requirements, neither of them optional. One was using EXAONE for real; the other was running by voice (Voice AI). Free-acting everything with GPT-4o was off the table from the start. We had to build the interviewer on EXAONE-4.5, a small Korean open model, and make it work by voice.\n\nAs it happened, our teammates were preparing for real job and career-change interviews at the time, so the thing we wanted to use ourselves became the product. And EXAONE, even though the track forced it on us, turned out to be the right card for this topic rather than a limitation. EXAONE is a Korean-specialized open model from LG, so it reads the nuance of Korean answers well, and an interview is conducted in Korean and is ultimately about understanding the candidate’s Korean speech down to the hesitations and phrasing. Being a small model was not a weakness within Korean. That is where the real question came from: can a small, Korean-strong open model, running by voice, hold up as an interviewer all the way to the end?',
      ja: 'OBA Weekendthonは1泊2日でスポンサーのOpen APIとオープンソースを使って製品を作るビルドキャンプでした。審査基準を細かく見ると「API・オープンソース活用度」が共通審査とピアレビューの両方で25%ずつ、事実上二重に効いていました。だから私たちが出した結論は明確でした。自らモデルを作ることより、オープンソースやオープンモデルをうまく活用して製品を作るほうに点数が集中している、ということです。\n\n私たちが選んだのはLG U+トラックでした。資格要件は二つあり、どちらも任意ではなく必須でした。一つはEXAONEを実際に使うこと、もう一つは音声（Voice AI）で動作することです。GPT-4oで自由に演技させる道は最初から閉ざされており、小さな韓国語オープンモデルEXAONE-4.5で、しかも声で動く製品を作る必要がありました。\n\nちょうどチームメンバーが実際に就職・転職の面接を控えていた時期でした。だから自分たちが今すぐ使いたいものが、そのまま製品になりました。そしてEXAONEは、トラックが課したモデルではありましたが、面接というテーマにはむしろ有利なカードでした。EXAONEはLGが作った韓国語特化のオープンモデルで、韓国語の回答のニュアンスをよく捉えます。面接は韓国語で行われ、私たちがやろうとしたことも結局は応募者の韓国語の発話を理解し、ためらいや言い回しまで分析することでした。小さなモデルであることは、韓国語の中では弱点ではなかったわけです。本当の問いはここから生まれました。韓国語に強い小さなオープンモデルを、しかも音声で動かして、最後まで崩れない面接官を作れるか。',
    },
    problem: {
      ko: '작은 오픈 모델한테 프롬프트로 그냥 "면접관이 되라"고 시키면 세 군데에서 무너졌습니다. 첫째는 페르소나 드리프트입니다. 몇 턴만 지나면 압박하던 면접관이 친절한 챗봇으로 풀어졌습니다. 둘째는 tool-call이 자꾸 깨지는 문제였습니다. GPT-4o급의 안정적인 함수호출이 안 나오니까, 꼬리질문을 발사하거나 점수를 매기는 구조화된 도구호출이 비결정적으로 흔들렸습니다. 셋째는 평가 일관성이었습니다. 심사위원이 같은 답변을 두 번 넣었는데 점수가 달라지면 그 순간 신뢰를 잃습니다.\n\n게다가 해커톤이라 후원사 API의 키와 명세가 행사 당일까지 도착하지 않았습니다. 외부 8종(OCR·공고·평판·STT·TTS 등)에 의존한 채로 짜두면, 키가 안 오는 순간 데모 시연 자체가 불가능해질 위험이 있었습니다.',
      en: 'Telling a small open model to "be an interviewer" with a plain prompt broke in three places. The first was persona drift: within a few turns the pressuring interviewer relaxed back into a friendly chatbot. The second was tool-calls that kept failing. Without GPT-4o-grade function calling, the structured calls that fire a follow-up or produce a score wobbled non-deterministically. The third was evaluation consistency: the moment a judge fed the same answer twice and got a different score, trust was gone.\n\nOn top of that, because it was a hackathon, the sponsor API keys and specs would not arrive until the day of the event. Building directly against eight external dependencies (OCR, postings, reputation, STT, TTS, and so on) meant the demo could become impossible to run the moment a key failed to show up.',
      ja: '小さなオープンモデルにプロンプトで単に「面接官になれ」と指示すると、三か所で崩れました。一つ目はペルソナドリフトです。数ターン経つと圧迫していた面接官が親切なチャットボットに緩みました。二つ目はtool-callが何度も壊れる問題でした。GPT-4o級の安定した関数呼び出しが出ないため、追い質問を発火したり点数を付けたりする構造化ツール呼び出しが非決定的に揺れました。三つ目は評価の一貫性です。審査員が同じ回答を二度入れて点数が変われば、その瞬間に信頼を失います。\n\nさらにハッカソンなので、スポンサーAPIのキーと仕様が当日まで届きませんでした。外部8種（OCR・求人・評判・STT・TTSなど）に依存して組んでおくと、キーが来ない瞬間にデモ実演そのものが不可能になるリスクがありました。',
    },
    hypothesis: {
      ko: '모델을 더 키우는 대신, 모델 바깥에 결정론 하네스를 두면 작은 모델로도 일관성을 살 수 있다고 봤습니다. 베팅은 세 가지였습니다. 첫째, 턴 루프는 LangGraph식 결정론 컨트롤러가 잡고 모델은 발화만 담당하게 한다. 둘째, tool-call은 wrap_tool_call 미들웨어가 스키마를 검증하고 자동으로 다시 물어보면서 유효율을 끌어올린다. 셋째, 점수와 합격확률, 타이밍 같은 평가는 모델이 아니라 순수함수가 계산한다(랜덤 0). 이 세 가지가 맞으면, 작은 모델에 하네스를 얹은 것이 큰 모델의 자유연기를 대체할 수 있다는 가설이었습니다.',
      en: 'Instead of scaling the model up, we bet that putting a deterministic harness *outside* the model could buy consistency even from a small one. The bet had three parts. First, a LangGraph-style deterministic controller owns the turn loop and the model only speaks. Second, a wrap_tool_call middleware validates the schema and automatically re-asks, pushing tool-call validity up. Third, evaluation (score, pass probability, timing) is computed by pure functions rather than the model, with zero randomness. If all three held, a small model on a harness could stand in for a big model doing free-form acting.',
      ja: 'モデルを大きくする代わりに、モデルの外に決定論ハーネスを置けば小さなモデルでも一貫性を買えると考えました。賭けは三つでした。一つ目、ターンループはLangGraph式の決定論コントローラーが握り、モデルは発話だけを担う。二つ目、tool-callはwrap_tool_callミドルウェアがスキーマを検証し、自動で問い直して有効率を引き上げる。三つ目、点数や合格確率、タイミングなどの評価はモデルではなく純粋関数が計算する（ランダム0）。この三つが揃えば、小さなモデルにハーネスを付けたものが、大きなモデルの自由演技を代替できるという仮説でした。',
    },
    alternatives: {
      ko: 'GPT-4o로 전부 자유연기시키는 방식이 가장 쉬웠습니다. 하지만 트랙 자격(EXAONE 실활용)을 충족하지 못하고, OSS 활용도 점수가 0에 가깝고, 평가도 비결정적이라 탈락이었습니다. 룰 기반 질문 뱅크는 일관성은 있지만 이력서와 공고에 반응하지 못해서 "면접관 자동 생성"이라는 핵심 가치가 사라졌습니다. 직접 파인튜닝은 1박 2일에 불가능했고, 무엇보다 이 행사에서 직접 모델을 만드는 건 오히려 감점 신호였습니다. 결국 공개 오픈 모델(EXAONE)에 공개 미들웨어(DeepAgents·LangGraph)를 하네스로 얹는 길만이 트랙 자격과 활용도 점수, 일관성을 한 번에 만족했습니다.',
      en: 'Letting GPT-4o free-act everything was the easiest path, but it was a non-starter: it failed track eligibility (real EXAONE usage), scored close to zero on OSS usage, and was non-deterministic. A rule-based question bank was consistent but could not react to the résumé or the posting, so the core value of auto-generating the interviewer disappeared. Fine-tuning our own model was impossible in 1.5 days, and more importantly, building your own model was a negative signal at this event. In the end, only one path satisfied track eligibility, the usage score, and consistency at once: putting public middleware (DeepAgents, LangGraph) as a harness on top of a public open model (EXAONE).',
      ja: 'GPT-4oで全部自由演技させる方式が一番簡単でした。しかしトラック資格（EXAONE実活用）を満たさず、OSS活用度の点数がほぼ0で、評価も非決定的なので除外でした。ルールベースの質問バンクは一貫性はありますが、履歴書や求人に反応できないため「面接官の自動生成」という核心価値が消えました。自前のファインチューニングは1泊2日では不可能で、何よりこの行事で自らモデルを作るのはむしろ減点シグナルでした。結局、公開オープンモデル（EXAONE）に公開ミドルウェア（DeepAgents・LangGraph）をハーネスとして載せる道だけが、トラック資格と活用度の点数、一貫性を一度に満たしました。',
    },
    decision: {
      ko: '3-tier 듀얼 백엔드(mock-first) 구조를 잡고, 각 모듈을 DeepAgents 컴포넌트에 1:1로 매핑했습니다. harness.py는 wrap_tool_call 미들웨어(스키마 검증과 재시도), skills.py는 SkillsMiddleware(SKILL.md 한 장에 페르소나·STAR·플레이북), state.py는 StateBackend(세션이 끝나면 사라지는 weakness_profile 자가진화), engine.py는 LangGraph 결정론 컨트롤러(턴 루프와 verdict 순수집계), llm/base.py는 provider-agnostic 포트(mock과 EXAONE 토글)입니다. 그리고 BFF가 mock 엔진과 Python 프록시 사이를 분기하도록 만들어서, 키가 하나도 없어도 전 기능이 mock으로 완주하고 env만 켜면 무중단으로 실연동으로 승격됩니다. HARNESS=deepagents로 켜면 부트스트랩이 실제 deepagents·langchain 에이전트(wrap_tool_call·write_todos) 위에서 돌아갑니다.',
      en: 'We set up a 3-tier dual-backend (mock-first) structure and mapped each module 1:1 onto a DeepAgents component. harness.py is the wrap_tool_call middleware (schema validation and retry); skills.py is SkillsMiddleware (one SKILL.md holding persona, STAR, and playbook); state.py is the StateBackend (a session-volatile, self-evolving weakness_profile); engine.py is a LangGraph deterministic controller (turn loop and pure-function verdict); llm/base.py is a provider-agnostic port that toggles between mock and EXAONE. The BFF branches between a built-in mock engine and the Python proxy, so every feature runs to completion on mock with no keys at all, and flipping env vars promotes it to live integration with no downtime. With HARNESS=deepagents, bootstrap actually runs on real deepagents and langchain agents (wrap_tool_call, write_todos).',
      ja: '3-tierのデュアルバックエンド（mock-first）構造を組み、各モジュールをDeepAgentsコンポーネントに1:1でマッピングしました。harness.pyはwrap_tool_callミドルウェア（スキーマ検証と再試行）、skills.pyはSkillsMiddleware（SKILL.md一枚にペルソナ・STAR・プレイブック）、state.pyはStateBackend（セッションが終わると消えるweakness_profileの自己進化）、engine.pyはLangGraph決定論コントローラー（ターンループとverdictの純粋集計）、llm/base.pyはprovider-agnosticなポート（mockとEXAONEを切り替え）です。そしてBFFがmockエンジンとPythonプロキシの間を分岐するようにして、キーが一つもなくても全機能がmockで完走し、env切替で無停止のまま実連携へ昇格します。HARNESS=deepagentsで起動すると、ブートストラップが実際のdeepagents・langchainエージェント（wrap_tool_call・write_todos）の上で動きます。',
    },
    execution: {
      ko: '전체 흐름은 이렇습니다. 먼저 부트스트랩이 이력서 OCR과 채용공고, 회사 평판을 합쳐 Fit-Gap 공격포인트와 4개 페르소나(기술·컬처핏·임원·HR)를 만듭니다. 사용자가 면접 단계를 고르면 그 순서가 곧 라운드가 되고, 직무 키워드를 감지해 backend·frontend·pm 플레이북이 자동으로 스왑됩니다. 턴 루프에서는 답변의 약점 신호를 잡으면 라운드당 최대 2번 꼬리질문을 던지고, 그 약점을 weakness_profile에 쌓아 단계가 바뀌어도 직전 약점을 이어서 파고듭니다. 음성 면접은 webm으로 녹음한 뒤 Qwen3 ASR로 전사하고(단어 타임스탬프 포함) 머뭇거림과 필러를 분석하며, 면접관 목소리도 골라 들을 수 있습니다. 끝까지 지킨 원칙은 정직성입니다. mock으로 동작하는 부분은 면접관 발화에서 실제 인용인 척 꾸미지 않고, 작업 로그에 [mock] 배지를 그대로 노출했습니다.',
      en: 'The whole flow goes like this. First, bootstrap fuses résumé OCR, the job posting, and company reputation into Fit-Gap attack points and four personas (technical, culture-fit, executive, HR). When the user picks the interview stages, that order becomes the rounds, and a job-keyword detector auto-swaps the backend, frontend, or pm playbook. In the turn loop, catching a weakness signal fires up to two follow-ups per round, and that weakness accumulates in the weakness_profile so the next stage keeps digging into the prior weak spot. The voice interview records in webm, transcribes with Qwen3 ASR (including word-level timestamps), and analyzes hesitation and fillers, and you can pick the interviewer’s voice. The principle we held to the end was honesty: anything running on mock was never dressed up as a real citation in the interviewer’s speech, and the work log showed a [mock] badge as-is.',
      ja: '全体の流れはこうです。まずブートストラップが履歴書OCRと求人票、企業評判を合わせてFit-Gap攻撃ポイントと4つのペルソナ（技術・カルチャーフィット・役員・HR）を作ります。ユーザーが面接段階を選ぶとその順序がそのままラウンドになり、職務キーワードを検知してbackend・frontend・pmのプレイブックが自動でスワップされます。ターンループでは回答の弱点シグナルを捕えるとラウンドあたり最大2回追い質問を投げ、その弱点をweakness_profileに積んで、段階が変わっても直前の弱点を続けて突きます。音声面接はwebmで録音したあとQwen3 ASRで文字起こしし（単語タイムスタンプ付き）、ためらいやフィラーを分析します。面接官の声も選んで聞けます。最後まで守った原則は正直さです。mockで動く部分は面接官の発話で実際の引用のように装わず、作業ログに[mock]バッジをそのまま出しました。',
    },
    result: {
      ko: 'OBA Weekendthon S1에서 전체 메인 프라이즈 Top 6에 들었습니다(전 트랙 종합). 키가 하나도 없이 mock으로 전 기능이 완주하는 단독 데모에, EXAONE-4.5 실연동과 실제 DeepAgents 부트스트랩(wrap_tool_call·write_todos), Qwen3 STT/TTS까지 묶어서 1박 2일 안에 동작하는 제품을 완성했습니다. 작업 로그 패널이 ocr → job → fitgap → persona → playbook → harness.validate/retry → followup.fire → evolve.diff를 실시간으로 흘려보내서, "agentic"과 "하네스"가 말이 아니라 화면에서 그대로 보이게 만들었습니다. 점수는 순수함수로 계산하니까 심사위원이 같은 답변을 다시 넣어도 똑같이 재현됐습니다. LG U+ Voice AI(EXAONE)와 GS네오텍 MISO 트랙 요건에도 정면으로 맞췄습니다.',
      en: 'We placed Top 6 in the overall main prize at OBA Weekendthon S1 (across all tracks). On top of a standalone demo where every feature runs to completion on mock with no keys, we bundled real EXAONE-4.5 integration, a real DeepAgents bootstrap (wrap_tool_call, write_todos), and Qwen3 STT/TTS into a working product within 1.5 days. The work-log panel streams ocr → job → fitgap → persona → playbook → harness.validate/retry → followup.fire → evolve.diff in real time, so "agentic" and "harness" show up on screen instead of just in words. Because scores are computed by pure functions, a judge re-entering the same answer reproduces the identical result. It also lined up directly with the LG U+ Voice AI (EXAONE) and GS Neotek MISO track requirements.',
      ja: 'OBA Weekendthon S1で全体メインプライズTop 6に入りました（全トラック総合）。キーが一つもなくてもmockで全機能が完走する単独デモに、EXAONE-4.5の実連携と実際のDeepAgentsブートストラップ（wrap_tool_call・write_todos）、Qwen3 STT/TTSまで束ねて、1泊2日で動作する製品を完成させました。作業ログパネルがocr → job → fitgap → persona → playbook → harness.validate/retry → followup.fire → evolve.diffをリアルタイムに流し、「agentic」と「ハーネス」が言葉ではなく画面にそのまま表れるようにしました。点数は純粋関数で計算するので、審査員が同じ回答を再入力しても同一に再現されました。LG U+ Voice AI（EXAONE）とGSネオテックMISOトラックの要件にも正面から合わせました。',
    },
    reflection: {
      ko: '작은 모델이 약한 게 아니라, 받쳐줄 하네스가 없을 때 약해 보였을 뿐입니다. 일관성을 만든 건 모델의 크기가 아니라 모델 바깥의 결정론 구조였습니다. WIGVO에서는 그게 에코 게이팅이었고, WIGTN FLAKE에서는 라우팅, 여기서는 tool-call 검증과 재시도였을 뿐 매번 같은 교훈이 돌아왔습니다. 하나 더 배운 건, mock을 [mock] 배지로 정직하게 드러낸 결정이 오히려 신뢰를 키웠다는 점입니다. 무엇이 진짜 실연동이고 무엇이 폴백인지 심사위원이 화면에서 바로 구분할 수 있었기 때문입니다.',
      en: 'A small model is not weak; it only looks weak when there is no harness behind it. What produced consistency was never the model’s size but the deterministic structure outside it. In WIGVO that was echo gating, in WIGTN FLAKE it was routing, and here it was tool-call validation and retry, but the same lesson kept coming back. One more thing we learned: choosing to expose mocks honestly with a [mock] badge actually built more trust, because judges could tell at a glance which parts were real integrations and which were fallbacks.',
      ja: '小さなモデルが弱いのではなく、支えるハーネスがない時に弱く見えただけでした。一貫性を生んだのはモデルの大きさではなく、モデルの外の決定論構造でした。WIGVOではそれがエコーゲーティング、WIGTN FLAKEではルーティング、ここではtool-callの検証と再試行でしたが、毎回同じ教訓が返ってきました。もう一つ学んだのは、mockを[mock]バッジで正直に見せた決定がむしろ信頼を高めたことです。何が本当の実連携で何がフォールバックかを、審査員が画面で即座に区別できたからです。',
    },
    visuals: {
      problem: {
        bullets: {
          ko: [
            '페르소나 드리프트: 몇 턴 지나면 압박 면접관이 친절한 챗봇으로 풀어짐',
            'tool-call 무효: GPT급 안정 함수호출이 없어 꼬리질문·점수 산출이 비결정적으로 흔들림',
            '평가 일관성: 같은 답변에 점수가 달라지면 신뢰 상실, 게다가 키·명세가 당일까지 미도착',
          ],
          en: [
            'Persona drift: within a few turns the pressure interviewer relaxes into a friendly chatbot',
            'Invalid tool-calls: without GPT-grade function calling, follow-ups and scoring wobble non-deterministically',
            'Evaluation consistency: a different score on the same answer kills trust, and keys/specs arrive only on event day',
          ],
          ja: [
            'ペルソナドリフト: 数ターンで圧迫面接官が親切なチャットボットに緩む',
            'tool-call無効: GPT級の安定した関数呼び出しがなく追い質問・採点が非決定的に揺れる',
            '評価の一貫性: 同じ回答で点数が変われば信頼を失う。さらにキー・仕様が当日まで未着',
          ],
        },
      },
      decision: {
        image: {
          src: '/images/projects/myunzy.svg',
          alt: { ko: 'Myunzy 아키텍처: EXAONE 위에 얹은 도구호출 하네스', en: 'Myunzy architecture: a tool-call harness on top of EXAONE', ja: 'Myunzyアーキテクチャ: EXAONEの上に載せたツール呼び出しハーネス' },
          caption: { ko: '3-tier 듀얼 백엔드(mock-first). BFF가 mock 엔진과 Python 프록시 사이를 분기하고, 각 모듈이 DeepAgents 컴포넌트(wrap_tool_call·SkillsMiddleware·StateBackend·LangGraph)에 1:1로 매핑됩니다.', en: '3-tier dual backend (mock-first). The BFF branches between a mock engine and the Python proxy, and each module maps 1:1 onto a DeepAgents component (wrap_tool_call, SkillsMiddleware, StateBackend, LangGraph).', ja: '3-tierのデュアルバックエンド（mock-first）。BFFがmockエンジンとPythonプロキシの間を分岐し、各モジュールがDeepAgentsコンポーネント（wrap_tool_call・SkillsMiddleware・StateBackend・LangGraph）に1:1でマッピングされます。' },
        },
      },
      result: {
        metrics: [
          { value: 'Top 6', label: { ko: 'OBA Weekendthon S1 전체 메인 프라이즈 (전 트랙 종합)', en: 'Overall main prize, OBA Weekendthon S1 (all tracks)', ja: 'OBA Weekendthon S1 全体メインプライズ（全トラック総合）' } },
          { value: 'EXAONE-4.5', label: { ko: 'LG 한국어 특화 오픈 모델 실연동 (한국어 답변 평가에 유리)', en: 'LG Korean-specialized open model, real integration (fits Korean-answer evaluation)', ja: 'LG韓国語特化オープンモデル実連携（韓国語回答の評価に有利）' } },
          { value: 'DeepAgents', label: { ko: 'wrap_tool_call·write_todos 실제 부트스트랩', en: 'Real bootstrap on wrap_tool_call · write_todos', ja: 'wrap_tool_call・write_todos 実ブートストラップ' } },
          { value: 'Qwen3 음성', label: { ko: '음성 면접에서 단어 타임스탬프로 머뭇거림·필러 분석', en: 'Voice interview: word-timestamp hesitation / filler analysis', ja: '音声面接で単語タイムスタンプによりためらい・フィラーを分析' } },
        ],
      },
    },
  },
}
