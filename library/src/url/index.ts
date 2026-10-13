export type QueryValue = string | number | boolean | null | undefined
export type QueryParams = Record<string, QueryValue | QueryValue[]>

/**
 * 객체를 URLSearchParams로 바꾼다.
 * - null / undefined / 빈 문자열은 제외한다.
 * - 문자열은 trim 한다.
 * - 배열은 같은 키로 여러 번 append 한다.
 */
export function toSearchParams(params: QueryParams): URLSearchParams {
  const query = new URLSearchParams()

  for (const [key, raw] of Object.entries(params)) {
    const values = Array.isArray(raw) ? raw : [raw]

    for (const value of values) {
      if (value === null || value === undefined) continue

      const text = typeof value === 'string' ? value.trim() : String(value)

      if (text !== '') query.append(key, text)
    }
  }

  return query
}

/** 경로에 쿼리스트링을 붙인다. 쿼리가 비면 경로만 반환한다. */
export function withQuery(path: string, params: QueryParams = {}): string {
  const query = toSearchParams(params).toString()

  return query ? `${path}?${query}` : path
}

/** vue-router의 `route.query` 값(string | string[] | null)에서 첫 문자열만 꺼낸다. */
export function firstQueryValue(value: unknown): string {
  if (Array.isArray(value)) return typeof value[0] === 'string' ? value[0] : ''

  return typeof value === 'string' ? value : ''
}

/** 쿼리 값을 1 이상의 정수 페이지 번호로 해석한다. */
export function toPageNumber(value: unknown, fallback = 1): number {
  const page = Number.parseInt(firstQueryValue(value), 10)

  return Number.isFinite(page) && page > 0 ? page : fallback
}
