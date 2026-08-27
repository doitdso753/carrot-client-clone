import type { ReactNode } from 'react';
import FindRegion from '@/components/ui/find-region.tsx';
import CheckboxFilterSection from '@/components/ui/search-filter/sections/checkbox-filter-section.tsx';
import ChipsFilterSection from '@/components/ui/search-filter/sections/chips-filter-section.tsx';
import LinkFilterSection from '@/components/ui/search-filter/sections/link-filter-section.tsx';
import PriceFilterSection from '@/components/ui/search-filter/sections/price-filter-section.tsx';
import RadioFilterSection from '@/components/ui/search-filter/sections/radio-filter-section.tsx';
import RangeSliderFilterSection from '@/components/ui/search-filter/sections/range-slider-filter-section.tsx';
import { getSelectedRange, serializeSelectedRange } from '@/lib/range-utils.ts';
import { getSectionItems } from '@/lib/search-filter-summary-utils.ts';
import { BUY_SELL_PRICE_OPTIONS } from '@/types/buy-sell';
import type {
  SearchFilterSection,
  SearchFilterViewModel,
} from '@/types/search-filter';

type SearchFilterRendererProps = {
  model: SearchFilterViewModel;
  section: SearchFilterSection;
  variant: 'aside' | 'bottomSheet';
};

function getRadioName(section: SearchFilterSection): string {
  return `search-filter-${section.key}`;
}

export default function SearchFilterRenderer({
  model,
  section,
  variant,
}: SearchFilterRendererProps): ReactNode {
  const {
    actions: {
      onSectionOptionToggle,
      onSectionSelectionChange,
      onSectionInputChange,
      onSectionOptionSelect,
    },
    filterState: { maximumPrice, minimumPrice, selectedPrice },
    isCurrentLocationLoading,
    selectedFilterBySectionKey,
    region,
    onCurrentLocationRequest,
    onRegionOpen,
    onSectionApply,
  } = model;
  const items = getSectionItems(section);

  if (
    variant === 'bottomSheet' &&
    'bottomSheetType' in section &&
    section.bottomSheetType === 'chip'
  ) {
    return (
      <ChipsFilterSection
        isMultiple={section.isMultiple ?? true}
        items={items}
        selectedCodes={selectedFilterBySectionKey[section.key]?.codes ?? []}
        title={section.label}
        onChange={(codes) => onSectionSelectionChange(section.key, codes)}
      />
    );
  }

  switch (section.type) {
    case 'location':
      return (
        <section className="search-filter-section">
          <h3>{section.label}</h3>
          <FindRegion
            isLoading={isCurrentLocationLoading}
            region={region}
            onCurrentLocationRequest={onCurrentLocationRequest}
            onRegionOpen={onRegionOpen}
          />
        </section>
      );

    case 'radio':
      return (
        <RadioFilterSection
          icons={section.icons}
          isScrollable={section.isScrollable}
          items={items}
          name={getRadioName(section)}
          selectedCode={selectedFilterBySectionKey[section.key]?.value ?? null}
          title={section.label}
          onChange={(code) => onSectionOptionSelect(section.key, code)}
        />
      );

    case 'link':
      return (
        <LinkFilterSection
          items={items}
          selectedCode={selectedFilterBySectionKey[section.key]?.value ?? null}
          title={section.label}
          onChange={(code) => onSectionOptionSelect(section.key, code)}
        />
      );

    case 'checkbox':
      return (
        <CheckboxFilterSection
          items={items}
          selectedCodes={selectedFilterBySectionKey[section.key]?.codes ?? []}
          title={section.label}
          onToggle={(code) => onSectionOptionToggle(section.key, code)}
        />
      );

    case 'chip':
      return (
        <ChipsFilterSection
          flexDirection={section.flexDirection}
          isMultiple={section.isMultiple ?? true}
          items={items}
          selectedCodes={selectedFilterBySectionKey[section.key]?.codes ?? []}
          title={section.label}
          onChange={(codes) => onSectionSelectionChange(section.key, codes)}
        />
      );

    case 'price':
      return (
        <PriceFilterSection
          maximumPrice={maximumPrice}
          minimumPrice={minimumPrice}
          options={BUY_SELL_PRICE_OPTIONS}
          selectedPrice={selectedPrice}
          title={section.label}
          onApply={() => onSectionApply(section.key)}
          onMaximumPriceChange={(value) =>
            onSectionInputChange(section.key, 'maximumPrice', value)
          }
          onMinimumPriceChange={(value) =>
            onSectionInputChange(section.key, 'minimumPrice', value)
          }
          onSelectedPriceChange={(value) =>
            onSectionInputChange(section.key, 'selectedPrice', value)
          }
        />
      );

    case 'range': {
      const range = section.range;
      const selectedRange = getSelectedRange(
        selectedFilterBySectionKey[section.key]?.codes,
        range,
      );
      const handleRangeChange = (
        nextMinimum: number,
        nextMaximum: number,
      ): void => {
        onSectionSelectionChange(
          section.key,
          serializeSelectedRange(nextMinimum, nextMaximum, range),
        );
      };

      return (
        <RangeSliderFilterSection
          isApplyButtonDisabled={variant === 'bottomSheet'}
          maximum={range.maximum}
          maximumValue={selectedRange.maximum}
          minimum={range.minimum}
          minimumValue={selectedRange.minimum}
          step={range.step}
          suffix={range.suffix}
          title={section.label}
          onApply={(nextMinimum, nextMaximum) => {
            handleRangeChange(nextMinimum, nextMaximum);
            onSectionApply(section.key);
          }}
          onChange={variant === 'bottomSheet' ? handleRangeChange : undefined}
        />
      );
    }

    default:
      return null;
  }
}
