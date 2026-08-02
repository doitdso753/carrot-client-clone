import type { ReactNode } from 'react';
import FindRegion from '@/components/ui/find-region.tsx';
import CheckboxFilterSection from '@/components/ui/search-filter/checkbox-filter-section.tsx';
import ChipsFilterSection from '@/components/ui/search-filter/chips-filter-section.tsx';
import PriceFilterSection from '@/components/ui/search-filter/price-filter-section.tsx';
import RadioFilterSection from '@/components/ui/search-filter/radio-filter-section.tsx';
import RangeSliderFilterSection from '@/components/ui/search-filter/range-slider-filter-section.tsx';
import { getSectionItems } from '@/lib/search-filter-summary-utils.ts';
import { BUY_SELL_PRICE_OPTIONS } from '@/types/buy-sell-constants.ts';
import type { SearchFilterSection } from '@/types/search-filter-configs.ts';
import type { SearchFilterViewModel } from '@/types/search-filter-view-model.ts';

function getRadioName(section: SearchFilterSection): string {
  return `search-filter-${section.key}`;
}

type SearchFilterFieldsProps = {
  model: SearchFilterViewModel;
  variant?: 'aside' | 'bottomSheet';
};

export default function SearchFilterFields({
  model,
  variant = 'aside',
}: SearchFilterFieldsProps): ReactNode {
  const {
    actions: {
      onSectionCodeToggle,
      onSectionCodesChange,
      onSectionFieldChange,
      onSectionValueChange,
    },
    config,
    filterState: { maximumPrice, minimumPrice, selectedPrice },
    isCurrentLocationLoading,
    selectedFilterBySectionKey,
    region,
    onCurrentLocationRequest,
    onRegionOpen,
    onSectionApply,
  } = model;

  return (
    <>
      {config.sections.map((section) => {
        const items = getSectionItems(section);
        const sectionType =
          variant === 'bottomSheet' && section.bottomSheetType
            ? section.bottomSheetType
            : section.type;

        if (sectionType === 'location') {
          return (
            <section className="search-filter-section" key={section.key}>
              <h3>{section.label}</h3>
              <FindRegion
                isLoading={isCurrentLocationLoading}
                region={region}
                onCurrentLocationRequest={onCurrentLocationRequest}
                onRegionOpen={onRegionOpen}
              />
            </section>
          );
        }

        if (sectionType === 'radio') {
          return (
            <RadioFilterSection
              items={items}
              key={section.key}
              name={getRadioName(section)}
              selectedCode={
                selectedFilterBySectionKey[section.key]?.value ?? null
              }
              title={section.label}
              onChange={(code) => onSectionValueChange(section.key, code)}
            />
          );
        }

        if (sectionType === 'checkbox') {
          return (
            <CheckboxFilterSection
              items={items}
              key={section.key}
              selectedCodes={
                selectedFilterBySectionKey[section.key]?.codes ?? []
              }
              title={section.label}
              onToggle={(code) => onSectionCodeToggle(section.key, code)}
            />
          );
        }

        if (sectionType === 'chip') {
          return (
            <ChipsFilterSection
              isMultiple
              items={items}
              key={section.key}
              selectedCodes={
                selectedFilterBySectionKey[section.key]?.codes ?? []
              }
              title={section.label}
              onChange={(codes) => onSectionCodesChange(section.key, codes)}
            />
          );
        }

        if (sectionType === 'price') {
          return (
            <PriceFilterSection
              key={section.key}
              maximumPrice={maximumPrice}
              minimumPrice={minimumPrice}
              options={BUY_SELL_PRICE_OPTIONS}
              selectedPrice={selectedPrice}
              title={section.label}
              onApply={() => onSectionApply(section.key)}
              onMaximumPriceChange={(value) =>
                onSectionFieldChange(section.key, 'maximumPrice', value)
              }
              onMinimumPriceChange={(value) =>
                onSectionFieldChange(section.key, 'minimumPrice', value)
              }
              onSelectedPriceChange={(value) =>
                onSectionFieldChange(section.key, 'selectedPrice', value)
              }
            />
          );
        }

        return null;
      })}
    </>
  );
}
