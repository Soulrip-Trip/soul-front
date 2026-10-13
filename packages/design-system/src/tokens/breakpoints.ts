/**
 * 브레이크포인트(px, min-width 기준). CSS(layout.css / typography.css)와 같은 값을 유지한다.
 * CSS 미디어 쿼리에서는 변수를 쓸 수 없으므로 값이 바뀌면 두 곳을 함께 수정한다.
 */
export const BREAKPOINTS = {
  xs: 360,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1440,
  '3xl': 1920,
} as const

export type Breakpoint = keyof typeof BREAKPOINTS

/** `(min-width: 768px)` 형태의 미디어 쿼리 문자열 */
export function mediaUp(breakpoint: Breakpoint): string {
  return `(min-width: ${BREAKPOINTS[breakpoint]}px)`
}

/** `(max-width: 767.98px)` — 해당 브레이크포인트 "미만" */
export function mediaDown(breakpoint: Breakpoint): string {
  return `(max-width: ${BREAKPOINTS[breakpoint] - 0.02}px)`
}
