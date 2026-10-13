import {
  emptyPaginationMeta,
  festivalApi,
  placeApi,
  postApi,
  type CommunityPost,
  type Festival,
  type Paginated,
  type Place,
} from '@soulrip/api'
import { PAGE_SIZE } from '@soulrip/config'
import { useAsyncState } from '@soulrip/library/vue'

const empty = <T>(size: number): Paginated<T> => ({ items: [], meta: emptyPaginationMeta(size) })

/**
 * 홈 피드. 세 섹션을 독립적으로 불러와 한 섹션이 실패해도 나머지는 보이게 한다.
 * (기존 Promise.all은 하나만 실패해도 전체가 빈 화면이 되었다.)
 * setup 시점에 바로 요청해 첫 렌더부터 스켈레톤이 보이게 한다.
 */
export function useHomeFeed() {
  const places = useAsyncState(
    () => placeApi.getPlaces({ page: 1, size: PAGE_SIZE.homePlaces }),
    empty<Place>(PAGE_SIZE.homePlaces),
  )
  const festivals = useAsyncState(
    () => festivalApi.getFestivals({ page: 1, size: PAGE_SIZE.homeFestivals }),
    empty<Festival>(PAGE_SIZE.homeFestivals),
  )
  const posts = useAsyncState(
    () => postApi.getPosts({ page: 1, size: PAGE_SIZE.homePosts }),
    empty<CommunityPost>(PAGE_SIZE.homePosts),
  )

  void places.run()
  void festivals.run()
  void posts.run()

  return { places, festivals, posts }
}
