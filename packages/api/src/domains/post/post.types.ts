import type { PageParams } from '@soulrip/api/core'

export type PostType = 'ALL' | 'GENERAL' | 'FOOD' | 'REVIEW' | 'COMPANION'

/** 작성 가능한 게시글 유형 (`ALL`은 목록 필터 전용) */
export type WritablePostType = Exclude<PostType, 'ALL'>

export interface CommunityPost {
  id: number
  type: string
  title: string
  content: string
  nickname: string
  tags: string[]
  views: number
  likes: number
  commentCount: number
  createdAt: string
  updatedAt: string
}

export interface PostPayload {
  type: string
  title: string
  content: string
  nickname: string
  password: string
  tags: string[]
}

export interface PostListParams extends PageParams {
  postType?: PostType
  search?: string
}
