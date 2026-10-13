import { ref, shallowRef, type Ref, type ShallowRef } from 'vue'
import { toErrorMessage } from '@soulrip/library/async'

export interface AsyncState<T, Args extends unknown[]> {
  data: ShallowRef<T>
  loading: Ref<boolean>
  /** 사용자에게 보여줄 오류 메시지. 오류가 없으면 빈 문자열. */
  error: Ref<string>
  /** 요청을 실행한다. 늦게 도착한 이전 요청의 응답은 무시한다. 성공 여부를 반환한다. */
  run: (...args: Args) => Promise<boolean>
}

export interface AsyncStateOptions {
  /** 오류에 message가 없을 때 쓸 문구 */
  errorMessage?: string
  /** 실패 시 이전 data를 유지할지 (기본 true) */
  keepDataOnError?: boolean
}

/**
 * 로딩 · 오류 · 데이터 상태를 한 번에 관리한다.
 * 필터를 빠르게 바꿀 때 이전 요청이 나중에 도착해 화면을 덮어쓰는 경쟁 상태를 막는다.
 */
export function useAsyncState<T, Args extends unknown[] = []>(
  fetcher: (...args: Args) => Promise<T>,
  initial: T,
  options: AsyncStateOptions = {},
): AsyncState<T, Args> {
  const { errorMessage = '요청 처리 중 오류가 발생했습니다.', keepDataOnError = true } = options

  const data = shallowRef(initial) as ShallowRef<T>
  const loading = ref(false)
  const error = ref('')
  let requestId = 0

  async function run(...args: Args): Promise<boolean> {
    const current = ++requestId

    loading.value = true
    error.value = ''

    try {
      const result = await fetcher(...args)

      if (current !== requestId) return false

      data.value = result
      return true
    } catch (caught) {
      if (current !== requestId) return false

      error.value = toErrorMessage(caught, errorMessage)
      if (!keepDataOnError) data.value = initial
      return false
    } finally {
      if (current === requestId) loading.value = false
    }
  }

  return { data, loading, error, run }
}
