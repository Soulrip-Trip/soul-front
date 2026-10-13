<script setup lang="ts">
import { computed } from 'vue'
import { Map as MapIcon, RotateCcw, Trophy } from 'lucide-vue-next'
import { SButton, SSectionHeader } from '@soulrip/design-system'
import { useJourney } from '@/entities/journey'
import { useI18n } from '@/shared/i18n'
import { useJourneyMap } from '../model/useJourneyMap'
import JourneyDiagram from './JourneyDiagram.vue'
import JourneyStepList from './JourneyStepList.vue'

const { t } = useI18n()
const { done, total, level, reset } = useJourney()
const { activeIndex, registerStepElement, select } = useJourneyMap()

const percent = computed(() => Math.round((done.value / total) * 100))
</script>

<template>
  <!--
    ~1023px : 소개 → 진행 현황 → 도면(지도) → 단계 아코디언 순서로 쌓인다.
    1024px~ : 왼쪽 도면(sticky) | 오른쪽 단계 목록 2단. 오른쪽을 스크롤하면 왼쪽 강조가 따라간다.
  -->
  <section id="journey" class="ds-section journey" aria-labelledby="journey-title">
    <div class="ds-container">
      <SSectionHeader
        :eyebrow="t.journey.eyebrow"
        :title="t.journey.title"
        :description="t.journey.description"
      >
        <template #icon><MapIcon :size="15" /></template>
      </SSectionHeader>

      <!-- 진행 현황: 레벨 · 완료 수 · 진행 막대 · 초기화 -->
      <div class="journey__summary">
        <span class="journey__level" :class="`is-level-${level}`">
          <Trophy :size="18" aria-hidden="true" />
          {{ t.journey.levels[level] }}
        </span>
        <div class="journey__progress">
          <span class="journey__progress-text">{{ t.journey.progress(done, total) }}</span>
          <span
            class="journey__bar"
            role="progressbar"
            :aria-label="t.journey.progressLabel"
            :aria-valuenow="done"
            aria-valuemin="0"
            :aria-valuemax="total"
          >
            <span :style="{ width: `${percent}%` }" />
          </span>
        </div>
        <SButton v-if="done > 0" variant="ghost" size="sm" @click="reset">
          <RotateCcw :size="14" aria-hidden="true" />
          {{ t.journey.reset }}
        </SButton>
      </div>

      <div class="journey__layout">
        <div class="journey__diagram">
          <JourneyDiagram :active-index="activeIndex" @select="select($event, { scroll: true })" />
        </div>
        <JourneyStepList
          :active-index="activeIndex"
          :register-element="registerStepElement"
          @select="select($event)"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.journey {
  scroll-margin-top: var(--header-height);
}

/* ---- 진행 현황 ---- */
.journey__summary {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3) var(--space-4);
  margin-bottom: var(--space-6);
  padding: var(--space-3-5) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}

.journey__level {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1-5) var(--space-3);
  border-radius: var(--radius-pill);
  color: var(--color-text-muted);
  background: var(--color-surface-sunken);
  font-size: var(--fs-sm);
  font-weight: var(--fw-extrabold);
}

.journey__level.is-level-1 {
  color: var(--tone-blue);
  background: var(--tone-blue-soft);
}

.journey__level.is-level-2 {
  color: var(--tone-orange);
  background: var(--tone-orange-soft);
}

.journey__level.is-level-3 {
  color: var(--tone-yellow);
  background: var(--tone-yellow-soft);
}

.journey__progress {
  display: flex;
  min-width: 12rem;
  flex: 1;
  align-items: center;
  gap: var(--space-3);
}

.journey__progress-text {
  flex-shrink: 0;
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
  font-variant-numeric: tabular-nums;
}

.journey__bar {
  height: 0.5rem;
  flex: 1;
  overflow: hidden;
  border-radius: var(--radius-pill);
  background: var(--color-surface-sunken);
}

.journey__bar span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--color-primary), var(--color-success));
  transition: width var(--duration-slow) var(--ease-out);
}

/* ---- 지도 + 단계 ---- */
.journey__layout {
  display: grid;
  gap: var(--space-6);
}

@media (min-width: 1024px) {
  .journey__layout {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    align-items: start;
    gap: var(--space-14);
  }

  .journey__diagram {
    position: sticky;
    top: calc(var(--header-height) + var(--space-6));
  }
}
</style>
