<script setup lang="ts">
import { computed } from 'vue'
import { Check } from 'lucide-vue-next'
import { JOURNEY_PHASES, JOURNEY_STEPS, useJourney, type JourneyPhaseId } from '@/entities/journey'
import { useI18n } from '@/shared/i18n'
import { stepNumber } from '../lib/format'

const props = defineProps<{ activeIndex: number }>()
const emit = defineEmits<{ select: [index: number] }>()

const { t } = useI18n()
const { total, isCompleted } = useJourney()

const activeStep = computed(() => JOURNEY_STEPS[props.activeIndex] ?? JOURNEY_STEPS[0]!)
const progress = computed(() => `${((props.activeIndex + 1) / total) * 100}%`)

function stepsOf(phase: JourneyPhaseId) {
  return JOURNEY_STEPS.map((step, index) => ({ step, index })).filter(
    (item) => item.step.phase === phase,
  )
}
</script>

<template>
  <!--
    도면형 여정 지도. 전체 흐름을 한눈에 보여주고 노드를 누르면 해당 단계 설명으로 이동한다.

    ~479px : 루트 → 단계 묶음(DISCOVER/PLAN/SHARE)이 세로로 쌓이고, 묶음 안 노드는 2열. 연결선 숨김.
    480px~ : 루트 아래로 연결선이 갈라져 3열 묶음, 묶음 안 노드는 세로로 쌓인다.
    1024px~: 지도 전체가 왼쪽에 고정(sticky)되고 오른쪽 단계 목록 스크롤에 따라 강조가 이동한다.
  -->
  <figure class="diagram" :aria-label="t.journey.mapTitle">
    <header class="diagram__bar">
      <span>{{ t.journey.mapTitle }}</span>
      <span>SOULRIP / {{ stepNumber(total) }}</span>
    </header>

    <div class="diagram__body">
      <div class="diagram__root">
        <span class="diagram__eyebrow">{{ t.journey.rootEyebrow }}</span>
        <strong>{{ t.journey.rootTitle }}</strong>
      </div>

      <div class="diagram__phases">
        <section
          v-for="phase in JOURNEY_PHASES"
          :key="phase.id"
          class="diagram__phase"
          :aria-label="t.journey.phases[phase.id]"
        >
          <header class="diagram__phase-label">
            <span>{{ phase.code }}</span>
            {{ t.journey.phases[phase.id] }}
          </header>

          <div class="diagram__nodes">
            <button
              v-for="{ step, index } in stepsOf(phase.id)"
              :key="step.id"
              type="button"
              class="diagram__node"
              :class="{ 'is-active': index === activeIndex, 'is-done': isCompleted(step.id) }"
              :aria-pressed="index === activeIndex"
              :aria-label="
                t.journey.nodeLabel(index + 1, t.journey.steps[step.id].title, isCompleted(step.id))
              "
              @click="emit('select', index)"
            >
              <span class="diagram__node-num">{{ stepNumber(index + 1) }}</span>
              <component :is="step.icon" class="diagram__node-icon" :size="18" aria-hidden="true" />
              <strong class="diagram__node-title">{{ t.journey.steps[step.id].short }}</strong>
              <span v-if="isCompleted(step.id)" class="diagram__stamp" aria-hidden="true">
                <Check :size="12" :stroke-width="3" />
              </span>
            </button>
          </div>
        </section>
      </div>

      <!-- 스탬프 판: 완료한 미션이 채워진다. -->
      <div class="diagram__row">
        <span>{{ t.journey.stampsLabel }}</span>
        <ol class="diagram__stamps">
          <li
            v-for="step in JOURNEY_STEPS"
            :key="step.id"
            :class="{ 'is-done': isCompleted(step.id) }"
            :title="t.journey.steps[step.id].title"
          >
            <component :is="step.icon" :size="14" aria-hidden="true" />
          </li>
        </ol>
      </div>
    </div>

    <footer class="diagram__footer" aria-live="polite">
      <span class="diagram__big">{{ stepNumber(activeIndex + 1) }}</span>
      <strong class="diagram__current">{{ t.journey.steps[activeStep.id].title }}</strong>
      <span class="diagram__count">/ {{ stepNumber(total) }}</span>
      <span class="diagram__track" aria-hidden="true">
        <span :style="{ width: progress }" />
      </span>
    </footer>
  </figure>
</template>

<style scoped>
.diagram {
  --line: color-mix(in srgb, var(--color-primary) 35%, var(--color-border));
  --grid-line: color-mix(in srgb, var(--color-primary) 7%, transparent);
  --phase-gap: var(--space-3);
  --connector: 1.25rem;

  position: relative;
  margin: 0;
  overflow: hidden;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-lg);
  background-color: var(--color-surface);
  /* 도면(blueprint) 격자 */
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 1.5rem 1.5rem;
  box-shadow: var(--shadow-md);
}

/* ---- 상단 바 ---- */
.diagram__bar {
  display: flex;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-3-5) var(--space-4);
  border-bottom: 1px solid var(--color-border);
  background: color-mix(in srgb, var(--color-surface) 85%, transparent);
  color: var(--color-text-muted);
  font-size: var(--fs-xs);
  font-weight: var(--fw-extrabold);
  letter-spacing: var(--ls-eyebrow);
}

.diagram__bar span:last-child {
  color: var(--color-text-subtle);
}

.diagram__body {
  display: grid;
  gap: var(--space-5);
  padding: var(--space-5) var(--space-4);
}

@media (min-width: 768px) {
  .diagram__bar {
    padding: var(--space-4) var(--space-6);
  }

  .diagram__body {
    padding: var(--space-7) var(--space-6);
  }
}

