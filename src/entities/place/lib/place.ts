import type { Place } from '@soulrip/api'
import { firstFilled, toLatLng, type LatLng } from '@soulrip/library'
import type { Messages } from '@/shared/i18n'
import { resolvePlaceCategory } from '../model/category'

export function placeName(place: Place): string {
  return firstFilled(place.name, place.title)
}

/** 목록 카드는 가벼운 썸네일을 우선한다. */
export function placeListImage(place: Place): string {
  return firstFilled(place.thumbnailUrl, place.imageUrl)
}

/** 상세 화면은 원본 이미지를 우선한다. */
export function placeDetailImage(place: Place): string {
  return firstFilled(place.imageUrl, place.thumbnailUrl)
}

export function placeCoordinates(place: Place): LatLng | null {
  return toLatLng(place.latitude, place.longitude)
}

/** 현재 언어의 카테고리 이름. 알 수 없는 분류는 원문을 그대로 보여준다. */
export function placeCategoryLabel(place: Place, t: Messages): string {
  const code = resolvePlaceCategory(place)

  return code ? t.place.categoryLabels[code] : place.category || t.place.fallbackCategory
}
