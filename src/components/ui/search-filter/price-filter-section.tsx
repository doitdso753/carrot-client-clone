import type { ReactNode } from 'react';

type PriceFilterSectionProps = {
  maximumPrice: string;
  minimumPrice: string;
  options: readonly string[];
  selectedPrice: string;
  title: string;
  onApply: () => void;
  onMaximumPriceChange: (value: string) => void;
  onMinimumPriceChange: (value: string) => void;
  onSelectedPriceChange: (value: string) => void;
};

export default function PriceFilterSection({
  maximumPrice,
  minimumPrice,
  options,
  selectedPrice,
  title,
  onApply,
  onMaximumPriceChange,
  onMinimumPriceChange,
  onSelectedPriceChange,
}: PriceFilterSectionProps): ReactNode {
  return (
    <section className="search-filter-section">
      <h3>{title}</h3>
      <div className="search-filter-price-options">
        {options.map((price) => (
          <button
            aria-pressed={selectedPrice === price}
            className="search-filter-chip"
            key={price}
            type="button"
            onClick={() => onSelectedPriceChange(price)}
          >
            {price}
          </button>
        ))}
      </div>
      <div className="search-filter-price-range">
        <input
          className="common-number-input search-filter-price-input"
          min="0"
          placeholder="0"
          type="number"
          value={minimumPrice}
          onChange={(event) => onMinimumPriceChange(event.target.value)}
        />
        <span>-</span>
        <input
          className="common-number-input search-filter-price-input"
          min="0"
          placeholder="최대"
          type="number"
          value={maximumPrice}
          onChange={(event) => onMaximumPriceChange(event.target.value)}
        />
      </div>
      <button
        className="search-filter-apply-button"
        type="button"
        onClick={onApply}
      >
        적용하기
      </button>
    </section>
  );
}
