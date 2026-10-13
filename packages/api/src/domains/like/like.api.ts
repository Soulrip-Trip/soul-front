import { http } from '@soulrip/api/core'
import type { LikeResponse, LikeStatusResponse } from './like.types'

/** 로그인 없는 익명 커뮤니티이므로 브라우저별 `client_id`로 좋아요를 식별한다. */
export const likeApi = {
  /** POST /posts/:postId/likes */
  likePost(postId: number, clientId: string) {
    return http.post<LikeResponse>(`/posts/${postId}/likes`, { client_id: clientId })
  },

  /** GET /posts/:postId/likes/status?clientId= */
  async getLikeStatus(postId: number, clientId: string) {
    const result = await http.get<LikeStatusResponse>(`/posts/${postId}/likes/status`, {
      clientId,
    })

    return result.liked
  },
}
