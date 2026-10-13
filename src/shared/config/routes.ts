/**
 * 라우트 이름과 경로 빌더. 화면 코드에서 경로 문자열을 직접 조합하지 않는다.
 * URL은 기존 주소(/explore, /community 등)를 유지해 외부 공유 링크가 깨지지 않게 한다.
 */
export const ROUTE_NAMES = {
  home: 'home',
  placeList: 'explore',
  placeDetail: 'place-detail',
  festivalList: 'festivals',
  festivalDetail: 'festival-detail',
  postList: 'community',
  postNew: 'community-new',
  postDetail: 'community-detail',
  postEdit: 'community-edit',
  notFound: 'not-found',
} as const

export type RouteName = (typeof ROUTE_NAMES)[keyof typeof ROUTE_NAMES]

export const paths = {
  home: () => '/',
  placeList: () => '/explore',
  placeDetail: (id: string | number) => `/places/${encodeURIComponent(String(id))}`,
  festivalList: () => '/festivals',
  festivalDetail: (contentId: string) => `/festivals/${encodeURIComponent(contentId)}`,
  postList: () => '/community',
  postNew: () => '/community/new',
  postDetail: (id: number | string) => `/community/${id}`,
  postEdit: (id: number | string) => `/community/${id}/edit`,
} as const
