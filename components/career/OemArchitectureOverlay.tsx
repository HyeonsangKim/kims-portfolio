'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'
import { useI18n, type Locale } from '@/lib/i18n'

const ui: Record<string, Record<Locale, string>> = {
  eyebrow: {
    ko: 'Architecture · OEM Pre-installed App Platform',
    en: 'Architecture · OEM Pre-installed App Platform',
    ja: 'Architecture · OEM Pre-installed App Platform',
  },
  title: {
    ko: 'OEM Auth Server + Service Backbones',
    en: 'OEM Auth Server + Service Backbones',
    ja: 'OEM Auth Server + Service Backbones',
  },
  subtitle: {
    ko: '단일 Auth Server가 Mohani / Odiya 두 서비스 백엔드를 인증·동기화한다. Webhook (X-Webhook-Secret · 3-retry · DLQ) + Internal API (X-API-Key · IP whitelist)로 분리, Token Family Tracking으로 Refresh 재사용 공격을 즉시 차단.',
    en: 'A single Auth Server authenticates and syncs two service backbones (Mohani / Odiya). Webhook (X-Webhook-Secret · 3-retry · DLQ) + Internal API (X-API-Key · IP whitelist) decouple them, Token Family Tracking instantly revokes reused Refresh tokens.',
    ja: '単一のAuth ServerがMohani / Odiyaの2バックエンドを認証・同期。Webhook（X-Webhook-Secret · 3-retry · DLQ）+ Internal API（X-API-Key · IPホワイトリスト）で分離し、Token Family TrackingでRefresh再利用攻撃を即時遮断。',
  },
  bottom: {
    ko: 'Client → OEM Auth Server → 서비스 백엔드 (Mohani / Odiya) → 데이터 계층까지 이어지는 4-tier 구조. 인증 장애가 비즈니스로 전파되지 않고, Webhook이 실시간 동기화하며 DLQ로 메시지 유실을 복구한다.',
    en: 'Four-tier — Client → OEM Auth Server → Service backbones (Mohani / Odiya) → Data. Auth outages do not propagate to business; Webhooks keep state in sync and the DLQ recovers from message loss.',
    ja: 'Client → OEM Auth Server → サービスバックボーン（Mohani / Odiya）→ Dataの4階層。認証障害はビジネスに伝播せず、Webhookで実時間同期、DLQでメッセージ消失を復旧します。',
  },
}

const t = (key: keyof typeof ui, locale: Locale) => ui[key][locale] ?? ui[key].en

