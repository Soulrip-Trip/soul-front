<script setup lang="ts">
import { Heart } from 'lucide-vue-next'
import { SButton } from '@soulrip/design-system'
import { useI18n } from '@/shared/i18n'
import { usePostLike } from '../model/usePostLike'

const props = defineProps<{ postId: number; likes: number }>()
const emit = defineEmits<{ liked: [count: number] }>()

const { t } = useI18n()
const { liked, pending, error, like } = usePostLike(
  () => props.postId,
  (count) => emit('liked', count),
)
</script>

<template>
  <div class="like-button">
    <SButton
      variant="outline"
      class="like-button__control"
      :class="{ 'is-liked': liked }"
      :disabled="liked"
      :loading="pending"
      :aria-pressed="liked"
      block-on-mobile
      @click="like"
    >
      <Heart :size="16" :fill="liked ? 'currentColor' : 'none'" aria-hidden="true" />
      {{ liked ? t.post.like.liked : t.post.like.like }}
      <span class="like-button__count">{{ likes }}</span>
    </SButton>
    <p v-if="error" class="like-button__error" role="alert">{{ error }}</p>
  </div>
</template>

<style scoped>
.like-button {
  display: grid;
  gap: var(--space-2);
}

.like-button__count {
  min-width: 1.5rem;
  padding: var(--space-0-5) var(--space-2);
  border-radius: var(--radius-pill);
  background: var(--color-primary-soft);
  font-size: var(--fs-xs);
}

/* 좋아요 완료는 비활성화 상태지만 흐리게 보이지 않도록 강조 */
.like-button__control.is-liked {
  color: var(--color-danger);
  border-color: color-mix(in srgb, var(--color-danger) 40%, transparent);
  background: var(--color-danger-soft);
  opacity: 1;
}

.like-button__control.is-liked .like-button__count {
  background: color-mix(in srgb, var(--color-danger) 12%, transparent);
}

.like-button__error {
  color: var(--color-danger);
  font-size: var(--fs-xs);
  font-weight: var(--fw-bold);
}
</style>
