export type CategoryIconName =
  | 'shoppingBag'
  | 'searchUser'
  | 'home'
  | 'car'
  | 'store'
  | 'document'
  | 'group'
  | 'mug';

export type CategoryItem = {
  label: string;
  iconName: CategoryIconName;
  routing: string;
};
