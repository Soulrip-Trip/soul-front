<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import type { Festival } from '@soulrip/api'
import { SIconButton, SSpinner } from '@soulrip/design-system'
import type { DateKey } from '@soulrip/library'
import { festivalName } from '@/entities/festival'
import { useI18n } from '@/shared/i18n'
import { buildCalendarCells } from '../lib/calendar'

const props = defineProps<{
  year: number
  month: number
  festivals: Festival[]
  loading?: boolean
}>()
const emit = defineEmits<{ 'change-month': [delta: -1 | 1] }>()
const selected = defineModel<DateKey>('selected', { required: true })

const { t, locale } = useI18n()

const cells = computed(() => buildCalendarCells(props.year, props.month, props.festivals))

const title = computed(() =>
  new Intl.DateTimeFormat(locale.value, { year: 'numeric', month: 'long' }).format(
    new Date(props.year, props.month - 1, 1),
  ),
)

/** 2026-10-04(일) 기준으로 요일 이름 7개를 만든다. */
const weekdays = computed(() => {
  const formatter = new Intl.DateTimeFormat(locale.value, { weekday: 'short' })
  return Array.from({ length: 7 }, (_, index) => formatter.format(new Date(2026, 9, 4 + index)))
})

const dayFormatter = computed(
  () => new Intl.DateTimeFormat(locale.value, { month: 'long', day: 'numeric', weekday: 'long' }),
)
</script>

<template>
  <!--
    ~767px : 정사각형에 가까운 칸 + 축제 수만큼 점(최대 3개). 가로 스크롤 없이 한 화면에 들어온다.
    768px~ : 칸 높이 6.5rem, 축제 이름 막대 2개 + "+N"
    1024px~: 칸 높이 8rem
  -->
  <section class="calendar" :aria-busy="loading">
    <header class="calendar__header">
      <div>
        <span class="ds-eyebrow">{{ t.festival.calendar.eyebrow }}</span>
        <h2 class="calendar__title">{{ title }}</h2>
      </div>
      <div class="calendar__controls">
        <span class="calendar__legend">
          <i aria-hidden="true" />
          {{ t.festival.calendar.legend }}
        </span>
        <SIconButton
          :label="t.festival.calendar.prevMonth"
          size="sm"
          :disabled="month <= 1"
          @click="emit('change-month', -1)"
        >
          <ChevronLeft :size="18" />
        </SIconButton>
        <SIconButton
          :label="t.festival.calendar.nextMonth"
          size="sm"
          :disabled="month >= 12"
          @click="emit('change-month', 1)"
        >
          <ChevronRight :size="18" />
        </SIconButton>
      </div>
    </header>

    <div class="calendar__weekdays" aria-hidden="true">
      <span
        v-for="(weekday, index) in weekdays"
        :key="weekday"
        :class="{ 'is-sunday': index === 0, 'is-saturday': index === 6 }"
      >
        {{ weekday }}
      </span>
    </div>

    <div v-if="loading" class="calendar__loading" role="status">
      <SSpinner size="lg" />
      <span>{{ t.festival.calendar.loading }}</span>
    </div>

    <div v-else class="calendar__grid">
      <template v-for="cell in cells" :key="cell.key">
        <div v-if="!cell.date" class="calendar__cell is-empty" />
        <button
          v-else
          type="button"
          class="calendar__cell"
          :class="{
            'is-today': cell.isToday,
            'is-selected': cell.dateKey === selected,
            'is-sunday': cell.weekday === 0,
            'is-saturday': cell.weekday === 6,
            'has-festival': cell.festivals.length > 0,
          }"
          :aria-pressed="cell.dateKey === selected"
          :aria-label="
            t.festival.calendar.dayLabel(dayFormatter.format(cell.date), cell.festivals.length)
          "
          @click="selected = cell.dateKey!"
        >
          <span class="calendar__day">
            <span class="calendar__number">{{ cell.day }}</span>
            <span v-if="cell.isToday" class="calendar__today">{{ t.festival.calendar.today }}</span>
          </span>

          <!-- 768px 미만: 점 -->
          <span v-if="cell.festivals.length" class="calendar__dots" aria-hidden="true">
            <i v-for="festival in cell.festivals.slice(0, 3)" :key="festival.id" />
          </span>

          <!-- 768px 이상: 축제 이름 막대 -->
          <span v-if="cell.festivals.length" class="calendar__events" aria-hidden="true">
            <span
              v-for="festival in cell.festivals.slice(0, 2)"
              :key="festival.id"
              class="calendar__event"
            >
              <span class="ds-ellipsis">{{ festivalName(festival) }}</span>
            </span>
            <span v-if="cell.festivals.length > 2" class="calendar__more">
              {{ t.festival.calendar.more(cell.festivals.length - 2) }}
            </span>
          </span>
        </button>
      </template>
    </div>
  </section>
