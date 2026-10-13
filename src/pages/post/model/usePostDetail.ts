import { toValue, watch, type MaybeRefOrGetter } from 'vue'
import { postApi, type CommunityPost } from '@soulrip/api'
import { useAsyncState } from '@soulrip/library/vue'
import { useI18n } from '@/shared/i18n'

/**
 * 게시글 상세. 좋아요 상태와 댓글은 각각 feature/widget이 따로 불러오므로
 * 그 요청이 실패해도 본문은 그대로 보인다. (기존에는 좋아요 상태 조회 실패 시 본문까지 실패)
 */
export function usePostDetail(id: MaybeRefOrGetter<number>) {
  const { t } = useI18n()
  const state = useAsyncState(
    (postId: number) => postApi.getPost(postId),
    null as CommunityPost | null,
    {
      errorMessage: t.value.post.detail.errorTitle,
      keepDataOnError: false,
    },
  )

  watch(
    () => toValue(id),
    (postId) => void state.run(postId),
    { immediate: true },
  )

  /** 좋아요 수 갱신 */
  function setLikes(count: number) {
    if (state.data.value) state.data.value = { ...state.data.value, likes: count }
  }

  /** 댓글 작성 성공 시 목록과 commentCount를 맞춘다. */
  function incrementCommentCount() {
    if (state.data.value) {
      state.data.value = { ...state.data.value, commentCount: state.data.value.commentCount + 1 }
    }
  }

  return {
    post: state.data,
    loading: state.loading,
    error: state.error,
    reload: () => state.run(toValue(id)),
    setLikes,
    incrementCommentCount,
  }
}
