import { API_BASE_URL } from '@soulrip/config'
import { createHttpClient } from './http'

/** 앱 전체가 공유하는 기본 HTTP 클라이언트 */
export const http = createHttpClient({ baseUrl: API_BASE_URL })
