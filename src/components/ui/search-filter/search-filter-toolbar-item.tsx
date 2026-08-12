import type { ReactNode } from 'react';

type SearchFilterToolbarItemProps = {
  children?: ReactNode;
  isOpen: boolean;
  isSelected?: boolean;
  label: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  onToggle: (triggerElement: HTMLButtonElement) => void;
};

// 검색 필터 툴바의 칩 Trigger와 연결된 팝업 영역을 함께 구성합니다.
export default function SearchFilterToolbarItem({
  children,
  isOpen,
  isSelected = false,
  label,
  leadingIcon,
  trailingIcon,
  onToggle,
}: SearchFilterToolbarItemProps): ReactNode {
  return (
    <div className="search-filter-toolbar-item">
      <button
        aria-expanded={isOpen}
        className={`common-item-trigger search-filter-toolbar-item-trigger ${
          isSelected ? 'is-selected' : ''
        }`}
        type="button"
        onClick={(event) => onToggle(event.currentTarget)}
      >
        {leadingIcon && (
          <span className="search-filter-toolbar-item-leading-icon">
            {leadingIcon}
          </span>
        )}
        <span className="search-filter-toolbar-item-label">{label}</span>
        {trailingIcon && (
          <span className="search-filter-toolbar-item-trailing-icon">
            {trailingIcon}
          </span>
        )}
      </button>
      {isOpen && children}
    </div>
  );
}
