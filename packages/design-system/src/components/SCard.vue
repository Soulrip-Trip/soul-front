<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

const props = withDefaults(
  defineProps<{
    as?: 'div' | 'article' | 'section' | 'aside' | 'li'
    /** 지정하면 카드 전체가 링크가 된다. */
    to?: RouteLocationRaw
    /** 반응형 안쪽 여백: none | sm(1~1.25rem) | md(1.25~1.75rem) | lg(1.375~2.375rem) */
    padding?: 'none' | 'sm' | 'md' | 'lg'
    tone?: 'default' | 'soft' | 'sunken'
    /** hover 시 떠오르는 효과 */
    interactive?: boolean
  }>(),
  { as: 'div', padding: 'md', tone: 'default', to: undefined },
)

const tag = computed(() => (props.to !== undefined ? RouterLink : props.as))
</script>

<template>
  <component
    :is="tag"
    :to="to"
    class="s-card"
    :class="[
      `s-card--pad-${padding}`,
      `s-card--${tone}`,
      { 's-card--interactive': interactive || to !== undefined },
    ]"
  >
    <slot />
  </component>
</template>

<style scoped>
.s-card {
  display: block;
  min-width: 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  color: inherit;
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.s-card--soft {
  border-color: transparent;
  background: var(--color-primary-soft);
  box-shadow: none;
}

.s-card--sunken {
  background: var(--color-surface-alt);
  box-shadow: none;
}

.s-card--pad-none {
  padding: 0;
  overflow: hidden;
}

.s-card--pad-sm {
  padding: var(--space-4);
}

.s-card--pad-md {
  padding: var(--space-5);
}

.s-card--pad-lg {
  padding: var(--space-5) var(--space-4);
  border-radius: var(--radius-xl);
}

@media (min-width: 480px) {
  .s-card--pad-sm {
    padding: var(--space-5);
  }

  .s-card--pad-lg {
    padding: var(--space-7) var(--space-6);
  }
}

@media (min-width: 768px) {
  .s-card--pad-md {
    padding: var(--space-7);
  }

  .s-card--pad-lg {
    padding: var(--space-10) var(--space-10);
    border-radius: var(--radius-2xl);
  }
}

.s-card--interactive {
  transition:
    transform var(--duration-base) var(--ease-standard),
    box-shadow var(--duration-base) var(--ease-standard),
    border-color var(--duration-base) var(--ease-standard);
}

@media (hover: hover) {
  .s-card--interactive:hover {
    border-color: color-mix(in srgb, var(--color-primary) 28%, var(--color-border));
    box-shadow: var(--shadow-md);
    transform: translateY(-4px);
  }
}

.s-card--interactive:active {
  transform: scale(0.99);
}
</style>
