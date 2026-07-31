import type { ReactNode } from 'react';
import type { SearchFilterItem } from '@/types/search-filter-configs.ts';

type RadioFilterSectionProps = {
  items: readonly SearchFilterItem[];
  name: string;
  selectedCode: string | null;
  title: string;
  onChange: (code: string) => void;
};

export default function RadioFilterSection({
  items,
  name,
  selectedCode,
  title,
  onChange,
}: RadioFilterSectionProps): ReactNode {
  return (
    <section className="search-filter-section">
      <h3>{title}</h3>
      <ul className="search-filter-category-list">
        {items.map((item) => (
          <li key={item.code}>
            <label className="common-radio-option">
              <input
                checked={selectedCode === item.code}
                className="common-radio-input"
                name={name}
                type="radio"
                value={item.code}
                onChange={() => onChange(item.code)}
              />
              {item.label}
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
