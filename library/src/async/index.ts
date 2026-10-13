export interface Debounced<Args extends unknown[]> {
  (...args: Args): void
  cancel(): void
}

/** 마지막 호출 후 `wait`ms 동안 추가 호출이 없을 때 한 번만 실행한다. */
export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  wait: number,
): Debounced<Args> {
  let timer: ReturnType<typeof setTimeout> | undefined

  const debounced = (...args: Args) => {
    if (timer !== undefined) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = undefined
      fn(...args)
    }, wait)
  }

  debounced.cancel = () => {
    if (timer !== undefined) clearTimeout(timer)
    timer = undefined
  }

  return debounced
}

/** unknown 오류를 사용자에게 보여줄 메시지로 바꾼다. `Error.message`를 우선 보존한다. */
export function toErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) return error.message
  if (typeof error === 'string' && error) return error

  return fallback
}
