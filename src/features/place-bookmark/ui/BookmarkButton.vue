<script setup lang="ts">
import { Bookmark, BookmarkCheck } from 'lucide-vue-next'
import { SButton } from '@soulrip/design-system'
import { useI18n } from '@/shared/i18n'
import { usePlaceBookmark } from '../model/usePlaceBookmark'

const props = defineProps<{ placeId: string }>()

const { t } = useI18n()
const { bookmarked, toggle } = usePlaceBookmark(() => props.placeId)
</script>

<template>
  <SButton
    :variant="bookmarked ? 'primary' : 'secondary'"
    :aria-pressed="bookmarked"
    block
    @click="toggle"
  >
    <BookmarkCheck v-if="bookmarked" :size="16" aria-hidden="true" />
    <Bookmark v-else :size="16" aria-hidden="true" />
    {{ bookmarked ? t.place.detail.bookmarked : t.place.detail.bookmark }}
  </SButton>
</template>
