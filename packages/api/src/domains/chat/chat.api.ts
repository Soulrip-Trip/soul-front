import { http } from '@soulrip/api/core'
import type { ChatRequest, ChatResponse } from './chat.types'

export const chatApi = {
  /** POST /chat — 메시지, 최근 대화 기록, 현재 언어를 함께 보낸다. */
  sendMessage(request: ChatRequest) {
    return http.post<ChatResponse>('/chat', request)
  },
}
