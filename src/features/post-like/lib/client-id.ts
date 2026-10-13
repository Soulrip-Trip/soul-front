import { STORAGE_KEYS } from '@soulrip/config'
import { createUuid, readOrCreateStorage } from '@soulrip/library'

/**
 * 익명 좋아요 식별자. 브라우저마다 한 번 생성해 localStorage(`client_id`)에 보관한다.
 * 키 이름은 백엔드 좋아요 흐름과 기존 사용자 데이터 호환을 위해 유지한다.
 */
export function getClientId(): string {
  return readOrCreateStorage(STORAGE_KEYS.clientId, createUuid)
}
