import type { ReactNode } from 'react';
import type { CategoryItem } from '@/types/types';
import CategoryIcon from './category-icon';

type CategoryGridProps = {
  categories: readonly CategoryItem[];
};

export default function CategoryGrid({
  categories,
}: CategoryGridProps): ReactNode {
  return (
    <section className="mt-16 grid w-full grid-cols-2 gap-6 md:grid-cols-4">
      {categories.map((category) => (
        <a
          className="flex aspect-video flex-col justify-between gap-8 rounded-xl bg-(--color-palette-gray-200) p-8 transition hover:bg-(--color-palette-gray-300)"
          href={category.routing}
          key={category.label}
        >
          <span className="[&>svg]:h-[2.4rem] [&>svg]:w-[2.4rem]">
            <CategoryIcon iconName={category.iconName} />
          </span>
          <span className="font-extrabold text-(--color-palette-gray-1000)">
            {category.label}
          </span>
        </a>
      ))}
    </section>
  );
}
