import type { ReactNode } from 'react';
import type { SearchFilterItem } from '@/types/search-filter';

type LinkFilterSectionProps = {
  items: readonly SearchFilterItem[];
  selectedCode: string | null;
  title: string;
  onChange: (code: string) => void;
};

export default function LinkFilterSection({
  items,
  selectedCode,
  title,
  onChange,
}: LinkFilterSectionProps): ReactNode {
  return (
    <section className="search-filter-section">
      <h3>{title}</h3>
      <ul className="search-filter-link-list">
        {items.map((item) => {
          const ItemIcon = item.icon;

          return (
            <li key={item.code}>
              <button
                aria-pressed={selectedCode === item.code}
                className="search-filter-link"
                type="button"
                onClick={() => onChange(item.code)}
              >
                {ItemIcon && <ItemIcon />}
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
