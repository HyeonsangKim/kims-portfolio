export default function OemArchitectureDiagram() {
  return (
    <svg
      role="img"
      aria-label="OEM Pre-installed App Platform — OEM Auth Server architecture"
      viewBox="0 0 1080 820"
      className="w-full h-auto min-w-[640px]"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="oem-accent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="oem-nodebg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>
        <linearGradient id="oem-authbg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(34,211,238,0.08)" />
          <stop offset="100%" stopColor="rgba(59,130,246,0.04)" />
        </linearGradient>
        <marker id="oem-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.5)" />
        </marker>
        <marker id="oem-arrow-cyan" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#22d3ee" />
        </marker>
        <marker id="oem-arrow-amber" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
        </marker>
      </defs>

      {/* Tier labels */}
      <TierLabel y={68} text="CLIENT APPS" />
      <TierLabel y={252} text="AUTH SERVER" />
      <TierLabel y={500} text="SERVICE BACKBONES" />
      <TierLabel y={730} text="DATA" />

      {/* CLIENT TIER */}
      <ONode x={70} y={56} w={200} h={92} title="Mohani (Kids)" subtitle="Child · React Native" tag="MDM SDK · NativeModules" />
      <ONode x={290} y={56} w={200} h={92} title="Mohani (Parent)" subtitle="Parent · React Native" tag="OTA · Push" />
      <ONode x={580} y={56} w={200} h={92} title="Odiya (Kids)" subtitle="Child · React Native" tag="Location · Push" />
      <ONode x={800} y={56} w={200} h={92} title="Odiya (Parent)" subtitle="Parent · React Native" tag="Map" />

      {/* Clients → Auth */}
      <OArrow x1={170} y1={148} x2={380} y2={196} />
      <OArrow x1={390} y1={148} x2={480} y2={196} />
      <OArrow x1={680} y1={148} x2={600} y2={196} />
      <OArrow x1={900} y1={148} x2={700} y2={196} />

      {/* AUTH SERVER */}
      <AuthServerNode />

      {/* Auth ↔ Services */}
      <OCurve d="M 340 410 Q 230 460 200 510" color="#22d3ee" markerId="oem-arrow-cyan" />
      <text x={150} y={448} fontSize="11" fill="#7dd3fc" fontWeight="700" fontFamily="ui-monospace,monospace">Webhook</text>
      <text x={150} y={462} fontSize="9" fill="rgba(125,211,252,0.7)" fontFamily="ui-monospace,monospace">3-retry → DLQ</text>
      <OCurve d="M 290 510 Q 390 470 440 410" color="rgba(255,255,255,0.45)" markerId="oem-arrow" reverse />
      <text x={380} y={494} fontSize="10" fill="rgba(255,255,255,0.6)" fontFamily="ui-monospace,monospace">Internal API</text>
      <OCurve d="M 740 410 Q 850 460 880 510" color="#22d3ee" markerId="oem-arrow-cyan" />
      <text x={830} y={448} fontSize="11" fill="#7dd3fc" fontWeight="700" fontFamily="ui-monospace,monospace">Webhook</text>
      <text x={810} y={462} fontSize="9" fill="rgba(125,211,252,0.7)" fontFamily="ui-monospace,monospace">Idempotency-Key</text>
      <OCurve d="M 790 510 Q 690 470 640 410" color="rgba(255,255,255,0.45)" markerId="oem-arrow" reverse />
      <text x={580} y={494} fontSize="10" fill="rgba(255,255,255,0.6)" fontFamily="ui-monospace,monospace">API-Key · IP wl</text>

      {/* SERVICE BACKBONE TIER */}
      <ONode x={70} y={510} w={420} h={160} title="Mohani Server" subtitle="Spring Boot · MariaDB · Redis"
        bullets={['Webhook receiver', 'Service withdrawal 4-Phase', 'CompletableFuture sync', 'Policy-driven push commands', 'Last-parent-unlink reset']}
      />
      <ONode x={580} y={510} w={420} h={160} title="Odiya Server" subtitle="Spring Boot · MariaDB · Redis"
        bullets={['Location batch (95% DB write reduction)', 'Haversine geofencing', 'Partition manager (daily cron)', 'Location encryption · geofence push']}
      />

      {/* Services → Data */}
      <OArrow x1={170} y1={670} x2={150} y2={730} />
      <OArrow x1={290} y1={670} x2={290} y2={730} />
      <OArrow x1={410} y1={670} x2={430} y2={730} />
      <OArrow x1={650} y1={670} x2={650} y2={730} />
      <OArrow x1={790} y1={670} x2={790} y2={730} />
      <OArrow x1={930} y1={670} x2={930} y2={730} />

      {/* DATA TIER */}
      <DNode x={70} y={730} w={140} title="Mohani DB" subtitle="MariaDB" />
      <DNode x={230} y={730} w={140} title="Mohani Redis" subtitle="link cache · lock" />
      <DNode x={390} y={730} w={140} title="Mohani S3" subtitle="app icons" />
      <DNode x={580} y={730} w={140} title="Odiya DB" subtitle="MariaDB partitioned" />
      <DNode x={740} y={730} w={140} title="Odiya Redis" subtitle="position buffer" />
      <DNode x={900} y={730} w={140} title="Firebase x3" subtitle="push services" />

      {/* Legend */}
      <g transform="translate(870, 290)">
        <rect width={180} height={108} rx={8} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" />
        <text x={12} y={20} fontSize="9" fontWeight="700" letterSpacing="0.18em" fill="rgba(255,255,255,0.5)" fontFamily="ui-monospace,monospace">LEGEND</text>
        <line x1={12} y1={40} x2={38} y2={40} stroke="#22d3ee" strokeWidth={1.6} markerEnd="url(#oem-arrow-cyan)" />
        <text x={46} y={43} fontSize="10" fill="rgba(255,255,255,0.7)" fontFamily="ui-sans-serif,system-ui">Webhook event</text>
        <line x1={12} y1={62} x2={38} y2={62} stroke="rgba(255,255,255,0.5)" strokeWidth={1.4} markerEnd="url(#oem-arrow)" />
        <text x={46} y={65} fontSize="10" fill="rgba(255,255,255,0.7)" fontFamily="ui-sans-serif,system-ui">Internal API / req</text>
        <line x1={12} y1={84} x2={38} y2={84} stroke="#f59e0b" strokeWidth={1.4} strokeDasharray="5 3" markerEnd="url(#oem-arrow-amber)" />
        <text x={46} y={87} fontSize="10" fill="rgba(255,255,255,0.7)" fontFamily="ui-sans-serif,system-ui">DLQ / async retry</text>
      </g>
    </svg>
  )
}

