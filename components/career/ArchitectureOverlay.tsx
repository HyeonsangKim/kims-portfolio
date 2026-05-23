'use client'

import { useEffect, type ComponentType } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { useI18n, type Locale } from '@/lib/i18n'
import OdiyaArchitectureDiagram from './diagrams/OdiyaArchitectureDiagram'
import MohaniArchitectureDiagram from './diagrams/MohaniArchitectureDiagram'
import KoccaArchitectureDiagram from './diagrams/KoccaArchitectureDiagram'

export type ArchitectureKey = 'odiya' | 'mohani' | 'kocca'

interface ArchitectureMeta {
  diagram: ComponentType
  eyebrow: Record<Locale, string>
  title: Record<Locale, string>
  subtitle: Record<Locale, string>
  caption: Record<Locale, string>
  gradient: string
}

const meta: Record<ArchitectureKey, ArchitectureMeta> = {
  odiya: {
    diagram: OdiyaArchitectureDiagram,
    eyebrow: {
      ko: 'Architecture · Odiya Location Pipeline',
      en: 'Architecture · Odiya Location Pipeline',
      ja: 'Architecture · Odiya Location Pipeline',
    },
    title: {
      ko: 'Redis 두 갈래 활용 + 60초 batch + 일자 파티션',
      en: 'Redis Dual-Use + 60s Batch + Daily Partition',
      ja: 'Redis 2用途 + 60秒batch + 日次パーティション',
    },
    subtitle: {
      ko: '자녀 단말 좌표 burst를 Redis List 버퍼에 받아 60초 단위로 한 번에 DB로 흘리고, 부모의 자녀 정보 polling은 Redis 캐시 hit으로 흡수. 기존 인프라 재활용 + 인프라 증설 0대.',
      en: 'Child-device coordinate bursts land in a Redis list buffer and drain to the DB once per 60s. Parent polling for child info is served from a Redis cache. Reuses existing infrastructure with zero new infra.',
      ja: '子供端末の座標burstをRedis Listバッファで受け、60秒単位で一括DBへ流し、親側の子供情報pollingはRedisキャッシュhitで吸収。既存インフラ再利用・インフラ追加0。',
    },
    caption: {
      ko: '청록 = write 경로 (단건 INSERT 폭증 흡수) · 앰버 = read 경로 (부모 polling 부하 흡수). Redis 단일 인스턴스는 의도된 trade-off — 트래픽 임계치 넘어가면 Sentinel/Cluster로 자연 확장.',
      en: 'Cyan = write path (absorbs single-INSERT bursts) · Amber = read path (absorbs parent polling). Single-Redis is an intentional trade-off; the path to Sentinel/Cluster is left open once traffic crosses the threshold.',
      ja: '青緑 = write経路（単件INSERT polling吸収）・橙 = read経路（親polling吸収）。単一Redisは意図的trade-off — トラフィック閾値超過時にSentinel/Clusterへ自然拡張。',
    },
    gradient: 'linear-gradient(135deg, #3b82f6, #22d3ee)',
  },
  mohani: {
    diagram: MohaniArchitectureDiagram,
    eyebrow: {
      ko: 'Architecture · Mohani Parental Control',
      en: 'Architecture · Mohani Parental Control',
      ja: 'Architecture · Mohani Parental Control',
    },
    title: {
      ko: 'Knox MDM + AccessibilityService 다층 차단 + Native PIN gateway',
      en: 'Knox MDM + AccessibilityService Defence-in-Depth + Native PIN gateway',
      ja: 'Knox MDM + AccessibilityService多層遮断 + Native PIN gateway',
    },
    subtitle: {
      ko: '부모 정책을 FCM으로 자녀 단말에 전파하고, 자녀 BlockApp 안에서 5중 차단 트리거가 각자 다른 우회 경로를 막음. PIN 검증은 RN을 거치지 않고 Native에서 서버 직접 호출.',
      en: 'Parent policy propagates to the child device over FCM. Inside BlockApp, five trigger layers each close off a different bypass path. PIN verification skips the RN bridge and calls the server natively.',
      ja: '親の方針をFCMで子供端末に伝播し、子供BlockApp内で5層の遮断トリガがそれぞれ異なる回避経路を塞ぐ。PIN検証はRNを経由せずNativeからサーバーを直接呼び出す。',
    },
    caption: {
      ko: '★ 화면 없이 도는 백그라운드 앱(유튜브 PIP·음악·녹음)도 FGS 카운트 trigger로 차단. ★ Knox SDK 통합 후 발생한 ANR은 단일 스레드 executor + bounded queue로 해소 — 직렬화 + backlog 방지.',
      en: '★ Headless apps (YouTube PIP, music, recording) are caught by the FGS counter trigger. ★ ANR introduced by Knox SDK integration was resolved by serialising calls on a single-threaded executor with a bounded queue.',
      ja: '★ 画面のない背景アプリ（YouTube PIP・音楽・録音）もFGSカウントtriggerで遮断。★ Knox SDK統合後のANRは単一スレッドexecutor + bounded queueで解消。',
    },
    gradient: 'linear-gradient(135deg, #a855f7, #f472b6)',
  },
  kocca: {
    diagram: KoccaArchitectureDiagram,
    eyebrow: {
      ko: 'Architecture · KOCCA K-Speaking Platform',
      en: 'Architecture · KOCCA K-Speaking Platform',
      ja: 'Architecture · KOCCA K-Speaking Platform',
    },
    title: {
      ko: '4역할 RBAC + 자체 WAV 인코더 + STT 4단계 폴링 + 학교별 멀티테넌트',
      en: '4-Role RBAC + Hand-written WAV Encoder + 4-phase STT Poll + School-level Tenancy',
      ja: '4ロールRBAC + 自作WAVエンコーダ + STT 4段ポーリング + 学校別マルチテナント',
    },
    subtitle: {
      ko: '모든 non-API 요청은 미들웨어가 RBAC로 한 번 거르고, 응시자 음성은 클라이언트에서 직접 WAV로 인코딩해 서버 변환 단계를 없앤 뒤 Selvy STT에 4단계 폴링으로 보냄. 학교별 격리는 쿼리와 미들웨어 두 계층에서 강제.',
      en: 'Middleware filters every non-API request with role-based access; the browser hand-encodes WAV in the exact format Selvy STT expects, eliminating server-side transcoding, then drives a 4-phase poll. School-level isolation is enforced at both the query and middleware layers.',
      ja: 'ミドルウェアがnon-APIリクエストをRBACで一次フィルタし、ブラウザがSelvy STTの仕様通りにWAVを直接エンコードしてサーバー変換段階を消去、4段ポーリングで送信。学校別隔離はクエリとミドルウェアの2層で強制。',
    },
    caption: {
      ko: '★ 자체 WAV 인코더 세 결정: ① 16kHz 그대로 캡처 ② AudioWorklet 호환 부족 시기에 ScriptProcessor 균형점 ③ 외부 라이브러리 의존 0. ★ Server Action(인증) vs Route Handler(데이터) 의도적 분리 — 클라이언트 번들 가벼움.',
      en: '★ Three encoder choices: ① capture at 16 kHz directly ② ScriptProcessor as the practical balance when AudioWorklet support was thin ③ zero third-party deps. ★ Server Action (auth) vs Route Handler (data) split keeps the client bundle lean.',
      ja: '★ 自作WAVエンコーダ3決定：① 16kHzで直接キャプチャ ② AudioWorklet互換性が薄い時期のScriptProcessor均衡 ③ 外部依存0。★ Server Action（認証）vs Route Handler（データ）意図的分離でクライアントバンドルを軽く。',
    },
    gradient: 'linear-gradient(135deg, #fb923c, #f59e0b)',
  },
}

