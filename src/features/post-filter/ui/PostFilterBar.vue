<script setup lang="ts">
import { computed } from 'vue'
import type { PostType } from '@soulrip/api'
import { SChipGroup, SSearchField, type ChipOption } from '@soulrip/design-system'
import { POST_FILTER_TYPES, postTypeIcon } from '@/entities/post'
import { useI18n } from '@/shared/i18n'

const search = defineModel<string>('search', { required: true })
const postType = defineModel<PostType>('postType', { required: true })

const { t } = useI18n()

const options = computed<ChipOption<PostType>[]>(() =>
  POST_FILTER_TYPES.map((type) => ({
    value: type,
    label: t.value.post.types[type],
    icon: postTypeIcon(type),
  })),
)
</script>

<template>
  <div class="post-filter">
    <SSearchField
      v-model="search"
      :label="t.post.list.searchLabel"
      :placeholder="t.post.list.searchPlaceholder"
    />
    <SChipGroup v-model="postType" :options="options" :label="t.post.list.typeFilterLabel" />
  </div>
</template>

<style scoped>
.post-filter {
  display: grid;
  gap: var(--space-4);
}
</style>
