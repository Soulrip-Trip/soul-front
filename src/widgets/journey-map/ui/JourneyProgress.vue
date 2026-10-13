<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Check, Map as MapIcon, RotateCcw, Trophy } from 'lucide-vue-next'
import { SButton } from '@soulrip/design-system'
import { useDistrictExploration } from '@/entities/district'
import { JOURNEY_STEPS, useJourney } from '@/entities/journey'
import { useI18n } from '@/shared/i18n'
import { useChatbotLauncher } from '@/shared/model'

const { t } = useI18n()
const journey = useJourney()
const exploration = useDistrictExploration()
const { openChatbot } = useChatbotLauncher()

const percent = computed(() => Math.round((journey.done.value / journey.total) * 100))
const hasProgress = computed(() => journey.done.value > 0 || exploration.count.value > 0)

function resetAll() {
  journey.reset()
  exploration.reset()
}
</script>

<template>
  <!--
    진행 현황: 레벨 · 미션 진행 막대 · 탐험한 구 수 · 초기화 / 미션 칩 5개
    ~767px : 미션 칩이 가로 스크롤 한 줄
    768px~ : 칩이 여러 줄로 감싸진다.
  -->
  <div class="progress">
    <div class="progress__top">
      <span class="progress__level" :class="`is-level-${journey.level.value}`">
        <Trophy :size="18" aria-hidden="true" />
        {{ t.journey.levels[journey.level.value] }}
      </span>

      <div class="progress__bar-wrap">
        <span class="progress__text">{{
          t.journey.progress(journey.done.value, journey.total)
        }}</span>
        <span
          class="progress__bar"
          role="progressbar"
          :aria-label="t.journey.progressLabel"
          :aria-valuenow="journey.done.value"
          aria-valuemin="0"
          :aria-valuemax="journey.total"
        >
          <span :style="{ width: `${percent}%` }" />
        </span>
      </div>

      <span class="progress__explored">
        <MapIcon :size="16" aria-hidden="true" />
        {{ t.journey.explored(exploration.count.value, exploration.total) }}
      </span>

      <SButton v-if="hasProgress" variant="ghost" size="sm" @click="resetAll">
        <RotateCcw :size="14" aria-hidden="true" />
        {{ t.journey.reset }}
      </SButton>
    </div>

    <ul class="progress__missions" :aria-label="t.journey.missionsLabel">
      <li v-for="step in JOURNEY_STEPS" :key="step.id">
        <component
          :is="step.action.type === 'link' ? RouterLink : 'button'"
          v-bind="step.action.type === 'link' ? { to: step.action.to } : { type: 'button' }"
          class="progress__mission"
          :class="{ 'is-done': journey.isCompleted(step.id) }"
          :title="t.journey.steps[step.id].mission"
          @click="step.action.type === 'chatbot' && openChatbot()"
        >
          <span class="progress__mission-icon" aria-hidden="true">
            <Check v-if="journey.isCompleted(step.id)" :size="14" :stroke-width="3" />
            <component :is="step.icon" v-else :size="14" />
          </span>
          {{ t.journey.steps[step.id].short }}
          <span class="ds-sr-only">
            — {{ t.journey.steps[step.id].mission }},
            {{ journey.isCompleted(step.id) ? t.journey.missionDone : t.journey.missionTodo }}
          </span>
        </component>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.progress {
  display: grid;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
  padding: var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}

.progress__top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-3) var(--space-4);
}

.progress__level {
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

.progress__level.is-level-1 {
  color: var(--tone-blue);
  background: var(--tone-blue-soft);
}

.progress__level.is-level-2 {
  color: var(--tone-orange);
  background: var(--tone-orange-soft);
}

.progress__level.is-level-3 {
  color: var(--tone-yellow);
  background: var(--tone-yellow-soft);
}

.progress__bar-wrap {
  display: flex;
  min-width: 11rem;
  flex: 1;
  align-items: center;
  gap: var(--space-3);
}

.progress__text,
.progress__explored {
  flex-shrink: 0;
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
  font-variant-numeric: tabular-nums;
}

.progress__explored {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1-5);
  color: var(--color-primary);
}

.progress__bar {
  height: 0.5rem;
  flex: 1;
  overflow: hidden;
  border-radius: var(--radius-pill);
  background: var(--color-surface-sunken);
}

.progress__bar span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--color-primary), var(--color-success));
  transition: width var(--duration-slow) var(--ease-out);
}

/* ---- 미션 칩 ---- */
.progress__missions {
  display: flex;
  gap: var(--space-2);
  margin-inline: calc(var(--space-4) * -1);
  padding-inline: var(--space-4);
  overflow-x: auto;
  scrollbar-width: none;
}

.progress__missions::-webkit-scrollbar {
  display: none;
}

@media (min-width: 768px) {
  .progress__missions {
    flex-wrap: wrap;
    margin-inline: 0;
    padding-inline: 0;
    overflow: visible;
  }
}

.progress__missions li {
  flex-shrink: 0;
}

.progress__mission {
  display: inline-flex;
  min-height: 2.25rem;
  align-items: center;
  gap: var(--space-1-5);
  padding: 0 var(--space-3) 0 var(--space-1-5);
  border: 1px dashed var(--color-border-strong);
  border-radius: var(--radius-pill);
  color: var(--color-text-muted);
  background: var(--color-surface);
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
  white-space: nowrap;
  transition:
    border-color var(--duration-base) var(--ease-standard),
    color var(--duration-base) var(--ease-standard);
}

@media (hover: hover) {
  .progress__mission:hover {
    color: var(--color-primary);
    border-color: var(--color-primary);
  }
}

.progress__mission-icon {
  display: grid;
  width: 1.5rem;
  height: 1.5rem;
  place-items: center;
  border-radius: 50%;
  color: var(--color-primary);
  background: var(--color-primary-soft);
}

.progress__mission.is-done {
  border-style: solid;
  border-color: color-mix(in srgb, var(--color-success) 40%, transparent);
  color: var(--color-success);
  background: var(--color-success-soft);
}

.progress__mission.is-done .progress__mission-icon {
  color: #fff;
  background: var(--color-success);
}
</style>
