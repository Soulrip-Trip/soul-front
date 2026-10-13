<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Eye, Heart, MessageSquare, Pencil, UserRound } from 'lucide-vue-next'
import { SButton, SCard, SEmptyState, STag } from '@soulrip/design-system'
import { formatDateTime } from '@soulrip/library'
import { PostTypeBadge } from '@/entities/post'
import { DeletePostButton } from '@/features/post-delete'
import { LikeButton } from '@/features/post-like'
import { PostComments } from '@/widgets/post-comments'
import { paths } from '@/shared/config'
import { useI18n } from '@/shared/i18n'
import { usePostDetail } from '../model/usePostDetail'

const props = defineProps<{ id: string }>()

const router = useRouter()
const { t, locale } = useI18n()
const postId = computed(() => Number(props.id))
const { post, loading, error, reload, setLikes, incrementCommentCount } = usePostDetail(postId)

const createdAt = computed(() =>
  post.value ? formatDateTime(post.value.createdAt, locale.value) : '',
)

const meta = computed(() =>
  post.value
    ? [
        {
          key: 'author',
          icon: UserRound,
          label: t.value.post.detail.author,
          value: post.value.nickname,
        },
        { key: 'views', icon: Eye, label: t.value.post.detail.views, value: post.value.views },
        { key: 'likes', icon: Heart, label: t.value.post.detail.likes, value: post.value.likes },
        {
          key: 'comments',
          icon: MessageSquare,
          label: t.value.post.detail.comments,
          value: post.value.commentCount,
        },
      ]
    : [],
)

function onDeleted() {
  void router.push(paths.postList())
}
</script>

<template>
  <div class="ds-page">
    <div class="ds-container ds-container--narrow">
      <SButton variant="ghost" size="sm" :to="paths.postList()" class="detail-back">
        <ArrowLeft :size="16" aria-hidden="true" />
        {{ t.post.detail.back }}
      </SButton>

      <SEmptyState v-if="loading" tone="loading" :title="t.post.detail.loading" plain />

      <SEmptyState
        v-else-if="error || !post"
        tone="error"
        :title="t.post.detail.errorTitle"
        :description="error"
      >
        <template #actions>
          <SButton variant="secondary" @click="reload">{{ t.common.retry }}</SButton>
          <SButton variant="ghost" :to="paths.postList()">{{ t.common.backToList }}</SButton>
        </template>
      </SEmptyState>

      <div v-else class="post-detail">
        <SCard as="article" padding="lg">
          <header class="post-detail__header">
            <!-- ~479px: 유형 배지 아래 작성일 / 480px~: 한 줄 양쪽 정렬 -->
            <div class="post-detail__top">
              <PostTypeBadge :type="post.type" size="md" />
              <time :datetime="post.createdAt">{{ createdAt }}</time>
            </div>
            <h1 class="ds-h1 post-detail__title">{{ post.title }}</h1>

            <!-- ~479px: 2×2 격자 / 480px~: 한 줄로 이어진 칩 -->
            <dl class="post-detail__meta">
              <div v-for="item in meta" :key="item.key" class="post-detail__meta-item">
                <component :is="item.icon" :size="15" aria-hidden="true" />
                <dt>{{ item.label }}</dt>
                <dd>{{ item.value }}</dd>
              </div>
            </dl>
          </header>

          <p class="post-detail__content">{{ post.content }}</p>

          <ul v-if="post.tags.length" class="post-detail__tags">
            <li v-for="tag in post.tags" :key="tag"><STag :label="tag" size="md" /></li>
          </ul>

          <!-- ~479px: 좋아요(가로 100%) 아래 수정|삭제 2열 / 480px~: 좋아요 왼쪽, 수정·삭제 오른쪽 -->
          <footer class="post-detail__actions">
            <LikeButton :post-id="post.id" :likes="post.likes" @liked="setLikes" />
            <div class="post-detail__owner-actions">
              <SButton variant="secondary" size="sm" :to="paths.postEdit(post.id)">
                <Pencil :size="15" aria-hidden="true" />
                {{ t.common.edit }}
              </SButton>
              <DeletePostButton :post-id="post.id" @deleted="onDeleted" />
            </div>
          </footer>
        </SCard>

        <PostComments
          :post-id="post.id"
          :comment-count="post.commentCount"
          @created="incrementCommentCount"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-back {
  margin-bottom: var(--space-4);
  margin-left: calc(var(--space-3) * -1);
}

.post-detail {
  display: grid;
  gap: var(--grid-gap);
}

.post-detail__header {
  display: grid;
  gap: var(--space-4);
  padding-bottom: var(--space-5);
  border-bottom: 1px solid var(--color-border);
}

.post-detail__top {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-2);
}

@media (min-width: 480px) {
  .post-detail__top {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.post-detail__top time {
  color: var(--color-text-subtle);
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
}

.post-detail__title {
  overflow-wrap: anywhere;
}

.post-detail__meta {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-2);
  margin: 0;
}

@media (min-width: 480px) {
  .post-detail__meta {
    display: flex;
    flex-wrap: wrap;
  }
}

.post-detail__meta-item {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  gap: var(--space-1-5);
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: var(--color-surface-alt);
  font-size: var(--fs-sm);
}

.post-detail__meta-item svg {
  flex-shrink: 0;
  color: var(--color-primary);
}

.post-detail__meta-item dt {
  color: var(--color-text-subtle);
}

.post-detail__meta-item dd {
  overflow: hidden;
  margin: 0;
  font-weight: var(--fw-extrabold);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.post-detail__content {
  min-height: 10rem;
  padding-block: var(--space-6);
  font-size: var(--fs-body);
  line-height: var(--lh-relaxed);
  overflow-wrap: anywhere;
  white-space: pre-wrap;
}

.post-detail__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.post-detail__actions {
  display: grid;
  gap: var(--space-3);
  margin-top: var(--space-6);
  padding-top: var(--space-5);
  border-top: 1px solid var(--color-border);
}

@media (min-width: 480px) {
  .post-detail__actions {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
}

.post-detail__owner-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2);
}

@media (min-width: 480px) {
  .post-detail__owner-actions {
    display: flex;
  }
}
</style>
