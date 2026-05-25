/**
 * Purple English — at-a-glance architecture for the career modal.
 *
 * Reading flow:
 *   React Web codebase ─► (1) UI/로직 분리 + Custom Hooks 추출 → 모듈화 정비
 *                         ─► (2) React Native 점진 마이그레이션 (컴포넌트 단위)
 *                         ─► (3) App Store / Google Play 양 스토어 출시
 *
 *   "마이그레이션 자체" 보다 "마이그레이션 직전의 준비" (모듈화·Custom Hook)에
 *   가장 큰 무게를 둔 설계라는 점을 시각적으로 강조한다.
 */
export default function PurpleArchitectureDiagram() {
  return (
    <svg
      role="img"
      aria-label="Purple English — React Web → 모듈화 정비 → React Native 마이그레이션 흐름도"
      viewBox="0 0 1080 380"
      className="w-full h-auto min-w-[640px]"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="purple-accent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
        <linearGradient id="purple-nodebg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a0f1f" />
          <stop offset="100%" stopColor="#0a0510" />
        </linearGradient>
        <marker id="purple-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#f472b6" />
        </marker>
      </defs>

      {/* Phase tags */}
      <PhaseTag x={120} y={36} text="1. 기존 자산" />
      <PhaseTag x={510} y={36} text="2. 준비 (핵심 결정)" />
      <PhaseTag x={870} y={36} text="3. 출시" />

      {/* Node 1: React Web */}
      <PNode
        x={40} y={88} w={240} h={140}
        title="React Web"
        subtitle="기존 학습 콘텐츠 5,000+"
        tag="UI · 로직 혼재"
      />

      {/* Arrow 1 → 2 */}
      <line x1={280} y1={158} x2={420} y2={158} stroke="#f472b6" strokeWidth={1.6} markerEnd="url(#purple-arrow)" />
      <text x={290} y={148} fontSize="10.5" fill="#fbcfe8" fontFamily="ui-monospace,monospace">코드베이스 정비</text>

      {/* Node 2a: 모듈화 (위) */}
      <PNode
        x={420} y={88} w={240} h={68}
        title="UI / 로직 분리"
        subtitle="Custom Hook으로 비즈니스 로직 추출"
      />
      {/* Node 2b: Custom Hook (아래) */}
      <PNode
        x={420} y={170} w={240} h={68}
        title="공유 로직 레이어"
        subtitle="Web / RN 양쪽이 동일 Hook 사용"
      />

      {/* Arrow 2 → 3 */}
      <line x1={660} y1={158} x2={800} y2={158} stroke="#f472b6" strokeWidth={1.6} markerEnd="url(#purple-arrow)" />
      <text x={730} y={140} textAnchor="middle" fontSize="10.5" fill="#fbcfe8" fontFamily="ui-monospace,monospace">컴포넌트 단위</text>
      <text x={730} y={152} textAnchor="middle" fontSize="10.5" fill="#fbcfe8" fontFamily="ui-monospace,monospace">마이그레이션</text>

      {/* Node 3: React Native */}
      <PNode
        x={800} y={88} w={240} h={140}
        title="React Native App"
        subtitle="App Store · Google Play"
        tag="GSAP + SVG Path 인터랙티브"
      />

      {/* 하단 강조 텍스트 */}
      <g>
        <rect x={40} y={290} width={1000} height={64} rx={10} fill="rgba(168, 85, 247, 0.08)" stroke="url(#purple-accent)" strokeWidth={1.2} strokeDasharray="6 4" />
        <text x={60} y={318} fontSize="12.5" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
          ★ 핵심 결정: 마이그레이션 자체보다 직전의 모듈화·Custom Hook 정비에 무게
        </text>
        <text x={60} y={338} fontSize="11" fill="rgba(255,255,255,0.65)" fontFamily="ui-sans-serif,system-ui">
          RN 경험 없는 1년차가 학습 곡선을 낮춘 방법 — 코드 구조를 먼저 정비하니 마이그레이션 단위가 컴포넌트로 자연스럽게 잘렸다.
        </text>
      </g>
    </svg>
  )
}

function PhaseTag({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <text
      x={x}
      y={y}
      fontSize="10"
      fontWeight="700"
      fill="rgba(244, 114, 182, 0.7)"
      letterSpacing="0.18em"
      fontFamily="ui-monospace,monospace"
      textAnchor="middle"
    >
      {text}
    </text>
  )
}

function PNode({
  x, y, w, h, title, subtitle, tag,
}: {
  x: number; y: number; w: number; h: number
  title: string; subtitle: string; tag?: string
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill="url(#purple-nodebg)" stroke="url(#purple-accent)" strokeWidth={1.5} />
      <text x={x + 16} y={y + 28} fontSize="14" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
        {title}
      </text>
      <text x={x + 16} y={y + 48} fontSize="10.5" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif,system-ui">
        {subtitle}
      </text>
      {tag && (
        <text x={x + 16} y={y + h - 14} fontSize="9.5" fill="rgba(251,207,232,0.85)" fontFamily="ui-monospace,monospace">
          {tag}
        </text>
      )}
    </g>
  )
}