export default function ArchitectureOverlay({
  architectureKey,
  onClose,
}: {
  architectureKey: ArchitectureKey | null
  onClose: () => void
}) {
  const { locale } = useI18n()
  const open = architectureKey !== null

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (typeof document === 'undefined') return null

  const m = architectureKey ? meta[architectureKey] : null
  const Diagram = m?.diagram

  return createPortal(
    <AnimatePresence>
      {m && Diagram && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative mx-auto my-4 md:my-8 w-full max-w-6xl rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl"
          >
            <button
              onClick={onClose}
              aria-label="close"
              className="absolute top-4 right-4 md:top-5 md:right-5 z-20 p-2 rounded-full bg-black/50 hover:bg-white/15 border border-white/15 text-gray-200 hover:text-white transition-colors backdrop-blur"
            >
              <FiX className="w-5 h-5" />
            </button>

            <header className="relative px-5 md:px-10 pr-16 md:pr-20 pt-8 md:pt-12 pb-5 md:pb-8 overflow-hidden rounded-t-2xl">
              <div
                aria-hidden
                className="absolute inset-0 opacity-20"
                style={{ background: m.gradient }}
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse at top, rgba(255,255,255,0.08), transparent 60%)',
                }}
              />
              <div className="relative">
                <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-gray-400 mb-2">
                  {m.eyebrow[locale]}
                </div>
                <h2
                  className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
                  style={{
                    backgroundImage: m.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {m.title[locale]}
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed mt-3 max-w-3xl">
                  {m.subtitle[locale]}
                </p>
              </div>
            </header>

            <div className="px-3 sm:px-5 md:px-10 pb-8 md:pb-12 space-y-5">
              <div className="rounded-xl bg-black/40 border border-white/10 p-2 sm:p-4 md:p-6 overflow-x-auto">
                <Diagram />
              </div>
              <p className="text-[11px] sm:text-xs md:text-sm text-gray-400 leading-relaxed">
                {m.caption[locale]}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
