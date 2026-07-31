import type {
  JobsEmploymentTypeCode,
  SearchFilterTypedItem,
  JobsWorkCategoryCode,
} from '@/types/types.ts';

export const JOBS_EMPLOYMENT_TYPES: SearchFilterTypedItem<JobsEmploymentTypeCode>[] =
  [
    { code: 'longTerm', label: '1개월 이상' },
    { code: 'shortTerm', label: '단기' },
  ];

export const JOBS_WORK_CATEGORIES: SearchFilterTypedItem<JobsWorkCategoryCode>[] =
  [
    { code: 'serving', label: '서빙' },
    { code: 'kitchenAssistant', label: '주방보조/설거지' },
    { code: 'cook', label: '주방장/조리사' },
    { code: 'storeManagement', label: '매장관리/판매' },
    { code: 'beverageProduction', label: '음료 제조' },
    { code: 'baking', label: '베이킹' },
    { code: 'convenienceStore', label: '편의점' },
    { code: 'moving', label: '짐 옮기기' },
    { code: 'businessCleaning', label: '업체청소' },
    { code: 'errand', label: '심부름/소일거리' },
    { code: 'flyerDistribution', label: '전단지 배포' },
    { code: 'academyLesson', label: '학원/과외/레슨' },
    { code: 'schoolPickup', label: '등하원도우미' },
    { code: 'childcare', label: '아이돌봄' },
    { code: 'petCare', label: '반려동물 돌봄' },
    { code: 'seniorCare', label: '어르신 돌봄' },
    { code: 'housekeeping', label: '가사/집정리' },
    { code: 'etc', label: '기타' },
  ];
