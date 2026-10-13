import type { Component } from 'vue'
import { House, Map, MessageCircle, PartyPopper } from 'lucide-vue-next'
import { paths } from './routes'

export interface NavItem {
  to: string
  /** t.nav의 키 */
  labelKey: 'home' | 'explore' | 'festival' | 'community'
  icon: Component
}

/** 상단 내비게이션(768px 이상) — 홈은 로고가 대신한다. */
export const HEADER_NAV: readonly NavItem[] = [
  { to: paths.placeList(), labelKey: 'explore', icon: Map },
  { to: paths.festivalList(), labelKey: 'festival', icon: PartyPopper },
  { to: paths.postList(), labelKey: 'community', icon: MessageCircle },
]

/** 하단 탭바(768px 미만) */
export const TAB_NAV: readonly NavItem[] = [
  { to: paths.home(), labelKey: 'home', icon: House },
  ...HEADER_NAV,
]

/** 현재 경로가 메뉴 경로(또는 그 하위)인지. 홈은 정확히 일치할 때만 활성. */
export function isNavActive(currentPath: string, to: string): boolean {
  if (to === '/') return currentPath === '/'

  // 장소 상세(/places/:id)는 '서울 탐색' 메뉴에 속한다.
  if (to === paths.placeList() && currentPath.startsWith('/places/')) return true

  return currentPath === to || currentPath.startsWith(`${to}/`)
}
