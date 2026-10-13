import { getCurrentScope, onScopeDispose, toValue, watch, type MaybeRefOrGetter } from 'vue'

type Target = Window | Document | HTMLElement | null | undefined

const noop = () => {}

/** 스코프가 해제될 때 자동으로 정리되는 이벤트 리스너. 대상이 ref면 바뀔 때 다시 연결한다. */
export function useEventListener<K extends keyof WindowEventMap>(
  target: MaybeRefOrGetter<Target>,
  event: K,
  handler: (event: WindowEventMap[K]) => void,
  options?: AddEventListenerOptions,
): () => void {
  let cleanup: () => void = noop

  const stopWatch = watch(
    () => toValue(target),
    (element) => {
      cleanup()
      if (!element) return

      element.addEventListener(event, handler as EventListener, options)
      cleanup = () => element.removeEventListener(event, handler as EventListener, options)
    },
    { immediate: true },
  )

  const stop = () => {
    stopWatch()
    cleanup()
  }

  if (getCurrentScope()) onScopeDispose(stop)

  return stop
}
