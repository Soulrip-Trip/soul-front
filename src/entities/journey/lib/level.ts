/**
 * 완료한 미션 수 → 레벨 단계(0~3).
 *   0개: 준비생 / 1~2개: 입문자 / 3~4개: 탐험가 / 전부: 마스터
 * 레벨 이름은 t.journey.levels[단계]로 표시한다.
 */
export function journeyLevel(done: number, total: number): 0 | 1 | 2 | 3 {
  if (done >= total) return 3
  if (done >= 3) return 2
  if (done >= 1) return 1
  return 0
}
