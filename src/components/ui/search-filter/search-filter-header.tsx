import type { ReactNode } from 'react';

type SearchFilterHeaderProps = {
  onReset: () => void;
};

export default function SearchFilterHeader({
  onReset,
}: SearchFilterHeaderProps): ReactNode {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl leading-(--line-height-text-xl) font-extrabold">
        필터
      </h2>
      <button
        className="text-sm leading-(--line-height-text-sm) font-medium text-(--color-palette-gray-600) underline underline-offset-2"
        type="button"
        onClick={onReset}
      >
        초기화
      </button>
    </div>
  );
}
