<script setup lang="ts">
import { computed } from 'vue'
import { Eye, Heart, MessageSquare, UserRound } from 'lucide-vue-next'
import type { CommunityPost } from '@soulrip/api'
import { SCard, STag } from '@soulrip/design-system'
import { formatDateTime } from '@soulrip/library'
import { paths } from '@/shared/config'
import { useI18n } from '@/shared/i18n'
import { postTypeLabel } from '../model/post-type'
import PostTypeBadge from './PostTypeBadge.vue'

const props = defineProps<{ post: CommunityPost }>()

const { t, locale } = useI18n()

const createdDate = computed(() =>
  formatDateTime(props.post.createdAt, locale.value, { dateStyle: 'medium' }),
)
const tags = computed(() =>
  props.post.tags?.length ? props.post.tags.slice(0, 3) : [postTypeLabel(props.post.type, t.value)],
)
</script>

<template>
  <SCard :to="paths.postDetail(post.id)" as="article" padding="md" class="post-card">
    <div class="post-card__top">
      <PostTypeBadge :type="post.type" />
      <time class="post-card__date" :datetime="post.createdAt">{{ createdDate }}</time>
    </div>

    <h3 class="post-card__title ds-clamp">{{ post.title }}</h3>
    <p class="post-card__content ds-clamp">{{ post.content }}</p>

    <ul class="post-card__tags">
      <li v-for="tag in tags" :key="tag">
        <STag :label="tag" />
      </li>
    </ul>

    <!--
      400px 미만: 작성자 / 통계가 두 줄로 나뉜다.
      400px 이상: 한 줄에 양쪽 정렬.
    -->
    <footer class="post-card__footer">
      <span class="post-card__author ds-ellipsis">
        <UserRound :size="14" aria-hidden="true" />
        {{ post.nickname }}
      </span>
      <span class="post-card__stats">
        <span :aria-label="t.post.stats.views(post.views)">
          <Eye :size="14" aria-hidden="true" />{{ post.views }}
        </span>
        <span :aria-label="t.post.stats.likes(post.likes)">
          <Heart :size="14" aria-hidden="true" />{{ post.likes }}
        </span>
        <span :aria-label="t.post.stats.comments(post.commentCount)">
          <MessageSquare :size="14" aria-hidden="true" />{{ post.commentCount }}
        </span>
      </span>
    </footer>
  </SCard>
</template>

<style scoped>
.post-card {
  display: flex;
  height: 100%;
  flex-direction: column;
}

.post-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.post-card__date {
  flex-shrink: 0;
  color: var(--color-text-subtle);
  font-size: var(--fs-xs);
  font-weight: var(--fw-bold);
}

.post-card__title {
  margin: var(--space-4) 0 var(--space-2);
  font-size: var(--fs-h3);
  line-height: var(--lh-snug);
}

.post-card__content {
  --lines: 3;

  margin-bottom: var(--space-4);
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
  line-height: var(--lh-body);
  overflow-wrap: anywhere;
}

.post-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1-5);
  margin-top: auto;
  margin-bottom: var(--space-4);
}

.post-card__tags li {
  min-width: 0;
  max-width: 100%;
}

.post-card__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2) var(--space-3);
  padding-top: var(--space-3-5);
  border-top: 1px solid var(--color-border);
  color: var(--color-text-subtle);
  font-size: var(--fs-xs);
  font-weight: var(--fw-bold);
}

.post-card__author,
.post-card__stats span {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
}

.post-card__author {
  min-width: 0;
}

.post-card__stats {
  display: inline-flex;
  gap: var(--space-3);
}

.post-card svg {
  flex-shrink: 0;
  color: var(--color-primary);
}

@media (max-width: 399.98px) {
  .post-card__footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
