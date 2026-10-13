type FastApiErrorItem = {
  loc?: Array<string | number>
  msg?: string
  type?: string
}

export type ApiErrorBody = {
  detail?: string | FastApiErrorItem[]
  message?: string
}

export const DEFAULT_ERROR_MESSAGE = '요청 처리 중 오류가 발생했습니다.'
export const NETWORK_ERROR_MESSAGE = '서버에 연결하지 못했습니다. 네트워크 상태를 확인해 주세요.'

/**
 * API 오류. `Error`를 상속하므로 기존처럼 `error.message`를 그대로 화면에 노출할 수 있고,
 * 필요하면 `status`로 분기할 수 있다. (네트워크 오류는 status 0)
 */
export class ApiError extends Error {
  readonly status: number
  readonly body: ApiErrorBody | null

  constructor(message: string, status: number, body: ApiErrorBody | null = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

/** FastAPI 오류 응답(detail 문자열 / 검증 오류 배열 / message)을 사람이 읽을 문장으로 바꾼다. */
export function toApiErrorMessage(body: ApiErrorBody | null): string {
  if (!body) return DEFAULT_ERROR_MESSAGE

  if (typeof body.detail === 'string') return body.detail

  if (Array.isArray(body.detail)) {
    return body.detail
      .map((item) => {
        const field = item.loc?.at(-1)
        const message = item.msg || '요청 값이 올바르지 않습니다.'

        return field ? `${String(field)}: ${message}` : message
      })
      .join('\n')
  }

  if (typeof body.message === 'string') return body.message

  return DEFAULT_ERROR_MESSAGE
}
