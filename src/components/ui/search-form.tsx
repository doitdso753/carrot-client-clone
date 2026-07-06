import {
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import {
  ArrowRightIcon,
  ChevronDownFillIcon,
  SearchIcon,
} from '@/assets/icons';

type SearchFormOption = {
  label: string;
  icon?: ReactNode;
};

type SearchFormSubmitIconType = 'arrow' | 'search';

type SearchFormProps = {
  options: readonly SearchFormOption[];
  submitIconType?: SearchFormSubmitIconType;
};

const SUBMIT_ICONS: Record<SearchFormSubmitIconType, ReactNode> = {
  arrow: <ArrowRightIcon />,
  search: <SearchIcon />,
};

export default function SearchForm({
  options,
  submitIconType = 'arrow',
}: SearchFormProps): ReactNode {
  const [selectedLabel, setSelectedLabel] = useState(options[0]?.label ?? '');
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption =
    options.find((option) => option.label === selectedLabel) ?? null;
  const submitIcon = SUBMIT_ICONS[submitIconType];

  const handleBlur = (event: FocusEvent<HTMLDivElement>): void => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleSelectOption = (option: SearchFormOption): void => {
    setSelectedLabel(option.label);
    setIsOpen(false);
  };

  return (
    <form className="mt-14 flex w-full items-center rounded-full border border-(--color-palette-gray-300) bg-(--color-palette-gray-00) shadow-sm">
      <div
        className="form-select"
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      >
        <button
          className="form-select-trigger"
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((currentValue) => !currentValue)}
        >
          {selectedOption?.icon && (
            <span className="form-select-icon">{selectedOption.icon}</span>
          )}
          <span>{selectedOption?.label ?? '카테고리'}</span>
          <span className="form-select-chevron" aria-hidden="true">
            <ChevronDownFillIcon />
          </span>
        </button>
        <input
          name="category"
          type="hidden"
          value={selectedOption?.label ?? ''}
        />
        {isOpen && (
          <ul className="form-select-menu" role="listbox">
            {options.map((option) => {
              const isSelected = option.label === selectedOption?.label;

              return (
                <li key={option.label}>
                  <button
                    className={`form-select-option ${
                      isSelected ? 'is-selected' : ''
                    }`}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelectOption(option)}
                  >
                    {option.icon && (
                      <span className="form-select-option-icon">
                        {option.icon}
                      </span>
                    )}
                    <span>{option.label}</span>
                    <span className="form-select-check" aria-hidden="true" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <span
        className="mx-5 h-9 w-0.5 bg-(--color-palette-gray-400)"
        aria-hidden="true"
      />
      <input
        name="searchInput"
        className="min-w-0 flex-1 leading-normal font-medium text-(--color-palette-gray-1000) outline-none placeholder:text-(--color-palette-gray-600)"
        aria-label="검색어"
        placeholder="검색어를 입력해주세요"
        type="search"
      />
      <div
        className={`search-form-submit-wrapper search-form-submit-wrapper--${submitIconType}`}
      >
        <button
          className="flex items-center justify-center w-7 h-7"
          type="submit"
          aria-label="검색"
        >
          {submitIcon}
        </button>
      </div>
    </form>
  );
}
