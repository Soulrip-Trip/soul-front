/** 원본을 바꾸지 않고 섞은 새 배열을 반환한다. (Fisher–Yates) */
export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const result = [...items]

  for (let index = result.length - 1; index > 0; index--) {
    const target = Math.floor(random() * (index + 1))
    ;[result[index], result[target]] = [result[target]!, result[index]!]
  }

  return result
}

/**
 * 그룹(key)이 골고루 섞이도록 최대 count개를 고른다.
 * 그룹마다 한 개씩 돌아가며(round-robin) 뽑으므로 특정 그룹에 쏠리지 않는다.
 *
 * @example pickSpread(places, (p) => p.district, 10) // 여러 구의 장소가 골고루
 */
export function pickSpread<T>(
  items: readonly T[],
  keyOf: (item: T) => string | null | undefined,
  count: number,
): T[] {
  const groups = new Map<string, T[]>()

  for (const item of items) {
    const key = keyOf(item) ?? ''
    const group = groups.get(key)
    if (group) group.push(item)
    else groups.set(key, [item])
  }

  const queues = [...groups.values()]
  const result: T[] = []

  while (result.length < count && queues.some((queue) => queue.length > 0)) {
    for (const queue of queues) {
      const next = queue.shift()
      if (next !== undefined) result.push(next)
      if (result.length >= count) break
    }
  }

  return result
}
