/**
 * 현재 페이지를 가운데에 두고 최대 `visible`개의 페이지 번호를 반환한다.
 *
 * @example getPageWindow(7, 20, 5) // [5, 6, 7, 8, 9]
 * @example getPageWindow(1, 3, 5)  // [1, 2, 3]
 */
export function getPageWindow(current: number, total: number, visible = 5): number[] {
  if (total <= 0) return []

  const size = Math.max(1, Math.min(visible, total))
  const page = clamp(current, 1, total)

  let start = Math.max(1, page - Math.floor(size / 2))
  const end = Math.min(total, start + size - 1)

  start = Math.max(1, end - size + 1)

  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
