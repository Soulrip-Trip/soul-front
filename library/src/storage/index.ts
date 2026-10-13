/**
 * localStorage 안전 래퍼.
 * 사파리 비공개 모드, 저장소 차단, SSR 환경에서도 예외 없이 동작하도록 모든 접근을 try/catch로 감싼다.
 */

function getStorage(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage
  } catch {
    return null
  }
}

export function readStorage(key: string): string | null {
  try {
    return getStorage()?.getItem(key) ?? null
  } catch {
    return null
  }
}

export function writeStorage(key: string, value: string): void {
  try {
    getStorage()?.setItem(key, value)
  } catch {
    // 저장 실패는 기능에 치명적이지 않으므로 무시한다.
  }
}

export function removeStorage(key: string): void {
  try {
    getStorage()?.removeItem(key)
  } catch {
    // noop
  }
}

/** 키가 없으면 factory 결과를 저장하고 반환한다. */
export function readOrCreateStorage(key: string, factory: () => string): string {
  const saved = readStorage(key)

  if (saved) return saved

  const created = factory()
  writeStorage(key, created)

  return created
}

/** crypto.randomUUID가 없는 구형 브라우저용 폴백을 포함한 UUID v4 생성 */
export function createUuid(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0
    const value = char === 'x' ? random : (random & 0x3) | 0x8

    return value.toString(16)
  })
}
