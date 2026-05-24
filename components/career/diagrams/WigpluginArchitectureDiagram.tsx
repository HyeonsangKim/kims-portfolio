/**
 * WigPlugin (WIGTN-Coding) — Claude Code 플러그인 / 12 agents / 3 commands.
 *
 * Reading flow:
 *   /prd        ─► PRD + Plan (+ 4-agent quality gate)
 *   /implement  ─► Design 3-agent parallel → 4 teams (Backend/Frontend/AI/Ops)
 *   /auto-commit ─► 3-agent review (Read · Perf · BP+Security) + score gate
 *
 *   "팀 분배"와 "score gate"가 단일 명령 안에 들어있다는 점,
 *   Security Critical은 점수 무관 차단된다는 점이 시각의 핵심.
 */
export default function WigpluginArchitectureDiagram() {
  return (
    <svg
      role="img"
      aria-label="WigPlugin — /prd → /implement → /auto-commit 파이프라인 + 팀 병렬 분배 + score gate 흐름도"
      viewBox="0 0 1080 460"
      className="w-full h-auto min-w-[640px]"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="wp-accent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
        <linearGradient id="wp-warn" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="wp-nodebg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1612" />
          <stop offset="100%" stopColor="#040a08" />
        </linearGradient>
        <marker id="wp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#14b8a6" />
        </marker>
        <marker id="wp-arrow-warn" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
        </marker>
      </defs>

      <WPTag x={170} y={36} text="/prd" />
      <WPTag x={540} y={36} text="/implement" />
      <WPTag x={900} y={36} text="/auto-commit" />

      {/* /prd column */}
      <WPNode x={40} y={80} w={260} h={84} title="PRD.md + Phased Plan" subtitle="아이디어 → 구조화된 PRD" />
      <WPNode x={40} y={188} w={260} h={84} title="4-agent quality gate" subtitle="Completeness · Feasibility · Security · Consistency" tag="병렬 분석 → critical 차단" />

      {/* Arrows /prd → /implement */}
      <line x1={300} y1={122} x2={420} y2={122} stroke="#14b8a6" strokeWidth={1.6} markerEnd="url(#wp-arrow)" />
      <line x1={300} y1={230} x2={420} y2={230} stroke="#14b8a6" strokeWidth={1.6} markerEnd="url(#wp-arrow)" />

      {/* /implement column */}
      <WPNode x={420} y={80} w={300} h={84} title="DESIGN (3 agents)" subtitle="PRD 검증 · 아키텍처 결정 · gap 분석" tag="병렬" />
      <WPNode x={420} y={188} w={300} h={170} title="BUILD (team parallel)" subtitle="🎨 Backend · 💻 Frontend · 🤖 AI Server · ⚙️ Ops" tag="4팀이 동시에 자기 영역만 작성" />

      {/* Arrow build → auto-commit */}
      <line x1={720} y1={272} x2={830} y2={272} stroke="#14b8a6" strokeWidth={1.6} markerEnd="url(#wp-arrow)" />

      {/* /auto-commit column */}
      <WPNode x={830} y={80} w={210} h={84} title="3-agent review" subtitle="Read+Maint · Perf+Test · BP+Security" tag="병렬 점수화" />

      {/* Score gate */}
      <g>
        <rect x={830} y={188} width={210} height={170} rx={12} fill="rgba(20,184,166,0.06)" stroke="url(#wp-accent)" strokeWidth={1.5} />
        <text x={935} y={216} textAnchor="middle" fontSize="13" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">Score Gate</text>
        <text x={850} y={246} fontSize="11" fill="#86efac" fontFamily="ui-monospace,monospace">≥ 80   →  ✅ auto commit</text>
        <text x={850} y={266} fontSize="11" fill="#fbbf24" fontFamily="ui-monospace,monospace">60~79  →  🔧 자동 개선 1회</text>
        <text x={850} y={286} fontSize="11" fill="#fca5a5" fontFamily="ui-monospace,monospace">&lt; 60   →  ⛔ 차단 (수동)</text>
        <line x1={840} y1={300} x2={1030} y2={300} stroke="rgba(244, 63, 94, 0.6)" strokeWidth={1.4} strokeDasharray="4 3" />
        <text x={850} y={322} fontSize="10" fontWeight="700" fill="#fda4af" fontFamily="ui-monospace,monospace">Security Critical →</text>
        <text x={850} y={340} fontSize="10" fontWeight="700" fill="#fda4af" fontFamily="ui-monospace,monospace">점수 무관 강제 FAIL</text>
      </g>

      {/* 하단 강조 */}
      <g>
        <rect x={40} y={394} width={1000} height={56} rx={10} fill="rgba(20, 184, 166, 0.06)" stroke="url(#wp-accent)" strokeWidth={1.2} strokeDasharray="6 4" />
        <text x={60} y={420} fontSize="12.5" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
          ★ 풀 파이프라인 ~6분 (순차 ~20분 대비 압축) · 오픈소스 공개 — 다른 개발자도 동일 흐름 위에서 작업
        </text>
        <text x={60} y={440} fontSize="10.5" fill="rgba(255,255,255,0.65)" fontFamily="ui-sans-serif,system-ui">
          모델 선택보다 "사람이 매번 사이를 잇지 않아도 시스템이 끝까지 도는 구조"가 본질적인 운영 결정이라는 가설의 실증.
        </text>
      </g>
    </svg>
  )
}

function WPTag({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <text x={x} y={y} fontSize="11" fontWeight="700" fill="rgba(20, 184, 166, 0.8)" letterSpacing="0.18em" fontFamily="ui-monospace,monospace" textAnchor="middle">
      {text}
    </text>
  )
}

function WPNode({ x, y, w, h, title, subtitle, tag }: { x: number; y: number; w: number; h: number; title: string; subtitle: string; tag?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill="url(#wp-nodebg)" stroke="url(#wp-accent)" strokeWidth={1.5} />
      <text x={x + 16} y={y + 24} fontSize="13" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">{title}</text>
      <text x={x + 16} y={y + 42} fontSize="10" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif,system-ui">{subtitle}</text>
      {tag && (
        <text x={x + 16} y={y + h - 10} fontSize="9" fill="rgba(167, 243, 208, 0.85)" fontFamily="ui-monospace,monospace">{tag}</text>
      )}
    </g>
  )
}
