import { useState, type ReactNode } from 'react';
import {
  CheckedIcon,
  ChevronDownFillIcon,
  CloseIcon,
  FilterIcon,
  LocationIcon,
} from '@/assets/icons';
import {
  BUY_SELL_FILTER_CATEGORIES,
  BUY_SELL_PRICE_OPTIONS,
} from '@/types/buy-sell-constants.ts';
import CommonPopup from '@/components/ui/common-popup';
import usePopup from '@/hooks/use-popup';
import RegionSettingPopup from './region-setting-popup';

type FilterCategoryListProps = {
  name: string;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
};

function FilterCategoryList({
  name,
  selectedCategory,
  onCategoryChange,
}: FilterCategoryListProps): ReactNode {
  return (
    <ul className="search-filter-category-list">
      {BUY_SELL_FILTER_CATEGORIES.map((category) => (
        <li key={category}>
          <label className="common-radio-option">
            <input
              checked={
                selectedCategory === undefined
                  ? undefined
                  : selectedCategory === category
              }
              className="common-radio-input"
              name={name}
              type="radio"
              value={category}
              onChange={() => onCategoryChange?.(category)}
            />
            {category}
          </label>
        </li>
      ))}
    </ul>
  );
}

type FilterPopupProps = {
  isOpen: boolean;
  selectedCategory: string;
  onClose: () => void;
  onCategoryChange: (category: string) => void;
};

function FilterPopup({
  isOpen,
  selectedCategory,
  onClose,
  onCategoryChange,
}: FilterPopupProps): ReactNode {
  const [isAvailableOnly, setIsAvailableOnly] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState('');
  const [minimumPrice, setMinimumPrice] = useState('');
  const [maximumPrice, setMaximumPrice] = useState('');

  const handleReset = (): void => {
    setIsAvailableOnly(false);
    onCategoryChange('');
    setSelectedPrice('');
    setMinimumPrice('');
    setMaximumPrice('');
  };

  const hasFilterValue =
    isAvailableOnly ||
    Boolean(selectedCategory) ||
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
      title="중고거래 검색 필터"
      variant="bottom-sheet"
      onClose={onClose}
    >
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

      <section className="search-filter-section">
        <h3>카테고리</h3>
        <FilterCategoryList
          name="responsive-category"
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
      </section>

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
    </CommonPopup>
  );
}

export default function SearchFilter(): ReactNode {
  const [selectedCategory, setSelectedCategory] = useState('');
  const {
    isOpen: isLocationPopupOpen,
    openPopup: openLocationPopup,
    closePopup: closeLocationPopup,
  } = usePopup();
  const {
    isOpen: isTabletFilterOpen,
    openPopup: openTabletFilter,
    closePopup: closeTabletFilter,
  } = usePopup();

  return (
    <>
      <div className="search-filter-responsive">
        <div className="search-filter-location-actions">
          <button
            className="common-primary-button"
            type="button"
            onClick={openLocationPopup}
          >
            <LocationIcon className="h-5 w-5" />현 위치로 설정
          </button>
          <button
            className="common-select-button"
            type="button"
            onClick={openLocationPopup}
          >
            <span>서울시 중구 신당동</span>
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
            필터 {selectedCategory ? 1 : 0}
          </button>
          {selectedCategory && (
            <>
              <span className="search-filter-divider" aria-hidden="true" />
              <button
                className="search-filter-chip"
                type="button"
                onClick={() => setSelectedCategory('')}
              >
                {selectedCategory}
                <CloseIcon />
              </button>
            </>
          )}
        </div>
      </div>

      <aside className="search-filter-aside w-full shrink-0 text-(--color-palette-gray-1000)">
        <div className="mb-7 flex items-center justify-between">
          <h2 className="text-xl leading-none font-extrabold">필터</h2>
          <button
            className="text-sm font-medium text-(--color-palette-gray-600) underline underline-offset-2"
            type="button"
          >
            초기화
          </button>
        </div>

        <section className="border-b border-(--color-palette-gray-300) pb-8">
          <h3 className="mb-5 text-base font-extrabold">위치</h3>
          <button
            className="common-select-button"
            type="button"
            onClick={openLocationPopup}
          >
            <span>서울시 중구 신당동</span>
            <ChevronDownFillIcon />
          </button>
          <button
            className="common-primary-button"
            type="button"
            onClick={openLocationPopup}
          >
            <LocationIcon className="h-5 w-5" />현 위치로 설정
          </button>
        </section>

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

        <section className="border-b border-(--color-palette-gray-300) py-8">
          <h3 className="mb-5 text-base font-extrabold">카테고리</h3>
          <FilterCategoryList name="category" />
        </section>

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
      </aside>
      <RegionSettingPopup
        isOpen={isLocationPopupOpen}
        onClose={closeLocationPopup}
      />
      <FilterPopup
        isOpen={isTabletFilterOpen}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        onClose={closeTabletFilter}
      />
    </>
  );
}
