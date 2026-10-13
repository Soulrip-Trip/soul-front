import { useRoute, useRouter, type LocationQuery } from 'vue-router'

export type QueryPatch = Record<string, string | number | null | undefined>

/**
 * 현재 URL 쿼리에 변경분만 덮어써 router.replace 한다.
 * null / undefined / '' 값은 쿼리에서 제거한다.
 *
 * 한 번의 사용자 동작(예: 카테고리 변경 + 페이지 초기화)은 한 번의 patch 호출로 처리한다.
 * (연속 호출하면 아직 갱신되지 않은 route.query를 기준으로 덮어써 앞의 변경이 사라질 수 있다.)
 */
export function useQueryPatch() {
  const route = useRoute()
  const router = useRouter()

  return (patch: QueryPatch) => {
    const query: LocationQuery = { ...route.query }

    for (const [key, value] of Object.entries(patch)) {
      if (value === null || value === undefined || value === '') delete query[key]
      else query[key] = String(value)
    }

    return router.replace({ query })
  }
}
