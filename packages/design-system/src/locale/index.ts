import {
  computed,
  inject,
  provide,
  toValue,
  type ComputedRef,
  type InjectionKey,
  type MaybeRefOrGetter,
} from 'vue'

/** 디자인 시스템 컴포넌트가 내부적으로 노출하는 문구 */
export interface DsMessages {
  pagination: {
    label: string
    prev: string
    next: string
    page: (page: number) => string
  }
  image: {
    empty: string
  }
  modal: {
    close: string
  }
  search: {
    clear: string
  }
  loading: string
  /** 글자 수 표시 (예: 120 / 500) */
  count: (current: number, max: number) => string
}

/** 기본값(한국어). 앱에서 provideDsMessages로 현재 언어 문구를 주입한다. */
export const defaultDsMessages: DsMessages = {
  pagination: {
    label: '페이지 이동',
    prev: '이전 페이지',
    next: '다음 페이지',
    page: (page) => `${page} 페이지`,
  },
  image: { empty: '이미지 없음' },
  modal: { close: '닫기' },
  search: { clear: '검색어 지우기' },
  loading: '불러오는 중…',
  count: (current, max) => `${current} / ${max}`,
}

const DS_MESSAGES_KEY: InjectionKey<ComputedRef<DsMessages>> = Symbol('soulrip-ds-messages')

/** 앱 루트에서 한 번 호출해 디자인 시스템 문구를 현재 언어로 연결한다. */
export function provideDsMessages(source: MaybeRefOrGetter<DsMessages>): void {
  provide(
    DS_MESSAGES_KEY,
    computed(() => toValue(source)),
  )
}

export function useDsMessages(): ComputedRef<DsMessages> {
  return inject(
    DS_MESSAGES_KEY,
    computed(() => defaultDsMessages),
  )
}
