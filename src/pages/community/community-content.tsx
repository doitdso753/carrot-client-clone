import { useEffect, useState, type ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import CommunityList from '@/components/community/community-list.tsx';
import SearchFilter from '@/components/ui/search-filter/search-filter.tsx';
import ServiceListTitle from '@/components/ui/service-list-title.tsx';
import useRegion from '@/hooks/location/use-region.ts';
import {
  COMMUNITY_CATEGORIES,
  COMMUNITY_ITEMS,
} from '@/types/community-constants.ts';

export default function CommunityContent(): ReactNode {
  const { region } = useRegion();
  const [searchParams, setSearchParams] = useSearchParams();
  const [initialCategoryCode] = useState(() => searchParams.get('category'));
  const selectedCategory = COMMUNITY_CATEGORIES.find(
    ({ code }) => code === initialCategoryCode,
  );
  const items = selectedCategory
    ? COMMUNITY_ITEMS.filter(
        ({ category }) => category === selectedCategory.label,
      )
    : COMMUNITY_ITEMS;

  useEffect(() => {
    if (!searchParams.has('category')) {
      return;
    }

    const nextSearchParams = new URLSearchParams(searchParams);

    nextSearchParams.delete('category');
    setSearchParams(nextSearchParams, { replace: true });
  }, [searchParams, setSearchParams]);

  return (
    <main className="service-list-page min-h-screen pb-20">
      <ServiceListTitle>{region} 동네생활</ServiceListTitle>
      <div className="service-list-layout">
        <SearchFilter
          region={region}
          initialFilterCodes={
            selectedCategory ? { category: selectedCategory.code } : undefined
          }
          variant="community"
        />
        <CommunityList items={items} region={region} />
      </div>
    </main>
  );
}
