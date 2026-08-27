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
