import type { Lang } from '@soulrip/config'

export interface ChatHistoryItem {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatSource {
  type: string
  id: string
  title: string
  subtitle: string
  image_url: string
}

export interface ChatRequest {
  message: string
  /** 최근 대화 기록 */
  history: ChatHistoryItem[]
  /** 답변 언어 */
  language: Lang
}

export interface ChatResponse {
  answer: string
  sources: ChatSource[]
  suggestions: string[]
  used_ai: boolean
}
