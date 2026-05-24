/**
 * AIGOSEO (조선왕조실록 디지털화 R&D) — at-a-glance architecture for the career modal.
 *
 * Reading flow:
 *   발주처 ─► (1) 사진 + 좌표 사양 전달
 *           ─► (2) Canvas API (getImageData / putImageData) 픽셀 단위 분할
 *           ─► (3) Spring Boot + JPA 백엔드 저장 → 정부 R&D 산출물 납품
 *
 *   "LLM·Vision API 부재 시기에 좌표 기반 클라이언트 즉시 렌더링을 선택한"
 *   결정의 라운드트립(발주처 ↔ Canvas 검수) 흐름을 시각적으로 강조한다.
 */
export default function AigoseoArchitectureDiagram() {
  return (
    <svg
      role="img"
      aria-label="AIGOSEO — Canvas API 픽셀 단위 분할 + Spring Boot 백엔드 + 발주처 좌표 검수 라운드트립 흐름도"
      viewBox="0 0 1080 380"
      className="w-full h-auto min-w-[640px]"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="aigoseo-accent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="aigoseo-nodebg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1108" />
          <stop offset="100%" stopColor="#0a0604" />
        </linearGradient>
        <marker id="aigoseo-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
        </marker>
        <marker id="aigoseo-arrow-dim" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(245,158,11,0.55)" />
        </marker>
      </defs>

      {/* Tier labels (top) */}
      <Tag x={130} y={36} text="발주처 (검수 라운드트립)" />
      <Tag x={540} y={36} text="클라이언트 (Canvas API)" />
      <Tag x={870} y={36} text="백엔드 + 납품" />

      {/* Node 1: Client (발주처) */}
      <ANode
        x={40} y={88} w={220} h={148}
        title="발주처"
        subtitle="고문헌 사진 + 좌표 사양"
        tag="좌표 확인·수정 워크플로우"
      />

      {/* Arrow 1 → 2 (forward) */}
      <line x1={260} y1={140} x2={420} y2={140} stroke="#f59e0b" strokeWidth={1.6} markerEnd="url(#aigoseo-arrow)" />
      <text x={275} y={130} fontSize="10.5" fill="#fde68a" fontFamily="ui-monospace,monospace">좌표 사양 전달</text>

      {/* Arrow 2 ← 1 (검수 round-trip, dashed) */}
      <line x1={420} y1={180} x2={260} y2={180} stroke="rgba(245,158,11,0.6)" strokeWidth={1.4} strokeDasharray="6 4" markerEnd="url(#aigoseo-arrow-dim)" />
      <text x={275} y={196} fontSize="10" fill="rgba(253,230,138,0.7)" fontFamily="ui-monospace,monospace">분할 결과 즉시 검수</text>

      {/* Node 2: Canvas API (클라이언트) */}
      <ANode
        x={420} y={88} w={240} h={148}
        title="Canvas API"
        subtitle="getImageData / putImageData"
        tag="픽셀 좌표 기반 분할 (즉시 렌더)"
      />

      {/* Arrow 2 → 3 */}
      <line x1={660} y1={162} x2={800} y2={162} stroke="#f59e0b" strokeWidth={1.6} markerEnd="url(#aigoseo-arrow)" />
      <text x={678} y={152} fontSize="10.5" fill="#fde68a" fontFamily="ui-monospace,monospace">분할 결과 저장</text>

      {/* Node 3: Spring Boot + JPA */}
      <ANode
        x={800} y={88} w={240} h={148}
        title="Spring Boot + JPA"
        subtitle="고문헌 디지털화 파이프라인"
        tag="정부 R&D 산출물 납품"
      />

      {/* 하단 강조 */}
      <g>
        <rect x={40} y={298} width={1000} height={56} rx={10} fill="rgba(251, 146, 60, 0.08)" stroke="url(#aigoseo-accent)" strokeWidth={1.2} strokeDasharray="6 4" />
        <text x={60} y={324} fontSize="12.5" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
          ★ 핵심 결정: LLM·Vision API 부재 시기에 발주처 좌표 사양을 그대로 받는 클라이언트 즉시 렌더링
        </text>
        <text x={60} y={344} fontSize="11" fill="rgba(255,255,255,0.65)" fontFamily="ui-sans-serif,system-ui">
          발주처가 좌표를 수정하면 즉시 분할 결과를 검수할 수 있어, 사양 협의 라운드트립을 클라이언트 단에서 완결.
        </text>
      </g>
    </svg>
  )
}

function Tag({ x, y, text }: { x: number; y: number; text: string }) {
  return (
    <text x={x} y={y} fontSize="10" fontWeight="700" fill="rgba(245, 158, 11, 0.7)" letterSpacing="0.18em" fontFamily="ui-monospace,monospace" textAnchor="middle">
      {text}
    </text>
  )
}

function ANode({ x, y, w, h, title, subtitle, tag }: { x: number; y: number; w: number; h: number; title: string; subtitle: string; tag?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} fill="url(#aigoseo-nodebg)" stroke="url(#aigoseo-accent)" strokeWidth={1.5} />
      <text x={x + 16} y={y + 28} fontSize="14" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">{title}</text>
      <text x={x + 16} y={y + 48} fontSize="10.5" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif,system-ui">{subtitle}</text>
      {tag && (
        <text x={x + 16} y={y + h - 14} fontSize="9.5" fill="rgba(253,230,138,0.85)" fontFamily="ui-monospace,monospace">{tag}</text>
      )}
    </g>
  )
}
