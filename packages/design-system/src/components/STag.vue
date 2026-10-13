<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    /** 앞에 # 표시 */
    hash?: boolean
    size?: 'sm' | 'md'
  }>(),
  { hash: true, size: 'sm' },
)
</script>

<template>
  <span class="s-tag ds-ellipsis" :class="`s-tag--${size}`">{{ hash ? '#' : '' }}{{ label }}</span>
</template>

<style scoped>
.s-tag {
  display: inline-block;
  max-width: 100%;
  border-radius: var(--radius-pill);
  color: var(--color-primary);
  background: var(--color-primary-soft);
  font-weight: var(--fw-bold);
  line-height: 1.4;
}

.s-tag--sm {
  padding: var(--space-0-5) var(--space-2-5);
  font-size: var(--fs-xs);
}

.s-tag--md {
  padding: var(--space-1) var(--space-3);
  font-size: var(--fs-sm);
}
</style>