export default function OemArchitectureOverlay({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const { locale } = useI18n()

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
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
                style={{ background: 'linear-gradient(135deg, #3b82f6, #22d3ee)' }}
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
                  {t('eyebrow', locale)}
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  {t('title', locale)}
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 leading-relaxed mt-3 max-w-3xl">
                  {t('subtitle', locale)}
                </p>
              </div>
            </header>

            <div className="px-3 sm:px-5 md:px-10 pb-8 md:pb-12 space-y-5">
              <div className="rounded-xl bg-black/40 border border-white/10 p-2 sm:p-4 md:p-6 overflow-x-auto">
                <OemArchitectureDiagram />
              </div>
              <p className="text-[11px] sm:text-xs md:text-sm text-gray-400 leading-relaxed">
                {t('bottom', locale)}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

/* ────────────── SVG Diagram ────────────── */

function OemArchitectureDiagram() {
  return (
    <svg
      role="img"
      aria-label="OEM Pre-installed App Platform — OEM Auth Server architecture"
      viewBox="0 0 1080 820"
      className="w-full h-auto min-w-[640px]"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="nodebg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
        <linearGradient id="authbg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(34,211,238,0.08)" />
          <stop offset="100%" stopColor="rgba(59,130,246,0.04)" />
        </linearGradient>

        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.5)" />
        </marker>
        <marker id="arrow-cyan" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#22d3ee" />
        </marker>
        <marker id="arrow-amber" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
        </marker>
      </defs>

      {/* Tier labels (right) */}
      <TierLabel y={68} text="CLIENT APPS" />
      <TierLabel y={252} text="AUTH SERVER" />
      <TierLabel y={500} text="SERVICE BACKBONES" />
      <TierLabel y={730} text="DATA" />

      {/* ───── CLIENT TIER ───── */}
      <Node
        x={70}
        y={56}
        w={200}
        h={92}
        title="Mohani (Kids)"
        subtitle="Child · React Native"
        tag="Knox SDK · 7 NativeModules"
      />
      <Node
        x={290}
        y={56}
        w={200}
        h={92}
        title="Mohani (Parent)"
        subtitle="Parent · React Native"
        tag="hot-updater · FCM"
      />
      <Node
        x={580}
        y={56}
        w={200}
        h={92}
        title="Odiya (Kids)"
        subtitle="Child · React Native"
        tag="Location · FCM"
      />
      <Node
        x={800}
        y={56}
        w={200}
        h={92}
        title="Odiya (Parent)"
        subtitle="Parent · React Native"
        tag="Naver Map"
      />

      {/* Clients → Auth (terminate at auth-server top edge y=196) */}
      <Arrow x1={170} y1={148} x2={380} y2={196} />
      <Arrow x1={390} y1={148} x2={480} y2={196} />
      <Arrow x1={680} y1={148} x2={600} y2={196} />
      <Arrow x1={900} y1={148} x2={700} y2={196} />

      {/* ───── AUTH SERVER TIER ───── */}
      <AuthServerNode />

      {/* Auth ↔ Services — separated lanes:
          outer lane = Webhook (auth → service, cyan)
          inner lane = Internal API (service → auth, white) */}

      {/* Left lane — to Mohani */}
      <CurveArrow d="M 340 410 Q 230 460 200 510" color="#22d3ee" markerId="arrow-cyan" />
      <text x={150} y={448} fontSize="11" fill="#7dd3fc" fontWeight="700" fontFamily="ui-monospace,monospace">Webhook</text>
      <text x={150} y={462} fontSize="9" fill="rgba(125,211,252,0.7)" fontFamily="ui-monospace,monospace">3-retry → DLQ</text>

      <CurveArrow d="M 290 510 Q 390 470 440 410" color="rgba(255,255,255,0.45)" markerId="arrow" reverse />
      <text x={380} y={494} fontSize="10" fill="rgba(255,255,255,0.6)" fontFamily="ui-monospace,monospace">Internal API</text>

      {/* Right lane — to Odiya */}
      <CurveArrow d="M 740 410 Q 850 460 880 510" color="#22d3ee" markerId="arrow-cyan" />
      <text x={830} y={448} fontSize="11" fill="#7dd3fc" fontWeight="700" fontFamily="ui-monospace,monospace">Webhook</text>
      <text x={810} y={462} fontSize="9" fill="rgba(125,211,252,0.7)" fontFamily="ui-monospace,monospace">X-Idempotency-Key</text>

      <CurveArrow d="M 790 510 Q 690 470 640 410" color="rgba(255,255,255,0.45)" markerId="arrow" reverse />
      <text x={580} y={494} fontSize="10" fill="rgba(255,255,255,0.6)" fontFamily="ui-monospace,monospace">X-API-Key · IP wl</text>

      {/* ───── SERVICE BACKBONE TIER ───── */}
      <Node
        x={70}
        y={510}
        w={420}
        h={160}
        title="Mohani Server"
        subtitle="mohani.soundmind.life · Spring Boot · MariaDB · Redis"
        bullets={[
          'Receives webhooks at /api/internal/notifications',
          'SERVICE_WITHDRAWN — 4-Phase processing (Tx → Redis → FCM → Token)',
          'CompletableFuture sync — COLLECT_APPS / WEEK_STATISTICS (10s timeout)',
          'data-only FCM (BLOCK_APP, UPDATE_TIME_LIMIT, UPDATE_SLEEP, …)',
          'Last-parent-unlink → ChildSettingsResetService',
        ]}
      />
      <Node
        x={580}
        y={510}
        w={420}
        h={160}
        title="Odiya Server"
        subtitle="odiya-backend · Spring Boot · MariaDB · Redis · Flyway"
        bullets={[
          'Location batch — Redis List → 60s INSERT (95% DB write reduction)',
          'Haversine SQL geofencing (no PostGIS) — radius 300m default',
          'PartitionManagerService — daily cron, drops 15-day-old partitions',
          'AES location encryption · SAFETY_ZONE_ENTER/LEAVE FCM',
        ]}
      />

      {/* Services → Data */}
      <Arrow x1={170} y1={670} x2={150} y2={730} />
      <Arrow x1={290} y1={670} x2={290} y2={730} />
      <Arrow x1={410} y1={670} x2={430} y2={730} />
      <Arrow x1={650} y1={670} x2={650} y2={730} />
      <Arrow x1={790} y1={670} x2={790} y2={730} />
      <Arrow x1={930} y1={670} x2={930} y2={730} />

      {/* ───── DATA TIER ───── */}
      <DataNode x={70} y={730} w={140} title="Mohani DB" subtitle="MariaDB" />
      <DataNode x={230} y={730} w={140} title="Mohani Redis" subtitle="link cache · fcm lock" />
      <DataNode x={390} y={730} w={140} title="Mohani S3" subtitle="app icons (iwinv)" />
      <DataNode x={580} y={730} w={140} title="Odiya DB" subtitle="MariaDB partitioned" />
      <DataNode x={740} y={730} w={140} title="Odiya Redis" subtitle="position buffer (24h)" />
      <DataNode x={900} y={730} w={140} title="Firebase × 3" subtitle="odiya · mohani · r2s" />

      {/* Legend — positioned below the AUTH SERVER tier label to avoid overlap */}
      <Legend x={870} y={290} />
    </svg>
  )
}

/* ────────────── SVG helpers ────────────── */

function TierLabel({ y, text }: { y: number; text: string }) {
  return (
    <text x={1050} y={y} textAnchor="end" fontSize="10" fontWeight="700" letterSpacing="0.22em" fill="rgba(255,255,255,0.4)" fontFamily="ui-monospace,monospace">
      {text}
    </text>
  )
}

function Node({
  x, y, w, h, title, subtitle, tag, bullets, accent,
}: {
  x: number; y: number; w: number; h: number
  title: string; subtitle?: string; tag?: string
  bullets?: string[]; accent?: boolean
}) {
  const stroke = accent ? 'url(#accent)' : 'rgba(255,255,255,0.18)'
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill="url(#nodebg)" stroke={stroke} strokeWidth={accent ? 1.6 : 1} />
      <text x={x + 16} y={y + 24} fontSize="14" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">{title}</text>
      {subtitle && (
        <text x={x + 16} y={y + 42} fontSize="10.5" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif,system-ui">{subtitle}</text>
      )}
      {tag && (
        <g>
          <rect x={x + 16} y={y + h - 24} width={tag.length * 5.5 + 14} height={16} rx={4} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" />
          <text x={x + 22} y={y + h - 12} fontSize="9" fill="rgba(255,255,255,0.7)" fontFamily="ui-monospace,monospace">{tag}</text>
        </g>
      )}
      {bullets && bullets.map((b, i) => (
        <g key={i}>
          <circle cx={x + 22} cy={y + 64 + i * 18} r={1.8} fill="#22d3ee" />
          <text x={x + 32} y={y + 68 + i * 18} fontSize="10.5" fill="rgba(255,255,255,0.78)" fontFamily="ui-sans-serif,system-ui">{b}</text>
        </g>
      ))}
    </g>
  )
}

