---
name: Soulrip API Package
description: HTTP 요청과 백엔드 연동에 적용하는 규칙이다
applyTo: "packages/api/**/*.ts"
---

# API Package Rules

구조: `src/core`(http 클라이언트, 오류, 공통 타입) + `src/domains/<domain>/{<domain>.types.ts, <domain>.api.ts, index.ts}`

- 모든 요청은 `@soulrip/api/core`의 `http`(get/post/patch/delete)를 통해 처리한다.
- 기본 URL은 `@soulrip/config`의 `API_BASE_URL`(`VITE_API_BASE_URL`)을 사용하고 배포 주소를 코드에 쓰지 않는다.
- 쿼리는 객체로 넘긴다. null/undefined/빈 문자열은 코어가 제거한다. 경로 값은 `encodeURIComponent`로 감싼다.
- 도메인 타입은 같은 폴더의 `*.types.ts`에 둔다. 다른 도메인 폴더를 상대 경로로 참조하지 않는다.
- 백엔드 필드명(`client_id`, `post_id`, `image_url`, `limit` 등)은 그대로 유지한다.
- 실패는 `ApiError`(status, body)로 던진다. FastAPI `detail` 변환은 `toApiErrorMessage`가 담당한다.
- HTTP 204는 `undefined as T`로 반환한다.
- 새 도메인을 추가하면 `package.json` exports와 `src/index.ts`에도 등록한다.
- 패키지는 앱 코드(`@/...`)를 import 하지 않는다.

# Current Domain Endpoints

- place: `GET /places`, `GET /places/:id`
- festival: `GET /festivals`, `GET /festivals/:contentId`
- post: `GET/POST /posts`, `GET/PATCH/DELETE /posts/:id`
- comment: `GET/POST /posts/:id/comments`
- like: `POST /posts/:id/likes`, `GET /posts/:id/likes/status`
- chat: `POST /chat`
- insight: `POST /ai-insights/today`

요청 본문이나 쿼리 이름을 변경하기 전에 모든 호출부를 찾고 실제 백엔드 계약이 변경되었는지 확인한다.
