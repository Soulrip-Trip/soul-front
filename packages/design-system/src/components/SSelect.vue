<script setup lang="ts" generic="T extends string | number">
import { ChevronDown } from 'lucide-vue-next'

defineOptions({ inheritAttrs: false })

defineProps<{
  options: Array<{ value: T; label: string }>
  invalid?: boolean
}>()

const model = defineModel<T>({ required: true })
</script>

<template>
  <div class="s-select">
    <select
      v-bind="$attrs"
      v-model="model"
      class="s-select__control"
      :class="{ 'is-invalid': invalid }"
      :aria-invalid="invalid || undefined"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <ChevronDown class="s-select__icon" :size="18" aria-hidden="true" />
  </div>
</template>

<style scoped>
.s-select {
  position: relative;
}

.s-select__control {
  width: 100%;
  height: 3rem;
  padding: 0 var(--space-10) 0 var(--space-4);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  outline: none;
  color: var(--color-text);
  background: var(--color-surface);
  appearance: none;
  cursor: pointer;
  transition:
    border-color var(--duration-base) var(--ease-standard),
    box-shadow var(--duration-base) var(--ease-standard);
}

.s-select__control:focus {
  border-color: var(--color-primary);
  box-shadow: var(--focus-ring);
}

.s-select__control.is-invalid {
  border-color: var(--color-danger);
}

.s-select__icon {
  position: absolute;
  top: 50%;
  right: var(--space-3-5);
  color: var(--color-text-subtle);
  transform: translateY(-50%);
  pointer-events: none;
}
</style>
