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

// Legacy 3-slot reports (about / role / highlights) — only Career projects use
// this form. WIGTN side projects rely entirely on the v1 9-slot story blocks
// below, so the legacy map is intentionally Partial.
export const careerReports: Partial<Record<CareerReportKey, CareerReport>> = {
  'oem-integration-server': {
    about: {
      ko: '노란마켓 같은 B2B 파트너사와 협력해, 갤럭시 공부폰 등 어린이용 특화 디바이스에 사전 탑재되는 자녀 안심 서비스의 통합 인증·권한 인프라. 파트너별 화이트라벨 서비스가 공유하는 단일 인증 인프라 위에서 자녀 위치 조회(오디야)와 자녀 디바이스 원격 제어(모하니)를 동시 수용해야 하며, 파트너 단위 권한 분리와 운영 추적성을 동시에 보장해야 하는 환경이었습니다.',
      en: 'A unified auth and authorization backbone for child-safety services pre-installed on OEM-specialized devices (Galaxy Studyphone, etc.) for B2B partners like Yellow Market. The infrastructure had to host multiple white-label services (Odiya for child location, Mohani for remote device control) on top of a single auth platform while keeping per-partner permission isolation and operational traceability.',
      ja: 'イエローマーケットなどB2BパートナーのGalaxy Studyphoneなど子供向け特化デバイスに事前搭載される子供安心サービスの統合認証・権限インフラ。パートナー別ホワイトラベルサービスが共有する単一認証基盤上で、子供位置確認（オディヤ）と子供デバイス遠隔制御（モハニ）を同時に収容し、パートナー単位の権限分離と運用追跡性を保証する必要のある環境でした。',
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
      ko: '자녀 디바이스 원격 제어 서비스 모하니. Samsung Knox SDK와 AccessibilityService를 결합해 보호자 정책 기반 시스템 레벨 차단·원격 제어를 제공하며, FCM 기반 원격 명령을 안정적으로 처리해야 하는 환경이었습니다.',
      en: 'Mohani, a remote child-device control service. The product combined Samsung Knox SDK with AccessibilityService to provide guardian-policy-driven system-level blocking and remote control, with FCM-based commands delivered reliably across the OEM fleet.',
      ja: 'モハニ — 子供デバイス遠隔制御サービス。Samsung Knox SDKとAccessibilityServiceを組み合わせ、保護者ポリシーに基づくシステムレベル遮断・遠隔制御を提供し、FCMベースの遠隔コマンドを安定的に処理する必要のある環境でした。',
    },
    role: {
      ko: 'Samsung Knox Firewall 기반 API 도메인 차단과 AccessibilityService 기반 앱 실시간 감지·차단 시스템을 개발해 보호자 정책 기반 디바이스 도메인 제어와 실시간 사용 제어를 구현했습니다. React Native Bridge와 Knox IPC, Android Broadcast가 얽힌 ANR 문제를 Native 비동기 분리로 해결해 원격 제어 안정성을 확보했습니다.',
      en: 'Built Samsung Knox Firewall–based API domain blocking and AccessibilityService-based real-time app detection / blocking, implementing guardian-policy device-domain control and live usage control. Diagnosed and resolved a recurring ANR caused by React Native Bridge, Knox IPC, and Android Broadcast interactions by offloading heavy native work to a background async pipeline — restoring real-time control stability.',
      ja: 'Samsung Knox FirewallベースのAPIドメイン遮断とAccessibilityServiceベースのアプリリアルタイム検知・遮断システムを開発し、保護者ポリシーに基づくデバイスドメイン制御とリアルタイム使用制御を実装。React Native Bridge・Knox IPC・Android Broadcastが絡んだANR問題をNative非同期分離で解決し、遠隔制御の安定性を確保しました。',
    },
    highlights: {
      ko: [
        'Samsung Knox Firewall 기반 API 도메인 차단 — 보호자 정책 기반 디바이스 도메인 제어 지원',
        'AccessibilityService 기반 앱 실시간 감지·차단 시스템 — 제품 핵심 기능인 실시간 사용 제어 구현',
        'FCM 기반 command / request-response 구조 설계 — 원격 디바이스 제어 기능 구현',
        'React Native Bridge Queue 병목 + Knox IPC 지연 + Android Broadcast timeout이 얽힌 ANR 문제 분석',
        '무거운 Native 작업을 백그라운드 비동기 처리 구조로 분리 — 반복 발생하던 ANR 제거',
      ],
      en: [
        'Samsung Knox Firewall–based API domain blocking — guardian-policy device-domain control',
        "AccessibilityService-based real-time app detection / blocking — implemented the product's core live-usage-control feature",
        'FCM-based command / request-response architecture — remote device control',
        'Diagnosed an ANR caused by React Native Bridge Queue contention + Knox IPC latency + Android Broadcast timeout',
        'Offloaded heavy native work to a background async pipeline — eliminated the recurring ANR',
      ],
      ja: [
        'Samsung Knox FirewallベースAPIドメイン遮断 — 保護者ポリシーに基づくデバイスドメイン制御',
        'AccessibilityServiceベースのアプリリアルタイム検知・遮断システム — 製品のコア機能であるリアルタイム使用制御を実装',
        'FCMベースのcommand / request-response構造設計 — 遠隔デバイス制御',
        'React Native Bridge Queueボトルネック + Knox IPC遅延 + Android Broadcast timeoutが絡んだANR問題を分析',
        '重いNative処理をバックグラウンド非同期処理構造に分離 — 反復発生していたANRを除去',
      ],
    },
  },

  odiya: {
    about: {
      ko: '자녀 실시간 위치 조회 서비스 오디야. 노란마켓·공부폰 OEM 사전탑재로 분당 3,000~5,000건 규모의 위치 데이터를 처리하면서, 안심존 출입 감지와 자녀 디바이스 위치 알림을 안정적으로 제공해야 하는 환경이었습니다.',
      en: 'Odiya, a real-time child location-tracking service pre-installed on Yellow Market & Studyphone OEM devices. The system had to handle 3,000~5,000 location events per minute while delivering safe-zone entry/exit detection and child-device location alerts without downtime.',
      ja: 'オディヤ — 子供のリアルタイム位置確認サービス。イエローマーケット・スタディフォンOEMに事前搭載され、分間3,000~5,000件規模の位置データを処理しながら、安心ゾーン出入検知と子供デバイス位置通知を安定提供する必要のある環境でした。',
    },
    role: {
      ko: '분당 3,000~5,000건 규모의 위치 데이터 처리 병목을 Redis 버퍼링·배치 구조 재설계로 해소해 DB 쓰기 부하를 95% 줄였고, 인프라 증설 비용 없이 서비스 운영을 안정화했습니다. Haversine distance 기반 안심존 출입 감지와 HotUpdater + Supabase OTA 코드 푸시 파이프라인까지 구축했고, App Store / Google Play 출시·운영을 담당하며 오디야 안정화·고도화 과정에서 B2B 사업 매출 약 230% 성장에 기여했습니다.',
      en: 'Re-architected the 3,000~5,000 events/min location pipeline with Redis buffering + batch processing, cutting DB write load by 95% and stabilizing the service without any infra scale-up. Implemented Haversine-based safe-zone entry/exit detection and built a HotUpdater + Supabase OTA code-push pipeline. Shipped and operated the app on App Store / Google Play, contributing to ~230% B2B revenue growth during Odiya stabilization and expansion.',
      ja: '分間3,000~5,000件規模の位置データ処理ボトルネックをRedisバッファリング・バッチ構造再設計で解消し、DB書き込み負荷を95%削減、インフラ増設費用なしでサービス運用を安定化しました。Haversine distanceベースの安心ゾーン出入検知とHotUpdater + Supabase OTAコードプッシュパイプラインまで構築。App Store / Google Playリリース・運用を担当し、オディヤの安定化・高度化過程でB2B事業売上約230%成長に貢献しました。',
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
      ko: '기존 React 웹 코드베이스를 React Native 기반 앱으로 마이그레이션해 App Store / Play Store에 출시했고, 웹과 앱 양쪽에서 공통으로 사용하는 비즈니스 로직을 Custom Hook 기반으로 모듈화해 채널 일원화를 진행했습니다. GSAP과 SVG Path Animation을 활용한 알파벳 트레이싱 기능을 구현했고, 5,000개 이상의 인터랙티브 학습 활동을 제작했습니다.',
      en: 'Migrated the existing React web codebase to a React Native app, shipped to App Store / Play Store, and unified channels by modularizing shared business logic as Custom Hooks for both web and app. Built the alphabet-tracing feature with GSAP + SVG Path Animation and personally authored 5,000+ interactive learning activities.',
      ja: '既存のReact WebコードベースをReact NativeベースのアプリへマイグレーションしApp Store / Play Storeでリリース、Web/アプリ両方で共通利用するビジネスロジックをCustom Hookベースでモジュール化しチャネル一元化を進めました。GSAP + SVG Path Animationを活用したアルファベットトレーシング機能を実装し、5,000以上のインタラクティブ学習アクティビティを直接制作しました。',
    },
    highlights: {
      ko: [
        '기존 React 웹 코드베이스 → React Native 앱 마이그레이션 및 App Store / Play Store 출시 — 모바일 채널까지 사업 영역 확장',
        'Custom Hook 기반 비즈니스 로직 모듈화 — 웹·앱 공통 로직 재사용 구조 구축',
        'GSAP + SVG Path Animation 기반 알파벳 트레이싱 기능 구현',
        '모바일·웹 채널 일원화 및 5,000+ 인터랙티브 학습 활동 제작',
      ],
      en: [
        'Migrated React web codebase → React Native app, shipped to App Store / Play Store — extended the business to a mobile channel',
        'Custom Hook–based business-logic modularization — shared logic reused across web and app',
        'Alphabet tracing built with GSAP + SVG Path Animation',
        'Unified mobile / web channels and authored 5,000+ interactive learning activities',
      ],
      ja: [
        '既存のReact WebコードベースをReact NativeアプリへマイグレーションしApp Store / Play Storeリリース — モバイルチャネルまで事業領域拡張',
        'Custom Hookベースのビジネスロジックモジュール化 — Web・アプリ共通ロジック再利用構造を構築',
        'GSAP + SVG Path Animationベースのアルファベットトレーシング機能を実装',
        'モバイル・Webチャネル一元化と5,000+のインタラクティブ学習アクティビティ制作',
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
      ko: '외주사 코드의 DB 부하 사태(MySQL CPU 100%)를 Redis List 버퍼 + 60초 batch + RANGE 파티션 구조로 재설계해 DB 쓰기 부하 ~95%를 줄이고, 인프라 증설 없이 운영을 안정화했습니다.',
      en: 'Reworked an inherited outsourced codebase that was driving MySQL CPU to 100% — a Redis List buffer + 60s batch + daily RANGE partition rebuild cut DB write load by ~95% and stabilized operations without scaling infra.',
      ja: '外注コードのDB過負荷（MySQL CPU 100%）を、Redis Listバッファ + 60秒batch + RANGEパーティション日次再構成で再設計し、DB書き込み負荷を~95%削減、インフラ増設なしで運用を安定化しました。',
    },
    context: {
      ko: '사운드마인드 합류 후 첫 프로젝트로 오디야를 맡았습니다. 외주사가 만든 부모-자녀 위치 공유 서비스(노란마켓·공부폰 OEM 사전탑재)를 팀장으로서 리딩하며 위치 파이프라인 전체를 다시 설계했습니다.',
      en: 'First project after joining Soundmind. Took over the inherited parent-child location service (pre-installed on Yellow Market / Studyphone OEM) and re-designed the location pipeline end-to-end as team lead.',
      ja: 'サウンドマインド入社後の最初のプロジェクト。外注が作った親子位置共有サービス（イエローマーケット・公부폰OEM事前搭載）をチームリーダーとして引き継ぎ、位置パイプライン全体を設計し直した。',
    },
    problem: {
      ko: '외주사 코드는 자녀 단말 좌표 송출마다 JPA save() 단건 INSERT를 호출했고, 같은 흐름에서 안전구역 평가 SQL까지 누적돼 MySQL CPU가 100%에 도달했습니다. 즉 "몰아치는 쓰기"와 "사용자마다 최신 좌표 한 건이면 충분한 읽기"가 같은 경로에서 직렬로 돌고 있었습니다. 단말 수 × 송출 빈도가 선형으로 늘어 인프라 증설 외에는 길이 보이지 않던 시점이었습니다.',
      en: 'The vendor code called JPA `save()` per coordinate from every child device, and safe-zone evaluation SQL piled onto the same flow — MySQL CPU pegged at 100%. The structural issue was that "burst writes" and "reads that only need the latest coordinate per user" were running serially on the same path. With load scaling linearly with devices × send rate, scaling infra looked like the only path.',
      ja: '外注コードは子供端末の座標送出ごとにJPA save() 単件INSERTを呼び、同じフローで安全ゾーン評価SQLまで累積してMySQL CPUが100%に到達。本質的にはburst writeと「ユーザーごとの最新1点で十分なread」が同じpathで直列に動いていた構造でした。台数×送出頻度が線形に増え、インフラ増設以外の道が見えなかった時点。',
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
      ko: 'Redis를 두 갈래로 활용했습니다. write는 List에 push 후 60초 batch로 DB에 적재하고, read는 Hash 캐시 hit으로 흡수합니다. DB는 일자 RANGE 파티션으로 모델링했고, 매일 자정 다음날 파티션 생성과 15일 전 파티션 삭제를 자동화했습니다. 단일 Redis는 의도된 절충이며, 트래픽 임계치가 넘어가면 Sentinel/Cluster로 옮길 경로는 모니터링으로 열어두었습니다.',
      en: 'Redis split in two — writes push to a List, drained to the DB every 60 s; reads served from a Hash cache. DB is `RANGE(TO_DAYS(date))` partitioned with nightly create-next-day / drop-15-days-old. Single-Redis is an intentional trade-off; the Sentinel / Cluster path is left open behind list-depth and batch-duration thresholds.',
      ja: 'Redisを2用途で — writeはListにpush後60秒batchでDB投入、readはHashキャッシュhitで吸収。DBは日次RANGEパーティション + 毎日0時に翌日パーティション生成・15日前削除を自動化。単一Redisは意図的trade-off（List長・batch所要時間の閾値監視でSentinel/Cluster移行経路は確保）。',
    },
    execution: {
      ko: '처음부터 "버퍼 + 배치" 개념으로 직진했고, 다른 형태로 갔다가 옮긴 시행착오는 없었습니다. 운영 중에는 자녀 단말의 GPS 신호가 튀는 케이스(짧은 시간 안에 비현실적인 거리만큼 좌표가 점프하는 현상)가 안전구역 평가를 왜곡시키는 문제가 보여, 60초 이내 1,500m 이상 이동한 경우 안전구역 평가를 건너뛰는 보조 규칙을 추가했습니다.',
      en: 'Went straight to "buffer + batch" — no detour or pivot. During operation, GPS-noise cases on child devices (coordinates jumping an unrealistic distance in a short window) were distorting safe-zone evaluation, so I added a guard rule that skips safe-zone evaluation when a user moves more than 1,500 m within 60 seconds.',
      ja: '最初から「バッファ + バッチ」で直進し、別形態から移ったような試行錯誤はありませんでした。運用中、子供端末のGPS信号が跳ねるケース（短時間に非現実的な距離で座標がジャンプする現象）が安全ゾーン評価を歪める問題が見え、60秒以内に1,500m以上移動した場合は安全ゾーン評価をスキップする補助ルールを追加しました。',
    },
    result: {
      ko: 'MySQL CPU 100%까지 치솟던 사태가 해소되어, 인프라 증설 없이 운영이 안정화됐습니다. DB 쓰기 부하는 분당 INSERT 기준 약 95% 감소했고, 이 안정화가 노란마켓·공부폰 OEM 사전탑재 확장의 전제가 되어 회사 B2B 매출 약 230% 성장에 기여했습니다.',
      en: 'MySQL CPU stopped pegging — operations stabilised with zero new infra. DB write load down ~95% measured by inserts per minute. That stability became the prerequisite for the Yellow Market / Studyphone OEM pre-install expansion, contributing to ~230% B2B revenue growth at the company.',
      ja: 'MySQL CPU 100%事態を解消 — インフラ増設なしで運用安定化。DB書き込み負荷は分単位INSERT基準で~95%削減。この安定化がイエローマーケット・公부폰OEM事前搭載拡張の前提となり、会社B2B売上~230%成長に寄与。',
    },
    improvements: {
      ko: '두 가지를 다시 한다면 다르게 잡았을 것입니다. 첫째, 인계받은 외주사 코드에 운영 메트릭이 거의 없는 상태였기 때문에 MySQL CPU가 100%까지 치솟는 것을 본 뒤에야 Redis 도입을 결정하는 사후 대응이 됐습니다. 인계 첫 단계에서 분당 INSERT 추이·DB CPU·Redis List 길이·60초 배치 소요 시간을 Prometheus + Grafana로 먼저 박아 임계점에 도달하기 전에 신호를 받는 쪽으로 가져갔어야 했습니다. 둘째, 운영 중 추가한 GPS 노이즈 보조 규칙의 60초·1,500m 임계값은 운영 데이터로 검증한 값이 아니라 직관으로 정한 휴리스틱이라, 거짓 양성 분포를 운영 데이터로 측정해 다시 잡는 것이 다음 단계입니다.',
      en: 'Two things I would do differently. First, the inherited vendor code had almost no operational metrics, so the Redis migration was reactive — it only kicked off after MySQL CPU pegged at 100%. From day one of the handover, I should have wired Prometheus + Grafana around inserts per minute, DB CPU, Redis list depth, and 60-second batch duration so we get signal before the threshold breaks. Second, the GPS-noise guard rule (60 s / 1,500 m) was set by intuition, not calibrated against production data — the next step is to measure the false-positive distribution from real traffic and re-tune the thresholds.',
      ja: 'やり直すなら2点は別の進め方をします。第一に、引継いだ外注コードに運用メトリクスがほぼ無く、MySQL CPU 100%到達を見てからRedis導入を決めた事後対応となりました。引継ぎ初日からPrometheus + Grafanaで分単位INSERT推移・DB CPU・Redis List長・60秒バッチ所要時間を可視化し、閾値到達前にシグナルを受ける側に持っていくべきでした。第二に、運用中に追加したGPSノイズ補助ルールの60秒・1,500m閾値は運用データ検証なしの直感ヒューリスティックで、偽陽性分布を実運用データで測定し再調整するのが次のステップです。',
    },
    reflection: {
      ko: '다시 한다면 관측 지표를 처음부터 박았을 것입니다. Redis 도입은 "MySQL CPU가 100%까지 치솟는 걸 보고" 시작한 사후 대응이었는데, 분당 INSERT 추이·Connection Pool 사용률·DB CPU%·Redis List 길이·60초 배치 소요 시간을 Prometheus + Grafana로 시각화했다면 임계점에 도달하기 전에 신호를 받을 수 있었을 것입니다. 단일 Redis 인스턴스가 SPOF로 남은 부분도 같은 맥락이라, 메트릭이 있었다면 Sentinel/Cluster 도입 우선순위를 더 일찍 올렸을 것이라 봅니다. 운영 중 추가한 GPS 튐 필터(1,500m·60초)의 임계값도 데이터 분석 없이 직관으로 정한 휴리스틱이라, 휴리스틱을 데이터로 검증하는 단계를 건너뛴 점이 솔직히 후회됩니다.',
      en: 'If I were to start over, I would wire observability in from day one. The Redis migration was reactive, kicked off after watching MySQL CPU peg at 100%. Charting inserts per minute, connection pool usage, DB CPU%, Redis list depth, and 60-second batch duration in Prometheus + Grafana would have given me a signal before the threshold was breached. The single-Redis SPOF falls in the same category: with metrics in place I would have raised the priority on Sentinel or Cluster sooner. The GPS-noise heuristic (1,500m / 60s) is another honest regret. The thresholds were intuited, not validated against production data, and I skipped the step of grounding the heuristic in numbers.',
      ja: 'やり直すならobservabilityを初日から組み込みます。Redis導入は「MySQL CPUが100%に達するのを見て」始めた事後対応で、分単位INSERT推移・Connection Pool使用率・DB CPU%・Redis List長・60秒バッチ所要時間をPrometheus + Grafanaで可視化していれば、閾値到達前にシグナルを受けられたはずです。単一Redisが SPOFのまま残っている点も同じ流れで、メトリクスがあればSentinel/Cluster導入優先度を早く上げていたと考えます。運用中に追加したGPS雑音フィルタ（1500m・60秒）の閾値もデータ検証なしで直感で決めたヒューリスティックで、ヒューリスティックを数値で裏付ける段階を飛ばした点は率直に悔いが残ります。',
    },
    visuals: {
      problem: {
        metrics: [
          { value: '100%', label: { ko: 'MySQL CPU 도달', en: 'MySQL CPU peg', ja: 'MySQL CPU 到達' } },
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
              { ko: 'Redis 버퍼 + 60초 batch', en: 'Redis buffer + 60s batch', ja: 'Redisバッファ + 60秒batch' },
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
        metrics: [
          { value: '~95%', label: { ko: 'DB 쓰기 부하 감소 (분당 INSERT)', en: 'DB write load (inserts/min)', ja: 'DB書き込み負荷削減 (分単位INSERT)' } },
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
      ko: '서비스는 계속 추가되는데 매번 회원가입을 따로 받는 구조가 사용자 불편과 운영 부담으로 누적되고 있어, 통합 OEM 인증을 회사에 제안해 채택을 받고 팀장으로서 리딩하며 HS256 JWT, Refresh Token Family 재사용 탐지, DLQ 테이블과 운영자 콘솔, 3단계 휴면·탈퇴 라이프사이클까지 처음부터 설계·구현했습니다.',
      en: 'New services kept being added and each one signed users up from scratch — that was hurting both UX and operations. I proposed a unified OEM auth platform, got it approved, and led the team that built it from zero: HS256 JWT, refresh-token family reuse detection, a webhook DLQ table with an operator console, and a three-stage dormancy and withdrawal lifecycle.',
      ja: 'サービスが追加されるたびに会員登録をやり直す構造がユーザー体験と運用負荷の双方を圧迫していたため、統合OEM認証を社内に提案して採用され、チームリーダーとしてHS256 JWT、Refresh Tokenファミリー再利用検知、Webhook DLQテーブルと運用者コンソール、3段階の休眠・退会ライフサイクルをゼロから設計・実装した。',
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
      ko: '자녀 토큰을 길게 잡은 이유는, 자녀폰의 백그라운드 강제 종료와 네트워크 끊김이 일상이라 표준 회전 패턴으로는 위치 전송이 끊기고 그게 곧 보호자 컴플레인으로 이어지기 때문입니다. 그래서 부모 쪽은 표준 토큰 회전을 그대로 쓰고, 자녀 쪽은 길게 발급한 토큰을 DB에 안전하게 암호화해 보관하는 비대칭 구조로 풀었습니다. Webhook은 짧은 간격으로 3회 재시도하다 실패하면 별도 보관소로 보내 운영팀이 직접 처리하게 했고, 휴면 → 익명화 → 완전 삭제 3단계는 자동으로 돌게 했습니다.',
      en: 'HS256 + family_id simplifies the token model, child access is asymmetric (2-year, AES-GCM in DB), webhooks ride a 3-retry pool + DLQ + operator console, and lifecycle is a three-stage dormant → anonymise → hard-delete automation. The long-lived child token is intentional — background kills and network toggles are routine on child devices, the standard rotation pattern drops the location stream, and a single missed location reading is a guardian complaint, so long-lived access reused safely from the DB beats the textbook short-access pattern here.',
      ja: 'HS256 + family_idでトークンモデルを単純化、子供accessは2年 + DB AES-GCMで非対称保管、Webhookは3回リトライ + DLQ + 運用者コンソール、ライフサイクルは休眠 → 匿名化 → 完全削除の3段自動化。子供トークンを長くしたのは — 子供端末のbackground kill・通信トグルが日常で、標準回転パターンでは位置送出が途切れ、それが即保護者苦情のため、長寿命accessをDBから安全に再利用する側を選んだ。',
    },
    execution: {
      ko: '한 번에 완성된 설계가 아닙니다. 외부 QC와 내부 QC 단계에서 네 가지 빈틈이 차례로 드러났고, 그때마다 DB 스키마와 동작을 한 단계씩 보강했습니다. 위치 공유와 단말 통제를 한 번에 묶던 가입을 서비스 단위로 분리했고, 메모리 3회 재시도가 다 실패한 Webhook은 DLQ 테이블과 운영자 콘솔을 붙여 추적·복구 가능하게 만들었습니다. 직접 가입 사용자에게 두 번 발송되던 휴면 안내 경로를 차단했고, "한 서비스 데이터만 정리"와 "계정 자체 소멸 → JWT 즉시 차단" 신호를 별도 이벤트로 갈랐습니다.',
      en: 'The design did not land in one shot. Four gaps surfaced during external and internal QC, each closed by an iterative DB-schema and behaviour change. The previously all-or-nothing parent-child linkage was split so location-sharing and device-control can be opted into per service. Webhooks that failed all 3 in-memory retries became traceable and recoverable via a DLQ table and an operator console. The path that sent dormancy emails twice to direct-web signups was closed, and "clean up data in one service" was separated from "the account itself is gone, blacklist the JWT everywhere" as distinct events.',
      ja: '一度に決まった設計ではありません。外部QC・内部QC段階で4つの不足が順に表面化し、その都度DBスキーマと挙動を一段ずつ補強しました。位置共有と端末制御を一括で紐づけていた連携をサービス単位に分離し、メモリ内3回リトライが全失敗したWebhookはDLQテーブルと運用者コンソールを併設して追跡・復旧可能にしました。Web直接加入者に二重発送されていた休眠通知の経路を遮断し、「あるサービスのデータだけ整理」と「アカウント自体が消えるので全JWTを即時遮断」というシグナルを別イベントとして切り分けました。',
    },
    result: {
      ko: '여러 서비스가 부모-자녀 관계를 각자 따로 저장하던 구조를, 모두 OEM 인증 서버 한 곳을 바라보는 구조로 옮겼습니다. 이 통합 인증 아키텍처가 안정적으로 자리잡으면서 후속 사업 의사결정의 기반이 됐고, 그 위에서 모하니가 정식 사업화로 이어졌으며 오디야는 새 버전이 차세대 공부폰에 사전탑재되는 형태로 확장돼 회사 B2B 사업 규모를 한 단계 키울 수 있었습니다.',
      en: 'Where each service used to keep its own copy of parent-child relationships, all of them now read from the OEM auth server and sync signup / withdrawal / linkage events through webhooks. The unified auth architecture held up in production and became the foundation for the next round of business decisions: Mohani was greenlit for full productization, and a new version of Odiya shipped as a pre-installed app on the next-generation Studyphone — scaling the company’s B2B business another step up.',
      ja: '各サービスが自身のDBに親子関係を別々に保管していた構造から、すべてがOEM認証サーバー1箇所を参照し、加入・退会・連携イベントをWebhookで受けて同期する構造に移行しました。この統合認証アーキテクチャが安定して稼働したことが後続の事業判断の土台となり、モハニは正式な事業化が決定し、オディヤは新バージョンが次世代スタディフォンへ事前搭載される形で展開され、会社のB2B事業規模をさらに一段拡大できました。',
    },
    improvements: {
      ko: '한 가지 다시 검토하고 갈 부분이 있습니다. 자녀 access 토큰을 DB에 AES-GCM으로 암호화해 보관하는 패턴은 알고리즘 자체는 안전하지만, 결국 키 노출 위험이 운영팀의 관리 책임으로 남는 구조입니다. 같은 길을 다시 간다면 HSM·KMS 같은 하드웨어/관리형 키 격리를 함께 두는 방향을 명시적으로 정책화했을 것입니다.',
      en: 'One area I would revisit. Storing child access tokens AES-GCM-encrypted in the DB is safe in itself, but key-exposure risk ultimately stays the ops team’s management burden. If I were to do it again, I would lock in HSM / KMS-style hardware or managed key isolation as an explicit policy alongside the encryption.',
      ja: '再度検討すべき点が1つあります。子供accessトークンをDB上にAES-GCMで暗号化保管するパターンはアルゴリズム自体は安全ですが、結局鍵漏洩リスクが運用チームの管理責任として残ります。やり直すならHSM・KMSのようなハードウェア/マネージド鍵分離を明示的にポリシー化して併設するでしょう。',
    },
    reflection: {
      ko: '지금 시점에 명백히 잘못된 결정으로 보이는 부분은 없습니다. 다만 다시 한다면 두 가지는 검토하고 갈 것 같습니다. 하나는 OAuth 2.0 표준(Spring Authorization Server) 위에 도메인 제약을 얹는 구조입니다. 직접 만든 것이 도메인 특수성을 모델링하기에는 좋았지만, 외부 파트너 연동이 본격화되면 표준 프로토콜이 없다는 점이 결국 마이그레이션 비용으로 돌아옵니다. 다른 하나는 자녀 access를 DB에 AES-GCM으로 보관하는 패턴입니다. GCM 자체는 안전하지만 결국 키 노출 위험이 운영 책임으로 남기 때문에, 같은 길을 다시 간다면 HSM·KMS 같은 키 격리도 같이 검토했을 것입니다.',
      en: 'Looking back I don’t see anything clearly wrong, but two things I’d at least re-examine. One is whether to layer the domain constraints on top of Spring Authorization Server (OAuth 2.0). Building it bespoke was a good fit for the domain, but once external partners start integrating, missing the standard protocol becomes migration debt. The other is storing child access tokens AES-GCM-encrypted in the DB. GCM itself is safe, but key exposure ultimately stays an operational liability, so today I’d at least put HSM / KMS-style key isolation on the table next to it.',
      ja: '現時点で明確に誤った決定だと思う部分はない。ただやり直すなら2点は検討すると思う。一つはOAuth 2.0標準（Spring Authorization Server）の上にドメイン制約を載せる構造で、自前で作ったほうがドメイン特殊性のモデリングには向いていたが、外部パートナー連携が本格化すれば標準プロトコル不在がそのままマイグレーション負債になる。もう一つは子供アクセストークンをDB上にAES-GCMで保管するパターンで、GCM自体は安全でも、結局鍵漏洩リスクが運用責任として残るため、今ならHSM・KMSによる鍵分離も併せて検討するだろう。',
    },
    visuals: {
      problem: {
        bullets: {
          ko: [
            '부모-자녀 관계를 서비스별로 따로 저장 → 한 곳만 어긋나도 사용자 화면에서 사고로 노출',
            '자녀 단말은 백그라운드 위치 송출용 장수명 인증 필요 — 일반 access/refresh 회전 패턴으로는 위치가 끊김',
            '미성년자 자가 탈퇴 금지 — 부모/자녀 탈퇴 처리가 비대칭이어야 함',
            'Webhook 메모리 3회 재시도 실패 시 운영팀이 추적·복구할 수단이 필요',
          ],
          en: [
            'Per-service storage of parent-child links → any drift turns into a user-facing outage',
            'Child devices need long-lived auth for background location — standard short access + refresh rotation drops the stream',
            'Minor self-withdrawal must be blocked — parent/child removal flows must stay asymmetric',
            'In-memory 3-retry on webhooks is not enough — ops needs a recovery surface when delivery fails',
          ],
          ja: [
            'サービスごとに親子関係を分散保存 → 1箇所のずれが画面上の事故になる',
            '子供端末は背景位置送出のため長寿命認証が必要 — 通常のaccess + refresh回転では位置が途切れる',
            '未成年の自己退会は禁止 — 親と子で退会経路を非対称にする必要',
            'in-memory 3回リトライ失敗時、運用が追跡・復旧する手段が必要',
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
        bullets: {
          ko: [
            'HS256 + family_id UUID — 회수된 refresh 재사용 시 family 전체 즉시 무효화 + 감사 로그',
            '자녀 access 2년 + DB AES-GCM 암호화 보관 — 백그라운드 위치 송출이 끊기지 않게 비대칭 처리',
            'Webhook: 전용 비동기 풀에서 1s/5s/15s 3회 재시도 → 실패 시 DLQ 테이블 + 운영자 콘솔(목록·재시도·포기 + 감사 로그)',
            '라이프사이클 3단계: 휴면 안내 → (자녀) 30일 후 익명화 + 2년 후 phoneHash 완전 삭제 / (부모) 30일 + 2년 후 hard delete',
          ],
          en: [
            'HS256 + family_id UUID — revoked refresh reuse invalidates the whole family immediately + audit log',
            'Child access tokens live 2 years, stored AES-GCM-encrypted in DB — asymmetric so background location reporting never breaks',
            'Webhooks: dedicated async pool with 1s/5s/15s retries → DLQ table + operator console (list/retry/dismiss + audit)',
            'Lifecycle: dormancy notice → child anonymised after 30d, hard-delete (incl. phoneHash) at 2y / parent hard-delete at 30d + 2y',
          ],
          ja: [
            'HS256 + family_id UUID — 回収済みrefresh再利用時にfamily全体を即時無効化 + 監査ログ',
            '子供access 2年 + DB AES-GCM暗号化保管 — 背景位置送出が途切れない非対称構造',
            'Webhook: 専用非同期プールで1s/5s/15s 3回リトライ → 失敗時DLQテーブル + 運用者コンソール（一覧・再試行・破棄 + 監査）',
            'ライフサイクル3段: 休眠通知 → 子は30日後匿名化 + 2年後phoneHashまで完全削除 / 親は30日 + 2年でhard delete',
          ],
        },
      },
      execution: {
        bullets: {
          ko: [
            '서비스 단위 가입 분리 — 같은 부모-자녀가 위치 공유와 단말 통제를 따로 신청할 수 있도록, 한 번에 묶이던 연동 구조를 서비스 단위로 갈랐습니다.',
            'Webhook 추적성 보강 — 일시 장애로 메모리 3회 재시도가 모두 실패한 메시지가 사라지던 문제를 잡기 위해, 실패 메시지를 따로 보관하는 테이블과 운영자가 직접 재시도·포기를 누를 수 있는 콘솔, 같은 메시지가 두 번 처리되지 않게 막는 중복 방지 제약을 함께 투입했습니다.',
            '휴면 안내 중복 발송 차단 — 웹에서 직접 가입한 사용자에게 안내 메일이 두 번 발송되던 경로를 차단했습니다.',
            '계정 탈퇴 신호 분리 — "한 서비스에서만 데이터를 정리하라"는 신호와 "계정 자체가 사라지니 모든 서비스에서 JWT 토큰까지 즉시 차단하라"는 신호를 별도 이벤트로 갈랐습니다.',
          ],
          en: [
            'Per-service linkage — split the previously all-or-nothing parent-child linkage so the same pair can opt into location-sharing and device-control independently.',
            'Webhook traceability — transient outages were silently dropping messages that failed all 3 in-memory retries. Shipped a separate failure-message table, an operator console with manual retry / dismiss, and a dedup constraint so the same message is never processed twice.',
            'Dormancy notice dedup — closed the path that was sending dormancy emails twice to direct web signups.',
            'Account-withdrawal signal split — separated "clean up data in one service" from "the account itself is gone, blacklist its JWT everywhere" as distinct events.',
          ],
          ja: [
            'サービス単位の連携分離 — 同じ親子が位置共有と端末制御を別々に申請できるよう、一括で紐づいていた連携構造をサービス単位で切り分けました。',
            'Webhook追跡性の補強 — 一時障害でメモリ内3回リトライが全失敗したメッセージが消えていた問題を解くため、失敗メッセージを保管する別テーブル + 運用者が手動で再試行・破棄を押せるコンソール + 同一メッセージが二度処理されない重複防止制約を投入しました。',
            '休眠通知二重送信の遮断 — Web直接加入者へ通知メールが二度発送されていた経路を遮断しました。',
            'アカウント退会シグナルの分離 — 「あるサービスでだけデータを整理せよ」というシグナルと「アカウント自体が消えるので全サービスでJWTまで即時遮断せよ」というシグナルを別イベントとして切り分けました。',
          ],
        },
      },
    },
  },

  mohani: {
    oneLiner: {
      ko: '자녀 단말 통제에서 "차단이 안 되는 버그"를 추적하다가 Knox 통합 시점에 생긴 CPU 과부하를 발견, 무거운 Native 작업을 백그라운드 스레드로 분리해 ANR을 해소하고 Knox MDM + AccessibilityService 다층 방어로 자녀 단말 제어를 안정화했습니다.',
      en: 'Tracking a "blocking does not fire" bug led me to a CPU-overload trail that appeared the moment the Knox SDK was wired in — moving the heavy native calls onto a background executor cleared the recurring ANR and got the Knox MDM + AccessibilityService defence-in-depth back to steady-state.',
      ja: '子供端末制御で「ブロックが効かない」バグを追跡する中で、Knox統合タイミングに生じたCPU過負荷を発見、重いNative処理をバックグラウンドスレッドに分離してANRを解消し、Knox MDM + AccessibilityServiceの多層防御で子供端末制御を安定化させました。',
    },
    context: {
      ko: '부모(모하니 부모앱)가 자녀(모하니 자녀앱) 단말의 앱 차단·시간 제한·콘텐츠 차단을 원격 제어하는 제품입니다. 사업부 요구는 들어왔지만 일반 앱 권한으로 가능한지 검증되지 않은 상태였기에, AccessibilityService와 Samsung Knox MDM으로 시스템 레벨 차단이 가능하다는 기술 검증 보고서를 직접 작성해 출시 일정 근거를 만들었습니다. 이후 팀장으로서 모하니 자녀앱(RN+Native)·모하니 부모앱(RN)·모하니 서버(Spring Boot) 세 컴포넌트의 아키텍처를 주도해 설계·구현했습니다. 자녀 단말의 네트워크 단 도메인 차단은 Samsung Knox Firewall을 별도 레이어로 함께 적용해 앱 단위 차단(AccessibilityService)과 OS 단위 제어(Knox MDM) 위에 보조 안전망을 두었습니다.',
      en: 'A product where the parent app (Mohani parent app) drives the child device (Mohani child app) — app blocking, time limits, content filtering over the air. The business side asked for the feature without prior OS-level verification, so I wrote the feasibility report myself (AccessibilityService + Samsung Knox MDM = system-level blocking works) to give the team a launch-date basis, then led the build of all three components: Mohani child app (RN + Native), Mohani parent app (RN), Mohani Server (Spring Boot). Network-level domain blocking on the child device was layered on top with Samsung Knox Firewall, sitting alongside app-level (AccessibilityService) and OS-level (Knox MDM) controls as an additional safety net.',
      ja: '親（Mohani親アプリ）が子供（Mohani子供アプリ）端末のアプリブロック・時間制限・コンテンツブロックを遠隔制御する製品。事業側の要求は先行したが一般アプリ権限で技術的に可能か未検証状態のため、AccessibilityService + Samsung Knox MDMでシステムレベル遮断が可能という技術検証レポートを自ら作成しリリース日程の根拠を作成、以降チームリーダーとしてMohani子供アプリ（RN+Native）・Mohani親アプリ（RN）・Mohani Server（Spring Boot）3コンポーネントのアーキテクチャを主導して設計・実装しました。子供端末のネットワーク層ドメイン遮断はSamsung Knox Firewallを別レイヤーで併用し、アプリ単位遮断（AccessibilityService）とOS単位制御（Knox MDM）の上に補助セーフティネットを設けました。',
    },
    problem: {
      ko: '문제는 두 갈래로 들어왔습니다. 첫째는 ANR이었습니다. "차단이 안 된다"는 컴플레인을 추적하다 main thread가 잡혀 차단 로직 자체가 돌지 못하고 있음을 확인했고, 원인 추적 기준점은 시점 정보였습니다. 원래 없던 증상이 Knox SDK 통합 이후부터 발생했기 때문입니다. 둘째는 우회 경로였습니다. PIP·음악·녹음처럼 화면 없이 도는 백그라운드 앱은 `TYPE_WINDOW_STATE_CHANGED`가 발화하지 않아 차단 자체가 작동하지 않았습니다.',
      en: 'Two parallel problems — (1) ANR: chasing "block does not fire" complaints, I found the main thread pinned so the blocking logic itself was not running; decisive clue was timing (only appeared after the Knox SDK integration). (2) Bypass: headless apps (PIP / music / recorder) never fired `TYPE_WINDOW_STATE_CHANGED`, so the block did not run at all.',
      ja: '問題は2方向 — ① ANR：「ブロックが効かない」苦情を追うとmainスレッドが詰まり遮断ロジック自体が回っていなかった。決定的手掛かりはタイミング（Knox SDK統合後にのみ発生）。② 回避：PIP・音楽・録音のような画面のない背景アプリは`TYPE_WINDOW_STATE_CHANGED`が発火せず遮断自体が動作しない。',
    },
    hypothesis: {
      ko: '"변경 이력에서 가장 가까운 원인부터 의심한다"는 원칙으로 Knox SDK 통합 시점을 강한 후보로 잡았고, Knox 관련 코드가 main thread를 잡고 있을 가능성을 가설로 설정했습니다.',
      en: 'Principle: blame whatever changed most recently first. Hypothesis — Knox SDK integration was the obvious candidate, and Knox calls were likely pinning the main thread.',
      ja: '原則 — 「変更履歴で最も近い原因から疑う」。Knox SDK統合時点を強い候補とし、Knoxコードがmainスレッドを詰まらせている可能性を仮説とした。',
    },
    alternatives: {
      ko: 'systrace, Perfetto, Crashlytics ANR thread dump는 정확도는 높지만 셋업과 학습 곡선 부담이 컸습니다. 시점 단서가 명확했기 때문에 Android Studio Logcat과 AI 코드 분석 보조를 조합해 더 가볍게 접근했습니다.',
      en: 'systrace / Perfetto / Crashlytics ANR thread dumps were precise but heavy on setup / learning curve. With the timing clue clear, I picked the lightweight path — Android Studio Logcat + AI as a reading partner.',
      ja: 'systrace・Perfetto・Crashlytics ANR thread dumpは精度は高いがセットアップ・学習コスト負担が大きかった。タイミング手掛かりが明確だったため、Android Studio Logcat + AIコード分析補助のpathを選択。',
    },
    decision: {
      ko: '무거운 Native 작업을 백그라운드 스레드로 분리했습니다. Knox 호출을 단일 스레드 executor에서 비동기로 돌게 옮겨, main thread를 잡고 있던 경로를 끊었습니다. 차단 자체도 단일 트리거로는 우회되는 도메인이라 5중 다층 방어를 함께 짰습니다.',
      en: 'Moved the heavy native work onto a background thread — Knox calls now run async on a single-threaded executor, severing the main-thread-pin path. Blocking itself was a defence-in-depth problem (single trigger is bypassable), so I composed five layers.',
      ja: '重いNative処理をバックグラウンドスレッドに分離 — Knox呼び出しを単一スレッドexecutor上で非同期に動かし、mainスレッドpin経路を断ち切った。遮断自体も単一トリガーでは回避される領域のため、5層多層防御に構成。',
    },
    execution: {
      ko: '먼저 Knox 호출을 단일 스레드 실행자로 옮겨 메인 스레드를 잡고 있던 경로를 끊었고, 그 과정에서 호출이 폭주하면 큐가 무한히 쌓이는 후속 문제가 확인돼 큐 길이 상한과 한도 초과 시 호출 스레드에서 직접 실행하는 방식으로 적체 자체를 막았습니다. 우회 차단은 처음에는 `TYPE_WINDOW_STATE_CHANGED` 트리거만으로 처리했지만 PIP·음악·녹음 같이 화면 없는 앱은 그 이벤트가 발화하지 않아, FGS(포그라운드 서비스) 시작·종료 카운트를 차단 판단에 더했습니다. 시간 안전망은 1분 메인 폴링과 5분 보조 폴링 이중화, 부모 정책 변경은 FCM 즉시 발사와 30분 보조 동기화로 단일 실패 지점이 없도록 묶었습니다.',
      en: 'First moved Knox calls onto a single-threaded executor to sever the main-thread-pin path; that surfaced a new failure mode where bursts piled an unbounded queue, so I added a bounded queue with caller-thread execution on overflow to kill the backlog at the source. The bypass started with `TYPE_WINDOW_STATE_CHANGED` alone, but headless apps (PIP, music, recorder) never fire it, so I added FGS start/stop counts to the blocking decision. The time safety net is doubled (1-min main poll plus 5-min backup), and parent-policy propagation goes through FCM immediately with a 30-min fallback sync, leaving no single failure point.',
      ja: 'まずKnox呼び出しを単一スレッドexecutorに移してmainスレッドpin経路を断ち切り、その過程でバースト時にキューが無限に積まれる新たな問題が見えたためbounded queue + 超過時呼び出しスレッド直接実行でbacklog自体を遮断しました。回避は当初`TYPE_WINDOW_STATE_CHANGED`トリガのみで処理していましたが、PIP・音楽・録音のように画面のないアプリではこのイベントが発火せず、FGS（フォアグラウンドサービス）開始・終了カウントを遮断判定に追加しました。時間安全網は1分メインポーリング + 5分backupの2重化、親ポリシー変更はFCM即時 + 30分fallback同期で単一障害点が残らないよう束ねました。',
    },
    result: {
      ko: '반복 발생하던 ANR이 제거되고 5중 다층 방어가 정상 운영되면서, 단일 트리거로는 잡히지 않던 화면 없는 앱(PIP·음악·녹음)도 함께 차단되게 됐습니다. 사용자 측에서는 "차단이 안 된다"는 컴플레인이 사라졌고, 운영 측에서는 Knox SDK 통합 같은 큰 변경 후에도 회귀가 잡히는 구조가 만들어졌습니다.',
      en: 'Recurring ANR was eliminated and the 5-layer defence running as intended — headless apps that no single trigger could catch (PIP, music, recorder) are now blocked too. On the user side the "blocking does not fire" complaints stopped; on the operations side there is now a structure that catches regressions even after large changes like a Knox SDK upgrade.',
      ja: '反復していたANRが除去され、5層多層防御が通常稼働することで、単一トリガでは捕まらなかった画面のないアプリ（PIP・音楽・録音）も合わせて遮断されるようになりました。ユーザー側では「ブロックが効かない」という苦情が消え、運用側ではKnox SDK統合のような大きな変更後でも回帰が捕まる構造ができました。',
    },
    improvements: {
      ko: '두 가지를 다시 한다면 다르게 잡았을 것입니다. 첫째, AccessibilityService 클래스가 차단 트리거·우회 감지·PIN 검증·Knox 호출을 한 곳에 모두 끌어안은 채 점점 무거워졌고, 새 기능을 넣을 때마다 사이드 이펙트 위험이 컸습니다. 도메인 단위로 잘라 단위 테스트가 가능한 구조로 가져가는 것이 다음 단계입니다. 둘째, ANR 진단이 사용자 컴플레인을 받은 다음에야 시작됐다는 점이 정직한 회고입니다. Google Play Console의 ANR 비율과 Firebase Crashlytics의 ANR 스레드 덤프를 운영 대시보드에 처음부터 박았더라면 사용자가 알려주기 전에 신호를 받을 수 있었습니다.',
      en: 'Two things I would do differently. First, the AccessibilityService class ended up owning block triggers, evasion detection, PIN verification, and Knox calls in a single place, getting heavier every release and raising side-effect risk on each new feature. The next step is to split it along domain lines into something that can be unit-tested. Second, the ANR diagnosis only started after users reported it — that is the honest reflection. Putting Google Play Console ANR rate and Firebase Crashlytics ANR thread dumps on the operations dashboard from day one would have surfaced the signal before the user did.',
      ja: 'やり直すなら2点は別の進め方をします。第一に、AccessibilityServiceクラスが遮断トリガ・回避検知・PIN検証・Knox呼び出しを1箇所に抱えたまま重くなり、新機能投入のたびに副作用リスクが大きくなりました。次段階はドメイン単位に分割して単体テスト可能な構造へ持っていくことです。第二に、ANR診断がユーザー苦情を受けてから始まった点が正直な振り返りです。Google Play ConsoleのANR比率とFirebase CrashlyticsのANRスレッドダンプを運用ダッシュボードに初日から組み込んでいれば、ユーザーが知らせる前にシグナルを受けられたはずです。',
    },
    reflection: {
      ko: '가장 정직한 회고는 사용자가 알려준 다음에야 진단이 시작됐다는 점입니다. Google Play Console ANR 비율이나 Firebase Crashlytics ANR thread dump를 처음부터 운영 대시보드에 박았다면 사용자가 컴플레인을 보내기 전에 신호를 받을 수 있었습니다. 또 AccessibilityService 클래스가 차단 트리거·우회 감지·PIN gateway·Knox 호출을 한 곳에 다 끌어안은 채 무거워진 상태였고, 새 기능이 들어갈 때마다 사이드 이펙트 위험이 컸습니다. 다시 한다면 도메인 단위로 분리하고 테스트 가능한 구조로 갔을 것입니다.',
      en: 'The honest reflection is that diagnosis only started after a user reported the issue. Google Play Console ANR rate and Firebase Crashlytics ANR thread dumps should have been on the operations dashboard from day one. Separately, the AccessibilityService class ended up owning block triggers, evasion detection, PIN verification, and Knox calls all in one place, getting heavier every release and raising side-effect risk on every new feature. Splitting it along domain lines into something unit-testable is the do-over.',
      ja: '最も正直な振り返りは、ユーザーが知らせてくれた後で診断が始まった点です。Google Play Console ANR比率やFirebase Crashlytics ANR thread dumpを初日から運用ダッシュボードに組み込んでいれば、ユーザーが苦情を送る前にシグナルを得られたはずです。また、AccessibilityServiceクラスがブロックトリガ・回避検知・PIN検証・Knox呼び出しを一箇所に抱えたまま重くなり、新機能投入のたびに副作用リスクが大きくなりました。ドメイン単位に分割して単体テスト可能な構造へ持っていくのが次のやり直しです。',
    },
    visuals: {
      problem: {
        bullets: {
          ko: [
            '컴플레인 패턴: "차단이 안 된다" — 백그라운드 서비스 사망이 아니라 main thread pin',
            '결정적 단서: Knox SDK 통합 이후부터 증상 발생 (변경 이력 기반 시점 단서)',
            '우회 경로: 유튜브 PIP·음악 재생·녹음 앱처럼 화면 없는 백그라운드 앱은 `TYPE_WINDOW_STATE_CHANGED` 트리거가 발화하지 않음',
          ],
          en: [
            'Complaint pattern: "blocking does not fire" — background service was alive, the main thread was pinned',
            'Decisive clue: symptom only began after Knox SDK integration (change-history timing signal)',
            'Bypass path: headless background apps (YouTube PIP, music players, recorders) never fire `TYPE_WINDOW_STATE_CHANGED`',
          ],
          ja: [
            '苦情パターン：「ブロックが効かない」 — 背景サービスは生きており、mainスレッドが詰まっていた',
            '決定的手掛かり：Knox SDK統合後に症状が出始めた（変更履歴ベースのタイミング手掛かり）',
            '回避経路：YouTube PIP・音楽再生・録音アプリのような画面のない背景アプリは`TYPE_WINDOW_STATE_CHANGED`が発火しない',
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
            '① 앱 전환 감지 — `onAccessibilityEvent(TYPE_WINDOW_STATE_CHANGED)` (포그라운드 앱 전환)',
            '② 시간 초과 검사 — 1분 주기 tick (사용 시간 누적 만료 감지)',
            '③ 백그라운드 앱 감지 — FGS(포그라운드 서비스) 시작·종료 카운트 추적 (PIP·음악·녹음 등 화면 없는 앱 우회 차단)',
            '④ 정책 변경 즉시 반영 — SharedPreferences listener (부모 정책 변경이 자녀 단말에 즉시 적용)',
            '⑤ 원격 차단 명령 — FCM `BLOCK_APP` (부모가 즉시 발사하는 원격 차단)',
            '★ Knox 호출은 단일 스레드 executor + bounded queue로 직렬화 — 큐 초과 시 호출 스레드 직접 처리(backlog 방지) + main thread pin 차단',
          ],
          en: [
            '① App transition — `onAccessibilityEvent(TYPE_WINDOW_STATE_CHANGED)`',
            '② Time-overrun check — 1-minute tick (cumulative usage expiry)',
            '③ Headless background detection — track FGS start/stop counts (closes PIP / music / recorder bypass)',
            '④ Instant policy propagation — SharedPreferences listener (parent policy hits the child device immediately)',
            '⑤ Remote block command — FCM `BLOCK_APP` (parent-fired immediate block)',
            '★ Knox calls serialised on a single-threaded executor with a bounded queue — overflow runs on the calling thread (no backlog) + no more main-thread pin',
          ],
          ja: [
            '① アプリ遷移 — `onAccessibilityEvent(TYPE_WINDOW_STATE_CHANGED)`',
            '② 時間超過チェック — 1分周期tick（使用時間累積期限）',
            '③ 背景アプリ検知 — FGS開始・終了カウント追跡（PIP・音楽・録音などheadlessアプリ回避を遮断）',
            '④ ポリシー変更即時反映 — SharedPreferences listener（親ポリシー変更が子供端末に即時適用）',
            '⑤ 遠隔遮断コマンド — FCM `BLOCK_APP`（親が即時発射）',
            '★ Knox呼び出しは単一スレッドexecutor + bounded queueで直列化 — キュー超過時は呼び出しスレッド直接実行（backlog防止）+ mainスレッドpin遮断',
          ],
        },
      },
      result: {
        metrics: [
          { value: '5중 다층 방어', label: { ko: '하나가 우회당해도 나머지가 잡는 구조 — 앱 전환 감지·1분 폴링·화면 없는 앱 감지·정책 변경 즉시 반영·원격 차단 명령', en: 'Five independent triggers — when one is bypassed the others still catch it (app transition · 1-min poll · headless-app detection · instant policy propagation · remote block command)', ja: '5層の多層防御 — 1つが回避されても他が捕える構造（アプリ遷移・1分ポーリング・ヘッドレスアプリ検知・ポリシー即時反映・遠隔遮断コマンド）' } },
          { value: '최대 1분', label: { ko: '차단 누락 지연 — 메인 폴링이 1분 주기로 돌고, 실패해도 5분 보조 폴링이 한 번 더 잡습니다. 부모 정책 변경은 FCM 즉시 발사와 30분 보조 동기화로 이중화', en: 'Worst-case blocking-miss window — 1-min main poll with a 5-min backup if it fails; parent policy changes go out via FCM with a 30-min fallback sync', ja: '遮断漏れの最大遅延 — メインポーリングが1分周期で回り、失敗時も5分のバックアップポーリングがもう1回捕える。親ポリシー変更はFCM即時 + 30分の補助同期で二重化' } },
          { value: 'PIP·음악·녹음', label: { ko: '화면 없는 앱도 차단 — 포그라운드 서비스 시작·종료 카운트 추적으로 단일 트리거가 못 잡던 우회 경로 봉쇄', en: 'Headless apps blocked too — tracking foreground-service start/stop counts closes the bypass single-trigger schemes miss', ja: '画面のないアプリも遮断 — フォアグラウンドサービスの開始・終了カウント追跡で単一トリガでは捕えられない回避経路を封鎖' } },
        ],
      },
    },
  },

  kocca: {
    oneLiner: {
      ko: '외국인 학생의 한국어 발음을 정확하게 평가하려면 STT가 받는 음성 포맷을 클라이언트에서 만들어 변환 손실을 없애야 했고, 발음과 말하기의 응시 흐름을 단계 단위로 분리해 안정적으로 운영해야 했습니다. Soundmind 시기 KOCCA 정부 R&D 과제로 진행된 외국인 학생 대상 한국어 평가 플랫폼을 팀장으로서 리딩하며 자체 WAV 인코더부터 외부 한국형 STT 3-phase 통신, 응시 state machine, 미들웨어 RBAC, 컨테이너 보안 강화까지 풀스택으로 책임지고 산출물로 납품했습니다.',
      en: 'During my Soundmind tenure I shipped a full-stack Korean-speaking assessment platform for foreign learners under a Korean government R&D programme. A hand-written 16 kHz / 1ch / 16-bit WAV encoder, a 3-phase integration with the Korean-tuned Selvy STT (`kocca_stt`), a 5-stage pronunciation / 7-stage speaking exam state machine, middleware RBAC, and a hardened Docker image, all delivered as a single-owner R&D deliverable.',
      ja: 'Soundmind在籍中、外国人学習者向け韓国語発音・スピーキング評価のR&Dをフルスタックでリーディングして出荷しました。自作の16kHz/1ch/16bit WAVエンコーダ、韓国語型STT（Selvy `kocca_stt`）との3フェーズ通信、発音5段階・スピーキング7段階の受験state machine、ミドルウェアRBAC、Dockerコンテナのセキュリティ強化を主導して政府R&D成果物として納品しました。',
    },
    context: {
      ko: 'KOCCA(한국콘텐츠진흥원) 정부 R&D 과제로 진행한 외국인 학생 대상 한국어 평가 플랫폼입니다. 4역할(STUDENT, TEACHER MAIN, TEACHER SUB, TEACHER ADMIN), 학교별 멀티테넌트, 8단계 시험 회차 state machine 구조 안에서, 팀장으로서 App Router·Server Action·Route Handler·DB 스키마·Docker 배포까지 리딩하며 핵심 설계를 담당했습니다.',
      en: 'A KOCCA-funded Korean-speaking assessment platform for foreign learners with four user roles (STUDENT, TEACHER MAIN, TEACHER SUB, TEACHER ADMIN), school-level multitenancy, and an eight-stage exam-status state machine. As team lead I led the full stack: App Router, Server Action, Route Handler, DB schema, Docker deployment.',
      ja: 'KOCCA（韓国コンテンツ振興院）政府R&D課題として進められた外国人学習者向け韓国語評価プラットフォーム。4ロール（STUDENT / TEACHER MAIN / TEACHER SUB / TEACHER ADMIN）・学校別マルチテナント・8段階の試験回次state machine構造の中で、チームリーダーとしてApp Router・Server Action・Route Handler・DBスキーマ・Dockerデプロイをリーディングし、コア設計を担当しました。',
    },
    problem: {
      ko: '핵심은 STT 포맷 제약이었습니다. Selvy `kocca_stt`가 16kHz/1ch/16bit PCM RIFF만 받기 때문에 MediaRecorder의 webm/opus를 그대로 보내면 서버 ffmpeg 변환이 필요해 응답 지연, 트랜스코딩 손실, iOS Safari 호환성 문제가 누적됩니다. 동시에 응시 흐름(발음 5단계와 말하기 7단계)의 안정적인 운영, 4역할 RBAC, 학교별 멀티테넌트 격리까지 한 설계 안에서 잡아야 했습니다.',
      en: 'Core problem was the STT format constraint — Selvy `kocca_stt` only accepts 16 kHz / 1ch / 16-bit PCM RIFF, so sending MediaRecorder webm/opus through it would force a server-side ffmpeg step (latency, transcoding loss, iOS Safari issues). On top of that — a reliable exam flow (5-stage pronunciation + 7-stage speaking), 4-tier RBAC, and school-level multitenant isolation all had to land in one design.',
      ja: '中核はSTTフォーマット制約 — Selvy `kocca_stt`が16kHz/1ch/16bit PCM RIFFのみ受領するため、MediaRecorder webm/opusをそのまま送るとサーバーffmpeg変換が必要となり応答遅延・トランスコード損失・iOS Safari問題が累積。同時に受験フロー（発音5段階 + スピーキング7段階）の安定運用、4ロールRBAC、学校別マルチテナント隔離を一つの設計で押さえる必要があった。',
    },
    hypothesis: {
      ko: '클라이언트에서 STT가 받는 정확한 포맷을 직접 만들면 서버 변환을 통째로 제거할 수 있고 트랜스코딩 손실도 없습니다. STT는 결과를 받기까지 시간이 걸리는 작업이라, 단발 요청보다 폴링 패턴이 적합하다고 판단했습니다.',
      en: 'If the client generates exactly the format the STT expects, the entire server-conversion step disappears + zero transcoding loss. STT is long-running, so polling fits better than a single round-trip.',
      ja: 'クライアント側でSTTが受け取る正確なフォーマットを直接生成すれば、サーバー変換段階を丸ごと消去 + トランスコード損失0。STTはlong-running作業のため単発リクエストよりポーリングパターンが適合。',
    },
    alternatives: {
      ko: 'MediaRecorder는 서버 변환 비용을 피할 수 없고, Google/AWS STT는 외국인 한국어 학습자 도메인에 학습 데이터가 약했습니다. 무엇보다 KOCCA R&D 사양상 한국형 Selvy가 요구 항목이라 외부 STT는 계약상 후보 자체가 아니었습니다.',
      en: 'MediaRecorder can’t avoid the server-conversion penalty; Google / AWS STT are weak on this domain and the KOCCA R&D spec mandated Korean-tuned Selvy anyway, so non-Korean STTs were off the table by contract.',
      ja: 'MediaRecorderはサーバー変換コストを回避できず、Google/AWS STTはドメイン学習が弱い + KOCCA R&D仕様で韓国語型Selvyが要件のため外部STTは契約上不可。',
    },
    decision: {
      ko: '자체 WAV 인코더(16kHz 캡처, ScriptProcessor, 44바이트 헤더 직접 작성)와 Selvy STT 4단계 폴링으로 풀스택을 구성했습니다.',
      en: 'Hand-written WAV encoder (16 kHz capture + ScriptProcessor + 44-byte header written by hand) + Selvy STT 4-phase poll as the full-stack composition.',
      ja: '自作WAVエンコーダ（16kHzキャプチャ + ScriptProcessor + 44バイトヘッダ直接記述）+ Selvy STT 4段ポーリングでフルスタック構成。',
    },
    execution: {
      ko: '처음에는 녹음 데이터를 `useState`로 관리했는데 단계 전환 사이에 일어나는 리렌더가 음성 일부를 날리는 케이스가 보였습니다. 원인은 React 상태 업데이트의 비동기 특성이라 `useRef`로 옮겨 음성 누적을 리렌더 사이클 밖으로 빼냈고, 동시에 발음 5단계와 말하기 7단계는 흐름이 달라 한 state machine으로 묶으면 분기 조건이 복잡해져 따로 잘랐습니다. 학교별 격리는 쿼리 한 곳만 빠뜨려도 다른 학교 데이터가 새는 위험이 있어, 모든 응시·채점 쿼리에 school_id 필터 강제 + 미들웨어가 토큰 소속 학교와 요청 경로 school_id 일치를 검증하는 이중 계층으로 묶었습니다. 녹음 음성은 AWS S3에 적재해 채점·재청취 경로를 유지합니다.',
      en: 'First pass kept recorded blobs in `useState`, but stage transitions caused re-renders that dropped chunks of audio (React state updates are async, so the latest blob array could overwrite an in-flight append). Moved the accumulator into `useRef` to pull it outside the render cycle. Pronunciation (5 stages) and speaking (7 stages) also diverged enough in flow that one combined state machine bloated the branching, so I split them. School isolation is two-layered because a single missed query filter would leak across tenants: every exam and grading query carries a school_id filter, and middleware verifies the token’s school matches the route’s school_id. Recorded audio is persisted to AWS S3 to keep the grading and replay paths intact.',
      ja: '最初は録音Blobを`useState`で管理しましたが、段階遷移ごとの再レンダ中に音声の一部が消えるケースが出ました（Reactの状態更新は非同期で、最新の配列が進行中のappendを上書きしてしまう）。蓄積を`useRef`に移して描画サイクルの外に出しました。発音5段階とスピーキング7段階はフローが異なり一つのstate machineにまとめると分岐が膨れるため分離。学校別隔離はクエリ1箇所のフィルタ漏れで他校データが漏れる危険があるため、全受験・採点クエリにschool_idフィルタを強制 + ミドルウェアがトークン所属校とルートのschool_id一致を検証する2層構造で固めました。録音音声はAWS S3に保存して採点・再聴経路を維持します。',
    },
    result: {
      ko: '정부 R&D 산출물 납품을 완료했습니다. 자체 WAV 인코더와 STT 4단계 폴링이 안정 동작하면서 외부 STT 호환과 음성 정확도를 동시에 확보했고, 학교별 멀티테넌트로 한 DB에서 다수 학교가 동시에 응시·채점 회차를 운영할 수 있게 됐습니다. Docker 보안 강화로 외부에 노출되는 runner 이미지의 공격 표면이 줄어든 상태로 배포됐습니다.',
      en: 'Shipped as the R&D deliverable. The hand-written WAV encoder and 4-phase STT polling held up in production, securing both external STT compatibility and recording fidelity; school-level multitenancy let many schools run exam / grading cycles concurrently against a single DB, and the hardened Docker image shipped with a reduced runner attack surface.',
      ja: '政府R&D成果物の納品を完了しました。自作WAVエンコーダとSTT 4段ポーリングが安定動作することで外部STT互換と音声精度を同時に確保し、学校別マルチテナントで一つのDB上で複数校が同時に受験・採点回次を運用できるようになりました。Dockerセキュリティ強化により外部に公開されるrunnerイメージの攻撃面を縮小した状態でデプロイされました。',
    },
    improvements: {
      ko: '두 가지를 다시 한다면 다르게 잡았을 것입니다. 첫째, 자체 WAV 인코더에 사용한 ScriptProcessor는 W3C에서 더 이상 권장하지 않는 API로, 권장은 AudioWorklet입니다. 현재는 정상 동작하지만 브라우저가 ScriptProcessor 지원을 빼는 시점이 오면 마이그레이션이 필요하므로, 같은 길을 다시 간다면 AudioWorklet 기반으로 시작했을 것입니다. 둘째, Selvy STT 단일 벤더에 의존하는 구조라 서비스가 다운되면 응시 자체가 멈춥니다. R&D 사양상 Selvy 사용이 요구사항이었더라도, 응답을 받지 못한 응시 데이터를 큐에 적재해 STT 복구 후 재처리하는 복구 경로는 만들어 두었어야 한다고 생각합니다.',
      en: 'Two things I would do differently. First, the hand-written WAV encoder relies on ScriptProcessor, which W3C now marks as discouraged — the recommended modern equivalent is AudioWorklet. It works today, but the day a browser drops ScriptProcessor support this code needs a migration; if I started over, it would be AudioWorklet from day one. Second, the single-vendor dependency on Selvy STT means the exam itself stops when Selvy goes down. Even though the R&D specification required Selvy, I should have built a recovery path that queues unanswered submissions and replays them once the service recovers.',
      ja: 'やり直すなら2点は別の進め方をします。第一に、自作WAVエンコーダで使用したScriptProcessorはW3Cが現在は推奨しないAPIで、推奨はAudioWorkletです。現在は正常動作しますがブラウザがScriptProcessorサポートを切るタイミングが来れば移行が必要なので、やり直すならAudioWorkletベースで始めていたと思います。第二に、Selvy STT単一ベンダ依存のためサービスダウン時に受験自体が止まります。R&D仕様上Selvy使用が要件であったとしても、応答を受けられなかった受験データをキューに積みSTT復旧後に再処理する復旧経路は作っておくべきだったと考えます。',
    },
    reflection: {
      ko: '자체 WAV 인코더의 ScriptProcessor는 W3C에서 deprecated 상태이고 권장은 AudioWorklet입니다. 현재 동작하지만 브라우저가 ScriptProcessor 지원을 빼는 시점이 오면 마이그레이션이 필요하므로 다시 한다면 AudioWorklet 기반으로 시작했을 것입니다. 또 Selvy STT 단일 벤더에 의존하는 구조라 서비스 다운 시 응시 자체가 멈춥니다. R&D 사양상 Selvy 사용이 요구사항이었더라도, 응답을 받지 못한 응시 데이터를 큐에 적재해 STT 복구 후 재처리하는 대체 경로는 만들어 두었어야 한다고 생각합니다.',
      en: 'The WAV encoder uses `ScriptProcessor`, which W3C now marks as deprecated; AudioWorklet is the recommended modern equivalent. It works today, but the day a browser removes `ScriptProcessor` support, this code needs migration. If I started over, it would be AudioWorklet from the start. The other regret is the single-vendor STT dependency: when Selvy goes down, the exam itself stops. Even though the R&D specification required Selvy specifically, I should have built a fallback path that queues the submissions Selvy did not answer and replays them once the service recovers.',
      ja: '自作WAVエンコーダのScriptProcessorはW3Cでdeprecated状態であり、推奨はAudioWorkletです。現在動作しますがブラウザがScriptProcessorサポートを切るタイミングが来れば移行が必要なので、やり直すならAudioWorkletベースで始めていたと思います。またSelvy STT単一ベンダーに依存する構造なのでサービスダウン時に受験そのものが止まります。R&D仕様上Selvy使用が要件であったとしても、応答を受け取れなかった受験データをキューに積みSTT復旧後に再処理する代替経路は作っておくべきだったと考えます。',
    },
    visuals: {
      problem: {
        bullets: {
          ko: [
            'STT 포맷 제약 — Selvy `kocca_stt`는 16kHz / 1ch / 16bit PCM RIFF만 수용 (MediaRecorder webm/opus 그대로 보내면 서버 ffmpeg 변환 + 트랜스코딩 손실 + iOS Safari 호환성 문제)',
            '응시 흐름 — 발음 5단계 (총 75초) + 말하기 7단계 state machine을 단계별 beep·녹음·자동 전환까지 운영',
            '4역할 RBAC — STUDENT / TEACHER MAIN / TEACHER SUB / TEACHER ADMIN을 인증·인가 흐름에 자연스럽게 녹임',
            '학교별 멀티테넌트 — 한 학교 사고가 다른 학교로 번지지 않도록 격리 + 컨테이너 공격 표면 축소',
          ],
          en: [
            'STT format constraint — Selvy `kocca_stt` only accepts 16 kHz / 1ch / 16-bit PCM RIFF (sending MediaRecorder webm/opus would mean server ffmpeg + transcoding loss + iOS Safari compatibility issues)',
            'Exam flows — pronunciation (5 stages, 75 s) + speaking (7 stages), each with stage-by-stage beep / recording / auto-transition',
            '4-role RBAC — STUDENT / TEACHER MAIN / TEACHER SUB / TEACHER ADMIN dropped cleanly into the auth flow',
            'School-level multitenancy — one school’s incident must not propagate to others + container attack surface reduced',
          ],
          ja: [
            'STTフォーマット制約 — Selvy `kocca_stt`は16kHz/1ch/16bit PCM RIFFのみ受領（MediaRecorder webm/opusをそのまま送ると サーバーffmpeg変換 + トランスコード損失 + iOS Safari互換性問題が累積）',
            '受験フロー — 発音5段階（合計75秒）+ スピーキング7段階のstate machineを段階ごとのbeep・録音・自動遷移まで運用',
            '4ロールRBAC — STUDENT / TEACHER MAIN / TEACHER SUB / TEACHER ADMINを認証・認可フローに自然に組み込む',
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
              { ko: '외국인 한국어 학습자 도메인 학습 데이터 약함 + KOCCA R&D 사양상 한국형 STT 요구 (계약상 불가)', en: 'Weak on foreign-Korean-learner domain + KOCCA spec mandated a Korean-tuned STT (off the table by contract)', ja: '外国人韓国語学習者ドメインの学習データが弱い + KOCCA仕様で韓国語型STTが要件（契約上不可）' },
            ],
            [
              { ko: '자체 WAV 인코더 + Selvy STT 4단계 폴링', en: 'Hand-written WAV encoder + Selvy STT 4-phase poll', ja: '自作WAVエンコーダ + Selvy STT 4段ポーリング' },
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
            '① sample rate 16kHz로 직접 캡처 — Selvy가 16kHz만 받으므로 클라이언트에서 같은 sample rate로 캡처해 서버 리샘플링 + 트래픽 폭증 동시 회피',
            '② ScriptProcessor(4096) — AudioWorklet 호환이 부족했던 시기의 지연·CPU 부하 균형점 + 모노 1채널로 STT 입력 사양 정확 일치 + 트래픽/메모리 절반',
            '③ 44바이트 WAV 헤더 직접 작성 — STT가 받는 정확한 포맷을 클라이언트에서 생성',
            '★ 응시 흐름 안정성 — 발음 5단계 + 말하기 7단계 state machine 분리, 녹음 데이터는 `useState`가 아닌 `useRef`로 누적해 리렌더 사이 음성 유실 방지',
            '★ Server Action(인증, 부수효과) vs Route Handler(데이터, 단순 조회) 의도적 분리 — 클라이언트 번들 가벼움',
            '★ 학교별 격리 — 모든 응시·채점 쿼리에 학교 ID 필터 강제 + 미들웨어가 토큰의 소속 학교와 요청 경로 학교 ID 일치 여부 검증',
          ],
          en: [
            '① Capture at 16 kHz directly — Selvy only accepts 16 kHz, so matching the client capture rate avoids both server resampling and bandwidth bloat',
            '② ScriptProcessor(4096) — the latency/CPU balance point when AudioWorklet support was thin + mono 1-channel matches the STT input spec exactly + halves bandwidth and memory',
            '③ 44-byte WAV header written by hand — produces the exact format Selvy expects on the client',
            '★ Exam-flow stability — pronunciation (5) + speaking (7) split into state machines, recordings accumulated in `useRef` (not `useState`) so re-renders never drop audio',
            '★ Server Action (auth, side-effect) vs Route Handler (data, simple fetch) split keeps the client bundle lean by design',
            '★ School-level isolation — every exam/grading query carries a school_id filter and middleware verifies the token’s school matches the route’s school_id',
          ],
          ja: [
            '① sample rate 16kHzで直接キャプチャ — Selvyが16kHzのみ受領するため、クライアントで同じsample rateで取得しサーバーリサンプリングとトラフィック膨張を同時回避',
            '② ScriptProcessor(4096) — AudioWorklet互換が薄かった時期の遅延・CPU負荷の均衡点 + モノ1チャネルでSTT入力仕様に正確一致 + トラフィック/メモリ半減',
            '③ 44バイトWAVヘッダを直接記述 — STTが受け取る正確な形式をクライアントで生成',
            '★ 受験フロー安定性 — 発音5段階 + スピーキング7段階のstate machineに分離、録音Blobは`useState`ではなく`useRef`で累積し再レンダ中の音声消失を防止',
            '★ Server Action（認証、副作用）vs Route Handler（データ、単純fetch）の意図的分離でクライアントバンドルを軽く',
            '★ 学校別隔離 — すべての受験・採点クエリにschool_idフィルタを強制 + ミドルウェアがトークンの所属校とルートのschool_id一致を検証',
          ],
        },
      },
      result: {
        metrics: [
          { value: '-50%', label: { ko: 'STT 서버 호출 — 폴링 주기 1s → 2s (60초 음성·30초 처리 가정 시 30회 → 15회). 사용자 인지 지연 +1초는 음성 채점 UX에서 감수할 만한 절충', en: 'STT server calls — polling 1s → 2s (60-sec audio, ~30-sec processing assumption: 30 → 15 calls). +1 s perceived delay is negligible in scoring UX', ja: 'STTサーバー呼び出し — ポーリング1s → 2s（60秒音声・30秒処理仮定で30回 → 15回）。+1秒の体感遅延は採点UXで許容可能なtrade-off' } },
          { value: '4역할', label: { ko: 'RBAC (STUDENT / TEACHER MAIN·SUB / ADMIN) — 미들웨어 + API 라우트 이중 검증', en: 'RBAC (STUDENT / TEACHER MAIN+SUB / ADMIN) — middleware + API-route double verification', ja: 'RBAC（STUDENT / TEACHER MAIN・SUB / ADMIN）— ミドルウェア + APIルートの2層検証' } },
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
      ko: 'Purple Academy(교육 회사)에서 프론트엔드 1년 재직, 2명 팀에서 1년차 사원이지만 프로젝트 리딩 위치로 결정권 보유. 기존 제품은 React 기반 웹 서비스로 어린이·청소년 대상 영어 교육 콘텐츠(알파벳 트레이싱·인터랙티브 학습 활동 등) 5,000+ 개 운영 중.',
      en: 'One year as a frontend engineer at Purple Academy (an education company), two-person team — formally junior but in a lead position with decision rights. The existing product was a React web service delivering 5,000+ interactive English-learning activities for children and teens.',
      ja: 'Purple Academy（教育会社）でフロントエンドとして1年在籍、2名チームで1年目社員ながらプロジェクトリーディング位置で決定権を保有。既存プロダクトはReactベースのWebサービスで、子供・青少年向け英語教育コンテンツ（アルファベットトレース・インタラクティブ学習アクティビティなど）5,000以上を運用中。',
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
      ko: 'IEZLAB(SI 회사) 시기, 조선왕조실록 한자 고문헌 디지털화 정부 R&D 과제에서 발주처가 사진과 한자 영역 좌표값을 제공하면 Canvas API로 좌표에 맞춰 이미지를 한 글자씩 자르는 시스템을 구현하고 Spring Boot + JPA 백엔드 API까지 풀스택으로 책임져 정부 R&D 산출물로 납품했습니다.',
      en: 'During my time at IEZLAB (a system-integration company), I worked on a government-funded R&D project to digitise classical Korean Hanja manuscripts such as the Annals of the Joseon Dynasty. The client supplied scans and per-character coordinates; I built the Canvas-API system that sliced the images into single Hanja characters according to those coordinates, plus the Spring Boot + JPA backend API around it — delivered end-to-end as a national R&D output.',
      ja: 'IEZLAB（SI会社）在籍中、朝鮮王朝実録の漢字古文献デジタル化政府R&D課題で、発注元が画像と漢字領域の座標値を提供すると、その座標に合わせてCanvas APIで画像を1文字ずつ切り出すシステムを実装し、Spring Boot + JPAバックエンドAPIまでフルスタック責任で政府R&D成果物として納品しました。',
    },
    context: {
      ko: 'IEZLAB(SI 회사)에서 조선왕조실록 한자 고문헌 디지털화 정부 R&D 과제에 참여. GPT 같은 LLM이 없던 시절이라 Vision API · SAM · LLM 기반 OCR 같은 현대 도구가 부재해, 사진을 한 글자씩 정확히 자르는 작업을 손으로 구현해야 했습니다.',
      en: 'At IEZLAB (a system-integration shop) I worked on a government R&D project to digitise classical Hanja manuscripts (Annals of the Joseon Dynasty etc.). This was pre-LLM era — no Vision APIs, no SAM, no LLM-driven OCR — so cutting an image into individual Hanja characters had to be built by hand rather than orchestrated from off-the-shelf models.',
      ja: 'IEZLAB（SI会社）で朝鮮王朝実録の漢字古文献デジタル化政府R&D課題に参加。GPTのようなLLMが無かった時代でVision API・SAM・LLMベースOCRなどの現代的ツールが不在のため、写真を1文字ずつ正確に切り出す作業を手で実装する必要があった。',
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
      ko: 'GitLab 리포에 상주하며 PR 리뷰부터 머지된 코드 감시·이슈 자동 발급·자동 수정까지 24/7 자율 동작하는 시니어 에이전트. Google Cloud Rapid Agent Hackathon 2026 GitLab Track 출품작.',
      en: 'A senior-engineer agent that lives inside a GitLab repo and runs 24/7 — PR review, post-merge code monitoring, automatic issue creation, and auto-fix MRs. Built for the Google Cloud Rapid Agent Hackathon 2026 GitLab Track.',
      ja: 'GitLabリポに常駐し、PRレビューからマージ後のコード監視・課題自動起票・自動修正までを24/7自律で回すシニアエンジニアエージェント。Google Cloud Rapid Agent Hackathon 2026 GitLabトラック出品作。',
    },
    context: {
      ko: '기존 PR 리뷰 봇은 PR이 열려야만 동작하고, 머지된 후의 코드 건강도에는 관여하지 않습니다. 이 한계를 풀기 위해 Reactive·Proactive·Auto-Fix 3 lane 자율 사이클로 24/7 동작하는 에이전트를 설계했습니다.',
      en: 'Conventional PR review bots are reactive by design — they only kick in when a PR opens and walk away after merge. To close that gap we designed an agent that runs 24/7 across three independent lanes (Reactive · Proactive · Auto-Fix).',
      ja: '従来のPRレビューボットはPRが開かれた時だけ動作し、マージ後のコード健康度には関与しません。この限界を解くため、Reactive・Proactive・Auto-Fixの3レーン自律サイクルで24/7動作するエージェントを設計しました。',
    },
    problem: {
      ko: 'PR 열림에만 반응하면 머지된 코드에서 발생하는 보안·성능·테스트 부채를 누가 잡을지가 불명확합니다. 또 단일 페르소나로 LLM-as-a-judge를 돌리면 코드 리뷰의 다양한 관점이 단일 시각으로 압축돼 신뢰가 떨어집니다.',
      en: 'A PR-only workflow leaves post-merge security, performance, and test debt with no clear owner. And running LLM-as-a-judge with a single persona compresses many review angles into one voice, which reviewers stop trusting.',
      ja: 'PRオープン時のみ反応する設計では、マージ後に積もるセキュリティ・性能・テスト負債の担当が不明になります。さらに単一ペルソナでLLM-as-a-judgeを回すと、コードレビューの多様な視点が一つの声に圧縮され信頼が下がります。',
    },
    hypothesis: {
      ko: '리뷰는 단일 판단보다 다중 페르소나의 토론·합의로 가져가야 신뢰가 만들어지고, 동작 트리거를 PR 열림 외에 cron sweep과 명시적 명령으로 확장해 머지 후 영역까지 자율 커버해야 한다고 봤습니다.',
      en: 'Trust comes from a debate among multiple personas rather than a single LLM judge; and to actually cover the post-merge surface, the agent has to fire on cron sweeps and explicit commands, not just PR open events.',
      ja: 'レビューは単一判断より複数ペルソナの議論・合意で運用したほうが信頼が築け、PRオープン以外にcronスイープと明示コマンドへトリガを広げてマージ後の領域まで自律カバーすべきだと考えました。',
    },
    alternatives: {
      ko: '단일 LLM judge·룰 기반 정적 분석·외부 SaaS 코드 리뷰 도구를 검토했지만, 페르소나 다중성과 자율 동작 양쪽을 동시에 만족하는 솔루션은 없었습니다.',
      en: 'Looked at a single-LLM judge, rules-based static analysis, and off-the-shelf SaaS review tools — none of them combined multi-persona debate with autonomous post-merge action.',
      ja: '単一LLM judge・ルールベース静的解析・外部SaaSコードレビューツールを検討しましたが、ペルソナ多重性と自律動作を同時に満たす選択肢はありませんでした。',
    },
    decision: {
      ko: 'Google Cloud Agent Builder ADK를 베이스로 4 페르소나(security_guard·performance_hunter·test_fanatic·team_lead) ParallelAgent + 3 lane 자율 사이클을 설계했습니다. 신뢰는 dry-run → comment-only → full 3단계 권한 모드로 점진적 확보.',
      en: 'Built on Google Cloud Agent Builder ADK: a four-persona ParallelAgent (security_guard / performance_hunter / test_fanatic / team_lead as meta) plus the three-lane autonomy. Trust is earned in stages via dry-run → comment-only → full permission modes.',
      ja: 'Google Cloud Agent Builder ADKをベースに、4ペルソナ（security_guard・performance_hunter・test_fanatic・team_lead）ParallelAgent + 3レーン自律サイクルを設計。信頼はdry-run → comment-only → fullの3段権限モードで段階的に獲得。',
    },
    execution: {
      ko: 'Reactive Lane은 GitLab Webhook에서 시작해 4 페르소나가 병렬로 인라인 코멘트와 risk score(0~100)를 만듭니다. Proactive Lane은 Cloud Scheduler가 매시간 머지 코드를 스윕해 코사인 유사도 0.85 기준 dedupe 후 이슈를 발급합니다. Auto-Fix Lane은 변경 계획 → 5분 대기 → 브랜치·커밋·MR + 셀프 리뷰까지 가고, 봇이 자기 MR 머지를 시도하면 SelfMergeViolation으로 차단됩니다.',
      en: 'Reactive lane starts at the GitLab webhook and runs four personas in parallel, producing inline comments and a 0~100 risk score. Proactive lane has Cloud Scheduler sweep merged code hourly, deduping with cosine similarity ≥ 0.85 before opening issues. Auto-Fix lane goes change plan → 5-minute hold → branch + commit + MR + self-review, and a SelfMergeViolation guard blocks the bot from merging its own MR.',
      ja: 'Reactive LaneはGitLab Webhookで起動し、4ペルソナが並列にインラインコメントとrisk score（0~100）を生成。Proactive LaneはCloud Schedulerが毎時マージ済みコードをスイープし、コサイン類似度0.85以上でdedupeしてから課題を起票。Auto-Fix Laneは変更計画 → 5分待機 → ブランチ・コミット・MR + セルフレビューまで進み、ボットが自分のMRをマージしようとするとSelfMergeViolationで遮断します。',
    },
    result: {
      ko: 'Google Cloud Rapid Agent Hackathon 2026 GitLab Track 출품작으로, 페르소나 토론 + 3 lane 자율 사이클이 실제 GitLab 리포에서 동작하는 형태로 시연을 마쳤습니다. GitLab MCP 도구 12개를 활용하고, Prompt Injection 5계층 방어와 위험 파일 차단 가드(≤5 파일·≤500 라인)로 운영 안전성을 함께 확보했습니다.',
      en: 'Shipped as the Google Cloud Rapid Agent Hackathon 2026 GitLab Track submission — persona debate + the three-lane autonomy runs against a real GitLab repo end-to-end. Uses 12 GitLab MCP tools, with five-layer prompt-injection defense and a risky-file blocklist (≤ 5 files, ≤ 500 lines per auto-fix) keeping operations safe.',
      ja: 'Google Cloud Rapid Agent Hackathon 2026 GitLabトラック出品作として、ペルソナ議論 + 3レーン自律サイクルを実GitLabリポでエンドツーエンド稼働させた状態で出展しました。GitLab MCPツール12個を活用し、Prompt Injection 5層防御と危険ファイル遮断ガード（≤5ファイル・≤500行）で運用安全性も併せて確保。',
    },
    reflection: {
      ko: 'AI 에이전트가 코드를 직접 머지할 수 있게 만들면 신뢰 비용이 폭발합니다. 그래서 권한을 dry-run → comment-only → full로 쪼개 점진적으로 승격하는 구조 자체가 가장 큰 설계 선택이었습니다. 동시에 SelfMergeViolation처럼 "봇이 자기 자신을 통과시키는 경로"를 막는 것이 자율 시스템의 안전성에서 본질적이라는 것을 다시 확인했습니다.',
      en: 'Letting an AI agent merge code outright explodes the trust bill, so the most important design decision was splitting permission into dry-run → comment-only → full and graduating step by step. SelfMergeViolation — blocking the path where the bot waves its own MR through — is the kind of guard that turns out to be central to autonomy safety, not a footnote.',
      ja: 'AIエージェントがコードを直接マージできるようにすると信頼コストが跳ね上がります。そのため権限をdry-run → comment-only → fullに分割し段階的に昇格する構造自体が最大の設計判断でした。同時にSelfMergeViolationのように「ボットが自分自身を通す経路」を塞ぐ仕組みが自律システムの安全性において本質的だと再確認しました。',
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
      ko: '"무엇을 하고 싶은지" 목적을 선택하면 5명의 Snowflake Cortex 전문가 에이전트가 토론으로 답하는 동네 인텔리전스 플랫폼. Snowflake AI & Data Hackathon Korea 2026 Tech Track 준우승.',
      en: 'A neighborhood-intelligence platform where you pick what you want to do and five Snowflake Cortex specialist agents debate to the answer. 2nd place at the Snowflake AI & Data Hackathon Korea 2026 (Tech Track).',
      ja: '「何をしたいか」目的を選ぶと、5名のSnowflake Cortex専門家エージェントが議論で答える地域インテリジェンス基盤。Snowflake AI & Data Hackathon Korea 2026 Tech Track準優勝。',
    },
    context: {
      ko: '카페 창업, 렌탈 가전 마케팅, 광고판 입지, 부동산 투자, 상권 이상 시그널처럼 수억 원이 걸린 동네 단위 의사결정을 풀려면 부동산 시세·유동인구·카드 매출·통신 계약 같은 이종 데이터를 동시에 해석해야 했습니다. 사람이 직접 SQL을 다 짜기엔 도메인 한정이라 멀티 에이전트 토론으로 풀기로 했습니다.',
      en: 'Decisions that hinge on a single neighborhood — opening a cafe, allocating rental-appliance ad budget, picking billboard spots, real-estate investing, anomaly response — require cross-reading several heterogeneous datasets at once (real-estate prices, foot traffic, card sales, telecom contracts). Hand-writing SQL across them is too domain-locked, so we leaned on a multi-agent debate.',
      ja: 'カフェ創業・レンタル家電マーケ・看板入地・不動産投資・商圏異常検知 — 数億円規模の地域単位意思決定を解くには、不動産価格・人流・カード売上・通信契約のような異種データを同時に解釈する必要がありました。人手でSQLをすべて書くのはドメイン限定的なので、マルチエージェント議論で解くことにしました。',
    },
    problem: {
      ko: '단일 SQL이나 단일 LLM 답변으로는 도메인 전문가의 시각(시세·트렌드·예측·이상감지·감성)을 동시에 다루기 어렵고, 결과의 신뢰가 빨리 떨어집니다. 또 각 분석이 따로 돌면 모순된 결론이 사용자 화면에 그대로 노출되는 문제가 있었습니다.',
      en: 'A single SQL query or single LLM answer can\'t simultaneously hold the multiple specialist viewpoints (pricing, trends, forecast, anomaly, sentiment) the decision needs, and the output stops being trustworthy fast. Running each analysis in isolation also tends to surface contradictions directly to the user.',
      ja: '単一SQLや単一LLMの回答ではドメイン専門家の視点（価格・トレンド・予測・異常検知・センチメント）を同時に扱うのが難しく、結果の信頼が急速に下がります。さらに各分析が独立して回ると、矛盾した結論がそのままユーザー画面に出てしまう問題がありました。',
    },
    hypothesis: {
      ko: 'GPT-4o 오케스트레이터가 목적별로 Cortex 전문가 5명을 동적으로 소환해 토론으로 합의에 도달시키면, 단일 답변보다 신뢰도와 깊이가 동시에 올라간다는 가설로 시작했습니다.',
      en: 'Hypothesis: a GPT-4o orchestrator dynamically summons five Cortex specialists per purpose and drives them to consensus through debate — that should beat a single-shot answer on both trust and depth at the same time.',
      ja: '仮説 — GPT-4oオーケストレーターが目的別にCortex専門家5名を動的に召喚し、議論で合意へ導けば、単一回答より信頼度と深度を同時に上げられる。',
    },
    alternatives: {
      ko: '단일 LLM(GPT-4o) 답변·단순 SQL 대시보드·룰 기반 추천 엔진을 검토했지만, 5종 데이터셋 교차 해석과 도메인 전문성을 동시에 만족하는 구조는 멀티 에이전트 토론밖에 없었습니다.',
      en: 'Considered a single-LLM (GPT-4o) answer, a plain SQL dashboard, and a rules-based recommendation engine — none of them simultaneously covered five-dataset cross-analysis and the per-domain expertise we needed, so multi-agent debate became the only fit.',
      ja: '単一LLM（GPT-4o）回答・通常のSQLダッシュボード・ルールベース推薦エンジンを検討しましたが、5種データセット横断解析とドメイン専門性を同時に満たす構造はマルチエージェント議論しかありませんでした。',
    },
    decision: {
      ko: 'GPT-4o 오케스트레이터 + 5명의 Cortex 전문가(데이터 분석가·트렌드 분석가·예측 분석가·인사이트 분석가·감성 분석가) 토론 구조로 결정했습니다. Cortex Analyst text-to-SQL × 4개 데이터셋 + ANOMALY_DETECTION + FORECAST + AI_CLASSIFY + AI_SENTIMENT 같은 Cortex Functions를 토론 안에서 자동 호출하게 묶었습니다.',
      en: 'Settled on a GPT-4o orchestrator plus five Cortex specialists (data analyst / trend analyst / forecaster / insight analyst / sentiment analyst) debating in turns, with Cortex Analyst text-to-SQL across four datasets + ANOMALY_DETECTION, FORECAST, AI_CLASSIFY, and AI_SENTIMENT called from inside the debate.',
      ja: 'GPT-4oオーケストレーター + 5名のCortex専門家（データ分析家・トレンド分析家・予測分析家・インサイト分析家・センチメント分析家）議論構造に決定。Cortex Analyst text-to-SQL × 4データセット + ANOMALY_DETECTION + FORECAST + AI_CLASSIFY + AI_SENTIMENTなどのCortex Functionsを議論内から自動呼び出しで束ねました。',
    },
    execution: {
      ko: '사용자가 목적 카드(카페 창업·렌탈·광고·투자·이상감지)를 선택하면 오케스트레이터가 그 목적에 맞는 전문가 5명을 동적으로 소환합니다. 전문가들은 20턴 안에서 SPH 유동인구·카드매출·자산소득·통신 신규개통 등을 교차 조회하며 토론하고, 이상치는 ANOMALY_DETECTION이 자동으로 끼어들어 발화권을 가져갑니다. 결론은 Top 3 동네 + 6개월 예측 + 이상 시그널 배지 + 실행 액션 체크리스트 형태로 정리됩니다.',
      en: 'A user picks a purpose card (cafe / rental / ad placement / investment / anomaly response) and the orchestrator dynamically summons five purpose-matched specialists. Within a 20-turn ceiling they cross-query foot traffic, card sales, asset income, telecom signups, and so on — and ANOMALY_DETECTION can interrupt the debate to claim the floor when it spots an outlier. The output lands as a Top 3 neighborhood ranking + a 6-month forecast + anomaly badges + an action checklist.',
      ja: 'ユーザーが目的カード（カフェ創業・レンタル・広告・投資・異常検知）を選ぶとオーケストレーターが目的に合う専門家5名を動的に召喚。専門家は20ターン以内でSPH人流・カード売上・資産所得・通信新規開通などを横断照会して議論し、外れ値はANOMALY_DETECTIONが自動で割り込んで発言権を取ります。結論はTop 3地域 + 6ヶ月予測 + 異常シグナルバッジ + 実行アクションのチェックリストとして整理されます。',
    },
    result: {
      ko: 'Snowflake AI & Data Hackathon Korea 2026 Tech Track 준우승(2위)을 받았습니다. 5개 프리셋 시나리오(카페 창업·렌탈 가전 마케팅·광고판 입지·부동산 투자·상권 이상감지)와 자유 입력 모두에서 토론 + 이상 시그널 + 6개월 예측 + 액션 체크리스트가 한 흐름으로 나오는 데모를 완성했습니다.',
      en: 'Took second place in the Snowflake AI & Data Hackathon Korea 2026 Tech Track. The demo runs all five preset scenarios (cafe / rental / ad placement / investment / anomaly response) plus a free-text path, each producing a single flow of debate + anomaly signal + 6-month forecast + action checklist.',
      ja: 'Snowflake AI & Data Hackathon Korea 2026 Tech Track準優勝（2位）を受賞しました。5つのプリセットシナリオ（カフェ創業・レンタル家電マーケ・広告入地・不動産投資・商圏異常検知）と自由入力のいずれでも、議論 + 異常シグナル + 6ヶ月予測 + アクションチェックリストが一連の流れで出るデモを完成させました。',
    },
    reflection: {
      ko: '에이전트가 그냥 토론만 하면 답이 발산합니다. PM 진행자 역할로 발화권을 강제로 회수하는 구조와, ANOMALY_DETECTION 같은 도구가 토론 흐름에 끼어드는 권한을 분리한 게 수렴의 핵심이었습니다. 결국 "사람이 매번 판단하지 않아도 시스템이 수렴하도록 설계"가 멀티에이전트 제품의 본질이라는 것을 다시 확인했습니다.',
      en: 'Left to their own devices, agents will diverge instead of converge. What made the system actually settle was giving a PM moderator the right to forcibly reclaim the floor, and separating that from the right of tools like ANOMALY_DETECTION to interrupt the debate. Bottom line: "designing the system to converge without a human in the loop every turn" is the real product question for multi-agent apps.',
      ja: 'エージェントは放っておくと議論が発散します。PM進行役が発言権を強制的に回収する仕組みと、ANOMALY_DETECTIONのようなツールが議論に割り込む権限を分離したことが収束の鍵でした。結局「人が毎回判断しなくてもシステムが収束するよう設計する」ことがマルチエージェント製品の本質だと再確認しました。',
    },
    visuals: {
      decision: {
        image: {
          src: '/images/projects/wigtnflake.png',
          alt: { ko: 'WIGTN FLAKE 아키텍처', en: 'WIGTN FLAKE architecture', ja: 'WIGTN FLAKEアーキテクチャ' },
        },
      },
    },
  },

  wigplugin: {
    oneLiner: {
      ko: '하나의 플러그인으로 12개 에이전트·3개 커맨드(/prd · /implement · /auto-commit)·3개 스킬을 묶어 "아이디어부터 프로덕션까지" 한 파이프라인으로 돌리는 Claude Code 플러그인. 오픈소스 공개.',
      en: 'A Claude Code plugin that bundles 12 agents, 3 commands (/prd · /implement · /auto-commit), and 3 skills into a single "idea → production" pipeline. Open-sourced.',
      ja: '一つのプラグインで12エージェント・3コマンド（/prd · /implement · /auto-commit）・3スキルを束ね、「アイデアからプロダクションまで」を1パイプラインで回すClaude Codeプラグイン。オープンソース公開。',
    },
    context: {
      ko: 'WIGTN 안에서 여러 명이 동시에 Claude Code로 개발할수록 결과물 충돌과 컨텍스트 혼선이 오히려 생산성을 떨어뜨리는 문제가 보였습니다. 단일 명령으로 PRD → 설계 → 병렬 빌드 → 코드 리뷰 → 커밋까지 같은 워크플로우 위에서 돌게 해야 한다는 필요가 명확해졌고, 그 결과물을 오픈소스로 공개해 다른 개발자들도 같은 흐름을 쓸 수 있게 했습니다.',
      en: 'Inside WIGTN, the more engineers ran Claude Code in parallel, the more output collisions and context drift started costing us productivity. We needed a single command path — PRD → design → parallel build → review → commit — sitting on the same workflow. We packaged that workflow as a plugin and opened it up.',
      ja: 'WIGTN内で複数人が同時にClaude Codeで開発するほど、成果物の衝突とコンテキスト混乱が逆に生産性を落とす問題が見えました。単一コマンドでPRD → 設計 → 並列ビルド → コードレビュー → コミットまで同じワークフロー上で回る必要が明確になり、その成果物をオープンソースで公開して他の開発者も同じフローを使えるようにしました。',
    },
    problem: {
      ko: 'AI 어시스턴트 생산성은 "AI 성능"보다 "여러 에이전트가 안정적으로 협업할 수 있는 운영 구조"에서 결정된다는 가설이 있었습니다. 개별 명령으로 PRD·구현·리뷰를 따로 호출하면 컨텍스트가 끊기고, 사람이 매번 사이를 이어줘야 했습니다.',
      en: 'Our working hypothesis: AI-assisted productivity is gated by the operating structure that lets multiple agents collaborate reliably, not by the model itself. Calling PRD / implement / review as separate commands kept dropping context and forced a human to stitch them back together every time.',
      ja: 'AIアシスタントの生産性は「AI性能」より「複数エージェントが安定協業できる運用構造」で決まるという仮説がありました。個別コマンドでPRD・実装・レビューを別々に呼び出すとコンテキストが切れ、人が毎回間を繋ぐ必要がありました。',
    },
    hypothesis: {
      ko: 'PRD → 설계 → 병렬 빌드 → 리뷰 → 커밋을 하나의 파이프라인 안에서 에이전트 팀(Backend·Frontend·AI Server·Ops)이 병렬로 분담하면, 같은 작업의 순차 진행 대비 ~6분 vs ~20분 수준으로 시간이 압축된다고 봤습니다.',
      en: 'If PRD → design → parallel build → review → commit all live in one pipeline and the agent teams (Backend / Frontend / AI Server / Ops) divide the build in parallel, we expected to compress full-cycle time from roughly 20 minutes (sequential) down to ~6 minutes.',
      ja: 'PRD → 設計 → 並列ビルド → レビュー → コミットを1パイプライン内でエージェントチーム（Backend・Frontend・AI Server・Ops）が並列分担すれば、同じ作業の順次進行 vs 約6分 vs 約20分のレベルで時間を圧縮できると考えました。',
    },
    alternatives: {
      ko: '에이전트마다 개별 호출하는 기존 방식, 단일 메가 에이전트로 통합하는 방식도 검토했지만 전자는 컨텍스트 전달 비용이 누적되고 후자는 한 에이전트가 모든 역할을 떠안아 책임 경계가 무너졌습니다.',
      en: 'Two alternatives were on the table — invoking each agent separately (the current default) or merging them into one mega-agent. The first kept piling up context-handoff cost; the second collapsed role boundaries because one agent had to wear every hat.',
      ja: 'エージェントごとに個別呼び出しする既存方式、単一メガエージェントに統合する方式も検討しましたが、前者はコンテキスト引き渡しコストが累積し、後者は一つのエージェントがすべての役割を抱えて責任境界が崩れました。',
    },
    decision: {
      ko: '단일 플러그인으로 12개 에이전트·3개 커맨드(/prd · /implement · /auto-commit)·3개 스킬·20개 디자인 스타일을 묶고, /implement는 자동으로 Backend·Frontend·AI Server·Ops 팀에 병렬 분배되게 설계했습니다. /auto-commit은 3개 리뷰 에이전트가 병렬로 평가하고 점수 ≥80일 때만 커밋, Security Critical은 점수 무관 차단.',
      en: 'Decided on a single plugin that bundles 12 agents, 3 commands (/prd · /implement · /auto-commit), 3 skills, and 20 design styles, with /implement auto-dispatching across Backend / Frontend / AI Server / Ops teams in parallel. /auto-commit runs three review agents in parallel and only commits at score ≥ 80, with Security Critical force-failing regardless of score.',
      ja: '単一プラグインで12エージェント・3コマンド（/prd · /implement · /auto-commit）・3スキル・20デザインスタイルを束ね、/implementは自動でBackend・Frontend・AI Server・Opsチームに並列分配される設計に。/auto-commitは3つのレビューエージェントが並列評価し、スコア80以上の時のみコミット、Security Criticalはスコア無関係に遮断。',
    },
    execution: {
      ko: '/prd는 PRD.md + 단계별 task plan을 생성하면서 동시에 4 에이전트 병렬 분석(Completeness·Feasibility·Security·Consistency)으로 PRD 자체의 품질 게이트를 건너뜁니다. /implement는 설계 단계에서 PRD 검증·아키텍처 결정·gap 분석을 병렬로 끝낸 뒤, 빌드 단계로 넘어가 4개 팀이 동시에 자기 영역만 짭니다. /auto-commit은 점수 기반 자동 머지와 사람 검토를 분리해 운영 안전성을 잡았습니다.',
      en: '/prd produces PRD.md + a phased task plan while running four agents in parallel to score the PRD itself across Completeness, Feasibility, Security, and Consistency. /implement closes design (PRD verification + architecture decision + gap analysis) in parallel, then drops into the build phase where four teams each touch only their slice. /auto-commit separates score-driven auto-merge from human-eyes review to keep production-side safety.',
      ja: '/prdはPRD.md + 段階別タスクプランを生成しながら、同時に4エージェント並列分析（Completeness・Feasibility・Security・Consistency）でPRD自体の品質ゲートを越えます。/implementは設計段階でPRD検証・アーキテクチャ決定・gap分析を並列で終え、ビルド段階に進んで4チームが同時に自分の領域だけを書きます。/auto-commitはスコアベース自動マージと人の検証を分離して運用安全性を確保しました。',
    },
    result: {
      ko: 'WIGTN-Coding은 Claude Code 플러그인으로 오픈소스 공개됐고, 다른 개발자들이 같은 파이프라인 위에서 작업할 수 있는 형태로 정리됐습니다. 풀 파이프라인 ~6분(vs 순차 ~20분)으로 압축됐고, 본인이 설계한 이 워크플로우 위에서 WIGENT(TRAE 대상)·WIGTN FLAKE(Snowflake 준우승)·WIGVO 등 후속 프로젝트가 모두 만들어졌습니다.',
      en: 'Released WIGTN-Coding as an open-source Claude Code plugin so other engineers can build on the same pipeline. Full pipeline compresses from ~20 minutes sequential to ~6 minutes, and every downstream project — WIGENT (TRAE Grand Prize), WIGTN FLAKE (Snowflake 2nd place), WIGVO — was built on top of this workflow.',
      ja: 'WIGTN-CodingをClaude Codeプラグインとしてオープンソース公開し、他の開発者が同じパイプライン上で作業できる形に整理しました。フルパイプライン約6分（vs 順次約20分）に圧縮され、本人が設計したこのワークフロー上でWIGENT（TRAE大賞）・WIGTN FLAKE（Snowflake準優勝）・WIGVOなど後続プロジェクトがすべて構築されました。',
    },
    reflection: {
      ko: 'AI 어시스턴트의 본질은 "더 좋은 답"이 아니라 "사람이 매번 사이를 잇지 않아도 시스템이 끝까지 도는 구조"라는 점을 가장 깊이 배운 프로젝트입니다. 그래서 점수 기반 자동 머지·Security Zero-Tolerance·역할 분리 같은 운영 구조 결정이 모델 선택보다 훨씬 큰 영향을 미쳤습니다.',
      en: 'The deepest lesson from this one: the real value of AI assistants isn\'t "a better answer," it\'s "a structure that runs end-to-end without a human stitching every gap." Decisions about score-driven auto-merge, Security Zero-Tolerance, and role separation ended up mattering far more than which model we picked.',
      ja: 'AIアシスタントの本質は「より良い回答」ではなく「人が毎回間を繋がなくてもシステムが最後まで回る構造」だということを最も深く学んだプロジェクトです。そのためスコアベース自動マージ・Security Zero-Tolerance・役割分離のような運用構造の決定がモデル選択よりはるかに大きな影響を与えました。',
    },
    visuals: {
      decision: {
        image: {
          src: '/images/projects/wigtncoding.svg',
          alt: { ko: 'WIGTN Coding 플러그인 아키텍처', en: 'WIGTN Coding plugin architecture', ja: 'WIGTN Codingプラグインアーキテクチャ' },
        },
      },
    },
  },

  wigvo: {
    oneLiner: {
      ko: '일반 전화선(PSTN) 위에서 동작하는 실시간 음성 통역 시스템. 듀얼 세션 + 에코 게이팅 아키텍처로 평균 557ms 지연, 148건 실통화 0건 에코 루프를 달성했고 ACL 2026 System Demonstrations에 1저자로 채택됐습니다.',
      en: 'A real-time voice translation system that runs over the regular PSTN. A dual-session + echo-gating architecture hits ~557ms average latency and 0 echo loops across 148 live calls; accepted to ACL 2026 System Demonstrations (first author).',
      ja: '一般電話線（PSTN）上で動作するリアルタイム音声通訳システム。デュアルセッション + エコーゲーティングアーキテクチャで平均557msの遅延・148件の実通話で0件のエコーループを達成し、ACL 2026 System Demonstrationsに第一著者で採択されました。',
    },
    context: {
      ko: '수신자가 앱을 깔지 않아도 일반 전화로 받기만 하면 양방향 통역이 동작해야 했습니다. 그러려면 통화 매개체는 PSTN(SIP)으로 가야 하고, 발신자·수신자 양쪽 오디오를 실시간으로 STT → 번역 → TTS로 동시에 처리하면서도 한쪽 출력이 다른 쪽 입력으로 다시 들어가는 에코 루프를 막아야 했습니다.',
      en: 'The product had to work without asking the called party to install anything — pick up a normal phone, and two-way translation should just run. That meant PSTN/SIP as the transport, with both sides simultaneously running STT → translation → TTS in real time, while preventing the output of one side from leaking back as input on the other (echo loops).',
      ja: '受信者がアプリを入れなくても普通の電話で出るだけで双方向通訳が動く必要がありました。そのため通話媒体はPSTN（SIP）で、発信者・受信者の双方の音声をリアルタイムでSTT → 翻訳 → TTSと同時処理しつつ、一方の出力がもう一方の入力に戻るエコーループを防ぐ必要がありました。',
    },
    problem: {
      ko: '핵심 문제는 두 가지였습니다. 첫째, 한 세션으로 양방향을 다루면 발신·수신 오디오가 섞여 에코가 발생합니다. 둘째, 통역은 종단 간 지연이 1초를 넘어가면 사용자가 자연스럽게 말을 이어가지 못합니다. 두 제약을 동시에 만족하는 구조가 필요했습니다.',
      en: 'Two problems sat at the core. First, running both directions inside one session causes the inbound and outbound audio to mix, which produces echo. Second, translation falls apart conversationally when end-to-end latency crosses about a second. The architecture had to satisfy both at the same time.',
      ja: '中核の問題は2つ。第一に、1セッションで双方向を扱うと発信・受信音声が混ざりエコーが発生します。第二に、通訳はエンド・ツー・エンド遅延が1秒を超えると会話が自然に続きません。両制約を同時に満たす構造が必要でした。',
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
      ko: '듀얼 OpenAI Realtime 세션(방향별 1개) + 소프트웨어 전용 에코 게이팅 파이프라인을 채택했습니다. 각 세션의 출력 오디오를 반대편 입력으로 흘리기 전에 게이팅·VAD로 자기 출력을 필터링하고, 양쪽 세션의 상태(말하는 중 / 듣는 중)를 공유 컨트롤러가 조율합니다. 통화 매체는 PSTN/SIP, 게이트웨이는 Twilio.',
      en: 'Settled on dual OpenAI Realtime sessions (one per direction) plus a software-only echo-gating pipeline. Before each session\'s output audio is routed into the other side\'s input, gating + VAD filters out the session\'s own output, and a shared controller coordinates speaking/listening state between the two sessions. PSTN/SIP as the transport, Twilio as the gateway.',
      ja: 'デュアルOpenAI Realtimeセッション（方向ごとに1個）+ ソフトウェア専用エコーゲーティングパイプラインを採用しました。各セッションの出力音声を反対側の入力に流す前に、ゲーティング・VADで自セッションの出力をフィルタリングし、両セッションの状態（発話中/聴取中）を共有コントローラーが調整します。通話媒体はPSTN/SIP、ゲートウェイはTwilio。',
    },
    execution: {
      ko: '운영에 도달하기까지 7단계 진화를 거쳤습니다. 단일 세션에서는 에코를 못 잡았고, 단순 듀얼 세션은 두 세션이 서로의 TTS를 듣고 끝없이 발화하는 루프가 생겼습니다. 자기 출력 인식 필터 → VAD 기반 게이팅 → 양 세션 상태 공유 → 발화권 컨트롤러로 단계를 쌓아가며 잡았고, 운영 환경에서는 VAD 지연을 480ms까지 끌어내려 자연스러운 대화 속도를 유지했습니다.',
      en: 'Production took seven rounds of iteration. A single session couldn\'t catch the echo at all; a naïve dual session ended up in an infinite loop where each side kept hearing the other\'s TTS and re-speaking. We layered solutions step by step — self-output detection, VAD-based gating, shared state across both sessions, and a speaking-turn controller — and in production we got VAD latency down to 480ms, fast enough to keep the conversation natural.',
      ja: '本番到達まで7段階の進化を経ました。単一セッションではエコーを捕えられず、単純なデュアルセッションでは互いのTTSを聞き続けて無限発話するループが発生。自出力認識フィルタ → VADベースゲーティング → 両セッション状態共有 → 発話権コントローラーと段階的に積み上げて解決し、本番ではVAD遅延を480msまで詰めて自然な会話速度を維持しました。',
    },
    result: {
      ko: '실측 기준 평균 종단 간 지연 약 557ms, 148건의 실통화에서 0건의 에코 루프를 기록했습니다. 이 결과를 정리한 시스템 논문이 ACL 2026 System Demonstrations에 1저자로 채택됐고, 수신자는 앱 설치 없이 일반 전화로 받기만 하면 양방향 통역이 동작하는 형태로 운영 단계에 도달했습니다.',
      en: 'Measured ~557ms average end-to-end latency and 0 echo loops across 148 live production calls. The system paper went to ACL 2026 System Demonstrations as the first author, and the product reached the operating stage where the called party just picks up a regular phone — no install — and two-way translation runs.',
      ja: '実測平均エンド・ツー・エンド遅延約557ms、148件の実通話でエコーループ0件を記録しました。この結果をまとめたシステム論文がACL 2026 System Demonstrationsに第一著者で採択され、受信者がアプリなしで普通の電話で出るだけで双方向通訳が動作する運用段階に到達しました。',
    },
    reflection: {
      ko: '에코 게이팅을 하드웨어 AEC가 아닌 소프트웨어 파이프라인으로 풀기로 한 결정이 핵심이었습니다. PSTN 환경 변동성을 정면으로 받는 대신 게이팅·VAD·상태 공유 3축으로 분해해 각각을 측정·튜닝 가능한 단위로 만들었기 때문에, 7단계 진화 안에서 정확히 어디가 깨지는지를 매번 짚을 수 있었습니다.',
      en: 'The pivotal call was choosing to solve echo with a software pipeline rather than hardware AEC. Instead of taking PSTN variability head-on, we decomposed the problem into gating, VAD, and shared state — three measurable, tunable axes. Across the seven iterations that decomposition let us pinpoint exactly which piece was breaking, every time.',
      ja: 'エコーゲーティングをハードウェアAECではなくソフトウェアパイプラインで解決した決定が核心でした。PSTN環境の変動性を正面から受ける代わりにゲーティング・VAD・状態共有の3軸に分解し、それぞれを測定・チューニング可能な単位にしたため、7段階の進化の中で毎回どこが壊れているかを正確に指摘できました。',
    },
    visuals: {
      decision: {
        image: {
          src: '/images/projects/wigvo_architecture.png',
          alt: { ko: 'WIGVO 듀얼 세션 + 에코 게이팅 아키텍처', en: 'WIGVO dual-session + echo-gating architecture', ja: 'WIGVOデュアルセッション + エコーゲーティングアーキテクチャ' },
          caption: { ko: '방향별 OpenAI Realtime 세션 2개를 병렬로 돌리고, 소프트웨어 전용 에코 게이팅 + VAD + 발화권 컨트롤러로 두 세션을 분리. PSTN/SIP 통화 매체는 Twilio.', en: 'Two parallel OpenAI Realtime sessions, one per direction, isolated by software-only echo gating + VAD + a speaking-turn controller. PSTN/SIP transport via Twilio.', ja: '方向ごとに2つのOpenAI Realtimeセッションを並列で動作させ、ソフトウェア専用のエコーゲーティング + VAD + 発話権コントローラーで両セッションを分離。PSTN/SIPの通話媒体はTwilio。' },
        },
      },
    },
  },
}
