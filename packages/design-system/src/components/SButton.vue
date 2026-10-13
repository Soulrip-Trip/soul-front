<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'
import SSpinner from './SSpinner.vue'
import type { ButtonSize, ButtonVariant } from './types'

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant
    size?: ButtonSize
    /** 내부 이동. 지정하면 RouterLink로 렌더링한다. */
    to?: RouteLocationRaw
    /** 외부 링크. 지정하면 <a>로 렌더링한다. */
    href?: string
    /** 새 탭으로 열기 (href 전용) */
    external?: boolean
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    loading?: boolean
    /** 항상 가로 100% */
    block?: boolean
    /** 480px 미만에서만 가로 100% */
    blockOnMobile?: boolean
  }>(),
  { variant: 'primary', size: 'md', type: 'button', to: undefined, href: undefined },
)

const isInactive = computed(() => props.disabled || props.loading)

const tag = computed(() => {
  if (props.to !== undefined && !isInactive.value) return RouterLink
  if (props.href !== undefined && !isInactive.value) return 'a'
  if (props.to !== undefined || props.href !== undefined) return 'span'
  return 'button'
})

const bindings = computed(() => {
  if (tag.value === RouterLink) return { to: props.to }

  if (tag.value === 'a') {
    return {
      href: props.href,
      target: props.external ? '_blank' : undefined,
      rel: props.external ? 'noopener noreferrer' : undefined,
    }
  }

  if (tag.value === 'span') return { 'aria-disabled': 'true', role: 'link' }

  return {
    type: props.type,
    disabled: isInactive.value,
    'aria-busy': props.loading || undefined,
  }
})
</script>

<template>
  <component
    :is="tag"
    v-bind="bindings"
    class="s-button"
    :class="[
      `s-button--${variant}`,
      `s-button--${size}`,
      {
        's-button--block': block,
        's-button--block-mobile': blockOnMobile,
        'is-inactive': isInactive,
      },
    ]"
  >
    <SSpinner v-if="loading" size="sm" />
    <slot />
  </component>
</template>

<style scoped>
.s-button {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: var(--btn-height);
  padding: 0 var(--btn-pad-x);
  border: 1.5px solid transparent;
  border-radius: var(--btn-radius);
  font-size: var(--btn-font);
  font-weight: var(--fw-extrabold);
  line-height: 1.2;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition:
    transform var(--duration-base) var(--ease-standard),
    box-shadow var(--duration-base) var(--ease-standard),
    background-color var(--duration-base) var(--ease-standard),
    border-color var(--duration-base) var(--ease-standard),
    color var(--duration-base) var(--ease-standard);
}

.s-button :deep(svg) {
  flex-shrink: 0;
}

/* ---- Size ---- */
.s-button--sm {
  --btn-height: 2.25rem;
  --btn-pad-x: var(--space-3-5);
  --btn-font: var(--fs-sm);
  --btn-radius: var(--radius-sm);
}

.s-button--md {
  --btn-height: var(--tap-target);
  --btn-pad-x: var(--space-5);
  --btn-font: 0.9375rem;
  --btn-radius: var(--radius-md);
}

.s-button--lg {
  --btn-height: 3.25rem;
  --btn-pad-x: var(--space-6);
  --btn-font: 1rem;
  --btn-radius: var(--radius-lg);
}

/* ---- Variant ---- */
.s-button--primary {
  color: var(--color-on-primary);
  background: var(--color-primary);
  box-shadow: var(--shadow-primary);
}

.s-button--secondary {
  color: var(--color-primary);
  background: var(--color-primary-soft);
}

.s-button--outline {
  color: var(--color-primary);
  border-color: var(--color-primary);
  background: transparent;
}

.s-button--ghost {
  color: var(--color-text-muted);
  background: transparent;
}

.s-button--danger {
  color: var(--color-danger);
  background: var(--color-danger-soft);
}

@media (hover: hover) {
  .s-button:not(.is-inactive):hover {
    transform: translateY(-1px);
  }

  .s-button--primary:not(.is-inactive):hover {
    background: var(--color-primary-strong);
  }

  .s-button--secondary:not(.is-inactive):hover,
  .s-button--outline:not(.is-inactive):hover {
    background: var(--color-primary-soft);
  }

  .s-button--ghost:not(.is-inactive):hover {
    color: var(--color-primary);
    background: var(--color-primary-softer);
  }
}

.s-button:not(.is-inactive):active {
  transform: translateY(0) scale(0.98);
}

.s-button.is-inactive {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
}

.s-button--block {
  display: flex;
  width: 100%;
}

@media (max-width: 479.98px) {
  .s-button--block-mobile {
    display: flex;
    width: 100%;
  }
}
</style>
