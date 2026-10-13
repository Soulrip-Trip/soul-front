<script setup lang="ts">
import { ref, watch } from 'vue'
import { MessageCircle, PenLine } from 'lucide-vue-next'
import {
  SButton,
  SEmptyState,
  SPagination,
  SSectionHeader,
  SSkeleton,
} from '@soulrip/design-system'
import { PostCard } from '@/entities/post'
import { PostFilterBar } from '@/features/post-filter'
import { paths } from '@/shared/config'
import { useI18n } from '@/shared/i18n'
import { usePostList } from '../model/usePostList'

const { t } = useI18n()
const { search, postType, page, posts, meta, loading, error, reload } = usePostList()

const results = ref<HTMLElement | null>(null)
watch(page, () => results.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
</script>

<template>
  <div class="ds-page">
    <div class="ds-container">
      <SSectionHeader
        as="h1"
        :eyebrow="t.post.list.eyebrow"
        :title="t.post.list.title"
        :description="t.post.list.description"
      >
        <template #icon><MessageCircle :size="15" /></template>
        <template #actions>
          <SButton :to="paths.postNew()" block-on-mobile>
            <PenLine :size="17" aria-hidden="true" />
            {{ t.post.list.write }}
          </SButton>
        </template>
      </SSectionHeader>

      <PostFilterBar v-model:search="search" v-model:post-type="postType" />

      <div ref="results" class="post-list__results">
        <!-- ~479px: 총 개수 / 페이지 정보가 두 줄, 480px~: 한 줄 양쪽 정렬 -->
        <div v-if="!loading && !error" class="post-list__summary" aria-live="polite">
          <span>{{ t.post.list.total(meta.total) }}</span>
          <span v-if="meta.pages > 1">{{ t.post.list.pageOf(page, meta.pages) }}</span>
        </div>

        <div v-if="loading" class="ds-grid ds-grid--posts" aria-hidden="true">
          <SSkeleton v-for="index in 6" :key="index" variant="post" />
        </div>

        <SEmptyState
          v-else-if="error"
          tone="error"
          :title="t.post.list.errorTitle"
          :description="error"
        >
          <template #actions>
            <SButton variant="secondary" @click="reload">{{ t.common.reload }}</SButton>
          </template>
        </SEmptyState>

        <SEmptyState
          v-else-if="posts.length === 0"
          :title="t.post.list.emptyTitle"
          :description="t.post.list.emptyDescription"
        >
          <template #actions>
            <SButton :to="paths.postNew()">{{ t.post.list.write }}</SButton>
          </template>
        </SEmptyState>

        <template v-else>
          <ul class="ds-grid ds-grid--posts">
            <li v-for="post in posts" :key="post.id">
              <PostCard :post="post" />
            </li>
          </ul>
          <SPagination v-model:page="page" :total-pages="meta.pages" />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-list__results {
  margin-top: var(--space-6);
  scroll-margin-top: calc(var(--header-height) + var(--space-4));
}

.post-list__summary {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  margin-bottom: var(--space-4);
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
}

@media (min-width: 480px) {
  .post-list__summary {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
