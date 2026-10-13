# Soulrip Frontend Agent Guide

이 문서는 Soulrip 프론트엔드 저장소에서 AI 코딩 에이전트가 작업할 때 따라야 하는 최상위 프로젝트 가이드이다.

## 1. Project Purpose

Soulrip은 서울 공공데이터를 기반으로 혼자 여행하는 사용자가 장소를 탐색하고, 축제 일정을 확인하고, 익명 커뮤니티에서 경험을 공유하며, AI 챗봇으로 여행 정보를 탐색하는 Vue 기반 웹 서비스이다. 외국인 여행자도 사용할 수 있도록 모든 UI 문구는 7개 언어로 제공한다.

핵심 사용자 흐름은 다음과 같다.

1. **Discover Solo**는 장소와 카테고리를 탐색하는 흐름이다.
2. **Plan Solo**는 축제 및 AI 챗봇으로 여행 선택지를 구체화하는 흐름이다.
3. **Share Solo**는 익명 커뮤니티에서 혼행 경험을 공유하는 흐름이다.

## 2. Tech Stack

- Vue 3 Composition API (`<script setup lang="ts">`)
- TypeScript, Vite, Vue Router
- npm workspaces 모노레포 (`library/`, `packages/*`)
- Feature-Sliced Design(FSD) 기반 `src/` 구조
- 자체 디자인 시스템(`@soulrip/design-system`) + SUIT 폰트(`@soulrip/font-suit`)
- 아이콘: `lucide-vue-next`
- 품질 도구: ESLint(flat) + oxlint + Prettier, husky + lint-staged + commitlint

새 외부 라이브러리는 기존 패키지로 해결하기 어려운 명확한 이유가 있을 때만 추가한다.

## 3. Repository Structure First

```text
library/                    @soulrip/library      도메인 무관 유틸 (date, pagination, async, storage,
                                                  browser, string, url, geo, vue 컴포저블)
packages/
├─ config/                  @soulrip/config       환경 변수, 언어 목록, 저장소 키, 페이지 크기
├─ font-suit/               @soulrip/font-suit    SUIT Variable 웹폰트 (OFL)
├─ design-system/           @soulrip/design-system 토큰·반응형 타이포·레이아웃 CSS + S* 컴포넌트
└─ api/                     @soulrip/api          HTTP 코어 + 도메인별 types/api
                                                  (place, festival, post, comment, like, chat, insight)
src/                        FSD 레이어 (위 → 아래로만 import)
├─ app/                     앱 진입점, 라우터, 루트 레이아웃, 앱 전용 CSS
├─ pages/                   서버 도메인별 페이지: home, place, festival, post, not-found
├─ widgets/                 조합 블록: app-header, mobile-tab-bar, app-footer, chatbot,
│                           today-insight, festival-calendar, location-map, post-comments
├─ features/                사용자 행동: place-filter, post-filter, festival-month-filter,
│                           post-like, post-delete, post-editor, comment-create,
│                           place-bookmark, share-link, theme-toggle, language-switch
├─ entities/                도메인 모델 + 표시 UI: place, festival, post, comment
└─ shared/                  i18n(7개 언어 사전), model(테마·언어), config(라우트·내비), lib, assets
```

각 슬라이스는 `ui/`(화면) · `model/`(상태·로직 컴포저블) · `lib/`(순수 함수) 세그먼트와 public API인 `index.ts`로 구성한다.

새 기능을 구현할 때 먼저 가장 가까운 기존 슬라이스를 찾고 그 패턴을 확장한다.

## 4. Layer Responsibilities

| 위치 | 책임 |
|---|---|
| `packages/api` | HTTP 요청, 쿼리 파라미터, payload, 오류 변환(`ApiError`), 도메인 타입 |
| `packages/design-system` | 디자인 토큰, 반응형 규칙, 도메인 무관 UI 컴포넌트(`S*`) |
| `packages/config` | 환경·언어·저장소 키·페이지 크기 같은 앱 설정 상수 |
| `library` | 프레임워크·도메인과 무관한 순수 유틸과 Vue 컴포저블 |
| `src/pages` | 라우트 단위 화면 조합, URL 쿼리 ↔ 화면 상태 동기화 |
| `src/widgets` | 여러 feature/entity를 묶은 독립 블록 (챗봇처럼 자체 데이터를 불러오는 위젯 허용) |
| `src/features` | 사용자 행동 하나(좋아요, 삭제, 작성 등)의 상태와 UI |
| `src/entities` | 도메인 객체 표시(카드), 도메인 규칙(카테고리 매핑, 기간 계산) |
| `src/shared` | 앱 전역 i18n, 테마·언어 상태, 라우트 상수, 공용 헬퍼 |

관심사 분리: `ui/*.vue`는 화면만 그리고, 요청·검증·상태 전이는 `model/use*.ts`로 분리한다.

## 5. Import Rules (ESLint로 강제)

- **같은 슬라이스/폴더 내부는 상대 경로**: `./PostTypeBadge.vue`, `../model/usePostLike`
- **다른 슬라이스/레이어/패키지는 절대 경로**: `@/entities/place`, `@soulrip/api`
- 패키지 내부에서도 다른 폴더는 패키지 이름으로 참조한다: `@soulrip/api/core`, `@soulrip/library/async`
- 레이어 방향: `app → pages → widgets → features → entities → shared → packages/library`
- 같은 레이어의 다른 슬라이스를 import 하지 않는다. (`shared` 제외)
- 슬라이스는 public API(`index.ts`)로만 접근한다. `@/entities/place/ui/PlaceCard.vue` ✗
- 패키지는 앱 코드(`@/...`)를 import 할 수 없다.

## 6. API Rules

