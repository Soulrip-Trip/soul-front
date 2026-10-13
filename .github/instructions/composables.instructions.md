---
name: Soulrip Composable
description: 반응형 상태·로직(model 세그먼트, 공통 컴포저블)에 적용하는 규칙이다
applyTo: "src/**/model/**/*.ts,library/src/vue/**/*.ts"
---

# Composable Rules

- 화면(`ui/*.vue`)에서 요청·검증·상태 전이를 분리할 때 같은 슬라이스의 `model/use*.ts`로 만든다.
- 도메인과 무관하고 여러 프로젝트에서 쓸 만한 컴포저블만 `library/src/vue`에 둔다.
- 비동기 상태는 `useAsyncState`를 사용해 로딩·오류·데이터와 요청 경쟁 상태를 함께 처리한다.
- 반환하는 상태와 변경 함수의 역할을 명확히 드러내고 숨겨진 부수 효과를 피한다.
- `localStorage`는 `@soulrip/library`의 `readStorage`/`writeStorage`로만 접근한다. (차단 환경에서도 예외 없음)
- 이벤트 리스너·body 스크롤 잠금은 `useEventListener`, `useScrollLock`으로 스코프 해제 시 자동 정리한다.
- 테마·언어는 `src/shared/model`의 `useAppSettings` 하나만 기준점으로 사용한다. (`soulrip-theme`, `soulrip-lang`)
