import { useState, type ReactNode } from 'react';
import {
  CheckedIcon,
  ChevronDownFillIcon,
  CloseIcon,
  FilterIcon,
  LocationIcon,
} from '@/assets/icons';
import CommonPopup from '@/components/ui/common-popup.tsx';
import RegionSettingPopup from '@/components/ui/region-setting-popup.tsx';
import usePageFilter from '@/hooks/use-page-filter.ts';
import usePopup from '@/hooks/use-popup.ts';
import { BUY_SELL_PRICE_OPTIONS } from '@/types/buy-sell-constants.ts';

type SearchFilterItem = {
  code: string;
  label: string;
};

type SearchFilterProps = {
  categories: readonly (SearchFilterItem | string)[];
  filterStorageKey: string;
  region: string;
  options?: readonly SearchFilterItem[];
  popupTitle?: string;
};

type FilterChoiceListProps = {
  items: readonly SearchFilterItem[];
  isMultiple?: boolean;
  name: string;
  selectedCodes: string[];
  onChange: (codes: string[]) => void;
};

function FilterChoiceList({
  items,
  isMultiple = false,
  name,
  selectedCodes,
  onChange,
}: FilterChoiceListProps): ReactNode {
  const handleChange = (code: string): void => {
    if (!isMultiple) {
      onChange([code]);
      return;
    }

    onChange(
      selectedCodes.includes(code)
        ? selectedCodes.filter((selectedCode) => selectedCode !== code)
        : [...selectedCodes, code],
    );
  };

  return (
    <ul className="search-filter-category-list">
      {items.map((item) => (
        <li key={item.code}>
          {isMultiple ? (
            <label className="search-filter-checkbox-option search-filter-choice-option">
              <span className="common-checkbox-wrapper">
                <input
                  checked={selectedCodes.includes(item.code)}
                  className="common-checkbox-input"
                  name={name}
                  type="checkbox"
                  value={item.code}
                  onChange={() => handleChange(item.code)}
                />
                <span className="common-checkbox-icon" aria-hidden="true">
                  <CheckedIcon />
                </span>
              </span>
              {item.label}
            </label>
          ) : (
            <label className="common-radio-option">
              <input
                checked={selectedCodes.includes(item.code)}
                className="common-radio-input"
                name={name}
                type="radio"
                value={item.code}
                onChange={() => handleChange(item.code)}
              />
              {item.label}
            </label>
          )}
        </li>
      ))}
    </ul>
  );
}

type FilterOptionButtonListProps = {
  items: readonly SearchFilterItem[];
  selectedCodes: string[];
  onChange: (codes: string[]) => void;
};

