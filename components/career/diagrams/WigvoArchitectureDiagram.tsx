/**
 * WIGVO — at-a-glance architecture for the side-project modal.
 *
 * Reading flow:
 *   User (Chat UI) ─► API Routes
 *                     ├─► GPT-4o-mini (시나리오 정보 수집 + Entity 추출)
 *                     ├─► Naver Maps API (장소·전화번호 자동 조회)
 *                     ├─► Supabase (대화·통화 기록)
 *                     └─► ElevenLabs Conversational AI + Twilio (실 음성 통화)
 *
 *   "Twilio 발신 직전에 사람 확인 1회"가 시스템 디자인의 핵심 결정이라
 *   confirm 단계를 시각적으로 표시한다.
 */
export default function WigvoArchitectureDiagram() {
  return (
    <svg
      role="img"
      aria-label="WIGVO — Next.js 채팅 UI + GPT-4o-mini 정보 수집 + ElevenLabs/Twilio 음성 통화 흐름도"
      viewBox="0 0 1080 460"
      className="w-full h-auto min-w-[640px]"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="wigvo-accent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="wigvo-warn" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
        <linearGradient id="wigvo-nodebg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1620" />
          <stop offset="100%" stopColor="#040810" />
        </linearGradient>
        <marker id="wigvo-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#22d3ee" />
        </marker>
        <marker id="wigvo-arrow-warn" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
        </marker>
      </defs>

      {/* Tier labels */}
      <WTag x={140} y={36} text="CLIENT" />
      <WTag x={460} y={36} text="API ROUTES (Next.js)" />
      <WTag x={870} y={36} text="EXTERNAL" />

      {/* Node 1: Chat UI */}
      <WNode
        x={40} y={88} w={220} h={104}
        title="Chat UI"
        subtitle="Next.js 16 + shadcn/ui"
        tag="시나리오 선택 → 자연어 입력"
      />

      {/* Arrow 1 → 2 */}
      <line x1={260} y1={140} x2={360} y2={140} stroke="#22d3ee" strokeWidth={1.6} markerEnd="url(#wigvo-arrow)" />

      {/* Node 2: API Routes */}
      <WNode
        x={360} y={88} w={220} h={104}
        title="API Routes"
        subtitle="/api/conversations · /api/chat"
        tag="필수 항목 수집 흐름"
      />

      {/* Arrows from API → externals */}
      <line x1={580} y1={120} x2={780} y2={88} stroke="#22d3ee" strokeWidth={1.3} markerEnd="url(#wigvo-arrow)" />
      <line x1={580} y1={140} x2={780} y2={172} stroke="#22d3ee" strokeWidth={1.3} markerEnd="url(#wigvo-arrow)" />
      <line x1={580} y1={160} x2={780} y2={252} stroke="#22d3ee" strokeWidth={1.3} markerEnd="url(#wigvo-arrow)" />

      {/* Right column — external services */}
      <WNode
        x={780} y={64} w={260} h={76}
        title="GPT-4o-mini"
        subtitle="시나리오 기반 정보 수집 + Entity 추출"
      />
      <WNode
        x={780} y={148} w={260} h={76}
        title="Naver Maps API"
        subtitle="장소 검색 · 전화번호 자동 조회"
      />
      <WNode
        x={780} y={232} w={260} h={76}
        title="Supabase (PostgreSQL)"
        subtitle="대화 / 메시지 / 통화 기록 / Entity"
      />

      {/* Confirm gate (사람 1회 확인) */}
      <g>
        <rect x={360} y={228} width={220} height={56} rx={28} fill="rgba(245,158,11,0.12)" stroke="url(#wigvo-warn)" strokeWidth={1.5} strokeDasharray="4 3" />
        <text x={470} y={253} textAnchor="middle" fontSize="12" fontWeight="700" fill="#fbbf24" fontFamily="ui-sans-serif,system-ui">
          ⚠ Confirm Gate
        </text>
        <text x={470} y={270} textAnchor="middle" fontSize="10" fill="rgba(251,191,36,0.85)" fontFamily="ui-monospace,monospace">
          Twilio 발신 직전 사용자 1회 확인
        </text>
      </g>

      {/* Arrow API → Confirm Gate */}
      <line x1={470} y1={192} x2={470} y2={224} stroke="#f59e0b" strokeWidth={1.4} markerEnd="url(#wigvo-arrow-warn)" />

      {/* Arrow Confirm Gate → Voice Call cluster */}
      <line x1={580} y1={256} x2={780} y2={336} stroke="#f59e0b" strokeWidth={1.6} markerEnd="url(#wigvo-arrow-warn)" />

      {/* Voice Call cluster (오른쪽 하단) */}
      <WNode
        x={780} y={316} w={260} h={104}
        title="ElevenLabs + Twilio"
        subtitle="Dynamic Prompt · 실 음성 통화"
        tag="상대방이 실제 사람 — 실수 비용 큼"
      />

      {/* 하단 강조 */}
      <g>
        <rect x={40} y={384} width={720} height={56} rx={10} fill="rgba(34, 211, 238, 0.06)" stroke="url(#wigvo-accent)" strokeWidth={1.2} strokeDasharray="6 4" />
        <text x={60} y={410} fontSize="12.5" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
          ★ 핵심 결정: "사람 개입을 빼는 게 목표지만, 통화 직전 1회는 사람이 컨펌"
        </text>
        <text x={60} y={428} fontSize="10.5" fill="rgba(255,255,255,0.65)" fontFamily="ui-sans-serif,system-ui">
          음성 통화는 시각 UI보다 실수 비용이 훨씬 큼 — 자동화와 안전 사이의 명시적 절충.
        </text>
      </g>
    </svg>
  )
}

function WTag({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <text x={x} y={y} fontSize="10" fontWeight="700" fill="rgba(34, 211, 238, 0.7)" letterSpacing="0.18em" fontFamily="ui-monospace,monospace" textAnchor="middle">
      {text}
    </text>
  )
}

function WNode({ x, y, w, h, title, subtitle, tag }: { x: number; y: number; w: number; h: number; title: string; subtitle: string; tag?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill="url(#wigvo-nodebg)" stroke="url(#wigvo-accent)" strokeWidth={1.5} />
      <text x={x + 16} y={y + 28} fontSize="14" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">{title}</text>
      <text x={x + 16} y={y + 48} fontSize="10.5" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif,system-ui">{subtitle}</text>
      {tag && (
        <text x={x + 16} y={y + h - 14} fontSize="9.5" fill="rgba(165, 243, 252, 0.85)" fontFamily="ui-monospace,monospace">{tag}</text>
      )}
    </g>
  )
}
