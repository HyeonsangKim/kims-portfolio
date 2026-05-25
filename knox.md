/Users/hyeonman/Desktop/kim/future/01_참고.md:20:자체 SSO 인증 서버를 처음부터 설계하여 4개 단말 앱(BlockApp · MohaniParent · Odiya Parents · Odiya Kids)과 4개 백엔드(SSO · Mohani · Odiya · Kidsphone)의 사용자 라이프사이클을 단일 출처로 통합했습니다. **삼성 Knox EnterpriseDeviceManager.Firewall · ApplicationPolicy.stopApp 과 AccessibilityService 2,674 LOC 차단 메커니즘으로 동작하는 자녀용 통제 앱**, **CompletableFuture + Redis 분산 락 기반 부모↔FCM↔자녀 동기 수집**, **In-memory 3회 재시도 + DLQ + Admin 콘솔 운영 가능 웹훅 브로드캐스트**, **MariaDB native Haversine + RANGE 파티션 일별 재구성 스케줄러**, **자체 작성 16kHz/1ch/16bit WAV 인코더 + 외부 한국형 STT(Selvy) 3-phase 통합 + 3인 합의 채점 알고리즘** 같이 도메인별 깊이 있는 구현을 직접 책임졌습니다.
/Users/hyeonman/Desktop/kim/future/01_참고.md:27:- **TypeScript / JavaScript** (RN, Next.js, Vite)
/Users/hyeonman/Desktop/kim/future/01_참고.md:29:- **SQL** (MariaDB / MySQL — JPA · Prisma · Flyway · 동적 쿼리 · RANGE 파티션)
/Users/hyeonman/Desktop/kim/future/01_참고.md:37:- **삼성 Knox EnterpriseDeviceManager · ApplicationPolicy · DeviceAdmin · AccessibilityService · WindowManager Overlay**
/Users/hyeonman/Desktop/kim/future/01_참고.md:40:- **Hot-Updater 0.28 (Supabase Edge Function)** OTA 코드푸시
/Users/hyeonman/Desktop/kim/future/01_참고.md:47:- **JWT (HS256 대칭키)**, Refresh Token Family Reuse Detection
/Users/hyeonman/Desktop/kim/future/01_참고.md:51:- **AES-256-GCM + SHA-256 phoneHash** 암호화
/Users/hyeonman/Desktop/kim/future/01_참고.md:56:- **Prisma 6 + MySQL** (Next.js Admin)
/Users/hyeonman/Desktop/kim/future/01_참고.md:70:- **Hot-Updater + Supabase Edge Function** OTA
/Users/hyeonman/Desktop/kim/future/01_참고.md:74:- Vitest 3, Storybook 9 (a11y), Playwright 1.56 E2E
/Users/hyeonman/Desktop/kim/future/01_참고.md:86:| 1 | **SSO 인증 서버 (sso-auth-server)** | 백엔드 단독 | HS256 JWT + Refresh Family Reuse Detection · PROTECTOR/PROTECTED 비대칭 토큰 (자녀 2년 DB-encrypted) · LinkRequest 상태 머신(service_id별) · `In-memory 3회 재시도 + DLQ 테이블 + Admin 콘솔` 웹훅 브로드캐스트 · 3단계 휴면/탈퇴 라이프사이클 스케줄러(자녀 익명화 → 2년 후 hard-delete) · DreamSecurity PASS 4종 콜백 · BCrypt 12 / AES-256-GCM / SHA-256 phoneHash · Flyway V1~V23 |
/Users/hyeonman/Desktop/kim/future/01_참고.md:87:| 2 | **SSO Admin Dashboard** | 프론트 단독 | Next.js 16 App Router · Prisma 6 · TanStack Table · DLQ 패널 · Internal API vs Admin API 클라이언트 분리 · 회원 탈퇴 프록시 (PROTECTOR=hard-delete / PROTECTED=anonymize 자동 분기) |
/Users/hyeonman/Desktop/kim/future/01_참고.md:88:| 3 | **SSO 회원가입/마이페이지 WebView** | 프론트 단독 | Vite 7 + React 19 · 부모/자녀 가입 14단계 라우트 · `clientId` 우선순위(URL→localStorage→default) · MobileOk callback 분기(under14/over14/parent) · React Hook Form + Zod |
/Users/hyeonman/Desktop/kim/future/01_참고.md:89:| 4 | **BlockApp — 자녀용 스마트폰 통제 앱** | 모바일 단독 | **삼성 Knox MDM 통합** (EnterpriseDeviceManager.Firewall + ApplicationPolicy.stopApp + KnoxBootReceiver + DeviceAdmin wipe-data) · **AccessibilityService 2,674 LOC + WindowManager TYPE_ACCESSIBILITY_OVERLAY** 풀스크린 차단 화면 · **5중 차단 트리거**(AccessibilityEvent / 1분 주기 / FGS 카운트 / SharedPrefs Listener / FCM BLOCK_APP) · **PIN 검증을 RN 미경유 네이티브 HttpURLConnection 으로 mohani 서버 직접 호출** (10분 grace) · 자체 NativeModule 7개 · uses-permission 11개 + 보호권한 2개 · logout 6단계 시퀀스 · 회원가입 WebView · iOS 사실상 비활성 |
/Users/hyeonman/Desktop/kim/future/01_참고.md:90:| 5 | **MohaniParent — 부모용 자녀 통제 앱** | 모바일 단독 | RN 0.84 · Hot-Updater(Supabase Edge) OTA · 자체 작성 iOS native 모듈 `RNForegroundPush` willPresent JS dispatch · `childGuard` 리스너(자녀 0/오프라인/deviceStatus.available=false 시 탭 진입 차단) · `LinkEventModal` 부모 역할(ADMIN/OBSERVER) 선택 · `SILENT_FCM_TYPES = ['SERVICE_WITHDRAWN']` notifee 표시 스킵 + AppState change 시 `checkForceLogout` |
/Users/hyeonman/Desktop/kim/future/01_참고.md:93:| 8 | **sso-odiya-full-kids — 자녀용 위치 공유 앱** | 모바일 단독 | RN 0.79 (.js, TS 미사용) · **컴파일 타임 빌드 분기** `public static final boolean NETWORK_BLOCKING_ENABLED` · **외부 통제 APK(`com.soundmind.disable_agent_v3`, Knox SDK + JNI + 통화/MMS 모니터링) 와 Android Broadcast Intent (`com.agent.incoming`) 통신** · `NavigationContainer.onStateChange` 라우트별 네트워크 ON/OFF 토글 · 위치 전송 3경로(LocationAlarmReceiver 1분 / ActivityTransition / 수동) · AndroidBridge NativeModule 30+ 메서드 |
/Users/hyeonman/Desktop/kim/future/01_참고.md:95:| 10 | **Kidsphone Backend — Odiya+R2S+Mohani 통합 모놀리스** | 백엔드 단독 | 컨트롤러 44개(도메인별 prefix) · **3개 Firebase 프로젝트 `@Qualifier` Bean 분리, 채널별 라우팅**(safety_zone→odiya / app_block→mohani / 그 외→r2s) · **자녀폰 전화기능 게이팅** (`callCount > 4` 시 `phoneFeatureEnabled=true` + 카운트 0 리셋, 안심콜 사용 시 4로 회귀) · **NEIS 교육청 API 통합 3종** + R2S 개인일정 시간 충돌 검사(반복 요일 boolean + isAllDay 처리) · 위치 GPS-튐 필터링(60s 이내 1500m 이상 이동 안심존 평가 스킵) · 본인인증 3종(Certification / PhoneVerification / MokCertification) · 자녀 자가 탈퇴 6단계(부모 한 명 끊기 경로와 안심존 삭제 차이 의도) |
/Users/hyeonman/Desktop/kim/future/01_참고.md:96:| 11 | **KOCCA K-Speaking 평가 플랫폼 (코카-3)** | 풀스택 단독 | Next.js 15.5 App Router (RBAC 매트릭스 4×4) · Prisma 6 + MySQL 11 모델 · JWT(jose) HS512 90일 + DB `access_token` 단일 세션 · Server Action(인증) vs Route Handler(부수효과) 의도적 분리 · **자체 16kHz/1ch/16bit WAV 인코더** (ScriptProcessor 4096) · **외부 한국형 STT(Selvy `kocca_stt`) 3-phase 통합** (prepare → sendaudio base64 → progressCode 폴링 P01/P02/P03 2초 간격 최대 60회 → finish) · **3인 합의 채점 알고리즘** (모집단 표준편차 = 절댓값 차이 ½, 동률 시 6/9개 항목 max 차이로 결정) · **`Serializable + FOR UPDATE` 채점자 자동 배정** (MAIN: korean_grade 균등 + grade balance / SUB: third_flag=true 라운드로빈) · **counter % 125 5×5×5 조합 순환** 말하기 문제 동적 할당 + 재응시 처리 · 학교별 멀티테넌트 + EXAM_STATUS 8단계 · ExcelJS 동적 헤더 + RFC5987 UTF-8 · Docker `node:22-alpine` 3-stage(runner 의 npm/npx 바이너리 제거) |
/Users/hyeonman/Desktop/kim/future/01_참고.md:102:> **"인증/세션·권한·웹훅·라이프사이클 같은 ‘서비스의 뼈대’부터, Knox MDM·Web Audio·지오펜싱·외부 STT 같은 ‘플랫폼 경계의 경험’까지 직접 책임지는 풀스택 엔지니어입니다."**
/Users/hyeonman/Desktop/kim/future/02_참고.md:13:  - 1-2. SSO Admin Dashboard
/Users/hyeonman/Desktop/kim/future/02_참고.md:15:  - 1-4. BlockApp — 자녀용 스마트폰 통제 앱 (Knox MDM 통합)
/Users/hyeonman/Desktop/kim/future/02_참고.md:21:  - 1-10. Kidsphone Backend — Odiya+R2S+Mohani 통합 모놀리스
/Users/hyeonman/Desktop/kim/future/02_참고.md:31:> 단순 RN/Spring Boot 조합이 아니라 ▸ **HS256 JWT + Refresh Token Family Reuse Detection**, ▸ **In-memory 3회 재시도 + DLQ + Admin 콘솔로 운영 가능한 웹훅 브로드캐스트**, ▸ **CompletableFuture 멀티 대기자 패턴으로 부모 ↔ FCM ↔ 자녀 동기 수집**, ▸ **삼성 Knox EnterpriseDeviceManager.Firewall · ApplicationPolicy.stopApp + AccessibilityOverlay 차단 화면**, ▸ **MariaDB native Haversine SQL 지오펜싱 + RANGE 파티션 일별 재구성 스케줄러** 같은 도메인 별 깊이 있는 구현을 직접 책임졌습니다.
/Users/hyeonman/Desktop/kim/future/02_참고.md:73:### 핵심 기여 4 — 3단계 휴면/탈퇴 라이프사이클
/Users/hyeonman/Desktop/kim/future/02_참고.md:74:`DormantAccountScheduler` cron `0 0 12 * * *` (매일 정오) 를 직접 설계·구현:
/Users/hyeonman/Desktop/kim/future/02_참고.md:78:| **A** | ACTIVE + 활성 서비스 0개 | `DORMANT_NOTIFIED` 전환 + 이메일 + SMS 안내 |
/Users/hyeonman/Desktop/kim/future/02_참고.md:79:| **B 자녀** | `dormant_notified_at + 30일` 경과 | `anonymizeProtectedWithCascade` (phoneHash 유지, 나머지 null, status WITHDRAWN, username `w_<UUID>`) |
/Users/hyeonman/Desktop/kim/future/02_참고.md:80:| **B' 부모** | `dormant_notified_at + 30일 + 2년` 경과 | `hardDeleteProtector` |
/Users/hyeonman/Desktop/kim/future/02_참고.md:93:자녀 탈퇴는 ① 휴면 스케줄러 ② 관리자 콘솔(`AdminAccountController`, `X-Admin-Api-Key + X-Admin-Actor-Id`) ③ 직접 가입 라이프사이클 스케줄러 만 가능. **부모는 hard-delete, 자녀는 익명화 → 2년 후 hard-delete** 의 비대칭 전략
/Users/hyeonman/Desktop/kim/future/02_참고.md:100:- BCrypt strength 12, 비밀번호 정책 8~20자 + 영문/숫자/특수문자 각 1
/Users/hyeonman/Desktop/kim/future/02_참고.md:101:- **AES-256-GCM** (12-byte IV, 128-bit tag) 으로 phone 암호화 + SHA-256 phoneHash
/Users/hyeonman/Desktop/kim/future/02_참고.md:109:- 휴면/익명화/완전삭제의 3단계 라이프사이클 + 부모/자녀 비대칭 처리 정책으로 개인정보보호법 보존기간 정책에 부합
/Users/hyeonman/Desktop/kim/future/02_참고.md:113:## 1-2. SSO Admin Dashboard
/Users/hyeonman/Desktop/kim/future/02_참고.md:117:**스택:** Next.js 16.2 App Router · React 19.2 · TypeScript · Tailwind 4 · Prisma 6.19 (MySQL) · Zustand 5 · React Hook Form 7 · Zod 4 · TanStack React Table 8
/Users/hyeonman/Desktop/kim/future/02_참고.md:123:- `/services/{mohani,odiya,r2s}` — 서비스별 콘솔
/Users/hyeonman/Desktop/kim/future/02_참고.md:141:**스택:** Vite 7.3 · React 19.2 · React Router 7.13 · Tailwind 4.1 · Zustand 5 · React Hook Form 7 · Zod 4
/Users/hyeonman/Desktop/kim/future/02_참고.md:161:## 1-4. BlockApp — 자녀용 스마트폰 통제 앱 (삼성 Knox MDM 통합)
/Users/hyeonman/Desktop/kim/future/02_참고.md:165:**핵심:** 단순 RN 앱이 아닌 **삼성 Knox MDM 라이선스 단말 전용 엔터프라이즈 통제 앱** — `AppBlockService.java` 단일 클래스 **2,674 LOC**, `FCMService.ts` **1,161 LOC**
/Users/hyeonman/Desktop/kim/future/02_참고.md:170:- Android 네이티브: AccessibilityService · DeviceAdminReceiver · Knox EnterpriseDeviceManager · WindowManager Overlay
/Users/hyeonman/Desktop/kim/future/02_참고.md:175:1. **`onAccessibilityEvent(TYPE_WINDOW_STATE_CHANGED)`** — 앱 전환 즉시 `shouldBlockApp()` → `blockApp()` → `showBlockScreen()` + `KnoxManager.stopApp()` + 100ms 후 `GLOBAL_ACTION_HOME`
/Users/hyeonman/Desktop/kim/future/02_참고.md:179:5. **FCM `BLOCK_APP` 액션** — `KnoxDomainModule.stopApps([pkg...])` fire-and-forget
/Users/hyeonman/Desktop/kim/future/02_참고.md:197:### 핵심 기여 4 — 삼성 Knox EnterpriseDeviceManager 통합
/Users/hyeonman/Desktop/kim/future/02_참고.md:198:`KnoxManager` 직접 작성:
/Users/hyeonman/Desktop/kim/future/02_참고.md:199:- 라이선스 키로 활성화 (DeviceAdmin 활성화 시 `MyDeviceAdminReceiver.onEnabled` → `activateKnoxLicenseIfNeeded` 자동 호출)
/Users/hyeonman/Desktop/kim/future/02_참고.md:201:- **앱 강제종료**: `ApplicationPolicy.stopApp(packageName)` — Knox 미준비/비삼성 단말은 silent skip
/Users/hyeonman/Desktop/kim/future/02_참고.md:204:- **`KnoxBootReceiver`**: BOOT_COMPLETED 수신 시 방화벽 규칙 재적용
/Users/hyeonman/Desktop/kim/future/02_참고.md:213:| `KnoxDomainModule` | activateKnox, setBlockedDomains, **stopApps** (단일스레드 executor 비동기), clearAllRules, ensureKnoxActive |
/Users/hyeonman/Desktop/kim/future/02_참고.md:220:- **logout 6단계** 시퀀스: ① `unregisterFcmToken`(서버) ② Bridge token 삭제 ③ `KnoxDomainModule.clearAllRules` ④ `authApi.logout` ⑤ Zustand state 초기화 ⑥ Firebase 로컬 토큰 삭제
/Users/hyeonman/Desktop/kim/future/02_참고.md:226:4. **KNOX_RESTRICTION_MGMT, KNOX_APP_MGMT** (삼성 Knox)
/Users/hyeonman/Desktop/kim/future/02_참고.md:248:**스택:** RN 0.84.0, React 19.2.3, react-navigation 7, TanStack Query 5.90, Zustand 5, **Hot-Updater 0.28 (Supabase Edge Function)**, Notifee 9.1.8, Firebase 23.8.6
/Users/hyeonman/Desktop/kim/future/02_참고.md:265:### 핵심 기여 5 — Hot-Updater (Supabase) OTA
/Users/hyeonman/Desktop/kim/future/02_참고.md:328:**스택:** RN 0.79.2 · `@mj-studio/react-native-naver-map` 2.4.0 · Reanimated 3.18 · NativeWind 2.0 · Zustand 5.0.5 · TanStack Query 5.80 · Notifee 9.1.8 · Firebase 22.4.0 · **Hot-Updater (Supabase Edge Function `iwbsakzcaxvmhcpbhebc.supabase.co/functions/v1/update-server`)**
/Users/hyeonman/Desktop/kim/future/02_참고.md:397:- 외부 앱은 **삼성 Knox SDK 4종**(Knox/KnoxSDK/KnoxResult/KnoxContains) + **JNI 네이티브 라이브러리** + 통화/MMS 모니터링(`CallLogChecker`, `MmsObserver`, `PhoneStateReceiver`) 포함된 별개 통제 모듈
/Users/hyeonman/Desktop/kim/future/02_참고.md:469:## 1-10. Kidsphone Backend — Odiya+R2S+Mohani 통합 모놀리스
/Users/hyeonman/Desktop/kim/future/02_참고.md:473:**중요:** 이름은 "kidsphone"이지만 실제로는 **Odiya + Ready2School(R2S) + Mohani 3개 도메인을 한 서버에 담은 모놀리스**. Firebase 프로젝트도 3개 분리 (`@Qualifier("firebaseMessagingOdiya|Ready2School|Mohani")` Bean)
/Users/hyeonman/Desktop/kim/future/02_참고.md:519:### 핵심 기여 5 — NEIS 교육청 API 통합 + r2s 도메인
/Users/hyeonman/Desktop/kim/future/02_참고.md:526:`r2s/*Controller` (Ready2School 도메인): 학교/학년/반/시간표/학사일정/급식/개인일정/준비물/캐릭터
/Users/hyeonman/Desktop/kim/future/02_참고.md:527:- **개인 일정 시간 충돌 검사**: 7요일 boolean (`repeatMon..repeatSun`) + `isAllDay==true` 시 startTime=00:01, endTime=23:59 하드코딩 → `r2sPersonalScheduleService.checkConflictsWithScheduleData(...)` 가 학교 시간표+개인일정과 비교 → 충돌 시 success=false 200 응답 (메시지 + conflicts 배열)
/Users/hyeonman/Desktop/kim/future/02_참고.md:555:3. `r2sKidsService.withdrawKids`
/Users/hyeonman/Desktop/kim/future/02_참고.md:562:- `/api/r2s/login` 평문 비밀번호 비교(`!user.getPassword().equals(password)`) — 다른 로그인은 PasswordEncoder 사용
/Users/hyeonman/Desktop/kim/future/02_참고.md:585:(자녀 통제)     (위치 추적)        (Odiya+R2S+Mohani    SERVICE/ACCOUNT
/Users/hyeonman/Desktop/kim/future/02_참고.md:592:                                       BlockApp (Knox MDM)
/Users/hyeonman/Desktop/kim/future/02_참고.md:595:   │ Hot-Updater       │ Hot-Updater
/Users/hyeonman/Desktop/kim/future/02_참고.md:598:   Admin Dashboard ──► SSO Server ◄── WebView (가입/마이페이지)
/Users/hyeonman/Desktop/kim/future/02_참고.md:599:   Next.js 16          Internal API   Vite + React 19
/Users/hyeonman/Desktop/kim/future/02_참고.md:606:4. **휴면**: SSO `DormantAccountScheduler` 매일 정오 → 30일 안내 → 자녀 익명화 → 2년 후 hard-delete
/Users/hyeonman/Desktop/kim/future/02_참고.md:623:- Prisma 6.18.0, MySQL
/Users/hyeonman/Desktop/kim/future/02_참고.md:624:- jose 6.1.0 (JWT **HS512, 90일**), bcryptjs 3.0.3
/Users/hyeonman/Desktop/kim/future/02_참고.md:629:- Vitest 3.2.4, Storybook 9.1.13, Playwright 1.56.1
/Users/hyeonman/Desktop/kim/future/02_참고.md:726:- `loginAction`: students 조회 → exam_codes 조회 → bcrypt → JWT(HS512 90일) → DB `access_token` 저장(단일 세션) → 쿠키
/Users/hyeonman/Desktop/kim/future/02_참고.md:747:## 핵심 기여 11 — Prisma 스키마 (11개 모델 + 8개 enum)
/Users/hyeonman/Desktop/kim/future/02_참고.md:757:- **Dockerfile 3-stage `node:22-alpine`**: deps → builder(`prisma generate` 포함) → runner(**npm/npx 바이너리 제거 보안 강화**, nodejs/nextjs uid=1001 비root)
/Users/hyeonman/Desktop/kim/future/02_참고.md:773:- HS256 SSO + Refresh Token Family Reuse Detection
/Users/hyeonman/Desktop/kim/future/02_참고.md:777:- BCrypt strength 12, AES-256-GCM, SHA-256 phoneHash
/Users/hyeonman/Desktop/kim/future/02_참고.md:793:- **삼성 Knox MDM 통합**: EnterpriseDeviceManager.Firewall + ApplicationPolicy.stopApp + 라이선스 자동 활성화 + Boot 복구 + DeviceAdmin `<wipe-data />`
/Users/hyeonman/Desktop/kim/future/02_참고.md:798:- Hot-Updater (Supabase Edge Function) OTA, RN 0.79/0.82/0.84 이종 버전 동시 운영
/Users/hyeonman/Desktop/kim/future/02_참고.md:814:- Prisma 6 + MySQL/MariaDB
/Users/hyeonman/Desktop/kim/future/02_참고.md:825:- Hot-Updater Supabase 코드푸시
/Users/hyeonman/Desktop/kim/future/03_참고.md:6:> 검증 영역: ① SSO 서버 + Admin Dashboard + WebView ② Kidsphone 백엔드(컨트롤러 44개 전수조사) ③ Mohani 서버 + Odiya 서버 + MohaniParent + Odiya Parents + Odiya Kids ④ BlockApp Android Native ⑤ KOCCA-3
/Users/hyeonman/Desktop/kim/future/03_참고.md:16:| SSO — 자녀 자가 탈퇴 | "DELETE /api/v1/account 가능" | **금지** (`ERR_PROTECTED_WITHDRAW_FORBIDDEN`). 자녀는 휴면 스케줄러/관리자만 처리 |
/Users/hyeonman/Desktop/kim/future/03_참고.md:17:| SSO — 30일 유예 | "30일 후 영구 삭제" | **3단계 라이프사이클** (DORMANT_NOTIFIED → 30일 후 익명화 → 2년 후 phoneHash hard-delete). 부모는 30일+2년 후 hard-delete |
/Users/hyeonman/Desktop/kim/future/03_참고.md:24:| KOCCA — Prisma 모델 | "50+ 개" | **실제 11개 모델 + 8개 enum** |
/Users/hyeonman/Desktop/kim/future/03_참고.md:34:| BlockApp — 차단 메커니즘 | "UsageStats 모니터링" | **AccessibilityService 2,674 LOC + 삼성 Knox EnterpriseDeviceManager.Firewall + ApplicationPolicy.stopApp + WindowManager Overlay**. Knox 라이선스 키 하드코딩 |
/Users/hyeonman/Desktop/kim/future/03_참고.md:50:- 두 종류의 프론트엔드가 워크스페이스에 같이 있음: `admin-dashboard/` (Next.js), `webview/` (Vite + React)
/Users/hyeonman/Desktop/kim/future/03_참고.md:70:4. `userType` 별 Protector|Protected 조회 → `passwordService.matches(rawPw, hash)` BCrypt
/Users/hyeonman/Desktop/kim/future/03_참고.md:72:6. `DORMANT_NOTIFIED → ACTIVE` 자동 복원
/Users/hyeonman/Desktop/kim/future/03_참고.md:84:5. 전화번호 정규화 → SHA-256 해시 → AES-256-GCM 암호화(`EncryptionService.java:44-138`)
/Users/hyeonman/Desktop/kim/future/03_참고.md:86:7. `passwordService.encode` — **BCrypt strength 12**. 비밀번호 정책 8~20자 + 영문+숫자+특수문자 각 1개 이상(`PasswordService.java:17-21`)
/Users/hyeonman/Desktop/kim/future/03_참고.md:173:- SHA-256 hex string 만 DB 저장
/Users/hyeonman/Desktop/kim/future/03_참고.md:213:### `DormantAccountScheduler` cron `0 0 12 * * *` (매일 정오)
/Users/hyeonman/Desktop/kim/future/03_참고.md:214:**3단계 라이프사이클** (`DormantAccountScheduler.java:68 / 94-153 / 165-187 / 193-235`):
/Users/hyeonman/Desktop/kim/future/03_참고.md:215:- **Step A**: ACTIVE + 활성 서비스 0개 → `DORMANT_NOTIFIED` 전환, 이메일 + SMS 안내
/Users/hyeonman/Desktop/kim/future/03_참고.md:216:- **Step B 자녀**: `dormant_notified_at + 30일` 경과 → `anonymizeProtectedWithCascade`
/Users/hyeonman/Desktop/kim/future/03_참고.md:217:- **Step B' 부모**: `dormant_notified_at + 30일 + 2년` 경과 → `hardDeleteProtector`
/Users/hyeonman/Desktop/kim/future/03_참고.md:219:- 설정값: `dormant.grace-days=30`, `phone-hash.retention-years=2`
/Users/hyeonman/Desktop/kim/future/03_참고.md:302:- `hash`: SHA-256 hex
/Users/hyeonman/Desktop/kim/future/03_참고.md:334:- **V15 account_status (ACTIVE/DORMANT_NOTIFIED/WITHDRAWN), dormant_notified_at**
/Users/hyeonman/Desktop/kim/future/03_참고.md:343:## A-11. Admin Dashboard
/Users/hyeonman/Desktop/kim/future/03_참고.md:346:**스택:** Next.js 16 App Router, React 19, Prisma 6 (MySQL), Tailwind 4, Zustand 5, TanStack React Table 8, jose, bcrypt
/Users/hyeonman/Desktop/kim/future/03_참고.md:353:- `app/(dashboard)/services/{mohani,odiya,r2s}/page.tsx` — 서비스별 콘솔
/Users/hyeonman/Desktop/kim/future/03_참고.md:368:**스택:** Vite 7 + React 19 + React Router 7 + Tailwind 4 + Zustand + Zod + React Hook Form
/Users/hyeonman/Desktop/kim/future/03_참고.md:387:# B. Kidsphone Backend (Odiya + R2S + Mohani 통합 모놀리스)
/Users/hyeonman/Desktop/kim/future/03_참고.md:390:**중요:** 이름은 "kidsphone" 이지만 실제로는 **Odiya + Ready2School(R2S) + Mohani 3개 도메인 모놀리스**. Firebase 프로젝트도 3개 분리
/Users/hyeonman/Desktop/kim/future/03_참고.md:406:- **R2S `/api/r2s/login` 평문 비밀번호 비교** — `!user.getPassword().equals(password)` (다른 모든 로그인은 PasswordEncoder 사용)
/Users/hyeonman/Desktop/kim/future/03_참고.md:510:- `NeisDataSyncService` 가 r2sSchool/Class 순회하여 NEIS 호출 후 r2s 테이블에 적재
/Users/hyeonman/Desktop/kim/future/03_참고.md:514:- `POST /generate-schools` — 프로젝트 루트의 `학교기본정보.json` 읽어 `r2sSchool/r2sClass` 일괄 적재(초등학교 필터). 학년 1·반 1 고정 1개씩
/Users/hyeonman/Desktop/kim/future/03_참고.md:560:- `POST /rd2s/register-child` — R2S 가입
/Users/hyeonman/Desktop/kim/future/03_참고.md:561:- **`DELETE /me`** 자녀 본인 탈퇴 6단계: ① ProtectRelations 정리 ② `childStatusService.deleteChildStatusByCellphone` ③ `r2sKidsService.withdrawKids` ④ AddressBook 정리 ⑤ **`safetyZoneService.deleteAllByProtectedCellphone`** ⑥ `protectedService.leave`
/Users/hyeonman/Desktop/kim/future/03_참고.md:562:- `POST /find-child-by-phone`, `POST /find` (email+cellphone 두 단계: cellphone 없으면 "CELLPHONE_NOT_FOUND"), `POST /r2s/check-phone`
/Users/hyeonman/Desktop/kim/future/03_참고.md:601:### `r2s/r2sFCMController @ /api/r2s/fcm`
/Users/hyeonman/Desktop/kim/future/03_참고.md:602:- `POST /send` — `r2sFCMService.sendFCM(phone, schedule, action)` (R2S 일정 알림)
/Users/hyeonman/Desktop/kim/future/03_참고.md:604:## B-12. R2S (Ready2School) 도메인 — `/api/r2s/*`
/Users/hyeonman/Desktop/kim/future/03_참고.md:608:### `r2s/r2sKidsController @ /api/r2s` (자녀 측)
/Users/hyeonman/Desktop/kim/future/03_참고.md:616:- 충돌 검사: `r2sPersonalScheduleService.checkConflictsWithScheduleData(...)` 가 학교 시간표 + 다른 개인일정과 비교 → 충돌 있으면 **success=false** 로 200 응답(메시지 + conflicts 배열). 성공 시 `sendScheduleNotification(..., "INSERT"/"UPDATE")` FCM
/Users/hyeonman/Desktop/kim/future/03_참고.md:620:### `r2s/r2sParentsController @ /api/r2s` (부모 측)
/Users/hyeonman/Desktop/kim/future/03_참고.md:632:- `r2sTimetableController @ /api/r2s/timetable` — `/sync/{daily,weekly,today,this-week,three-months,current-semester}` + DB 조회 `/{classId}?date=`, `/{classId}/period?startDate=&endDate=`
/Users/hyeonman/Desktop/kim/future/03_참고.md:633:- `r2sSchoolScheduleController @ /api/r2s/school-schedule` — `/sync/three-months`
/Users/hyeonman/Desktop/kim/future/03_참고.md:634:- `r2sMealServiceController @ /api/r2s/meal` — `/sync/three-months`
/Users/hyeonman/Desktop/kim/future/03_참고.md:636:### `r2s/r2sSupplyController @ /api/r2s/supply` (준비물)
/Users/hyeonman/Desktop/kim/future/03_참고.md:663:## B-14. 어드민 / 통계 / 엑셀
/Users/hyeonman/Desktop/kim/future/03_참고.md:682:- `WebController` — Thymeleaf SPA 라우팅 (`/`, `/login`, `/sign-up`, `/admin/*`, `/map`, `/howtoUsePage`, `/howtoUseR2S` → `index.html`)
/Users/hyeonman/Desktop/kim/future/03_참고.md:893:**중요:** 사실상 **삼성 Knox MDM 단말 전용**. iOS는 보호 관련 설정 전무
/Users/hyeonman/Desktop/kim/future/03_참고.md:904:  2. **Knox 방화벽 복구 (`KnoxDomainModule.ensureKnoxActive`)**
/Users/hyeonman/Desktop/kim/future/03_참고.md:974:8. **`com.samsung.android.knox.permission.KNOX_RESTRICTION_MGMT`**
/Users/hyeonman/Desktop/kim/future/03_참고.md:975:9. **`com.samsung.android.knox.permission.KNOX_APP_MGMT`**
/Users/hyeonman/Desktop/kim/future/03_참고.md:992:- **`<receiver .knox.KnoxBootReceiver>`** — `BOOT_COMPLETED`, 부팅 시 Knox 방화벽 규칙 재적용
/Users/hyeonman/Desktop/kim/future/03_참고.md:1002:| `KnoxDomainModule` | `activateKnox, isKnoxActivated, setBlockedDomains, getBlockedDomains, clearAllRules, addBlockedDomain, removeBlockedDomain, ensureKnoxActive, **stopApps**`(단일스레드 executor 비동기) |
/Users/hyeonman/Desktop/kim/future/03_참고.md:1017:1. **`onAccessibilityEvent(TYPE_WINDOW_STATE_CHANGED)`** — 앱 전환 즉시 `shouldBlockApp()` → `blockApp()` → `showBlockScreen()` + `KnoxManager.stopApp()` (Knox 강제 종료) + 100ms 후 `GLOBAL_ACTION_HOME` (`AppBlockService.java:403-458, 727-766`)
/Users/hyeonman/Desktop/kim/future/03_참고.md:1019:3. **백그라운드 FGS 차단** — `UsageEvents.FOREGROUND_SERVICE_START/STOP` 카운트로 화면 없는 음악·녹음 앱 감지 → Knox stopApp (`AppBlockService.java:286-346`)
/Users/hyeonman/Desktop/kim/future/03_참고.md:1021:5. **FCM `BLOCK_APP` 액션** — JS에서 `KnoxDomainModule.stopApps([pkg...])` fire-and-forget → 백그라운드 음악도 즉시 종료 (`FCMService.ts:481-492`)
/Users/hyeonman/Desktop/kim/future/03_참고.md:1036:## E-7. Knox 통합 (KnoxManager)
/Users/hyeonman/Desktop/kim/future/03_참고.md:1038:`knox/KnoxManager.java`:
/Users/hyeonman/Desktop/kim/future/03_참고.md:1040:- DeviceAdmin 활성화 시 자동 라이선스 활성화 (`MyDeviceAdminReceiver.onEnabled` → `activateKnoxLicenseIfNeeded`)
/Users/hyeonman/Desktop/kim/future/03_참고.md:1042:- **앱 강제종료**: `ApplicationPolicy.stopApp(packageName)` — Knox 미준비/비삼성 시 silent skip
/Users/hyeonman/Desktop/kim/future/03_참고.md:1063:- **`authStore.ts`** — `user, token, isLoggedIn, isSubmitting, hasHydrated, loginError, firstLoginForApp`. `persist`(AsyncStorage `auth-storage`), `partialize: {user, token, isLoggedIn}`. login 시 SSO API + `AppSettingsModule.saveAuthToken` 동시 저장. **logout 6단계**: ① `unregisterFcmToken`(서버) ② Bridge token 삭제 ③ `KnoxDomainModule.clearAllRules` ④ `authApi.logout` ⑤ state 초기화 ⑥ `deleteLocalFcmToken`(Firebase 로컬)
/Users/hyeonman/Desktop/kim/future/03_참고.md:1089:- 모두 통과 + 부모 1명 이상 시 **`setOnboardingComplete()` + Knox 자동 활성화**
/Users/hyeonman/Desktop/kim/future/03_참고.md:1143:## F-7. hot-updater 설정
/Users/hyeonman/Desktop/kim/future/03_참고.md:1145:`hot-updater.config.ts:9-21`: `bare({ enableHermes: true })`, Supabase Storage + Database, `updateStrategy: 'appVersion'`
/Users/hyeonman/Desktop/kim/future/03_참고.md:1149:"deploy": "npx hot-updater deploy -p android -p ios",
/Users/hyeonman/Desktop/kim/future/03_참고.md:1150:"deploy:android": "npx hot-updater deploy -p android -t 1.0.4",
/Users/hyeonman/Desktop/kim/future/03_참고.md:1151:"deploy:ios": "npx hot-updater deploy -p ios -t 1.0.4",
/Users/hyeonman/Desktop/kim/future/03_참고.md:1152:"deploy:console": "npx hot-updater console"
/Users/hyeonman/Desktop/kim/future/03_참고.md:1278:- **mdm/Knox 4종**: `Knox.java`, `KnoxSDK.java`, `KnoxResult.java`, `KnoxContains.java`
/Users/hyeonman/Desktop/kim/future/03_참고.md:1316:**스택:** Next.js 15.5.7, React 19.1.0, Prisma 6.18.0, MySQL, jose 6.1.0, bcryptjs 3.0.3, exceljs 4.4.0, lucide-react 0.552.0, react-markdown 10.1.0, recorder-js 1.0.7, resend 6.4.2, tone 15.1.22, wavesurfer.js 7.11.1, zustand 5.0.8, @aws-sdk/client-s3 3.925.0
/Users/hyeonman/Desktop/kim/future/03_참고.md:1317:**테스트:** Vitest 3.2.4, Storybook 9.1.13, Playwright 1.56.1
/Users/hyeonman/Desktop/kim/future/03_참고.md:1520:- `loginAction(username, password)` (`:23-118`): students 조회 → exam_codes 조회 (없으면 에러) → bcrypt 비교 → JWT 생성(examCode 포함) → DB에 `access_token` 저장(세션 무효화) → 쿠키 설정
/Users/hyeonman/Desktop/kim/future/03_참고.md:1619:## I-11. Prisma 스키마 — **11개 모델 + 8개 enum** (50+ 거짓)
/Users/hyeonman/Desktop/kim/future/03_참고.md:1621:`prisma/schema.prisma` (357줄):
/Users/hyeonman/Desktop/kim/future/03_참고.md:1704:"build": "dotenv -e .env -- prisma generate && next build",
/Users/hyeonman/Desktop/kim/future/03_참고.md:1705:"db:seed": "dotenv -e .env -- tsx prisma/seed.ts",
/Users/hyeonman/Desktop/kim/future/03_참고.md:1706:"seed:students": "tsx prisma/seed-students.ts",
/Users/hyeonman/Desktop/kim/future/03_참고.md:1707:"seed:pr": "tsx prisma/seed-pronunciation.ts",
/Users/hyeonman/Desktop/kim/future/03_참고.md:1708:"seed:teacher": "tsx prisma/create-teacher.ts"
/Users/hyeonman/Desktop/kim/future/03_참고.md:1778:- **R2S 평문 비밀번호 비교** `/api/r2s/login`
/Users/hyeonman/Desktop/kim/future/03_참고.md:1781:- **Knox 라이선스 키 하드코딩** `KLM09-NC3EL-UL2JC-SXGE5-CZ3IK-PS5QB`