/* ---- 루트 노드 ---- */
.diagram__root {
  position: relative;
  display: grid;
  justify-items: center;
  gap: var(--space-1);
  width: min(100%, 22rem);
  margin-inline: auto;
  padding: var(--space-4);
  border: 1px solid var(--color-primary);
  background: var(--color-primary-soft);
  text-align: center;
}

.diagram__eyebrow {
  color: var(--color-primary);
  font-size: var(--fs-xs);
  font-weight: var(--fw-extrabold);
  letter-spacing: var(--ls-eyebrow);
}

.diagram__root strong {
  font-size: var(--fs-body);
}

/* ---- 단계 묶음 ---- */
.diagram__phases {
  position: relative;
  display: grid;
  gap: var(--space-4);
}

.diagram__phase {
  position: relative;
  display: grid;
  align-content: start;
  gap: var(--space-2);
}

.diagram__phase-label {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: var(--space-1-5);
  color: var(--color-text-subtle);
  font-size: var(--fs-xs);
  font-weight: var(--fw-bold);
}

.diagram__phase-label span {
  color: var(--color-primary);
  font-weight: var(--fw-extrabold);
  letter-spacing: var(--ls-eyebrow);
}

.diagram__nodes {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-2);
}

/* 480px 이상: 3갈래 + 연결선 */
@media (min-width: 480px) {
  .diagram__body {
    gap: calc(var(--connector) * 2);
  }

  .diagram__phases {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--phase-gap);
  }

  .diagram__nodes {
    grid-template-columns: minmax(0, 1fr);
  }

  /* 루트 아래 세로선 */
  .diagram__root::after {
    position: absolute;
    top: 100%;
    left: 50%;
    width: 1px;
    height: var(--connector);
    content: '';
    background: var(--line);
  }

  /* 가로선: 첫 열 중앙 ~ 마지막 열 중앙 */
  .diagram__phases::before {
    position: absolute;
    top: calc(var(--connector) * -1);
    right: calc((100% - var(--phase-gap) * 2) / 6);
    left: calc((100% - var(--phase-gap) * 2) / 6);
    height: 1px;
    content: '';
    background: var(--line);
  }

  /* 각 열로 내려가는 세로선 */
  .diagram__phase::before {
    position: absolute;
    top: calc(var(--connector) * -1);
    left: 50%;
    width: 1px;
    height: var(--connector);
    content: '';
    background: var(--line);
  }
}

/* ---- 노드 ---- */
.diagram__node {
  position: relative;
  display: grid;
  justify-items: center;
  gap: var(--space-1);
  min-height: 5.75rem;
  padding: var(--space-3) var(--space-2);
  border: 1px solid var(--color-border-strong);
  border-radius: 0;
  color: var(--color-text);
  background: var(--color-surface);
  text-align: center;
  transition:
    border-color var(--duration-base) var(--ease-standard),
    background-color var(--duration-base) var(--ease-standard),
    transform var(--duration-base) var(--ease-standard),
    box-shadow var(--duration-base) var(--ease-standard);
}

@media (hover: hover) {
  .diagram__node:hover {
    border-color: var(--color-primary);
    transform: translateY(-2px);
  }
}

.diagram__node.is-active {
  border-color: var(--color-primary);
  background: var(--color-primary-soft);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 18%, transparent);
}

.diagram__node-num {
  color: var(--color-text-subtle);
  font-size: var(--fs-xs);
  font-weight: var(--fw-bold);
}

.diagram__node-icon {
  color: var(--color-primary);
}

.diagram__node-title {
  font-size: var(--fs-sm);
  line-height: var(--lh-snug);
  word-break: var(--word-break);
}

.diagram__node.is-done .diagram__node-icon {
  color: var(--color-success);
}

/* 완료 스탬프 */
.diagram__stamp {
  position: absolute;
  top: calc(var(--space-1-5) * -1);
  right: calc(var(--space-1-5) * -1);
  display: grid;
  width: 1.375rem;
  height: 1.375rem;
  place-items: center;
  border: 2px solid var(--color-surface);
  border-radius: 50%;
  color: #fff;
  background: var(--color-success);
  animation: diagram-stamp var(--duration-slow) var(--ease-out);
}

@keyframes diagram-stamp {
  from {
    opacity: 0;
    transform: scale(1.8) rotate(-20deg);
  }
}

/* ---- 스탬프 판 ---- */
.diagram__row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-3-5) var(--space-4);
  border: 1px solid var(--color-border);
  background: var(--color-surface-alt);
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
}

.diagram__stamps {
  display: flex;
  gap: var(--space-1-5);
}

.diagram__stamps li {
  display: grid;
  width: 1.875rem;
  height: 1.875rem;
  place-items: center;
  border: 1px dashed var(--color-border-strong);
  border-radius: 50%;
  color: var(--color-text-subtle);
}

.diagram__stamps li.is-done {
  border: 1px solid var(--color-success);
  color: #fff;
  background: var(--color-success);
}

/* ---- 하단: 현재 단계 + 진행 막대 ---- */
.diagram__footer {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-4) var(--space-5);
  border-top: 1px solid var(--color-border);
  background: color-mix(in srgb, var(--color-surface) 85%, transparent);
}

@media (min-width: 768px) {
  .diagram__footer {
    padding: var(--space-5) var(--space-6) var(--space-6);
  }
}

.diagram__big {
  color: var(--color-primary);
  font-size: var(--fs-h2);
  font-weight: var(--fw-bold);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.diagram__current {
  flex: 1;
  min-width: 0;
  font-size: var(--fs-sm);
}

.diagram__count {
  color: var(--color-text-subtle);
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
}

.diagram__track {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 3px;
  background: var(--color-border);
}

.diagram__track span {
  display: block;
  height: 100%;
  background: var(--color-primary);
  transition: width var(--duration-slow) var(--ease-out);
}
</style>
