import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  emptyPaginationMeta,
  placeApi,
  type PlaceCategory,
  type PlaceListParams,
} from '@soulrip/api'
import { PAGE_SIZE, SEARCH_DEBOUNCE_MS } from '@soulrip/config'
import { firstQueryValue, toPageNumber } from '@soulrip/library'
import { useAsyncState, watchDebounced } from '@soulrip/library/vue'
import { isPlaceCategory } from '@/entities/place'
import { useI18n } from '@/shared/i18n'
import { useQueryPatch } from '@/shared/lib/router'

/**
 * 장소 목록 상태. URL 쿼리(q, category, page)가 단일 진실 공급원이다.
 * → 새로고침·뒤로가기·링크 공유 시 같은 검색 결과가 유지된다.
 * → 홈의 인기 키워드(/explore?q=혼밥)도 그대로 검색에 반영된다.
 */
export function usePlaceList() {
  const route = useRoute()
  const routeName = route.name
  const patchQuery = useQueryPatch()
  const { t } = useI18n()

  const appliedSearch = computed(() => firstQueryValue(route.query.q).trim())
  const category = computed<PlaceCategory>(() => {
    const value = firstQueryValue(route.query.category)
    return isPlaceCategory(value) ? value : 'ALL'
  })
  const page = computed(() => toPageNumber(route.query.page))

  /** 입력창 값. 디바운스 후 URL에 반영된다. */
  const search = ref(appliedSearch.value)

  watch(appliedSearch, (value) => {
    if (value !== search.value.trim()) search.value = value
  })

  watchDebounced(
    search,
    (value) => {
      if (route.name === routeName && value.trim() !== appliedSearch.value) {
        void patchQuery({ q: value.trim(), page: null })
      }
    },
    SEARCH_DEBOUNCE_MS,
  )

  const state = useAsyncState(
    (params: PlaceListParams) => placeApi.getPlaces(params),
    { items: [], meta: emptyPaginationMeta(PAGE_SIZE.places) },
    { errorMessage: t.value.place.list.errorTitle },
  )

  function load() {
    return state.run({
      category: category.value,
      search: appliedSearch.value,
      page: page.value,
      size: PAGE_SIZE.places,
    })
  }

  watch(
    [category, appliedSearch, page],
    () => {
      // 다른 화면으로 이동하는 중에는 요청하지 않는다.
      if (route.name === routeName) void load()
    },
    { immediate: true },
  )

  const categoryModel = computed<PlaceCategory>({
    get: () => category.value,
    set: (value) => void patchQuery({ category: value === 'ALL' ? null : value, page: null }),
  })

  const pageModel = computed<number>({
    get: () => page.value,
    set: (value) => void patchQuery({ page: value === 1 ? null : value }),
  })

  const hasFilters = computed(() => appliedSearch.value !== '' || category.value !== 'ALL')

  function resetFilters() {
    search.value = ''
    void patchQuery({ q: null, category: null, page: null })
  }

  return {
    search,
    category: categoryModel,
    page: pageModel,
    places: computed(() => state.data.value.items),
    meta: computed(() => state.data.value.meta),
    loading: state.loading,
    error: state.error,
    hasFilters,
    reload: load,
    resetFilters,
  }
}
