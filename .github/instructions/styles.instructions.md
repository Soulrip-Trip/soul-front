---
name: Soulrip Design System Styles
description: 디자인 토큰과 전역 CSS에 적용하는 규칙이다
applyTo: "packages/design-system/src/styles/**/*.css,src/app/styles/**/*.css"
---

# Global Style Rules

- 토큰은 `tokens.css`(색·그림자·반경·간격·z-index·모션), 반응형 글자 크기는 `typography.css`, 레이아웃은 `layout.css`에 둔다.
- 색상은 의미 이름(`--color-primary`, `--color-text-muted` …)으로만 추가하고 라이트/다크 값을 함께 정의한다.
- 브레이크포인트는 360/480/768/1024/1280/1440/1920px만 사용하고 모바일 퍼스트(`min-width`)로 작성한다.
  값을 바꾸면 `src/tokens/breakpoints.ts`와 `docs/DESIGN_SYSTEM.md`도 함께 수정한다.
- 글자 크기는 `--fs-*` 토큰, 간격은 `--space-*` 토큰을 사용한다. 고정 px 너비로 모바일을 깨뜨리지 않는다.
- 전역 클래스는 `ds-` 접두사를 사용한다. 특정 화면 전용 스타일은 해당 SFC의 scoped style에 둔다.
- 포커스 표시와 명암비, `prefers-reduced-motion`을 유지한다.
