import type { ReactNode } from 'react';
import type { SearchFilterItem } from '@/types/search-filter-configs.ts';

type ChipsFilterSectionProps = {
  flexDirection?: 'column' | 'row';
  isMultiple: boolean;
  items: readonly SearchFilterItem[];
  selectedCodes: string[];
  title: string;
  onChange: (codes: string[]) => void;
};

export default function ChipsFilterSection({
  flexDirection = 'column',
  isMultiple,
  items,
  selectedCodes,
  title,
  onChange,
}: ChipsFilterSectionProps): ReactNode {
  const handleSelect = (code: string): void => {
    if (!isMultiple) {
      onChange(selectedCodes.includes(code) ? [] : [code]);
      return;
    }

    onChange(
      selectedCodes.includes(code)
        ? selectedCodes.filter((selectedCode) => selectedCode !== code)
        : [...selectedCodes, code],
    );
  };

  return (
    <section className="search-filter-section">
      <h3>{title}</h3>
      <div
        className={`search-filter-option-list is-${flexDirection}`}
      >
        {items.map((item) => (
          <button
            aria-pressed={selectedCodes.includes(item.code)}
            className="search-filter-chip"
            key={item.code}
            type="button"
            onClick={() => handleSelect(item.code)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </section>
  );
}
