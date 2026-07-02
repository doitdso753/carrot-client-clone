import type { ReactNode } from 'react';
import {
  CarIcon,
  DocumentIcon,
  GroupIcon,
  HomeIcon,
  MugIcon,
  SearchUserIcon,
  ShoppingBagIcon,
  StoreIcon,
} from '@/assets/icons';
import type { CategoryItem } from '@/types/types';

type CategoryGridProps = {
  categories: readonly CategoryItem[];
};

const CATEGORY_ICONS: Record<CategoryItem['iconName'], ReactNode> = {
  shoppingBag: <ShoppingBagIcon />,
  searchUser: <SearchUserIcon />,
  home: <HomeIcon />,
  car: <CarIcon />,
  store: <StoreIcon />,
  document: <DocumentIcon />,
  group: <GroupIcon />,
  mug: <MugIcon />,
};

export default function CategoryGrid({ categories }: CategoryGridProps): ReactNode {
  return (
    <section className="mt-16 grid w-full grid-cols-2 gap-6 md:grid-cols-4">
      {categories.map((category) => (
        <a
          className="flex aspect-video flex-col justify-between gap-8 rounded-xl bg-(--color-palette-gray-200) p-8 transition hover:bg-(--color-palette-gray-300)"
          href="/"
          key={category.label}
        >
          <span className="[&>svg]:h-[2.4rem] [&>svg]:w-[2.4rem]">
            {CATEGORY_ICONS[category.iconName]}
          </span>
          <span className="font-extrabold text-(--color-palette-gray-1000)">
            {category.label}
          </span>
        </a>
      ))}
    </section>
  );
}
