<script setup lang="ts">
import { computed } from 'vue'
import { MapPin, Star } from 'lucide-vue-next'
import type { Place } from '@soulrip/api'
import { SBadge, SCard, SImage, STag } from '@soulrip/design-system'
import { joinFilled } from '@soulrip/library'
import { paths } from '@/shared/config'
import { useI18n } from '@/shared/i18n'
import { placeCategoryLabel, placeListImage, placeName } from '../lib/place'

const props = defineProps<{ place: Place }>()

const { t } = useI18n()

const name = computed(() => placeName(props.place) || t.value.place.fallbackName)
const category = computed(() => placeCategoryLabel(props.place, t.value))
const summary = computed(
  () => joinFilled([props.place.district, props.place.address]) || t.value.place.fallbackSummary,
)
const tags = computed(() =>
  props.place.tags?.length ? props.place.tags.slice(0, 3) : [category.value],
)
</script>

<template>
  <SCard :to="paths.placeDetail(place.contentId)" padding="none" as="article" class="place-card">
    <div class="place-card__media">
      <SImage :src="placeListImage(place)" :alt="name" ratio="16 / 10" />
      <div class="place-card__badges">
        <SBadge tone="solid" size="sm">{{ category }}</SBadge>
        <span v-if="place.soloScore !== null" class="place-card__score">
          <Star :size="12" fill="currentColor" aria-hidden="true" />
          {{ t.place.soloScore(place.soloScore) }}
        </span>
      </div>
    </div>

    <div class="place-card__body">
      <span class="place-card__district">
        <MapPin :size="14" aria-hidden="true" />
        {{ place.district || t.common.seoul }}
      </span>

      <h3 class="place-card__title ds-clamp">{{ name }}</h3>
      <p class="place-card__summary ds-clamp">{{ summary }}</p>

      <ul class="place-card__tags">
        <li v-for="tag in tags" :key="tag">
          <STag :label="tag" />
        </li>
      </ul>
    </div>
  </SCard>
</template>

<style scoped>
.place-card {
  display: flex;
  height: 100%;
  flex-direction: column;
}

.place-card__media {
  position: relative;
}

.place-card__media :deep(img) {
  transition: transform var(--duration-slow) var(--ease-standard);
}

@media (hover: hover) {
  .place-card:hover .place-card__media :deep(img) {
    transform: scale(1.05);
  }
}

.place-card__badges {
  position: absolute;
  inset: var(--space-3) var(--space-3) auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
}

.place-card__score {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2-5);
  border-radius: var(--radius-pill);
  color: #273256;
  background: rgb(255 255 255 / 0.92);
  font-size: var(--fs-xs);
  font-weight: var(--fw-extrabold);
  white-space: nowrap;
}

.place-card__score svg {
  color: #f4a300;
}

.place-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-4) var(--space-5);
}

@media (min-width: 768px) {
  .place-card__body {
    padding: var(--space-5) var(--space-5) var(--space-6);
  }
}

.place-card__district {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  color: var(--color-text-subtle);
  font-size: var(--fs-xs);
  font-weight: var(--fw-extrabold);
}

.place-card__district svg {
  color: var(--color-primary);
}

.place-card__title {
  font-size: var(--fs-h3);
  line-height: var(--lh-snug);
}

.place-card__summary {
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
  line-height: var(--lh-body);
}

.place-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1-5);
  margin-top: auto;
  padding-top: var(--space-2);
}

.place-card__tags li {
  min-width: 0;
  max-width: 100%;
}
</style>
