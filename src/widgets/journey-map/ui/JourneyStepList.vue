<script setup lang="ts">
import { ArrowRight, Check, ChevronDown, Target } from 'lucide-vue-next'
import { SBadge, SButton } from '@soulrip/design-system'
import { JOURNEY_STEPS, useJourney } from '@/entities/journey'
import { useI18n } from '@/shared/i18n'
import { useChatbotLauncher } from '@/shared/model'
import { stepNumber } from '../lib/format'

defineProps<{
  activeIndex: number
  /** 스크롤 스파이용 요소 등록 */
  registerElement: (element: unknown, index: number) => void
}>()
const emit = defineEmits<{ select: [index: number] }>()

const { t } = useI18n()
const { isCompleted } = useJourney()
const { openChatbot } = useChatbotLauncher()
</script>

<template>
  <!--
    ~1023px : 아코디언. 선택한 단계만 설명·미션·바로가기 버튼이 펼쳐진다.
    1024px~ : 모든 단계가 펼쳐진 긴 목록. 스크롤해서 화면 가운데에 온 단계가 강조되고(나머지는 흐리게)
              왼쪽 지도의 노드·하단 번호·진행 막대가 함께 바뀐다.
  -->
  <ol class="steps">
    <li
      v-for="(step, index) in JOURNEY_STEPS"
      :key="step.id"
      :ref="(element) => registerElement(element, index)"
      class="step"
      :class="{ 'is-active': index === activeIndex, 'is-done': isCompleted(step.id) }"
    >
      <button
        type="button"
        class="step__head"
        :aria-expanded="index === activeIndex"
        :aria-controls="`journey-step-${step.id}`"
        @click="emit('select', index)"
      >
        <span class="step__num">{{ stepNumber(index + 1) }}</span>
        <span class="step__title">{{ t.journey.steps[step.id].title }}</span>
        <span v-if="isCompleted(step.id)" class="step__check" :aria-label="t.journey.done">
          <Check :size="14" :stroke-width="3" />
        </span>
        <span class="step__dot" aria-hidden="true" />
        <ChevronDown class="step__chevron" :size="18" aria-hidden="true" />
      </button>

      <div :id="`journey-step-${step.id}`" class="step__body">
        <p class="step__description">{{ t.journey.steps[step.id].description }}</p>

        <div class="step__mission">
          <span class="step__mission-icon" aria-hidden="true">
            <Target :size="18" />
          </span>
          <div class="step__mission-text">
            <span class="ds-eyebrow">{{ t.journey.mission }}</span>
            <p>{{ t.journey.steps[step.id].mission }}</p>
          </div>
          <SBadge :tone="isCompleted(step.id) ? 'success' : 'neutral'" size="sm">
            {{ isCompleted(step.id) ? t.journey.done : t.journey.todo }}
          </SBadge>
        </div>

        <SButton
          v-if="step.action.type === 'link'"
          :to="step.action.to"
          :variant="isCompleted(step.id) ? 'secondary' : 'primary'"
          size="sm"
          block-on-mobile
        >
          {{ t.journey.steps[step.id].cta }}
          <ArrowRight :size="15" aria-hidden="true" />
        </SButton>
        <SButton
          v-else
          :variant="isCompleted(step.id) ? 'secondary' : 'primary'"
          size="sm"
          block-on-mobile
          @click="openChatbot"
        >
          {{ t.journey.steps[step.id].cta }}
          <ArrowRight :size="15" aria-hidden="true" />
        </SButton>
      </div>
    </li>
  </ol>
</template>

<style scoped>
.steps {
  display: grid;
}

.step {
  border-top: 1px solid var(--color-border);
  scroll-margin-top: calc(var(--header-height) + var(--space-4));
  transition: border-color var(--duration-slow) var(--ease-standard);
}

.step:last-child {
  border-bottom: 1px solid var(--color-border);
}

.step.is-active {
  border-top-color: var(--color-primary);
}

/* ---- 머리글 ---- */
.step__head {
  display: flex;
  width: 100%;
  min-height: var(--tap-target);
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) 0;
  border: 0;
  color: var(--color-text);
  background: transparent;
  text-align: left;
}

.step__num {
  flex-shrink: 0;
  width: 2rem;
  color: var(--color-text-subtle);
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
  font-variant-numeric: tabular-nums;
}

.step.is-active .step__num {
  color: var(--color-primary);
}

.step__title {
  flex: 1;
  min-width: 0;
  font-size: var(--fs-h3);
  font-weight: var(--fw-extrabold);
  line-height: var(--lh-snug);
  letter-spacing: var(--ls-heading);
  word-break: var(--word-break);
}

.step__check {
  display: grid;
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  place-items: center;
  border-radius: 50%;
  color: #fff;
  background: var(--color-success);
}

.step__dot {
  display: none;
  width: 0.5rem;
  height: 0.5rem;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--color-border-strong);
  transition:
    background-color var(--duration-base),
    box-shadow var(--duration-base);
}

.step.is-active .step__dot {
  background: var(--color-primary);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-primary) 20%, transparent);
}

.step__chevron {
  flex-shrink: 0;
  color: var(--color-text-subtle);
  transition: transform var(--duration-base) var(--ease-standard);
}

.step.is-active .step__chevron {
  transform: rotate(180deg);
}

/* ---- 본문 ---- */
.step__body {
  display: grid;
  justify-items: start;
  gap: var(--space-4);
  padding: 0 0 var(--space-6) calc(2rem + var(--space-3));
}

/* 1024px 미만: 선택한 단계만 펼친다 */
@media (max-width: 1023.98px) {
  .step:not(.is-active) .step__body {
    display: none;
  }

  .step.is-active .step__body {
    animation: ds-fade-up var(--duration-base) var(--ease-out);
  }
}

@media (max-width: 479.98px) {
  .step__body {
    padding-left: 0;
  }
}

.step__description {
  color: var(--color-text-muted);
  font-size: var(--fs-body);
  line-height: var(--lh-body);
  word-break: var(--word-break);
}

.step__mission {
  display: flex;
  width: 100%;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3-5) var(--space-4);
  border: 1px dashed var(--color-border-strong);
  border-radius: var(--radius-md);
  background: var(--color-surface-alt);
}

.step.is-done .step__mission {
  border-style: solid;
  border-color: color-mix(in srgb, var(--color-success) 35%, transparent);
  background: var(--color-success-soft);
}

.step__mission-icon {
  display: grid;
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
  place-items: center;
  border-radius: 50%;
  color: var(--color-primary);
  background: var(--color-primary-soft);
}

.step__mission-text {
  display: grid;
  flex: 1;
  min-width: 0;
  gap: var(--space-0-5);
}

.step__mission-text p {
  font-size: var(--fs-sm);
  font-weight: var(--fw-bold);
  word-break: var(--word-break);
}

/* 1024px 이상: 스크롤 스토리텔링 */
@media (min-width: 1024px) {
  .step {
    display: flex;
    min-height: 26rem;
    flex-direction: column;
  }

  .step:last-child {
    min-height: 22rem;
  }

  .step__head {
    padding-top: var(--space-8);
    cursor: pointer;
  }

  .step__dot {
    display: block;
  }

  .step__chevron {
    display: none;
  }

  .step__head,
  .step__body {
    opacity: 0.45;
    transition: opacity var(--duration-slow) var(--ease-standard);
  }

  .step.is-active .step__head,
  .step.is-active .step__body {
    opacity: 1;
  }
}
</style>
