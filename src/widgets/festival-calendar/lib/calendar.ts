import type { Festival } from '@soulrip/api'
import {
  daysInMonth,
  firstWeekdayOfMonth,
  isSameDay,
  toDateKey,
  type DateKey,
} from '@soulrip/library'
import { festivalOccursOn } from '@/entities/festival'

export interface CalendarCell {
  key: string
  /** 앞뒤 빈 칸이면 null */
  date: Date | null
  dateKey: DateKey | null
  day: number | null
  weekday: number
  festivals: Festival[]
  isToday: boolean
}

function emptyCell(key: string, weekday: number): CalendarCell {
  return { key, date: null, dateKey: null, day: null, weekday, festivals: [], isToday: false }
}

/** 일요일 시작 7열 달력 칸을 만든다. 앞뒤 빈 칸을 채워 항상 7의 배수가 된다. */
export function buildCalendarCells(
  year: number,
  month: number,
  festivals: Festival[],
  today: Date = new Date(),
): CalendarCell[] {
  const leading = firstWeekdayOfMonth(year, month)
  const lastDay = daysInMonth(year, month)
  const cells: CalendarCell[] = []

  for (let index = 0; index < leading; index++) cells.push(emptyCell(`lead-${index}`, index))

  for (let day = 1; day <= lastDay; day++) {
    const date = new Date(year, month - 1, day)
    const dateKey = toDateKey(year, month, day)

    cells.push({
      key: dateKey,
      date,
      dateKey,
      day,
      weekday: date.getDay(),
      festivals: festivals.filter((festival) => festivalOccursOn(festival, date)),
      isToday: isSameDay(date, today),
    })
  }

  while (cells.length % 7 !== 0) cells.push(emptyCell(`trail-${cells.length}`, cells.length % 7))

  return cells
}

/**
 * 해당 월에서 처음 선택할 날짜.
 * 이번 달이면 오늘, 아니면 축제가 있는 첫날, 없으면 1일.
 */
export function initialSelectedDate(
  year: number,
  month: number,
  festivals: Festival[],
  today: Date = new Date(),
): DateKey {
  if (today.getFullYear() === year && today.getMonth() + 1 === month) {
    return toDateKey(year, month, today.getDate())
  }

  const lastDay = daysInMonth(year, month)
  for (let day = 1; day <= lastDay; day++) {
    const date = new Date(year, month - 1, day)
    if (festivals.some((festival) => festivalOccursOn(festival, date))) {
      return toDateKey(year, month, day)
    }
  }

  return toDateKey(year, month, 1)
}
