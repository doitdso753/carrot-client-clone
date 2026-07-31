import type { ReactNode } from 'react';
import { WEEKDAY_ITEMS } from '@/types/search-filter-configs.ts';

type WeekdayFilterSectionProps = {
  selectedCodes: string[];
  title: string;
  onToggle: (code: string) => void;
};

export default function WeekdayFilterSection({
  selectedCodes,
  title,
  onToggle,
}: WeekdayFilterSectionProps): ReactNode {
  return (
    <section className="search-filter-section">
      <h3>{title}</h3>
      <div className="search-filter-weekdays">
        {WEEKDAY_ITEMS.map((item) => (
          <button
            aria-pressed={selectedCodes.includes(item.code)}
            className="search-filter-chip"
            key={item.code}
            type="button"
            onClick={() => onToggle(item.code)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </section>
  );
}
