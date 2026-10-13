<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    /** 제목 위 배지 문구 */
    eyebrow?: string
    description?: string
    /** 페이지 제목이면 h1 */
    as?: 'h1' | 'h2'
  }>(),
  { eyebrow: '', description: '', as: 'h2' },
)
</script>

<template>
  <!--
    768px 미만: 제목 → 설명 → 액션 버튼이 세로로 쌓인다.
    768px 이상: 왼쪽 제목 영역, 오른쪽 하단 정렬 액션 버튼.
  -->
  <header class="s-section-header">
    <div class="s-section-header__text">
      <span v-if="eyebrow" class="s-section-header__eyebrow">
        <slot name="icon" />
        {{ eyebrow }}
      </span>
      <component :is="as" class="s-section-header__title" :class="as === 'h1' ? 'ds-h1' : 'ds-h2'">
        {{ title }}
      </component>
      <p v-if="description" class="s-section-header__description">{{ description }}</p>
    </div>

    <div v-if="$slots.actions" class="s-section-header__actions">
      <slot name="actions" />
    </div>
  </header>
</template>

<style scoped>
.s-section-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

@media (min-width: 768px) {
  .s-section-header {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--space-6);
    margin-bottom: var(--space-7);
  }
}

.s-section-header__text {
  display: grid;
  min-width: 0;
  justify-items: start;
  gap: var(--space-2-5);
}

.s-section-header__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1-5);
  padding: var(--space-1-5) var(--space-3);
  border-radius: var(--radius-pill);
  color: var(--color-primary);
  background: var(--color-primary-soft);
  font-size: var(--fs-sm);
  font-weight: var(--fw-extrabold);
}

.s-section-header__eyebrow :deep(svg) {
  flex-shrink: 0;
}

.s-section-header__description {
  max-width: 46rem;
  color: var(--color-text-muted);
  font-size: var(--fs-body);
  line-height: var(--lh-body);
  word-break: var(--word-break);
}

.s-section-header__actions {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  gap: var(--space-2);
}
</style>
