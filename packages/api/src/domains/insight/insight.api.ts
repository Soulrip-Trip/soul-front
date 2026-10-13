import { http } from '@soulrip/api/core'
import type { TodayInsightResponse } from './insight.types'

export const insightApi = {
  /** POST /ai-insights/today — AI 분석을 트리거하므로 POST다. */
  getTodayInsight() {
    return http.post<TodayInsightResponse>('/ai-insights/today')
  },
}
