<script setup lang="ts">
import { computed } from 'vue'
import { useDsMessages } from '@soulrip/design-system/locale'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    invalid?: boolean
    rows?: number
    maxlength?: number
    /** maxlength가 있을 때 글자 수 표시 */
    showCount?: boolean
  }>(),
  { rows: 6, maxlength: undefined },
)

const model = defineModel<string>({ default: '' })
const messages = useDsMessages()

const countText = computed(() =>
  props.maxlength ? messages.value.count(model.value.length, props.maxlength) : '',
)
</script>

<template>
  <div class="s-textarea">
    <textarea
      v-bind="$attrs"
      v-model="model"
      class="s-textarea__control"
      :class="{ 'is-invalid': invalid }"
      :rows="rows"
      :maxlength="maxlength"
      :aria-invalid="invalid || undefined"
    />
    <span v-if="showCount && maxlength" class="s-textarea__count" aria-live="polite">
      {{ countText }}
    </span>
  </div>
</template>

<style scoped>
.s-textarea {
  display: grid;
  gap: var(--space-1-5);
}

.s-textarea__control {
  width: 100%;
  min-height: 8rem;
  padding: var(--space-3-5) var(--space-4);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-md);
  outline: none;
  color: var(--color-text);
  background: var(--color-surface);
  line-height: var(--lh-body);
  resize: vertical;
  transition:
    border-color var(--duration-base) var(--ease-standard),
    box-shadow var(--duration-base) var(--ease-standard);
}

.s-textarea__control::placeholder {
  color: var(--color-text-subtle);
}

.s-textarea__control:focus {
  border-color: var(--color-primary);
  box-shadow: var(--focus-ring);
}

.s-textarea__control.is-invalid {
  border-color: var(--color-danger);
}

.s-textarea__count {
  justify-self: end;
  color: var(--color-text-subtle);
  font-size: var(--fs-xs);
  font-weight: var(--fw-bold);
}
</style>
