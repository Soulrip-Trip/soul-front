/** 지도 번호 표기 (1 → "01") */
export function stepNumber(value: number): string {
  return String(value).padStart(2, '0')
}
