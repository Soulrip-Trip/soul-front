import { computed } from 'vue'
import { localeOf, type Lang } from '@soulrip/config'
import { useAppSettings } from '@/shared/model'
import de from './locales/de'
import en from './locales/en'
import es from './locales/es'
import fr from './locales/fr'
import ja from './locales/ja'
import ko, { type Messages } from './locales/ko'
import zh from './locales/zh'

const dictionaries: Record<Lang, Messages> = { ko, en, ja, zh, fr, es, de }

/**
 * 현재 언어의 사전과 로케일을 반환한다.
 *
 * @example
 * const { t, locale } = useI18n()
 * t.value.place.list.title
 * t.value.post.list.total(12)
 * formatDateTime(post.createdAt, locale.value)
 */
export function useI18n() {
  const { lang } = useAppSettings()

  return {
    t: computed(() => dictionaries[lang.value]),
    lang,
    locale: computed(() => localeOf(lang.value)),
  }
}

export type { Messages }
