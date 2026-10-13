<script setup lang="ts">
import { computed } from 'vue'
import { SBadge } from '@soulrip/design-system'
import { useI18n } from '@/shared/i18n'
import { postTypeIcon, postTypeLabel } from '../model/post-type'

const props = withDefaults(defineProps<{ type: string; size?: 'sm' | 'md' }>(), { size: 'sm' })

const { t } = useI18n()
const icon = computed(() => postTypeIcon(props.type))
</script>

<template>
  <SBadge :size="size">
    <component :is="icon" :size="14" aria-hidden="true" />
    {{ postTypeLabel(type, t) }}
  </SBadge>
</template>
