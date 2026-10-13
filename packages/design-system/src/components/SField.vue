<script setup lang="ts">
import { computed, useId } from 'vue'

const props = defineProps<{
  label: string
  /** 입력 아래 도움말 */
  hint?: string
  /** 오류 메시지. 있으면 hint 대신 표시하고 aria-invalid를 켠다. */
  error?: string
  required?: boolean
  /** 라벨을 시각적으로 숨긴다(스크린리더에는 읽힘). */
  hideLabel?: boolean
  /** 직접 id를 지정할 때 */
  id?: string
}>()

const generatedId = useId()
const inputId = computed(() => props.id ?? `field-${generatedId}`)
const messageId = computed(() => `${inputId.value}-message`)
const describedBy = computed(() => (props.error || props.hint ? messageId.value : undefined))
</script>

<template>
  <div class="s-field" :class="{ 'has-error': Boolean(error) }">
    <label class="s-field__label" :class="{ 'ds-sr-only': hideLabel }" :for="inputId">
      {{ label }}
      <span v-if="required" class="s-field__required" aria-hidden="true">*</span>
    </label>

    <slot :id="inputId" :described-by="describedBy" :invalid="Boolean(error)" />

    <p v-if="error" :id="messageId" class="s-field__message s-field__message--error" role="alert">
      {{ error }}
    </p>
    <p v-else-if="hint" :id="messageId" class="s-field__message">{{ hint }}</p>
  </div>
</template>

<style scoped>
.s-field {
  display: grid;
  gap: var(--space-2);
  min-width: 0;
}

.s-field__label {
  color: var(--color-text);
  font-size: var(--fs-sm);
  font-weight: var(--fw-extrabold);
}

.s-field__required {
  margin-left: var(--space-0-5);
  color: var(--color-danger);
}

.s-field__message {
  color: var(--color-text-subtle);
  font-size: var(--fs-xs);
  line-height: var(--lh-snug);
}

.s-field__message--error {
  color: var(--color-danger);
  font-weight: var(--fw-bold);
}
</style>
