import { getCurrentScope, onScopeDispose, readonly, ref, type Ref } from 'vue'

/** CSS 미디어 쿼리 일치 여부를 반응형으로 추적한다. */
export function useMediaQuery(query: string): Readonly<Ref<boolean>> {
  const matches = ref(false)

  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return readonly(matches)
  }

  const mediaQuery = window.matchMedia(query)
  const update = () => {
    matches.value = mediaQuery.matches
  }

  update()
  mediaQuery.addEventListener('change', update)

  if (getCurrentScope()) {
    onScopeDispose(() => mediaQuery.removeEventListener('change', update))
  }

  return readonly(matches)
}
