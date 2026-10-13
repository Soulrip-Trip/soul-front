export interface Comment {
  id: number
  post_id: number
  content: string
  nickname: string
  createdAt: string
  updatedAt: string
}

export interface CommentPayload {
  nickname: string
  password: string
  content: string
}
