/**
 * 모하니 자녀 단말 제어 — at-a-glance architecture for the career modal.
 *
 * Reading flow:
 *   모하니 부모앱 ─ 푸시 ─→ 모하니 서버 ─ 푸시 ─→ 자녀 단말 (모하니 자녀앱)
 *
 *   자녀앱 안에서 다층 트리거 레이어가 서로 다른 우회 경로를 각자 막는다
 *   (단일 트리거만으로는 화면 없는 백그라운드 음악 앱 같은 사각지대가 남는다).
 *   네이티브 PIN 게이트는 RN JS 스레드를 거치지 않고 서버를 직접 호출해
 *   JS가 죽은 상황에서도 잠금을 우회할 수 없게 한다.
 */
export default function MohaniArchitectureDiagram() {
  return (
    <svg
      role="img"
      aria-label="모하니 — 외부 MDM SDK + AccessibilityService 다층 차단 + Native PIN gateway 흐름도"
      viewBox="0 0 1080 600"
      className="w-full h-auto min-w-[640px]"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="mohani-accent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
        <linearGradient id="mohani-warn" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
        <linearGradient id="mohani-nodebg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a0f1f" />
          <stop offset="100%" stopColor="#0a0510" />
        </linearGradient>

        <marker id="mohani-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#f472b6" />
        </marker>
        <marker id="mohani-arrow-warn" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
        </marker>
        <marker id="mohani-arrow-white" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(255,255,255,0.55)" />
        </marker>
      </defs>

      {/* Tier labels (top) */}
      <Tag x={60} y={32} text="PARENT" />
      <Tag x={420} y={32} text="SERVER" />
      <Tag x={760} y={32} text="CHILD DEVICE (OS-LEVEL MDM)" />

      {/* ─── PARENT TIER ─── */}
      <Node
        x={40}
        y={80}
        w={220}
        h={96}
        title="모하니 부모앱"
        subtitle="React Native"
        tag="정책 설정 · 자녀 상태 조회"
      />

      {/* Parent → Server */}
      <line x1={260} y1={128} x2={400} y2={128} stroke="#f472b6" strokeWidth={1.6} markerEnd="url(#mohani-arrow)" />
      <text x={290} y={119} fontSize="10.5" fill="#fbcfe8" fontFamily="ui-monospace,monospace">설정 변경 · 푸시 명령</text>

      {/* ─── SERVER TIER ─── */}
      <Node
        x={400}
        y={80}
        w={220}
        h={96}
        title="모하니 서버"
        subtitle="Spring Boot"
        tag="정책 저장 · 자녀 단말로 푸시"
      />

      {/* Server → Child (push) */}
      <line x1={620} y1={128} x2={760} y2={128} stroke="#f472b6" strokeWidth={1.6} markerEnd="url(#mohani-arrow)" />
      <text x={648} y={119} fontSize="10.5" fill="#fbcfe8" fontFamily="ui-monospace,monospace">차단 푸시 명령</text>

      {/* Native PIN gate side-channel (child → server direct HTTP) */}
      <path
        d="M 760 480 Q 690 440 620 154"
        fill="none"
        stroke="#f59e0b"
        strokeWidth={1.6}
        strokeDasharray="6 4"
        markerEnd="url(#mohani-arrow-warn)"
      />
      <text x={520} y={420} fontSize="10.5" fill="#fbbf24" fontFamily="ui-monospace,monospace">
        PIN 검증 · Native 직접 HTTP
      </text>
      <text x={520} y={436} fontSize="9.5" fill="rgba(251,191,36,0.7)" fontFamily="ui-monospace,monospace">
        (RN JS 미경유 — 우회 차단)
      </text>

      {/* ─── CHILD DEVICE: 모하니 자녀앱 (RN + Native) ─── */}
      <g>
        <rect x={760} y={80} width={300} height={420} rx={14} fill="rgba(245,158,11,0.04)" stroke="url(#mohani-accent)" strokeWidth={1.5} />
        <text x={910} y={108} textAnchor="middle" fontSize="14" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
          모하니 자녀앱
        </text>
        <text x={910} y={126} textAnchor="middle" fontSize="10.5" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif,system-ui">
          RN + Native · OS-level MDM 라이선스 단말
        </text>

        {/* 5중 트리거 */}
        <g>
          <text x={776} y={156} fontSize="10.5" fontWeight="700" fill="#a855f7" letterSpacing="0.1em" fontFamily="ui-monospace,monospace">
            다층 차단 트리거 (5중망)
          </text>
        </g>

        <TriggerRow x={776} y={172} index="1" label="앱 전환 감지" sub="포그라운드 윈도우 변경 즉시" />
        <TriggerRow x={776} y={208} index="2" label="시간 초과 검사" sub="주기 폴링 + 슬립타임 사전 경고" />
        <TriggerRow x={776} y={244} index="3" label="백그라운드 앱 감지" sub="PIP·음악·녹음 (포그라운드 서비스 카운트)" highlight />
        <TriggerRow x={776} y={280} index="4" label="정책 변경 즉시 반영" sub="부모가 설정 바꾸면 자녀 단에서 재검사" />
        <TriggerRow x={776} y={316} index="5" label="원격 차단 명령" sub="푸시 단발 명령" />

        {/* MDM + Accessibility 이중망 */}
        <rect x={776} y={362} width={268} height={56} rx={10} fill="rgba(168,85,247,0.08)" stroke="rgba(168,85,247,0.4)" strokeWidth={1} />
        <text x={786} y={380} fontSize="11" fontWeight="700" fill="#a855f7" fontFamily="ui-monospace,monospace">
          이중망 실행 layer
        </text>
        <text x={786} y={398} fontSize="11" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
          외부 MDM SDK (OS 레벨)
        </text>
        <text x={786} y={412} fontSize="10.5" fill="rgba(255,255,255,0.6)" fontFamily="ui-sans-serif,system-ui">
          + AccessibilityService (시스템 레벨 강제 종료)
        </text>

        {/* Native PIN gate */}
        <rect x={776} y={432} width={268} height={56} rx={10} fill="rgba(245,158,11,0.08)" stroke="rgba(245,158,11,0.4)" strokeWidth={1} />
        <text x={786} y={450} fontSize="11" fontWeight="700" fill="#f59e0b" fontFamily="ui-monospace,monospace">
          Native PIN Gateway
        </text>
        <text x={786} y={468} fontSize="11" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
          접근성 / 기기관리자 / VPN 설정 차단
        </text>
        <text x={786} y={482} fontSize="10.5" fill="rgba(251,191,36,0.8)" fontFamily="ui-sans-serif,system-ui">
          → 통과 시 10분 grace
        </text>
      </g>

      {/* ANR 진단 callout */}
      <g>
        <rect x={40} y={220} width={580} height={170} rx={12} fill="rgba(15,23,42,0.6)" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
        <text x={56} y={246} fontSize="11" fontWeight="700" fill="rgba(255,255,255,0.5)" letterSpacing="0.18em" fontFamily="ui-monospace,monospace">
          ANR 진단 흐름 (운영 중 발견)
        </text>
        <text x={56} y={272} fontSize="12" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
          ① 사용자: &quot;차단이 안 된다&quot; 컴플레인
        </text>
        <text x={56} y={294} fontSize="12" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
          ② Logcat 따라가니 백그라운드 서비스가 죽은 게 아니라 main thread 잡힘
        </text>
        <text x={56} y={316} fontSize="12" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
          ③ 결정적 단서: 외부 MDM SDK 통합 이후부터 발생 (시간 흐름)
        </text>
        <text x={56} y={338} fontSize="12" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
          ④ SDK 호출을 비동기 실행자로 직렬화 + 큐 적체 방지
        </text>
        <text x={56} y={360} fontSize="12" fontWeight="700" fill="#22d3ee" fontFamily="ui-sans-serif,system-ui">
          ⑤ ANR 제거 + 차단 안정 동작 회복
        </text>
        <text x={56} y={378} fontSize="9.5" fill="rgba(255,255,255,0.4)" fontFamily="ui-monospace,monospace">
          큐 한도 초과 시 호출 스레드에서 직접 실행 (backlog 폭증 방지)
        </text>
      </g>

      {/* Legend bottom */}
      <g transform="translate(40, 532)">
        <rect width={1000} height={50} rx={8} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
        <line x1={16} y1={18} x2={40} y2={18} stroke="#f472b6" strokeWidth={1.6} markerEnd="url(#mohani-arrow)" />
        <text x={48} y={21} fontSize="10.5" fill="rgba(255,255,255,0.78)" fontFamily="ui-sans-serif,system-ui">
          정상 명령 — 부모 설정 / 푸시 차단 명령
        </text>
        <line x1={16} y1={38} x2={40} y2={38} stroke="#f59e0b" strokeWidth={1.6} strokeDasharray="5 3" markerEnd="url(#mohani-arrow-warn)" />
        <text x={48} y={41} fontSize="10.5" fill="rgba(255,255,255,0.78)" fontFamily="ui-sans-serif,system-ui">
          보안 경로 — Native에서 서버 직접 호출 (PIN 검증)
        </text>
        <text x={520} y={21} fontSize="10.5" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif,system-ui">
          ★ 다층 트리거 — 단일 트리거로는 우회되는 도메인
        </text>
        <text x={520} y={41} fontSize="10.5" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif,system-ui">
          ★ MDM SDK + Accessibility 이중 실행망
        </text>
      </g>
    </svg>
  )
}

