import { computed, toValue, watch, type MaybeRefOrGetter } from 'vue'
import { placeApi, type Place } from '@soulrip/api'
import { useAsyncState } from '@soulrip/library/vue'
import { placeCategoryLabel, placeCoordinates, placeDetailImage, placeName } from '@/entities/place'
import { completeJourneyStep } from '@/entities/journey'
import { useI18n } from '@/shared/i18n'

/** 장소 상세. id는 목록 카드에서 넘어온 contentId다. */
export function usePlaceDetail(id: MaybeRefOrGetter<string>) {
  const { t } = useI18n()
  const state = useAsyncState(
    (placeId: string) => placeApi.getPlace(placeId),
    null as Place | null,
    {
      errorMessage: t.value.place.detail.errorTitle,
      keepDataOnError: false,
    },
  )

  watch(
    () => toValue(id),
    (placeId) => void state.run(placeId),
    { immediate: true },
  )

  const place = state.data

  // 혼행 여정 미션: 장소 상세 1곳 열어보기
  watch(place, (value) => value && completeJourneyStep('discover'))

  const view = computed(() => {
    const value = place.value
    if (!value) return null

    const name = placeName(value) || t.value.place.fallbackName
    const category = placeCategoryLabel(value, t.value)
    const tags = value.tags ?? []

    return {
      name,
      category,
      image: placeDetailImage(value),
      coordinates: placeCoordinates(value),
      tags,
      // 백엔드에 소개 필드가 없어 분류·태그로 요약 문장을 만든다.
      summary: [
        t.value.place.detail.summary(category, name),
        tags.length ? t.value.place.detail.tagsSummary(tags.join(', ')) : '',
      ]
        .filter(Boolean)
        .join(' '),
      address: [value.address, value.addressDetail].filter(Boolean).join(' '),
    }
  })

  return {
    place,
    view,
    loading: state.loading,
    error: state.error,
    reload: () => state.run(toValue(id)),
  }
}
