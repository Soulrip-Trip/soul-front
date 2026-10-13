# Soulrip Design System

패키지: `packages/design-system` (`@soulrip/design-system`) · 폰트: `packages/font-suit` (`@soulrip/font-suit`)

```ts
// 앱 진입점에서 한 번
import '@soulrip/design-system/styles.css'

// 컴포넌트
import { SButton, SCard, SEmptyState } from '@soulrip/design-system'
```

---

## 1. 브레이크포인트

모바일 퍼스트(`min-width`)로 작성한다. CSS와 `src/tokens/breakpoints.ts`의 값은 항상 같아야 한다.

| 이름 | 최소 폭 | 대표 기기 / 의미 |
|---|---|---|
| (base) | 0 | 갤럭시 폴드 접힘(280), iPhone SE 1세대(320) |
| `xs` | 360px | 일반 안드로이드(360), iPhone mini·SE(375) |
| — | 390px | iPhone 12~16(390/393), Pro Max(430) — 루트 글자 크기만 바뀜 |
| `sm` | 480px | 대화면 폰 · 가로 모드 |
| `md` | 768px | 태블릿 — **하단 탭바 → 상단 내비게이션 전환** |
| `lg` | 1024px | 데스크톱 — **2단 레이아웃(본문 + 사이드) 시작** |
| `xl` | 1280px | 넓은 데스크톱 |
| `2xl` | 1440px | 와이드 — 카드 4열, 루트 글자 크기 확대 |
| `3xl` | 1920px | FHD 이상 |

JS에서 필요할 때: `const { isMobile, isDesktop, smUp } = useBreakpoint()`

---

## 2. 반응형 글자 크기

### 2-1. 루트 글자 크기 (화면 전체 밀도)

`html { font-size }`를 % 단위로 바꿔 모든 `rem`(글자, 여백, 버튼 높이)이 함께 커지고 작아진다.
% 단위라서 사용자가 브라우저에서 글자 크기를 키우면 그대로 반영된다.

| 화면 폭 | 루트 | 1rem = |
|---|---|---|
| ~359px | 87.5% | **14px** |
| 360 ~ 389px | 93.75% | **15px** |
| 390 ~ 1439px | 100% | **16px** |
| 1440 ~ 1919px | 106.25% | **17px** |
| 1920px ~ | 112.5% | **18px** |

### 2-2. 타입 스케일 토큰 (제목 계층)

본문은 `1rem`으로 고정하고 제목만 단계적으로 키운다. 모바일에서 제목이 화면을 덮지 않도록 하기 위해서다.

| 토큰 | ~359 | 360~479 | 480~767 | 768~1023 | 1024~ | 용도 |
|---|---|---|---|---|---|---|
| `--fs-display` | 2.25rem | 2.5rem | 3rem | 3.5rem | 4.5rem | 홈 히어로 |
| `--fs-h1` | 1.625rem | 1.75rem | 2rem | 2.375rem | 2.75rem | 페이지 제목 |
| `--fs-h2` | 1.3125rem | 1.375rem | 1.5rem | 1.75rem | 2rem | 섹션 제목 |
| `--fs-h3` | 1.125rem | 1.125rem | 1.1875rem | 1.25rem | 1.3125rem | 카드 제목 |
| `--fs-lead` | 1rem | 1.0625rem | 1.0625rem | 1.125rem | 1.125rem | 소개 문단 |
| `--fs-body` | 1rem | 1rem | 1rem | 1rem | 1rem | 본문 |
| `--fs-sm` | 0.875rem (최소 12px) |||||  보조 문구, 버튼(sm) |
| `--fs-xs` | 0.75rem (최소 11px) |||||  배지, 메타 정보 |
| `--fs-input` | 1rem (최소 16px) |||||  입력창 — iOS 사파리 자동 확대 방지 |

### 2-3. 실제 px로 환산한 예

| 기기 폭 | 1rem | 히어로(display) | 페이지 제목(h1) | 섹션 제목(h2) | 본문 |
|---|---|---|---|---|---|
| 320 (SE 1세대) | 14px | 31.5px | 22.75px | 18.4px | 14px |
| 360 (갤럭시) | 15px | 37.5px | 26.25px | 20.6px | 15px |
| 390 (iPhone 15) | 16px | 40px | 28px | 22px | 16px |
| 430 (Pro Max) | 16px | 40px | 28px | 22px | 16px |
| 600 (가로 모드) | 16px | 48px | 32px | 24px | 16px |
| 820 (iPad Air) | 16px | 56px | 38px | 28px | 16px |
| 1280 (노트북) | 16px | 72px | 44px | 32px | 16px |
| 1440 (데스크톱) | 17px | 76.5px | 46.75px | 34px | 17px |
| 1920 (FHD) | 18px | 81px | 49.5px | 36px | 18px |

