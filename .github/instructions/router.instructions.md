---
name: Soulrip Router
description: 라우트와 화면 이동에 적용하는 규칙이다
applyTo: "src/app/router/**/*.ts,src/shared/config/**/*.ts"
---

# Router Rules

- 홈은 즉시 로딩하고, 나머지는 도메인 페이지 묶음(`@/pages/place` 등) 단위로 지연 로딩한다.
- 기존 URL(`/explore`, `/places/:id`, `/festivals`, `/festivals/:id`, `/community`, `/community/new`, `/community/:id`, `/community/:id/edit`)을 유지한다.
- 라우트 이름은 `ROUTE_NAMES`, 경로 생성은 `paths.*()`를 사용한다. 화면 코드에서 경로 문자열을 직접 조합하지 않는다.
- 상세 라우트는 `props: true`로 id를 props로 넘긴다.
- 문서 제목은 `meta.titleKey`(t.meta 키)로 지정한다.
- 필터·검색·페이지는 URL 쿼리로 관리하고, 같은 경로의 쿼리 변경에서는 스크롤을 유지한다.
- 알 수 없는 경로는 `NotFoundPage`(404)로 보낸다.
