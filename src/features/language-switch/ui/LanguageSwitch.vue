<script setup lang="ts">
import { computed, nextTick, ref, useId } from 'vue'
import { Check, ChevronDown, Languages } from 'lucide-vue-next'
import { LANGUAGES, type Lang } from '@soulrip/config'
import { useEventListener } from '@soulrip/library/vue'
import { useI18n } from '@/shared/i18n'
import { useAppSettings } from '@/shared/model'

const { lang, setLang } = useAppSettings()
const { t } = useI18n()

const open = ref(false)
const root = ref<HTMLElement | null>(null)
const menuId = `language-menu-${useId()}`

const current = computed(() => LANGUAGES.find((language) => language.code === lang.value))

function toggle() {
  open.value = !open.value
  if (open.value) {
    void nextTick(() => root.value?.querySelector<HTMLElement>('[aria-checked="true"]')?.focus())
  }
}

function select(code: Lang) {
  setLang(code)
  open.value = false
}

// 바깥 클릭 / ESC로 닫기
useEventListener(
  () => (open.value ? document : null),
  'pointerdown',
  (event) => {
    if (!root.value?.contains(event.target as Node)) open.value = false
  },
)
useEventListener(
  () => (open.value ? document : null),
  'keydown',
  (event) => {
    if (event.key === 'Escape') open.value = false
  },
)
</script>

<template>
  <!--
    1024px 이상: 아이콘 + 언어 이름(한국어, English…)
    1024px 미만: 아이콘 + 언어 코드(KO, EN…)로 줄여 헤더 공간 확보
  -->
  <div ref="root" class="language-switch">
    <button
      class="language-switch__trigger"
      type="button"
      :aria-label="`${t.nav.language}: ${current?.label}`"
      :aria-expanded="open"
      :aria-controls="menuId"
      aria-haspopup="menu"
      @click="toggle"
    >
      <Languages :size="16" aria-hidden="true" />
      <span class="language-switch__label">{{ current?.label }}</span>
      <span class="language-switch__code">{{ lang.toUpperCase() }}</span>
      <ChevronDown
        :size="15"
        class="language-switch__chevron"
        :class="{ 'is-open': open }"
        aria-hidden="true"
      />
    </button>

    <Transition name="language-switch">
      <div v-if="open" :id="menuId" class="language-switch__menu" role="menu">
        <button
          v-for="language in LANGUAGES"
          :key="language.code"
          type="button"
          role="menuitemradio"
          class="language-switch__option"
          :aria-checked="language.code === lang"
          :lang="language.code"
          @click="select(language.code)"
        >
          {{ language.label }}
          <Check v-if="language.code === lang" :size="16" aria-hidden="true" />
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.language-switch {
  position: relative;
}

.language-switch__trigger {
  display: inline-flex;
  height: 2.5rem;
  align-items: center;
  gap: var(--space-1-5);
  padding: 0 var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  color: var(--color-text);
  background: var(--color-surface);
  font-size: var(--fs-sm);
  font-weight: var(--fw-extrabold);
  white-space: nowrap;
}

@media (pointer: coarse) {
  .language-switch__trigger {
    height: var(--tap-target);
  }
}

@media (hover: hover) {
  .language-switch__trigger:hover {
    color: var(--color-primary);
    background: var(--color-primary-soft);
  }
}

.language-switch__label {
  display: none;
}

@media (min-width: 1024px) {
  .language-switch__label {
    display: inline;
  }

  .language-switch__code {
    display: none;
  }
}

.language-switch__chevron {
  transition: transform var(--duration-base) var(--ease-standard);
}

.language-switch__chevron.is-open {
  transform: rotate(180deg);
}

.language-switch__menu {
  position: absolute;
  top: calc(100% + var(--space-2));
  right: 0;
  z-index: var(--z-dropdown);
  display: grid;
  min-width: 11rem;
  padding: var(--space-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-lg);
}

.language-switch__option {
  display: flex;
  min-height: var(--tap-target);
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: 0 var(--space-3);
  border: 0;
  border-radius: var(--radius-sm);
  color: var(--color-text);
  background: transparent;
  font-weight: var(--fw-bold);
  text-align: left;
}

.language-switch__option:hover,
.language-switch__option:focus-visible,
.language-switch__option[aria-checked='true'] {
  color: var(--color-primary);
  background: var(--color-primary-soft);
}

.language-switch-enter-active,
.language-switch-leave-active {
  transition:
    opacity var(--duration-fast) var(--ease-standard),
    transform var(--duration-fast) var(--ease-standard);
}

.language-switch-enter-from,
.language-switch-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
