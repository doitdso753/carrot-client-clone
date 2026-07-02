import type { ReactNode } from 'react';

type PopularKeywordListProps = {
  popularKeywords: readonly string[];
};

export default function PopularKeywordList({
  popularKeywords,
}: PopularKeywordListProps): ReactNode {
  return (
    <div className="mt-7 flex w-full items-center gap-7 text-sm text-(--color-palette-gray-800)">
      <span className="shrink-0 text-(--color-palette-gray-600)">
        인기 검색어
      </span>
      <div className="relative min-w-0 flex-1">
        <div className="scrollbar-hidden flex gap-6 overflow-x-auto pr-10 whitespace-nowrap">
          {popularKeywords.map((keyword) => (
            <a href="/" key={keyword}>
              {keyword}
            </a>
          ))}
        </div>
        <span className="list-blur-effect" aria-hidden="true" />
      </div>
    </div>
  );
}
