import { computed, reactive } from 'vue'
import { STORAGE_KEYS } from '@soulrip/config'
import { readStorage, removeStorage, writeStorage } from '@soulrip/library'
import { DISTRICT_TOTAL, isDistrictId, type DistrictId } from '../config/districts'

function load(): DistrictId[] {
  try {
    const parsed: unknown = JSON.parse(readStorage(STORAGE_KEYS.exploredDistricts) ?? '[]')
    return Array.isArray(parsed) ? parsed.filter(isDistrictId) : []
  } catch {
    return []
  }
}

// 모듈 스코프 상태: 지도를 다시 열어도 탐험한 구가 유지된다.
const state = reactive<{ explored: DistrictId[] }>({ explored: load() })

/**
 * 여정 지도에서 둘러본 자치구 (지도 색칠하기 게이미피케이션).
 * 로그인이 없으므로 브라우저 localStorage에만 저장한다.
 */
export function useDistrictExploration() {
  return {
    total: DISTRICT_TOTAL,
    count: computed(() => state.explored.length),
    isExplored: (id: DistrictId) => state.explored.includes(id),
    markExplored(id: DistrictId) {
      if (state.explored.includes(id)) return
      state.explored = [...state.explored, id]
      writeStorage(STORAGE_KEYS.exploredDistricts, JSON.stringify(state.explored))
    },
    reset() {
      state.explored = []
      removeStorage(STORAGE_KEYS.exploredDistricts)
    },
  }
}
