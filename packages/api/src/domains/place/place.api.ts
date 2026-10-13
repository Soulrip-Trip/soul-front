import { http, type Paginated } from '@soulrip/api/core'
import type { Place, PlaceCategory, PlaceListParams } from './place.types'

/** 프론트 카테고리 → 한국관광공사 contentTypeId 매핑 (백엔드 `contentType` 쿼리) */
export const PLACE_CATEGORY_CONTENT_TYPES: Record<Exclude<PlaceCategory, 'ALL'>, string[]> = {
  TOUR: ['12'],
  LEISURE: ['28'],
  CULTURE: ['14'],
  SHOPPING: ['38'],
  ACCOMMODATION: ['32'],
  COURSE: ['25'],
  FESTIVAL: ['15'],
}

export const placeApi = {
  /** GET /places */
  getPlaces({ category, search, page, size }: PlaceListParams = {}) {
    return http.get<Paginated<Place>>('/places', {
      contentType: category && category !== 'ALL' ? PLACE_CATEGORY_CONTENT_TYPES[category] : [],
      q: search,
      page,
      size,
    })
  },

  /** GET /places/:id — 목록 카드는 contentId로 링크한다. */
  getPlace(id: string | number) {
    return http.get<Place>(`/places/${encodeURIComponent(String(id))}`)
  },
}
