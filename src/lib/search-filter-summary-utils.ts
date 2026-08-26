import {
  type SearchFilterConfig,
  type SearchFilterItem,
  type SearchFilterSection,
  type SearchFilterSectionKey,
  type SearchFilterSectionSelection,
  type SelectedFilterBySectionKey,
  type SelectedSearchFilterItem,
} from '@/types/search-filter';
import { formatThousandsBySuffix } from '@/lib/utils.ts';

type SearchFilterSelectionState = {
  selectedCodesByKey: Partial<Record<SearchFilterSectionKey, string[]>>;
};

type SearchFilterAppliedRangeState = {
  appliedPriceRange: unknown | null;
};

// section data를 summary 렌더링용 item 형태로 변환
export function getSectionItems(
  section?: SearchFilterSection,
): SearchFilterItem[] {
  const data = section && 'data' in section ? section.data : [];

  return data.map((item) =>
    typeof item === 'string' ? { code: item, label: item } : item,
  );
}

// section 타입과 선택 state를 기준으로 현재 section 선택값 생성
function getSectionSelection(
  section: SearchFilterSection,
  state: SearchFilterSelectionState,
): SearchFilterSectionSelection {
  if (section.type === 'weekday') {
    return {
      codes: state.selectedCodesByKey.weekday ?? [],
    };
  }

  if (
    section.type === 'checkbox' ||
    section.type === 'chip' ||
    section.type === 'link' ||
    section.type === 'radio' ||
    section.type === 'range'
  ) {
    const codes = state.selectedCodesByKey[section.key] ?? [];

    return {
      codes,
      value:
        section.type === 'radio' || section.type === 'link'
          ? (codes[0] ?? section.defaultCode ?? null)
          : undefined,
    };
  }

  return {};
}

// section 선택값에 실제 선택된 value 또는 codes 존재 여부 확인
function hasSelectedSectionFilter(
  selection?: SearchFilterSectionSelection,
): boolean {
  const hasValue = Boolean(selection?.value);
  const hasCodes = (selection?.codes ?? []).length > 0;

  return hasValue || hasCodes;
}

// section item 중 선택된 code에 해당하는 summary item 목록 생성
function getSelectedItemsBySection(
  section: SearchFilterSection,
  selection?: SearchFilterSectionSelection,
): SelectedSearchFilterItem[] {
  const selectedCodes = selection?.codes ?? [];

  if (selectedCodes.length === 0) {
    return [];
  }

  if (section.type === 'range' && selectedCodes.length >= 2) {
    const minimumValue = Number(selectedCodes[0]);
    const maximumValue = Number(selectedCodes[1]);
    const controlMinimum = section.range.minimum - section.range.step;
    const controlMaximum = section.range.maximum + section.range.step;
    const formattedMinimumValue = formatThousandsBySuffix(
      minimumValue,
      section.range.suffix,
    );
    const formattedMaximumValue = formatThousandsBySuffix(
      maximumValue,
      section.range.suffix,
    );
    let label: string;

    if (minimumValue === controlMinimum) {
      label = `${formattedMaximumValue}${section.range.suffix} 이하`;
    } else if (maximumValue === controlMaximum) {
      label = `${formattedMinimumValue}${section.range.suffix} 이상`;
    } else {
      label = `${formattedMinimumValue}${section.range.suffix} ~ ${formattedMaximumValue}${section.range.suffix}`;
    }

    return [
      {
        code: selectedCodes.join(':'),
        label,
        sectionKey: section.key,
      },
    ];
  }

  return getSectionItems(section)
    .filter(
      (item) =>
        selectedCodes.includes(item.code) &&
        !(section.type === 'link' && item.code === 'all'),
    )
    .map((item) => ({
      ...item,
      sectionKey: section.key,
    }));
}

// config sections 순서에 맞춰 key별 선택 상태 생성
export function getSelectedFilterBySectionKey(
  sections: readonly SearchFilterSection[],
  state: SearchFilterSelectionState,
): SelectedFilterBySectionKey {
  return Object.fromEntries(
    sections.map((section) => [
      section.key,
      getSectionSelection(section, state),
    ]),
  );
}

// key별 선택 상태 중 하나라도 선택된 필터가 있는지 확인
export function hasSelectedSectionFilters(
  selectedFilterBySectionKey: SelectedFilterBySectionKey,
): boolean {
  const selections = Object.values<SearchFilterSectionSelection | undefined>(
    selectedFilterBySectionKey,
  );

  return selections.some((selection) => hasSelectedSectionFilter(selection));
}

// 가격, 시간처럼 적용 완료된 범위 필터 존재 여부 확인
export function hasAppliedRangeFilters(
  ranges: SearchFilterAppliedRangeState,
): boolean {
  return Object.values(ranges).some((range) => range !== null);
}

// section key를 기준으로 선택된 summary item 목록 조회
export function getSelectedItemsBySectionKey({
  config,
  key,
  selectedFilterBySectionKey,
}: {
  config: SearchFilterConfig;
  key: SearchFilterSectionKey;
  selectedFilterBySectionKey: SelectedFilterBySectionKey;
}): SelectedSearchFilterItem[] {
  const section = config.sections.find(
    (currentSection) => currentSection.key === key,
  );

  if (!section) {
    return [];
  }

  return getSelectedItemsBySection(section, selectedFilterBySectionKey[key]);
}

// 서비스 summary 영역에 노출할 선택 item 목록 생성
export function getSelectedServiceItems({
  config,
  selectedFilterBySectionKey,
}: {
  config: SearchFilterConfig;
  selectedFilterBySectionKey: SelectedFilterBySectionKey;
}): SelectedSearchFilterItem[] {
  return config.sections.flatMap((section) =>
    getSelectedItemsBySection(section, selectedFilterBySectionKey[section.key]),
  );
}
