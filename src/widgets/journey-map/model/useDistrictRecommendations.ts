import { computed, ref, watch } from 'vue'
import { placeApi, type Place } from '@soulrip/api'
import { PAGE_SIZE } from '@soulrip/config'
import { pickSpread, shuffle } from '@soulrip/library'
import { useAsyncState } from '@soulrip/library/vue'
import {
  findDistrict,
  isPlaceInDistrict,
  samplePlaces,
  useDistrictExploration,
  type DistrictId,
} from '@/entities/district'

/** api: 서버 데이터 / sample: 서버 연결 실패로 보여주는 예시 데이터 */
export type RecommendSource = 'api' | 'sample'

export interface Recommendation {
  items: Place[]
  source: RecommendSource
}

interface Pool {
  places: Place[]
  source: RecommendSource
}

const ALL = 'ALL'

/** 후보에서 무작위로 최대 10곳. ALL은 여러 구가 골고루 섞이도록 고른다. */
function pick(pool: Pool, id: DistrictId | null): Recommendation {
  const shuffled = shuffle(pool.places)
  const items = id
    ? shuffled.slice(0, PAGE_SIZE.districtRecommend)
    : pickSpread(shuffled, (place) => place.district, PAGE_SIZE.districtRecommend)

  return { items, source: pool.source }
}

/**
 * 여정 지도의 구별 추천 목록.
 *
 * - 구 선택: 구 이름(한국어)을 검색어로 장소를 받아 그중 무작위 최대 10곳
 * - 선택 없음(ALL): 검색어 없이 받아 여러 구가 골고루 섞이도록 최대 10곳
 * - API 실패: 예시 데이터(25개 구 대표 명소)로 대신 보여준다.
 * - 같은 구를 다시 누르면 선택이 풀려 ALL로 돌아간다.
 * - 구를 선택하면 "탐험한 구"로 기록된다. (지도 색칠)
 */
export function useDistrictRecommendations() {
  const { markExplored } = useDistrictExploration()

  const selected = ref<DistrictId | null>(null)
  /** 서버 응답 후보 캐시. 예시 데이터는 캐시하지 않아 서버가 살아나면 다시 요청한다. */
  const pools = new Map<string, Pool>()

  async function loadPool(id: DistrictId | null): Promise<Pool> {
    const key = id ?? ALL
    const cached = pools.get(key)
    if (cached) return cached

    const district = id ? findDistrict(id) : null

    try {
      const result = await placeApi.getPlaces({
        search: district?.ko,
        page: 1,
        size: PAGE_SIZE.districtPool,
      })
      // 검색어가 이름·태그에 걸린 다른 구 장소는 걸러낸다. (걸러서 비면 검색 결과 그대로)
      const matched = district
        ? result.items.filter((place) => isPlaceInDistrict(place, district))
        : result.items
      const pool: Pool = { places: matched.length ? matched : result.items, source: 'api' }

      pools.set(key, pool)
      return pool
    } catch {
      return { places: samplePlaces(id), source: 'sample' }
    }
  }

  const state = useAsyncState(async (id: DistrictId | null) => pick(await loadPool(id), id), {
    items: [],
    source: 'api',
  } as Recommendation)

  watch(
    selected,
    (id) => {
      if (id) markExplored(id)
      void state.run(id)
    },
    { immediate: true },
  )

  return {
    selected,
    district: computed(() => (selected.value ? findDistrict(selected.value) : null)),
    recommendation: state.data,
    loading: state.loading,
    /** 같은 구를 다시 누르면 ALL로 돌아간다. */
    toggle(id: DistrictId) {
      selected.value = selected.value === id ? null : id
    },
    select(id: DistrictId | null) {
      selected.value = id
    },
    /** 같은 후보에서 다시 무작위로 고른다. (요청 없음) */
    async reshuffle() {
      state.data.value = pick(await loadPool(selected.value), selected.value)
    },
  }
}
