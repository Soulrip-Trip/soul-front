<script setup lang="ts">
import { ref, watch } from 'vue'
import { Globe } from 'lucide-vue-next'
import {
  SButton,
  SEmptyState,
  SPagination,
  SSectionHeader,
  SSkeleton,
} from '@soulrip/design-system'
import { PlaceCard } from '@/entities/place'
import { PlaceFilterBar } from '@/features/place-filter'
import { useI18n } from '@/shared/i18n'
import { usePlaceList } from '../model/usePlaceList'

const { t } = useI18n()
const { search, category, page, places, meta, loading, error, hasFilters, reload, resetFilters } =
  usePlaceList()

const results = ref<HTMLElement | null>(null)

// 페이지를 넘기면 결과 목록 상단으로 이동한다.
watch(page, () => results.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
</script>

<template>
  <div class="ds-page">
    <div class="ds-container">
      <SSectionHeader
        as="h1"
        :eyebrow="t.place.list.eyebrow"
        :title="t.place.list.title"
        :description="t.place.list.description"
      >
        <template #icon><Globe :size="15" /></template>
      </SSectionHeader>

      <PlaceFilterBar v-model:search="search" v-model:category="category" />

      <div ref="results" class="place-list__results">
        <p v-if="!loading && !error" class="place-list__count" aria-live="polite">
          {{ t.place.list.resultCount(meta.total) }}
        </p>

        <div v-if="loading" class="ds-grid ds-grid--cards" aria-hidden="true">
          <SSkeleton v-for="index in 8" :key="index" variant="card" />
        </div>

        <SEmptyState
          v-else-if="error"
          tone="error"
          :title="t.place.list.errorTitle"
          :description="error"
        >
          <template #actions>
            <SButton variant="secondary" @click="reload">{{ t.common.reload }}</SButton>
          </template>
        </SEmptyState>

        <SEmptyState
          v-else-if="places.length === 0"
          :title="t.place.list.emptyTitle"
          :description="t.place.list.emptyDescription"
        >
          <template v-if="hasFilters" #actions>
            <SButton variant="secondary" @click="resetFilters">{{
              t.place.list.resetFilters
            }}</SButton>
          </template>
        </SEmptyState>

        <template v-else>
          <ul class="ds-grid ds-grid--cards">
            <li v-for="place in places" :key="place.id">
              <PlaceCard :place="place" />
            </li>
          </ul>
          <SPagination v-model:page="page" :total-pages="meta.pages" />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.place-list__results {
  margin-top: var(--space-6);
  scroll-margin-top: calc(var(--header-height) + var(--space-4));
}

.place-list__count {
  margin-bottom: var(--space-4);
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
}
</style>