### 2-4. 폰트

- **SUIT Variable** (100~900 가변, self-hosted, SIL OFL 1.1)
- 한글·라틴만 포함 → 일본어·중국어는 `--font-sans` 폴백(Hiragino, PingFang, Noto Sans JP/SC)으로 렌더링
- 줄바꿈: `<html lang="ko">`일 때만 `word-break: keep-all`(어절 단위). 일본어·중국어는 기본 줄바꿈 (`--word-break` 토큰)

---

## 3. 레이아웃 토큰

| 토큰 | ~359 | 360~ | 480~ | 768~ | 1024~ |
|---|---|---|---|---|---|
| `--gutter` (좌우 여백) | 0.875rem | 1rem | 1.25rem | 1.5rem | 2rem |
| `--grid-gap` | 0.875rem | 0.875rem | 1rem | 1.25rem | 1.5rem |
| `--header-height` | 3.5rem | 3.5rem | 3.5rem | 4.25rem | 4.75rem |
| `--tabbar-height` | 3.75rem | 3.75rem | 3.75rem | 0 | 0 |
| `--page-pad-top` | 1.5rem | 1.5rem | 1.75rem | 2.5rem | 3rem |
| `--section-pad` | 2.5rem | 2.5rem | 3rem | 3.5rem | 4.5rem |

- 컨테이너 최대 폭: `80rem`(1280px) + 좌우 여백, 좁은 컨테이너(게시글·폼): `51.25rem`(820px)
- 노치/홈 인디케이터: `viewport-fit=cover` + `env(safe-area-inset-*)`로 헤더·탭바·챗봇에 여백 확보
- 터치 기기(`pointer: coarse`)에서는 버튼·칩·아이콘 버튼 최소 높이 44px(`--tap-target`)

### 그리드 클래스

| 클래스 | ~479 | 480~767 | 768~1023 | 1024~1279 | 1280~1439 | 1440~ |
|---|---|---|---|---|---|---|
| `.ds-grid--cards` (장소·축제) | 1열 | 2열 | 2열 | 3열 | 3열 | 4열 |
| `.ds-grid--posts` (게시글) | 1열 | 1열 | 2열 | 2열 | 3열 | 3열 |
| `.ds-grid--half` (폼 2단) | 1열 | 2열 | 2열 | 2열 | 2열 | 2열 |
| `.ds-split` (상세 본문+사이드) | 1열 | 1열 | 1열 | 본문 \| 21.5rem(sticky) | ← | ← |

---

## 4. 화면 폭별 배치 변화

| 영역 | ~479px (폰) | 480~767px (큰 폰·가로) | 768~1023px (태블릿) | 1024px~ (데스크톱) |
|---|---|---|---|---|
| **내비게이션** | 상단: 로고+언어(코드)+테마 / **하단 탭바 4개** | 동일 | 상단 메뉴(아이콘+텍스트), 탭바 숨김 | 언어 버튼이 전체 이름(English…)으로, 1280~ `Seoul` 칩 추가 |
| **챗봇** | **전체 화면 시트**, FAB는 탭바 위 | 동일 | 우하단 플로팅 패널(24rem) | 동일 |
| **모달** | **바텀시트**(아래에서 올라옴) | 동일 | 화면 중앙 다이얼로그 | 동일 |
| **홈 히어로** | 가운데 정렬, CTA 버튼 세로 100% | CTA 한 줄 | 동일 | 좌: 문구 / 우: AI 인사이트 2단 |
| **홈 통계 타일** | 3열, 아이콘 위·숫자 아래(세로형) | 3열 가로형 | 동일 | 동일 |
| **AI 인사이트 카드** | 아이콘+텍스트 (사진 숨김) | 사진(4.5rem) 표시 | 동일 | 동일 |
| **키워드·필터 칩** | 가로 스크롤 한 줄 | 동일 | 여러 줄 감싸기 | 동일 |
| **섹션 헤더** | 제목 → 설명 → 버튼 세로 | 동일 | 제목 좌 / 버튼 우 | 동일 |
| **축제 달력** | 칸 3.5rem, 축제 수만큼 **점** | 동일 + 범례 표시 | 칸 6.5rem, **축제 이름 막대** 2개 + "+N" | 칸 8rem, 달력 \| 선택일 패널 2단 |
| **선택일 축제 항목** | 정보 세로, 링크 오른쪽 아래 | 정보 좌 / 링크 우 | 동일 | 동일 |
| **상세(장소·축제)** | 대표 이미지 17rem → 본문 → 팁 → 버튼 → 데이터 | 이미지 21rem, 정보 2열 | 이미지 26rem | 이미지 28rem, 본문 \| 사이드(sticky) |
| **지도** | 16rem, "큰 지도" 버튼 가로 100% | 20rem | 26rem, 버튼 오른쪽 | 동일 |
| **게시글 상세** | 메타 2×2 격자, 좋아요 100% + 수정/삭제 2열 | 메타 한 줄, 좋아요 좌·수정/삭제 우 | 동일 | 동일 |
| **게시글 카드 하단** | ~399px: 작성자/통계 두 줄 | 한 줄 | 동일 | 동일 |
| **작성 폼·댓글 폼** | 모든 입력 한 줄씩, 버튼 100% | 닉네임 \| 비밀번호 2열 | 동일 | 동일 |
| **페이지네이션** | 번호 3개 | 번호 5개 | 동일 | 동일 |
| **여정 지도** | 지도 세로형(묶음 아래 노드 2열, 연결선 숨김) → 아코디언 | 지도 3갈래 + 연결선 | 동일 | 지도 왼쪽 고정 \| 단계 목록 스크롤 스토리텔링 |
| **미션 알림** | 탭바 위 전체 폭 | 동일 | 화면 아래 가운데(26rem) | 동일 |
| **푸터** | 가운데 정렬 세로 | 동일 | 로고 좌 / 링크 우 | 동일 |

