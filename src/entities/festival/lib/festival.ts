import type { Festival } from '@soulrip/api'
import { firstFilled, isDateInRange, parseLocalDate, toLatLng, type LatLng } from '@soulrip/library'

export interface FestivalRange {
  start: Date
  /** 단일일 행사면 start와 같다. */
  end: Date
}

export function festivalName(festival: Festival): string {
  return firstFilled(festival.name, festival.title)
}

export function festivalListImage(festival: Festival): string {
  return firstFilled(festival.thumbnailUrl, festival.imageUrl)
}

export function festivalDetailImage(festival: Festival): string {
  return firstFilled(festival.imageUrl, festival.thumbnailUrl)
}

export function festivalCoordinates(festival: Festival): LatLng | null {
  return toLatLng(festival.latitude, festival.longitude)
}

/**
 * 축제 기간을 로컬 날짜로 해석한다. 시작일이 없으면 null.
 * (UTC 파싱으로 하루가 밀리지 않도록 parseLocalDate 사용)
 */
export function festivalRange(festival: Festival): FestivalRange | null {
  const start = parseLocalDate(festival.startDate)
  if (!start) return null

  const end = parseLocalDate(festival.endDate)

  return { start, end: end && end >= start ? end : start }
}

export function festivalOccursOn(festival: Festival, date: Date): boolean {
  const range = festivalRange(festival)

  return range ? isDateInRange(date, range.start, range.end) : false
}

/**
 * 축제 기간을 현재 로케일로 포맷한다. 일정 정보가 없으면 null.
 * short: 10. 3. – 10. 5. / long: 2026. 10. 3. – 2026. 10. 5.
 */
export function formatFestivalPeriod(
  festival: Festival,
  locale: string,
  style: 'short' | 'long' = 'long',
): string | null {
  if (festival.dateAvailable === false) return null

  const range = festivalRange(festival)
  if (!range) return null

  const formatter = new Intl.DateTimeFormat(
    locale,
    style === 'short'
      ? { month: 'numeric', day: 'numeric' }
      : { year: 'numeric', month: 'short', day: 'numeric' },
  )

  return range.start.getTime() === range.end.getTime()
    ? formatter.format(range.start)
    : formatter.formatRange(range.start, range.end)
}
