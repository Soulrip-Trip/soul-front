import type { PageParams } from '@soulrip/api/core'

export type PlaceCategory =
  | 'ALL'
  | 'TOUR'
  | 'LEISURE'
  | 'CULTURE'
  | 'SHOPPING'
  | 'ACCOMMODATION'
  | 'COURSE'
  | 'FESTIVAL'

export interface Place {
  id: number
  contentId: string
  contentTypeId: number
  contentType: string
  title: string
  name: string
  address: string
  addressDetail: string
  district: string | null
  zipcode: string
  phone: string
  longitude: number | null
  latitude: number | null
  mapLevel: number | null
  imageUrl: string
  thumbnailUrl: string
  category: string
  tags: string[]
  soloScore: number | null
  isFeatured: boolean
}

export interface PlaceListParams extends PageParams {
  category?: PlaceCategory
  search?: string
}
