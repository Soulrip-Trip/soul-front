import { http } from '@soulrip/api/core'
import type { Comment, CommentPayload } from './comment.types'

export const commentApi = {
  /** GET /posts/:postId/comments */
  getComments(postId: number) {
    return http.get<Comment[]>(`/posts/${postId}/comments`)
  },

  /** POST /posts/:postId/comments — 성공 시 화면의 commentCount도 함께 올려야 한다. */
  createComment(postId: number, payload: CommentPayload) {
    return http.post<Comment>(`/posts/${postId}/comments`, payload)
  },
}
