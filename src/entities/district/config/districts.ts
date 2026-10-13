/**
 * 서울 25개 자치구.
 * - id: 지도 경로 키 (seoul-map.generated.ts와 동일)
 * - ko: 화면 표시 + 백엔드 검색어(데이터가 한국어이므로 검색은 항상 한국어 이름으로)
 * - roman: 영어·프랑스어·스페인어·독일어 표기 (공식 로마자)
 * - hanja: 일본어 간체/중국어 간체 표기 기반 한자 [ja, zh]
 */
export interface District {
  id: DistrictId
  ko: string
  roman: string
  hanja: readonly [ja: string, zh: string]
}

export type DistrictId =
  | 'jongno'
  | 'jung'
  | 'yongsan'
  | 'seongdong'
  | 'gwangjin'
  | 'dongdaemun'
  | 'jungnang'
  | 'seongbuk'
  | 'gangbuk'
  | 'dobong'
  | 'nowon'
  | 'eunpyeong'
  | 'seodaemun'
  | 'mapo'
  | 'yangcheon'
  | 'gangseo'
  | 'guro'
  | 'geumcheon'
  | 'yeongdeungpo'
  | 'dongjak'
  | 'gwanak'
  | 'seocho'
  | 'gangnam'
  | 'songpa'
  | 'gangdong'

export const DISTRICTS: readonly District[] = [
  { id: 'jongno', ko: '종로구', roman: 'Jongno', hanja: ['鍾路', '钟路'] },
  { id: 'jung', ko: '중구', roman: 'Jung', hanja: ['中', '中'] },
  { id: 'yongsan', ko: '용산구', roman: 'Yongsan', hanja: ['龍山', '龙山'] },
  { id: 'seongdong', ko: '성동구', roman: 'Seongdong', hanja: ['城東', '城东'] },
  { id: 'gwangjin', ko: '광진구', roman: 'Gwangjin', hanja: ['広津', '广津'] },
  { id: 'dongdaemun', ko: '동대문구', roman: 'Dongdaemun', hanja: ['東大門', '东大门'] },
  { id: 'jungnang', ko: '중랑구', roman: 'Jungnang', hanja: ['中浪', '中浪'] },
  { id: 'seongbuk', ko: '성북구', roman: 'Seongbuk', hanja: ['城北', '城北'] },
  { id: 'gangbuk', ko: '강북구', roman: 'Gangbuk', hanja: ['江北', '江北'] },
  { id: 'dobong', ko: '도봉구', roman: 'Dobong', hanja: ['道峰', '道峰'] },
  { id: 'nowon', ko: '노원구', roman: 'Nowon', hanja: ['蘆原', '芦原'] },
  { id: 'eunpyeong', ko: '은평구', roman: 'Eunpyeong', hanja: ['恩平', '恩平'] },
  { id: 'seodaemun', ko: '서대문구', roman: 'Seodaemun', hanja: ['西大門', '西大门'] },
  { id: 'mapo', ko: '마포구', roman: 'Mapo', hanja: ['麻浦', '麻浦'] },
  { id: 'yangcheon', ko: '양천구', roman: 'Yangcheon', hanja: ['陽川', '阳川'] },
  { id: 'gangseo', ko: '강서구', roman: 'Gangseo', hanja: ['江西', '江西'] },
  { id: 'guro', ko: '구로구', roman: 'Guro', hanja: ['九老', '九老'] },
  { id: 'geumcheon', ko: '금천구', roman: 'Geumcheon', hanja: ['衿川', '衿川'] },
  { id: 'yeongdeungpo', ko: '영등포구', roman: 'Yeongdeungpo', hanja: ['永登浦', '永登浦'] },
  { id: 'dongjak', ko: '동작구', roman: 'Dongjak', hanja: ['銅雀', '铜雀'] },
  { id: 'gwanak', ko: '관악구', roman: 'Gwanak', hanja: ['冠岳', '冠岳'] },
  { id: 'seocho', ko: '서초구', roman: 'Seocho', hanja: ['瑞草', '瑞草'] },
  { id: 'gangnam', ko: '강남구', roman: 'Gangnam', hanja: ['江南', '江南'] },
  { id: 'songpa', ko: '송파구', roman: 'Songpa', hanja: ['松坡', '松坡'] },
  { id: 'gangdong', ko: '강동구', roman: 'Gangdong', hanja: ['江東', '江东'] },
]

export const DISTRICT_TOTAL = DISTRICTS.length

export function isDistrictId(value: unknown): value is DistrictId {
  return DISTRICTS.some((district) => district.id === value)
}

export function findDistrict(id: DistrictId): District {
  return DISTRICTS.find((district) => district.id === id)!
}
