export type Lang = 'ko' | 'en' | 'ja' | 'zh' | 'fr' | 'es' | 'de'

export interface LanguageOption {
  code: Lang
  /** 언어 선택 UI에 노출하는 자국어 이름 */
  label: string
  /** 날짜·숫자 포맷에 쓰는 BCP 47 로케일 */
  locale: string
}

export const LANGUAGES: readonly LanguageOption[] = [
  { code: 'ko', label: '한국어', locale: 'ko-KR' },
  { code: 'en', label: 'English', locale: 'en-US' },
  { code: 'ja', label: '日本語', locale: 'ja-JP' },
  { code: 'zh', label: '中文', locale: 'zh-CN' },
  { code: 'fr', label: 'Français', locale: 'fr-FR' },
  { code: 'es', label: 'Español', locale: 'es-ES' },
  { code: 'de', label: 'Deutsch', locale: 'de-DE' },
]

export const DEFAULT_LANG: Lang = 'ko'

export function isLang(value: unknown): value is Lang {
  return LANGUAGES.some((language) => language.code === value)
}

export function localeOf(lang: Lang): string {
  return LANGUAGES.find((language) => language.code === lang)?.locale ?? 'ko-KR'
}
