import type { Place } from '@soulrip/api'
import type { Lang } from '@soulrip/config'
import { DISTRICTS, findDistrict, type District, type DistrictId } from '../config/districts'
import { SAMPLE_SPOTS } from '../config/sample-spots'

/**
 * 현재 언어의 자치구 이름.
 * - short: 지도 라벨용 (Gangnam / 江南 / 강남구)
 * - full : 제목·목록용 (Gangnam-gu / 江南区 / 강남구)
 */
export function districtName(district: District, lang: Lang, variant: 'short' | 'full' = 'full') {
  if (lang === 'ko') return district.ko
  if (lang === 'ja' || lang === 'zh') {
    const base = district.hanja[lang === 'ja' ? 0 : 1]
    return variant === 'full' ? `${base}区` : base
  }

  return variant === 'full' ? `${district.roman}-gu` : district.roman
}

/** 데이터의 한국어 구 이름(예: '강남구')을 현재 언어로 바꾼다. 모르는 값은 그대로 반환한다. */
export function districtNameByKo(ko: string | null | undefined, lang: Lang): string {
  const district = DISTRICTS.find((item) => item.ko === ko)
  return district ? districtName(district, lang) : (ko ?? '')
}

/** 장소가 해당 구에 속하는지 (district 필드 우선, 없으면 주소) */
export function isPlaceInDistrict(place: Place, district: District): boolean {
  return place.district === district.ko || Boolean(place.address?.includes(district.ko))
}

/** 예시 장소를 화면 공통 Place 형태로 만든다. id는 음수로 실제 데이터와 구분한다. */
function toSamplePlace(district: District, spotIndex: number, order: number): Place | null {
  const spot = SAMPLE_SPOTS[district.id][spotIndex]
  if (!spot) return null

  return {
    id: -(order + 1),
    contentId: `sample-${district.id}-${spotIndex}`,
    contentTypeId: 0,
    contentType: '',
    title: spot.name,
    name: spot.name,
    address: `서울특별시 ${district.ko}`,
    addressDetail: '',
    district: district.ko,
    zipcode: '',
    phone: '',
    longitude: null,
    latitude: null,
    mapLevel: null,
    imageUrl: '',
    thumbnailUrl: '',
    category: spot.category,
    tags: [...spot.tags],
    soloScore: null,
    isFeatured: false,
  }
}

/** 예시 장소 목록. 구를 지정하지 않으면 25개 구 전체 예시를 반환한다. */
export function samplePlaces(districtId: DistrictId | null): Place[] {
  const targets = districtId ? [findDistrict(districtId)] : DISTRICTS
  const places: Place[] = []

  for (const district of targets) {
    SAMPLE_SPOTS[district.id].forEach((_, index) => {
      const place = toSamplePlace(district, index, places.length)
      if (place) places.push(place)
    })
  }

  return places
}

export function isSamplePlace(place: Place): boolean {
  return place.id < 0
}