function TierLabel({ y, text }: { y: number; text: string }) {
  return <text x={1050} y={y} textAnchor="end" fontSize="10" fontWeight="700" letterSpacing="0.22em" fill="rgba(255,255,255,0.4)" fontFamily="ui-monospace,monospace">{text}</text>
}

function ONode({ x, y, w, h, title, subtitle, tag, bullets }: { x: number; y: number; w: number; h: number; title: string; subtitle?: string; tag?: string; bullets?: string[] }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill="url(#oem-nodebg)" stroke="rgba(255,255,255,0.18)" strokeWidth={1} />
      <text x={x + 16} y={y + 24} fontSize="14" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">{title}</text>
      {subtitle && <text x={x + 16} y={y + 42} fontSize="10.5" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif,system-ui">{subtitle}</text>}
      {tag && (
        <g>
          <rect x={x + 16} y={y + h - 24} width={tag.length * 5.5 + 14} height={16} rx={4} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" />
          <text x={x + 22} y={y + h - 12} fontSize="9" fill="rgba(255,255,255,0.7)" fontFamily="ui-monospace,monospace">{tag}</text>
        </g>
      )}
      {bullets?.map((b, i) => (
        <g key={i}>
          <circle cx={x + 22} cy={y + 64 + i * 18} r={1.8} fill="#22d3ee" />
          <text x={x + 32} y={y + 68 + i * 18} fontSize="10.5" fill="rgba(255,255,255,0.78)" fontFamily="ui-sans-serif,system-ui">{b}</text>
        </g>
      ))}
    </g>
  )
}

function AuthServerNode() {
  const x = 230, y = 196, w = 620, h = 214
  return (
    <g>
      <rect x={x - 4} y={y - 4} width={w + 8} height={h + 8} rx={16} fill="none" stroke="url(#oem-accent)" strokeWidth={1.4} strokeOpacity={0.5} />
      <rect x={x} y={y} width={w} height={h} rx={14} fill="url(#oem-authbg)" stroke="url(#oem-accent)" strokeWidth={1.5} />
      <text x={x + 22} y={y + 30} fontSize="17" fontWeight="800" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">OEM Auth Server</text>
      <text x={x + 22} y={y + 50} fontSize="11" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif,system-ui">Spring Boot · MariaDB · Redis</text>
      {[
        ['Authentication', 'JWT + Refresh Rotation + Token Family Tracking'],
        ['Crypto', 'BCrypt · AES-256 · phone hash'],
        ['Rate Limiting', 'Redis · IP / Account / Endpoint'],
        ['Lifecycle', 'Dormant → Anonymize → Hard-delete automation'],
        ['Webhook Producer', 'Secret · retry → DLQ + admin console'],
        ['Internal API', 'API-Key · IP whitelist'],
        ['Admin', 'Next.js dashboard'],
        ['WebView', 'Signup flow + verification'],
      ].map(([label, val], i) => {
        const col = i % 2, row = Math.floor(i / 2)
        const cx = x + 22 + col * 310, cy = y + 88 + row * 30
        return (
          <g key={i}>
            <text x={cx} y={cy} fontSize="9.5" fontWeight="700" fill="#22d3ee" letterSpacing="0.05em" fontFamily="ui-monospace,monospace">{label}</text>
            <text x={cx} y={cy + 14} fontSize="10.5" fill="rgba(255,255,255,0.78)" fontFamily="ui-sans-serif,system-ui">{val}</text>
          </g>
        )
      })}
    </g>
  )
}

function DNode({ x, y, w, title, subtitle }: { x: number; y: number; w: number; title: string; subtitle: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={66} rx={10} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" />
      <text x={x + 12} y={y + 22} fontSize="11.5" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">{title}</text>
      <text x={x + 12} y={y + 40} fontSize="9.5" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif,system-ui">{subtitle}</text>
    </g>
  )
}

function OArrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.35)" strokeWidth={1.3} markerEnd="url(#oem-arrow)" />
}

function OCurve({ d, color, markerId, reverse }: { d: string; color: string; markerId: string; reverse?: boolean }) {
  return <path d={d} fill="none" stroke={color} strokeWidth={1.5} markerEnd={reverse ? undefined : `url(#${markerId})`} markerStart={reverse ? `url(#${markerId})` : undefined} />
}
