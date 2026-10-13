/**
 * @soulrip/api — 도메인별 API 클라이언트.
 *
 * 백엔드 라우터 구성과 같은 단위로 나눈다.
 *   place    → /places
 *   festival → /festivals
 *   post     → /posts
 *   comment  → /posts/:id/comments
 *   like     → /posts/:id/likes
 *   chat     → /chat
 *   insight  → /ai-insights
 *
 * 앱에서는 `@soulrip/api`(전체) 또는 `@soulrip/api/place`(도메인 단위)로 가져온다.
 */
export * from '@soulrip/api/core'
export * from '@soulrip/api/place'
export * from '@soulrip/api/festival'
export * from '@soulrip/api/post'
export * from '@soulrip/api/comment'
export * from '@soulrip/api/like'
export * from '@soulrip/api/chat'
export * from '@soulrip/api/insight'
