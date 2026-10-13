import { getCurrentScope, onScopeDispose, toValue, watch, type MaybeRefOrGetter } from 'vue'

let lockCount = 0
let previousOverflow = ''

function lock() {
  if (lockCount === 0) {
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }
  lockCount += 1
}

function unlock() {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) document.body.style.overflow = previousOverflow
}

/**
 * `locked`가 true인 동안 body 스크롤을 막는다. (모달, 전체 화면 시트)
 * 여러 곳에서 동시에 잠가도 마지막 해제 시점에만 원래 상태로 복원한다.
 */
export function useScrollLock(locked: MaybeRefOrGetter<boolean>): void {
  if (typeof document === 'undefined') return

  let active = false

  const apply = (next: boolean) => {
    if (next === active) return
    active = next
    if (next) lock()
    else unlock()
  }

  watch(() => toValue(locked), apply, { immediate: true })

  if (getCurrentScope()) onScopeDispose(() => apply(false))
}
