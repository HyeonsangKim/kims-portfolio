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
  reflection: L
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

export const careerReports: Record<CareerReportKey, CareerReport> = {
  'oem-integration-server': {
    about: {
      ko: '노란마켓 같은 B2B 파트너사와 협력해, 갤럭시 공부폰 등 어린이용 특화 디바이스에 사전 탑재되는 자녀 안심 서비스의 통합 인증·권한 인프라. 파트너별 화이트라벨 서비스가 공유하는 단일 인증 인프라 위에서 자녀 위치 조회(오디야)와 자녀 디바이스 원격 제어(모하니)를 동시 수용해야 하며, 파트너 단위 권한 분리와 운영 추적성을 동시에 보장해야 하는 환경이었습니다.',
      en: 'A unified auth and authorization backbone for child-safety services pre-installed on OEM-specialized devices (Galaxy Studyphone, etc.) for B2B partners like Yellow Market. The infrastructure had to host multiple white-label services (Odiya for child location, Mohani for remote device control) on top of a single auth platform while keeping per-partner permission isolation and operational traceability.',
      ja: 'イエローマーケットなどB2BパートナーのGalaxy Studyphoneなど子供向け特化デバイスに事前搭載される子供安心サービスの統合認証・権限インフラ。パートナー別ホワイトラベルサービスが共有する単一認証基盤上で、子供位置確認（オディヤ）と子供デバイス遠隔制御（モハニ）を同時に収容し、パートナー単位の権限分離と運用追跡性を保証する必要のある環境でした。',
    },
    role: {
      ko: '인증 서버와 비즈니스 서버를 분리해 인증 장애가 전체 서비스로 전파되지 않는 구조를 설계했고, Token Rotation·RBAC·Audit Log를 결합한 엔터프라이즈 보안 체계를 단독으로 구축했습니다. Webhook 기반 이벤트 전파와 Retry + DLQ 구조로 서비스 간 인증 상태를 실시간 동기화하고, 메시지 유실 상황에서도 운영팀이 직접 재처리할 수 있는 도구까지 함께 제공했습니다.',
      en: 'Separated auth and business servers so authentication outages no longer propagate to product services, and single-handedly built an enterprise security stack combining Token Rotation, RBAC, and Audit Log. Webhook event propagation plus a Retry + DLQ pipeline keep cross-service auth state in sync in real time, with an admin console that lets operators reprocess messages directly when delivery fails.',
      ja: '認証サーバーとビジネスサーバーを分離し、認証障害が全サービスに波及しない構造を設計しました。Token Rotation・RBAC・Audit Logを組み合わせたエンタープライズセキュリティ体系を単独で構築。Webhookベースのイベント伝播とRetry + DLQ構造でサービス間認証状態をリアルタイム同期し、メッセージ消失時にも運用チームが直接再処理できるツールまで提供しました。',
    },
    highlights: {
      ko: [
        '여러 파트너 서비스가 공유하는 B2B 인증 인프라 단독 설계',
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
        'Sole architect of the B2B auth backbone shared by multiple partner services',
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
        '複数パートナーサービスが共有するB2B認証インフラを単独設計',
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
      ko: '사운드마인드 합류 후 첫 프로젝트로 Odiya를 받았습니다. 외주사가 백엔드와 기초 앱을 만들어둔 상태에서 운영 안정화가 시급한 시점이었습니다. 부모-자녀 위치 공유 서비스로 노란마켓·공부폰 OEM에 사전 탑재되어, 출하 단말이 늘수록 트래픽이 통제 불가능한 외부 변수로 따라 올라가는 구조였습니다. 팀장으로 리딩하며 Odiya 백엔드와 부모용·자녀용 앱까지 위치 데이터 파이프라인 전체를 설계·구현했습니다.',
      en: 'Odiya was the first project I took on after joining Soundmind. An outsourcing vendor had built the backend and the base apps, and operational stability was the urgent problem on the table. It is a parent-child location-sharing service pre-installed on Yellow Market and Studyphone OEM devices, so traffic grew along an external variable we couldn’t throttle. Leading the team, I designed and built the location data pipeline end-to-end — odiya-backend, parts of kidsphone-backend, and both the parent and child apps.',
      ja: 'サウンドマインド入社後、最初のプロジェクトとしてOdiyaを担当した。外注会社がバックエンドと基本アプリを構築済みで、運用安定化が急務だった。親子の位置共有サービスとしてイエローマーケット・スタディフォンOEMに事前搭載され、出荷台数の増加に伴いトラフィックが外生変数として伸びる構造だった。チームリーダーとしてodiya-backend、kidsphone-backendの一部、親側・子側アプリまで、位置データパイプライン全体を直接設計・実装した。',
    },
    problem: {
      ko: '외주사 코드는 자녀 단말이 좌표를 보내는 족족 JPA save() 단건 INSERT를 호출하는 패턴이었습니다. 분당 burst로 인입되는 좌표와, 같은 흐름에서 함께 도는 안전구역 평가 SQL이 누적되어 MySQL CPU가 100%까지 치솟으며 서버가 주기적으로 터지는 상태였습니다. 단말 수 × 송출 빈도가 선형으로 늘어나는 구조라, 인프라 증설 외에는 해법이 없어 보이는 시점이었습니다.',
      en: 'The vendor code called `save()` on every coordinate from every child device. Burst-inbound coordinates plus the same flow running safe-zone evaluation SQL drove MySQL CPU to 100%, taking the server down periodically. With load scaling linearly with devices × send rate, the only obvious path was to throw more infra at it.',
      ja: '外注コードは、子供端末が座標を送るたびにJPA save() 単件INSERTを呼ぶ構造でした。分単位でburst投入される座標と、同じフローで回る安全ゾーン評価SQLが累積し、MySQL CPUが100%に達してサーバーが定期的に落ちる状態。台数×送出頻度が線形に増える構造で、インフラ増設以外の道が見えにくい時点でした。',
    },
    hypothesis: {
      ko: '가설은 단순했습니다. "좌표 인입은 burst로 들어오는 write 중심이지만, 안전구역 평가는 유저별 최신 좌표 1개로 충분합니다. 즉 모든 좌표를 즉시 DB에 쓸 필요가 없습니다." 운영 중인 Redis 인프라가 이미 있었으므로, 새 자원을 추가하지 않고 가벼운 버퍼로 활용할 수 있다고 보았습니다.',
      en: 'The hypothesis was simple but on point: "Coordinate ingestion is burst-heavy writes, but safe-zone evaluation only needs the latest coordinate per user — so not every coordinate has to hit the database immediately." Redis was already in the stack, so we could reuse it as a lightweight buffer instead of adding new infrastructure.',
      ja: '仮説は単純ですが正確でした。「座標の流入はburst・書き込み集中だが、安全ゾーン評価はユーザーごとの最新座標1点で十分。つまり全座標を即DBに書く必要はない」。Redisは既に運用中だったので、新規リソースを足さずに軽量バッファとして活用できると見ました。',
    },
    alternatives: {
      ko: 'Kafka·SQS 같은 본격 메시지 큐는 외주사 인계 직후라 운영 인력·인프라 추가 부담이 컸습니다. DB-only 최적화(배치 INSERT 튜닝·인덱스)만으로는 절대량의 한계를 넘기 어려웠고, RANGE 파티션은 보존·DROP 자동화 측면에서 채택했지만 단건 batch 튜닝만으로는 부족했습니다. 최종적으로 이미 있는 Redis 인프라를 재활용한 버퍼 + 배치 조합이 운영 비용 대비 가장 현실적이었습니다.',
      en: 'Kafka or SQS would have added operational headcount and infra cost right after taking over an outsourced codebase. DB-only tuning (batch inserts, index changes) could not absorb the absolute volume; RANGE partitions were worth adopting for retention and automatic DROP, but batch tuning alone was not enough. Reusing the existing Redis infrastructure as a buffer + batch combination was the most realistic option for the operational cost we could afford.',
      ja: 'Kafka・SQSのような本格的なメッセージキューは、外注コードを引き継いだ直後で運用人員・インフラ追加負担が大きすぎました。DB-only最適化（バッチINSERT・インデックス）だけでは絶対量の限界を超えられず、RANGEパーティションは保存・DROP自動化のために採用しましたが、単件バッチチューニングだけでは不十分。最終的に既存のRedisインフラを再利用したバッファ+バッチの組み合わせが、運用コスト対比で最も現実的でした。',
    },
    decision: {
      ko: 'Redis는 두 갈래로 활용했습니다. 첫째는 위치 데이터 버퍼입니다. Redis Hash에 유저별 최신 좌표 1개를 24시간 동안 보관해 안전구역 평가에 바로 꺼내 쓰고, 별도 Redis List에는 모든 좌표를 push해 DB 영구 저장의 원천으로 두었습니다. 60초 주기로 도는 동기화 스케줄러가 List를 비우며 한 번에 batch INSERT를 수행하고, batch 처리 중 유저별로 중복을 걸러 마지막 좌표만 안전구역 평가에 흘렸습니다. 둘째는 자녀 회원 정보 캐시입니다. 부모 앱은 자녀의 이름·연락처·상태 같은 정보를 10초 간격 polling으로 반복 조회하는 구조라, 매번 DB를 거치지 않고 Redis 캐시 hit으로 응답하도록 별도 layer를 두었습니다. write는 batch로 모아 부하를 낮추고, read는 캐시로 흡수해 DB가 안정적으로 운영될 수 있게 한 묶음으로 운영했습니다. DB 측에서는 일자 기준 RANGE 파티션으로 모델링하고, 파티션 관리 스케줄러가 매일 자정에 다음날 파티션을 생성하고 15일 전 파티션을 삭제하도록 자동화했습니다. Redis 단일 인스턴스 운영은 의도된 선택이었습니다. 당시 트래픽 수준에서 Sentinel/Cluster는 운영 인력 대비 과한 투자였고, List 길이와 60초 batch 소요 시간을 모니터링 임계치로 잡아 트래픽이 한 단계 더 올라가는 시점에 자연스럽게 옮길 수 있는 경로를 미리 열어두는 쪽으로 균형을 잡았습니다.',
      en: 'I split the Redis model in two: `odiya_user:{userId}` (Hash, TTL 24h) holds only the latest coordinate per user for safe-zone evaluation, while `odiya_gathered_positions` (List) accepts every coordinate as the source of truth for DB persistence. `LocationSyncService` drains the List every 60 seconds with a batch INSERT, deduping `lastPositionPerUser` so only the most recent coordinate per user reaches safe-zone evaluation. On the DB side, the model is `RANGE(TO_DAYS(date))` partitioned with `PRIMARY KEY(id, date)`; `PartitionManagerService` runs at midnight every day, creating the next day partition and dropping the partition that turned 15 days old.',
      ja: 'Redisのデータモデルを2つに分けました。odiya_user:{userId} Hash（TTL 24h）はユーザーごとの最新座標1点のみを保持して安全ゾーン評価に使い、odiya_gathered_positions Listは全座標をpushしてDB永続化の源にしました。LocationSyncServiceが60秒周期でListを空にしながらbatch INSERTを実行し、バッチ処理中にlastPositionPerUserでdedupしてユーザーごとの最新座標のみを安全ゾーン評価に流します。DB側はRANGE(TO_DAYS(date)) パーティション + PRIMARY KEY(id, date) でモデル化し、PartitionManagerServiceが毎日0時に翌日パーティション生成と15日前パーティションDROPを自動実行します。',
    },
    execution: {
      ko: '처음부터 "버퍼 + 배치" 개념으로 도입했고, 다른 형태로 갔다가 옮긴 시행착오는 없었습니다. 운영 중에는 GPS 신호 노이즈를 거르는 보조 규칙(60초 이내 1,500m 이상 이동 시 안전구역 평가 스킵)을 위치 처리 파이프라인에 추가했는데, 이 임계값은 운영 데이터로 검증한 값이 아니라 직관으로 정한 규칙이라 자랑할 성과가 아니라 회고 영역으로 정직하게 다룹니다.',
      en: 'I went straight to the "buffer + batch" design — no detour or pivot. During operation I added a GPS-noise heuristic in kidsphone-backend (skip safe-zone evaluation if a user moves more than 1,500m within 60 seconds), but those thresholds were intuited rather than calibrated against production data, which I now treat honestly as a reflection point rather than a result.',
      ja: '最初から「バッファ + バッチ」のコンセプトで進め、別の形に行ってから移ったような試行錯誤はありませんでした。運用中にGPS雑音を弾くヒューリスティック（60秒以内に1,500m以上移動した場合は安全ゾーン評価をスキップ）をkidsphone-backendに追加しましたが、1500m・60秒の閾値は運用データで校正したものではなく直感で決めたヒューリスティックなので、誇る成果ではなく振り返り対象として正直に扱います。',
    },
    result: {
      ko: 'MySQL CPU가 100%까지 치솟던 사태가 해소되어, 인프라 증설 없이 운영이 안정화되었습니다. DB 쓰기 부하는 분당 INSERT 횟수 기준 약 95% 감소했고, 60초 batch에 안전구역 평가까지 함께 묶여 안정적으로 운영됩니다. 이 안정화가 노란마켓·공부폰 OEM 사전탑재 확장의 전제가 되어, 회사의 B2B 매출 약 230% 성장에 기여했습니다. 다만 인계받은 외주사 코드에는 운영 메트릭이 거의 없는 상태였고, 결국 MySQL CPU가 100%까지 치솟는 사태를 본 뒤에야 Redis 도입을 결정하는 흐름이 됐습니다. 같은 상황을 다시 만나면 인계 첫 단계에서 분당 INSERT 추이·DB CPU·Redis List 길이·60초 batch 소요 시간을 Prometheus + Grafana로 먼저 박아 임계점에 도달하기 전에 신호를 받는 쪽으로 가져가고, 운영 중 추가한 GPS 신호 노이즈 보조 규칙의 임계값(60초·1,500m)도 거짓 양성 분포를 운영 데이터로 측정해 다시 잡을 계획입니다.',
      en: 'MySQL CPU stopped pegging at 100% and operations stabilized without adding infrastructure. DB write load dropped roughly 95% measured by inserts per minute, with safe-zone evaluation running inside the same 60-second batch. That stability became the prerequisite for the Yellow Market and Studyphone OEM pre-install expansion, contributing to roughly 230% B2B revenue growth at the company.',
      ja: 'MySQL CPUが100%まで上がる事態は解消され、インフラ増設なしで運用が安定化しました。DB書き込み負荷は分単位INSERT回数で約95%減少し、60秒バッチ内で安全ゾーン評価まで一緒に回ります。この安定化がイエローマーケット・スタディフォンOEM事前搭載拡張の前提となり、会社のB2B売上約230%成長に寄与しました。',
    },
    reflection: {
      ko: '다시 한다면 observability를 처음부터 박았을 것입니다. Redis 도입은 "MySQL CPU가 100%까지 치솟는 걸 보고" 시작한 사후 대응이었는데, 분당 INSERT 추이·Connection Pool 사용률·DB CPU%·Redis List 길이·60초 batch 소요 시간을 Prometheus + Grafana로 시각화했다면 임계점에 도달하기 전에 신호를 받을 수 있었을 것입니다. 단일 Redis 인스턴스가 SPOF로 남은 부분도 같은 맥락에서 — 메트릭이 있었다면 Sentinel/Cluster 도입 우선순위를 더 일찍 올렸을 것이라 봅니다. 운영 중 추가한 GPS 튐 필터(1,500m·60초)의 임계값도 데이터 분석 없이 직관으로 정한 휴리스틱이라, 휴리스틱을 데이터로 검증하는 단계를 건너뛴 점이 솔직히 후회됩니다.',
      en: 'If I were to start over, I would wire observability in from day one. The Redis migration was reactive — kicked off after watching MySQL CPU peg at 100%. Charting inserts per minute, connection pool usage, DB CPU%, Redis list depth, and 60-second batch duration in Prometheus + Grafana would have given me a signal before the threshold was breached. The single-Redis SPOF is in the same category — with metrics in place I would have raised the priority on Sentinel or Cluster sooner. The GPS-noise heuristic (1,500m / 60s) is another honest regret: the thresholds were intuited, not validated against production data, and I skipped the step of grounding the heuristic in numbers.',
      ja: 'やり直すならobservabilityを初日から組み込みます。Redis導入は「MySQL CPUが100%に達するのを見て」始めた事後対応で、分単位INSERT推移・Connection Pool使用率・DB CPU%・Redis List長・60秒バッチ所要時間をPrometheus + Grafanaで可視化していれば、閾値到達前にシグナルを受けられたはずです。単一Redisが SPOFのまま残っている点も同じ流れで、メトリクスがあればSentinel/Cluster導入優先度を早く上げていたと考えます。運用中に追加したGPS雑音フィルタ（1500m・60秒）の閾値もデータ検証なしで直感で決めたヒューリスティックで、ヒューリスティックを数値で裏付ける段階を飛ばした点は率直に悔いが残ります。',
    },
  },

  'oem-integration-server': {
    oneLiner: {
      ko: '서비스는 계속 추가되는데 매번 회원가입을 따로 받는 구조가 사용자 불편과 운영 부담으로 누적되고 있어, 통합 OEM 인증을 회사에 제안해 채택을 받고 팀장으로 리딩하며 HS256 JWT, Refresh Token Family 재사용 탐지, DLQ 테이블과 운영자 콘솔, 3단계 휴면·탈퇴 라이프사이클까지 처음부터 설계·구현했습니다.',
      en: 'New services kept being added and each one signed users up from scratch — that was hurting both UX and operations. I proposed a unified OEM auth platform, got it approved, and led the team that built it from zero: HS256 JWT, refresh-token family reuse detection, a webhook DLQ table with an operator console, and a three-stage dormancy and withdrawal lifecycle.',
      ja: 'サービスが追加されるたびに会員登録をやり直す構造がユーザー体験と運用負荷の双方を圧迫していたため、統合OEM認証を社内に提案して採用され、チームリーダーとしてHS256 JWT、Refresh Tokenファミリー再利用検知、Webhook DLQテーブルと運用者コンソール、3段階の休眠・退会ライフサイクルをゼロから設計・実装した。',
    },
    context: {
      ko: '사운드마인드 합류 후 Odiya 안정화를 진행하면서, 앞으로 신규 서비스가 계속 붙는다면 매번 따로 회원가입을 받는 구조는 사용자 입장에서도 불편하고 관리 측면에서도 비용이 누적된다는 점이 명확히 보였습니다. 부모-자녀 안전 도메인이라 사용자 라이프사이클이 서비스별로 따로 저장되면 정합성 위험이 그대로 운영 사고로 이어집니다. 그래서 통합 OEM 인증을 회사에 제안했고, 채택된 뒤 팀장으로 리딩하며 백엔드(Spring Boot), 운영자 대시보드(Next.js), 가입·마이페이지 WebView까지 세 컴포넌트를 처음부터 설계·구현했습니다.',
      en: 'While stabilising Odiya it was clear that, given new services would keep being added, the existing pattern of asking users to sign up separately per product was going to keep hurting UX and pile operational cost on top. In a child-safety domain, splitting the user lifecycle per service also turns consistency risk straight into outage risk. So I proposed a unified OEM auth platform; once it was approved I led the team and built three components from scratch — backend (Spring Boot), operator dashboard (Next.js), and the signup/mypage WebView.',
      ja: 'サウンドマインドに入りOdiyaを安定化させながら、新規サービスが今後も継続的に追加されることを考えると、サービスごとに個別の会員登録を求める構造はユーザー体験と運用コストの双方を悪化させ続けると判断した。親子安全領域ではユーザーライフサイクルがサービスごとに分散すれば、整合性リスクがそのまま運用事故に直結する。そのため統合OEM認証を社内に提案し、採用後はチームリーダーとしてバックエンド（Spring Boot）、運用ダッシュボード（Next.js）、加入・マイページWebViewの3コンポーネントをゼロから設計・実装した。',
    },
    problem: {
      ko: '부모-자녀 관계가 Mohani · Odiya를 비롯한 여러 서비스 백엔드에 각각 따로 저장되면, 한 곳에서만 데이터가 어긋나도 사용자가 보는 화면에서 그대로 사고로 드러납니다. 자녀 단말은 백그라운드 위치 송출처럼 오래 가는 인증이 필요한데, 일반적인 짧은 access + refresh 회전 모델로는 자녀폰의 슬립·네트워크 끊김 사이에 위치가 끊겨버립니다. 미성년자 보호 정책상 자녀 자가 탈퇴는 막아야 하니 부모/자녀 탈퇴 처리는 비대칭이어야 했고, Webhook이 실패해도 운영팀이 직접 추적·재시도할 수 있어야 했습니다.',
      en: 'Storing parent-child relationships separately in four downstreams meant every consistency drift was one step from an outage. Child devices needed a long-lived auth lifetime for background location reporting — the usual short-access + refresh-rotation pattern doesn’t survive a child phone going to sleep or losing the network. Self-withdrawal had to be blocked for minors, so parent/child account-removal flows had to be asymmetric. And webhook failures had to be inspectable — fire-and-forget wasn’t an option.',
      ja: '親子関係を下流4箇所に別々に保存すると、整合性のずれがそのまま運用事故に直結する。子供端末は背景位置送出のような長寿命認証が必要で、通常の短いaccess + refresh回転モデルでは子供端末のスリープ・通信断の間に位置が抜けてしまう。未成年保護のため子供の自己退会は塞ぐ必要があり、親と子で退会処理は非対称にする必要があった。Webhookが失敗しても運用チームが直接追跡・再試行できる仕組みも必須だった。',
    },
    hypothesis: {
      ko: '네 가지를 잡고 들어갔습니다. 첫째, 부모와 자녀에게 같은 토큰 모델을 강제하지 않습니다. 부모는 표준 JWT와 Refresh 토큰 회전으로 가고, 자녀는 길게 발급한 access 토큰을 DB에 AES-GCM 암호화로 묶어두고 재로그인 시 복호해 다시 쓰는 비대칭 구조로 풉니다. 둘째, Refresh Token 재사용 탐지는 사고가 터진 다음에 붙이는 것이 아니라 도메인 특성상 처음부터 설계에 넣어야 합니다. 셋째, Webhook 신뢰성은 메모리상의 3회 재시도만으로는 부족하고 DLQ 테이블과 운영자 콘솔이 함께 있어야 합니다. 넷째, 서비스 단위 탈퇴 신호와 계정 전체 탈퇴 신호는 같은 종류로 보면 안 됩니다. 전자는 한 서비스의 데이터를 정리하라는 신호고, 후자는 JWT 토큰까지 모든 서비스에서 차단해야 하는 신호라 둘을 분리합니다.',
      en: 'Four design bets. (1) Don’t force the same token model on parents and children — parents use a standard JWT with refresh rotation, children get a long-lived access token stored AES-GCM-encrypted in the DB and re-used on re-login. (2) Refresh-token reuse detection ships from day one — in a child-safety domain you don’t retrofit that after an incident. (3) In-memory 3-retry isn’t enough for webhooks; a DLQ plus an operator console are mandatory. (4) "service withdrawal" (data cleanup) and "account withdrawal" (full cutoff, JWT blacklist) are different signals and have to stay distinct.',
      ja: '4つの設計判断を最初に置いた。第一に、親と子に同じトークンモデルを強制しない — 親は標準JWTとRefresh回転で、子供は長期間のaccessをDB上にAES-GCMで暗号化保存し再ログイン時に復号して再利用する非対称構造にする。第二に、Refresh Token再利用検知は事故が起きてから付けるものではなく、ドメイン特性上、初日から設計に組み込む。第三に、Webhook信頼性はin-memory 3回リトライだけでは不足、DLQと運用者コンソールを併設する。第四に、「サービス退会（データ整理）」と「アカウント退会（JWTまで遮断）」はシグナル自体を分ける。',
    },
    alternatives: {
      ko: 'Auth0·Cognito·Firebase Auth 같은 매니지드 인증은 자녀 자가 탈퇴 금지, 재가입 승인 흐름, 자녀 토큰의 장수 라이프타임 같은 미성년자 도메인 정책을 외부 서비스로 푸는 비용이 직접 만드는 것보다 컸습니다. Spring Authorization Server(OAuth 2.0 표준)는 외부 파트너 연동이 아닌 자사 백엔드 통합이 1차 목표였던 시점에 표준 프로토콜의 제약이 더 부담이라 자체 모델링을 골랐습니다. Webhook도 Kafka·RabbitMQ는 운영 인력·인프라 추가 부담이 컸고, 메모리상의 재시도 + DLQ 테이블 + 운영자 콘솔이 사고에 운영팀이 직접 개입할 수 있다는 점에서 더 맞았습니다.',
      en: 'Managed auth (Auth0, Cognito, Firebase Auth) didn’t fit — bending it around minor-self-withdrawal-forbidden, re-signup approval workflows, and long-lived child tokens would have cost more than building it. Spring Authorization Server (OAuth 2.0 standard) was off the table for the same reason: at the time the goal was unifying our own backends, not external partner integration, and the protocol’s constraints would have outweighed the portability it offered. On webhooks, Kafka and RabbitMQ would have added operational headcount we didn’t have; in-memory retries + a DLQ table + an operator console gave the ops team the same recovery surface at far lower running cost.',
      ja: 'Auth0・Cognito・Firebase Authのようなマネージド認証は、未成年者の自己退会禁止、再加入承認フロー、子供トークンの長寿命ライフタイムといった未成年者ドメインの制約を外部サービスで解くコストが、内製コストを上回った。Spring Authorization Server（OAuth 2.0標準）は外部パートナー連携ではなく自社バックエンド統合が一次目標である時点で、標準プロトコルの制約のほうが負担だったため直接モデリングを選択。WebhookもKafka・RabbitMQは運用人員・インフラ追加負担が大きく、in-memoryリトライ + DLQ DB + 運用者コンソールが事故時に運用チームが直接介入できる点でより適していた。',
    },
    decision: {
      ko: 'HS256 대칭키와 family_id UUID로 토큰 모델을 단순화하고, 회수된 refresh 토큰이 다시 들어오면 같은 family를 즉시 전부 무효화하면서 감사 로그를 남기게 했습니다. HS256은 다운스트림이 모두 자사 백엔드라 secret 공유 운영 비용이 낮다는 점을 활용한 의도된 선택이고, 외부 파트너 연동이 본격화되는 단계에서는 RS256으로 옮기는 경로를 함께 설계해 두었습니다. 자녀 access 토큰을 2년으로 길게 잡고 DB AES-GCM 암호화로 보관하는 비대칭 구조도 같은 맥락의 선택입니다. 자녀폰은 Android의 background process kill 정책과 네트워크 토글이 자녀 보호용 단말 특성상 일상적으로 일어나서 refresh 호출 시점 자체가 보장되지 않고, 위치 송출이 한 번이라도 끊기면 보호자 컴플레인으로 직결되는 도메인이라, 표준적인 짧은 access + refresh 회전 패턴 대신 오래 가는 access 토큰을 DB에서 안전하게 재사용하는 쪽을 골랐습니다. Webhook은 전용 비동기 스레드풀에서 1초·5초·15초 간격으로 3회 재시도하고, 그래도 실패하면 webhook_dlq 테이블에 적재한 뒤 운영자 콘솔에서 목록·상세·재시도·포기를 누를 수 있게 했고, 재시도 성공과 포기 모두 감사 로그로 남깁니다. 짧은 backoff는 일시적인 네트워크 hiccup만 자동으로 흡수하고, 그보다 긴 다운스트림 장애는 운영자 콘솔에서 사람이 직접 보고 판단하라는 쪽으로 의도적으로 잘랐습니다. 휴면과 탈퇴는 매일 정오에 도는 스케줄러가 활성 서비스가 0인 계정을 휴면 안내 상태로 바꾸고, 자녀는 30일 후 익명화한 다음 2년 뒤 phoneHash까지 완전 삭제, 부모는 30일 + 2년 후 완전 삭제로 비대칭 처리합니다.',
      en: 'I kept the token model simple with HS256 and a `family_id` UUID; the moment a revoked refresh shows up again, the whole family is invalidated and an audit row is written. Webhooks run on a dedicated async pool with retries at 1s / 5s / 15s; anything still failing lands in `webhook_dlq` and the operator console exposes list / detail / retry / dismiss — both successful retries and dismissals leave an audit trail. Lifecycle: a noon scheduler flips ACTIVE accounts with zero active services to DORMANT_NOTIFIED, then children are anonymised 30 days later and fully deleted (including phoneHash) two years after that; parents are hard-deleted after 30 days + 2 years. Parent and child paths are deliberately asymmetric.',
      ja: 'HS256対称鍵とfamily_id UUIDでトークンモデルを単純化し、回収済みrefreshが再度現れた瞬間、同じfamily全体を即座に無効化し監査行を書き込む。Webhookは専用の非同期スレッドプールで1s・5s・15s間隔の3回リトライを行い、それでも失敗するとwebhook_dlqテーブルに積み、運用者コンソールから一覧・詳細・再試行・破棄を操作できる — 再試行成功と破棄の双方にaudit logが残る。ライフサイクル：毎日正午に走るスケジューラがアクティブサービス0のアカウントをDORMANT_NOTIFIEDに遷移させ、子供は30日後に匿名化、その2年後にphoneHashまで完全削除。親は30日 + 2年後にhard delete。親と子の経路は意図的に非対称にしている。',
    },
    execution: {
      ko: '운영하면서 부족한 부분을 발견할 때마다 DB 스키마 변경 스크립트(Flyway 마이그레이션)를 한 번씩 추가해 채워나갔습니다. 8번째 마이그레이션(V8)에서는 기획 요구로 같은 부모-자녀가 mohani와 odiya를 서비스별로 따로 가입할 수 있게 각 서비스를 구분하는 컬럼(`service_id`)을 도입해, 연동 요청과 부모-자녀 연결을 서비스 단위로 분리했습니다. 19번째 마이그레이션(V19)에서는 메모리 상의 3회 재시도가 모두 실패한 Webhook을 운영팀이 추적할 수단이 없다는 점이 드러나, 실패한 Webhook을 따로 보관하는 테이블(`webhook_dlq`)과 운영자 콘솔을 함께 투입했고, 같은 메시지가 두 번 처리되지 않도록 메시지마다 부여한 고유 키(`idempotency_key`)에 중복 방지 제약을 걸었습니다. 21번째(V21)는 웹에서 바로 가입한 사용자에게 휴면 안내가 중복 발송되는 경로를 막기 위해 안내 발송 여부를 기록하는 컬럼(`direct_notice_sent_at`)으로 한 번만 보내도록 보장했습니다. 22번째(V22)에서는 계정 전체 탈퇴 신호(`ACCOUNT_WITHDRAWN`)를 추가했는데, 기존 서비스 단위 탈퇴 신호(`SERVICE_WITHDRAWN`)는 "한 서비스에서만 데이터를 정리하라"는 의미인 반면 계정 자체가 사라질 때는 JWT 토큰까지 모든 서비스에서 차단해야 해서 별도 신호가 필요해진 시점이었습니다.',
      en: 'Whenever operating the platform surfaced a gap, I wrote a Flyway migration to close it. V8 added a `service_id` column — a planning ask — so the same parent and child could opt into mohani and odiya independently, splitting `LinkRequest` from `ParentChildLink`. V19 landed once we saw webhooks that had failed all three in-memory retries and the ops team had no way to recover them: the `webhook_dlq` table (with a `idempotency_key` UNIQUE constraint) and its operator console shipped together. V21 added `direct_notice_sent_at` to stop dormancy notifications being double-sent to `sso-web-client` direct signups. V22 split `ACCOUNT_WITHDRAWN` out from `SERVICE_WITHDRAWN` once it was clear data cleanup wasn’t a strong enough signal — we needed a distinct event that meant "blacklist this JWT everywhere".',
      ja: '運用しながらギャップが見えるたびにFlywayマイグレーションを書き足していった。V8は企画要求で、同じ親子がmohaniとodiyaにサービス別に個別加入できるようservice_idカラムを導入しLinkRequestとParentChildLinkを分離。V19はin-memory 3回リトライが全失敗したWebhookを運用チームが追跡できない点が表面化したため、idempotency_key UNIQUE制約を持つwebhook_dlqテーブルと運用者コンソールを一緒に投入。V21はsso-web-client直接加入者の休眠通知が二重送信される経路を塞ぐためdirect_notice_sent_at列でidempotencyを保証。V22はデータ整理だけでは弱い遮断シグナルが必要となったタイミングで、ACCOUNT_WITHDRAWNをSERVICE_WITHDRAWNと意味を分けて追加した。',
    },
    result: {
      ko: 'Mohani · Odiya 같은 연결 서비스들이 부모-자녀 관계의 출처로 OEM 인증 서버를 바라보게 됐고, 각자는 Redis 캐시만 유지하면서 가입·탈퇴·연동 같은 사용자 이벤트는 모두 Webhook으로 받아 동기화하는 구조가 정착했습니다. DLQ와 운영자 콘솔 덕에 Webhook 동작을 운영팀이 직접 추적할 수 있게 됐고, 재시도와 포기 모두 감사 로그로 남습니다. 휴면 → 익명화 → 완전 삭제 3단계 흐름은 개인정보보호법 보존 기간 정책을 사람이 일일이 챙기지 않아도 자동으로 따라갑니다. 다만 자체 SSO는 외부 파트너 연동이 본격화되는 시점에 OAuth 2.0 표준(Spring Authorization Server) 위로 옮기는 마이그레이션이 다음 과제로 남아 있습니다. 자녀 토큰의 DB 보관도 GCM 자체는 안전하지만 키 노출 위험이 결국 운영팀의 책임으로 남는 구조라, HSM·KMS 같은 키 격리와 HMAC secret rotation·phoneHash salt 같은 보안 디테일을 다음 단계에서 명시적으로 정책화할 영역으로 두었습니다.',
      en: 'Downstream services now lean on the OEM auth server as the source of truth for parent-child relationships; each keeps only a cache and syncs lifecycle events through webhooks. The DLQ + operator console gave webhook delivery actual operational visibility — retries and dismissals are both audited. The three-stage dormant / anonymise / hard-delete lifecycle satisfies Korean privacy-law retention rules automatically instead of being a recurring manual chore.',
      ja: 'ダウンストリームサービスはOEM認証サーバーを親子関係のSingle Source of Truthとして頼るようになり、各自はキャッシュのみを保持してライフサイクルイベントをWebhookで受け取り同期する構造が定着した。DLQと運用者コンソールによりWebhook運用可視性が確保され、再試行・破棄ともにauditに残る。3段階の休眠・匿名化・完全削除ライフサイクルは、個人情報保護法の保存期間ポリシーを人手で毎回管理しなくても自動で追従する。',
    },
    reflection: {
      ko: '지금 시점에 명백히 잘못된 결정으로 보이는 부분은 없습니다. 다만 다시 한다면 두 가지는 검토하고 갈 것 같습니다. 하나는 OAuth 2.0 표준(Spring Authorization Server) 위에 도메인 제약을 얹는 구조 — 직접 만든 것이 도메인 특수성을 모델링하기에는 좋았지만, 외부 파트너 연동이 본격화되면 표준 프로토콜이 없다는 점이 결국 마이그레이션 비용으로 돌아옵니다. 다른 하나는 자녀 access를 DB에 AES-GCM으로 보관하는 패턴 — GCM 자체는 안전하지만 결국 키 노출 위험이 운영 책임으로 남습니다. 같은 길을 다시 간다면 HSM·KMS 같은 키 격리도 같이 검토했을 것입니다.',
      en: 'Looking back I don’t see anything clearly wrong, but two things I’d at least re-examine. One is whether to layer the domain constraints on top of Spring Authorization Server (OAuth 2.0) — building it bespoke was a good fit for the domain, but once external partners start integrating, missing the standard protocol becomes migration debt. The other is storing child access tokens AES-GCM-encrypted in the DB — GCM itself is safe, but key exposure ultimately stays an operational liability, so today I’d at least put HSM / KMS-style key isolation on the table next to it.',
      ja: '現時点で明確に誤った決定だと思う部分はない。ただやり直すなら2点は検討すると思う。一つはOAuth 2.0標準（Spring Authorization Server）の上にドメイン制約を載せる構造 — 自前で作ったほうがドメイン特殊性のモデリングには向いていたが、外部パートナー連携が本格化すれば標準プロトコル不在がそのままマイグレーション負債になる。もう一つは子供アクセストークンをDB上にAES-GCMで保管するパターン — GCM自体は安全でも、結局鍵漏洩リスクが運用責任として残るため、今ならHSM・KMSによる鍵分離も併せて検討するだろう。',
    },
  },

  mohani: {
    oneLiner: {
      ko: '자녀 단말 통제에서 "차단이 안 되는 버그"를 추적하다가 Knox 통합 시점에 생긴 CPU 과부하를 발견, 무거운 Native 작업을 백그라운드 스레드로 분리해 ANR을 해소하고 Knox MDM + AccessibilityService 다층 방어로 자녀 단말 제어를 안정화했습니다.',
      en: 'Tracking a "blocking does not fire" bug led me to a CPU-overload trail that appeared the moment the Knox SDK was wired in — moving the heavy native calls onto a background executor cleared the recurring ANR and got the Knox MDM + AccessibilityService defence-in-depth back to steady-state.',
      ja: '子供端末制御で「ブロックが効かない」バグを追跡する中で、Knox統合タイミングに生じたCPU過負荷を発見、重いNative処理をバックグラウンドスレッドに分離してANRを解消し、Knox MDM + AccessibilityServiceの多層防御で子供端末制御を安定化させました。',
    },
    context: {
      ko: '부모(MohaniParent)가 자녀(BlockApp) 단말의 앱 차단, 시간 제한, 수면 시간, 콘텐츠 차단을 원격 제어하는 제품입니다. 사업부에서는 "자녀 단말 통제 기능을 무조건 만들어야 한다"는 요구가 먼저 들어왔고, 일반 앱 권한으로는 기술적으로 가능한지 확인되지 않은 상태였습니다. 본인이 Android AccessibilityService와 Samsung Knox MDM 조합으로 시스템 레벨 차단이 실제로 가능하다는 기술 검증 보고서를 사업부에 제출해, 사업 추진을 미루지 않고 곧바로 출시 일정을 잡을 수 있는 근거를 만들었습니다. 이후 팀장으로 리딩하며 BlockApp(RN + Native), MohaniParent(RN), Mohani Server(Spring Boot) 세 컴포넌트를 설계·구현했습니다. 단순한 React Native 앱이 아니라 Knox MDM 라이선스 단말 전용 엔터프라이즈 통제 앱이라, 자체 NativeModule을 여러 개 작성하고 차단 로직 전반을 짰습니다.',
      en: 'Mohani is the product where a parent app (MohaniParent) drives the child device app (BlockApp) — app blocking, time limits, sleep schedules, content filtering, all over the air. It is not a generic React Native app: it only runs on Samsung Knox MDM-licensed hardware. `AppBlockService.java` is a single 2,674-LOC AccessibilityService class, `FCMService.ts` is another 1,161 LOC, and seven native modules are mine. I owned all three components — BlockApp (RN + Native), MohaniParent (RN), and Mohani Server (Spring Boot) — solo.',
      ja: '親（MohaniParent）が子供（BlockApp）端末のアプリブロック・時間制限・睡眠時間・コンテンツブロックを遠隔制御する製品で、単なるReact Nativeアプリではなくサムスン Knox MDMライセンス端末専用のエンタープライズ制御アプリです。AppBlockService.javaは単一クラス2,674 LOC、FCMService.tsは1,161 LOC規模、自社NativeModule 7個を直接作成しました。BlockApp（RN + Native）、MohaniParent（RN）、Mohani Server（Spring Boot）3コンポーネントすべて単独責任です。',
    },
    problem: {
      ko: '차단의 어려움은 두 갈래로 들어왔습니다. 하나는 ANR이었습니다. "차단이 안 된다"는 사용자 컴플레인을 받고 Logcat을 따라가다 CPU 과부하 흔적을 발견했는데, 백그라운드 서비스가 죽은 게 아니라 main thread가 잡혀 차단 동작 자체가 못 돌고 있었습니다. 결정적인 단서는 시간 흐름이었습니다. 원래는 없던 증상이 Knox SDK를 통합한 이후부터 생겼다는 점입니다. 다른 하나는 우회 경로였습니다. 유튜브 PIP, 음악 재생 앱, 녹음 앱처럼 화면 없이 백그라운드에서 도는 앱은 `onAccessibilityEvent(TYPE_WINDOW_STATE_CHANGED)` 트리거가 발화하지 않아 차단 자체가 작동하지 않았습니다. 보호자가 자녀의 유튜브 사용 시간을 걸어둬도 PIP 창으로 재생을 계속 듣는 식의 우회가 가능한 상태였습니다.',
      en: 'The signal was not an ANR monitoring alert — it was users reporting "the block does not fire". I first suspected the background service had been killed, walked Logcat, and instead found CPU-overload trails. The service had not died: the main thread was getting pinned, so the blocking logic itself was not running. The decisive clue was timing — this symptom only appeared after the Knox SDK was integrated.',
      ja: '出発点はANR監視アラームではなく「ブロックが効かない」というユーザーからの報告でした。最初は背景サービスが落ちたと疑いLogcatを追ったところCPU過負荷の痕跡を発見、背景が落ちたのではなくmainスレッドが詰まりブロック動作自体が回っていなかったという事実に至りました。決定的な手掛かりはタイミング — 元々無かった症状がKnox SDK統合後に出始めた点でした。',
    },
    hypothesis: {
      ko: '"변경 이력에서 가장 가까운 원인부터 의심한다"는 원칙으로 Knox SDK 통합 시점을 강한 후보로 잡았고, Knox 관련 코드가 main thread를 잡고 있을 가능성을 가설로 세웠습니다. Bridge·Broadcast·Knox 셋이 얽힌 상태에서도 시간 축으로 좁힐 수 있는 단서가 있었기 때문에 가설 자체는 단순했습니다.',
      en: 'The principle I leaned on was "blame whatever changed most recently first" — the Knox SDK integration was the obvious candidate. My hypothesis was that the Knox calls were pinning the main thread. RN bridge, Android Broadcast, and Knox IPC were all entangled, but the timing clue let me narrow the search before unpicking the entanglement.',
      ja: '「変更履歴で最も近い原因から疑う」原則でKnox SDK統合時点を強い候補とし、Knox関連コードがmainスレッドを詰まらせている可能性を仮説としました。Bridge・Broadcast・Knoxの3つが絡む状態でも時間軸で絞れる手掛かりがあったため、仮説自体は単純でした。',
    },
    alternatives: {
      ko: 'systrace·Perfetto·Firebase Crashlytics ANR thread dump 같은 본격 진단 도구는 정확도는 높지만 셋업 시간·학습 곡선 부담이 컸습니다. Knox 통합 이후라는 시점 단서가 명확했기 때문에, Android Studio Logcat과 AI 코드 분석 보조를 조합한 빠른 path가 합리적이라고 판단했습니다.',
      en: 'systrace, Perfetto, Firebase Crashlytics ANR thread dumps would have been more precise but came with real setup and learning costs. Because the timing clue narrowed the search so cleanly, the cheap-and-fast path — Android Studio Logcat plus an AI co-pilot to read the Knox call graph — was the proportional choice.',
      ja: 'systrace・Perfetto・Firebase Crashlytics ANR thread dumpといった本格的な診断ツールは精度は高いものの、セットアップ時間・学習コストの負担が大きかったです。Knox統合以降という時間的手掛かりが明確だったため、Android Studio LogcatとAIコード分析補助を組み合わせた高速pathが妥当と判断しました。',
    },
    decision: {
      ko: 'Logcat에서 CPU 과부하 흐름을 따라가면서 Knox 호출이 들어있는 코드를 AI에게 유심히 분석시켰고, main thread를 잡는 호출 흐름을 빠르게 좁혔습니다. 해결은 무거운 Native 작업을 백그라운드 스레드로 분리하는 것이었고, Knox 앱 강제 종료 호출을 단일 스레드 executor에서 비동기로 동작하도록 옮겨 Knox SDK가 main에서 동기로 도는 경로를 끊었습니다.',
      en: 'Logcat traced the CPU spike, and I had an AI go through the Knox-adjacent code carefully — together that narrowed the offending call path quickly. The fix was to move the heavy native work onto a background thread: `KnoxDomainModule.stopApps` now runs asynchronously on a single-threaded executor, severing the chain where the Knox SDK was being invoked synchronously on the main thread.',
      ja: 'LogcatでCPU過負荷の流れを追いつつ、Knox呼び出しが含まれるコードをAIに丁寧に分析させ、mainスレッドを詰まらせる呼び出し経路を素早く絞り込みました。解決は重いNative処理をバックグラウンドスレッドに分離することで、KnoxDomainModuleのstopAppsは単一スレッドexecutor上で非同期動作させ、Knox SDKがmain上で同期実行されていた経路を断ち切りました。',
    },
    execution: {
      ko: 'ANR 진단은 Logcat 흐름과 AI 코드 분석 보조를 함께 써서 Knox 호출 그래프에서 main thread를 잡는 지점을 빠르게 좁혔고, 무거운 Native 작업을 단일 스레드 executor로 옮겨 직렬화하면서 큐 크기에 상한을 두고 그 한도를 넘으면 호출 스레드에서 직접 실행하도록 강제했습니다. 백그라운드 차단 문제는 Android Developers 문서와 stack overflow를 뒤지면서 Android의 사용 이벤트 추적 API에서 포그라운드 서비스 시작·종료 카운트를 따라가면 화면이 없는 앱도 실행 여부를 감지할 수 있다는 점을 찾아냈고, 그 카운트를 차단 판단에 추가해 PIP·음악·녹음 앱처럼 우회되던 케이스를 모두 잡았습니다. 둘을 같이 보면 단일 트리거로는 우회되는 도메인이라는 결론이 명확해져, 앱 전환 감지 · 시간 초과 검사(1분 주기) · 화면 없이 도는 백그라운드 앱 감지 · 정책 변경 즉시 반영 · 원격 차단 명령이 각각 다른 우회 경로를 막도록 다층 방어를 구성했습니다.',
      en: 'Diagnosis was the execution. Using an AI as a reading partner on the Knox call graph let me close the loop in a single cycle, without a meaningful trial-and-error pivot. Looking wider, blocking itself was a defence-in-depth problem: a single trigger can be bypassed, so I composed five layers — app transition (AccessibilityEvent), time-overrun (1-minute tick), headless background detection (FGS counter), instant policy propagation (SharedPreferences listener), and remote command (FCM `BLOCK_APP`) — each closing off a different evasion path.',
      ja: '診断の流れがそのまま実行でした。AIをコード分析の相棒として使いKnox呼び出しグラフを素早く読み、大きな試行錯誤なしに一度のサイクルで解決しました。より広く見ると、ブロック自体も単一トリガーでは回避される領域なので、アプリ遷移（AccessibilityEvent）・時間超過（1分周期）・ヘッドレス背景（FGSカウント）・ポリシー変更即時反映（SharedPreferences listener）・遠隔コマンド（FCM `BLOCK_APP`）がそれぞれ異なる回避経路を塞ぐ多層防御を組みました。',
    },
    result: {
      ko: '반복 발생하던 ANR이 제거되어 차단 기능이 안정 동작하게 됐고, 다층 방어가 정상 운영되면서 단일 트리거로는 잡히지 않던 백그라운드 음악·녹음앱처럼 화면 없는 앱도 FGS 카운트로 함께 차단됩니다. 사용자 입장에서는 "차단이 안 된다"는 컴플레인이 사라졌고, 운영 측에서는 Knox 통합 같은 큰 변경 후에도 회귀가 잡힌 구조가 만들어졌습니다. 다만 AccessibilityService 클래스가 차단 트리거·우회 감지·PIN gateway·Knox 호출을 한 곳에 끌어안고 있어, 새 기능을 넣을 때 사이드 이펙트 위험이 컸습니다. 한 단계 더 가져갈 때는 도메인 단위로 분리하고 단위 테스트 가능한 구조로 옮기는 것이 우선순위입니다. PIN 검증 native HTTP 호출에도 certificate pinning을 추가해 MITM 공격 표면을 한 번 더 줄여둘 계획이고, 차단 동작 자체는 Google Play Console ANR 비율과 Firebase Crashlytics를 운영 대시보드에 처음부터 박아 사용자 컴플레인 이전에 신호를 받을 수 있게 가져가는 것이 다음 단계입니다.',
      en: 'The recurring ANR went away and blocking became reliable. The defence-in-depth layers run as intended, so even headless apps like background music players that no single trigger could catch are blocked through the FGS counter. From the user side, the "blocking does not fire" complaints stopped; on the operations side, we now have a structure that catches regressions even after large changes like a Knox SDK upgrade.',
      ja: '繰り返し発生していたANRが消え、ブロック機能が安定動作するようになり、多層防御が通常稼働することで単一トリガーでは捕まらなかった背景音楽・録音アプリのような画面のないアプリもFGSカウントで一緒にブロックされます。ユーザー側では「ブロックが効かない」苦情が消え、運用側ではKnox統合のような大きな変更後でも回帰が捕まる構造ができました。',
    },
    reflection: {
      ko: '가장 정직한 회고는 사용자가 알려준 다음에야 진단이 시작됐다는 점입니다. Google Play Console ANR 비율이나 Firebase Crashlytics ANR thread dump를 처음부터 운영 대시보드에 박았다면 사용자가 컴플레인을 보내기 전에 신호를 받을 수 있었습니다. 또 AccessibilityService 클래스가 차단 트리거·우회 감지·PIN gateway·Knox 호출을 한 곳에 다 끌어안은 채 무거워진 상태였고, 새 기능이 들어갈 때마다 사이드 이펙트 위험이 컸습니다. 다시 한다면 도메인 단위로 분리하고 테스트 가능한 구조로 갔을 것입니다.',
      en: 'The honest reflection is that the diagnosis only started after the user told me. Google Play Console ANR rate or Firebase Crashlytics ANR thread dumps should have been on the operations dashboard from day one. Separately, `AppBlockService.java` weighing in at a single 2,674-LOC class is a code-shape regret — block triggers, evasion detection, PIN gateway, and Knox calls all live together, so every new feature carries side-effect risk. Splitting it along domain lines, with tests, is the do-over.',
      ja: '最も正直な振り返りは、ユーザーが知らせてくれた後で診断が始まった点です。Google Play Console ANR比率やFirebase Crashlytics ANR thread dumpを初日から運用ダッシュボードに組み込んでいれば、ユーザーが苦情を送る前にシグナルを得られたはずです。またAppBlockService.javaが単一クラス2,674 LOCな点も振り返ればドメイン単位の分離・テスト可能構造にすべきだったと考えます — ブロックトリガー・回避検出・PIN gateway・Knox呼び出しが一箇所に集まり、新機能投入のたびに副作用リスクが大きかったです。',
    },
  },

  kocca: {
    oneLiner: {
      ko: '외국인 학생의 한국어 발음을 정확하게 평가하려면 STT가 받는 음성 포맷을 클라이언트에서 만들어 변환 손실을 없애야 했고, 발음과 말하기의 응시 흐름을 단계 단위로 분리해 안정적으로 운영해야 했습니다. Soundmind 시기 KOCCA 정부 R&D 과제로 진행된 K-Speaking 평가 플랫폼을 팀장으로 리딩하며 자체 WAV 인코더부터 외부 한국형 STT 3-phase 통신, 응시 state machine, 미들웨어 RBAC, 컨테이너 보안 강화까지 풀스택으로 책임지고 산출물로 납품했습니다.',
      en: 'During my Soundmind tenure I shipped a full-stack speaking-assessment platform for foreign Korean learners under a Korean government R&D programme — a hand-written 16 kHz / 1ch / 16-bit WAV encoder, a 3-phase integration with the Korean-tuned Selvy STT (`kocca_stt`), a 5-stage pronunciation / 7-stage speaking exam state machine, middleware RBAC, and a hardened Docker image, all delivered as a single-owner R&D deliverable.',
      ja: 'Soundmind在籍中、外国人学習者向け韓国語発音・スピーキング評価R&Dをフルスタック単独で出荷 — 自作の16kHz/1ch/16bit WAVエンコーダ + 韓国語型STT（Selvy `kocca_stt`）3フェーズ通信 + 発音5段階・スピーキング7段階の受験state machine + ミドルウェアRBAC + Dockerコンテナのセキュリティ強化を単独責任で政府R&D成果物として納品しました。',
    },
    context: {
      ko: 'KOCCA(한국콘텐츠진흥원) 정부 R&D 과제로 진행된 외국인 학생 대상 K-Speaking 평가 플랫폼입니다. 사용자 역할은 STUDENT / TEACHER(MAIN) / TEACHER(SUB) / TEACHER ADMIN 4종, 학교별 멀티테넌트, 시험 회차 8단계 상태 머신을 갖는 구조였습니다. 팀장으로 리딩하며 App Router + Server Action + Route Handler + DB 스키마 + Docker 배포를 책임졌습니다. 다만 3인 합의 채점 알고리즘과 채점자 자동 배정의 동시성 제어는 다른 팀원 담당이라 본인 기여로는 표기하지 않습니다.',
      en: 'A KOCCA-funded K-Speaking assessment platform for foreign Korean learners — four user roles (STUDENT, TEACHER MAIN, TEACHER SUB, TEACHER ADMIN), school-level multitenancy via `school_id`, and an eight-stage exam-status state machine. I owned the full stack solo (App Router + Server Action + Route Handler + DB schema + Docker deployment). One important honesty note: the three-grader consensus scoring algorithm and the race-condition-safe grader auto-assignment were owned by another engineer, so I do not claim credit for those.',
      ja: 'KOCCA（韓国コンテンツ振興院）の政府R&D課題として進められた外国人学習者向けK-Speaking評価プラットフォームで、ユーザーロールはSTUDENT / TEACHER(MAIN) / TEACHER(SUB) / TEACHER ADMINの4種、学校別マルチテナント（`school_id`）、試験回次8段階の状態機械を持っていました。本人はフルスタック単独でApp Router + Server Action + Route Handler + DBスキーマ + Dockerデプロイを担当しましたが、3名合議採点アルゴリズム・採点者自動割当のrace condition防御は他メンバー担当で、自分の貢献としては表記しません。',
    },
    problem: {
      ko: '핵심 문제는 네 가지였습니다. 첫째, Selvy `kocca_stt`가 16kHz/1ch/16bit PCM RIFF 포맷만 받기 때문에 MediaRecorder API의 webm/opus를 그대로 보내면 서버 ffmpeg 변환이 필요해 응답 지연·트랜스코딩 손실·iOS Safari 호환성 문제가 누적됩니다. 둘째, 발음 5문제(총 75초)와 말하기 7단계 응시 흐름을 단계별 beep·녹음·자동 전환까지 안정적으로 운영해야 합니다. 셋째, STUDENT / TEACHER(MAIN·SUB) / ADMIN 4단계 권한을 인증·인가 흐름에 매끄럽게 녹여야 합니다. 넷째, 정부 R&D 사양상 외부 인터넷에 노출되는 운영 환경이라 컨테이너 공격 표면을 줄여야 했고, 학교별 멀티테넌트 환경에서 한 학교의 사고가 다른 학교로 번지지 않도록 격리 정책까지 함께 잡아야 했습니다.',
      en: 'Four problems mattered. (1) The Selvy STT (`kocca_stt`) only accepts 16 kHz / 1ch / 16-bit PCM RIFF — pushing MediaRecorder’s default webm/opus through it would have meant a server-side ffmpeg step, eating response time, accumulating transcoding loss, and triggering iOS Safari compatibility issues. (2) The pronunciation flow (5 questions, 75 seconds total) and the seven-stage speaking flow had to run reliably. (3) A four-tier RBAC (STUDENT / TEACHER MAIN+SUB / ADMIN) had to drop into the auth flow naturally. (4) The production container had to be hardened.',
      ja: '中核となる問題は4つでした。第一に、Selvy `kocca_stt`が16kHz/1ch/16bit PCM RIFFフォーマットのみ受け付けるためMediaRecorder APIのwebm/opusをそのまま送るとサーバーffmpeg変換が必要となり、応答遅延・トランスコード損失・iOS Safari互換性問題が累積します。第二に、発音5問（合計75秒）/ スピーキング7段階の受験フローを安定運用する必要があります。第三に、4段階RBAC（STUDENT / TEACHER MAIN・SUB / ADMIN）を認証・認可フローに滑らかに組み込む必要がありました。第四に、本番環境のコンテナセキュリティ強化です。',
    },
    hypothesis: {
      ko: '자체 WAV 인코더로 클라이언트에서 STT가 받는 정확한 형식을 생성하면 서버 변환을 제거할 수 있고, 브라우저가 자동으로 거는 음성 가공(에코 제거·노이즈 억제·자동 게인 조정)을 모두 꺼 두면 학습자의 원음을 STT로 그대로 보낼 수 있어 정확도가 올라갑니다. STT 호출은 결과를 받기까지 시간이 걸리는 작업이라 단발 요청이 아닌 폴링 패턴이 적합하고, 인증 같은 부수효과는 Server Action으로, 단순 데이터 조회는 Route Handler로 의도적으로 분리해 클라이언트 번들을 가볍게 유지할 수 있습니다.',
      en: 'If a hand-written WAV encoder produces exactly the format the STT expects on the client, the server-side conversion step disappears. Disabling `echoCancellation`, `noiseSuppression`, and `autoGainControl` via `getUserMedia` keeps the audio closer to what the STT was trained on — accuracy goes up. STT calls are long-running, so a 3-phase polling pattern fits better than a single round-trip request. And keeping side-effecting work (auth) in Server Actions while simple fetches stay in Route Handlers keeps the client bundle lean by design.',
      ja: '自作WAVエンコーダでクライアント側にSTTが受け取る正確な形式を作ればサーバー変換を取り除け、getUserMediaオプションで`echoCancellation/noiseSuppression/autoGainControl`をすべて切ればSTT精度が上がります。STT呼び出しはlong-runningなので単発リクエストではなく3フェーズポーリングパターンが適しており、認証のような副作用処理はServer Actionに、単純fetchはRoute Handlerに意図的に分けてクライアントバンドルを軽く保てます。',
    },
    alternatives: {
      ko: 'MediaRecorder API는 브라우저별 webm/opus 기본이라 서버 변환 비용을 피할 수 없어 후보에서 탈락했고, Google Cloud Speech-to-Text·AWS Transcribe는 한국인 발음 학습 데이터 측면에서 외국인 한국어 학습자 도메인에 학습이 약했습니다. 무엇보다 KOCCA R&D 사양상 한국형 STT(Selvy) 사용이 요구 항목이라 외부 STT는 후보 자체가 아니었습니다.',
      en: 'MediaRecorder gives you webm/opus by default per browser, which would force the server-conversion penalty back into the path — out. Google Cloud Speech-to-Text and AWS Transcribe were not trained on enough Korean-learner pronunciation data for this exact domain. More importantly, the KOCCA R&D specification mandated a Korean-tuned STT (Selvy), so any non-Korean STT was off the table by contract.',
      ja: 'MediaRecorder APIはブラウザごとにwebm/opusが既定でサーバー変換コストを回避できず候補から外れ、Google Cloud Speech-to-Text・AWS Transcribeは韓国人発音学習データの観点で外国人学習者領域への学習が弱いものでした。何よりKOCCA R&D仕様上、韓国語型STT（Selvy）使用が要求項目だったため、外部STTは候補自体になりませんでした。',
    },
    decision: {
      ko: '자체 WAV 인코더는 세 가지 결정으로 묶었습니다. 녹음 sample rate를 16kHz로 잡은 건 Selvy STT가 16kHz만 받기 때문이라, 클라이언트에서 같은 sample rate로 캡처해 서버 리샘플링과 트래픽 폭증을 동시에 피하기 위해서였습니다. ScriptProcessor와 4096 크기 버퍼는 당시 AudioWorklet의 브라우저 호환성이 아직 충분하지 않은 환경에서 지연과 CPU 부하의 균형점이었고, 모노 1채널이 STT 입력 사양과 정확히 맞아 트래픽과 메모리가 절반이라는 점도 같이 잡은 선택입니다. 44바이트 WAV 헤더를 손수 적은 건, 외부 라이브러리 의존을 추가하지 않고도 STT가 받는 정확한 형식을 클라이언트에서 만들어 서버 변환 단계 자체를 없애는 가장 가벼운 방법이었기 때문입니다. STT 호출은 "준비 → 음성 전송 → 진행 상태 폴링(2초 간격, 최대 약 2분) → 마무리"의 4단계 폴링 패턴으로 묶었습니다. 사이트 자체 인증은 JWT HS512 + 90일 + DB 토큰 비교로 단일 세션을 강제했고, Docker 빌드는 3-stage로 나눠 runner 이미지에서 npm/npx 바이너리를 제거해 컨테이너 공격 표면을 줄였습니다.',
      en: 'I built a 151-LOC WAV encoder (`audioRecorder.ts`): `AudioContext` at 16000 Hz, `ScriptProcessor(4096, 1, 1)`, and the 44-byte RIFF / WAVE / fmt / data header written by hand. The STT call uses a 3-phase pattern — `POST /prepare → ticketId → POST /sendaudio (base64) → progressCode poll (P01/P02/P03, every 2 s, up to 60 attempts) → POST /finish` — with authentication carried in the request body (`sttServer.authCode = "kocca_stt"`, `STT_MODEL_ID = "2"`), not headers. Auth on our side is JWT HS512 with a 90-day lifetime and a single-session enforcement by comparing the cookie token to the `access_token` row in the DB. Docker is a three-stage `node:22-alpine` build with the `npm` and `npx` binaries stripped from the runner image to shrink the attack surface.',
      ja: '自作WAVエンコーダ151 LOC（`audioRecorder.ts`）でAudioContext sampleRate 16000 + ScriptProcessor(4096, 1, 1) + 44バイトRIFF/WAVE/fmt/dataヘッダの直接記述を採用しました。STT呼び出しは `POST /prepare → ticketId → POST /sendaudio base64 → progressCodeポーリングP01/P02/P03 2秒間隔最大60回 → POST /finish` の3フェーズパターンで、認証はヘッダではなくbody `sttServer.authCode`フィールド（`STT_AUTH_CODE=\'kocca_stt\'`、`STT_MODEL_ID=\'2\'`）。認証はJWT HS512 + 90日 + DB `access_token`比較で単一セッションを強制し、Dockerは`node:22-alpine` 3-stageビルドでrunnerのnpm/npxバイナリを除去しコンテナ攻撃面を縮小しました。',
    },
    execution: {
      ko: '실행은 WAV 인코더(부동소수점 음성 데이터를 16비트 정수로 변환 + WAV 헤더 손수 작성)와 STT 폴링 통신을 한 번에 안정화하는 데 집중했습니다. 응시 흐름은 발음 5단계와 말하기 7단계 state machine으로 분리해 단계별 안내음·녹음·자동 전환을 정확하게 운영했고, 녹음 데이터는 React 상태가 아닌 ref로 관리해 화면 리렌더 사이에도 누적된 음성이 유실되지 않도록 했습니다. 권한 검사는 정적 자산과 공개 경로를 제외한 모든 요청에서 미들웨어가 한 번 거르고, API 라우트는 미들웨어를 우회한 뒤 각자 토큰을 다시 검증하도록 의도적으로 분리했습니다. 학교별 멀티테넌트 격리는 모든 응시·채점 쿼리에 학교 ID 필터를 강제하고 미들웨어가 토큰의 소속 학교와 요청 경로의 학교 ID 일치 여부를 함께 검증하도록 묶어, 한 학교의 데이터가 다른 학교로 새지 않도록 인증·인가 흐름 안에 격리 정책을 녹였습니다.',
      en: 'Execution-wise, the WAV encoder (Float32 → Int16 conversion plus the RIFF / fmt / data header) and the 3-phase STT call were stabilised together as one pass. The exam flow was split into two state machines — pronunciation (`waiting → instruction → recording_ready → recording → complete`, five stages) and speaking (seven stages) — so the per-stage beep / recording / automatic transitions could be driven cleanly. Recorded blobs are accumulated in a `useRef`, not `useState`, to guarantee no data loss across re-renders. RBAC lives in middleware matched by `\'/((?!next-api/|_next/static|_next/image|favicon.ico|audio|imgs).*)\'`; API routes deliberately bypass the middleware and each calls `getCurrentUser()` so the boundaries are explicit.',
      ja: '実行はWAVエンコーダ（Float32 → Int16変換 + RIFF/fmt/dataヘッダ直接記述）とSTT 3フェーズ通信を一気通貫で安定化させることに集中しました。受験フローは発音5段階（`waiting → instruction → recording_ready → recording → complete`）とスピーキング7段階のstate machineに分離し、段階ごとのbeep・録音・自動遷移を正確に運用、録音Blobの累積はデータ消失防止のため`useState`ではなく`useRef`で管理しました。RBACはマッチャ`\'/((?!next-api/|_next/static|_next/image|favicon.ico|audio|imgs).*)\'`でミドルウェアが処理し、APIルートはミドルウェアを迂回してそれぞれが`getCurrentUser()`で自前認証する設計に意図的に分離しました。',
    },
    result: {
      ko: '정부 R&D 산출물 납품을 완료했고, 자체 WAV 인코더와 STT 3-phase 폴링이 안정 동작하면서 외부 STT 호환과 음성 정확도를 동시에 확보했습니다. 학교별 멀티테넌트로 한 DB에서 다수 학교가 동시에 응시·채점 회차를 운영할 수 있게 됐고, Docker 보안 강화로 runner 이미지의 공격 표면이 줄어든 상태로 배포됐습니다. 다만 자체 WAV 인코더의 ScriptProcessor는 W3C 권장에서 빠진 API라 앞으로는 AudioWorklet으로 옮기는 마이그레이션이 필요하고, Selvy STT 단일 벤더 의존도 응답 실패 시 큐에 적재해 복구 후 재처리하는 대체 경로 layer를 한 겹 더 두는 것이 다음 단계입니다. JWT 90일과 DB access_token 단일 세션 강제는 학사 일정과 단일 로그인 정책을 동시에 잡으려는 의도된 길이지만, 다음 단계에서는 refresh + short access로 옮기면서 매 요청 DB 조회 비용을 Redis 캐시 layer로 흡수하는 것이 자연스러운 진화 방향입니다.',
      en: 'The platform shipped as the R&D deliverable. The hand-written WAV encoder and the 3-phase STT polling held up in production, giving us STT compatibility and recording fidelity at the same time. School-level multitenancy meant several schools could run exam and grading cycles concurrently against one database, and the hardened Docker image kept the attack surface of the runner small in production.',
      ja: '政府R&D成果物の納品を完了し、自作WAVエンコーダとSTT 3フェーズポーリングが安定動作することで外部STT互換と音声精度を同時に確保しました。学校別マルチテナントで一つのDB上で複数校が同時に受験・採点回次を運用でき、Dockerセキュリティ強化によりrunnerイメージの攻撃面を縮小した状態でデプロイされました。',
    },
    reflection: {
      ko: '자체 WAV 인코더의 ScriptProcessor는 W3C에서 deprecated 상태이고 권장은 AudioWorklet입니다. 현재 동작하지만 브라우저가 ScriptProcessor 지원을 빼는 시점이 오면 마이그레이션이 필요하므로 다시 한다면 AudioWorklet 기반으로 시작했을 것입니다. 또 Selvy STT 단일 벤더에 의존하는 구조라 서비스 다운 시 응시 자체가 멈춥니다 — R&D 사양상 Selvy 사용이 요구사항이었더라도, 응답을 받지 못한 응시 데이터를 큐에 적재해 STT 복구 후 재처리하는 대체 경로 layer는 만들어 두었어야 한다고 생각합니다.',
      en: 'The WAV encoder uses `ScriptProcessor`, which W3C now marks as deprecated; AudioWorklet is the recommended modern equivalent. It works today, but the day a browser removes `ScriptProcessor` support, this code needs migration — if I started over, it would be AudioWorklet from the start. The other regret is the single-vendor STT dependency: when Selvy goes down, the exam itself stops. Even though the R&D specification required Selvy specifically, I should have built a fallback layer that queues the submissions Selvy did not answer and replays them once the service recovers.',
      ja: '自作WAVエンコーダのScriptProcessorはW3Cでdeprecated状態であり、推奨はAudioWorkletです。現在動作しますがブラウザがScriptProcessorサポートを切るタイミングが来れば移行が必要なので、やり直すならAudioWorkletベースで始めていたと思います。またSelvy STT単一ベンダーに依存する構造なのでサービスダウン時に受験そのものが止まります — R&D仕様上Selvy使用が要件であったとしても、応答を受け取れなかった受験データをキューに積みSTT復旧後に再処理するfallback層は作っておくべきだったと考えます。',
    },
  },

  'purple-english': {
    oneLiner: {
      ko: '교육 회사의 R&D 신사업을 모바일 앱 채널로 확장하는 의사결정을 1년차 사원이 주도했습니다. 웹에서 풀 수 없던 음성 콘텐츠 보안과 모바일 브라우저 호환성 한계를 React Native 마이그레이션으로 우회했고, RN 경험이 없었음에도 기존 React 코드의 모듈화·컴포넌트화를 먼저 정비해 학습 곡선을 낮춘 뒤 마이그레이션을 완수했습니다. App Store와 Play Store에 출시하면서 앱 채널 신사업의 길이 열렸습니다.',
      en: 'As a junior engineer with one year of experience I led the call to push our education-platform R&D into a mobile app channel — the web couldn’t solve the audio-content security and per-browser compatibility problems we kept hitting. I had no React Native experience yet, so I first modularised and componentised the existing React code to flatten the RN learning curve, then completed the migration and shipped to both the App Store and Play Store — opening the app-channel revenue line.',
      ja: '教育会社のR&D新事業をモバイルアプリチャネルに拡張する意思決定を1年目社員が主導 — Webで解けなかった音声コンテンツのセキュリティ・モバイルブラウザ互換性の限界をReact Native移行で迂回し、RN経験がない状態でも既存のReactコードをモジュール化・コンポーネント化することで学習曲線を下げてから移行を完了、App Store / Play Storeリリースでアプリチャネル新事業の道を開きました。',
    },
    context: {
      ko: 'Purple Academy(교육 회사)에서 프론트엔드 개발자로 1년 재직했고, 팀은 2명, 본인은 직급상 사원이지만 프로젝트 리딩 위치에서 의사결정 권한을 가졌습니다. 기존 제품은 React 기반 웹 서비스로, 어린이·청소년 대상 영어 교육 콘텐츠(알파벳 트레이싱·인터랙티브 학습 활동 등)를 5,000+ 개 운영하고 있던 상태였습니다.',
      en: 'I spent a year as a frontend engineer at Purple Academy (an education company), on a two-person team where — despite being formally a junior — I led the project and held decision rights. The existing product was a React web service delivering English-learning content for children and teens, with over five thousand interactive learning activities (alphabet tracing, mini-games, etc.) in production.',
      ja: 'Purple Academy（教育会社）でフロントエンドエンジニアとして1年在籍し、チームは2名、本人は職位上は社員ですがプロジェクトリーディング位置で意思決定権を持ちました。既存プロダクトはReactベースのWebサービスで、子供・青少年向け英語教育コンテンツ（アルファベットトレース・インタラクティブ学習アクティビティなど）を5,000以上運用していた状態でした。',
    },
    problem: {
      ko: '문제는 두 갈래로 동시에 들어왔습니다. 첫째, 웹 환경에서 음성 재생의 보안이 너무 어려웠습니다. 학습 콘텐츠인 음성 자산이 노출되면 사업 가치가 무너지는데, 브라우저에서 이를 견고하게 막을 방법이 없었습니다. 둘째, 모바일 브라우저 호환성 문제였습니다. 사용자 핸드폰 기기마다 브라우저 종류와 버전이 달라 대응해야 할 조합이 폭증했고, 일부 환경에서는 정상 동작 자체가 불가능했습니다. 결론은 명확했습니다. 앱 출시 없이는 사업이 진전될 수 없다는 것입니다.',
      en: 'The pressure came from two directions at once. First, audio-content security on the web — the audio assets are the product, and once they leak the business value collapses, but the browser gives you almost nothing to defend that surface. Second, mobile browser compatibility — the per-browser, per-version matrix on user devices kept growing, and on some configurations the experience was outright broken. The conclusion was unambiguous: without a native app, this business could not move forward.',
      ja: '問題は2方向から同時に来ました。第一にWeb環境での音声再生セキュリティが極めて困難 — 学習コンテンツである音声資産が漏洩すれば事業価値が崩れますが、ブラウザでこれを堅牢に防ぐ方法がありませんでした。第二にモバイルブラウザ互換性 — ユーザーのスマホ機種ごとにブラウザ種別・バージョンが異なりマトリックス対応コストが膨張、一部環境では正常動作自体が不可能でした。結論は明確でした：アプリリリースなしには事業が前進できない。',
    },
    hypothesis: {
      ko: '본인의 가설은 단순했습니다. "React Native 경험은 없지만, 기존 React 코드를 컴포넌트·모듈 단위로 강하게 분리해두면 RN으로 옮기는 학습 곡선은 낮습니다." 마이그레이션 자체보다 그 직전의 준비 작업(코드베이스 정리)이 성공의 관건이라고 봤습니다.',
      en: 'My hypothesis was simple: "I haven’t shipped React Native yet, but if I get the existing React codebase into properly modular components first, the migration learning curve drops sharply." The success lever wasn’t the migration itself — it was the preparation step right before it.',
      ja: '本人の仮説は単純でした：「React Native経験はないが、既存のReactコードをコンポーネント・モジュール単位で強く分離しておけばRNへの移行学習曲線は低い」。移行そのものより、その直前の準備作業（コードベース整理）が成功の鍵だと見ました。',
    },
    alternatives: {
      ko: '정직하게 말하면 Flutter·Capacitor·PWA·모바일 웹 강화 같은 다른 옵션을 명시적으로 비교하지 않았습니다. 기존 React 자산을 가장 직접적으로 재사용할 수 있는 RN이 자명한 선택이라고 봤고, 1년차 사원 + 2명 팀의 자원 한계에서 비교 검토 비용 자체가 부담이었습니다. 이 부분은 회고에서 자기 검증 영역으로 다룹니다.',
      en: 'Honestly, I did not explicitly evaluate Flutter, Capacitor, PWA, or just hardening the mobile web. React Native was the most direct reuse path for our existing React assets, and given the resourcing — one junior engineer, two-person team — the cost of running a real comparison itself felt prohibitive. I treat that gap as self-critique territory in the reflection.',
      ja: '正直に言えばFlutter・Capacitor・PWA・モバイルWeb強化のような他の選択肢を明示的に比較しませんでした。既存のReact資産を最も直接的に再利用できるRNが自明な選択肢だと見ており、1年目社員+2名チームのリソース制約下では比較検討コスト自体が負担でした。この点は振り返りで自己検証領域として扱います。',
    },
    decision: {
      ko: '본인이 결정했습니다. 1년차 사원이지만 프로젝트 리딩 위치였기에 결정권을 가졌고, 결정 근거는 세 가지였습니다: ① 음성 보안 (웹에서 풀기 어려운 문제) ② 브라우저 대응 비용 (모바일 브라우저 매트릭스의 한계) ③ 학습 곡선 (모듈화 선행으로 낮출 수 있다는 사전 평가). 실행 전제는 마이그레이션 직전에 React 코드베이스의 모듈화·컴포넌트화를 충분히 정비하는 것이었습니다.',
      en: 'I made the call. I was junior on paper but lead in practice, and the decision rested on three reasons: (1) audio-content security is unsolvable on the web, (2) the mobile-browser compatibility matrix had become too expensive, and (3) the RN learning curve could be flattened by preparing the React codebase first. The execution pre-condition was non-negotiable: invest enough in modularising and componentising the React codebase before starting the migration itself.',
      ja: '本人が決定しました。1年目社員ですがプロジェクトリーディング位置だったため決定権を持ち、決定根拠は3つでした：① 音声セキュリティ（Webで解きにくい問題）② ブラウザ対応コスト（モバイルブラウザマトリックスの限界）③ 学習曲線（モジュール化先行で下げられるという事前評価）。実行前提は移行直前にReactコードベースのモジュール化・コンポーネント化を十分整備することでした。',
    },
    execution: {
      ko: '먼저 기존 React 코드의 모듈화·컴포넌트화에 시간을 들였습니다. UI/로직 분리, Custom Hook으로 비즈니스 로직 추출, 의존성 정리를 거친 뒤 RN으로 점진 마이그레이션을 진행했습니다. RN 자체는 처음 다루는 환경이라 학습하면서 옮기는 흐름이었지만, 사전에 정비된 코드 구조 덕에 컴포넌트 단위로 옮기는 작업이 비교적 명확하게 끊겼습니다. 최종적으로 양 스토어(App Store · Google Play) 출시까지 도달했습니다.',
      en: 'The first phase was preparation: separating UI from logic, lifting business logic into custom hooks, and tidying dependencies inside the React codebase. Only after that did the RN migration start, progressively, component by component. RN was a new environment for me, so I was learning as I ported, but the prior cleanup meant each unit of migration had a clean boundary. The migration ended with shipping to both the App Store and Google Play.',
      ja: 'まず既存のReactコード のモジュール化・コンポーネント化に時間を投資しました。UI/ロジック分離、Custom Hookによるビジネスロジック抽出、依存性整理を経てからRNへの段階的移行を進めました。RN自体は初めて扱う環境だったので学習しながら移行する流れでしたが、事前に整備したコード構造のおかげでコンポーネント単位での移行作業が比較的明確に切り分けられました。最終的に両ストア（App Store・Google Play）リリースまで到達しました。',
    },
    result: {
      ko: 'App Store / Google Play 양 스토어 출시에 도달했고, 그 결과로 앱 버전 기반의 신사업이 가능해졌습니다. 모바일 채널 자체가 닫혀 있던 상태에서 진행이 가능한 상태로 바뀌었다는 점이 이 프로젝트의 핵심 임팩트입니다. 다만 RN 외 옵션(Capacitor·Flutter·PWA)을 명시적으로 비교하지 않은 결정은 지금 봐도 보강할 자리로 인정합니다. 같은 선택을 다시 내린다면 비교 표 한 장이라도 만들어 결정 근거를 남기는 쪽이 자기 검증 측면에서 더 견고했을 것입니다. 음성 보안도 RN native module 단위로 더 세분화해 앞으로는 단일 책임 경계로 분리해 두는 것이 다음 개선 방향입니다.',
      en: 'We shipped to both the App Store and Google Play, and that opened a new app-channel business line for the company. The point of impact wasn’t a metric — it was that the mobile channel had been effectively closed before, and was open after.',
      ja: 'App Store / Google Play両ストアリリースに到達し、その結果としてアプリ版を基盤とする新事業が可能になりました。モバイルチャネル自体が閉じていた状態から進行可能な状態に変わった点がこのプロジェクトの中心的なインパクトです。',
    },
    reflection: {
      ko: '가장 정직한 회고는 RN 외 다른 옵션(Flutter·Capacitor·PWA)을 명시적으로 비교하지 않았다는 점입니다. 그 시점에는 React 자산 재사용이라는 단일 기준으로 자명한 선택이었지만, 시니어 관점에서 보면 결정 자체를 검증하는 절차가 빠진 셈입니다. 또 모듈화·컴포넌트화 정비를 사전에 진행한 것은 옳은 판단이었지만 — 마이그레이션 중에도 일부 영역은 RN-only로 결국 분기되었다는 점에서, 어디까지가 공유 가능하고 어디부터는 분기였는지를 더 일찍 결정 매트릭스로 정리했어야 했다고 봅니다.',
      en: 'The honest reflection is that I did not formally compare React Native against Flutter, Capacitor, or PWA. At the time, "reuse our React assets directly" felt like a self-evident criterion, but stepping back as a senior would, the missing step is the verification of the decision itself — even one explicit comparison would have made the choice stronger. The other reflection is on the cleanup work: prepping the codebase before the migration was the right call, but some areas still diverged into RN-only branches mid-flight, and I should have written down a sharper decision matrix earlier — where the shared code ends and where the platform-specific code begins.',
      ja: '最も正直な振り返りは、RN以外の選択肢（Flutter・Capacitor・PWA）を明示的に比較しなかった点です。当時はReact資産再利用という単一基準で自明な選択でしたが、シニア視点で見ると決定そのものを検証するステップが抜けていました。またモジュール化・コンポーネント化を事前に進めたのは正しい判断でしたが、移行中も一部領域はRN専用に分岐したという点で、共有可能な範囲と分岐すべき範囲をもっと早く決定マトリックスとして整理すべきだったと考えます。',
    },
  },

  aigoseo: {
    oneLiner: {
      ko: 'IEZLAB(SI 회사) 시기, 조선왕조실록 한자 고문헌 디지털화 정부 R&D 과제에서 발주처가 사진과 한자 영역 좌표값을 제공하면 Canvas API로 좌표에 맞춰 이미지를 한 글자씩 자르는 시스템을 구현하고 Spring Boot + JPA 백엔드 API까지 풀스택으로 책임져 정부 R&D 산출물로 납품했습니다.',
      en: 'During my time at IEZLAB (a system-integration company), I worked on a government-funded R&D project to digitise classical Korean Hanja manuscripts such as the Annals of the Joseon Dynasty. The client supplied scans and per-character coordinates; I built the Canvas-API system that sliced the images into single Hanja characters according to those coordinates, plus the Spring Boot + JPA backend API around it — delivered end-to-end as a national R&D output.',
      ja: 'IEZLAB（SI会社）在籍中、朝鮮王朝実録の漢字古文献デジタル化政府R&D課題で、発注元が画像と漢字領域の座標値を提供すると、その座標に合わせてCanvas APIで画像を1文字ずつ切り出すシステムを実装し、Spring Boot + JPAバックエンドAPIまでフルスタック責任で政府R&D成果物として納品しました。',
    },
    context: {
      ko: 'IEZLAB은 SI(System Integration) 회사였고, 본인은 한자 고문헌 디지털화 정부 R&D 과제에 참여했습니다. 시기적으로는 GPT 같은 LLM이 없던 시절이라 Vision API·SAM·LLM 기반 OCR 같은 현대 도구가 부재했고, 사진을 한 글자씩 정확히 자르는 작업을 손으로 구현해야 했습니다.',
      en: 'IEZLAB was a system-integration shop, and I was assigned to a government R&D project on digitising classical Hanja manuscripts. This was before the LLM era — no Vision APIs, no SAM, no LLM-driven OCR — so cutting an image into individual Hanja characters had to be built by hand rather than orchestrated from off-the-shelf models.',
      ja: 'IEZLABはSI（System Integration）会社で、本人は漢字古文献デジタル化の政府R&D課題に参加しました。時期的にはGPTのようなLLMが無かった時代でVision API・SAM・LLMベースOCRのような現代的なツールが不在で、写真を1文字ずつ正確に切り出す作業を直接手で実装する必要がありました。',
    },
    problem: {
      ko: '책임 범위를 정확히 분리하자면, 한자별 영역 좌표 자체는 발주처가 산출해 제공했고, 본인은 그 좌표에 맞춰 사진을 한 글자씩 정확히 자르는 시스템과 후속 OCR·번역 파이프라인으로 연결되는 백엔드 API를 구현하는 것이 일이었습니다. 즉 알고리즘 결정자가 아니라 발주처 사양을 시스템으로 통합하는 구현 책임이었습니다.',
      en: 'To be precise about ownership: the client produced the per-character coordinates themselves. My job was the system that consumed those coordinates and sliced the image into individual characters precisely, plus the backend API that fed the downstream OCR / translation pipeline. I was the integration owner, not the algorithm designer — and being honest about that distinction matters.',
      ja: '責任範囲を正確に分けると、漢字ごとの領域座標自体は発注元が算出して提供し、本人はその座標に合わせて写真を1文字ずつ正確に切り出すシステムと、後続のOCR・翻訳パイプラインに繋がるバックエンドAPIを実装することが業務でした。つまりアルゴリズム決定者ではなく、発注元仕様をシステムとして統合する実装責任でした。',
    },
    hypothesis: {
      ko: 'Canvas API의 `getImageData` / `putImageData`로 픽셀 좌표 기반 이미지 분할을 직접 다루면 외부 라이브러리 의존 없이 발주처가 던지는 좌표 사양을 그대로 받아 시각화·분할이 가능합니다. 발주처가 좌표를 확인·수정하면서 즉시 분할 결과를 검수해야 하는 워크플로우라, 클라이언트 측 즉시 렌더링이 핵심이라고 봤습니다.',
      en: 'The hypothesis was that Canvas’s `getImageData` / `putImageData` would let me do pixel-coordinate-based slicing directly, with no third-party dependency, and consume the client’s coordinate spec as-is. The workflow needed the client to be able to inspect and tweak coordinates with the slicing result rendering immediately — client-side rendering was the load-bearing requirement.',
      ja: 'Canvas APIの`getImageData` / `putImageData`でピクセル座標ベースの画像分割を直接扱えば、外部ライブラリ依存なしに発注元の座標仕様をそのまま受け取って可視化・分割が可能です。発注元が座標を確認・修正しながら分割結果を即座に検収するワークフローだったため、クライアント側の即時レンダリングが鍵だと見ました。',
    },
    alternatives: {
      ko: 'OpenCV.js는 비전 라이브러리지만 본인 책임이 알고리즘이 아닌 좌표 기반 분할이라 과한 도구였고, 서버사이드 이미지 처리(Sharp/ImageMagick)는 발주처 검수 루프에서 서버 왕복 부담이 컸습니다. 백엔드는 SI 회사 표준 스택을 따라 Spring Boot + JPA로 갔습니다.',
      en: 'OpenCV.js is a vision library, but my responsibility was coordinate-driven slicing, not algorithm design — so OpenCV would have been overkill. Server-side image processing (Sharp / ImageMagick) would have added a network round-trip into the client’s review loop every time they tweaked a coordinate. The backend followed the SI shop’s house stack: Spring Boot + JPA.',
      ja: 'OpenCV.jsはビジョンライブラリですが、本人の責任がアルゴリズムではなく座標ベース分割なのでoverkillでした。サーバーサイド画像処理（Sharp / ImageMagick）は発注元検収ループでround-trip負担が大きく、バックエンドはSI会社標準スタックに沿ってSpring Boot + JPAで進めました。',
    },
    decision: {
      ko: '클라이언트는 Canvas API로 구현하고 백엔드는 Spring Boot + JPA로 갔습니다. 좌표 기반 분할의 결과를 발주처가 즉시 확인할 수 있도록 클라이언트 측 즉시 렌더링을 우선하고, 후속 OCR·번역 단계로 결과를 전달하는 통합 API를 백엔드에서 제공하는 구조입니다.',
      en: 'Client-side Canvas API for the slicing, Spring Boot + JPA for the backend. Prioritise client-side rendering so the operator can inspect slice results instantly, and expose a clean backend API that forwards the result into the downstream OCR / translation stages — that was the structure.',
      ja: 'クライアントはCanvas API直接実装、バックエンドはSpring Boot + JPA。座標ベース分割の結果を発注元が即座に確認できるようクライアント側の即時レンダリングを優先し、後続のOCR・翻訳段階へ結果を渡す統合APIをバックエンド側で提供する構造です。',
    },
    execution: {
      ko: '시간이 꽤 지난 프로젝트라 세부 구현(좌표 경계의 픽셀 처리, 발주처 좌표계가 우리 화면과 어긋나지 않게 맞추는 작업 등)을 자세히 회고하기는 어렵습니다. 다만 GPT 같은 보조 도구가 없던 시기에 Canvas API의 픽셀 단위 처리와 발주처에 결과를 보내고 다시 검수받는 작업 흐름을 체득한 것이 이후 모든 프로젝트의 기반이 됐다고 생각합니다.',
      en: 'Enough time has passed that I can’t honestly recall the fine-grained details — pixel edge handling at coordinate boundaries, coordinate-system alignment with the client, that level. What I can say is that working in that pre-LLM environment forced me to learn Canvas pixel-level work and to run a tight inspection round-trip with the client, and that has carried forward into every project since. This is a slot I keep short on purpose.',
      ja: '時間がかなり経過したプロジェクトなので、細かい実装事項（座標境界のピクセル処理・発注元との座標系整合性など）を詳細に振り返るのは難しいです。ただGPT・LLMのような補助ツールがない環境でCanvas APIのピクセル単位処理・発注元仕様とのround-trip検収ワークフローを直接体得した経験は、以降のすべてのプロジェクトの基盤になったと考えます。正直に短めに扱うスロットです。',
    },
    result: {
      ko: '정부 R&D 과제 산출물 납품을 완료했습니다. 후속 OCR·번역 단계와의 통합도 의도대로 연결되어 한자 고문헌 디지털화 자동화 파이프라인의 일부가 됐습니다. 같은 과제를 지금 다시 한다면 SAM·YOLO·LLM 기반 OCR 같은 도구로 좌표 추출과 이미지 분할이 상당 부분 자동화 가능한 환경이라, 다음에는 발주처 좌표에 의존하지 않고 자체 분할 모델을 함께 두는 방향이 자연스럽습니다. 당시 환경에서 직접 익힌 Canvas API 픽셀 단위 처리와 발주처와 결과를 주고받으며 검수하는 작업 흐름은, 이후 모든 프로젝트에서 외부 사양을 시스템으로 통합하는 책임의 기반이 됐습니다.',
      en: 'The deliverable was accepted as a national R&D output. The slicing system fed into the downstream OCR / translation stages as intended, becoming part of the automated Hanja-manuscript digitisation pipeline.',
      ja: '政府R&D課題の成果物納品を完了しました。後続のOCR・翻訳段階との統合も意図通り接続され、漢字古文献デジタル化自動化パイプラインの一部となりました。',
    },
    reflection: {
      ko: '지금 시점에서 같은 과제를 다시 한다면 SAM·YOLO·LLM 기반 OCR 같은 도구로 좌표 추출·이미지 분할이 상당 부분 자동화 가능합니다. 다만 그 시기에 LLM·AI 보조 도구가 없는 환경에서 Canvas API의 픽셀 단위 처리·좌표 시스템 정합성·발주처 사양과의 round-trip 검수 워크플로우를 체득한 것이, 이후 모든 프로젝트에서 "외부 사양을 시스템으로 통합하는 책임"의 기반이 됐습니다.',
      en: 'If I picked up the same project today, tools like SAM, YOLO, or LLM-backed OCR would automate much of the coordinate extraction and slicing. But living through the pre-LLM version of this work — Canvas pixel-level operations, coordinate-system alignment, the tight inspection loop with the client — became the foundation for "owning the integration of an external specification into a real system" that I have leaned on in every later project.',
      ja: '現在の時点で同じ課題をやり直すなら、SAM・YOLO・LLMベースOCRのようなツールで座標抽出・画像分割が相当部分自動化可能です。ただし当時のLLM・AI補助ツールがない環境でCanvas APIのピクセル単位処理・座標系整合性・発注元仕様とのround-trip検収ワークフローを直接体得したことは、以降の全プロジェクトにおける「外部仕様をシステムとして統合する責任」の基盤になりました。',
    },
  },
}
