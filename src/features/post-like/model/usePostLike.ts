import { ref, toValue, watch, type MaybeRefOrGetter } from 'vue'
import { likeApi } from '@soulrip/api'
import { toErrorMessage } from '@soulrip/library'
import { completeJourneyStep } from '@/entities/journey'
import { useI18n } from '@/shared/i18n'
import { getClientId } from '../lib/client-id'

/**
 * 게시글 좋아요 상태와 동작.
 * - 상태 조회 실패는 화면 전체를 막지 않도록 조용히 "좋아요 안 함"으로 처리한다.
 * - 이미 좋아요했거나 요청 중이면 중복 요청을 막는다.
 */
export function usePostLike(postId: MaybeRefOrGetter<number>, onLiked: (count: number) => void) {
  const { t } = useI18n()

  const liked = ref(false)
  const pending = ref(false)
  const error = ref('')

  async function loadStatus(id: number) {
    try {
      liked.value = await likeApi.getLikeStatus(id, getClientId())
    } catch {
      liked.value = false
    }
  }

  async function like() {
    if (liked.value || pending.value) return

    pending.value = true
    error.value = ''

    try {
      const result = await likeApi.likePost(toValue(postId), getClientId())
      liked.value = result.liked
      onLiked(result.likesCount)
      completeJourneyStep('share')
    } catch (caught) {
      error.value = toErrorMessage(caught, t.value.post.like.error)
    } finally {
      pending.value = false
    }
  }

  watch(() => toValue(postId), loadStatus, { immediate: true })

  return { liked, pending, error, like }
}
