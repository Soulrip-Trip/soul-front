import type { DistrictId } from './districts'

/** Place.category 문자열과 같은 분류 코드 (entities/place의 카테고리 매핑이 그대로 해석한다) */
export type SampleCategory =
  | 'TOUR'
  | 'CULTURE'
  | 'SHOPPING'
  | 'LEISURE'
  | 'FOOD'
  | 'CAFE'
  | 'NATURE'

export interface SampleSpot {
  name: string
  category: SampleCategory
  tags: readonly string[]
}

/**
 * API에 연결할 수 없을 때 여정 지도 오른쪽 목록에 보여줄 예시 장소.
 * 실제 서울의 대표 명소이지만 서버 데이터가 아니므로 화면에 "예시 데이터"로 표시한다.
 */
export const SAMPLE_SPOTS: Record<DistrictId, readonly SampleSpot[]> = {
  jongno: [
    { name: '경복궁', category: 'TOUR', tags: ['고궁', '야간개장'] },
    { name: '북촌한옥마을', category: 'TOUR', tags: ['한옥', '산책'] },
    { name: '익선동 한옥거리', category: 'CAFE', tags: ['카페', '한옥'] },
    { name: '광장시장', category: 'FOOD', tags: ['혼밥', '시장'] },
  ],
  jung: [
    { name: '명동거리', category: 'SHOPPING', tags: ['쇼핑', '길거리음식'] },
    { name: '덕수궁 돌담길', category: 'TOUR', tags: ['산책', '고궁'] },
    { name: '동대문디자인플라자', category: 'CULTURE', tags: ['전시', '야경'] },
  ],
  yongsan: [
    { name: 'N서울타워', category: 'TOUR', tags: ['야경', '전망'] },
    { name: '국립중앙박물관', category: 'CULTURE', tags: ['전시', '무료'] },
    { name: '이태원 경리단길', category: 'FOOD', tags: ['맛집', '골목'] },
  ],
  seongdong: [
    { name: '서울숲', category: 'NATURE', tags: ['산책', '피크닉'] },
    { name: '성수동 카페거리', category: 'CAFE', tags: ['카페투어', '팝업'] },
    { name: '응봉산', category: 'TOUR', tags: ['야경', '개나리'] },
  ],
  gwangjin: [
    { name: '뚝섬한강공원', category: 'LEISURE', tags: ['한강', '자전거'] },
    { name: '서울어린이대공원', category: 'NATURE', tags: ['산책', '무료'] },
    { name: '건대 커먼그라운드', category: 'SHOPPING', tags: ['쇼핑', '컨테이너'] },
  ],
  dongdaemun: [
    { name: '경동시장', category: 'FOOD', tags: ['시장', '혼밥'] },
    { name: '홍릉숲', category: 'NATURE', tags: ['숲길', '산책'] },
    { name: '회기 파전골목', category: 'FOOD', tags: ['파전', '골목'] },
  ],
  jungnang: [
    { name: '중랑캠핑숲', category: 'LEISURE', tags: ['캠핑', '피크닉'] },
    { name: '용마폭포공원', category: 'NATURE', tags: ['폭포', '산책'] },
    { name: '망우역사문화공원', category: 'CULTURE', tags: ['역사', '산책'] },
  ],
  seongbuk: [
    { name: '길상사', category: 'TOUR', tags: ['사찰', '조용한'] },
    { name: '북악스카이웨이 팔각정', category: 'TOUR', tags: ['야경', '드라이브'] },
    { name: '성북동 간송미술관', category: 'CULTURE', tags: ['미술관', '전시'] },
  ],
  gangbuk: [
    { name: '북한산 우이령길', category: 'NATURE', tags: ['등산', '숲길'] },
    { name: '국립4·19민주묘지', category: 'TOUR', tags: ['역사', '산책'] },
    { name: '우이천 산책로', category: 'NATURE', tags: ['산책', '벚꽃'] },
  ],
  dobong: [
    { name: '도봉산', category: 'NATURE', tags: ['등산', '혼산'] },
    { name: '둘리뮤지엄', category: 'CULTURE', tags: ['전시', '만화'] },
    { name: '김수영문학관', category: 'CULTURE', tags: ['문학', '조용한'] },
  ],
  nowon: [
    { name: '경춘선숲길', category: 'NATURE', tags: ['산책', '철길'] },
    { name: '화랑대 철도공원', category: 'TOUR', tags: ['기차', '야경'] },
    { name: '불암산 나비정원', category: 'NATURE', tags: ['정원', '산책'] },
  ],
  eunpyeong: [
    { name: '은평한옥마을', category: 'TOUR', tags: ['한옥', '카페'] },
    { name: '진관사', category: 'TOUR', tags: ['사찰', '템플스테이'] },
    { name: '불광천', category: 'NATURE', tags: ['산책', '벚꽃'] },
  ],
  seodaemun: [
    { name: '서대문형무소역사관', category: 'CULTURE', tags: ['역사', '전시'] },
    { name: '안산 자락길', category: 'NATURE', tags: ['무장애길', '산책'] },
    { name: '연희동 맛집거리', category: 'FOOD', tags: ['맛집', '혼밥'] },
  ],
  mapo: [
    { name: '망원한강공원', category: 'LEISURE', tags: ['한강', '노을'] },
    { name: '경의선숲길 연남동', category: 'NATURE', tags: ['산책', '카페'] },
    { name: '망원시장', category: 'FOOD', tags: ['시장', '혼밥'] },
  ],
  yangcheon: [
    { name: '서서울호수공원', category: 'NATURE', tags: ['호수', '산책'] },
    { name: '파리공원', category: 'NATURE', tags: ['공원', '피크닉'] },
    { name: '목동 아이스링크', category: 'LEISURE', tags: ['스케이트', '실내'] },
  ],
  gangseo: [
    { name: '서울식물원', category: 'NATURE', tags: ['식물원', '온실'] },
    { name: '국립항공박물관', category: 'CULTURE', tags: ['전시', '무료'] },
    { name: '허준박물관', category: 'CULTURE', tags: ['전시', '한의학'] },
  ],
  guro: [
    { name: '고척스카이돔', category: 'LEISURE', tags: ['야구', '공연'] },
    { name: '항동철길', category: 'NATURE', tags: ['철길', '산책'] },
    { name: '푸른수목원', category: 'NATURE', tags: ['수목원', '무료'] },
  ],
  geumcheon: [
    { name: '가산 아울렛 거리', category: 'SHOPPING', tags: ['아울렛', '쇼핑'] },
    { name: '호압사', category: 'TOUR', tags: ['사찰', '등산'] },
    { name: '안양천 벚꽃길', category: 'NATURE', tags: ['벚꽃', '산책'] },
  ],
  yeongdeungpo: [
    { name: '여의도한강공원', category: 'LEISURE', tags: ['한강', '불꽃축제'] },
    { name: '더현대 서울', category: 'SHOPPING', tags: ['쇼핑', '팝업'] },
    { name: '여의도공원', category: 'NATURE', tags: ['산책', '벚꽃'] },
  ],
  dongjak: [
    { name: '노량진수산시장', category: 'FOOD', tags: ['회', '시장'] },
    { name: '국립서울현충원', category: 'TOUR', tags: ['산책', '벚꽃'] },
    { name: '보라매공원', category: 'NATURE', tags: ['공원', '산책'] },
  ],
  gwanak: [
    { name: '관악산', category: 'NATURE', tags: ['등산', '혼산'] },
    { name: '샤로수길', category: 'FOOD', tags: ['맛집', '혼밥'] },
    { name: '낙성대공원', category: 'TOUR', tags: ['역사', '산책'] },
  ],
  seocho: [
    { name: '예술의전당', category: 'CULTURE', tags: ['공연', '전시'] },
    { name: '반포한강공원 달빛무지개분수', category: 'TOUR', tags: ['야경', '분수'] },
    { name: '서래마을', category: 'FOOD', tags: ['브런치', '카페'] },
  ],
  gangnam: [
    { name: '코엑스 별마당도서관', category: 'CULTURE', tags: ['도서관', '실내'] },
    { name: '봉은사', category: 'TOUR', tags: ['사찰', '도심'] },
    { name: '신사동 가로수길', category: 'SHOPPING', tags: ['쇼핑', '카페'] },
  ],
  songpa: [
    { name: '롯데월드타워 서울스카이', category: 'TOUR', tags: ['전망대', '야경'] },
    { name: '석촌호수', category: 'NATURE', tags: ['호수', '산책'] },
    { name: '올림픽공원', category: 'LEISURE', tags: ['공원', '자전거'] },
  ],
  gangdong: [
    { name: '암사동 선사유적지', category: 'CULTURE', tags: ['역사', '체험'] },
    { name: '일자산 허브천문공원', category: 'NATURE', tags: ['허브', '산책'] },
    { name: '광나루한강공원', category: 'LEISURE', tags: ['한강', '자전거'] },
  ],
}
