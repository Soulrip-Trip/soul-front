import { computed, reactive, watch } from 'vue'
import { DEFAULT_LANG, STORAGE_KEYS, isLang, type Lang } from '@soulrip/config'
import { prefersDarkScheme, readStorage, writeStorage } from '@soulrip/library'

export type Theme = 'light' | 'dark'

/** 저장된 언어 → 브라우저 언어 → 한국어 순으로 초기 언어를 정한다. (외국인 첫 방문 대응) */
function detectInitialLang(): Lang {
  const saved = readStorage(STORAGE_KEYS.lang)
  if (isLang(saved)) return saved

  const browserLanguages = typeof navigator === 'undefined' ? [] : navigator.languages
  for (const language of browserLanguages) {
    const code = language.slice(0, 2).toLowerCase()
    if (isLang(code)) return code
  }

  return DEFAULT_LANG
}

/** 저장된 테마 → OS 다크 모드 설정 순으로 초기 테마를 정한다. */
function detectInitialTheme(): Theme {
  const saved = readStorage(STORAGE_KEYS.theme)
  if (saved === 'light' || saved === 'dark') return saved

  return prefersDarkScheme() ? 'dark' : 'light'
}

const state = reactive<{ theme: Theme; lang: Lang }>({
  theme: detectInitialTheme(),
  lang: detectInitialLang(),
})

watch(
  () => state.theme,
  (theme) => {
    document.documentElement.dataset.theme = theme
    writeStorage(STORAGE_KEYS.theme, theme)
  },
  { immediate: true },
)

watch(
  () => state.lang,
  (lang) => {
    document.documentElement.lang = lang
    writeStorage(STORAGE_KEYS.lang, lang)
  },
  { immediate: true },
)

/** 앱 전역 설정(테마, 언어). 모듈 스코프 상태이므로 어디서 호출해도 같은 값을 공유한다. */
export function useAppSettings() {
  return {
    theme: computed(() => state.theme),
    lang: computed(() => state.lang),
    isDark: computed(() => state.theme === 'dark'),
    toggleTheme() {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    setLang(lang: Lang) {
      state.lang = lang
    },
  }
}
