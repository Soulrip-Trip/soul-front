export interface PaginationMeta {
  total: number
  page: number
  size: number
  pages: number
}

/** 목록 API 공통 응답 형태 */
export interface Paginated<T> {
  items: T[]
  meta: PaginationMeta
}

export interface PageParams {
  page?: number
  size?: number
}

export function emptyPaginationMeta(size: number): PaginationMeta {
  return { total: 0, page: 1, size, pages: 1 }
}
