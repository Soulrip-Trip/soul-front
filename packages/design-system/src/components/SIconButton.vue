<script setup lang="ts">
withDefaults(
  defineProps<{
    /** 아이콘만 있는 버튼이므로 접근성 이름이 반드시 필요하다. */
    label: string
    variant?: 'ghost' | 'outline' | 'secondary' | 'primary' | 'inverse'
    size?: 'sm' | 'md' | 'lg'
    type?: 'button' | 'submit'
    disabled?: boolean
    pressed?: boolean
  }>(),
  { variant: 'outline', size: 'md', type: 'button', pressed: undefined },
)
</script>

<template>
  <button
    class="s-icon-button"
    :class="[`s-icon-button--${variant}`, `s-icon-button--${size}`]"
    :type="type"
    :disabled="disabled"
    :aria-label="label"
    :title="label"
    :aria-pressed="pressed"
  >
    <slot />
  </button>
</template>

<style scoped>
.s-icon-button {
  display: inline-grid;
  flex-shrink: 0;
  place-items: center;
  width: var(--icon-btn-size);
  height: var(--icon-btn-size);
  padding: 0;
  border: 1px solid transparent;
  border-radius: 50%;
  transition:
    color var(--duration-base) var(--ease-standard),
    background-color var(--duration-base) var(--ease-standard),
    transform var(--duration-base) var(--ease-standard);
}

.s-icon-button--sm {
  --icon-btn-size: 2.25rem;
}

.s-icon-button--md {
  --icon-btn-size: 2.5rem;
}

.s-icon-button--lg {
  --icon-btn-size: var(--tap-target);
}

/* 터치 기기에서는 최소 44px 터치 영역을 보장한다. */
@media (pointer: coarse) {
  .s-icon-button--sm,
  .s-icon-button--md {
    --icon-btn-size: var(--tap-target);
  }
}

.s-icon-button--ghost {
  color: var(--color-text-muted);
  background: transparent;
}

.s-icon-button--outline {
  color: var(--color-text);
  border-color: var(--color-border);
  background: var(--color-surface);
}

.s-icon-button--secondary {
  color: var(--color-primary);
  background: var(--color-primary-soft);
}

.s-icon-button--primary {
  color: var(--color-on-primary);
  background: var(--color-primary);
}

.s-icon-button--inverse {
  color: #fff;
  background: rgb(255 255 255 / 0.14);
}

@media (hover: hover) {
  .s-icon-button:not(:disabled):hover {
    color: var(--color-primary);
    background: var(--color-primary-soft);
  }

  .s-icon-button--primary:not(:disabled):hover {
    color: var(--color-on-primary);
    background: var(--color-primary-strong);
  }

  .s-icon-button--inverse:not(:disabled):hover {
    color: #fff;
    background: rgb(255 255 255 / 0.24);
  }
}

.s-icon-button:disabled {
  opacity: 0.45;
}
</style>
