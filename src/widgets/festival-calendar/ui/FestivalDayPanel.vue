<script setup lang="ts">
import { computed } from 'vue'
import { CalendarDays } from 'lucide-vue-next'
import type { Festival } from '@soulrip/api'
import { SBadge, SEmptyState } from '@soulrip/design-system'
import { parseLocalDate, type DateKey } from '@soulrip/library'
import { FestivalScheduleItem, festivalOccursOn } from '@/entities/festival'
import { useI18n } from '@/shared/i18n'

const props = defineProps<{ date: DateKey; festivals: Festival[] }>()

const { t, locale } = useI18n()

const day = computed(() => parseLocalDate(props.date))
const label = computed(() =>
  day.value
    ? new Intl.DateTimeFormat(locale.value, {
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      }).format(day.value)
    : '',
)
const items = computed(() =>
  day.value ? props.festivals.filter((festival) => festivalOccursOn(festival, day.value!)) : [],
)
</script>

<template>
  <section class="day-panel" aria-live="polite">
    <header class="day-panel__header">
      <div>
        <SBadge size="sm">{{ t.festival.selected.badge }}</SBadge>
        <h2 class="day-panel__title">{{ label }}</h2>
      </div>
      <span class="day-panel__count">{{ t.festival.selected.count(items.length) }}</span>
    </header>

    <ul v-if="items.length" class="day-panel__list">
      <li v-for="festival in items" :key="festival.id">
        <FestivalScheduleItem :festival="festival" />
      </li>
    </ul>

    <SEmptyState
      v-else
      :title="t.festival.selected.emptyTitle"
      :description="t.festival.selected.emptyDescription"
      compact
    >
      <template #icon>
        <CalendarDays :size="28" />
      </template>
    </SEmptyState>
  </section>
</template>

<style scoped>
.day-panel {
  padding: var(--space-5) var(--space-4);
  border-radius: var(--radius-xl);
  background: var(--color-surface-alt);
}

@media (min-width: 768px) {
  .day-panel {
    padding: var(--space-7);
    border-radius: var(--radius-2xl);
  }
}

.day-panel__header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-2) var(--space-4);
  margin-bottom: var(--space-4);
}

.day-panel__title {
  margin-top: var(--space-2);
  font-size: var(--fs-h3);
}

.day-panel__count {
  color: var(--color-primary);
  font-size: var(--fs-sm);
  font-weight: var(--fw-extrabold);
}

.day-panel__list {
  display: grid;
  gap: var(--space-3);
}
</style>
