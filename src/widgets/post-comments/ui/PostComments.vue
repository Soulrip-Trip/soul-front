<script setup lang="ts">
import { MessageCircle } from 'lucide-vue-next'
import type { Comment } from '@soulrip/api'
import { SButton, SCard, SEmptyState } from '@soulrip/design-system'
import { CommentItem } from '@/entities/comment'
import { CommentForm } from '@/features/comment-create'
import { useI18n } from '@/shared/i18n'
import { usePostComments } from '../model/usePostComments'

const props = defineProps<{ postId: number; commentCount: number }>()
const emit = defineEmits<{ created: [comment: Comment] }>()

const { t } = useI18n()
const { comments, loading, error, reload, append } = usePostComments(() => props.postId)

/** 목록에 붙이고 부모에게 알려 commentCount를 함께 올린다. */
function onCreated(comment: Comment) {
  append(comment)
  emit('created', comment)
}
</script>

<template>
  <SCard as="section" padding="lg" class="post-comments" aria-labelledby="comments-title">
    <header class="post-comments__header">
      <span class="ds-eyebrow">{{ t.comment.eyebrow }}</span>
      <h2 id="comments-title" class="post-comments__title">
        {{ t.comment.title }}
        <span class="post-comments__count">{{ commentCount }}</span>
      </h2>
    </header>

    <CommentForm :post-id="postId" @created="onCreated" />

    <SEmptyState v-if="loading" tone="loading" :title="t.comment.loading" compact plain />

    <SEmptyState
      v-else-if="error"
      tone="error"
      :title="t.comment.loadError"
      :description="error"
      compact
    >
      <template #actions>
        <SButton variant="secondary" size="sm" @click="reload">{{ t.common.retry }}</SButton>
      </template>
    </SEmptyState>

    <SEmptyState
      v-else-if="comments.length === 0"
      :title="t.comment.emptyTitle"
      :description="t.comment.emptyDescription"
      compact
    >
      <template #icon>
        <MessageCircle :size="26" />
      </template>
    </SEmptyState>

    <ol v-else class="post-comments__list">
      <li v-for="comment in comments" :key="comment.id">
        <CommentItem :comment="comment" />
      </li>
    </ol>
  </SCard>
</template>

<style scoped>
.post-comments {
  display: grid;
  gap: var(--space-5);
}

.post-comments__header {
  display: grid;
  gap: var(--space-1);
}

.post-comments__title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--fs-h2);
}

.post-comments__count {
  min-width: 1.75rem;
  padding: var(--space-0-5) var(--space-2-5);
  border-radius: var(--radius-pill);
  color: var(--color-primary);
  background: var(--color-primary-soft);
  font-size: var(--fs-sm);
  text-align: center;
}

.post-comments__list {
  display: grid;
}

.post-comments__list li {
  padding-block: var(--space-4);
  border-bottom: 1px solid var(--color-border);
}

.post-comments__list li:first-child {
  padding-top: 0;
}

.post-comments__list li:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}
</style>
