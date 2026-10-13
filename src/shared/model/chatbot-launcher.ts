import { readonly, ref } from 'vue'

const open = ref(false)

/**
 * 챗봇 패널 열림 상태. 챗봇 위젯 바깥(여정 지도의 "챗봇 열기" 버튼 등)에서도 열 수 있도록 앱 전역에서 공유한다.
 */
export function useChatbotLauncher() {
  return {
    isOpen: readonly(open),
    openChatbot() {
      open.value = true
    },
    closeChatbot() {
      open.value = false
    },
    toggleChatbot() {
      open.value = !open.value
    },
  }
}
