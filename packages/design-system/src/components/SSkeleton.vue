<script setup lang="ts">
withDefaults(
  defineProps<{
    /** card: 이미지 + 텍스트 카드 / post: 텍스트 카드 / block: 단색 블록 / text: 텍스트 줄 */
    variant?: 'card' | 'post' | 'block' | 'text'
    /** block 높이 (CSS 값) */
    height?: string
    lines?: number
  }>(),
  { variant: 'block', height: '12rem', lines: 3 },
)
</script>

<template>
  <div class="s-skeleton" :class="`s-skeleton--${variant}`" aria-hidden="true">
    <template v-if="variant === 'card'">
      <div class="s-skeleton__shine s-skeleton__media" />
      <div class="s-skeleton__body">
        <div class="s-skeleton__shine s-skeleton__line" style="width: 35%" />
        <div
          class="s-skeleton__shine s-skeleton__line s-skeleton__line--title"
          style="width: 80%"
        />
        <div class="s-skeleton__shine s-skeleton__line" style="width: 95%" />
        <div class="s-skeleton__shine s-skeleton__line" style="width: 60%" />
      </div>
    </template>

    <div v-else-if="variant === 'post'" class="s-skeleton__body">
      <div class="s-skeleton__shine s-skeleton__line" style="width: 30%" />
      <div class="s-skeleton__shine s-skeleton__line s-skeleton__line--title" style="width: 75%" />
      <div
        v-for="line in lines"
        :key="line"
        class="s-skeleton__shine s-skeleton__line"
        :style="{ width: `${100 - line * 10}%` }"
      />
    </div>

    <template v-else-if="variant === 'text'">
      <div
        v-for="line in lines"
        :key="line"
        class="s-skeleton__shine s-skeleton__line"
        :style="{ width: line === lines ? '60%' : '100%' }"
      />
    </template>

    <div v-else class="s-skeleton__shine" :style="{ height, borderRadius: 'inherit' }" />
  </div>
</template>

<style scoped>
.s-skeleton {
  overflow: hidden;
  border-radius: var(--radius-xl);
}

.s-skeleton--card,
.s-skeleton--post {
  border: 1px solid var(--color-border);
  background: var(--color-surface);
}

.s-skeleton--text {
  display: grid;
  gap: var(--space-2);
  border-radius: 0;
}

.s-skeleton__shine {
  background: linear-gradient(
    90deg,
    var(--color-surface-sunken) 25%,
    var(--color-primary-soft) 50%,
    var(--color-surface-sunken) 75%
  );
  background-size: 200% 100%;
  animation: ds-shimmer 1.4s ease-in-out infinite;
}

.s-skeleton__media {
  aspect-ratio: 16 / 10;
}

.s-skeleton__body {
  display: grid;
  gap: var(--space-2-5);
  padding: var(--space-5);
}

.s-skeleton__line {
  height: 0.75rem;
  border-radius: var(--radius-pill);
}

.s-skeleton__line--title {
  height: 1.25rem;
  margin-block: var(--space-1);
}
</style>
