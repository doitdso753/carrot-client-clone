import type { ReactNode } from 'react';
import type { CategoryItem } from '@/types/types.ts';
import CategoryIcon from '@/components/ui/category-icon.tsx';

type CategoryGridProps = {
  categories: readonly CategoryItem[];
};

export default function CategoryGrid({
  categories,
}: CategoryGridProps): ReactNode {
  return (
    <ul className="mt-[3.2rem] mr-0 mb-0 ml-0 flex list-none items-center justify-evenly gap-[1.6rem] p-0">
      {categories.map((category) => (
        <li className="w-[6.4rem]" key={category.label}>
          <a
            className="group flex flex-col items-center gap-[0.8rem]"
            href={category.routing}
          >
            <span className="rounded-[1.6rem] bg-(--color-palette-gray-200) p-[1.2rem] transition group-hover:bg-(--color-palette-gray-300) [&>svg]:size-[2.4rem]">
              <CategoryIcon iconName={category.iconName} />
            </span>
            <span className="text-[1.4rem] font-normal whitespace-nowrap text-(--color-palette-gray-1000)">
              {category.label}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