function AuthServerNode() {
  const x = 250
  const y = 196
  const w = 580
  const h = 214
  return (
    <g>
      {/* Outer accent border */}
      <rect x={x - 4} y={y - 4} width={w + 8} height={h + 8} rx={16} fill="none" stroke="url(#accent)" strokeWidth={1.4} strokeOpacity={0.5} />
      {/* Main panel */}
      <rect x={x} y={y} width={w} height={h} rx={14} fill="url(#authbg)" stroke="url(#accent)" strokeWidth={1.5} />
      <text x={x + 22} y={y + 30} fontSize="17" fontWeight="800" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
        OEM Auth Server
      </text>
      <text x={x + 22} y={y + 50} fontSize="11" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif,system-ui">
        sso.soundmind.life · Spring Boot 17 · MariaDB · Redis · Flyway V1–V23
      </text>

      {/* 2-column feature list */}
      {[
        ['Authentication', 'JWT HS256 + Refresh Rotation + Token Family Tracking'],
        ['Crypto', 'BCrypt 12 · AES-256-GCM · phone SHA-256 hash'],
        ['Rate Limiting', 'Redis · IP / Account / Endpoint (11 policies)'],
        ['Lifecycle', 'Dormant scheduler 12:00 · Direct user 12:15'],
        ['Webhook Producer', 'X-Webhook-Secret · 3-retry · DLQ + admin console'],
        ['Internal API', 'X-API-Key · IP whitelist (CIDR) · X-Cache-Hit'],
        ['Admin', 'Next.js 16 + Prisma 6 dashboard · X-Admin-Api-Key'],
        ['WebView', 'Vite + React signup flow + PASS / SMS verify'],
      ].map(([label, val], i) => {
        const col = i % 2
        const row = Math.floor(i / 2)
        const cx = x + 22 + col * 280
        const cy = y + 88 + row * 30
        return (
          <g key={i}>
            <text x={cx} y={cy} fontSize="9.5" fontWeight="700" fill="#22d3ee" letterSpacing="0.05em" fontFamily="ui-monospace,monospace">
              {label}
            </text>
            <text x={cx} y={cy + 14} fontSize="10.5" fill="rgba(255,255,255,0.78)" fontFamily="ui-sans-serif,system-ui">
              {val}
            </text>
          </g>
        )
      })}
    </g>
  )
}

