import type { Component } from 'vue'
import { MessageCircle, NotebookPen, UsersRound, Utensils } from 'lucide-vue-next'
import type { PostType, WritablePostType } from '@soulrip/api'
import type { Messages } from '@/shared/i18n'

const POST_TYPE_ICONS: Record<PostType, Component> = {
  ALL: MessageCircle,
  FOOD: Utensils,
  REVIEW: NotebookPen,
  COMPANION: UsersRound,
  GENERAL: MessageCircle,
}

/** 목록 필터 순서 */
export const POST_FILTER_TYPES: readonly PostType[] = [
  'ALL',
  'FOOD',
  'REVIEW',
  'COMPANION',
  'GENERAL',
]

/** 작성 폼 선택지 순서 */
export const WRITABLE_POST_TYPES: readonly WritablePostType[] = [
  'FOOD',
  'REVIEW',
  'COMPANION',
  'GENERAL',
]

export function isPostType(value: unknown): value is PostType {
  return typeof value === 'string' && (POST_FILTER_TYPES as readonly string[]).includes(value)
}

export function isWritablePostType(value: unknown): value is WritablePostType {
  return typeof value === 'string' && (WRITABLE_POST_TYPES as readonly string[]).includes(value)
}

export function postTypeIcon(type: string): Component {
  return isPostType(type) ? POST_TYPE_ICONS[type] : MessageCircle
}

export function postTypeLabel(type: string, t: Messages): string {
  return isPostType(type) ? t.post.types[type] : t.post.fallbackType
}
