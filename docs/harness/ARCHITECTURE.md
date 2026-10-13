# Soulrip Frontend Architecture

## Overview

npm workspaces 모노레포. 앱(`src/`)은 Feature-Sliced Design(FSD), 공통 코드는 `library/`와 `packages/*`로 분리한다.

```text
┌──────────────────────────── src (FSD) ────────────────────────────┐
│ app → pages → widgets → features → entities → shared              │
└──────────────┬─────────────────────────────────────────────────────┘
               │ import (절대 경로 @soulrip/*)
┌──────────────▼───────────── packages ─────────────────────────────┐
│ @soulrip/api  →  @soulrip/config                                   │
│ @soulrip/design-system  →  @soulrip/font-suit                      │
└──────────────┬─────────────────────────────────────────────────────┘
               ▼
          @soulrip/library  (도메인 무관 유틸 + Vue 컴포저블)
```

## Data Flow

```text
Route (app/router, props: true)
  ↓
pages/<domain>/ui/*Page.vue ── pages/<domain>/model/use*.ts
  │                               ├─ URL 쿼리 ↔ 상태 (useQueryPatch)
  │                               └─ @soulrip/api 도메인 API (useAsyncState)
  ├─ widgets  (chatbot, festival-calendar, post-comments …)
  ├─ features (post-like, post-delete, post-editor …)  ── model/use*.ts → @soulrip/api
  └─ entities (PlaceCard, FestivalCard, PostCard …)    ── lib/*.ts 도메인 규칙
        ↓
@soulrip/design-system (S* 컴포넌트, 토큰, 반응형 CSS)
```

## Folder Responsibilities

### `packages/api` (`@soulrip/api`)

HTTP 경계. `core/`(http 클라이언트, `ApiError`, 페이지네이션 타입)와 서버 라우터 단위의 `domains/<domain>/`(types + api)로 나뉜다.

### `packages/design-system` (`@soulrip/design-system`)

토큰(`tokens.css`), 반응형 타이포(`typography.css`), 레이아웃(`layout.css`), 기본 스타일, `S*` 컴포넌트, `useBreakpoint`, 다국어 주입(`provideDsMessages`). 도메인과 앱 i18n을 알지 못한다. 상세는 `docs/DESIGN_SYSTEM.md`.

### `packages/config`, `packages/font-suit`, `library`

설정 상수 / 폰트 / 순수 유틸. 앱 코드를 import 하지 않는다.

### `src/app`

진입점(`main.ts`), 라우터, 루트 레이아웃(`App.vue`: 헤더·본문·푸터·탭바·챗봇), 문서 제목, 디자인 시스템 문구 주입.

### `src/pages`

서버 도메인별 페이지 슬라이스(`home`, `place`, `festival`, `post`, `not-found`). 화면 조합과 URL 상태를 담당한다.

### `src/widgets`

여러 feature/entity를 묶은 독립 블록. 챗봇·AI 인사이트처럼 스스로 데이터를 불러오는 위젯을 허용한다.

### `src/features`

사용자 행동 하나(필터, 좋아요, 삭제, 작성, 북마크, 공유, 테마, 언어)의 상태와 UI.

### `src/entities`

도메인 객체의 표시 UI와 도메인 규칙(카테고리 매핑, 축제 기간 계산, 게시글 유형).

### `src/shared`

`i18n`(7개 언어 사전 + `useI18n`), `model`(테마·언어 `useAppSettings`), `config`(라우트·내비), `lib/router`(URL 쿼리 patch), `assets`.

## Slice Anatomy

```text
<slice>/
├─ ui/       Vue 컴포넌트 (화면만)
├─ model/    use*.ts 컴포저블 (상태, 요청, 검증)
├─ lib/      순수 함수
└─ index.ts  public API — 외부는 이 파일로만 접근
```

## Feature Placement Decision

```text
새 URL이 필요한가?             → pages/<domain> + app/router
여러 페이지에서 쓰는 조합 블록?  → widgets
사용자의 한 가지 행동?          → features
도메인 객체 표시/규칙?          → entities
앱 전역 설정·문구?             → shared
도메인 무관 UI?                → packages/design-system
도메인 무관 로직?              → library
백엔드 호출?                   → packages/api/src/domains/<domain>
```

## Import Rules (ESLint `no-restricted-imports`로 강제)

- 같은 슬라이스/폴더 내부: 상대 경로 (최대 `../` 한 단계)
- 그 외: 절대 경로 `@/<layer>/<slice>`, `@soulrip/<package>[/<folder>]`
- 하위 레이어 → 상위 레이어 import 금지, 같은 레이어 슬라이스 간 import 금지(shared 제외)
- 슬라이스 내부 파일 직접 import 금지 (`index.ts` 사용)
- 패키지 → 앱 코드 import 금지
