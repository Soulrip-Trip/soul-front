import { ref, toValue, watch, type MaybeRefOrGetter } from 'vue'
import { STORAGE_KEYS } from '@soulrip/config'
import { readStorage, removeStorage, writeStorage } from '@soulrip/library'

/** 기기 로컬 북마크. 로그인이 없는 서비스이므로 브라우저 localStorage에만 저장한다. */
export function usePlaceBookmark(placeId: MaybeRefOrGetter<string>) {
  const bookmarked = ref(false)
  const key = () => `${STORAGE_KEYS.placeBookmarkPrefix}${toValue(placeId)}`

  watch(
    () => toValue(placeId),
    () => {
      bookmarked.value = readStorage(key()) === 'true'
    },
    { immediate: true },
  )

  function toggle() {
    bookmarked.value = !bookmarked.value

    if (bookmarked.value) writeStorage(key(), 'true')
    else removeStorage(key())
  }

  return { bookmarked, toggle }
}