function FilterOptionButtonList({
  items,
  selectedCodes,
  onChange,
}: FilterOptionButtonListProps): ReactNode {
  const handleToggle = (code: string): void => {
    onChange(
      selectedCodes.includes(code)
        ? selectedCodes.filter((selectedCode) => selectedCode !== code)
        : [...selectedCodes, code],
    );
  };

  return (
    <div className="search-filter-option-list">
      {items.map((item) => (
        <button
          aria-pressed={selectedCodes.includes(item.code)}
          className="search-filter-option-button"
          key={item.code}
          type="button"
          onClick={() => handleToggle(item.code)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

type FilterPopupProps = {
  categories: readonly SearchFilterItem[];
  isOpen: boolean;
  options: readonly SearchFilterItem[];
  popupTitle: string;
  selectedCategoryCodes: string[];
  selectedOptionCodes: string[];
  onCategoryChange: (codes: string[]) => void;
  onClose: () => void;
  onOptionChange: (codes: string[]) => void;
};

function FilterPopup({
  categories,
  isOpen,
  options,
  popupTitle,
  selectedCategoryCodes,
  selectedOptionCodes,
  onCategoryChange,
  onClose,
  onOptionChange,
}: FilterPopupProps): ReactNode {
  const isLocalProfileFilter = options.length > 0;
  const [isAvailableOnly, setIsAvailableOnly] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [minimumPrice, setMinimumPrice] = useState('');
  const [maximumPrice, setMaximumPrice] = useState('');

  const handleReset = (): void => {
    setIsAvailableOnly(false);
    onCategoryChange([]);
    onOptionChange([]);
    setSelectedPrice('');
    setMinimumPrice('');
    setMaximumPrice('');
  };

  const hasFilterValue =
    isAvailableOnly ||
    selectedCategoryCodes.length > 0 ||
    selectedOptionCodes.length > 0 ||
    Boolean(selectedPrice) ||
    Boolean(minimumPrice) ||
    Boolean(maximumPrice);

  return (
    <CommonPopup
      footer={
        <>
          <button type="button" onClick={handleReset}>
            전체 해제
          </button>
          <button disabled={!hasFilterValue} type="button" onClick={onClose}>
            적용하기
          </button>
        </>
      }
      isOpen={isOpen}
      title={popupTitle}
      variant="bottom-sheet"
      onClose={onClose}
    >
      {!isLocalProfileFilter && (
        <section className="search-filter-section">
          <h3>상태</h3>
          <label className="search-filter-checkbox-option">
            <span className="common-checkbox-wrapper">
              <input
                checked={isAvailableOnly}
                className="common-checkbox-input"
                type="checkbox"
                onChange={(event) => setIsAvailableOnly(event.target.checked)}
              />
              <span className="common-checkbox-icon" aria-hidden="true">
                <CheckedIcon />
              </span>
            </span>
            거래 가능한 보기
          </label>
        </section>
      )}

      <section className="search-filter-section">
        <h3>카테고리</h3>
        <FilterChoiceList
          isMultiple={isLocalProfileFilter}
          items={categories}
          name="responsive-category"
          selectedCodes={selectedCategoryCodes}
          onChange={onCategoryChange}
        />
      </section>

      {isLocalProfileFilter ? (
        <section className="search-filter-section">
          <h3>옵션</h3>
          <FilterOptionButtonList
            items={options}
            selectedCodes={selectedOptionCodes}
            onChange={onOptionChange}
          />
        </section>
      ) : (
        <section className="search-filter-section">
          <h3>가격</h3>
          <div className="search-filter-price-options">
            {BUY_SELL_PRICE_OPTIONS.map((price) => (
              <button
                aria-pressed={selectedPrice === price}
                className="search-filter-price-option"
                key={price}
                type="button"
                onClick={() => setSelectedPrice(price)}
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
              onChange={(event) => setMinimumPrice(event.target.value)}
            />
            <span>-</span>
            <input
              className="common-number-input search-filter-price-input"
              min="0"
              placeholder="최대"
              type="number"
              value={maximumPrice}
              onChange={(event) => setMaximumPrice(event.target.value)}
            />
          </div>
        </section>
      )}
    </CommonPopup>
  );
}

export default function SearchFilter({
  categories,
  filterStorageKey,
  region,
  options = [],
  popupTitle = '중고거래 검색 필터',
}: SearchFilterProps): ReactNode {
  const isLocalProfileFilter = options.length > 0;
  const categoryItems = categories.map((category) =>
    typeof category === 'string'
      ? { code: category, label: category }
      : category,
  );
  const [filterState, setFilterState] = usePageFilter(filterStorageKey);
  const { selectedCategoryCodes, selectedOptionCodes } = filterState;
  const {
    isOpen: isRegionPopupOpen,
    openPopup: openRegionPopup,
    closePopup: closeRegionPopup,
  } = usePopup();
  const {
    isOpen: isTabletFilterOpen,
    openPopup: openTabletFilter,
    closePopup: closeTabletFilter,
  } = usePopup();

  const selectedItems = [
    ...categoryItems.filter((category) =>
      selectedCategoryCodes.includes(category.code),
    ),
    ...options.filter((option) => selectedOptionCodes.includes(option.code)),
  ];

  const handleReset = (): void => {
    setFilterState({
      selectedCategoryCodes: [],
      selectedOptionCodes: [],
    });
  };

  const handleCategoryChange = (codes: string[]): void => {
    setFilterState((currentState) => ({
      ...currentState,
      selectedCategoryCodes: codes,
    }));
  };

  const handleOptionChange = (codes: string[]): void => {
    setFilterState((currentState) => ({
      ...currentState,
      selectedOptionCodes: codes,
    }));
  };

  const handleRemoveItem = (code: string): void => {
    setFilterState((currentState) => ({
      selectedCategoryCodes: currentState.selectedCategoryCodes.filter(
        (currentCode) => currentCode !== code,
      ),
      selectedOptionCodes: currentState.selectedOptionCodes.filter(
        (currentCode) => currentCode !== code,
      ),
    }));
  };

  return (
    <>
      <div className="filter-chip search-filter-responsive">
        <div className="search-filter-region-actions">
          <button
            className="common-primary-button"
            type="button"
            onClick={openRegionPopup}
          >
            <LocationIcon className="h-5 w-5" />현 위치로 설정
          </button>
          <button
            className="common-select-button"
            type="button"
            onClick={openRegionPopup}
          >
            <span className="truncate">{region}</span>
            <ChevronDownFillIcon />
          </button>
        </div>

        <div className="search-filter-summary">
          <button
            className="search-filter-open-button"
            type="button"
            onClick={openTabletFilter}
          >
            <FilterIcon />
            필터 {selectedItems.length}
          </button>
          {selectedItems.length > 0 && (
            <span className="search-filter-divider" aria-hidden="true" />
          )}
          {selectedItems.map((item) => (
            <button
              className="search-filter-chip"
              key={item.code}
              type="button"
              onClick={() => handleRemoveItem(item.code)}
            >
              {item.label}
              <CloseIcon />
            </button>
          ))}
        </div>
      </div>

      <aside className="filter-aside search-filter-aside w-full shrink-0 text-(--color-palette-gray-1000)">
        <div className="mb-7 flex items-center justify-between">
          <h2 className="text-xl leading-none font-extrabold">필터</h2>
          <button
            className="text-sm font-medium text-(--color-palette-gray-600) underline underline-offset-2"
            type="button"
            onClick={handleReset}
          >
            초기화
          </button>
        </div>

        <section className="border-b border-(--color-palette-gray-300) pb-8">
          <h3 className="mb-5 text-base font-extrabold">위치</h3>
          <button
            className="common-select-button"
            type="button"
            onClick={openRegionPopup}
          >
            <span className="truncate">{region}</span>
            <ChevronDownFillIcon />
          </button>
          <button
            className="common-primary-button"
            type="button"
            onClick={openRegionPopup}
          >
            <LocationIcon className="h-5 w-5" />현 위치로 설정
          </button>
        </section>

        {!isLocalProfileFilter && (
          <section className="border-b border-(--color-palette-gray-300) py-8">
            <h3 className="mb-5 text-base font-extrabold">상태</h3>
            <label className="flex items-center gap-3 text-base text-(--color-palette-gray-1000)">
              <span className="common-checkbox-wrapper">
                <input className="common-checkbox-input" type="checkbox" />
                <span className="common-checkbox-icon" aria-hidden="true">
                  <CheckedIcon />
                </span>
              </span>
              거래 가능한 보기
            </label>
          </section>
        )}

        <section className="border-b border-(--color-palette-gray-300) py-8">
          <h3 className="mb-5 text-base font-extrabold">카테고리</h3>
          <FilterChoiceList
            isMultiple={isLocalProfileFilter}
            items={categoryItems}
            name="category"
            selectedCodes={selectedCategoryCodes}
            onChange={handleCategoryChange}
          />
        </section>

        {isLocalProfileFilter ? (
          <section className="pt-8">
            <h3 className="mb-5 text-base font-extrabold">옵션</h3>
            <FilterOptionButtonList
              items={options}
              selectedCodes={selectedOptionCodes}
              onChange={handleOptionChange}
            />
          </section>
        ) : (
          <section className="pt-8">
            <h3 className="mb-5 text-base font-extrabold">가격</h3>
            <div className="mb-5 flex flex-col items-start gap-3">
              {BUY_SELL_PRICE_OPTIONS.map((price) => (
                <button
                  className="rounded-full border border-(--color-palette-gray-300) px-4 py-2 text-sm font-medium text-(--color-palette-gray-1000) hover:bg-(--color-palette-gray-100)"
                  key={price}
                  type="button"
                >
                  {price}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <input
                className="common-number-input min-w-0 flex-1 rounded-lg border border-(--color-palette-gray-300) px-4 text-sm outline-none placeholder:text-(--color-palette-gray-600) focus:border-(--color-palette-gray-600)"
                placeholder="0"
                type="text"
              />
              <span className="text-(--color-palette-gray-1000)">-</span>
              <input
                className="common-number-input min-w-0 flex-1 rounded-lg border border-(--color-palette-gray-300) px-4 text-sm outline-none placeholder:text-(--color-palette-gray-600) focus:border-(--color-palette-gray-600)"
                placeholder="최대"
                type="text"
              />
            </div>
            <button
              className="mt-3 text-sm font-medium text-(--color-palette-gray-1000) underline underline-offset-2"
              type="button"
            >
              적용하기
            </button>
          </section>
        )}
      </aside>
      <RegionSettingPopup
        isOpen={isRegionPopupOpen}
        onClose={closeRegionPopup}
      />
      <FilterPopup
        categories={categoryItems}
        isOpen={isTabletFilterOpen}
        options={options}
        popupTitle={popupTitle}
        selectedCategoryCodes={selectedCategoryCodes}
        selectedOptionCodes={selectedOptionCodes}
        onCategoryChange={handleCategoryChange}
        onClose={closeTabletFilter}
        onOptionChange={handleOptionChange}
      />
    </>
  );
}
