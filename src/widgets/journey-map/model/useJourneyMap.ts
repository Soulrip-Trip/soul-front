import { computed, nextTick, ref, watch } from 'vue'
import { useBreakpoint } from '@soulrip/design-system'
import { prefersReducedMotion } from '@soulrip/library'
import { useScrollSpy } from '@soulrip/library/vue'
import { JOURNEY_STEPS, useJourney } from '@/entities/journey'

/** 프로그램 스크롤(노드 클릭) 중에는 스크롤 스파이 갱신을 잠시 무시한다. */
const SCROLL_LOCK_MS = 900

/**
 * 여정 지도 상태.
 * - 1024px 이상: 오른쪽 단계 목록을 스크롤하면 가운데에 온 단계가 자동 선택된다(스크롤 스토리텔링).
 * - 지도 노드를 누르면 해당 단계를 선택하고 설명 위치로 스크롤한다.
 * - 처음에는 아직 완료하지 않은 첫 미션을 보여준다.
 */
export function useJourneyMap() {
  const { lgUp } = useBreakpoint()
  const { isCompleted } = useJourney()

  const firstTodo = JOURNEY_STEPS.findIndex((step) => !isCompleted(step.id))
  const activeIndex = ref(firstTodo === -1 ? 0 : firstTodo)
  const activeStep = computed(() => JOURNEY_STEPS[activeIndex.value] ?? JOURNEY_STEPS[0]!)

  /** 단계 목록 요소 (v-for 순서와 무관하게 index 자리에 저장) */
  const stepElements = ref<HTMLElement[]>([])
  let lockedUntil = 0

  function registerStepElement(element: unknown, index: number) {
    if (element instanceof HTMLElement) stepElements.value[index] = element
  }

  const { activeIndex: spyIndex } = useScrollSpy(stepElements, { enabled: lgUp })

  watch(spyIndex, (index) => {
    if (index >= 0 && Date.now() > lockedUntil) activeIndex.value = index
  })

  function select(index: number, options: { scroll?: boolean } = {}) {
    activeIndex.value = index
    if (!options.scroll) return

    lockedUntil = Date.now() + SCROLL_LOCK_MS
    void nextTick(() =>
      stepElements.value[index]?.scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        // 데스크톱은 화면 가운데(스크롤 스파이 기준선), 모바일은 펼쳐진 설명이 보이는 만큼만
        block: lgUp.value ? 'center' : 'nearest',
      }),
    )
  }

  return { activeIndex, activeStep, registerStepElement, select }
}