function DataNode({ x, y, w, title, subtitle }: { x: number; y: number; w: number; title: string; subtitle: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={66} rx={10} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" />
      <text x={x + 12} y={y + 22} fontSize="11.5" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">{title}</text>
      <text x={x + 12} y={y + 40} fontSize="9.5" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif,system-ui">{subtitle}</text>
    </g>
  )
}

function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.35)" strokeWidth={1.3} markerEnd="url(#arrow)" />
}

function CurveArrow({
  d, color, markerId, reverse,
}: { d: string; color: string; markerId: string; reverse?: boolean }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      markerEnd={reverse ? undefined : `url(#${markerId})`}
      markerStart={reverse ? `url(#${markerId})` : undefined}
    />
  )
}

function Legend({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect width={180} height={108} rx={8} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" />
      <text x={12} y={20} fontSize="9" fontWeight="700" letterSpacing="0.18em" fill="rgba(255,255,255,0.5)" fontFamily="ui-monospace,monospace">
        LEGEND
      </text>
      <line x1={12} y1={40} x2={38} y2={40} stroke="#22d3ee" strokeWidth={1.6} markerEnd="url(#arrow-cyan)" />
      <text x={46} y={43} fontSize="10" fill="rgba(255,255,255,0.7)" fontFamily="ui-sans-serif,system-ui">Webhook event</text>
      <line x1={12} y1={62} x2={38} y2={62} stroke="rgba(255,255,255,0.5)" strokeWidth={1.4} markerEnd="url(#arrow)" />
      <text x={46} y={65} fontSize="10" fill="rgba(255,255,255,0.7)" fontFamily="ui-sans-serif,system-ui">Internal API / req</text>
      <line x1={12} y1={84} x2={38} y2={84} stroke="#f59e0b" strokeWidth={1.4} strokeDasharray="5 3" markerEnd="url(#arrow-amber)" />
      <text x={46} y={87} fontSize="10" fill="rgba(255,255,255,0.7)" fontFamily="ui-sans-serif,system-ui">DLQ / async retry</text>
    </g>
  )
}
