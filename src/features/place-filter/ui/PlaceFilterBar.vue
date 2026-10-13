<script setup lang="ts">
import { computed } from 'vue'
import type { PlaceCategory } from '@soulrip/api'
import { SChipGroup, SSearchField, type ChipOption } from '@soulrip/design-system'
import { PLACE_FILTERS } from '@/entities/place'
import { useI18n } from '@/shared/i18n'

const search = defineModel<string>('search', { required: true })
const category = defineModel<PlaceCategory>('category', { required: true })

const { t } = useI18n()

const options = computed<ChipOption<PlaceCategory>[]>(() =>
  PLACE_FILTERS.map((filter) => ({
    value: filter.key,
    label: t.value.place.filters[filter.key],
    icon: filter.icon,
  })),
)
</script>

<template>
  <div class="place-filter">
    <SSearchField
      v-model="search"
      :label="t.place.list.searchLabel"
      :placeholder="t.place.list.searchPlaceholder"
    />
    <SChipGroup v-model="category" :options="options" :label="t.place.list.categoryLabel" />
  </div>
</template>

<style scoped>
.place-filter {
  display: grid;
  gap: var(--space-4);
}
</style>
