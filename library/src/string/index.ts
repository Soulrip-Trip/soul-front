/**
 * 쉼표로 구분된 태그 입력을 배열로 바꾼다. 앞의 `#`과 공백을 제거하고 중복을 없앤다.
 *
 * @example splitTags('#혼밥, 경복궁,, 혼밥') // ['혼밥', '경복궁']
 */
export function splitTags(input: string): string[] {
  const tags = input
    .split(',')
    .map((tag) => tag.trim().replace(/^#+/, '').trim())
    .filter(Boolean)

  return [...new Set(tags)]
}

/** 이름의 첫 글자(아바타 이니셜용). 서로게이트 쌍(이모지)도 한 글자로 취급한다. */
export function initialOf(name: string, fallback = '?'): string {
  const first = Array.from(name.trim())[0]

  return first ? first.toUpperCase() : fallback
}

/** 첫 번째로 비어 있지 않은 문자열을 반환한다. */
export function firstFilled(...values: Array<string | null | undefined>): string {
  return values.find((value) => typeof value === 'string' && value.trim() !== '')?.trim() ?? ''
}

/** 값이 있는 항목만 구분자로 잇는다. */
export function joinFilled(values: Array<string | null | undefined>, separator = ' · '): string {
  return values.filter((value): value is string => Boolean(value && value.trim())).join(separator)
}
