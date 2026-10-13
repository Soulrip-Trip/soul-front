<script setup lang="ts">
import { computed } from 'vue'
import { Map as MapIcon, X } from 'lucide-vue-next'
import { SChipGroup, SIconButton, SSectionHeader, type ChipOption } from '@soulrip/design-system'
import {
  DISTRICTS,
  SeoulMap,
  districtName,
  useDistrictExploration,
  type DistrictId,
} from '@/entities/district'
import { useI18n } from '@/shared/i18n'
import { useDistrictRecommendations } from '../model/useDistrictRecommendations'
import DistrictRecommendList from './DistrictRecommendList.vue'
import JourneyProgress from './JourneyProgress.vue'

const { t, lang } = useI18n()
const { count, total } = useDistrictExploration()
const { selected, district, recommendation, loading, toggle, select, reshuffle } =
  useDistrictRecommendations()

const exploredPercent = computed(() => `${(count.value / total) * 100}%`)

/** 1024px 미만 구 선택 칩 (지도의 작은 구도 쉽게 고르도록) */
const chipOptions = computed<ChipOption<DistrictId | null>[]>(() => [
  { value: null, label: t.value.journey.all },
  ...DISTRICTS.map((item) => ({ value: item.id, label: districtName(item, lang.value) })),
])
</script>

<template>
  <!--
    서울 자치구 여정 지도
    ~1023px : 진행 현황 → 지도 카드 → 구 선택 칩(가로 스크롤) → 추천 목록 순서로 쌓인다.
    1024px~ : 왼쪽 지도 카드(sticky) | 오른쪽 추천 목록 2단. 칩은 숨기고 지도로만 선택한다.
  -->
  <section id="journey" class="ds-section journey" :aria-label="t.journey.title">
    <div class="ds-container">
      <SSectionHeader
        :eyebrow="t.journey.eyebrow"
        :title="t.journey.title"
        :description="t.journey.description"
      >
        <template #icon><MapIcon :size="15" /></template>
      </SSectionHeader>

      <JourneyProgress />

      <div class="journey__layout">
        <div class="journey__map-col">
          <figure class="map-card">
            <header class="map-card__bar">
              <span>SEOUL · {{ total }} DISTRICTS</span>
              <span class="map-card__selected">
                {{ district ? districtName(district, lang) : 'ALL' }}
                <SIconButton
                  v-if="district"
                  :label="t.journey.recommend.clear"
                  variant="ghost"
                  size="sm"
                  @click="select(null)"
                >
                  <X :size="14" />
                </SIconButton>
              </span>
            </header>

            <div class="map-card__body">
              <SeoulMap
                :selected="selected"
                :label="t.journey.mapLabel"
                :district-label="t.journey.districtLabel"
                @select="toggle"
              />
            </div>

            <footer class="map-card__footer">
              <span class="map-card__count">
                <strong>{{ String(count).padStart(2, '0') }}</strong>
                / {{ total }}
              </span>
              <span class="map-card__caption">{{ t.journey.explored(count, total) }}</span>
              <span class="map-card__track" aria-hidden="true">
                <span :style="{ width: exploredPercent }" />
              </span>
            </footer>
          </figure>

          <SChipGroup
            v-model="selected"
            class="journey__chips"
            :options="chipOptions"
            :label="t.journey.chooserLabel"
            size="sm"
          />
        </div>

        <DistrictRecommendList
          :district="district"
          :recommendation="recommendation"
          :loading="loading"
          @reshuffle="reshuffle"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.journey {
  scroll-margin-top: var(--header-height);
}

.journey__layout {
  display: grid;
  gap: var(--space-6);
}

.journey__map-col {
  display: grid;
  align-content: start;
  gap: var(--space-4);
  min-width: 0;
}

@media (min-width: 1024px) {
  .journey__layout {
    grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
    align-items: start;
    gap: var(--space-10);
  }

  .journey__map-col {
    position: sticky;
    top: calc(var(--header-height) + var(--space-6));
  }

  .journey__chips {
    display: none;
  }
}

/* ---- 지도 카드 (도면 스타일) ---- */
.map-card {
  --grid-line: color-mix(in srgb, var(--color-primary) 7%, transparent);

  margin: 0;
  overflow: hidden;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-lg);
  background-color: var(--color-surface);
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 1.5rem 1.5rem;
  box-shadow: var(--shadow-md);
}

.map-card__bar {
  display: flex;
  min-height: 3.25rem;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-2) var(--space-2) var(--space-4);
  border-bottom: 1px solid var(--color-border);
  background: color-mix(in srgb, var(--color-surface) 85%, transparent);
  color: var(--color-text-muted);
  font-size: var(--fs-xs);
  font-weight: var(--fw-extrabold);
  letter-spacing: var(--ls-eyebrow);
}

.map-card__selected {
  display: inline-flex;
  min-height: 2.25rem;
  align-items: center;
  gap: var(--space-1);
  padding-right: var(--space-2);
  color: var(--color-primary);
  letter-spacing: 0;
}

.map-card__body {
  padding: var(--space-4) var(--space-3);
}

@media (min-width: 768px) {
  .map-card__body {
    padding: var(--space-6) var(--space-8);
  }
}

.map-card__footer {
  position: relative;
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-4) var(--space-5);
  border-top: 1px solid var(--color-border);
  background: color-mix(in srgb, var(--color-surface) 85%, transparent);
}

.map-card__count {
  color: var(--color-text-subtle);
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
  font-variant-numeric: tabular-nums;
}

.map-card__count strong {
  color: var(--color-primary);
  font-size: var(--fs-h2);
}

.map-card__caption {
  color: var(--color-text-muted);
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
}

.map-card__track {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 3px;
  background: var(--color-border);
}

.map-card__track span {
  display: block;
  height: 100%;
  background: var(--color-primary);
  transition: width var(--duration-slow) var(--ease-out);
}
</style>
