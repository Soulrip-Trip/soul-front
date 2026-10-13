<script setup lang="ts">
defineOptions({ inheritAttrs: false })

withDefaults(
  defineProps<{
    type?: 'text' | 'password' | 'search' | 'email' | 'tel' | 'url' | 'number'
    invalid?: boolean
    size?: 'md' | 'lg'
  }>(),
  { type: 'text', size: 'md' },
)

const model = defineModel<string>({ default: '' })
</script>

<template>
  <div
    class="s-input"
    :class="[`s-input--${size}`, { 'is-invalid': invalid, 'has-leading': $slots.leading }]"
  >
    <span v-if="$slots.leading" class="s-input__leading" aria-hidden="true">
      <slot name="leading" />
    </span>
    <input
      v-bind="$attrs"
      v-model="model"
      class="s-input__control"
      :type="type"
      :aria-invalid="invalid || undefined"
    />
    <span v-if="$slots.trailing" class="s-input__trailing">
      <slot name="trailing" />
    </span>
  </div>
</template>

<style scoped>
.s-input {
  display: flex;
  align-items: center;
  gap: var(--space-2-5);
  min-height: var(--input-height);
  padding-inline: var(--space-4);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  transition:
    border-color var(--duration-base) var(--ease-standard),
    box-shadow var(--duration-base) var(--ease-standard);
}

.s-input--md {
  --input-height: 3rem;
}

.s-input--lg {
  --input-height: 3.375rem;

  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.s-input:focus-within {
  border-color: var(--color-primary);
  box-shadow: var(--focus-ring);
}

.s-input.is-invalid {
  border-color: var(--color-danger);
}

.s-input__leading,
.s-input__trailing {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  color: var(--color-primary);
}

.s-input__control {
  width: 100%;
  min-width: 0;
  height: calc(var(--input-height) - 3px);
  padding: 0;
  border: 0;
  outline: none;
  color: var(--color-text);
  background: transparent;
}

.s-input__control::placeholder {
  color: var(--color-text-subtle);
  opacity: 1;
}

.s-input__control:focus-visible {
  outline: none;
}

/* 브라우저 기본 검색 지우기 버튼 숨김 (SSearchField가 자체 버튼 제공) */
.s-input__control::-webkit-search-cancel-button {
  appearance: none;
}
</style>
