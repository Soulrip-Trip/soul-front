<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
    /** 스크린리더용 문구. 비우면 장식용으로 취급한다. */
    label?: string
  }>(),
  { size: 'md', label: '' },
)
</script>

<template>
  <span
    class="s-spinner"
    :class="`s-spinner--${size}`"
    :role="label ? 'status' : undefined"
    :aria-hidden="label ? undefined : 'true'"
  >
    <span v-if="label" class="ds-sr-only">{{ label }}</span>
  </span>
</template>

<style scoped>
.s-spinner {
  display: inline-block;
  flex-shrink: 0;
  width: var(--spinner-size);
  height: var(--spinner-size);
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: ds-spin 0.7s linear infinite;
}

.s-spinner--sm {
  --spinner-size: 1rem;
}

.s-spinner--md {
  --spinner-size: 1.5rem;
}

.s-spinner--lg {
  --spinner-size: 2.25rem;

  border-width: 3px;
}
</style>
