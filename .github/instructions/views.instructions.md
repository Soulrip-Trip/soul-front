---
name: Soulrip Pages
description: 라우트 단위 페이지 슬라이스에 적용하는 규칙이다
applyTo: "src/pages/**/*.vue,src/pages/**/*.ts"
---

# Page Rules

페이지는 서버 도메인별(`home`, `place`, `festival`, `post`, `not-found`) 슬라이스이며 라우트 단위 화면 조합 계층이다.

- `ui/*Page.vue`는 위젯·피처·엔티티를 배치하고, 데이터 로딩과 URL 쿼리 동기화는 `model/use*.ts`에서 처리한다.
- 목록 필터·검색·페이지는 URL 쿼리와 동기화한다(`useQueryPatch`). 한 사용자 동작은 한 번의 patch로 처리한다.
- 필터가 바뀌면 페이지를 1로 되돌린다.
- 자유 검색에는 `watchDebounced` + `SEARCH_DEBOUNCE_MS`를 사용한다.
- 라우트 파라미터는 props로 받고, 숫자가 필요하면 파싱한다.
- 로딩(`SSkeleton`/`SEmptyState tone="loading"`), 오류(재시도 버튼), 빈 상태를 모두 표현한다.
- 다른 페이지 슬라이스를 import 하지 않는다. 공유가 필요하면 widget/feature/entity로 내린다.
- 날짜는 UTC 단축 파싱(`new Date('YYYY-MM-DD')`)을 쓰지 않는다.