</template>

<style scoped>
.calendar {
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

@media (min-width: 768px) {
  .calendar {
    border-radius: var(--radius-2xl);
  }
}

/* ---- Header ---- */
.calendar__header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-4);
  border-bottom: 1px solid var(--color-border);
}

@media (min-width: 768px) {
  .calendar__header {
    padding: var(--space-6) var(--space-7);
  }
}

.calendar__title {
  margin-top: var(--space-1);
  font-size: var(--fs-h2);
}

.calendar__controls {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.calendar__legend {
  display: none;
  align-items: center;
  gap: var(--space-2);
  margin-right: var(--space-2);
  color: var(--color-text-muted);
  font-size: var(--fs-xs);
  font-weight: var(--fw-bold);
}

.calendar__legend i {
  width: 1.5rem;
  height: 4px;
  border-radius: var(--radius-pill);
  background: var(--color-primary);
}

@media (min-width: 480px) {
  .calendar__legend {
    display: inline-flex;
  }
}

/* ---- Grid ---- */
.calendar__weekdays,
.calendar__grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
}

.calendar__weekdays {
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface-alt);
}

.calendar__weekdays span {
  padding: var(--space-2-5) 0;
  color: var(--color-text-muted);
  font-size: var(--fs-xs);
  font-weight: var(--fw-bold);
  text-align: center;
}

.calendar__weekdays .is-sunday,
.calendar__cell.is-sunday .calendar__number {
  color: var(--color-sunday);
}

.calendar__weekdays .is-saturday,
.calendar__cell.is-saturday .calendar__number {
  color: var(--color-saturday);
}

.calendar__cell {
  display: flex;
  min-width: 0;
  min-height: 3.5rem;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1-5) var(--space-0-5);
  border: 0;
  border-right: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  border-radius: 0;
  color: var(--color-text);
  background: transparent;
  text-align: left;
  transition: background-color var(--duration-fast) var(--ease-standard);
}

.calendar__cell:nth-child(7n) {
  border-right: 0;
}

.calendar__cell.is-empty {
  background: var(--color-surface-alt);
}

@media (hover: hover) {
  button.calendar__cell:hover {
    background: var(--color-primary-softer);
  }
}

.calendar__cell.is-selected {
  background: var(--color-primary-soft);
  box-shadow: inset 0 0 0 2px var(--color-primary);
}

@media (min-width: 768px) {
  .calendar__cell {
    min-height: 6.5rem;
    align-items: stretch;
    padding: var(--space-2-5);
  }
}

@media (min-width: 1024px) {
  .calendar__cell {
    min-height: 8rem;
    padding: var(--space-3);
  }
}

.calendar__day {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-1);
}

.calendar__number {
  display: inline-grid;
  min-width: 1.75rem;
  height: 1.75rem;
  place-items: center;
  border-radius: 50%;
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
}

.calendar__cell.is-today .calendar__number {
  color: #fff !important;
  background: var(--color-primary);
}

.calendar__today {
  display: none;
  color: var(--color-primary);
  font-size: var(--fs-xs);
  font-weight: var(--fw-extrabold);
}

/* 점 표시 (모바일) */
.calendar__dots {
  display: flex;
  gap: 3px;
}

.calendar__dots i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-primary);
}

/* 이름 막대 (태블릿 이상) */
.calendar__events {
  display: none;
  flex-direction: column;
  gap: var(--space-1-5);
  min-width: 0;
  margin-top: var(--space-1);
}

@media (min-width: 768px) {
  .calendar__today {
    display: inline;
  }

  .calendar__dots {
    display: none;
  }

  .calendar__events {
    display: flex;
  }
}

.calendar__event {
  display: grid;
  gap: 3px;
  min-width: 0;
  color: var(--color-text-muted);
  font-size: var(--fs-xs);
  font-weight: var(--fw-bold);
}

.calendar__event::before {
  height: 4px;
  border-radius: var(--radius-pill);
  content: '';
  background: var(--color-primary);
}

.calendar__more {
  color: var(--color-text-subtle);
  font-size: var(--fs-xs);
  font-weight: var(--fw-bold);
}

.calendar__loading {
  display: flex;
  min-height: 20rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  color: var(--color-primary);
}

.calendar__loading span {
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
}
</style>
