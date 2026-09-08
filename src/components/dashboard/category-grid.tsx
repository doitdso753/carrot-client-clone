import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { CategoryItem } from '@/types/category';
import CategoryIcon from '@/components/ui/category-icon.tsx';

type CategoryGridProps = {
  categories: readonly CategoryItem[];
};

export default function CategoryGrid({
  categories,
}: CategoryGridProps): ReactNode {
  const listRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback((): void => {
    const list = listRef.current;

    if (!list) {
      return;
    }

    setCanScrollLeft(list.scrollLeft > 0);
    setCanScrollRight(
      list.scrollLeft + list.clientWidth < list.scrollWidth - 1,
    );
  }, []);

  useEffect(() => {
    const list = listRef.current;

    if (!list) {
      return;
    }

    updateScrollState();

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(list);

    return () => {
      resizeObserver.disconnect();
    };
  }, [categories.length, updateScrollState]);

  return (
    <div className="relative mt-(--space-32) w-full">
      <ul
        className="scrollbar-hidden m-0 flex w-full list-none items-center justify-evenly gap-(--space-16) overflow-x-auto p-0"
        ref={listRef}
        onScroll={updateScrollState}
      >
        {categories.map((category) => (
          <li className="w-[6.4rem] shrink-0" key={category.label}>
            <a
              className="group flex flex-col items-center gap-(--space-8)"
              href={category.routing}
            >
              <span className="rounded-(--rounded-16) bg-(--color-palette-gray-200) p-(--space-12) transition group-hover:bg-(--color-palette-gray-300) [&>svg]:size-(--icon-size-24)">
                <CategoryIcon iconName={category.iconName} />
              </span>
              <span className="text-[1.4rem] font-normal whitespace-nowrap text-(--color-palette-gray-1000)">
                {category.label}
              </span>
            </a>
          </li>
        ))}
      </ul>

      {canScrollLeft && (
        <span
          className="pointer-events-none absolute inset-y-0 left-0 w-[4rem] bg-linear-to-r from-(--color-palette-gray-00) to-transparent"
          aria-hidden="true"
        />
      )}
      {canScrollRight && (
        <span
          className="pointer-events-none absolute inset-y-0 right-0 w-[4rem] bg-linear-to-l from-(--color-palette-gray-00) to-transparent"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
