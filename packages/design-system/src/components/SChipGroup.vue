<script setup lang="ts" generic="T extends string | number | null">
import type { ChipOption } from './types'

withDefaults(
  defineProps<{
    options: ChipOption<T>[]
    /** 그룹의 접근성 이름 */
    label: string
    /**
     * 768px 미만에서 줄바꿈 대신 가로 스크롤 한 줄로 표시한다. (기본 true)
     * 태블릿 이상에서는 여러 줄로 감싼다.
     */
    scrollOnMobile?: boolean
    size?: 'sm' | 'md'
  }>(),
  { scrollOnMobile: true, size: 'md' },
)

const model = defineModel<T>({ required: true })
</script>

<template>
  <div
    class="s-chip-group"
    :class="{ 's-chip-group--scroll': scrollOnMobile }"
    role="group"
    :aria-label="label"
  >
    <button
      v-for="option in options"
      :key="String(option.value)"
      type="button"
      class="s-chip"
      :class="[`s-chip--${size}`, { 'is-active': model === option.value }]"
      :aria-pressed="model === option.value"
      @click="model = option.value"
    >
      <component :is="option.icon" v-if="option.icon" :size="15" aria-hidden="true" />
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
.s-chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

@media (max-width: 767.98px) {
  .s-chip-group--scroll {
    flex-wrap: nowrap;
    margin-inline: calc(var(--gutter) * -1);
    padding: var(--space-0-5) var(--gutter) var(--space-1);
    overflow-x: auto;
    overscroll-behavior-x: contain;
    scroll-padding-inline: var(--gutter);
    scroll-snap-type: x proximity;
    scrollbar-width: none;
  }

  .s-chip-group--scroll::-webkit-scrollbar {
    display: none;
  }

  .s-chip-group--scroll .s-chip {
    flex-shrink: 0;
    scroll-snap-align: start;
  }
}

.s-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-1-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  color: var(--color-text-muted);
  background: var(--color-surface);
  font-weight: var(--fw-bold);
  line-height: 1.2;
  white-space: nowrap;
  transition:
    color var(--duration-base) var(--ease-standard),
    background-color var(--duration-base) var(--ease-standard),
    border-color var(--duration-base) var(--ease-standard),
    box-shadow var(--duration-base) var(--ease-standard);
}

.s-chip--sm {
  min-height: 2.25rem;
  padding: 0 var(--space-3-5);
  font-size: var(--fs-sm);
}

.s-chip--md {
  min-height: 2.5rem;
  padding: 0 var(--space-4);
  font-size: var(--fs-sm);
}

@media (pointer: coarse) {
  .s-chip--md {
    min-height: var(--tap-target);
  }
}

@media (hover: hover) {
  .s-chip:not(.is-active):hover {
    color: var(--color-primary);
    border-color: var(--color-border-strong);
    background: var(--color-primary-softer);
  }
}

.s-chip.is-active {
  color: var(--color-on-primary);
  border-color: var(--color-primary);
  background: var(--color-primary);
  box-shadow: var(--shadow-primary);
}
</style>
