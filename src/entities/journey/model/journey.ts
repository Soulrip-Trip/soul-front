import { computed, reactive, readonly, shallowRef } from 'vue'
import { STORAGE_KEYS } from '@soulrip/config'
import { readStorage, removeStorage, writeStorage } from '@soulrip/library'
import { JOURNEY_TOTAL, isJourneyStepId, type JourneyStepId } from '../config/steps'
import { journeyLevel } from '../lib/level'

type CompletedMap = Partial<Record<JourneyStepId, string>>

export interface JourneyCompletion {
  id: JourneyStepId
  /** 같은 단계 재완료와 구분하기 위한 시각 */
  at: number
}

/** 저장된 값을 검증해 읽는다. 손상된 JSON이나 알 수 없는 키는 버린다. */
function load(): CompletedMap {
  try {
    const parsed: unknown = JSON.parse(readStorage(STORAGE_KEYS.journey) ?? '{}')
    if (!parsed || typeof parsed !== 'object') return {}

    return Object.fromEntries(
      Object.entries(parsed).filter(
        ([key, value]) => isJourneyStepId(key) && typeof value === 'string',
      ),
    ) as CompletedMap
  } catch {
    return {}
  }
}

// 모듈 스코프 상태: 어느 화면에서 미션을 완료해도 지도·토스트가 같은 값을 본다.
const state = reactive<{ completed: CompletedMap }>({ completed: load() })
const lastCompletion = shallowRef<JourneyCompletion | null>(null)

/**
 * 미션 완료 처리. 이미 완료한 단계면 아무 일도 하지 않는다. (토스트 중복 방지)
 * 컴포넌트 밖(composable, 요청 성공 콜백)에서도 호출할 수 있다.
 */
export function completeJourneyStep(id: JourneyStepId): void {
  if (state.completed[id]) return

  state.completed[id] = new Date().toISOString()
  writeStorage(STORAGE_KEYS.journey, JSON.stringify(state.completed))
  lastCompletion.value = { id, at: Date.now() }
}

export function useJourney() {
  const done = computed(() => Object.keys(state.completed).length)

  return {
    total: JOURNEY_TOTAL,
    done,
    level: computed(() => journeyLevel(done.value, JOURNEY_TOTAL)),
    isCompleted: (id: JourneyStepId) => Boolean(state.completed[id]),
    /** 가장 최근에 완료된 미션 (토스트 표시용) */
    lastCompletion: readonly(lastCompletion),
    complete: completeJourneyStep,
    reset() {
      state.completed = {}
      lastCompletion.value = null
      removeStorage(STORAGE_KEYS.journey)
    },
  }
}
