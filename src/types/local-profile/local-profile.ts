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

export type LocalProfileNewsComment = {
  id: number;
  authorName: string;
  content: string;
  createdAt: string;
  profileImageUrl: string;
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
