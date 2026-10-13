/**
 * 날짜 유틸리티.
 *
 * `new Date('2026-10-13')`은 UTC 자정으로 해석되어 UTC보다 느린 시간대에서는 하루가 밀린다.
 * 이 모듈은 항상 `new Date(year, monthIndex, day)` 로컬 생성 패턴을 사용한다.
 */

export type DateKey = `${number}-${string}-${string}`

/** `YYYY-MM-DD` 형식 키를 만든다. month는 1부터 시작한다. */
export function toDateKey(year: number, month: number, day: number): DateKey {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}` as DateKey
}

export function dateToKey(date: Date): DateKey {
  return toDateKey(date.getFullYear(), date.getMonth() + 1, date.getDate())
}

/**
 * `YYYY-MM-DD`(뒤에 시간이 붙어도 됨) 문자열을 로컬 자정 Date로 변환한다.
 * 형식이 맞지 않으면 null.
 */
export function parseLocalDate(value: string | null | undefined): Date | null {
  if (!value) return null

  const [year, month, day] = value.slice(0, 10).split('-').map(Number)

  if (!year || !month || !day) return null

  return new Date(year, month - 1, day)
}

/** 날짜 범위(양 끝 포함)에 target이 들어가는지 일 단위로 비교한다. end가 없으면 단일일로 본다. */
export function isDateInRange(target: Date, start: Date, end: Date | null = null): boolean {
  const day = startOfDay(target).getTime()
  const from = startOfDay(start).getTime()
  const to = startOfDay(end ?? start).getTime()

  return day >= from && day <= to
}

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export function isSameDay(a: Date, b: Date): boolean {
  return dateToKey(a) === dateToKey(b)
}

/** 해당 월의 마지막 날짜(일) */
export function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

/** 해당 월 1일의 요일 (0 = 일요일) */
export function firstWeekdayOfMonth(year: number, month: number): number {
  return new Date(year, month - 1, 1).getDay()
}

/** ISO 문자열 등 Date로 해석 가능한 값을 로케일 포맷으로 출력한다. 잘못된 값이면 빈 문자열. */
export function formatDateTime(
  value: string | number | Date | null | undefined,
  locale: string,
  options: Intl.DateTimeFormatOptions = { dateStyle: 'medium', timeStyle: 'short' },
): string {
  if (value === null || value === undefined || value === '') return ''

  const date = value instanceof Date ? value : new Date(value)

  return Number.isNaN(date.getTime()) ? '' : new Intl.DateTimeFormat(locale, options).format(date)
}

/** `YYYY-MM-DD` 문자열을 로컬 날짜 기준으로 포맷한다. */
export function formatLocalDate(
  value: string | null | undefined,
  locale: string,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' },
): string {
  const date = parseLocalDate(value)

  return date ? new Intl.DateTimeFormat(locale, options).format(date) : ''
}

/** 짧은 `M.D` 형식 (예: 10.13) */
export function formatMonthDay(date: Date): string {
  return `${date.getMonth() + 1}.${date.getDate()}`
}
