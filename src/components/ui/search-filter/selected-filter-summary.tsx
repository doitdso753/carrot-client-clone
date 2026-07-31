import type { ReactNode } from 'react';
import { CloseIcon } from '@/assets/icons';
import { formatPriceText } from '@/lib/utils.ts';
import type {
  SearchFilterSectionKey,
  SelectedSearchFilterItem,
} from '@/types/search-filter-configs.ts';

type PriceRange = {
  maximumPrice: string;
  minimumPrice: string;
};

type SelectedFilterSummaryProps = {
  appliedPriceRange: PriceRange | null;
  selectedServiceItems: SelectedSearchFilterItem[];
  onRemovePriceRange: () => void;
  onRemoveSelectedCode: (key: SearchFilterSectionKey, code: string) => void;
};

type SelectedFilterChipProps = {
  item: SelectedSearchFilterItem;
  onRemove: (key: SearchFilterSectionKey, code: string) => void;
};

function getPriceRangeLabel(priceRange: PriceRange): string {
  const minimumPriceValue = priceRange.minimumPrice.trim();
  const maximumPriceValue = priceRange.maximumPrice.trim();

  if (minimumPriceValue === '0' && maximumPriceValue) {
    return `${formatPriceText(maximumPriceValue)}원 이하`;
  }

  if (minimumPriceValue && maximumPriceValue) {
    return `${formatPriceText(minimumPriceValue)}원 - ${formatPriceText(
      maximumPriceValue,
    )}원`;
  }

  if (minimumPriceValue) {
    return `${formatPriceText(minimumPriceValue)}원 이상`;
  }

  return `${formatPriceText(maximumPriceValue)}원 이하`;
}

function SelectedFilterChip({
  item,
  onRemove,
}: SelectedFilterChipProps): ReactNode {
  return (
    <button
      className="search-filter-chip"
      type="button"
      onClick={() => onRemove(item.sectionKey, item.code)}
    >
      {item.label}
      <CloseIcon />
    </button>
  );
}

export default function SelectedFilterSummary({
  appliedPriceRange,
  selectedServiceItems,
  onRemovePriceRange,
  onRemoveSelectedCode,
}: SelectedFilterSummaryProps): ReactNode {
  return (
    <div className="search-filter-summary">
      <span className="search-filter-divider" aria-hidden="true" />
      {selectedServiceItems.map((item) => (
        <SelectedFilterChip
          item={item}
          key={item.code}
          onRemove={onRemoveSelectedCode}
        />
      ))}
      {appliedPriceRange && (
        <button
          className="search-filter-chip"
          type="button"
          onClick={onRemovePriceRange}
        >
          {getPriceRangeLabel(appliedPriceRange)}
          <CloseIcon />
        </button>
      )}
    </div>
  );
}
