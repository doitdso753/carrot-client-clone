import type { ReactNode } from 'react';
import {
  CarIcon,
  DocumentIcon,
  GroupIcon,
  HomeIcon,
  CafeIcon,
  SearchUserIcon,
  ShoppingBagIcon,
  StoreIcon,
} from '@/assets/icons';
import type { CategoryItem } from '@/types/category.ts';

type CategoryIconProps = {
  iconName: CategoryItem['iconName'];
};

const CATEGORY_ICONS: Record<CategoryItem['iconName'], ReactNode> = {
  shoppingBag: <ShoppingBagIcon />,
  searchUser: <SearchUserIcon />,
  home: <HomeIcon />,
  car: <CarIcon />,
  store: <StoreIcon />,
  document: <DocumentIcon />,
  group: <GroupIcon />,
  cafe: <CafeIcon />,
};

export default function CategoryIcon({
  iconName,
}: CategoryIconProps): ReactNode {
  return CATEGORY_ICONS[iconName];
}
