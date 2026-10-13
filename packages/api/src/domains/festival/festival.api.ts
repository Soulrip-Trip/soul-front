import { http, type Paginated } from '@soulrip/api/core'
import type { Festival, FestivalListParams } from './festival.types'

export const festivalApi = {
  /** GET /festivals */
  getFestivals({ month, page, size }: FestivalListParams = {}) {
    return http.get<Paginated<Festival>>('/festivals', {
      month: month || undefined,
      page,
      size,
    })
  },

  /** GET /festivals/:contentId */
  getFestival(contentId: string) {
    return http.get<Festival>(`/festivals/${encodeURIComponent(contentId)}`)
  },
}
