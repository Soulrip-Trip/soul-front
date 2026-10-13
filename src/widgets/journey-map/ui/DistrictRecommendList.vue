<script setup lang="ts">
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import { ArrowRight, ChevronRight, Info, MapPin, Shuffle } from 'lucide-vue-next'
import type { Place } from '@soulrip/api'
import { SBadge, SButton, SEmptyState, SImage, SSkeleton } from '@soulrip/design-system'
import { districtName, districtNameByKo, isSamplePlace, type District } from '@/entities/district'
import { placeCategoryLabel, placeListImage, placeName } from '@/entities/place'
import { paths } from '@/shared/config'
import { useI18n } from '@/shared/i18n'
import type { Recommendation } from '../model/useDistrictRecommendations'

const props = defineProps<{
  /** null이면 전체(ALL) */
  district: District | null
  recommendation: Recommendation
  loading: boolean
}>()
const emit = defineEmits<{ reshuffle: [] }>()

const { t, lang } = useI18n()

const name = computed(() => (props.district ? districtName(props.district, lang.value) : ''))
const title = computed(() =>
  props.district
    ? t.value.journey.recommend.districtTitle(name.value)
    : t.value.journey.recommend.allTitle,
)
const description = computed(() =>
  props.district
    ? t.value.journey.recommend.districtDescription(name.value)
    : t.value.journey.recommend.allDescription,
)

/** "전체 보기": 서울 탐색 페이지로 이동해 구 이름으로 검색 (ALL이면 전체 목록) */
const viewAllLink = computed<RouteLocationRaw>(() =>
  props.district
    ? { path: paths.placeList(), query: { q: props.district.ko } }
    : { path: paths.placeList() },
)

/** 서버 장소는 상세로, 예시 장소는 서울 탐색 검색으로 연결한다. */
function linkOf(place: Place): RouteLocationRaw {
  return isSamplePlace(place)
    ? { path: paths.placeList(), query: { q: placeName(place) } }
    : paths.placeDetail(place.contentId)
}
</script>

<template>
  <!--
    ~479px : 목록 항목 = 썸네일(4rem) + 이름·분류. 상단 버튼은 제목 아래 한 줄.
    480px~ : 썸네일 4.5rem, 태그 표시.
    1024px~: 지도 오른쪽 패널. (최대 10개)
  -->
  <section class="recommend" aria-live="polite" :aria-busy="loading">
    <header class="recommend__header">
      <div class="recommend__heading">
        <SBadge :tone="district ? 'solid' : 'primary'" size="sm">
          {{ district ? name : 'ALL' }}
        </SBadge>
        <h3 class="recommend__title">{{ title }}</h3>
        <p class="recommend__description">{{ description }}</p>
      </div>

      <div class="recommend__actions">
        <SButton
          variant="ghost"
          size="sm"
          :disabled="loading || recommendation.items.length < 2"
          @click="emit('reshuffle')"
        >
          <Shuffle :size="15" aria-hidden="true" />
          {{ t.journey.recommend.shuffle }}
        </SButton>
        <SButton variant="secondary" size="sm" :to="viewAllLink">
          {{ t.common.viewAll }}
          <ArrowRight :size="15" aria-hidden="true" />
        </SButton>
      </div>
    </header>

    <p
      v-if="!loading && recommendation.source === 'sample'"
      class="recommend__notice"
      role="status"
    >
      <Info :size="16" aria-hidden="true" />
      <span>
        <strong>{{ t.journey.recommend.sampleBadge }}</strong>
        {{ t.journey.recommend.sampleNotice }}
      </span>
    </p>

    <ul v-if="loading" class="recommend__list" aria-hidden="true">
      <li v-for="index in 5" :key="index">
        <SSkeleton height="4.5rem" />
      </li>
    </ul>

    <SEmptyState
      v-else-if="recommendation.items.length === 0"
      :title="t.journey.recommend.emptyTitle"
      :description="t.journey.recommend.emptyDescription"
      compact
    >
      <template #actions>
        <SButton size="sm" :to="viewAllLink">{{ t.common.viewAll }}</SButton>
      </template>
    </SEmptyState>

    <ol v-else class="recommend__list">
      <li v-for="(place, index) in recommendation.items" :key="place.contentId">
        <RouterLink class="recommend__item" :to="linkOf(place)">
          <span class="recommend__rank">{{ index + 1 }}</span>
          <SImage
            class="recommend__thumb"
            :src="placeListImage(place)"
            :alt="placeName(place)"
            ratio="1"
            hide-fallback-label
          />
          <span class="recommend__text">
            <span class="recommend__meta">
              {{ placeCategoryLabel(place, t) }}
              <template v-if="place.district">
                ·
                <MapPin :size="12" aria-hidden="true" />
                {{ districtNameByKo(place.district, lang) }}
              </template>
            </span>
            <strong class="recommend__name ds-ellipsis">{{ placeName(place) }}</strong>
            <span v-if="place.tags?.length" class="recommend__tags ds-ellipsis">
              {{
                place.tags
                  .slice(0, 3)
                  .map((tag) => `#${tag}`)
                  .join(' ')
              }}
            </span>
          </span>
          <ChevronRight class="recommend__chevron" :size="18" aria-hidden="true" />
        </RouterLink>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.recommend {
  display: grid;
  align-content: start;
  gap: var(--space-4);
  min-width: 0;
}

