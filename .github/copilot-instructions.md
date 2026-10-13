# Soulrip Frontend Copilot Instructions

## Repository Context

Soulrip은 서울에서 혼자 여행하는 사용자(외국인 포함)를 위한 Vue 3 + TypeScript + Vite 기반 프론트엔드 서비스이다. 주요 도메인은 장소, 축제, 익명 커뮤니티, AI 여행 챗봇이다.

저장소는 npm workspaces 모노레포이고 `src/`는 Feature-Sliced Design(FSD)을 따른다.

- `library/` (`@soulrip/library`): 도메인 무관 유틸과 Vue 컴포저블
- `packages/config` (`@soulrip/config`): 환경 변수, 언어 목록, 저장소 키, 페이지 크기
- `packages/font-suit` (`@soulrip/font-suit`): SUIT 웹폰트
- `packages/design-system` (`@soulrip/design-system`): 토큰, 반응형 CSS, `S*` 컴포넌트
- `packages/api` (`@soulrip/api`): HTTP 코어 + 도메인별 `*.types.ts` / `*.api.ts`
- `src/app` → `src/pages` → `src/widgets` → `src/features` → `src/entities` → `src/shared`

자세한 내용은 `AGENTS.md`, 디자인 규칙은 `docs/DESIGN_SYSTEM.md`를 따른다.

## Working Rules

1. 새로운 패턴을 만들기 전에 가장 가까운 기존 슬라이스를 먼저 확인한다.
2. 같은 슬라이스 내부는 상대 경로, 다른 슬라이스·레이어·패키지는 절대 경로(`@/...`, `@soulrip/...`)로 import 한다.
3. 상위 레이어를 import 하지 않고, 같은 레이어의 다른 슬라이스도 import 하지 않는다. 슬라이스는 `index.ts`로만 접근한다.
4. `<script setup lang="ts">`, Composition API, 명시적인 TypeScript 타입을 사용한다.
5. `fetch`를 직접 호출하지 않고 `packages/api/src/domains/<domain>`을 확장한다.
6. 화면(`ui/*.vue`)과 로직(`model/use*.ts`)을 분리한다.
7. 비동기 화면은 로딩, 오류, 빈 상태, 성공 상태를 모두 고려한다.
8. 사용자 노출 문구는 `src/shared/i18n/locales`의 7개 언어 사전에 함께 추가한다.
9. 색상·간격·글자 크기는 디자인 토큰을 사용하고, 반응형은 문서화된 브레이크포인트(360/480/768/1024/1280/1440)를 사용한다.
10. 비밀값을 하드코딩하지 않으며, 근거 없이 백엔드 필드나 엔드포인트를 만들어내지 않는다.
11. 기능 구현이나 버그 수정 중에는 관련 없는 리팩터링을 함께 수행하지 않는다.

## Soulrip Domain Rules

- 장소 탐색: `PlaceFilterBar`(검색 + 카테고리) + `PlaceCard`, 상태는 URL 쿼리와 동기화한다.
- 축제 탐색: 월 필터 · 달력(한 달치 별도 요청) · 페이지네이션을 함께 관리한다.
- 커뮤니티: 익명 구조. 게시글 CRUD에 닉네임·비밀번호, 좋아요는 `client_id`, 댓글 생성 시 목록과 개수를 함께 맞춘다.
- 챗봇: `chatApi.sendMessage`로 메시지, 최근 대화, 현재 언어를 보내며 로딩 중 중복 전송을 막는다.

## Verification Rules

```bash
npm run check
npm run build
```

`npm run lint`는 자동 수정을 포함하므로 실행 뒤 `git diff`를 확인한다.
커밋은 Conventional Commits(`feat(place): ...`)를 따르며 husky가 자동 검사한다.
