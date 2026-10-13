import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { emptyPaginationMeta, festivalApi, type FestivalListParams } from '@soulrip/api'
import { PAGE_SIZE } from '@soulrip/config'
import { firstQueryValue, toPageNumber, type DateKey } from '@soulrip/library'
import { useAsyncState } from '@soulrip/library/vue'
import { initialSelectedDate } from '@/widgets/festival-calendar'
import { useI18n } from '@/shared/i18n'
import { useQueryPatch } from '@/shared/lib/router'

const ALL = 'all'

/**
 * 축제 목록 + 달력 상태.
 *
 * - URL 쿼리: month(1~12 | all, 없으면 이번 달), page
 * - 목록(페이지 단위)과 달력(한 달 전체)은 따로 요청한다.
 *   달력이 목록의 현재 페이지(12개)만 보고 그려지던 문제를 해결한다.
 * - 달력 요청이 실패하면 목록 데이터로 대신 그린다(기존 동작).
 * - "전체"를 선택하면 목록은 전체, 달력은 이번 달을 보여준다.
 */
export function useFestivalList() {
  const route = useRoute()
  const routeName = route.name
  const patchQuery = useQueryPatch()
  const { t } = useI18n()

  const today = new Date()
  const year = today.getFullYear()
  const currentMonth = today.getMonth() + 1

  /** null = 전체 */
  const month = computed<number | null>(() => {
    const raw = firstQueryValue(route.query.month)
    if (raw === ALL) return null

    const value = Number.parseInt(raw, 10)
    return value >= 1 && value <= 12 ? value : currentMonth
  })
  const calendarMonth = computed(() => month.value ?? currentMonth)
  const page = computed(() => toPageNumber(route.query.page))

  const list = useAsyncState(
    (params: FestivalListParams) => festivalApi.getFestivals(params),
    { items: [], meta: emptyPaginationMeta(PAGE_SIZE.festivals) },
    { errorMessage: t.value.festival.list.errorTitle },
  )

  const calendar = useAsyncState(
    (targetMonth: number) =>
      festivalApi.getFestivals({ month: targetMonth, page: 1, size: PAGE_SIZE.festivalCalendar }),
    { items: [], meta: emptyPaginationMeta(PAGE_SIZE.festivalCalendar) },
  )

  const calendarFestivals = computed(() =>
    calendar.error.value ? list.data.value.items : calendar.data.value.items,
  )

  const selectedDate = ref<DateKey>(initialSelectedDate(year, calendarMonth.value, []))

  function loadList() {
    return list.run({ month: month.value, page: page.value, size: PAGE_SIZE.festivals })
  }

  async function loadCalendar() {
    await calendar.run(calendarMonth.value)
    selectedDate.value = initialSelectedDate(year, calendarMonth.value, calendarFestivals.value)
  }

  watch(
    [month, page],
    () => {
      if (route.name === routeName) void loadList()
    },
    { immediate: true },
  )

  watch(
    calendarMonth,
    () => {
      if (route.name === routeName) void loadCalendar()
    },
    { immediate: true },
  )

  const monthModel = computed<number | null>({
    get: () => month.value,
    set: (value) =>
      void patchQuery({
        month: value === null ? ALL : value === currentMonth ? null : value,
        page: null,
      }),
  })

  const pageModel = computed<number>({
    get: () => page.value,
    set: (value) => void patchQuery({ page: value === 1 ? null : value }),
  })

  function changeMonth(delta: -1 | 1) {
    const next = calendarMonth.value + delta
    if (next >= 1 && next <= 12) monthModel.value = next
  }

  return {
    year,
    month: monthModel,
    calendarMonth,
    page: pageModel,
    selectedDate,
    festivals: computed(() => list.data.value.items),
    meta: computed(() => list.data.value.meta),
    loading: list.loading,
    error: list.error,
    calendarFestivals,
    calendarLoading: calendar.loading,
    changeMonth,
    reload: loadList,
  }
}
