import { getCurrentScope, onScopeDispose, watch, type WatchSource } from 'vue'
import { debounce } from '@soulrip/library/async'

/** source가 바뀐 뒤 `wait`ms 동안 추가 변경이 없을 때 callback을 실행한다. */
export function watchDebounced<T>(
  source: WatchSource<T>,
  callback: (value: T) => void,
  wait: number,
): () => void {
  const debounced = debounce(callback, wait)
  const stopWatch = watch(source, (value) => debounced(value))

  const stop = () => {
    stopWatch()
    debounced.cancel()
  }

  if (getCurrentScope()) onScopeDispose(stop)

  return stop
}
