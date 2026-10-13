export const APP_NAME = 'Soulrip'

/**
 * localStorage 키. 기존 사용자 데이터와 호환되도록 키 이름을 바꾸지 않는다.
 * (`client_id`는 백엔드 좋아요 식별 흐름과 맞물려 있다.)
 */
export const STORAGE_KEYS = {
  theme: 'soulrip-theme',
  lang: 'soulrip-lang',
  clientId: 'client_id',
  placeBookmarkPrefix: 'soulrip-place-',
  /** 혼행 여정(게이미피케이션) 미션 진행 상황 */
  journey: 'soulrip-journey',
  /** 여정 지도에서 둘러본 자치구 */
  exploredDistricts: 'soulrip-districts',
} as const

/** 화면별 한 번에 불러오는 목록 크기 */
export const PAGE_SIZE = {
  homePlaces: 6,
  homeFestivals: 3,
  homePosts: 4,
  places: 12,
  festivals: 12,
  /** 달력은 한 달치 일정을 한 번에 그리므로 넉넉하게 요청한다. */
  festivalCalendar: 100,
  posts: 12,
  /** 여정 지도: 구별 추천 후보를 넉넉히 받아 그중 무작위로 고른다. */
  districtPool: 30,
  /** 여정 지도: 오른쪽 목록 최대 개수 */
  districtRecommend: 10,
} as const

/** 검색 입력 디바운스(ms) */
export const SEARCH_DEBOUNCE_MS = 280

/** 챗봇 요청에 함께 보내는 최근 대화 수 */
export const CHAT_HISTORY_LIMIT = 8
