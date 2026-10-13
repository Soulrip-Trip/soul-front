import type { PageParams } from '@soulrip/api/core'

export interface Festival {
  id: number
  contentId: string
  name: string
  title: string
  /** `YYYY-MM-DD`. 일정 미정이면 null */
  startDate: string | null
  /** `YYYY-MM-DD`. 단일일 행사거나 미정이면 null */
  endDate: string | null
  location: string
  addressDetail: string
  district: string | null
  category: string
  description: string
  imageUrl: string
  thumbnailUrl: string
  longitude: number | null
  latitude: number | null
  phone: string
  dateAvailable: boolean
}

export interface FestivalListParams extends PageParams {
  /** 1~12. null이면 전체 */
  month?: number | null
}
