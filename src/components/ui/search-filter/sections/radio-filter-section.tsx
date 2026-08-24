import type { ReactNode } from 'react';
import type { SearchFilterItem } from '@/types/search-filter';

type RadioFilterSectionProps = {
  icons?: Readonly<Record<string, string>>;
  isScrollable?: boolean;
  items: readonly SearchFilterItem[];
  name: string;
  selectedCode: string | null;
  title: string;
  onChange: (code: string) => void;
};

export default function RadioFilterSection({
  icons = {},
  isScrollable = false,
  items,
  name,
  selectedCode,
  title,
  onChange,
}: RadioFilterSectionProps): ReactNode {
  const radioList = (
    <ul
      className={`search-filter-category-list ${
        isScrollable ? 'is-scrollable' : ''
      }`}
    >
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
            {icons[item.code] && (
              <img
                alt=""
                className="search-filter-radio-icon"
                src={icons[item.code]}
              />
            )}
            {item.label}
          </label>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="search-filter-section">
      <h3>{title}</h3>
      {isScrollable ? (
        <div className="search-filter-scrollable-list">
          <span
            className="list-blur-effect search-filter-list-blur is-top"
            aria-hidden="true"
          />
          {radioList}
          <span
            className="list-blur-effect search-filter-list-blur is-bottom"
            aria-hidden="true"
          />
        </div>
      ) : (
        radioList
      )}
    </section>
  );
}
