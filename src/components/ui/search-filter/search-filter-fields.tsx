import type { ReactNode } from 'react';
import FindRegion from '@/components/ui/find-region.tsx';
import CheckboxFilterSection from '@/components/ui/search-filter/checkbox-filter-section.tsx';
import ChipsFilterSection from '@/components/ui/search-filter/chips-filter-section.tsx';
import PriceFilterSection from '@/components/ui/search-filter/price-filter-section.tsx';
import RadioFilterSection from '@/components/ui/search-filter/radio-filter-section.tsx';
import { useSearchFilterContext } from '@/components/ui/search-filter/search-filter-context.tsx';
import { BUY_SELL_PRICE_OPTIONS } from '@/types/buy-sell-constants.ts';
import type {
  SearchFilterItem,
  SearchFilterSection,
} from '@/types/search-filter-configs.ts';

function getSectionItems(section: SearchFilterSection): SearchFilterItem[] {
  return (section.data ?? []).map((item) =>
    typeof item === 'string' ? { code: item, label: item } : item,
  );
}

function getRadioName(section: SearchFilterSection): string {
  return `search-filter-${section.key}`;
}

export default function SearchFilterFields(): ReactNode {
  const {
    config,
    isCurrentLocationLoading,
    maximumPrice,
    minimumPrice,
    selectedFilterBySectionKey,
    region,
    selectedPrice,
    onCurrentLocationRequest,
    onRegionOpen,
    onSectionCodeToggle,
    onSectionApply,
    onSectionCodesChange,
    onSectionFieldChange,
    onSectionValueChange,
  } = useSearchFilterContext();

  return (
    <>
      {config.sections.map((section) => {
        const items = getSectionItems(section);

        if (section.type === 'location') {
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

        if (section.type === 'radio') {
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

        if (section.type === 'checkbox') {
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

        if (section.type === 'chip') {
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

        if (section.type === 'price') {
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
