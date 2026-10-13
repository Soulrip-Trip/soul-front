/** 백엔드 API 기본 주소. 끝의 `/`는 제거해 경로 결합을 단순하게 유지한다. */
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(
  /\/$/,
  '',
)

export const IS_DEV = import.meta.env.DEV
