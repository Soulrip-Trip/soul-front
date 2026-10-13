import { http, type Paginated } from '@soulrip/api/core'
import type { CommunityPost, PostListParams, PostPayload } from './post.types'

export const postApi = {
  /** GET /posts — 백엔드는 페이지 크기를 `limit`으로 받는다. */
  getPosts({ postType, search, page, size }: PostListParams = {}) {
    return http.get<Paginated<CommunityPost>>('/posts', {
      type: postType && postType !== 'ALL' ? postType : undefined,
      q: search,
      page,
      limit: size,
    })
  },

  /** GET /posts/:id */
  getPost(id: number) {
    return http.get<CommunityPost>(`/posts/${id}`)
  },

  /** POST /posts */
  createPost(payload: PostPayload) {
    return http.post<CommunityPost>('/posts', payload)
  },

  /** PATCH /posts/:id — 작성 시 입력한 비밀번호가 payload에 포함되어야 한다. */
  updatePost(id: number, payload: PostPayload) {
    return http.patch<CommunityPost>(`/posts/${id}`, payload)
  },

  /** DELETE /posts/:id?password= — 백엔드가 password를 쿼리 파라미터로 요구한다. */
  deletePost(id: number, password: string) {
    return http.delete<void>(`/posts/${id}`, { password })
  },
}