- 컴포넌트나 페이지에서 `fetch`를 직접 호출하지 않는다. `packages/api/src/domains/<domain>/<domain>.api.ts`를 확장한다.
- 타입은 같은 도메인 폴더의 `<domain>.types.ts`에 정의한다.
- 쿼리 파라미터는 `http.get(path, query)`에 객체로 넘긴다. (`URLSearchParams` 변환, 빈 값 제거는 코어가 처리)
- 실패는 `ApiError`(Error 상속)로 던지므로 `error.message`를 그대로 사용자에게 보여줄 수 있다.
- 백엔드 스펙을 추측해서 필드명을 임의로 만들지 않는다. 기존 API 또는 명시된 스펙을 확인한다.
- 비밀번호, 토큰, API 키 등 비밀값을 코드나 문서에 하드코딩하지 않는다.

## 7. Vue Rules

- SFC는 `<script setup lang="ts">`를 사용한다. (ESLint `vue/block-lang`, `vue/component-api-style`)
- 기본 상태는 `ref`, 파생값은 `computed`, 외부 변화에 대한 반응은 필요한 범위에서 `watch`를 사용한다.
- 비동기 상태는 `useAsyncState`(`@soulrip/library/vue`)로 로딩·오류·데이터를 함께 관리한다.
- 로딩/오류/빈 상태는 `SSkeleton`, `SEmptyState`(tone: loading | error | empty)로 표현한다.
- 버튼에는 `type`을 명시한다. (ESLint `vue/html-button-has-type`) 아이콘 전용 버튼은 `SIconButton`(label 필수)을 사용한다.
- 목록 `v-for` key는 index보다 도메인 식별자를 우선한다.
- 색상·간격·글자 크기는 디자인 토큰(`var(--color-*)`, `var(--space-*)`, `var(--fs-*)`)만 사용한다.

## 8. Soulrip Domain Invariants

### Places

- `PlaceCategory`의 기존 카테고리 체계를 우선한다. 화면 분류는 `contentTypeId` → `category` 순으로 판단한다(`resolvePlaceCategory`).
- 목록 이미지는 `thumbnailUrl`, 상세는 `imageUrl`을 우선한다. 이미지·좌표는 없을 수 있다(`SImage`, `toLatLng`).
- 목록의 검색어/카테고리/페이지는 URL 쿼리(`q`, `category`, `page`)와 동기화한다.

### Festivals

- `startDate`, `endDate`는 null일 수 있다. 날짜는 `parseLocalDate`(로컬 생성)로만 해석한다.
- 월 필터(`month` 쿼리)와 페이지네이션 상태를 함께 고려한다. 달력은 목록 페이지와 별도로 한 달치를 요청한다.

### Community

- 로그인 없는 익명 커뮤니티라는 전제를 유지한다.
- 게시글 수정과 삭제에는 비밀번호 흐름이 있다. 비밀번호는 저장하지 않는다.
- 좋아요 식별은 `client_id` localStorage 기반 흐름을 따른다.
- 댓글 생성 뒤 댓글 목록과 `commentCount`가 일치해야 한다.

### Chatbot

- `/chat` 요청에는 메시지, 최근 대화 기록(`CHAT_HISTORY_LIMIT`), 현재 언어가 전달된다.
- 로딩 중 전송을 차단한다. 인사말·오류 문구는 언어 전환 시 즉시 현재 언어로 표시된다.

## 9. i18n Rules

지원 언어: `ko`, `en`, `ja`, `zh`, `fr`, `es`, `de` (`@soulrip/config`의 `LANGUAGES`)

- 모든 사용자 노출 문구는 `src/shared/i18n/locales/*.ts`에 둔다. 템플릿에 한국어를 하드코딩하지 않는다.
- `ko.ts`가 스키마다. 키를 추가하면 다른 6개 파일이 타입 오류를 내므로 7개 언어를 함께 채운다.
- 동적 문구는 함수로 정의한다: `total: (n: number) => \`총 ${n}개\``
- 날짜·월·요일·숫자는 `Intl`과 `useI18n().locale`로 포맷한다.
- 디자인 시스템 내부 문구는 `t.ds`를 `provideDsMessages`로 주입한다.
- 백엔드 데이터(장소명, 축제 설명 등)는 서버가 주는 언어 그대로 보여준다.

## 10. Change Workflow

1. 요청을 사용자 기능 단위로 다시 정의한다.
2. 라우트 → pages → widgets → features → entities → packages/api 순서로 영향 범위를 찾는다.
3. 최소 변경 계획을 세운다.
4. 기존 패턴을 재사용해 구현한다.
5. 로딩, 오류, 빈 상태와 모바일(360px), 태블릿(768px), 데스크톱(1440px), 접근성을 확인한다.
6. `npm run check`, `npm run build`로 검증한다.
7. 변경한 파일과 사용자 동작 변화를 요약한다.

## 11. Verification Commands

```bash
npm run check        # prettier --check + oxlint + eslint + vue-tsc
npm run build        # type-check + vite build
npm run lint         # 자동 수정 포함 (실행 후 git diff 확인)
npm run format       # prettier --write
```

브랜치·커밋 규칙은 `CONTRIBUTING.md`를 따른다. (husky가 커밋 시 자동 검사)

## 12. AI Collaboration Principles

- 생성한 코드를 개발자가 이해하고 설명할 수 있는 형태로 작성한다.
- 기존 코드와 요구사항이 충돌하면 추측해서 덮어쓰지 않고 충돌 지점을 드러낸다.
- 먼저 계획하고, 작게 구현하고, 검증 결과를 확인한다.
- 관련 없는 파일을 대규모로 리팩터링하지 않는다.
- 최종 산출물의 책임과 검증은 개발자에게 있다는 전제로 작업한다.
