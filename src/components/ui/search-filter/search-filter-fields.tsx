import type { ReactNode } from 'react';
import SearchFilterRenderer from '@/components/ui/search-filter/search-filter-renderer.tsx';
import type { SearchFilterViewModel } from '@/types/search-filter';

type SearchFilterFieldsProps = {
  model: SearchFilterViewModel;
  variant?: 'aside' | 'bottomSheet';
};

export default function SearchFilterFields({
  model,
  variant = 'aside',
}: SearchFilterFieldsProps): ReactNode {
  return (
    <>
      {model.config.sections.map((section) => (
        <SearchFilterRenderer
          key={section.key}
          model={model}
          section={section}
          variant={variant}
        />
      ))}
    </>
  );
}
