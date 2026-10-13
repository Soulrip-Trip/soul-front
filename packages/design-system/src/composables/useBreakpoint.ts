import { computed } from 'vue'
import { useMediaQuery } from '@soulrip/library/vue'
import { mediaUp, type Breakpoint } from '@soulrip/design-system/tokens'

/**
 * 현재 뷰포트 구간을 반응형으로 제공한다.
 * CSS만으로 처리하기 어려운 경우(표시할 페이지 번호 개수, 모바일 전용 동작 등)에만 사용한다.
 */
export function useBreakpoint() {
  const xsUp = useMediaQuery(mediaUp('xs'))
  const smUp = useMediaQuery(mediaUp('sm'))
  const mdUp = useMediaQuery(mediaUp('md'))
  const lgUp = useMediaQuery(mediaUp('lg'))
  const xlUp = useMediaQuery(mediaUp('xl'))

  const current = computed<Breakpoint | 'base'>(() => {
    if (xlUp.value) return 'xl'
    if (lgUp.value) return 'lg'
    if (mdUp.value) return 'md'
    if (smUp.value) return 'sm'
    if (xsUp.value) return 'xs'
    return 'base'
  })

  return {
    current,
    smUp,
    mdUp,
    lgUp,
    xlUp,
    /** 768px 미만: 하단 탭바, 바텀시트 모달, 전체 화면 챗봇 */
    isMobile: computed(() => !mdUp.value),
    /** 768 ~ 1023px */
    isTablet: computed(() => mdUp.value && !lgUp.value),
    /** 1024px 이상 */
    isDesktop: lgUp,
  }
}
