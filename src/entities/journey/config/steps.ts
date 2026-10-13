import type { Component } from 'vue'
import { Bookmark, Bot, CalendarDays, Compass, MessageCircleHeart } from 'lucide-vue-next'
import { paths } from '@/shared/config'

export type JourneyStepId = 'discover' | 'save' | 'plan' | 'ask' | 'share'
export type JourneyPhaseId = 'discover' | 'plan' | 'share'

export type JourneyAction = { type: 'link'; to: string } | { type: 'chatbot' }

export interface JourneyStep {
  id: JourneyStepId
  phase: JourneyPhaseId
  icon: Component
  /** 미션 바로가기 동작 */
  action: JourneyAction
}

/**
 * 혼행 여정 단계. Discover → Plan → Share 서비스 흐름을 5개 미션으로 나눈다.
 * 순서가 곧 지도 번호(01~05)다.
 */
export const JOURNEY_STEPS: readonly JourneyStep[] = [
  {
    id: 'discover',
    phase: 'discover',
    icon: Compass,
    action: { type: 'link', to: paths.placeList() },
  },
  {
    id: 'save',
    phase: 'discover',
    icon: Bookmark,
    action: { type: 'link', to: paths.placeList() },
  },
  {
    id: 'plan',
    phase: 'plan',
    icon: CalendarDays,
    action: { type: 'link', to: paths.festivalList() },
  },
  { id: 'ask', phase: 'plan', icon: Bot, action: { type: 'chatbot' } },
  {
    id: 'share',
    phase: 'share',
    icon: MessageCircleHeart,
    action: { type: 'link', to: paths.postList() },
  },
]

/** 지도의 세 갈래. 라벨은 브랜드 용어라 영문 고정, 보조 라벨은 다국어 사전 사용 */
export const JOURNEY_PHASES: ReadonlyArray<{ id: JourneyPhaseId; code: string }> = [
  { id: 'discover', code: 'DISCOVER' },
  { id: 'plan', code: 'PLAN' },
  { id: 'share', code: 'SHARE' },
]

export const JOURNEY_TOTAL = JOURNEY_STEPS.length

export function isJourneyStepId(value: unknown): value is JourneyStepId {
  return JOURNEY_STEPS.some((step) => step.id === value)
}
