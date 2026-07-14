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

export type LocalProfileItem = {
  id: number;
  name: string;
  category: string;
  description: string;
  rating: number;
  reviewCount: number;
  commentCount: number;
  location: string;
  coupon: boolean;
  thumbnail: string;
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

export type UsePopupReturn = {
  isOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
  togglePopup: () => void;
};
