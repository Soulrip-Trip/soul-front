import { computed, reactive, ref, toValue, type MaybeRefOrGetter } from 'vue'
import { commentApi, type Comment } from '@soulrip/api'
import { toErrorMessage } from '@soulrip/library'
import { completeJourneyStep } from '@/entities/journey'
import { useI18n } from '@/shared/i18n'

export const COMMENT_RULES = {
  nicknameMax: 20,
  passwordMax: 30,
  contentMax: 500,
} as const

/**
 * 댓글 작성 폼. 성공하면 onCreated로 새 댓글을 넘긴다.
 * 호출부는 목록에 추가하고 commentCount를 함께 올려 두 값이 어긋나지 않게 한다.
 */
export function useCommentForm(
  postId: MaybeRefOrGetter<number>,
  onCreated: (comment: Comment) => void,
) {
  const { t } = useI18n()

  const form = reactive({ nickname: '', password: '', content: '' })
  const submitting = ref(false)
  const error = ref('')

  const canSubmit = computed(
    () =>
      !submitting.value &&
      form.nickname.trim() !== '' &&
      form.password.trim() !== '' &&
      form.content.trim() !== '',
  )

  async function submit() {
    if (submitting.value) return

    if (!canSubmit.value) {
      error.value = t.value.comment.required
      return
    }

    submitting.value = true
    error.value = ''

    try {
      const created = await commentApi.createComment(toValue(postId), {
        nickname: form.nickname.trim(),
        password: form.password,
        content: form.content.trim(),
      })
      onCreated(created)
      completeJourneyStep('share')
      // 연속 작성 편의를 위해 닉네임·비밀번호는 유지하고 내용만 비운다.
      form.content = ''
    } catch (caught) {
      error.value = toErrorMessage(caught, t.value.comment.submitError)
    } finally {
      submitting.value = false
    }
  }

  return { form, submitting, error, canSubmit, submit }
}
