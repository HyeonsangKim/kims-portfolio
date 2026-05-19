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
        '사용자 lifecycle 기반 암호화·익명화 정책 — 탈퇴·휴면 사용자 데이터 보관 및 삭제 자동화, PII 관리 운영 자동화',
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
      ko: 'Next.js · Prisma · PostgreSQL 기반 풀스택으로 외국인 학생 대상 한국어 평가 웹 플랫폼을 구축하고, 외부 STT 연동을 위한 WAV 녹음(16kHz 샘플링) + AWS S3 업로드 파이프라인까지 운영 환경에 배포했습니다. Nginx 리버스 프록시·SSL 배포 환경을 직접 구성해 정부 R&D 산출물로 납품 완료했습니다.',
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
      ko: '기존 React 웹 코드베이스를 React Native 기반 앱으로 마이그레이션해 App Store / Play Store에 출시했고, 웹과 앱 양쪽에서 공통으로 사용하는 비즈니스 로직을 Custom Hook 기반으로 모듈화해 채널 일원화를 진행했습니다. GSAP과 SVG Path Animation을 활용한 알파벳 트레이싱 기능을 구현했고, 5,000개 이상의 인터랙티브 학습 활동을 직접 제작했습니다.',
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
