import { withQuery, type QueryParams } from '@soulrip/library'
import { ApiError, NETWORK_ERROR_MESSAGE, toApiErrorMessage, type ApiErrorBody } from './errors'

export interface RequestOptions extends Omit<RequestInit, 'body'> {
  /** 쿼리스트링. null/undefined/빈 문자열 값은 자동으로 빠진다. */
  query?: QueryParams
  /** JSON으로 직렬화할 요청 본문 */
  json?: unknown
}

export interface HttpClient {
  request<T>(path: string, options?: RequestOptions): Promise<T>
  get<T>(path: string, query?: QueryParams): Promise<T>
  post<T>(path: string, json?: unknown): Promise<T>
  patch<T>(path: string, json?: unknown): Promise<T>
  delete<T>(path: string, query?: QueryParams): Promise<T>
}

export interface HttpClientConfig {
  baseUrl: string
}

/** fetch 기반 HTTP 클라이언트. 모든 도메인 API는 이 클라이언트 하나를 공유한다. */
export function createHttpClient({ baseUrl }: HttpClientConfig): HttpClient {
  async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { query, json, headers, ...init } = options
    const hasBody = json !== undefined

    let response: Response

    try {
      response = await fetch(`${baseUrl}${withQuery(path, query)}`, {
        ...init,
        headers: {
          Accept: 'application/json',
          ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
          ...headers,
        },
        body: hasBody ? JSON.stringify(json) : undefined,
      })
    } catch (error) {
      // 요청 취소는 호출부에서 구분할 수 있도록 그대로 던진다.
      if (error instanceof DOMException && error.name === 'AbortError') throw error

      throw new ApiError(NETWORK_ERROR_MESSAGE, 0)
    }

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as ApiErrorBody | null

      throw new ApiError(toApiErrorMessage(body), response.status, body)
    }

    if (response.status === 204) return undefined as T

    return (await response.json()) as T
  }

  return {
    request,
    get: (path, query) => request(path, { method: 'GET', query }),
    post: (path, json) => request(path, { method: 'POST', json }),
    patch: (path, json) => request(path, { method: 'PATCH', json }),
    delete: (path, query) => request(path, { method: 'DELETE', query }),
  }
}
