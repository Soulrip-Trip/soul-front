<script setup lang="ts">
import SImage from './SImage.vue'

defineProps<{
  image?: string | null
  alt: string
}>()
</script>

<template>
  <!--
    상세 화면 상단 대표 이미지 + 하단 그라데이션 위 텍스트.
    높이: ~479px 17rem / 480px~ 21rem / 768px~ 26rem / 1024px~ 28rem
  -->
  <section class="s-media-hero">
    <SImage class="s-media-hero__image" :src="image" :alt="alt" fill eager hide-fallback-label />
    <div class="s-media-hero__content">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.s-media-hero {
  position: relative;
  display: flex;
  min-height: 17rem;
  align-items: flex-end;
  overflow: hidden;
  border-radius: var(--radius-xl);
  background: var(--color-surface-alt);
}

.s-media-hero::after {
  position: absolute;
  inset: 0;
  content: '';
  background: var(--scrim-bottom);
  pointer-events: none;
}

@media (min-width: 480px) {
  .s-media-hero {
    min-height: 21rem;
  }
}

@media (min-width: 768px) {
  .s-media-hero {
    min-height: 26rem;
    border-radius: var(--radius-2xl);
  }
}

@media (min-width: 1024px) {
  .s-media-hero {
    min-height: 28rem;
  }
}

.s-media-hero__content {
  position: relative;
  z-index: 1;
  display: grid;
  width: 100%;
  justify-items: start;
  gap: var(--space-3);
  padding: var(--space-5) var(--space-4);
  color: #fff;
}

@media (min-width: 768px) {
  .s-media-hero__content {
    padding: var(--space-10);
  }
}

.s-media-hero__content :deep(h1) {
  max-width: 48rem;
  color: #fff;
  text-shadow: 0 2px 16px rgb(0 0 0 / 0.25);
}
</style>
