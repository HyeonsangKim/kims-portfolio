/**
 * Odiya location pipeline — at-a-glance architecture for the career modal.
 *
 * Reading flow (left → right):
 *   Child device → odiya-backend → Redis (two roles) → periodic batch → DB
 *                                                ↑
 *                            Parent device polls — served by cache
 *
 * The cyan path is the write-side buffer that absorbs burst INSERTs.
 * The amber path is the read-side cache that absorbs parent polling.
 */
export default function OdiyaArchitectureDiagram() {
  return (
    <svg
      role="img"
      aria-label="Odiya — Redis 두 갈래 활용 + 주기 배치 + 일자 파티션 흐름도"
      viewBox="0 0 1080 540"
      className="w-full h-auto min-w-[640px]"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="odiya-accent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="odiya-amber" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
        <linearGradient id="odiya-nodebg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>

        <marker id="odiya-arrow-cyan" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#22d3ee" />
        </marker>
        <marker id="odiya-arrow-amber" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
        </marker>
        <marker id="odiya-arrow-white" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.55)" />
        </marker>
      </defs>

      {/* Tier labels (top) */}
      <Tag x={60} y={32} text="CLIENT" />
      <Tag x={300} y={32} text="BACKEND" />
      <Tag x={540} y={32} text="REDIS LAYER" />
      <Tag x={820} y={32} text="DB" />

      {/* ─── CLIENT TIER ─── */}
      <DeviceNode
        x={40}
        y={80}
        w={200}
        h={92}
        title="자녀 단말"
        subtitle="RN · 백그라운드"
        tag="좌표 burst 송출"
      />
      <DeviceNode
        x={40}
        y={332}
        w={200}
        h={92}
        title="부모 단말"
        subtitle="RN · 주기 polling"
        tag="자녀 정보 반복 조회"
      />

      {/* ─── BACKEND TIER ─── */}
      <BackendNode
        x={280}
        y={80}
        w={220}
        h={92}
        title="odiya-backend"
        subtitle="Spring Boot · MariaDB"
      />
      <BackendNode
        x={280}
        y={332}
        w={220}
        h={92}
        title="odiya-backend"
        subtitle="조회 API"
      />

      {/* Client → Backend */}
      <line x1={240} y1={126} x2={280} y2={126} stroke="#22d3ee" strokeWidth={1.6} markerEnd="url(#odiya-arrow-cyan)" />
      <text x={246} y={117} fontSize="10" fill="#7dd3fc" fontFamily="ui-monospace,monospace">좌표</text>

      <line x1={240} y1={378} x2={280} y2={378} stroke="#f59e0b" strokeWidth={1.6} markerEnd="url(#odiya-arrow-amber)" />
      <text x={246} y={369} fontSize="10" fill="#fbbf24" fontFamily="ui-monospace,monospace">GET</text>

      {/* ─── REDIS TIER (two roles in one box) ─── */}
      <g>
        <rect x={540} y={60} width={240} height={400} rx={14} fill="rgba(34,211,238,0.06)" stroke="url(#odiya-accent)" strokeWidth={1.5} />
        <text x={660} y={88} textAnchor="middle" fontSize="14" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
          Redis
        </text>
        <text x={660} y={106} textAnchor="middle" fontSize="10.5" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif,system-ui">
          기존 인프라 재활용 · 두 갈래 활용
        </text>

        {/* Role 1: write buffer */}
        <rect x={556} y={124} width={208} height={140} rx={10} fill="rgba(34,211,238,0.08)" stroke="rgba(34,211,238,0.4)" strokeWidth={1} />
        <text x={566} y={142} fontSize="11" fontWeight="700" fill="#22d3ee" fontFamily="ui-monospace,monospace">
          ① WRITE BUFFER
        </text>
        <text x={566} y={163} fontSize="12" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
          List (전체 좌표)
        </text>
        <text x={566} y={181} fontSize="10.5" fill="rgba(255,255,255,0.65)" fontFamily="ui-sans-serif,system-ui">
          모든 좌표 push
        </text>
        <line x1={566} y1={195} x2={754} y2={195} stroke="rgba(255,255,255,0.08)" />
        <text x={566} y={212} fontSize="12" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
          Hash (최신 좌표)
        </text>
        <text x={566} y={230} fontSize="10.5" fill="rgba(255,255,255,0.65)" fontFamily="ui-sans-serif,system-ui">
          유저별 1개 · 짧은 TTL
        </text>
        <text x={566} y={250} fontSize="10" fill="rgba(125,211,252,0.85)" fontFamily="ui-monospace,monospace">
          → 안전구역 평가에 사용
        </text>

        {/* Role 2: read cache */}
        <rect x={556} y={284} width={208} height={156} rx={10} fill="rgba(245,158,11,0.06)" stroke="rgba(245,158,11,0.4)" strokeWidth={1} />
        <text x={566} y={302} fontSize="11" fontWeight="700" fill="#f59e0b" fontFamily="ui-monospace,monospace">
          ② READ CACHE
        </text>
        <text x={566} y={323} fontSize="12" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
          자녀 회원 정보
        </text>
        <text x={566} y={341} fontSize="10.5" fill="rgba(255,255,255,0.65)" fontFamily="ui-sans-serif,system-ui">
          이름 · 연락처 · 상태
        </text>
        <text x={566} y={364} fontSize="10" fill="rgba(251,191,36,0.85)" fontFamily="ui-monospace,monospace">
          → 매 polling 캐시 hit
        </text>
        <text x={566} y={382} fontSize="10" fill="rgba(251,191,36,0.85)" fontFamily="ui-monospace,monospace">
          → DB read 부하 흡수
        </text>
        <text x={566} y={420} fontSize="9.5" fill="rgba(255,255,255,0.45)" fontFamily="ui-monospace,monospace">
          부모 polling 주기 간격
        </text>
      </g>

      {/* Backend → Redis (write) */}
      <line x1={500} y1={126} x2={540} y2={126} stroke="#22d3ee" strokeWidth={1.6} markerEnd="url(#odiya-arrow-cyan)" />
      <text x={506} y={117} fontSize="10" fill="#7dd3fc" fontFamily="ui-monospace,monospace">push</text>

      {/* Backend → Redis (read cache) */}
      <line x1={500} y1={378} x2={540} y2={378} stroke="#f59e0b" strokeWidth={1.6} markerEnd="url(#odiya-arrow-amber)" />
      <text x={506} y={369} fontSize="10" fill="#fbbf24" fontFamily="ui-monospace,monospace">cache</text>

      {/* ─── DB TIER ─── */}
      <DbNode
        x={820}
        y={140}
        w={220}
        h={92}
        title="MariaDB"
        subtitle="좌표 누적 테이블"
        tag="일자 단위 파티션 · 단기 보존"
      />

      {/* Redis List → 60s batch → DB */}
      <path
        d="M 780 195 Q 800 195 810 175"
        fill="none"
        stroke="#22d3ee"
        strokeWidth={1.6}
        markerEnd="url(#odiya-arrow-cyan)"
      />
      <rect x={790} y={244} width={230} height={50} rx={10} fill="url(#odiya-nodebg)" stroke="url(#odiya-accent)" strokeWidth={1.5} />
      <text x={905} y={266} textAnchor="middle" fontSize="12" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
        LocationSyncService
      </text>
      <text x={905} y={283} textAnchor="middle" fontSize="10.5" fill="#7dd3fc" fontFamily="ui-monospace,monospace">
        주기 batch INSERT
      </text>

      {/* Sync ↔ List */}
      <line x1={780} y1={269} x2={790} y2={269} stroke="#22d3ee" strokeWidth={1.4} strokeDasharray="3 3" />
      {/* Sync → DB */}
      <line x1={905} y1={244} x2={905} y2={232} stroke="#22d3ee" strokeWidth={1.6} markerEnd="url(#odiya-arrow-cyan)" />

      {/* Partition scheduler box */}
      <rect x={790} y={328} width={230} height={50} rx={10} fill="url(#odiya-nodebg)" stroke="rgba(255,255,255,0.18)" strokeWidth={1} />
      <text x={905} y={350} textAnchor="middle" fontSize="12" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
        PartitionManagerService
      </text>
      <text x={905} y={367} textAnchor="middle" fontSize="10.5" fill="rgba(255,255,255,0.65)" fontFamily="ui-sans-serif,system-ui">
        다음날 파티션 자동 생성 · 오래된 파티션 자동 DROP
      </text>

      {/* Legend bottom */}
      <g transform="translate(40, 472)">
        <rect width={1000} height={50} rx={8} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
        <line x1={16} y1={18} x2={40} y2={18} stroke="#22d3ee" strokeWidth={1.6} markerEnd="url(#odiya-arrow-cyan)" />
        <text x={48} y={21} fontSize="10.5" fill="rgba(255,255,255,0.78)" fontFamily="ui-sans-serif,system-ui">
          write — 버퍼링으로 단건 INSERT 폭증 흡수
        </text>
        <line x1={16} y1={38} x2={40} y2={38} stroke="#f59e0b" strokeWidth={1.6} markerEnd="url(#odiya-arrow-amber)" />
        <text x={48} y={41} fontSize="10.5" fill="rgba(255,255,255,0.78)" fontFamily="ui-sans-serif,system-ui">
          read — 캐시 hit으로 부모 polling 부하 흡수
        </text>
        <text x={480} y={21} fontSize="10.5" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif,system-ui">
          ① 기존에 운영 중인 Redis 인프라 재활용
        </text>
        <text x={480} y={41} fontSize="10.5" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif,system-ui">
          ② 주기 batch + 일자 파티션으로 인프라 증설 0
        </text>
      </g>
    </svg>
  )
}

