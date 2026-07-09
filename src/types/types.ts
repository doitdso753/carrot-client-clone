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

export type BuySellItem = {
  id: number;
  title: string;
  price: number;
  location: string;
  createdAt: string;
  imageUrl: string;
  isReserved?: boolean;
};

export type UsePopupReturn = {
  isOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
  togglePopup: () => void;
};