각 컴포넌트 템플릿 상단에도 같은 내용을 주석으로 적어 두었다.

---

## 5. 색상 토큰 (라이트 / 다크)

`<html data-theme="light|dark">`. 저장된 값이 없으면 OS 설정을 따른다. (`index.html` 인라인 스크립트로 첫 화면 깜빡임 방지)

| 토큰 | 용도 |
|---|---|
| `--color-primary` / `-strong` / `-soft` / `-softer` | 브랜드 블루(#4168F7) 단계 |
| `--color-bg`, `--color-surface`, `--color-surface-alt`, `--color-surface-sunken` | 배경 계층 |
| `--color-text`, `--color-text-muted`, `--color-text-subtle` | 글자 계층 (모두 WCAG AA 명암비) |
| `--color-border`, `--color-border-strong` | 테두리 |
| `--color-danger/success/warning` (+ `-soft`) | 상태 |
| `--tone-blue/orange/pink/green/yellow` (+ `-soft`) | 아이콘 포인트 |

간격 `--space-*`(0.25rem 단위), 반경 `--radius-xs~2xl/pill`, 그림자 `--shadow-xs~lg`, 레이어 `--z-*`, 모션 `--duration-*`/`--ease-*`.
`prefers-reduced-motion`이면 애니메이션을 끈다.

---

## 6. 컴포넌트

| 컴포넌트 | 설명 |
|---|---|
| `SButton` | variant(primary/secondary/outline/ghost/danger), size, `to`(RouterLink)/`href`, `loading`, `block`, `blockOnMobile` |
| `SIconButton` | 아이콘 전용 버튼. `label` 필수(aria-label) |
| `SCard` | `to`면 카드 전체 링크, padding(none/sm/md/lg 반응형), tone |
| `SBadge`, `STag` | 배지(tone), 해시태그 |
| `SChipGroup` | 단일 선택 칩. 768 미만 가로 스크롤 |
| `SField` + `SInput` / `STextarea` / `SSelect` | 라벨·도움말·오류 자동 연결(`aria-describedby`) |
| `SSearchField` | 검색 입력 + 지우기 버튼 |
| `SPagination` | `v-model:page`, 폭에 따라 3/5개 |
| `SSkeleton` | card/post/text/block |
| `SEmptyState` | tone: empty/error/loading + actions 슬롯 |
| `SModal` | 모바일 바텀시트 / 데스크톱 다이얼로그, ESC·포커스 복귀·스크롤 잠금 |
| `SSectionHeader` | eyebrow + 제목(h1/h2) + 설명 + actions |
| `SInfoList` | 아이콘·라벨·값 목록 (`layout="grid"`면 480~ 2열) |
| `SImage`, `SMediaHero` | 이미지 + 없음/깨짐 대체 화면, 상세 대표 이미지 |
| `SAvatar`, `SSpinner` | 이니셜 아바타, 로딩 표시 |

컴포넌트 내부 문구(이전 페이지, 닫기 등)는 앱에서 `provideDsMessages(() => t.value.ds)`로 현재 언어를 주입한다.
