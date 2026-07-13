import type { BuySellItem } from '@/types/types.ts';

export const BUY_SELL_ITEM_STATUS = {
  SELLING: 'selling',
  RESERVED: 'reserved',
  SOLD: 'sold',
} as const;

export const BUY_SELL_ITEM_STATUS_LABEL = {
  [BUY_SELL_ITEM_STATUS.SELLING]: '판매중',
  [BUY_SELL_ITEM_STATUS.RESERVED]: '예약중',
  [BUY_SELL_ITEM_STATUS.SOLD]: '거래완료',
} as const;

export const BUY_SELL_ITEMS: BuySellItem[] = [
  {
    id: 21,
    title: '포트메리온 머그컵',
    price: 35000,
    location: '봉담읍',
    createdAt: '2026-07-09T12:00:00+09:00',
    imageUrl:
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=600&q=80',
    status: BUY_SELL_ITEM_STATUS.SELLING,
    serviceCategoryCode: 'buySell',
    serviceCategoryText: '중고거래',
    categoryCode: 'lifeKitchen',
    categoryText: '생활/주방',
    description:
      '새상품입니다.\n2번 사진에 약간의 뭉침이 있지만 눈에 크게 띄지 않습니다.\n\n▶️ 양면 동일한 패턴\n▶️ 위아래 동일한 사이즈\n▶️ 박스는 없으며 안전하게 포장해드립니다.\n▶️ 봉담읍 직거래 또는 택배 가능합니다.',
    imageUrls: [
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1572119865084-43c285814d63?auto=format&fit=crop&w=1200&q=85',
    ],
    seller: {
      nickname: '또또',
      location: '경기 화성시 효행구 봉담읍',
      warmth: 57.2,
    },
    stats: {
      chatCount: 1,
      favoriteCount: 6,
      viewCount: 193,
    },
  },
  {
    id: 22,
    title: '바이언스 구두',
    price: 21000,
    location: '신당동',
    createdAt: '2026-07-02T11:00:00+09:00',
    imageUrl:
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
    status: BUY_SELL_ITEM_STATUS.RESERVED,
    serviceCategoryCode: 'buySell',
    serviceCategoryText: '중고거래',
    categoryCode: 'womenAccessories',
    categoryText: '여성잡화',
    description:
      '몇 번 착용하지 않아 상태 좋습니다.\n굽 마모 거의 없고 전체적으로 깨끗해요.\n\n▶️ 사이즈 240\n▶️ 박스 포함\n▶️ 직거래/택배 가능',
    imageUrls: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=85',
    ],
    seller: {
      nickname: '토리',
      location: '서울 중구 신당동',
      warmth: 41.8,
    },
    stats: {
      chatCount: 4,
      favoriteCount: 18,
      viewCount: 264,
    },
  },
  {
    id: 23,
    title: '원티그리스 코코네스트 텐트(이너 포함)',
    price: 250000,
    location: '신당동',
    createdAt: '2026-07-02T10:10:00+09:00',
    imageUrl:
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=600&q=80',
    status: BUY_SELL_ITEM_STATUS.SOLD,
    serviceCategoryCode: 'buySell',
    serviceCategoryText: '중고거래',
    categoryCode: 'sportsLeisure',
    categoryText: '스포츠/레저',
    description:
      '3회 사용한 텐트입니다.\n찢김이나 하자는 없으며 사용감만 조금 있습니다.\n\n▶️ 이너 포함\n▶️ 팩/가방 포함\n▶️ 직거래 우선',
    imageUrls: [
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&w=1200&q=85',
    ],
    seller: {
      nickname: '캠핑홀릭',
      location: '서울 중구 신당동',
      warmth: 48.3,
    },
    stats: {
      chatCount: 12,
      favoriteCount: 42,
      viewCount: 521,
    },
  },
  {
    id: 24,
    title: 'X100VI BKK 카메라 가죽 케이스',
    price: 50000,
    location: '신당동',
    createdAt: '2026-07-02T10:30:00+09:00',
    imageUrl:
      'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=600&q=80',
    status: BUY_SELL_ITEM_STATUS.SELLING,
    serviceCategoryCode: 'buySell',
    serviceCategoryText: '중고거래',
    categoryCode: 'digitalDevices',
    categoryText: '디지털기기',
    description:
      '구매 후 거의 사용하지 않았습니다.\n스크래치 없이 깨끗한 상태입니다.\n\n▶️ X100VI 전용\n▶️ 스트랩 포함',
    imageUrls: [
      'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=85',
    ],
    seller: {
      nickname: '필름감성',
      location: '서울 중구 신당동',
      warmth: 39.6,
    },
    stats: {
      chatCount: 2,
      favoriteCount: 15,
      viewCount: 189,
    },
  },
  {
    id: 25,
    title: '포켓몬 인형',
    price: 3000,
    location: '신당동',
    createdAt: '2026-07-02T09:40:00+09:00',
    imageUrl:
      'https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=600&q=80',
    status: BUY_SELL_ITEM_STATUS.SELLING,
    serviceCategoryCode: 'buySell',
    serviceCategoryText: '중고거래',
    categoryCode: 'hobbyGameMusic',
    categoryText: '취미/게임/음반',
    description:
      '장식만 해둔 인형입니다.\n오염 없이 깨끗한 상태예요.\n\n▶️ 높이 약 20cm\n▶️ 세탁 완료',
    imageUrls: [
      'https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?auto=format&fit=crop&w=1200&q=85',
    ],
    seller: {
      nickname: '피카덕후',
      location: '서울 중구 신당동',
      warmth: 62.1,
    },
    stats: {
      chatCount: 3,
      favoriteCount: 21,
      viewCount: 308,
    },
  },
  {
    id: 26,
    title: '오메가 빈티지 태엽 탁상시계',
    price: 900000,
    location: '신당동',
    createdAt: '2026-07-02T09:20:00+09:00',
    imageUrl:
      'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=600&q=80',
    status: BUY_SELL_ITEM_STATUS.SELLING,
    serviceCategoryCode: 'buySell',
    serviceCategoryText: '중고거래',
    categoryCode: 'furnitureInterior',
    categoryText: '가구/인테리어',
    description:
      '수집용으로 보관했던 빈티지 시계입니다.\n정상 작동하며 외관도 좋은 편입니다.\n\n▶️ 태엽 방식\n▶️ 빈티지 특성상 사용감 있습니다.',
    imageUrls: [
      'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=85',
    ],
    seller: {
      nickname: '빈티지샵',
      location: '서울 중구 신당동',
      warmth: 73.5,
    },
    stats: {
      chatCount: 9,
      favoriteCount: 55,
      viewCount: 842,
    },
  },
  {
    id: 27,
    title: 'cgv 할인쿠폰(1+1), 콤보할인쿠폰',
    price: 5500,
    location: '신당동',
    createdAt: '2026-07-02T08:50:00+09:00',
    imageUrl:
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80',
    status: BUY_SELL_ITEM_STATUS.SELLING,
    serviceCategoryCode: 'buySell',
    serviceCategoryText: '중고거래',
    categoryCode: 'ticketVoucher',
    categoryText: '티켓/교환권',
  },
];

