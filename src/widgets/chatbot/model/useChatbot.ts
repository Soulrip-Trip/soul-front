import { computed, ref } from 'vue'
import { chatApi, type ChatHistoryItem, type ChatSource } from '@soulrip/api'
import { CHAT_HISTORY_LIMIT } from '@soulrip/config'
import { useI18n } from '@/shared/i18n'

export interface ChatMessage {
  id: number
  role: ChatHistoryItem['role']
  content: string
  /** 인사말은 언어가 바뀌면 다시 번역되도록 내용 대신 종류로 표시한다. */
  kind?: 'greeting' | 'error'
  sources?: ChatSource[]
}

let nextId = 1
const greeting = (): ChatMessage => ({
  id: nextId++,
  role: 'assistant',
  content: '',
  kind: 'greeting',
})

/**
 * 챗봇 대화 상태.
 * - 요청에는 메시지, 최근 대화 기록(CHAT_HISTORY_LIMIT개), 현재 언어를 함께 보낸다.
 * - 로딩 중에는 중복 전송을 막는다.
 * - 인사말·오류 문구는 언어 전환 시 즉시 현재 언어로 다시 표시된다.
 */
export function useChatbot() {
  const { t, lang } = useI18n()

  const messages = ref<ChatMessage[]>([greeting()])
  const input = ref('')
  const loading = ref(false)
  const suggestions = ref<string[]>([])

  /** 화면 표시용 문구 (인사말/오류는 현재 언어로) */
  function textOf(message: ChatMessage): string {
    if (message.kind === 'greeting') return t.value.chat.greeting
    if (message.kind === 'error') return t.value.chat.error
    return message.content
  }

  /** 서버가 제안한 후속 질문이 있으면 그것을, 없으면 기본 추천 질문을 보여준다. */
  const quickQuestions = computed(() =>
    suggestions.value.length ? suggestions.value : t.value.chat.quick,
  )

  async function send(text = input.value) {
    const message = text.trim()
    if (!message || loading.value) return

    messages.value.push({ id: nextId++, role: 'user', content: message })
    input.value = ''
    loading.value = true

    const history: ChatHistoryItem[] = messages.value
      .slice(-CHAT_HISTORY_LIMIT)
      .map((item) => ({ role: item.role, content: textOf(item) }))

    try {
      const result = await chatApi.sendMessage({ message, history, language: lang.value })

      messages.value.push({
        id: nextId++,
        role: 'assistant',
        content: result.answer,
        sources: result.sources ?? [],
      })
      suggestions.value = result.suggestions ?? []
    } catch {
      messages.value.push({ id: nextId++, role: 'assistant', content: '', kind: 'error' })
    } finally {
      loading.value = false
    }
  }

  function reset() {
    if (loading.value) return
    messages.value = [greeting()]
    suggestions.value = []
    input.value = ''
  }

  return { messages, input, loading, quickQuestions, textOf, send, reset }
}
