import type { ReactNode } from 'react';
import { ArrowRightIcon, ChevronDownIcon } from '@/assets/icons';
import type { CategoryItem } from '@/types/types';

type HeroSearchFormProps = {
  categories: readonly CategoryItem[];
};

export default function HeroSearchForm({
  categories,
}: HeroSearchFormProps): ReactNode {
  return (
    <form className="mt-14 flex w-full items-center rounded-full border border-(--color-palette-gray-300) bg-(--color-palette-gray-00) py-4 pr-7 pl-7 shadow-sm sm:pr-8 sm:pl-8">
      <label className="flex shrink-0 items-center text-(--color-palette-gray-800) font-semibold">
        <span className="sr-only">검색 카테고리</span>
        <select
          className="appearance-none bg-transparent leading-normal font-bold whitespace-nowrap outline-none"
          defaultValue={categories[0]?.label}
        >
          {categories.map((category) => (
            <option value={category.label} key={category.label}>
              {category.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none shrink-0" aria-hidden="true">
          <ChevronDownIcon />
        </span>
      </label>
      <span
        className="mx-5 h-9 w-0.5 bg-(--color-palette-gray-400)"
        aria-hidden="true"
      />
      <input
        className="min-w-0 flex-1 leading-normal font-medium text-(--color-palette-gray-1000) outline-none placeholder:text-(--color-palette-gray-600)"
        aria-label="검색어"
        placeholder="검색어를 입력해주세요"
        type="search"
      />
      <div className="flex items-center justify-center ml-4 w-11 h-11 rounded-full bg-(--color-palette-static-black) text-(--color-palette-static-white) transition">
        <button
          className="flex items-center justify-center w-7 h-7"
          type="submit"
          aria-label="검색"
        >
          <ArrowRightIcon />
        </button>
      </div>
    </form>
  );
}
