import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
  type ReactNode,
} from 'react';
import { ChevronDownThinIcon, FilterIcon } from '@/assets/icons';
import SearchFilterToolbarItem from '@/components/ui/search-filter/search-filter-toolbar-item.tsx';
import SearchFilterToolbarPopover from '@/components/ui/search-filter/search-filter-toolbar-popover.tsx';
import useOutsidePointerDown from '@/hooks/use-outside-pointer-down.ts';
import type {
  SearchFilterSectionKey,
  SelectedSearchFilterItem,
} from '@/types/search-filter-configs.ts';
import type { SearchFilterViewModel } from '@/types/search-filter-view-model.ts';

type SearchFilterToolbarItemConfig = {
  key: 'all' | SearchFilterSectionKey;
  label: string;
  sectionKeys: SearchFilterSectionKey[];
};

type SearchFilterToolbarContextValue = {
  items: SearchFilterToolbarItemConfig[];
  model: SearchFilterViewModel;
  onReset: () => void;
  openItemKey: SearchFilterToolbarItemConfig['key'] | null;
  selectedServiceItems: SelectedSearchFilterItem[];
  onClose: () => void;
  onToggle: (itemKey: SearchFilterToolbarItemConfig['key']) => void;
};

type SearchFilterToolbarRootProps = PropsWithChildren<{
  model: SearchFilterViewModel;
  selectedServiceItems: SelectedSearchFilterItem[];
  onReset: () => void;
}>;

const SearchFilterToolbarContext =
  createContext<SearchFilterToolbarContextValue | null>(null);

function useSearchFilterToolbar(): SearchFilterToolbarContextValue {
  const context = useContext(SearchFilterToolbarContext);

  if (!context) {
    throw new Error(
      'SearchFilterToolbar 하위 컴포넌트는 Root 내부에서 사용해야 합니다.',
    );
  }

  return context;
}

function getSelectedItems(
  item: SearchFilterToolbarItemConfig,
  selectedServiceItems: SelectedSearchFilterItem[],
): SelectedSearchFilterItem[] {
  return selectedServiceItems.filter((selectedItem) =>
    item.sectionKeys.includes(selectedItem.sectionKey),
  );
}

function getToolbarLabel(
  item: SearchFilterToolbarItemConfig,
  selectedItems: SelectedSearchFilterItem[],
): string {
  if (selectedItems.length === 0) {
    return item.label;
  }

  if (item.key === 'all') {
    return `${item.label} ${selectedItems.length}`;
  }

  const visibleItems = selectedItems.slice(0, 3);
  const hiddenItemCount = selectedItems.length - visibleItems.length;
  const selectedLabel = visibleItems.map(({ label }) => label).join(', ');

  return hiddenItemCount > 0
    ? `${selectedLabel} +${hiddenItemCount}`
    : selectedLabel;
}

function SearchFilterToolbarRoot({
  children,
  model,
  selectedServiceItems,
  onReset,
}: SearchFilterToolbarRootProps): ReactNode {
  const [openItemKey, setOpenItemKey] = useState<
    SearchFilterToolbarItemConfig['key'] | null
  >(null);
  const rootRef = useOutsidePointerDown<HTMLDivElement>({
    isEnabled: openItemKey !== null,
    onOutsidePointerDown: () => setOpenItemKey(null),
  });
  const items = useMemo<SearchFilterToolbarItemConfig[]>(() => {
    const sections = model.config.sections.filter(
      (section) => section.type !== 'location',
    );
    const sectionKeys = sections.map((section) => section.key);

    return [
      { key: 'all', label: '필터', sectionKeys },
      ...sections.map((section) => ({
        key: section.key,
        label: section.label,
        sectionKeys: [section.key],
      })),
    ];
  }, [model.config.sections]);

  const contextValue: SearchFilterToolbarContextValue = {
    items,
    model,
    onReset,
    openItemKey,
    selectedServiceItems,
    onClose: () => setOpenItemKey(null),
    onToggle: (itemKey) => {
      setOpenItemKey((currentKey) => (currentKey === itemKey ? null : itemKey));
    },
  };

  return (
    <SearchFilterToolbarContext value={contextValue}>
      <div ref={rootRef}>{children}</div>
    </SearchFilterToolbarContext>
  );
}

function SearchFilterToolbarList(): ReactNode {
  const {
    items,
    model,
    onClose,
    onReset,
    onToggle,
    openItemKey,
    selectedServiceItems,
  } = useSearchFilterToolbar();

  return (
    <div className="search-filter-toolbar-list">
      {items.map((item) => {
        const selectedItems = getSelectedItems(item, selectedServiceItems);
        const isOpen = openItemKey === item.key;
        const isSelected = item.key !== 'all' && selectedItems.length > 0;

        return (
          <SearchFilterToolbarItem
            isOpen={isOpen}
            isSelected={isSelected}
            key={item.key}
            label={getToolbarLabel(item, selectedItems)}
            leadingIcon={item.key === 'all' ? <FilterIcon /> : undefined}
            trailingIcon={
              item.key !== 'all' ? <ChevronDownThinIcon /> : undefined
            }
            onToggle={() => onToggle(item.key)}
          >
            <SearchFilterToolbarPopover
              hasFooter={item.key === 'all'}
              model={model}
              sectionKeys={item.sectionKeys}
              onApply={onClose}
              onReset={onReset}
            />
          </SearchFilterToolbarItem>
        );
      })}
    </div>
  );
}

const SearchFilterToolbar = {
  List: SearchFilterToolbarList,
  Root: SearchFilterToolbarRoot,
};

export default SearchFilterToolbar;