export const BUY_SELL_FILTER_CATEGORIES = [
  '디지털기기',
  '생활가전',
  '가구/인테리어',
  '생활/주방',
  '유아동',
  '유아도서',
  '여성의류',
  '여성잡화',
  '남성패션/잡화',
  '뷰티/미용',
  '스포츠/레저',
  '취미/게임/음반',
  '도서',
  '티켓/교환권',
  'e쿠폰',
  '가공식품',
  '건강기능식품',
  '반려동물용품',
  '식물',
  '기타 중고물품',
  '삽니다',
] as const;

export const BUY_SELL_PRICE_OPTIONS = [
  '5,000원 이하',
  '10,000원 이하',
  '20,000원 이하',
] as const;

export const BUY_SELL_RECOMMENDED_LOCATIONS = [
  '인천광역시, 연수구, 송도동',
  '서울특별시, 강남구, 역삼동',
  '경상남도, 양산시, 물금읍',
  '경기도, 화성시 효행구, 봉담읍',
  '충청남도, 아산시, 배방읍',
  '서울특별시, 서초구, 서초동',
  '경기도, 양주시, 옥정동',
  '서울특별시, 관악구, 신림동',
  '충청남도, 천안시 서북구, 불당동',
  '경기도, 화성시 만세구, 향남읍',
  '서울특별시, 강남구, 청담동',
  '경기도, 남양주시, 다산동',
  '경기도, 남양주시, 별내동',
  '경기도, 남양주시, 화도읍',
  '대구광역시, 달성군, 다사읍',
  '서울특별시, 강서구, 마곡동',
  '서울특별시, 강남구, 압구정동',
  '경기도, 시흥시, 배곧동',
  '경기도, 평택시, 고덕동',
  '충청북도, 청주시 청원구, 오창읍',
] as const;
