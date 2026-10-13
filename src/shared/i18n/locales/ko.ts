/**
 * 한국어 사전 — 모든 언어 사전의 기준(schema)이다.
 * 여기에 키를 추가하면 다른 언어 파일에서 타입 오류가 나므로 7개 언어를 함께 채운다.
 * 동적 문구는 함수로 정의한다. (예: total: (n) => `총 ${n}개`)
 */
const ko = {
  common: {
    all: '전체',
    retry: '다시 시도',
    reload: '다시 불러오기',
    backToList: '목록으로',
    viewAll: '전체 보기',
    viewDetails: '자세히 보기',
    cancel: '취소',
    delete: '삭제',
    edit: '수정',
    share: '공유하기',
    loading: '불러오는 중…',
    seoul: '서울',
    none: '-',
    linkCopied: '링크를 복사했어요.',
    copyFailed: '링크를 복사하지 못했어요.',
    skipToContent: '본문으로 건너뛰기',
  },

  nav: {
    home: '홈',
    explore: '서울 탐색',
    festival: '축제',
    community: '혼행 커뮤니티',
    mainMenu: '주요 메뉴',
    homeLink: 'Soulrip 홈',
    language: '언어',
    themeToLight: '라이트 모드로 전환',
    themeToDark: '다크 모드로 전환',
  },

  footer: {
    tagline: '혼자여도 연결되는 서울 여행',
    menu: '바로가기',
  },

  meta: {
    home: '혼자여도 좋은 서울 여행',
    placeList: '서울 탐색',
    placeDetail: '장소 상세',
    festivalList: '서울 축제',
    festivalDetail: '축제 상세',
    postList: '혼행 커뮤니티',
    postNew: '새 글 작성',
    postDetail: '게시글',
    postEdit: '게시글 수정',
    notFound: '페이지를 찾을 수 없음',
  },

  ds: {
    pagination: {
      label: '페이지 이동',
      prev: '이전 페이지',
      next: '다음 페이지',
      page: (page: number) => `${page} 페이지`,
    },
    image: { empty: '이미지 없음' },
    modal: { close: '닫기' },
    search: { clear: '검색어 지우기' },
    loading: '불러오는 중…',
    count: (current: number, max: number) => `${current} / ${max}`,
  },

  home: {
    hero: {
      badge: '혼자여도 충분히 좋은 서울 여행',
      title1: '나만의 속도로,',
      title2: '서울을 Soulrip',
      description:
        '관광지·혼밥·축제 정보를 한곳에서 찾고,\n혼자 다녀온 경험과 함께할 일행을 익명으로 나눠보세요.',
      exploreCta: '서울 탐색하기',
      communityCta: '혼행 이야기 보기',
    },
    stats: {
      label: 'Soulrip 데이터 현황',
      places: '서울 장소',
      festivals: '축제·행사',
      posts: '혼행 이야기',
    },
    insight: {
      title: '오늘의 AI 인사이트',
      load: '인사이트 보기',
      reload: '다시 불러오기',
      loading: '분석 중…',
      emptyTitle: '오늘의 서울 인사이트를 확인해 보세요.',
      emptyDescription: 'AI가 서울 관광 데이터를 분석해\n혼자 여행하기 좋은 정보를 추천해 드려요.',
      loadingTitle: '서울 관광 데이터를 분석하고 있어요.',
      loadingDescription: '혼자 여행하기 좋은 정보를 찾는 중이에요.',
      errorTitle: '인사이트를 불러오지 못했어요.',
      refreshFailed: '새로고침에 실패했어요. 기존 인사이트를 표시합니다.',
    },
    keywords: {
      title: '지금 많이 찾는 키워드',
      // label은 화면 표시용, query는 백엔드 검색어(한국어 데이터 기준)
      items: [
        { label: '#혼밥', query: '혼밥' },
        { label: '#혼자걷기', query: '혼자걷기' },
        { label: '#야경명소', query: '야경' },
        { label: '#전시추천', query: '전시' },
        { label: '#카페투어', query: '카페' },
        { label: '#당일치기', query: '당일' },
      ],
    },
    sections: {
      places: { eyebrow: '서울 탐색', title: '혼자 가기 좋은 서울' },
      festivals: { eyebrow: '축제 캘린더', title: '곧 만날 서울 축제', cta: '전체 일정' },
      posts: { eyebrow: '익명 혼행 커뮤니티', title: '혼밥 추천부터 동행 모집까지', cta: '글쓰기' },
    },
    sectionError: '목록을 불러오지 못했어요.',
    sectionEmpty: '아직 등록된 정보가 없어요.',
  },

  place: {
    filters: {
      ALL: '전체',
      TOUR: '관광지',
      LEISURE: '레포츠',
      CULTURE: '문화시설',
      SHOPPING: '쇼핑',
      ACCOMMODATION: '숙박',
      COURSE: '여행코스',
      FESTIVAL: '축제·공연·행사',
    },
    /** 백엔드 category/contentType 값을 화면 문구로 바꿀 때 사용 */
    categoryLabels: {
      TOUR: '관광지',
      LEISURE: '레포츠',
      CULTURE: '문화시설',
      SHOPPING: '쇼핑',
      ACCOMMODATION: '숙박',
      COURSE: '여행코스',
      FESTIVAL: '축제·공연·행사',
      FOOD: '음식점',
      CAFE: '카페',
      NATURE: '자연',
    },
    fallbackName: '장소 정보',
    fallbackCategory: '서울 장소',
    fallbackSummary: '서울의 장소 정보를 확인해 보세요.',
    soloScore: (score: number) => `혼행 ${score}점`,
    list: {
      eyebrow: '서울 지역 정보',
      title: '나에게 맞는 서울 찾기',
      description:
        '서울의 관광지·레포츠·문화시설·쇼핑·숙박·여행코스·축제를 유형별로 탐색하고 상세 정보를 확인하세요.',
      searchLabel: '장소 검색',
      searchPlaceholder: '장소명, 지역, 태그 검색',
      categoryLabel: '장소 유형',
      resultCount: (count: number) => `${count.toLocaleString('ko-KR')}곳`,
      emptyTitle: '검색 조건에 맞는 장소가 없습니다.',
      emptyDescription: '검색어를 바꾸거나 다른 유형을 선택해 보세요.',
      resetFilters: '조건 초기화',
      errorTitle: '장소 정보를 불러오지 못했어요.',
    },
    detail: {
      back: '서울 탐색으로',
      loading: '장소 정보를 불러오는 중입니다…',
      errorTitle: '장소 정보를 불러오지 못했어요.',
      about: '장소 소개',
      summary: (category: string, name: string) => `${category} 유형의 ${name}입니다.`,
      tagsSummary: (tags: string) => `${tags} 관련 정보를 확인해 보세요.`,
      visitorInfo: '이용 정보',
      address: '주소',
      district: '지역',
      phone: '전화번호',
      soloScore: '혼행 추천 점수',
      scoreValue: (score: number) => `${score}점`,
      category: '유형',
      tipBadge: '혼행 팁',
      tipTitle: '혼자 방문하기 좋은 곳인지 운영 정보와 위치를 함께 확인해 보세요.',
      bookmark: '북마크',
      bookmarked: '저장됨',
      dataInfo: '데이터 정보',
      contentId: '콘텐츠 ID',
      contentType: '콘텐츠 유형',
    },
  },

  festival: {
    fallbackName: '축제 정보',
    fallbackCategory: '축제',
    fallbackDescription: '축제 정보를 확인해 보세요.',
    noSchedule: '일정 정보 없음',
    list: {
      eyebrow: '서울 축제 캘린더',
      title: '혼자도, 함께도 즐거운 축제',
      description:
        '월별 일정을 확인하고 날짜를 눌러 진행 중인 축제를 확인해 보세요.\n동행이 필요하면 커뮤니티에서 함께 갈 사람을 모집할 수 있습니다.',
      companionCta: '동행 모집하기',
      monthFilterLabel: '월 선택',
      listEyebrow: '축제 목록',
      listTitleAll: '서울에서 열리는 축제',
      listTitleMonth: (month: string) => `${month}에 열리는 축제`,
      total: (count: number) => `총 ${count.toLocaleString('ko-KR')}개`,
      emptyTitle: '선택한 달의 축제 정보가 없습니다.',
      emptyDescription: '다른 달을 선택해 보세요.',
      errorTitle: '축제 정보를 불러오지 못했어요.',
    },
    calendar: {
      eyebrow: 'FESTIVAL CALENDAR',
      legend: '축제가 있는 날',
      today: '오늘',
      prevMonth: '이전 달',
      nextMonth: '다음 달',
      loading: '달력을 불러오는 중입니다.',
      more: (count: number) => `+${count}개`,
      dayLabel: (date: string, count: number) => (count > 0 ? `${date}, 축제 ${count}개` : date),
    },
    selected: {
      badge: '선택한 날짜',
      count: (count: number) => `${count}개의 축제`,
      emptyTitle: '이 날짜에는 예정된 축제가 없어요.',
      emptyDescription: '다른 날짜를 선택해 진행 중인 축제를 확인해 보세요.',
    },
    detail: {
      back: '축제 목록으로',
      loading: '축제 정보를 불러오는 중입니다…',
      errorTitle: '축제 정보를 불러오지 못했어요.',
      about: '축제 소개',
      noDescription: '등록된 소개가 없습니다.',
      visitorInfo: '방문 정보',
      period: '기간',
      place: '장소',
      district: '지역',
      phone: '전화번호',
      tipBadge: '혼행 팁',
      tipTitle: '함께 갈 사람이 필요하다면 커뮤니티에서 동행을 모집해 보세요.',
      companionCta: '이 축제 동행 모집하기',
      dataInfo: '데이터 정보',
      contentId: '콘텐츠 ID',
    },
  },

  post: {
    types: {
      ALL: '전체',
      FOOD: '혼밥·장소 추천',
      REVIEW: '여행 후기',
      COMPANION: '동행 모집',
      GENERAL: '자유 이야기',
    },
    fallbackType: '커뮤니티',
    stats: {
      views: (count: number) => `조회 ${count}`,
      likes: (count: number) => `좋아요 ${count}`,
      comments: (count: number) => `댓글 ${count}`,
    },
    list: {
      eyebrow: '익명 혼행 커뮤니티',
      title: '혼자 다녀온 경험을 나누고, 함께 갈 사람을 찾아보세요',
      description:
        '회원가입 없이 닉네임과 비밀번호만으로 작성할 수 있습니다.\n수정·삭제에는 작성 시 입력한 비밀번호가 필요합니다.',
      write: '새 글 작성',
      searchLabel: '게시글 검색',
      searchPlaceholder: '제목·내용·태그 검색',
      typeFilterLabel: '게시글 유형',
      total: (count: number) => `총 ${count.toLocaleString('ko-KR')}개의 게시글`,
      pageOf: (page: number, pages: number) => `${page} / ${pages} 페이지`,
      emptyTitle: '조건에 맞는 게시글이 없습니다.',
      emptyDescription: '첫 번째 이야기를 남겨보세요.',
      errorTitle: '게시글을 불러오지 못했어요.',
    },
    detail: {
      back: '커뮤니티 목록',
      loading: '게시글을 불러오는 중입니다…',
      errorTitle: '게시글을 불러오지 못했어요.',
      author: '작성자',
      views: '조회',
      likes: '좋아요',
      comments: '댓글',
    },
    like: {
      like: '좋아요',
      liked: '좋아요 완료',
      error: '좋아요 처리에 실패했습니다.',
    },
    remove: {
      title: '게시글 삭제',
      description: '작성할 때 입력한 비밀번호를 입력하세요.',
      password: '비밀번호',
      submit: '삭제',
      submitting: '삭제 중…',
      error: '삭제하지 못했습니다.',
    },
    editor: {
      createBadge: '익명 게시글 작성',
      editBadge: '게시글 수정',
      createTitle: '혼행 정보를 자유롭게 나눠보세요',
      editTitle: '작성한 내용을 수정하세요',
      description: '비밀번호는 수정·삭제 시 필요합니다.',
      back: '돌아가기',
      loading: '게시글을 불러오는 중입니다…',
      loadError: '게시글을 불러오지 못했습니다.',
      type: '게시글 유형',
      nickname: '닉네임',
      nicknamePlaceholder: '익명 닉네임',
      password: '비밀번호',
      passwordPlaceholder: '4자 이상',
      passwordHintEdit: '작성할 때 입력한 비밀번호를 입력하세요.',
      title: '제목',
      titlePlaceholder: '제목을 입력하세요',
      content: '내용',
      contentPlaceholder: '혼자 방문했을 때의 팁, 후기, 동행 조건 등을 자세히 적어주세요.',
      tags: '태그',
      tagsPlaceholder: '혼밥, 경복궁, 동행 (쉼표로 구분)',
      tagsHint: '관광지·맛집·축제·혼밥·동행 모집 등의 키워드를 입력하세요.',
      submitCreate: '게시글 등록',
      submitEdit: '수정 저장',
      submitting: '저장 중…',
      saveError: '게시글을 저장하지 못했습니다.',
      validation: {
        title: '제목을 2자 이상 입력하세요.',
        content: '내용을 2자 이상 입력하세요.',
        nickname: '닉네임을 입력하세요.',
        password: '비밀번호를 4자 이상 입력하세요.',
      },
    },
  },

  comment: {
    eyebrow: 'COMMENTS',
    title: '댓글',
    formLabel: '댓글 작성',
    nickname: '닉네임',
    nicknamePlaceholder: '닉네임을 입력하세요',
    password: '비밀번호',
    passwordPlaceholder: '댓글 삭제·수정용 비밀번호',
    content: '댓글 내용',
    contentPlaceholder: '댓글을 입력하세요.',
    shortcut: 'Ctrl + Enter로 등록',
    submit: '댓글 등록',
    submitting: '등록 중…',
    required: '닉네임, 비밀번호, 댓글 내용을 모두 입력해주세요.',
    loading: '댓글을 불러오는 중입니다…',
    loadError: '댓글을 불러오지 못했습니다.',
    submitError: '댓글을 등록하지 못했습니다.',
    emptyTitle: '아직 댓글이 없습니다.',
    emptyDescription: '첫 번째 댓글을 남겨보세요.',
  },

  chat: {
    title: 'Soulrip AI',
    subtitle: '서울 혼행 도우미',
    greeting: '안녕하세요! 혼자 서울 여행에 필요한 장소·혼밥·축제 정보를 물어보세요.',
    quick: ['혼밥하기 좋은 곳 추천해줘', '혼자 걷기 좋은 장소는?', '서울 축제 알려줘'],
    quickLabel: '추천 질문',
    loading: '답변을 찾고 있어요…',
    placeholder: '서울 여행 정보를 물어보세요',
    inputLabel: '챗봇에게 보낼 메시지',
    send: '보내기',
    error: '챗봇 연결을 확인해주세요.',
    sources: '관련 정보',
    open: 'Soulrip 챗봇 열기',
    close: '챗봇 닫기',
    reset: '대화 새로 시작',
  },

  map: {
    badge: '위치 지도',
    title: (name: string) => `${name} 위치`,
    iframeTitle: (name: string) => `${name} 위치 지도`,
    open: '큰 지도 열기',
    emptyTitle: '위치 정보가 없습니다.',
    emptyDescription: '좌표가 등록되면 지도를 확인할 수 있습니다.',
  },

  journey: {
    eyebrow: '혼행 여정 지도',
    title: '나의 서울 혼행 여정 지도',
    description:
      '지도에서 구를 눌러 그 동네 추천 장소를 확인하세요. 둘러본 구는 색이 채워지고, 미션을 완료하면 혼행 레벨이 올라가요.',
    mapLabel: '서울 25개 자치구 지도',
    districtLabel: (name: string, explored: boolean) => (explored ? `${name}, 둘러봄` : name),
    chooserLabel: '자치구 선택',
    all: '전체',
    mapHint: '지도에서 구를 누르면 그 동네 소개가 여기에 나와요.',
    steps: {
      discover: {
        title: '서울 장소 둘러보기',
        short: '장소 탐색',
        mission: '장소 상세 페이지 1곳 열어보기',
      },
      save: { title: '가고 싶은 곳 저장하기', short: '북마크', mission: '장소 1곳 북마크하기' },
      plan: {
        title: '축제 일정 확인하기',
        short: '축제 확인',
        mission: '축제 상세 정보 1개 확인하기',
      },
      ask: { title: 'AI 챗봇에게 물어보기', short: 'AI 챗봇', mission: '챗봇에게 질문 1번 하기' },
      share: {
        title: '혼행 경험 나누기',
        short: '경험 공유',
        mission: '좋아요·댓글·글쓰기 중 하나 하기',
      },
    },
    missionsLabel: '혼행 미션',
    missionDone: '완료',
    missionTodo: '도전 전',
    progressLabel: '미션 진행률',
    progress: (done: number, total: number) => `미션 ${done} / ${total}`,
    levels: ['혼행 준비생', '혼행 입문자', '혼행 탐험가', '서울 혼행 마스터'],
    reset: '처음부터 다시',
    recommend: {
      allTitle: '서울 곳곳 추천',
      allDescription: '구를 고르지 않으면 여러 동네의 장소를 골고루 보여드려요.',
      districtTitle: (name: string) => `${name} 추천 스팟`,
      districtDescription: (name: string) => `${name}에서 혼자 가기 좋은 곳을 최대 10곳 골랐어요.`,
      shuffle: '다른 추천',
      sampleBadge: '예시 데이터',
      sampleNotice: '서버에 연결할 수 없어 예시 장소를 보여드려요.',
      emptyTitle: '추천할 장소가 아직 없어요.',
      emptyDescription: '전체 보기에서 이 동네를 직접 검색해 보세요.',
      clear: '선택 해제',
    },
    toastTitle: '미션 완료!',
    toastBody: (title: string, done: number, total: number) => `${title} · ${done}/${total}`,
    toastMaster: '모든 미션 완료! 이제 서울 혼행 마스터예요.',
    viewMap: '지도 보기',
  },

  district: {
    /** 자치구 소개 (홈 여정 지도에서 구를 선택하면 표시) */
    descriptions: {
      jongno:
        '조선시대부터 서울의 정치·문화 중심지였으며, 이름은 종을 알리던 종루와 관련이 있습니다. 경복궁, 창덕궁, 북촌한옥마을, 인사동 등에서 한국의 역사와 전통문화를 깊이 경험할 수 있습니다.',
      jung: '서울 도심 한가운데 위치한 쇼핑·관광·상업 중심지입니다. 명동의 쇼핑거리와 음식, 덕수궁의 역사, 을지로의 오래된 골목과 개성 있는 카페를 함께 즐길 수 있습니다.',
      yongsan:
        '서울 중심부에 위치하며 다양한 국적과 문화가 어우러진 국제적인 지역입니다. 이태원에서 세계 각국의 음식을 맛보고 국립중앙박물관과 남산서울타워에서 한국의 역사와 서울 전경을 감상할 수 있습니다.',
      seongdong:
        '과거 공장과 수공업 지역이었던 공간들이 현대적인 문화·상업 공간으로 변화한 지역입니다. 성수동의 감각적인 카페와 편집숍, 서울숲의 녹지와 산책로가 유명합니다.',
      gwangjin:
        '한강 북쪽에 위치한 지역으로 젊은 대학가 문화와 가족 여행지가 공존합니다. 건국대학교 주변의 활기찬 거리, 서울어린이대공원, 뚝섬한강공원 등이 유명합니다.',
      dongdaemun:
        '서울 동북부의 전통시장과 교통 중심지로, 오래된 서울의 생활문화를 만날 수 있습니다. 경동시장, 서울약령시, 서울한방진흥센터에서 한국의 전통시장과 한방문화를 체험할 수 있습니다.',
      jungnang:
        '서울 동북쪽에 위치하며 중랑천과 용마산을 중심으로 자연환경이 발달한 지역입니다. 중랑장미공원의 꽃길과 용마산 전망대, 망우역사문화공원에서 자연과 역사를 함께 만날 수 있습니다.',
      seongbuk:
        '서울의 옛 성곽과 전통 주거지역이 남아 있는 역사·문화 중심지입니다. 성북동의 한옥과 오래된 골목, 길상사와 정릉 등에서 고즈넉한 서울의 분위기를 느낄 수 있습니다.',
      gangbuk:
        '북한산 남동쪽 자락에 위치한 산과 숲이 풍부한 지역입니다. 북한산 등산로와 4·19민주묘지가 있어 서울의 자연경관과 민주화 역사를 함께 경험할 수 있습니다.',
      dobong:
        '서울 최북단에 위치하며 웅장한 바위산인 도봉산으로 유명합니다. 등산과 자연을 즐기기 좋고, 서울창포원과 서울시립 사진미술관 등에서 휴식과 문화를 경험할 수 있습니다.',
      nowon:
        '서울 북동부에 위치한 주거 중심 지역으로 불암산과 수락산 등 자연환경이 풍부합니다. 화랑대 철도공원과 경춘선숲길에서는 옛 철길의 흔적과 여유로운 산책을 즐길 수 있습니다.',
      eunpyeong:
        '서울 북서쪽 북한산 기슭에 위치하며 도심 가까이에서 자연과 전통문화를 경험할 수 있습니다. 은평한옥마을과 진관사에서는 전통 건축과 사찰문화를, 북한산에서는 아름다운 산세를 즐길 수 있습니다.',
      seodaemun:
        '근현대사의 흔적과 대학가의 젊은 분위기가 어우러진 지역입니다. 서대문형무소역사관에서 한국의 독립운동 역사를 배우고 신촌과 연희동에서는 다양한 음식과 카페 문화를 경험할 수 있습니다.',
      mapo: '한강 북서쪽에 위치한 서울의 대표적인 젊은 문화·예술 지역입니다. 홍대의 음악과 거리공연, 망원동의 카페와 시장, 상암동 하늘공원의 아름다운 노을을 즐길 수 있습니다.',
      yangcheon:
        '서울 서남부에 위치한 계획적인 주거지역으로 공원과 산책로가 잘 조성되어 있습니다. 목동의 현대적인 도시 풍경과 안양천 산책길, 용왕산 전망 공간에서 여유로운 시간을 보낼 수 있습니다.',
      gangseo:
        '서울 서쪽에 위치하며 김포국제공항과 가까워 국내외 여행객의 이동이 편리한 지역입니다. 서울식물원, 국립항공박물관 등 자연과 항공문화를 체험할 수 있는 관광지가 있습니다.',
      guro: '과거 서울의 대표적인 공업지역이었으며 현재는 디지털 산업과 주거지역이 함께 발달한 곳입니다. 고척스카이돔에서 야구와 공연을 관람하거나 푸른수목원에서 휴식을 즐길 수 있습니다.',
      geumcheon:
        '서울 남서쪽에 위치하며 과거 산업단지에서 현대적인 업무·문화 공간으로 변화하고 있는 지역입니다. 가산디지털단지의 쇼핑시설과 호암산의 자연경관을 만날 수 있습니다.',
      yeongdeungpo:
        '한강 남쪽에 위치한 서울의 주요 금융·업무·상업 중심지입니다. 여의도의 고층 빌딩과 한강공원, 문래동의 오래된 철공소와 예술공간이 독특한 대비를 이룹니다.',
      dongjak:
        '한강 남쪽에 위치하며 역사적인 장소와 활기찬 생활문화가 공존합니다. 국립서울현충원에서 한국 현대사를 살펴보고 노량진수산시장에서 신선한 해산물을 경험할 수 있습니다.',
      gwanak:
        '서울 남부의 관악산을 중심으로 형성된 지역으로 서울대학교가 위치해 있습니다. 관악산 등산과 신림동 먹거리, 샤로수길의 개성 있는 카페와 음식점을 즐길 수 있습니다.',
      seocho:
        '한강 남쪽의 현대적인 주거·업무지역이자 서울의 대표적인 문화예술 중심지입니다. 예술의전당에서 공연과 전시를 관람하고 반포한강공원에서 한강의 야경을 즐길 수 있습니다.',
      gangnam:
        '한강 남쪽에 위치한 서울의 대표적인 상업·문화 중심지입니다. 고층 빌딩과 고급 쇼핑거리, K-POP 문화가 발달했으며 코엑스, 압구정, 청담동 등에서 현대적인 서울의 모습을 경험할 수 있습니다.',
      songpa:
        '한강 남동쪽에 위치한 대형 관광·쇼핑·여가 중심지입니다. 롯데월드타워와 롯데월드, 석촌호수 등 현대적인 관광명소뿐 아니라 한성백제의 역사유적도 만날 수 있습니다.',
      gangdong:
        '서울 동쪽 끝에 위치하며 한강과 녹지가 어우러진 지역입니다. 암사동 선사유적에서 선사시대 역사를 살펴볼 수 있고, 한강공원에서는 자전거와 산책을 즐길 수 있습니다.',
    },
  },

  notFound: {
    code: '404',
    title: '페이지를 찾을 수 없어요',
    description: '주소가 바뀌었거나 삭제된 페이지일 수 있어요.',
    home: '홈으로 가기',
    explore: '서울 탐색하기',
  },
}

export type Messages = typeof ko

export default ko
