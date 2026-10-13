<script setup lang="ts">
import { computed } from 'vue'
import type { Comment } from '@soulrip/api'
import { SAvatar } from '@soulrip/design-system'
import { formatDateTime } from '@soulrip/library'
import { useI18n } from '@/shared/i18n'

const props = defineProps<{ comment: Comment }>()

const { locale } = useI18n()
const createdAt = computed(() => formatDateTime(props.comment.createdAt, locale.value))
</script>

<template>
  <article class="comment-item">
    <SAvatar :name="comment.nickname" />
    <div class="comment-item__body">
      <!-- 480px 미만: 닉네임 아래로 작성 시각이 내려간다. -->
      <header class="comment-item__meta">
        <strong class="ds-ellipsis">{{ comment.nickname }}</strong>
        <time :datetime="comment.createdAt">{{ createdAt }}</time>
      </header>
      <p class="comment-item__content">{{ comment.content }}</p>
    </div>
  </article>
</template>

<style scoped>
.comment-item {
  display: flex;
  gap: var(--space-3);
}

.comment-item__body {
  flex: 1;
  min-width: 0;
}

.comment-item__meta {
  display: flex;
  flex-direction: column;
  gap: var(--space-0-5);
}

@media (min-width: 480px) {
  .comment-item__meta {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
  }
}

.comment-item__meta strong {
  font-size: var(--fs-sm);
}

.comment-item__meta time {
  flex-shrink: 0;
  color: var(--color-text-subtle);
  font-size: var(--fs-xs);
}

.comment-item__content {
  margin-top: var(--space-1-5);
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
  line-height: var(--lh-body);
  overflow-wrap: anywhere;
  white-space: pre-wrap;
}
</style>
