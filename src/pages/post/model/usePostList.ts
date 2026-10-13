import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { emptyPaginationMeta, postApi, type PostListParams, type PostType } from '@soulrip/api'
import { PAGE_SIZE, SEARCH_DEBOUNCE_MS } from '@soulrip/config'
import { firstQueryValue, toPageNumber } from '@soulrip/library'
import { useAsyncState, watchDebounced } from '@soulrip/library/vue'
import { isPostType } from '@/entities/post'
import { useI18n } from '@/shared/i18n'
import { useQueryPatch } from '@/shared/lib/router'

/** 커뮤니티 목록 상태. URL 쿼리(q, type, page)를 기준으로 불러온다. */
export function usePostList() {
  const route = useRoute()
  const routeName = route.name
  const patchQuery = useQueryPatch()
  const { t } = useI18n()

  const appliedSearch = computed(() => firstQueryValue(route.query.q).trim())
  const postType = computed<PostType>(() => {
    const value = firstQueryValue(route.query.type)
    return isPostType(value) ? value : 'ALL'
  })
  const page = computed(() => toPageNumber(route.query.page))

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
    (params: PostListParams) => postApi.getPosts(params),
    { items: [], meta: emptyPaginationMeta(PAGE_SIZE.posts) },
    { errorMessage: t.value.post.list.errorTitle },
  )

  function load() {
    return state.run({
      postType: postType.value,
      search: appliedSearch.value,
      page: page.value,
      size: PAGE_SIZE.posts,
    })
  }

  watch(
    [postType, appliedSearch, page],
    () => {
      if (route.name === routeName) void load()
    },
    { immediate: true },
  )

  const postTypeModel = computed<PostType>({
    get: () => postType.value,
    set: (value) => void patchQuery({ type: value === 'ALL' ? null : value, page: null }),
  })

  const pageModel = computed<number>({
    get: () => page.value,
    set: (value) => void patchQuery({ page: value === 1 ? null : value }),
  })

  return {
    search,
    postType: postTypeModel,
    page: pageModel,
    posts: computed(() => state.data.value.items),
    meta: computed(() => state.data.value.meta),
    loading: state.loading,
    error: state.error,
    reload: load,
  }
}
