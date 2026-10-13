import { onScopeDispose, ref, toValue, watch, type MaybeRefOrGetter } from 'vue'

export interface ScrollSpyOptions {
  /** false인 동안은 관찰하지 않는다. (예: 데스크톱에서만 사용) */
  enabled?: MaybeRefOrGetter<boolean>
  /**
   * 활성 판정 영역. 기본값은 화면 세로 45%~50% 사이의 얇은 띠로,
   * 요소가 화면 가운데를 지날 때 활성화된다.
   */
  rootMargin?: string
}

/**
 * 스크롤 위치에 따라 현재 보고 있는 요소의 인덱스를 추적한다. (스크롤 스토리텔링, 목차 하이라이트)
 * 요소 목록 길이나 enabled가 바뀌면 다시 관찰한다.
 */
export function useScrollSpy(
  targets: MaybeRefOrGetter<HTMLElement[]>,
  options: ScrollSpyOptions = {},
) {
  const activeIndex = ref(-1)
  let observer: IntersectionObserver | null = null

  function disconnect() {
    observer?.disconnect()
    observer = null
  }

  const stop = watch(
    () => [toValue(options.enabled ?? true), toValue(targets).length] as const,
    ([enabled]) => {
      disconnect()
      const elements = toValue(targets)
      if (!enabled || elements.length === 0 || typeof IntersectionObserver === 'undefined') return

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            const index = elements.indexOf(entry.target as HTMLElement)
            if (index >= 0) activeIndex.value = index
          }
        },
        { rootMargin: options.rootMargin ?? '-45% 0px -50% 0px' },
      )

      for (const element of elements) observer.observe(element)
    },
    { immediate: true, flush: 'post' },
  )

  onScopeDispose(() => {
    stop()
    disconnect()
  })

  return { activeIndex }
}
