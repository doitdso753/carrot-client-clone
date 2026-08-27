import type { CarListItem } from './cars.ts';
import type { UserProfile } from '@/types/user-profile.ts';

export const CAR_LIST_ITEM_STATUS_LABEL = {
  reserved: '예약중',
  sold: '거래완료',
} as const;

export const CAR_SELLER: UserProfile = {
  nickname: '수민',
  location: '경기 수원시 영통구 원천동',
  warmth: 37.2,
};

const CAR_DETAIL_DESCRIPTION = `필요하신 분께 합리적인 가격으로 판매합니다.
개인거래라 별도의 수수료 없이 차량을 가져가시면 됩니다.

최근에 가져와 엔진오일과 타이어, 에어컨 필터를 점검했습니다. 차량 상태를 직접 확인하시고 편하게 연락해 주세요.

외관은 생활 기스가 조금 있으나 운전석과 실내는 깨끗합니다. 차량은 수원 원천동에서 보실 수 있습니다.`;

const CAR_DETAIL_IMAGE_URLS = [
  'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1539788816080-8bdd722d8c22?auto=format&fit=crop&w=1200&q=85',
  'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1200&q=85',
] as const;

function getCarDetailImageUrls(startIndex: number, count: number): string[] {
  return Array.from({ length: count }, (_, index) => {
    return CAR_DETAIL_IMAGE_URLS[
      (startIndex + index) % CAR_DETAIL_IMAGE_URLS.length
    ];
  });
}

const CAR_VEHICLE_INFO = {
  bodyType: 'SUV/RV',
  registrationDate: '19년 7월 등록',
  displacement: '1,597cc',
  fuel: '디젤',
  transmission: '자동 (A/T)',
} as const;

const CAR_INSURANCE_INFO = {
  ownCarDamage: '없음',
  ownerChanges: '2회',
  usage: '렌트',
  totalLossOrFlooding: '없음',
} as const;

const CAR_SALE_INFO = {
  registrationCost: '379,330원',
  directTradeSavings: '약 650,000원',
} as const;

const CAR_DETAIL_ADDRESS = '경기도 수원시 영통구 원천동';

