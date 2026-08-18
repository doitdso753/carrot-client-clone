import type { ReactNode } from 'react';
import FindRegion from '@/components/ui/find-region.tsx';
import CheckboxFilterSection from '@/components/ui/search-filter/sections/checkbox-filter-section.tsx';
import ChipsFilterSection from '@/components/ui/search-filter/sections/chips-filter-section.tsx';
import LinkFilterSection from '@/components/ui/search-filter/sections/link-filter-section.tsx';
import PriceFilterSection from '@/components/ui/search-filter/sections/price-filter-section.tsx';
import RadioFilterSection from '@/components/ui/search-filter/sections/radio-filter-section.tsx';
import RangeSliderFilterSection from '@/components/ui/search-filter/sections/range-slider-filter-section.tsx';
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
      onSectionOptionToggle,
      onSectionSelectionChange,
      onSectionInputChange,
      onSectionOptionSelect,
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
              icons={section.icons}
              isScrollable={section.isScrollable}
              items={items}
              key={section.key}
              name={getRadioName(section)}
              selectedCode={
                selectedFilterBySectionKey[section.key]?.value ?? null
              }
              title={section.label}
              onChange={(code) => onSectionOptionSelect(section.key, code)}
            />
          );
        }

        if (sectionType === 'link') {
          return (
            <LinkFilterSection
              items={items}
              key={section.key}
              selectedCode={
                selectedFilterBySectionKey[section.key]?.value ?? null
              }
              title={section.label}
              onChange={(code) => onSectionOptionSelect(section.key, code)}
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
              onToggle={(code) => onSectionOptionToggle(section.key, code)}
            />
          );
        }

        if (sectionType === 'chip') {
          return (
            <ChipsFilterSection
              flexDirection={section.flexDirection}
              isMultiple={section.isMultiple ?? true}
              items={items}
              key={section.key}
              selectedCodes={
                selectedFilterBySectionKey[section.key]?.codes ?? []
              }
              title={section.label}
              onChange={(codes) => onSectionSelectionChange(section.key, codes)}
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
        }

        if (sectionType === 'range' && section.range) {
          const range = section.range;
          const selectedRange = selectedFilterBySectionKey[section.key]?.codes;
          const minimumValue = Number(
            selectedRange?.[0] ?? range.minimum - range.step,
          );
          const maximumValue = Number(
            selectedRange?.[1] ?? range.maximum + range.step,
          );
          const handleRangeChange = (
            nextMinimum: number,
            nextMaximum: number,
          ): void => {
            const isEntireRange =
              nextMinimum === range.minimum - range.step &&
              nextMaximum === range.maximum + range.step;

            onSectionSelectionChange(
              section.key,
              isEntireRange ? [] : [String(nextMinimum), String(nextMaximum)],
            );
          };

          return (
            <RangeSliderFilterSection
              isApplyButtonDisabled={variant === 'bottomSheet'}
              key={section.key}
              maximum={range.maximum}
              maximumValue={maximumValue}
              minimum={range.minimum}
              minimumValue={minimumValue}
              step={range.step}
              suffix={range.suffix}
              title={section.label}
              onApply={(nextMinimum, nextMaximum) => {
                handleRangeChange(nextMinimum, nextMaximum);
                onSectionApply(section.key);
              }}
              onChange={
                variant === 'bottomSheet' ? handleRangeChange : undefined
              }
            />
          );
        }

        return null;
      })}
    </>
  );
}
