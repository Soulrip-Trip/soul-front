<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { PartyPopper, UsersRound } from 'lucide-vue-next'
import {
  SButton,
  SEmptyState,
  SPagination,
  SSectionHeader,
  SSkeleton,
} from '@soulrip/design-system'
import { FestivalCard } from '@/entities/festival'
import { MonthFilter } from '@/features/festival-month-filter'
import { FestivalCalendar, FestivalDayPanel } from '@/widgets/festival-calendar'
import { paths } from '@/shared/config'
import { useI18n } from '@/shared/i18n'
import { useFestivalList } from '../model/useFestivalList'

const { t, locale } = useI18n()
const {
  year,
  month,
  calendarMonth,
  page,
  selectedDate,
  festivals,
  meta,
  loading,
  error,
  calendarFestivals,
  calendarLoading,
  changeMonth,
  reload,
} = useFestivalList()

const listTitle = computed(() => {
  if (month.value === null) return t.value.festival.list.listTitleAll
  const name = new Intl.DateTimeFormat(locale.value, { month: 'long' }).format(
    new Date(year, month.value - 1, 1),
  )
  return t.value.festival.list.listTitleMonth(name)
})

const listSection = ref<HTMLElement | null>(null)
watch(page, () => listSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
</script>

<template>
  <div class="ds-page">
    <div class="ds-container">
      <SSectionHeader
        as="h1"
        :eyebrow="t.festival.list.eyebrow"
        :title="t.festival.list.title"
        :description="t.festival.list.description"
      >
        <template #icon><PartyPopper :size="15" /></template>
        <template #actions>
          <SButton :to="{ path: paths.postNew(), query: { type: 'COMPANION' } }" block-on-mobile>
            <UsersRound :size="17" aria-hidden="true" />
            {{ t.festival.list.companionCta }}
          </SButton>
        </template>
      </SSectionHeader>

      <MonthFilter v-model="month" class="festival-list__months" />

      <!--
        ~1023px : 달력 → 선택한 날짜의 축제 목록이 세로로 쌓인다.
        1024px~ : 달력 | 선택한 날짜 패널(21.5rem, sticky) 2단
      -->
      <div class="ds-split festival-list__calendar">
        <FestivalCalendar
          v-model:selected="selectedDate"
          :year="year"
          :month="calendarMonth"
          :festivals="calendarFestivals"
          :loading="calendarLoading"
          @change-month="changeMonth"
        />
        <FestivalDayPanel
          class="ds-split__aside"
          :date="selectedDate"
          :festivals="calendarFestivals"
        />
      </div>

      <section ref="listSection" class="festival-list__section">
        <SSectionHeader :eyebrow="t.festival.list.listEyebrow" :title="listTitle">
          <template #icon><PartyPopper :size="15" /></template>
          <template #actions>
            <span class="festival-list__total">{{ t.festival.list.total(meta.total) }}</span>
          </template>
        </SSectionHeader>

        <div v-if="loading" class="ds-grid ds-grid--cards" aria-hidden="true">
          <SSkeleton v-for="index in 6" :key="index" variant="card" />
        </div>

        <SEmptyState
          v-else-if="error"
          tone="error"
          :title="t.festival.list.errorTitle"
          :description="error"
        >
          <template #actions>
            <SButton variant="secondary" @click="reload">{{ t.common.reload }}</SButton>
          </template>
        </SEmptyState>

        <SEmptyState
          v-else-if="festivals.length === 0"
          :title="t.festival.list.emptyTitle"
          :description="t.festival.list.emptyDescription"
        />

        <template v-else>
          <ul class="ds-grid ds-grid--cards">
            <li v-for="festival in festivals" :key="festival.id">
              <FestivalCard :festival="festival" />
            </li>
          </ul>
          <SPagination v-model:page="page" :total-pages="meta.pages" />
        </template>
      </section>
    </div>
  </div>
</template>

<style scoped>
.festival-list__months {
  margin-bottom: var(--space-6);
}

.festival-list__section {
  margin-top: var(--space-12);
  scroll-margin-top: calc(var(--header-height) + var(--space-4));
}

@media (min-width: 768px) {
  .festival-list__section {
    margin-top: var(--space-16);
  }
}

.festival-list__total {
  color: var(--color-primary);
  font-size: var(--fs-sm);
  font-weight: var(--fw-extrabold);
}
</style>
