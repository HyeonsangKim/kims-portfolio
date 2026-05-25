/**
 * KOCCA 한국어 평가 플랫폼 — at-a-glance architecture for the career modal.
 *
 * Two parallel reading axes:
 *   1) Auth + RBAC — middleware filters every non-API request, API routes
 *      re-verify via `getCurrentUser()`. Server Action handles side-effects,
 *      Route Handler handles data reads.
 *   2) Voice pipeline — Browser captures the STT-required PCM format via a
 *      hand-written encoder, then drives a polling pattern against the
 *      external Korean STT.
 *
 *   School-level tenancy is enforced both at the query level and at the
 *   middleware level (token school ↔ route school must match).
 */
export default function KoccaArchitectureDiagram() {
  return (
    <svg
      role="img"
      aria-label="KOCCA — 4역할 RBAC + 자체 WAV 인코더 + STT 폴링 + 학교별 멀티테넌트 흐름도"
      viewBox="0 0 1080 640"
      className="w-full h-auto min-w-[640px]"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="kocca-accent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="kocca-voice" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="kocca-nodebg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1208" />
          <stop offset="100%" stopColor="#0a0604" />
        </linearGradient>

        <marker id="kocca-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#f59e0b" />
        </marker>
        <marker id="kocca-arrow-voice" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#22d3ee" />
        </marker>
      </defs>

      {/* ============================================
          상단: 4 역할 RBAC + 미들웨어 + Next.js 분기
         ============================================ */}
      <Tag x={40} y={32} text="USERS (4 ROLES)" />
      <Tag x={420} y={32} text="NEXT.JS · RBAC" />
      <Tag x={780} y={32} text="DATA / STT" />

      {/* 4 roles */}
      <RoleCard x={40} y={60} role="STUDENT" desc="응시" color="#22d3ee" />
      <RoleCard x={40} y={108} role="TEACHER (MAIN)" desc="채점" color="#a855f7" />
      <RoleCard x={40} y={156} role="TEACHER (SUB)" desc="채점 (보조)" color="#f472b6" />
      <RoleCard x={40} y={204} role="TEACHER ADMIN" desc="회차 관리" color="#fb923c" />

      {/* roles → middleware */}
      <line x1={250} y1={84} x2={400} y2={140} stroke="rgba(255,255,255,0.3)" strokeWidth={1.2} />
      <line x1={250} y1={132} x2={400} y2={150} stroke="rgba(255,255,255,0.3)" strokeWidth={1.2} />
      <line x1={250} y1={180} x2={400} y2={160} stroke="rgba(255,255,255,0.3)" strokeWidth={1.2} />
      <line x1={250} y1={228} x2={400} y2={170} stroke="rgba(255,255,255,0.3)" strokeWidth={1.2} />

      {/* Middleware box */}
      <g>
        <rect x={400} y={100} width={340} height={156} rx={12} fill="url(#kocca-nodebg)" stroke="url(#kocca-accent)" strokeWidth={1.5} />
        <text x={570} y={124} textAnchor="middle" fontSize="13" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
          Next.js Middleware · RBAC
        </text>
        <text x={570} y={142} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif,system-ui">
          모든 non-API 요청 첫 단계 검사 + 역할별 자동 리다이렉트
        </text>

        {/* Server Action vs Route Handler split */}
        <rect x={416} y={158} width={148} height={84} rx={8} fill="rgba(251,146,60,0.08)" stroke="rgba(251,146,60,0.35)" />
        <text x={490} y={178} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fb923c" fontFamily="ui-monospace,monospace">
          Server Action
        </text>
        <text x={490} y={196} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.7)" fontFamily="ui-sans-serif,system-ui">
          부수효과 (인증)
        </text>
        <text x={490} y={213} textAnchor="middle" fontSize="9.5" fill="rgba(255,255,255,0.5)" fontFamily="ui-sans-serif,system-ui">
          loginAction · signupAction
        </text>
        <text x={490} y={230} textAnchor="middle" fontSize="9.5" fill="rgba(255,255,255,0.5)" fontFamily="ui-sans-serif,system-ui">
          JWT 발급
        </text>

        <rect x={576} y={158} width={148} height={84} rx={8} fill="rgba(34,211,238,0.08)" stroke="rgba(34,211,238,0.35)" />
        <text x={650} y={178} textAnchor="middle" fontSize="11" fontWeight="700" fill="#22d3ee" fontFamily="ui-monospace,monospace">
          Route Handler
        </text>
        <text x={650} y={196} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.7)" fontFamily="ui-sans-serif,system-ui">
          단순 데이터 조회
        </text>
        <text x={650} y={213} textAnchor="middle" fontSize="9.5" fill="rgba(255,255,255,0.5)" fontFamily="ui-sans-serif,system-ui">
          미들웨어 우회 + 자체 검증
        </text>
        <text x={650} y={230} textAnchor="middle" fontSize="9.5" fill="rgba(255,255,255,0.5)" fontFamily="ui-sans-serif,system-ui">
          getCurrentUser() 재검증
        </text>
      </g>

      {/* Middleware → DB */}
      <line x1={740} y1={178} x2={800} y2={178} stroke="#f59e0b" strokeWidth={1.6} markerEnd="url(#kocca-arrow)" />

      {/* Tenant DB box (right) */}
      <g>
        <rect x={800} y={100} width={250} height={156} rx={12} fill="url(#kocca-nodebg)" stroke="rgba(255,255,255,0.18)" strokeWidth={1} />
        <text x={925} y={124} textAnchor="middle" fontSize="13" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
          MySQL + Prisma
        </text>
        <text x={925} y={142} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif,system-ui">
          학교별 멀티테넌트
        </text>

        <text x={816} y={172} fontSize="10.5" fill="#fafafa" fontFamily="ui-monospace,monospace">
          모든 응시·채점 쿼리에
        </text>
        <text x={816} y={188} fontSize="10.5" fill="#fafafa" fontFamily="ui-monospace,monospace">
          학교 식별자 필터 강제
        </text>
        <text x={816} y={210} fontSize="10" fill="rgba(245,158,11,0.85)" fontFamily="ui-monospace,monospace">
          ↑ 미들웨어가
        </text>
        <text x={816} y={226} fontSize="10" fill="rgba(245,158,11,0.85)" fontFamily="ui-monospace,monospace">
          토큰 학교 ↔ 경로 학교 일치 검증
        </text>
        <text x={816} y={246} fontSize="9" fill="rgba(255,255,255,0.4)" fontFamily="ui-monospace,monospace">
          한 학교 사고가 다른 학교로 새지 않음
        </text>
      </g>

      {/* ============================================
          하단: 음성 파이프라인 (Browser → STT)
         ============================================ */}
      <Tag x={40} y={314} text="VOICE PIPELINE (응시 흐름)" />

      {/* Browser box */}
      <g>
        <rect x={40} y={344} width={340} height={206} rx={12} fill="url(#kocca-nodebg)" stroke="url(#kocca-voice)" strokeWidth={1.5} />
        <text x={210} y={370} textAnchor="middle" fontSize="13" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
          Browser (응시자)
        </text>
        <text x={210} y={386} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif,system-ui">
          발음 · 말하기 state machine 분리
        </text>

        {/* state machine row */}
        <rect x={56} y={400} width={308} height={36} rx={6} fill="rgba(255,255,255,0.04)" />
        <text x={66} y={416} fontSize="10" fill="rgba(255,255,255,0.75)" fontFamily="ui-monospace,monospace">
          waiting → 안내 → 녹음 준비 → 녹음 → 완료
        </text>
        <text x={66} y={430} fontSize="9" fill="rgba(255,255,255,0.45)" fontFamily="ui-monospace,monospace">
          단계별 안내음 · 녹음 · 자동 전환
        </text>

        {/* WAV encoder */}
        <rect x={56} y={448} width={308} height={84} rx={8} fill="rgba(34,211,238,0.08)" stroke="rgba(34,211,238,0.35)" />
        <text x={66} y={468} fontSize="11" fontWeight="700" fill="#22d3ee" fontFamily="ui-monospace,monospace">
          자체 WAV 인코더 (STT가 요구하는 PCM 포맷)
        </text>
        <text x={66} y={486} fontSize="10" fill="rgba(255,255,255,0.7)" fontFamily="ui-sans-serif,system-ui">
          ① STT 사양에 맞춰 클라이언트에서 직접 생성 → 서버 변환 0
        </text>
        <text x={66} y={502} fontSize="10" fill="rgba(255,255,255,0.7)" fontFamily="ui-sans-serif,system-ui">
          ② 브라우저 음성 가공(에코 제거·노이즈 억제) 모두 OFF
        </text>
        <text x={66} y={518} fontSize="10" fill="rgba(255,255,255,0.7)" fontFamily="ui-sans-serif,system-ui">
          ③ 표준 WAV 헤더 직접 작성
        </text>
      </g>

      {/* Browser → STT arrow */}
      <line x1={380} y1={446} x2={500} y2={446} stroke="#22d3ee" strokeWidth={1.6} markerEnd="url(#kocca-arrow-voice)" />
      <text x={400} y={437} fontSize="10" fill="#7dd3fc" fontFamily="ui-monospace,monospace">PCM RIFF</text>

      {/* STT 4-phase poll */}
      <g>
        <rect x={500} y={344} width={300} height={206} rx={12} fill="url(#kocca-nodebg)" stroke="rgba(34,211,238,0.4)" strokeWidth={1.5} />
        <text x={650} y={370} textAnchor="middle" fontSize="13" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
          외부 한국어 STT
        </text>
        <text x={650} y={386} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif,system-ui">
          다단계 폴링 패턴
        </text>

        <PhaseRow x={516} y={404} idx="1" label="준비" sub="요청 ID 발급" />
        <PhaseRow x={516} y={434} idx="2" label="음성 전송" sub="인코딩된 PCM 업로드" />
        <PhaseRow x={516} y={464} idx="3" label="진행 상태 폴링" sub="주기적 폴링" />
        <PhaseRow x={516} y={494} idx="4" label="마무리" sub="결과 수신" />
        <text x={650} y={530} textAnchor="middle" fontSize="9.5" fill="rgba(255,255,255,0.45)" fontFamily="ui-monospace,monospace">
          long-running 작업이라 단발 요청 X
        </text>
      </g>

      {/* STT → 채점 DB */}
      <line x1={800} y1={446} x2={870} y2={446} stroke="#22d3ee" strokeWidth={1.6} markerEnd="url(#kocca-arrow-voice)" />
      <rect x={870} y={406} width={180} height={80} rx={10} fill="url(#kocca-nodebg)" stroke="rgba(255,255,255,0.18)" />
      <text x={960} y={428} textAnchor="middle" fontSize="12" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
        채점 데이터
      </text>
      <text x={960} y={446} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif,system-ui">
        학교별 격리 저장
      </text>

      {/* Scope banner */}
      <g transform="translate(40, 576)">
        <rect width={1010} height={50} rx={8} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
        <text x={16} y={22} fontSize="11" fontWeight="700" fill="rgba(255,255,255,0.7)" fontFamily="ui-monospace,monospace">
          ★ 본인 책임 범위
        </text>
        <text x={16} y={40} fontSize="10.5" fill="rgba(255,255,255,0.6)" fontFamily="ui-sans-serif,system-ui">
          음성 신호처리 + STT 통합 + 응시 흐름 + RBAC + 컨테이너 보안.
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