.recommend__header {
  display: grid;
  gap: var(--space-3);
}

.recommend__heading {
  display: grid;
  justify-items: start;
  gap: var(--space-2);
}

.recommend__title {
  font-size: var(--fs-h3);
}

.recommend__description {
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
  line-height: var(--lh-body);
  word-break: var(--word-break);
}

.recommend__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.recommend__notice {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-3-5);
  border-radius: var(--radius-md);
  color: var(--color-warning);
  background: var(--color-warning-soft);
  font-size: var(--fs-xs);
  line-height: var(--lh-snug);
}

.recommend__notice svg {
  flex-shrink: 0;
  margin-top: 1px;
}

.recommend__notice strong {
  margin-right: var(--space-1);
}

.recommend__list {
  display: grid;
  gap: var(--space-2);
}

.recommend__item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2-5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  transition:
    border-color var(--duration-base) var(--ease-standard),
    box-shadow var(--duration-base) var(--ease-standard),
    transform var(--duration-base) var(--ease-standard);
  animation: ds-fade-up var(--duration-base) var(--ease-out);
}

@media (hover: hover) {
  .recommend__item:hover {
    border-color: var(--color-primary);
    box-shadow: var(--shadow-sm);
    transform: translateX(2px);
  }
}

.recommend__rank {
  width: 1.25rem;
  flex-shrink: 0;
  color: var(--color-primary);
  font-size: var(--fs-sm);
  font-weight: var(--fw-extrabold);
  text-align: center;
  font-variant-numeric: tabular-nums;
}

.recommend__thumb {
  width: 4rem;
  flex-shrink: 0;
  border-radius: var(--radius-sm);
}

@media (min-width: 480px) {
  .recommend__thumb {
    width: 4.5rem;
  }
}

.recommend__text {
  display: grid;
  flex: 1;
  min-width: 0;
  gap: var(--space-0-5);
}

.recommend__meta {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-1);
  color: var(--color-text-subtle);
  font-size: var(--fs-xs);
  font-weight: var(--fw-bold);
}

.recommend__name {
  font-size: var(--fs-body);
}

.recommend__tags {
  display: none;
  color: var(--color-primary);
  font-size: var(--fs-xs);
  font-weight: var(--fw-bold);
}

@media (min-width: 480px) {
  .recommend__tags {
    display: block;
  }
}

.recommend__chevron {
  flex-shrink: 0;
  color: var(--color-text-subtle);
}
</style>
