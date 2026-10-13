<script setup lang="ts">
withDefaults(
  defineProps<{
    tone?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | 'solid' | 'glass'
    size?: 'sm' | 'md'
  }>(),
  { tone: 'primary', size: 'md' },
)
</script>

<template>
  <span class="s-badge" :class="[`s-badge--${tone}`, `s-badge--${size}`]">
    <slot />
  </span>
</template>

<style scoped>
.s-badge {
  display: inline-flex;
  max-width: 100%;
  align-items: center;
  gap: var(--space-1-5);
  border-radius: var(--radius-pill);
  font-weight: var(--fw-extrabold);
  line-height: 1.2;
  white-space: nowrap;
}

.s-badge :deep(svg) {
  flex-shrink: 0;
}

.s-badge--sm {
  padding: var(--space-1) var(--space-2-5);
  font-size: var(--fs-xs);
}

.s-badge--md {
  padding: var(--space-1-5) var(--space-3);
  font-size: var(--fs-sm);
}

.s-badge--primary {
  color: var(--color-primary);
  background: var(--color-primary-soft);
}

.s-badge--neutral {
  color: var(--color-text-muted);
  background: var(--color-surface-sunken);
}

.s-badge--success {
  color: var(--color-success);
  background: var(--color-success-soft);
}

.s-badge--warning {
  color: var(--color-warning);
  background: var(--color-warning-soft);
}

.s-badge--danger {
  color: var(--color-danger);
  background: var(--color-danger-soft);
}

.s-badge--solid {
  color: var(--color-on-primary);
  background: color-mix(in srgb, var(--color-primary) 92%, transparent);
  box-shadow: 0 4px 12px rgb(30 53 145 / 0.2);
}

/* 사진 위에 올리는 반투명 배지 */
.s-badge--glass {
  color: #fff;
  background: rgb(255 255 255 / 0.18);
  backdrop-filter: blur(8px);
}
</style>
