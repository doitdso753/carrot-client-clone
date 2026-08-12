import type { ReactNode } from 'react';
import SearchFilterFields from '@/components/ui/search-filter/search-filter-fields.tsx';
import type {
  SearchFilterConfig,
  SearchFilterSectionKey,
} from '@/types/search-filter-configs.ts';
import type { SearchFilterViewModel } from '@/types/search-filter-view-model.ts';

type SearchFilterToolbarPopoverProps = {
  hasFooter?: boolean;
  model: SearchFilterViewModel;
  sectionKeys: SearchFilterSectionKey[];
  onApply?: () => void;
  onReset?: () => void;
};

export default function SearchFilterToolbarPopover({
  hasFooter = false,
  model,
  sectionKeys,
  onApply,
  onReset,
}: SearchFilterToolbarPopoverProps): ReactNode {
  const config: SearchFilterConfig = {
    ...model.config,
    sections: model.config.sections.filter((section) =>
      sectionKeys.includes(section.key),
    ),
  };
  const popoverLabel = config.sections
    .map((section) => section.label)
    .join(', ');

  return (
    <div
      aria-label={`${popoverLabel} 필터`}
      className="search-filter-toolbar-popover"
      role="dialog"
    >
      <div className="search-filter-toolbar-popover-body">
        <SearchFilterFields
          model={{ ...model, config }}
          variant="bottomSheet"
        />
      </div>
      {hasFooter && (
        <footer className="search-filter-toolbar-popover-footer">
          <button type="button" onClick={onReset}>
            전체 해제
          </button>
          <button type="button" onClick={onApply}>
            필터 적용
          </button>
        </footer>
      )}
    </div>
  );
}
