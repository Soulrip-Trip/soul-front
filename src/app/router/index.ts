import { createRouter, createWebHistory } from 'vue-router'
import { HomePage } from '@/pages/home'
import { ROUTE_NAMES } from '@/shared/config'
import type { Messages } from '@/shared/i18n'

declare module 'vue-router' {
  interface RouteMeta {
    /** 문서 제목으로 쓸 t.meta 키 */
    titleKey?: keyof Messages['meta']
  }
}

/**
 * 페이지는 서버 도메인(place / festival / post)별로 묶여 있고,
 * 도메인 단위로 코드 분할(lazy import)된다. URL은 기존 주소를 유지한다.
 */
export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    // 미션 알림의 "지도 보기"(/#journey) 등 해시 이동
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    // 같은 화면에서 필터·검색·페이지(쿼리)만 바뀌면 스크롤을 유지한다.
    if (to.path === from.path) return false
    return { top: 0 }
  },
  routes: [
    { path: '/', name: ROUTE_NAMES.home, component: HomePage, meta: { titleKey: 'home' } },

    // place
    {
      path: '/explore',
      name: ROUTE_NAMES.placeList,
      component: () => import('@/pages/place').then((m) => m.PlaceListPage),
      meta: { titleKey: 'placeList' },
    },
    {
      path: '/places/:id',
      name: ROUTE_NAMES.placeDetail,
      component: () => import('@/pages/place').then((m) => m.PlaceDetailPage),
      props: true,
      meta: { titleKey: 'placeDetail' },
    },

    // festival
    {
      path: '/festivals',
      name: ROUTE_NAMES.festivalList,
      component: () => import('@/pages/festival').then((m) => m.FestivalListPage),
      meta: { titleKey: 'festivalList' },
    },
    {
      path: '/festivals/:id',
      name: ROUTE_NAMES.festivalDetail,
      component: () => import('@/pages/festival').then((m) => m.FestivalDetailPage),
      props: true,
      meta: { titleKey: 'festivalDetail' },
    },

    // post (community)
    {
      path: '/community',
      name: ROUTE_NAMES.postList,
      component: () => import('@/pages/post').then((m) => m.PostListPage),
      meta: { titleKey: 'postList' },
    },
    {
      path: '/community/new',
      name: ROUTE_NAMES.postNew,
      component: () => import('@/pages/post').then((m) => m.PostEditorPage),
      meta: { titleKey: 'postNew' },
    },
    {
      path: '/community/:id(\\d+)',
      name: ROUTE_NAMES.postDetail,
      component: () => import('@/pages/post').then((m) => m.PostDetailPage),
      props: true,
      meta: { titleKey: 'postDetail' },
    },
    {
      path: '/community/:id(\\d+)/edit',
      name: ROUTE_NAMES.postEdit,
      component: () => import('@/pages/post').then((m) => m.PostEditorPage),
      props: true,
      meta: { titleKey: 'postEdit' },
    },

    {
      path: '/:pathMatch(.*)*',
      name: ROUTE_NAMES.notFound,
      component: () => import('@/pages/not-found').then((m) => m.NotFoundPage),
      meta: { titleKey: 'notFound' },
    },
  ],
})
