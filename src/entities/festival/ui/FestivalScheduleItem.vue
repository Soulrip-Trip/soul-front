<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRight, MapPin } from 'lucide-vue-next'
import type { Festival } from '@soulrip/api'
import { paths } from '@/shared/config'
import { useI18n } from '@/shared/i18n'
import { festivalName, formatFestivalPeriod } from '../lib/festival'

const props = defineProps<{ festival: Festival }>()

const { t, locale } = useI18n()

const period = computed(
  () => formatFestivalPeriod(props.festival, locale.value, 'short') ?? t.value.festival.noSchedule,
)
</script>

<template>
  <!--
    480px 미만: 기간 · 제목 · 장소 · 링크가 세로로 쌓이고 링크는 오른쪽 아래.
    480px 이상: 왼쪽 정보 / 오른쪽 링크가 한 줄로 배치된다.
  -->
  <RouterLink :to="paths.festivalDetail(festival.contentId)" class="schedule-item">
    <div class="schedule-item__text">
      <span class="schedule-item__period">{{ period }}</span>
      <strong class="schedule-item__title">{{ festivalName(festival) }}</strong>
      <span v-if="festival.location" class="schedule-item__location">
        <MapPin :size="14" aria-hidden="true" />
        {{ festival.location }}
      </span>
    </div>
    <span class="schedule-item__link">
      {{ t.common.viewDetails }}
      <ArrowRight :size="15" aria-hidden="true" />
    </span>
  </RouterLink>
</template>

<style scoped>
.schedule-item {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-4) var(--space-4) var(--space-5);
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  transition:
    border-color var(--duration-base) var(--ease-standard),
    box-shadow var(--duration-base) var(--ease-standard);
}

.schedule-item::before {
  position: absolute;
  inset: 0 auto 0 0;
  width: 4px;
  content: '';
  background: var(--color-primary);
}

@media (min-width: 480px) {
  .schedule-item {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-4) var(--space-5) var(--space-4) var(--space-6);
  }
}

@media (hover: hover) {
  .schedule-item:hover {
    border-color: var(--color-border-strong);
    box-shadow: var(--shadow-sm);
  }
}

.schedule-item__text {
  display: grid;
  min-width: 0;
  gap: var(--space-1);
}

.schedule-item__period {
  color: var(--color-primary);
  font-size: var(--fs-xs);
  font-weight: var(--fw-extrabold);
}

.schedule-item__title {
  font-size: var(--fs-body);
  font-weight: var(--fw-extrabold);
  line-height: var(--lh-snug);
  word-break: var(--word-break);
}

.schedule-item__location {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
}

.schedule-item__link {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  align-self: flex-end;
  gap: var(--space-1);
  color: var(--color-primary);
  font-size: var(--fs-sm);
  font-weight: var(--fw-extrabold);
}

@media (min-width: 480px) {
  .schedule-item__link {
    align-self: center;
  }
}
</style>
