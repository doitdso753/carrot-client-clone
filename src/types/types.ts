import type { ReactNode } from 'react';

export type CategoryIconName =
  | 'shoppingBag'
  | 'searchUser'
  | 'home'
  | 'car'
  | 'store'
  | 'document'
  | 'group'
  | 'cafe';

export type CategoryCode =
  | 'buySell'
  | 'localProfile'
  | 'jobs'
  | 'cars'
  | 'community'
  | 'group'
  | 'realty'
  | 'cafe';

export type CategoryItem = {
  code: CategoryCode;
  label: string;
  iconName: CategoryIconName;
  routing: string;
};

export type CommunityItem = {
  id: number;
  title: string;
  content: string;
  category: string;
  location: string;
  createdAtText: string;
  likeCount: number;
  commentCount: number;
  imageUrl?: string;
};

export type PopularCommunityItem = {
  commentCount: number;
  id: number;
  imageUrl: string;
  likeCount: number;
  metadata: string;
  title: string;
};

export type UserProfile = {
  nickname: string;
  location: string;
  warmth: number;
};

export type BuySellItemStatusCode = 'selling' | 'reserved' | 'sold';

export type LocalProfileCategoryCode =
  | 'food'
  | 'cafeDessert'
  | 'beauty'
  | 'hobby'
  | 'hospitalPharmacy'
  | 'movingDelivery'
  | 'life'
  | 'education'
  | 'repair'
  | 'exercise'
  | 'childcare'
  | 'pet'
  | 'hairSalon'
  | 'cleaning'
  | 'laundry'
  | 'interiorConstruction'
  | 'bungeoppang'
  | 'pollingPlace';

export type LocalProfileOptionCode =
  'coupon' | 'instantBooking' | 'instantPayment';

export type LocalProfileCategoryItem = {
  code: LocalProfileCategoryCode;
  label: string;
};

export type LocalProfileOptionItem = {
  code: LocalProfileOptionCode;
  label: string;
};

export type JobsEmploymentTypeCode = 'longTerm' | 'shortTerm';

export type JobsWorkCategoryCode =
  | 'serving'
  | 'kitchenAssistant'
  | 'cook'
  | 'storeManagement'
  | 'beverageProduction'
  | 'baking'
  | 'convenienceStore'
  | 'moving'
  | 'businessCleaning'
  | 'errand'
  | 'flyerDistribution'
  | 'academyLesson'
  | 'schoolPickup'
  | 'childcare'
  | 'petCare'
  | 'seniorCare'
  | 'housekeeping'
  | 'etc';

export type SearchFilterTypedItem<TCode extends string> = {
  code: TCode;
  label: string;
};

export type LocalProfileCoupon = {
  id: number;
  title: string;
  expiresAt: string;
};

export type LocalProfilePrice = {
  id: number;
  title: string;
  price: string;
  description?: string;
  isRepresentative?: boolean;
};

export type LocalProfileNews = {
  id: number;
  title: string;
  content: string;
  createdAtText: string;
  favoriteCount: number;
  commentCount: number;
  inquiryCount: number;
  imageUrl: string;
  viewCount: number;
  comments?: LocalProfileNewsComment[];
};

export type LocalProfileNewsComment = {
  id: number;
  authorName: string;
  content: string;
  createdAt: string;
  profileImageUrl: string;
};

export type LocalProfileReviewReply = {
  content: string;
  createdAtText: string;
};

export type LocalProfileReview = {
  id: number;
  authorName: string;
  authorRegionText: string;
  certifiedCount: number;
  createdAtText: string;
  profileImageUrl: string;
  rating: number;
  content: string;
  helpfulCount: number;
  imageUrls?: string[];
  reply?: LocalProfileReviewReply;
};

export type LocalProfileDocumentRow = {
  label: string;
  value: string;
};

export type LocalProfileDocumentGroup = {
  title: string;
  rows: LocalProfileDocumentRow[];
};

export type LocalProfileStoreAddress = {
  label: '도로명' | '지번';
  address: string;
  addressDetail: string;
};

export type LocalProfileStoreInfo = {
  addressSummary: string;
  appLink: string;
  businessHours: {
    current: string;
    daily: string[];
    description: string;
  };
  contact: string;
  facilities: string;
  mapImageUrl: string;
  website: string;
  addresses: LocalProfileStoreAddress[];
};

export type LocalProfileItem = {
  id: number;
  name: string;
  category: string;
  description: string;
  rating: number;
  reviewCount: number;
  commentCount: number;
  location: string;
  regionText: string;
  coupon: boolean;
  latitude: number;
  longitude: number;
  thumbnail: string;
  imageUrls?: string[];
  createdAt?: string;
  documentGroups?: LocalProfileDocumentGroup[];
  documentLabel?: string;
  benefitTitle?: string;
  benefitDescription?: string;
  notice?: string;
  prices?: LocalProfilePrice[];
  coupons?: LocalProfileCoupon[];
  news?: LocalProfileNews[];
  reviews?: LocalProfileReview[];
  storeInfo?: LocalProfileStoreInfo;
};

export type BuySellItem = {
  id: number;
  title: string;
  price: number;
  location: string;
  createdAt: string;
  imageUrl: string;
  status?: BuySellItemStatusCode;
  serviceCategoryCode?: string;
  serviceCategoryText?: string;
  categoryCode?: string;
  categoryText?: string;
  description?: string;
  imageUrls?: string[];
  seller?: UserProfile;
  stats?: {
    chatCount: number;
    favoriteCount: number;
    viewCount: number;
  };
};

export type CarListItemStatus = 'reserved' | 'sold';

export type CarDetailInfoRow = {
  id?: string;
  label: ReactNode;
  value: ReactNode;
};

export type CarDetailOption = {
  code: 'singleOwner' | 'key';
  label: string;
};

export type CarLeaseInfo = {
  remainingMonths: number;
  totalMonthlyPayment: string;
  acquisitionPayment: string;
  maturityAmount: string;
  earlyTerminationAmount: string;
  totalAcquisitionCost: string;
};

export type CarSaleInfo = {
  registrationCost: string;
  directTradeSavings: string;
};

export type CarVehicleInfo = {
  bodyType: string;
  registrationDate: string;
  displacement: string;
  fuel: string;
  transmission: string;
};

export type CarInsuranceInfo = {
  ownCarDamage: string;
  ownerChanges: string;
  usage: string;
  totalLossOrFlooding: string;
};

type CarListItemBase = {
  id: number;
  title: string;
  status?: CarListItemStatus;
  priceText: string;
  modelYearText: string;
  mileageText: string;
  location: string;
  address: string;
  createdAt: string;
  commentCount: number;
  favoriteCount: number;
  viewCount: number;
  description: string;
  thumbnailImageUrl: string;
  imageUrls: string[];
  detailOptions: CarDetailOption[];
  vehicleInfo: CarVehicleInfo;
  insuranceInfo: CarInsuranceInfo;
};

type CarSaleListItem = CarListItemBase & {
  transactionType: 'sale';
  saleInfo: CarSaleInfo;
  leaseInfo?: never;
};

type CarLeaseListItem = CarListItemBase & {
  transactionType: 'lease';
  saleInfo?: never;
  leaseInfo: CarLeaseInfo;
};

export type CarListItem = CarSaleListItem | CarLeaseListItem;

export type UsePopupReturn = {
  isOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
  togglePopup: () => void;
};