/* ────────────── SVG helpers ────────────── */

function Tag({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <text
      x={x}
      y={y}
      fontSize="10"
      fontWeight="700"
      letterSpacing="0.22em"
      fill="rgba(255,255,255,0.4)"
      fontFamily="ui-monospace,monospace"
    >
      {text}
    </text>
  )
}

function DeviceNode({
  x,
  y,
  w,
  h,
  title,
  subtitle,
  tag,
}: {
  x: number
  y: number
  w: number
  h: number
  title: string
  subtitle: string
  tag?: string
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill="url(#odiya-nodebg)" stroke="rgba(255,255,255,0.18)" strokeWidth={1} />
      <text x={x + 16} y={y + 26} fontSize="14" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
        {title}
      </text>
      <text x={x + 16} y={y + 44} fontSize="10.5" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif,system-ui">
        {subtitle}
      </text>
      {tag && (
        <g>
          <rect x={x + 16} y={y + h - 26} width={tag.length * 5.6 + 14} height={18} rx={4} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" />
          <text x={x + 22} y={y + h - 13} fontSize="9.5" fill="rgba(255,255,255,0.7)" fontFamily="ui-monospace,monospace">
            {tag}
          </text>
        </g>
      )}
    </g>
  )
}

function BackendNode(props: Parameters<typeof DeviceNode>[0]) {
  return <DeviceNode {...props} />
}

function DbNode({
  x,
  y,
  w,
  h,
  title,
  subtitle,
  tag,
}: {
  x: number
  y: number
  w: number
  h: number
  title: string
  subtitle: string
  tag?: string
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill="url(#odiya-nodebg)" stroke="url(#odiya-accent)" strokeWidth={1.5} />
      <text x={x + 16} y={y + 26} fontSize="14" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
        {title}
      </text>
      <text x={x + 16} y={y + 44} fontSize="10.5" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif,system-ui">
        {subtitle}
      </text>
      {tag && (
        <text x={x + 16} y={y + h - 14} fontSize="9.5" fill="rgba(125,211,252,0.85)" fontFamily="ui-monospace,monospace">
          {tag}
        </text>
      )}
    </g>
  )
}
