<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, MessageCircle, Pencil } from 'lucide-vue-next'
import type { CommunityPost } from '@soulrip/api'
import { SButton, SCard, SSectionHeader } from '@soulrip/design-system'
import { firstQueryValue } from '@soulrip/library'
import { PostEditorForm, type PostEditorPrefill } from '@/features/post-editor'
import { paths } from '@/shared/config'
import { useI18n } from '@/shared/i18n'

/** id가 있으면 수정, 없으면 새 글 작성 */
const props = defineProps<{ id?: string }>()

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const postId = computed(() => (props.id ? Number(props.id) : null))
const isEdit = computed(() => postId.value !== null)

/** 축제 상세의 "동행 모집하기" → ?type=COMPANION&place=...&date=... */
const prefill: PostEditorPrefill = {
  type: firstQueryValue(route.query.type).toUpperCase() || undefined,
  place: firstQueryValue(route.query.place) || undefined,
  date: firstQueryValue(route.query.date) || undefined,
}

const backTo = computed(() =>
  postId.value !== null ? paths.postDetail(postId.value) : paths.postList(),
)

function onSaved(post: CommunityPost) {
  void router.push(paths.postDetail(post.id))
}
</script>

<template>
  <div class="ds-page">
    <div class="ds-container ds-container--narrow">
      <SButton variant="ghost" size="sm" :to="backTo" class="detail-back">
        <ArrowLeft :size="16" aria-hidden="true" />
        {{ t.post.editor.back }}
      </SButton>

      <SCard padding="lg">
        <SSectionHeader
          as="h1"
          :eyebrow="isEdit ? t.post.editor.editBadge : t.post.editor.createBadge"
          :title="isEdit ? t.post.editor.editTitle : t.post.editor.createTitle"
          :description="t.post.editor.description"
        >
          <template #icon>
            <Pencil v-if="isEdit" :size="15" />
            <MessageCircle v-else :size="15" />
          </template>
        </SSectionHeader>

        <!-- key: 작성 ↔ 수정 화면 전환 시 폼 상태를 새로 만든다. -->
        <PostEditorForm
          :key="postId ?? 'new'"
          :post-id="postId"
          :prefill="prefill"
          @saved="onSaved"
        />
      </SCard>
    </div>
  </div>
</template>

<style scoped>
.detail-back {
  margin-bottom: var(--space-4);
  margin-left: calc(var(--space-3) * -1);
}
</style>
