export type ShareResult = 'shared' | 'copied' | 'cancelled' | 'failed'

export interface ShareData {
  title?: string
  text?: string
  url: string
}

/**
 * Web Share API가 있으면 공유 시트를 열고, 없으면 URL을 클립보드에 복사한다.
 * 사용자가 공유 시트를 닫은 경우는 'cancelled'로 구분한다.
 */
export async function shareOrCopy(data: ShareData): Promise<ShareResult> {
  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      await navigator.share(data)
      return 'shared'
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return 'cancelled'
    }
  }

  return (await copyText(data.url)) ? 'copied' : 'failed'
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/** 사용자가 OS에서 '동작 줄이기'를 켰는지 */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function prefersDarkScheme(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
}
