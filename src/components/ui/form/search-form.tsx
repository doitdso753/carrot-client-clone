import {
  useEffect,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type SubmitEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import {
  ArrowRightIcon,
  CheckedIcon,
  ChevronDownFillIcon,
  ChevronDownIcon,
  SearchIcon,
} from '@/assets/icons';

type SearchFormOption = {
  label: string;
  routing: string;
  icon?: ReactNode;
};

type SearchFormSubmitIconType = 'arrow' | 'search';
type SearchFormChevronIconType = 'outline' | 'fill';
type SearchFormVariant = 'header' | 'hero';

type SearchFormProps = {
  options: readonly SearchFormOption[];
  chevronIconType?: SearchFormChevronIconType;
  initialOptionLabel?: string;
  variant: SearchFormVariant;
};

type SearchFormConfig = {
  chevronIconType: SearchFormChevronIconType;
  isOptionNavigationEnabled: boolean;
  submitIconType: SearchFormSubmitIconType;
};

const SUBMIT_ICONS: Record<SearchFormSubmitIconType, ReactNode> = {
  arrow: <ArrowRightIcon />,
  search: <SearchIcon />,
};

const CHEVRON_ICONS: Record<SearchFormChevronIconType, ReactNode> = {
  outline: <ChevronDownIcon />,
  fill: <ChevronDownFillIcon />,
};

const SEARCH_FORM_CONFIGS: Record<SearchFormVariant, SearchFormConfig> = {
  header: {
    chevronIconType: 'outline',
    isOptionNavigationEnabled: true,
    submitIconType: 'search',
  },
  hero: {
    chevronIconType: 'fill',
    isOptionNavigationEnabled: false,
    submitIconType: 'arrow',
  },
};

export default function SearchForm({
  options,
  chevronIconType,
  initialOptionLabel,
  variant,
}: SearchFormProps): ReactNode {
  const config = SEARCH_FORM_CONFIGS[variant];
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('search') ?? '';
  const [selectedLabel, setSelectedLabel] = useState(
    initialOptionLabel ?? options[0]?.label ?? '',
  );
  const [searchInputValue, setSearchInputValue] = useState(keyword);
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption =
    options.find((option) => option.label === selectedLabel) ?? null;
  const chevronIcon = CHEVRON_ICONS[chevronIconType ?? config.chevronIconType];
  const submitIcon = SUBMIT_ICONS[config.submitIconType];

  useEffect(() => {
    setSearchInputValue(keyword);
  }, [keyword]);

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

    if (config.isOptionNavigationEnabled) {
      navigate(option.routing);
    }
  };

  const handleSearchInputChange = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setSearchInputValue(event.target.value);
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>): void => {
    if (variant !== 'hero' || !selectedOption) {
      return;
    }

    event.preventDefault();

    const searchKeyword = searchInputValue.trim();
    const searchParams = new URLSearchParams();

    if (searchKeyword) {
      searchParams.set('search', searchKeyword);
    }

    const queryString = searchParams.toString();

    navigate(
      queryString
        ? `${selectedOption.routing}?${queryString}`
        : selectedOption.routing,
    );
  };

  return (
    <form
      className={`search-form search-form--${variant} mt-14 flex w-full items-center rounded-full border border-(--color-palette-gray-400) bg-(--color-palette-gray-00)`}
      onSubmit={handleSubmit}
    >
      <div className="search-form-category">
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
              {chevronIcon}
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
                      {option.icon && option.icon}
                      {option.label}
                      {variant !== 'hero' && (
                        <span className="form-select-check" aria-hidden="true">
                          <CheckedIcon />
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <span
        className="search-form-divider w-0.5 bg-(--color-palette-gray-400)"
        aria-hidden="true"
      />
      <input
        name="search"
        className="min-w-0 flex-1 leading-normal font-medium text-(--color-palette-gray-1000) outline-none placeholder:text-(--color-palette-gray-600)"
        aria-label="검색어"
        placeholder="검색어를 입력해주세요"
        type="search"
        value={searchInputValue}
        onChange={handleSearchInputChange}
      />
      <div
        className={`search-form-submit-wrapper search-form-submit-wrapper--${config.submitIconType}`}
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
