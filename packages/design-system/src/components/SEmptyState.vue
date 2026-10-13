<script setup lang="ts">
import { AlertCircle, Inbox } from 'lucide-vue-next'
import SSpinner from './SSpinner.vue'

withDefaults(
  defineProps<{
    /** empty: 결과 없음 / error: 실패 / loading: 불러오는 중 */
    tone?: 'empty' | 'error' | 'loading'
    title: string
    description?: string
    /** 테두리·배경 없이 */
    plain?: boolean
    compact?: boolean
  }>(),
  { tone: 'empty', description: '' },
)
</script>

<template>
  <div
    class="s-empty"
    :class="[`s-empty--${tone}`, { 's-empty--plain': plain, 's-empty--compact': compact }]"
    :role="tone === 'error' ? 'alert' : tone === 'loading' ? 'status' : undefined"
    :aria-busy="tone === 'loading' || undefined"
  >
    <span class="s-empty__icon" aria-hidden="true">
      <slot name="icon">
        <SSpinner v-if="tone === 'loading'" size="lg" />
        <AlertCircle v-else-if="tone === 'error'" :size="30" />
        <Inbox v-else :size="30" />
      </slot>
    </span>

    <strong class="s-empty__title">{{ title }}</strong>
    <p v-if="description" class="s-empty__description">{{ description }}</p>

    <div v-if="$slots.actions" class="s-empty__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<style scoped>
.s-empty {
  display: flex;
  min-height: 15rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-10) var(--space-5);
  border: 1px dashed var(--color-border-strong);
  border-radius: var(--radius-xl);
  color: var(--color-text-muted);
  background: var(--color-surface);
  text-align: center;
}

.s-empty--plain {
  border: 0;
  background: transparent;
}

.s-empty--compact {
  min-height: 0;
  padding: var(--space-8) var(--space-4);
}

.s-empty__icon {
  display: grid;
  width: 3.5rem;
  height: 3.5rem;
  margin-bottom: var(--space-1);
  place-items: center;
  border-radius: 50%;
  color: var(--color-primary);
  background: var(--color-primary-soft);
}

.s-empty--error .s-empty__icon {
  color: var(--color-danger);
  background: var(--color-danger-soft);
}

.s-empty--loading .s-empty__icon {
  background: transparent;
}

.s-empty__title {
  color: var(--color-text);
  font-size: var(--fs-body);
  font-weight: var(--fw-extrabold);
  word-break: var(--word-break);
}

.s-empty__description {
  max-width: 32rem;
  font-size: var(--fs-sm);
  line-height: var(--lh-body);
  white-space: pre-line;
  word-break: var(--word-break);
}

.s-empty__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-2);
  margin-top: var(--space-3);
}
</style>
