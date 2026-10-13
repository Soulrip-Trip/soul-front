import type { Component } from 'vue'
import { Bookmark, Bot, CalendarDays, Compass, MessageCircleHeart } from 'lucide-vue-next'
import { paths } from '@/shared/config'

export type JourneyStepId = 'discover' | 'save' | 'plan' | 'ask' | 'share'

export type JourneyAction = { type: 'link'; to: string } | { type: 'chatbot' }

export interface JourneyStep {
  id: JourneyStepId
  icon: Component
  /** 미션 바로가기 동작 */
  action: JourneyAction
}

/**
 * 혼행 미션. Discover → Plan → Share 서비스 흐름을 5개 미션으로 나눈다.
 * 배열 순서가 곧 화면 표시 순서다.
 */
export const JOURNEY_STEPS: readonly JourneyStep[] = [
  { id: 'discover', icon: Compass, action: { type: 'link', to: paths.placeList() } },
  { id: 'save', icon: Bookmark, action: { type: 'link', to: paths.placeList() } },
  { id: 'plan', icon: CalendarDays, action: { type: 'link', to: paths.festivalList() } },
  { id: 'ask', icon: Bot, action: { type: 'chatbot' } },
  { id: 'share', icon: MessageCircleHeart, action: { type: 'link', to: paths.postList() } },
]

export const JOURNEY_TOTAL = JOURNEY_STEPS.length

export function isJourneyStepId(value: unknown): value is JourneyStepId {
  return JOURNEY_STEPS.some((step) => step.id === value)
}
