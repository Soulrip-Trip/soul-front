import { toValue, watch, type MaybeRefOrGetter } from 'vue'
import { commentApi, type Comment } from '@soulrip/api'
import { useAsyncState } from '@soulrip/library/vue'
import { useI18n } from '@/shared/i18n'

/** 게시글 댓글 목록. 새 댓글은 서버 재조회 없이 목록 끝에 붙인다. */
export function usePostComments(postId: MaybeRefOrGetter<number>) {
  const { t } = useI18n()
  const state = useAsyncState((id: number) => commentApi.getComments(id), [] as Comment[], {
    errorMessage: t.value.comment.loadError,
  })

  watch(
    () => toValue(postId),
    (id) => void state.run(id),
    { immediate: true },
  )

  function append(comment: Comment) {
    state.data.value = [...state.data.value, comment]
  }

  return {
    comments: state.data,
    loading: state.loading,
    error: state.error,
    reload: () => state.run(toValue(postId)),
    append,
  }
}