/* ────────────── helpers ────────────── */

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

function Node({
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
      <rect x={x} y={y} width={w} height={h} rx={12} fill="url(#mohani-nodebg)" stroke="rgba(255,255,255,0.18)" strokeWidth={1} />
      <text x={x + 16} y={y + 26} fontSize="14" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
        {title}
      </text>
      <text x={x + 16} y={y + 44} fontSize="10.5" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif,system-ui">
        {subtitle}
      </text>
      {tag && (
        <text x={x + 16} y={y + h - 14} fontSize="10" fill="rgba(244,114,182,0.8)" fontFamily="ui-monospace,monospace">
          {tag}
        </text>
      )}
    </g>
  )
}

function TriggerRow({
  x,
  y,
  index,
  label,
  sub,
  highlight = false,
}: {
  x: number
  y: number
  index: string
  label: string
  sub: string
  highlight?: boolean
}) {
  return (
    <g>
      <circle cx={x + 10} cy={y + 13} r={9} fill={highlight ? '#f59e0b' : 'rgba(168,85,247,0.7)'} />
      <text
        x={x + 10}
        y={y + 17}
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="#fff"
        fontFamily="ui-monospace,monospace"
      >
        {index}
      </text>
      <text x={x + 28} y={y + 12} fontSize="11.5" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
        {label}
      </text>
      <text x={x + 28} y={y + 26} fontSize="10" fill="rgba(255,255,255,0.6)" fontFamily="ui-sans-serif,system-ui">
        {sub}
      </text>
    </g>
  )
}