export const CAR_LIST_ITEMS: CarListItem[] = [
  {
    id: 101,
    transactionType: 'lease',
    title: '더 뉴 쏘렌토 하이브리드(MQ4) 1.6 HEV 2WD 노블레스',
    priceText: '렌트 87만원/월',
    modelYearText: '24년식',
    mileageText: '4.9만km',
    location: '원천동',
    address: CAR_DETAIL_ADDRESS,
    createdAt: '2026-08-03T12:00:00+09:00',
    commentCount: 0,
    favoriteCount: 1,
    viewCount: 660,
    description: CAR_DETAIL_DESCRIPTION,
    detailOptions: [],
    vehicleInfo: CAR_VEHICLE_INFO,
    insuranceInfo: CAR_INSURANCE_INFO,
    leaseInfo: {
      remainingMonths: 18,
      totalMonthlyPayment: '1,566만원',
      acquisitionPayment: '300만원',
      maturityAmount: '2,120만원',
      earlyTerminationAmount: '2,480만원',
      totalAcquisitionCost: '3,986만원',
    },
    imageUrls: getCarDetailImageUrls(0, 5),
    thumbnailImageUrl:
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 102,
    transactionType: 'sale',
    title: '오딧세이(5세대) 3.5 V6',
    priceText: '2,250만원',
    modelYearText: '19년식',
    mileageText: '5.6만km',
    location: '원천동',
    address: CAR_DETAIL_ADDRESS,
    createdAt: '2026-08-02T10:30:00+09:00',
    commentCount: 1,
    favoriteCount: 21,
    viewCount: 660,
    description: CAR_DETAIL_DESCRIPTION,
    detailOptions: [{ code: 'key', label: '키 1개' }],
    saleInfo: CAR_SALE_INFO,
    vehicleInfo: CAR_VEHICLE_INFO,
    insuranceInfo: CAR_INSURANCE_INFO,
    imageUrls: getCarDetailImageUrls(2, 6),
    thumbnailImageUrl:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 103,
    transactionType: 'sale',
    title: '5시리즈(6세대) 520d xDrive',
    priceText: '1,300만원',
    modelYearText: '14년식',
    mileageText: '21만km',
    location: '원천동',
    address: CAR_DETAIL_ADDRESS,
    createdAt: '2026-08-02T09:20:00+09:00',
    commentCount: 0,
    favoriteCount: 0,
    viewCount: 660,
    description: CAR_DETAIL_DESCRIPTION,
    detailOptions: [],
    saleInfo: CAR_SALE_INFO,
    vehicleInfo: CAR_VEHICLE_INFO,
    insuranceInfo: CAR_INSURANCE_INFO,
    imageUrls: getCarDetailImageUrls(4, 7),
    thumbnailImageUrl:
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 104,
    transactionType: 'sale',
    title: '디 올 뉴 싼타페 가솔린 2.5 2WD 익스클루시브',
    priceText: '2,900만원',
    modelYearText: '25년식',
    mileageText: '7,540km',
    location: '원천동',
    address: CAR_DETAIL_ADDRESS,
    createdAt: '2026-08-01T14:00:00+09:00',
    commentCount: 0,
    favoriteCount: 23,
    viewCount: 660,
    description: CAR_DETAIL_DESCRIPTION,
    detailOptions: [
      { code: 'singleOwner', label: '1인 소유' },
      { code: 'key', label: '키 2개' },
    ],
    saleInfo: CAR_SALE_INFO,
    vehicleInfo: CAR_VEHICLE_INFO,
    insuranceInfo: CAR_INSURANCE_INFO,
    imageUrls: getCarDetailImageUrls(6, 8),
    thumbnailImageUrl:
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 105,
    transactionType: 'lease',
    title: '뉴 GV80 2.5 가솔린 AWD 블랙',
    priceText: '렌트 116만원/월',
    modelYearText: '26년식',
    mileageText: '2,880km',
    location: '원천동',
    address: CAR_DETAIL_ADDRESS,
    createdAt: '2026-07-30T13:40:00+09:00',
    commentCount: 1,
    favoriteCount: 7,
    viewCount: 660,
    description: CAR_DETAIL_DESCRIPTION,
    detailOptions: [{ code: 'key', label: '키 1개' }],
    vehicleInfo: CAR_VEHICLE_INFO,
    insuranceInfo: CAR_INSURANCE_INFO,
    leaseInfo: {
      remainingMonths: 24,
      totalMonthlyPayment: '2,784만원',
      acquisitionPayment: '500만원',
      maturityAmount: '4,800만원',
      earlyTerminationAmount: '5,260만원',
      totalAcquisitionCost: '8,084만원',
    },
    imageUrls: getCarDetailImageUrls(8, 9),
    thumbnailImageUrl:
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 106,
    transactionType: 'sale',
    title: 'C클래스(4세대) C200 카브리올레',
    priceText: '2,750만원',
    modelYearText: '20년식',
    mileageText: '12.3만km',
    location: '원천동',
    address: CAR_DETAIL_ADDRESS,
    createdAt: '2026-07-29T11:15:00+09:00',
    commentCount: 4,
    favoriteCount: 21,
    viewCount: 660,
    description: CAR_DETAIL_DESCRIPTION,
    detailOptions: [
      { code: 'singleOwner', label: '1인 소유' },
      { code: 'key', label: '키 1개' },
    ],
    saleInfo: CAR_SALE_INFO,
    vehicleInfo: CAR_VEHICLE_INFO,
    insuranceInfo: CAR_INSURANCE_INFO,
    imageUrls: getCarDetailImageUrls(1, 10),
    thumbnailImageUrl:
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 107,
    transactionType: 'sale',
    title: '코란도 투리스모 2.0 2WD 9인승 LT',
    priceText: '200만원',
    modelYearText: '14년식',
    mileageText: '23.8만km',
    location: '원천동',
    address: CAR_DETAIL_ADDRESS,
    createdAt: '2026-07-28T16:30:00+09:00',
    commentCount: 6,
    favoriteCount: 29,
    viewCount: 660,
    description: CAR_DETAIL_DESCRIPTION,
    detailOptions: [{ code: 'key', label: '키 2개' }],
    saleInfo: CAR_SALE_INFO,
    vehicleInfo: CAR_VEHICLE_INFO,
    insuranceInfo: CAR_INSURANCE_INFO,
    imageUrls: getCarDetailImageUrls(3, 5),
    thumbnailImageUrl:
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 108,
    transactionType: 'lease',
    title: '더 뉴 K5(DL3) 1.6 가솔린 터보 프레스티지',
    status: 'sold',
    priceText: '렌트 31만원/월',
    modelYearText: '25년식',
    mileageText: '1.5만km',
    location: '원천동',
    address: CAR_DETAIL_ADDRESS,
    createdAt: '2026-07-27T15:10:00+09:00',
    commentCount: 4,
    favoriteCount: 11,
    viewCount: 660,
    description: CAR_DETAIL_DESCRIPTION,
    detailOptions: [{ code: 'singleOwner', label: '1인 소유' }],
    vehicleInfo: CAR_VEHICLE_INFO,
    insuranceInfo: CAR_INSURANCE_INFO,
    leaseInfo: {
      remainingMonths: 30,
      totalMonthlyPayment: '930만원',
      acquisitionPayment: '200만원',
      maturityAmount: '1,650만원',
      earlyTerminationAmount: '1,920만원',
      totalAcquisitionCost: '2,780만원',
    },
    imageUrls: getCarDetailImageUrls(5, 7),
    thumbnailImageUrl:
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 109,
    transactionType: 'sale',
    title: '베리 뉴 티볼리 1.6 디젤 2WD V1',
    status: 'reserved',
    priceText: '510만원',
    modelYearText: '20년식',
    mileageText: '21만km',
    location: '원천동',
    address: CAR_DETAIL_ADDRESS,
    createdAt: '2026-07-25T10:00:00+09:00',
    commentCount: 5,
    favoriteCount: 18,
    viewCount: 660,
    description: CAR_DETAIL_DESCRIPTION,
    detailOptions: [{ code: 'key', label: '키 2개' }],
    saleInfo: CAR_SALE_INFO,
    vehicleInfo: CAR_VEHICLE_INFO,
    insuranceInfo: CAR_INSURANCE_INFO,
    imageUrls: getCarDetailImageUrls(7, 8),
    thumbnailImageUrl:
      'https://images.unsplash.com/photo-1539788816080-8bdd722d8c22?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 110,
    transactionType: 'lease',
    title: 'AMG GT 63 S 4매틱+',
    priceText: '리스 1만원/월',
    modelYearText: '21년식',
    mileageText: '2.8만km',
    location: '원천동',
    address: CAR_DETAIL_ADDRESS,
    createdAt: '2026-07-24T09:30:00+09:00',
    commentCount: 3,
    favoriteCount: 12,
    viewCount: 660,
    description: CAR_DETAIL_DESCRIPTION,
    detailOptions: [
      { code: 'singleOwner', label: '1인 소유' },
      { code: 'key', label: '키 1개' },
    ],
    vehicleInfo: CAR_VEHICLE_INFO,
    insuranceInfo: CAR_INSURANCE_INFO,
    leaseInfo: {
      remainingMonths: 12,
      totalMonthlyPayment: '12만원',
      acquisitionPayment: '1,000만원',
      maturityAmount: '8,900만원',
      earlyTerminationAmount: '9,500만원',
      totalAcquisitionCost: '9,912만원',
    },
    imageUrls: getCarDetailImageUrls(9, 10),
    thumbnailImageUrl:
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=900&q=85',
  },
];
