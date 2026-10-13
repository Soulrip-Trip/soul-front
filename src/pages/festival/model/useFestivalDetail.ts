import { computed, toValue, watch, type MaybeRefOrGetter } from 'vue'
import { festivalApi, type Festival } from '@soulrip/api'
import { useAsyncState } from '@soulrip/library/vue'
import {
  festivalCoordinates,
  festivalDetailImage,
  festivalName,
  formatFestivalPeriod,
} from '@/entities/festival'
import { completeJourneyStep } from '@/entities/journey'
import { useI18n } from '@/shared/i18n'

export function useFestivalDetail(contentId: MaybeRefOrGetter<string>) {
  const { t, locale } = useI18n()
  const state = useAsyncState(
    (id: string) => festivalApi.getFestival(id),
    null as Festival | null,
    { errorMessage: t.value.festival.detail.errorTitle, keepDataOnError: false },
  )

  watch(
    () => toValue(contentId),
    (id) => void state.run(id),
    { immediate: true },
  )

  const festival = state.data

  // 혼행 여정 미션: 축제 상세 1개 확인하기
  watch(festival, (value) => value && completeJourneyStep('plan'))

  const view = computed(() => {
    const value = festival.value
    if (!value) return null

    const name = festivalName(value) || t.value.festival.fallbackName

    return {
      name,
      image: festivalDetailImage(value),
      period: formatFestivalPeriod(value, locale.value) ?? t.value.festival.noSchedule,
      coordinates: festivalCoordinates(value),
      /** 커뮤니티 동행 모집 글쓰기로 넘길 쿼리 (startDate가 없으면 date 생략) */
      companionQuery: {
        type: 'COMPANION',
        place: name,
        ...(value.startDate ? { date: value.startDate.slice(0, 10) } : {}),
      },
    }
  })

  return {
    festival,
    view,
    loading: state.loading,
    error: state.error,
    reload: () => state.run(toValue(contentId)),
  }
}
