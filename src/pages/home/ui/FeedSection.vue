<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'
import { SButton, SEmptyState, SSectionHeader, SSkeleton } from '@soulrip/design-system'
import { useI18n } from '@/shared/i18n'

withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    loading: boolean
    error: string
    empty: boolean
    /** 스켈레톤 개수 */
    placeholders: number
    grid: 'cards' | 'posts'
    ctaLabel: string
    ctaTo: RouteLocationRaw
    ctaVariant?: 'primary' | 'secondary'
    alt?: boolean
  }>(),
  { ctaVariant: 'secondary' },
)
const emit = defineEmits<{ retry: [] }>()

const { t } = useI18n()
</script>

<template>
  <section class="ds-section" :class="{ 'ds-section--alt': alt }">
    <div class="ds-container">
      <SSectionHeader :eyebrow="eyebrow" :title="title">
        <template #icon>
          <slot name="icon" />
        </template>
        <template #actions>
          <SButton :variant="ctaVariant" size="sm" :to="ctaTo">
            {{ ctaLabel }}
            <ArrowRight :size="15" aria-hidden="true" />
          </SButton>
        </template>
      </SSectionHeader>

      <div v-if="loading" class="ds-grid" :class="`ds-grid--${grid}`" aria-hidden="true">
        <SSkeleton
          v-for="index in placeholders"
          :key="index"
          :variant="grid === 'cards' ? 'card' : 'post'"
        />
      </div>

      <SEmptyState v-else-if="error" tone="error" :title="t.home.sectionError" :description="error">
        <template #actions>
          <SButton variant="secondary" @click="emit('retry')">{{ t.common.retry }}</SButton>
        </template>
      </SEmptyState>

      <SEmptyState v-else-if="empty" :title="t.home.sectionEmpty" compact />

      <ul v-else class="ds-grid" :class="`ds-grid--${grid}`">
        <slot />
      </ul>
    </div>
  </section>
</template>
