/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 백엔드 API 기본 주소 (예: http://localhost:8000/api/v1) */
  readonly VITE_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
