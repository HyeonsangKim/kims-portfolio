/**
 * WIGENT (wigtn-bot) — Google Cloud Rapid Agent Hackathon 2026 GitLab Track 출품작.
 *
 * Reading flow:
 *   GitLab Webhook   ─► Reactive Lane (4 페르소나 ParallelAgent)
 *   Cloud Scheduler  ─► Proactive Lane (cron sweep · dedupe)
 *   Issue / /agent-fix ─► Auto-Fix Lane (변경 계획 → MR + 셀프 리뷰)
 *
 *   3 lane이 독립적으로 동작하면서도 PersonaPanel과 신뢰 게이트(dry-run →
 *   comment-only → full)를 공유한다는 점이 시각의 핵심.
 */
export default function WigentArchitectureDiagram() {
  return (
    <svg
      role="img"
      aria-label="WIGENT — 3 lane 자율 사이클 (Reactive · Proactive · Auto-Fix) + 4 페르소나 ParallelAgent 흐름도"
      viewBox="0 0 1080 460"
      className="w-full h-auto min-w-[640px]"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="wigent-accent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>
        <linearGradient id="wigent-warn" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
        <linearGradient id="wigent-nodebg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#170f1f" />
          <stop offset="100%" stopColor="#0a0510" />
        </linearGradient>
        <marker id="wigent-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#d946ef" />
        </marker>
        <marker id="wigent-arrow-warn" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
        </marker>
      </defs>

      <ETag x={130} y={36} text="TRIGGER" />
      <ETag x={540} y={36} text="LANE (자율 사이클)" />
      <ETag x={900} y={36} text="ACTION" />

      {/* Trigger column */}
      <ENode x={40} y={80} w={220} h={70} title="GitLab Webhook" subtitle="MR opened / updated" />
      <ENode x={40} y={186} w={220} h={70} title="Cloud Scheduler" subtitle="매시간 cron sweep" />
      <ENode x={40} y={292} w={220} h={70} title="/agent-fix or Issue" subtitle="명시 명령 · Proactive 발급" />

      {/* Arrows to Lane */}
      <line x1={260} y1={115} x2={420} y2={115} stroke="#d946ef" strokeWidth={1.5} markerEnd="url(#wigent-arrow)" />
      <line x1={260} y1={221} x2={420} y2={221} stroke="#d946ef" strokeWidth={1.5} markerEnd="url(#wigent-arrow)" />
      <line x1={260} y1={327} x2={420} y2={327} stroke="#f59e0b" strokeWidth={1.5} markerEnd="url(#wigent-arrow-warn)" />

      {/* Lane column */}
      <ENode x={420} y={80} w={300} h={70} title="🔍 Reactive Lane" subtitle="PersonaPanel · risk score 0~100" tag="4 페르소나 ParallelAgent" />
      <ENode x={420} y={186} w={300} h={70} title="🛡️ Proactive Lane" subtitle="머지 코드 sweep · dedupe(0.85)" tag="중복 이슈 차단 + 우선순위" />
      <ENode x={420} y={292} w={300} h={70} title="🤖 Auto-Fix Lane" subtitle="변경 계획 → 5분 대기 → 브랜치+MR" tag="Prompt Injection 5계층 방어" warn />

      {/* Arrows Lane → Action */}
      <line x1={720} y1={115} x2={860} y2={115} stroke="#d946ef" strokeWidth={1.5} markerEnd="url(#wigent-arrow)" />
      <line x1={720} y1={221} x2={860} y2={221} stroke="#d946ef" strokeWidth={1.5} markerEnd="url(#wigent-arrow)" />
      <line x1={720} y1={327} x2={860} y2={327} stroke="#f59e0b" strokeWidth={1.5} markerEnd="url(#wigent-arrow-warn)" />

      {/* Action column */}
      <ENode x={860} y={80} w={180} h={70} title="인라인 코멘트" subtitle="MR 인라인 + score" />
      <ENode x={860} y={186} w={180} h={70} title="Issue 발급" subtitle="GitLab Issue" />
      <ENode x={860} y={292} w={180} h={70} title="MR + 셀프 리뷰" subtitle="SelfMergeViolation 가드" warn />

      {/* 하단 강조 */}
      <g>
        <rect x={40} y={394} width={1000} height={56} rx={10} fill="rgba(139, 92, 246, 0.08)" stroke="url(#wigent-accent)" strokeWidth={1.2} strokeDasharray="6 4" />
        <text x={60} y={420} fontSize="12.5" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
          ★ 핵심 결정: 신뢰는 점진 — dry-run → comment-only → full 3단계 권한 모드
        </text>
        <text x={60} y={440} fontSize="10.5" fill="rgba(255,255,255,0.65)" fontFamily="ui-sans-serif,system-ui">
          봇이 자기 MR을 머지하려 하면 SelfMergeViolation으로 차단 — 자율 시스템의 안전성은 "자기 자신 통과 경로"를 막는 데서 시작.
        </text>
      </g>
    </svg>
  )
}

function ETag({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <text x={x} y={y} fontSize="10" fontWeight="700" fill="rgba(217, 70, 239, 0.7)" letterSpacing="0.18em" fontFamily="ui-monospace,monospace" textAnchor="middle">
      {text}
    </text>
  )
}

function ENode({ x, y, w, h, title, subtitle, tag, warn }: { x: number; y: number; w: number; h: number; title: string; subtitle: string; tag?: string; warn?: boolean }) {
  const stroke = warn ? 'url(#wigent-warn)' : 'url(#wigent-accent)'
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill="url(#wigent-nodebg)" stroke={stroke} strokeWidth={1.5} />
      <text x={x + 16} y={y + 24} fontSize="13" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">{title}</text>
      <text x={x + 16} y={y + 42} fontSize="10" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif,system-ui">{subtitle}</text>
      {tag && (
        <text x={x + 16} y={y + h - 10} fontSize="9" fill={warn ? 'rgba(251,191,36,0.85)' : 'rgba(244, 114, 182, 0.85)'} fontFamily="ui-monospace,monospace">{tag}</text>
      )}
    </g>
  )
}
