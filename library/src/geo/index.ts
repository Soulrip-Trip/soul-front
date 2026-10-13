export interface LatLng {
  lat: number
  lng: number
}

/**
 * 위도/경도가 지도에 표시 가능한 값인지 검사해 좌표 객체로 바꾼다.
 * null, NaN, 범위 밖, (0, 0)(미등록 기본값)이면 null을 반환한다.
 */
export function toLatLng(
  lat: number | null | undefined,
  lng: number | null | undefined,
): LatLng | null {
  if (typeof lat !== 'number' || typeof lng !== 'number') return null
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null
  if (Math.abs(lat) > 90 || Math.abs(lng) > 180) return null
  if (lat === 0 && lng === 0) return null

  return { lat, lng }
}

/** OpenStreetMap 임베드 URL (API 키 불필요) */
export function osmEmbedUrl({ lat, lng }: LatLng, delta = 0.006): string {
  const bbox = [lng - delta, lat - delta, lng + delta, lat + delta].join('%2C')

  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`
}

/** OpenStreetMap 전체 화면 지도 URL */
export function osmViewUrl({ lat, lng }: LatLng, zoom = 17): string {
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${zoom}/${lat}/${lng}`
}
