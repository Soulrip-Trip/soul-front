<script setup lang="ts">
import { computed } from 'vue'
import { initialOf } from '@soulrip/library/string'

const props = withDefaults(
  defineProps<{
    name: string
    size?: 'sm' | 'md'
  }>(),
  { size: 'md' },
)

const initial = computed(() => initialOf(props.name))
</script>

<template>
  <span class="s-avatar" :class="`s-avatar--${size}`" aria-hidden="true">{{ initial }}</span>
</template>

<style scoped>
.s-avatar {
  display: inline-grid;
  flex-shrink: 0;
  place-items: center;
  border-radius: 50%;
  color: var(--color-primary);
  background: var(--color-primary-soft);
  font-weight: var(--fw-extrabold);
}

.s-avatar--sm {
  width: 2rem;
  height: 2rem;
  font-size: var(--fs-xs);
}

.s-avatar--md {
  width: 2.5rem;
  height: 2.5rem;
  font-size: var(--fs-sm);
}
</style>
