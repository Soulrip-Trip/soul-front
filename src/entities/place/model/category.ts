import type { Component } from 'vue'
import {
  BedDouble,
  Building2,
  Dumbbell,
  Globe,
  Landmark,
  PartyPopper,
  Route,
  ShoppingBag,
} from 'lucide-vue-next'
import type { Place, PlaceCategory } from '@soulrip/api'

/** 화면 표시용 카테고리 코드. 필터 카테고리 + 백엔드가 내려줄 수 있는 추가 분류 */
export type PlaceCategoryCode = Exclude<PlaceCategory, 'ALL'> | 'FOOD' | 'CAFE' | 'NATURE'

/** 장소 목록 필터 순서와 아이콘 */
export const PLACE_FILTERS: ReadonlyArray<{ key: PlaceCategory; icon: Component }> = [
  { key: 'ALL', icon: Globe },
  { key: 'TOUR', icon: Landmark },
  { key: 'LEISURE', icon: Dumbbell },
  { key: 'CULTURE', icon: Building2 },
  { key: 'SHOPPING', icon: ShoppingBag },
  { key: 'ACCOMMODATION', icon: BedDouble },
  { key: 'COURSE', icon: Route },
  { key: 'FESTIVAL', icon: PartyPopper },
]

/** 한국관광공사 contentTypeId → 카테고리 */
const CONTENT_TYPE_ID_TO_CODE: Record<number, PlaceCategoryCode> = {
  12: 'TOUR',
  14: 'CULTURE',
  15: 'FESTIVAL',
  25: 'COURSE',
  28: 'LEISURE',
  32: 'ACCOMMODATION',
  38: 'SHOPPING',
  39: 'FOOD',
}

/** 백엔드 category 문자열(영문 코드 또는 한글 분류명) → 카테고리 */
const CATEGORY_VALUE_TO_CODE: Record<string, PlaceCategoryCode> = {
  TOUR: 'TOUR',
  LEISURE: 'LEISURE',
  CULTURE: 'CULTURE',
  SHOPPING: 'SHOPPING',
  ACCOMMODATION: 'ACCOMMODATION',
  COURSE: 'COURSE',
  FESTIVAL: 'FESTIVAL',
  FOOD: 'FOOD',
  CAFE: 'CAFE',
  NATURE: 'NATURE',
  관광지: 'TOUR',
  레포츠: 'LEISURE',
  문화시설: 'CULTURE',
  쇼핑: 'SHOPPING',
  숙박: 'ACCOMMODATION',
  여행코스: 'COURSE',
  축제공연행사: 'FESTIVAL',
  음식점: 'FOOD',
}

const FILTER_KEYS = new Set<string>(PLACE_FILTERS.map((filter) => filter.key))

export function isPlaceCategory(value: unknown): value is PlaceCategory {
  return typeof value === 'string' && FILTER_KEYS.has(value)
}

/** contentTypeId를 우선하고, 없으면 category 문자열로 분류를 판단한다. */
export function resolvePlaceCategory(
  place: Pick<Place, 'category' | 'contentTypeId'>,
): PlaceCategoryCode | null {
  return (
    CONTENT_TYPE_ID_TO_CODE[place.contentTypeId] ?? CATEGORY_VALUE_TO_CODE[place.category] ?? null
  )
}