function RoleCard({
  x,
  y,
  role,
  desc,
  color,
}: {
  x: number
  y: number
  role: string
  desc: string
  color: string
}) {
  return (
    <g>
      <rect x={x} y={y} width={210} height={36} rx={8} fill="url(#kocca-nodebg)" stroke={`${color}66`} strokeWidth={1} />
      <circle cx={x + 14} cy={y + 18} r={4} fill={color} />
      <text x={x + 28} y={y + 16} fontSize="11.5" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
        {role}
      </text>
      <text x={x + 28} y={y + 30} fontSize="9.5" fill="rgba(255,255,255,0.55)" fontFamily="ui-sans-serif,system-ui">
        {desc}
      </text>
    </g>
  )
}

function PhaseRow({
  x,
  y,
  idx,
  label,
  sub,
}: {
  x: number
  y: number
  idx: string
  label: string
  sub: string
}) {
  return (
    <g>
      <circle cx={x + 10} cy={y + 8} r={9} fill="#22d3ee" />
      <text
        x={x + 10}
        y={y + 12}
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="#fff"
        fontFamily="ui-monospace,monospace"
      >
        {idx}
      </text>
      <text x={x + 28} y={y + 6} fontSize="11" fontWeight="700" fill="#fafafa" fontFamily="ui-sans-serif,system-ui">
        {label}
      </text>
      <text x={x + 28} y={y + 18} fontSize="9.5" fill="rgba(255,255,255,0.55)" fontFamily="ui-monospace,monospace">
        {sub}
      </text>
    </g>
  )
}
