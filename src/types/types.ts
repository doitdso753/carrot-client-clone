export type CategoryIconName =
  | 'shoppingBag'
  | 'searchUser'
  | 'home'
  | 'car'
  | 'store'
  | 'document'
  | 'group'
  | 'cafe';

export type CategoryItem = {
  label: string;
  iconName: CategoryIconName;
  routing: string;
};
