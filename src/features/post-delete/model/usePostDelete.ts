import { ref, toValue, watch, type MaybeRefOrGetter } from 'vue'
import { postApi } from '@soulrip/api'
import { toErrorMessage } from '@soulrip/library'
import { useI18n } from '@/shared/i18n'

/** 비밀번호 확인 후 게시글을 삭제한다. 비밀번호는 요청에만 쓰고 저장하지 않는다. */
export function usePostDelete(postId: MaybeRefOrGetter<number>, onDeleted: () => void) {
  const { t } = useI18n()

  const open = ref(false)
  const password = ref('')
  const pending = ref(false)
  const error = ref('')

  // 닫을 때 입력값과 오류를 비운다.
  watch(open, (isOpen) => {
    if (!isOpen) {
      password.value = ''
      error.value = ''
    }
  })

  async function submit() {
    if (!password.value || pending.value) return

    pending.value = true
    error.value = ''

    try {
      await postApi.deletePost(toValue(postId), password.value)
      open.value = false
      onDeleted()
    } catch (caught) {
      error.value = toErrorMessage(caught, t.value.post.remove.error)
    } finally {
      pending.value = false
    }
  }

  return { open, password, pending, error, submit }
}
