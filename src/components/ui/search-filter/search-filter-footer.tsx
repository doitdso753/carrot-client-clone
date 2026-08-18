import type { ReactNode } from 'react';

type SearchFilterFooterProps = {
  hasSelectedFilter: boolean;
  onApply: () => void;
  onReset: () => void;
};

export default function SearchFilterFooter({
  hasSelectedFilter,
  onApply,
  onReset,
}: SearchFilterFooterProps): ReactNode {
  return (
    <>
      <button type="button" onClick={onReset}>
        전체 해제
      </button>
      <button
        className={`search-filter-footer-apply-button ${
          hasSelectedFilter ? 'has-filter' : ''
        }`}
        type="button"
        onClick={onApply}
      >
        필터 적용
      </button>
    </>
  );
}
