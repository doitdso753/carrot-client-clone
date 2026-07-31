import type { ReactNode } from 'react';
import { CheckboxCheckedIcon } from '@/assets/icons';
import type { SearchFilterItem } from '@/types/search-filter-configs.ts';

type CheckboxFilterSectionProps = {
  items: readonly SearchFilterItem[];
  selectedCodes: string[];
  title: string;
  onToggle: (code: string) => void;
};

export default function CheckboxFilterSection({
  items,
  selectedCodes,
  title,
  onToggle,
}: CheckboxFilterSectionProps): ReactNode {
  return (
    <section className="search-filter-section">
      <h3>{title}</h3>
      <ul className="search-filter-category-list">
        {items.map((item) => (
          <li key={item.code}>
            <label className="search-filter-checkbox-option search-filter-choice-option">
              <span className="common-checkbox-wrapper">
                <input
                  checked={selectedCodes.includes(item.code)}
                  className="common-checkbox-input"
                  type="checkbox"
                  value={item.code}
                  onChange={() => onToggle(item.code)}
                />
                <span className="common-checkbox-icon" aria-hidden="true">
                  <CheckboxCheckedIcon />
                </span>
              </span>
              {item.label}
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
