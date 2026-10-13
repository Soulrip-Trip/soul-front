<script setup lang="ts">
import { computed } from 'vue'
import { CalendarDays, MapPin } from 'lucide-vue-next'
import type { Festival } from '@soulrip/api'
import { SBadge, SCard, SImage } from '@soulrip/design-system'
import { firstFilled } from '@soulrip/library'
import { paths } from '@/shared/config'
import { useI18n } from '@/shared/i18n'
import { festivalListImage, festivalName, formatFestivalPeriod } from '../lib/festival'

const props = defineProps<{ festival: Festival }>()

const { t, locale } = useI18n()

const name = computed(() => festivalName(props.festival) || t.value.festival.fallbackName)
const period = computed(
  () => formatFestivalPeriod(props.festival, locale.value) ?? t.value.festival.noSchedule,
)
const location = computed(
  () => firstFilled(props.festival.district, props.festival.location) || t.value.common.seoul,
)
const description = computed(
  () => props.festival.description || t.value.festival.fallbackDescription,
)
</script>

<template>
  <SCard
    :to="paths.festivalDetail(festival.contentId)"
    padding="none"
    as="article"
    class="festival-card"
  >
    <div class="festival-card__media">
      <SImage :src="festivalListImage(festival)" :alt="name" ratio="16 / 10" />
      <SBadge class="festival-card__category" tone="primary" size="sm">
        {{ festival.category || t.festival.fallbackCategory }}
      </SBadge>
    </div>

    <div class="festival-card__body">
      <span class="festival-card__location">
        <MapPin :size="14" aria-hidden="true" />
        {{ location }}
      </span>
      <h3 class="festival-card__title ds-clamp">{{ name }}</h3>
      <p class="festival-card__description ds-clamp">{{ description }}</p>
      <span class="festival-card__period">
        <CalendarDays :size="15" aria-hidden="true" />
        {{ period }}
      </span>
    </div>
  </SCard>
</template>

<style scoped>
.festival-card {
  display: flex;
  height: 100%;
  flex-direction: column;
}

.festival-card__media {
  position: relative;
}

.festival-card__media :deep(img) {
  transition: transform var(--duration-slow) var(--ease-standard);
}

@media (hover: hover) {
  .festival-card:hover .festival-card__media :deep(img) {
    transform: scale(1.05);
  }
}

.festival-card__category {
  position: absolute;
  top: var(--space-3);
  left: var(--space-3);
  max-width: calc(100% - var(--space-6));
  background: var(--color-surface);
}

.festival-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-4) var(--space-5);
}

@media (min-width: 768px) {
  .festival-card__body {
    padding: var(--space-5) var(--space-5) var(--space-6);
  }
}

.festival-card__location {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  color: var(--color-text-subtle);
  font-size: var(--fs-xs);
  font-weight: var(--fw-extrabold);
}

.festival-card__title {
  font-size: var(--fs-h3);
  line-height: var(--lh-snug);
}

.festival-card__description {
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
}

.festival-card__period {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1-5);
  margin-top: auto;
  padding-top: var(--space-2);
  color: var(--color-primary);
  font-size: var(--fs-sm);
  font-weight: var(--fw-extrabold);
}
</style>
