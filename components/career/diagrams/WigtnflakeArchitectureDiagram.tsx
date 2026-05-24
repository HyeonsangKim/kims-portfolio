/**
 * WIGTN FLAKE — Snowflake AI & Data Hackathon Korea 2026 Tech Track 준우승.
 *
 * Reading flow:
 *   User Purpose ─► GPT-4o Orchestrator ─► 5 Cortex 전문가 (20턴 debate)
 *                                            ↓ (자동 호출)
 *                                       Cortex Analyst × 4 datasets
 *                                       + ANOMALY_DETECTION (interrupt)
 *                                       + FORECAST / AI_CLASSIFY / AI_SENTIMENT
 *                                            ↓
 *                                       Top 3 + Forecast + Anomaly + Actions
 *
 *   "ANOMALY_DETECTION이 토론에 끼어들 권한"이 멀티에이전트 수렴의 핵심.
 */
export default function WigtnflakeArchitectureDiagram() {
  return (
    <svg
      role="img"
      aria-label="WIGTN FLAKE — GPT-4o 오케스트레이터 + 5 Cortex 전문가 토론 + 4 데이터셋 교차분석 흐름도"
      viewBox="0 0 1080 460"
      className="w-full h-auto min-w-[640px]"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="flake-accent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="flake-warn" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
        <linearGradient id="flake-nodebg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1220" />
          <stop offset="100%" stopColor="#040810" />
        </linearGradient>
        <marker id="flake-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#22d3ee" />
        </marker>
        <marker id="flake-arrow-warn" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
        </marker>
      </defs>

      <FTag x={140} y={36} text="USER" />
      <FTag x={460} y={36} text="DEBATE (20턴 합의)" />
      <FTag x={880} y={36} text="DATA / CORTEX" />

      {/* User input */}
      <FNode x={40} y={80} w={220} h={104} title="Purpose Card" subtitle="카페·렌탈·광고·투자·이상감지" tag="자유 입력도 지원" />

      <line x1={260} y1={132} x2={360} y2={132} stroke="#22d3ee" strokeWidth={1.6} markerEnd="url(#flake-arrow)" />

      {/* Orchestrator (PM) */}
      <FNode x={360} y={80} w={240} h={104} title="GPT-4o Orchestrator" subtitle="PM 진행자 · 발화권 회수" tag="목적별 전문가 동적 소환" />

      {/* 5 Specialists */}
      <FNode x={360} y={210} w={240} h={150} title="5 Cortex Specialists" subtitle="데이터·트렌드·예측·인사이트·감성" tag="20턴 cross-debate → 합의" />

      <line x1={480} y1={184} x2={480} y2={208} stroke="#22d3ee" strokeWidth={1.5} markerEnd="url(#flake-arrow)" />

      {/* Cortex tools (right) */}
      <FNode x={680} y={80} w={360} h={62} title="Cortex Analyst × 4 datasets" subtitle="부동산 · 유동인구 · 카드매출 · 통신" />
      <FNode x={680} y={156} w={360} h={62} title="ANOMALY_DETECTION ⚡" subtitle="토론에 interrupt 발화권 — 이상치 즉시 알림" warn />
      <FNode x={680} y={232} w={360} h={62} title="FORECAST · AI_CLASSIFY · AI_SENTIMENT" subtitle="6개월 예측 · 저평가/적정/고평가 · 뉴스 감성" />

      {/* Arrows specialists → tools */}
      <line x1={600} y1={250} x2={680} y2={111} stroke="#22d3ee" strokeWidth={1.2} markerEnd="url(#flake-arrow)" />
      <line x1={600} y1={270} x2={680} y2={187} stroke="#f59e0b" strokeWidth={1.4} markerEnd="url(#flake-arrow-warn)" />
      <line x1={600} y1={290} x2={680} y2={263} stroke="#22d3ee" strokeWidth={1.2} markerEnd="url(#flake-arrow)" />

      {/* Output bottom */}
      <FNode x={360} y={384} w={680} h={62} title="🏆 Top 3 동네 + 6개월 FORECAST + ⚠ Anomaly Badge + 🎯 Action Checklist" subtitle="목적 기반 리포트 (PM 진행자가 합의 도달 시 출력)" />
      <line x1={480} y1={360} x2={480} y2={384} stroke="#22d3ee" strokeWidth={1.5} markerEnd="url(#flake-arrow)" />
    </svg>
  )
}

function FTag({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <text x={x} y={y} fontSize="10" fontWeight="700" fill="rgba(34, 211, 238, 0.7)" letterSpacing="0.18em" fontFamily="ui-monospace,monospace" textAnchor="middle">
      {text}
    </text>
  )
}

function FNode({ x, y, w, h, title, subtitle, tag, warn }: { x: number; y: number; w: number; h: number; title: string; subtitle: string; tag?: string; warn?: boolean }) {
  const stroke = warn ? 'url(#flake-warn)' : 'url(#flake-accent)'
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill="url(#flake-nodebg)" stroke={stroke} strokeWidth={1.5} />
      <text x={x + 16} y={y + 24} fontSize="13" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">{title}</text>
      <text x={x + 16} y={y + 42} fontSize="10" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif,system-ui">{subtitle}</text>
      {tag && (
        <text x={x + 16} y={y + h - 10} fontSize="9" fill={warn ? 'rgba(251,191,36,0.85)' : 'rgba(165, 243, 252, 0.85)'} fontFamily="ui-monospace,monospace">{tag}</text>
      )}
    </g>
  )
}
