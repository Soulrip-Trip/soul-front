<script setup lang="ts">
import { ref, watch } from 'vue'
import { ImageOff } from 'lucide-vue-next'
import { useDsMessages } from '@soulrip/design-system/locale'

const props = withDefaults(
  defineProps<{
    src?: string | null
    alt: string
    /** 가로세로 비율 (예: '16 / 10'). fill과 함께 쓰지 않는다. */
    ratio?: string
    /** 부모를 꽉 채운다 (부모는 position: relative 필요) */
    fill?: boolean
    eager?: boolean
    /** 이미지가 없거나 깨졌을 때 아이콘 아래 문구를 숨긴다. */
    hideFallbackLabel?: boolean
  }>(),
  { src: null, ratio: undefined },
)

const messages = useDsMessages()
const failed = ref(false)

watch(
  () => props.src,
  () => {
    failed.value = false
  },
)
</script>

<template>
  <div
    class="s-image"
    :class="{ 's-image--fill': fill }"
    :style="ratio && !fill ? { aspectRatio: ratio } : undefined"
  >
    <img
      v-if="src && !failed"
      :src="src"
      :alt="alt"
      :loading="eager ? 'eager' : 'lazy'"
      decoding="async"
      @error="failed = true"
    />
    <div v-else class="s-image__fallback" role="img" :aria-label="alt">
      <ImageOff :size="28" aria-hidden="true" />
      <span v-if="!hideFallbackLabel">{{ messages.image.empty }}</span>
    </div>
  </div>
</template>

<style scoped>
.s-image {
  position: relative;
  overflow: hidden;
  background: var(--color-surface-alt);
}

.s-image--fill {
  position: absolute;
  inset: 0;
}

.s-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--duration-slow) var(--ease-standard);
}

.s-image__fallback {
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 6rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  color: var(--color-text-subtle);
  background:
    radial-gradient(circle at 30% 20%, var(--color-primary-soft), transparent 60%),
    var(--color-surface-alt);
  font-size: var(--fs-xs);
  font-weight: var(--fw-extrabold);
}
</style>
