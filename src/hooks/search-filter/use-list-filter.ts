import { useSearchParams } from 'react-router';
import useRegion from '@/hooks/location/use-region.ts';
import { includesRegion, includesSearchKeyword } from '@/lib/search-utils.ts';

type FilterValue = string | undefined;

type UseListFilterOptions<Item> = {
  getRegionValues: (item: Item) => readonly FilterValue[];
  getSearchValues: (item: Item) => readonly FilterValue[];
  items: readonly Item[];
};

type UseListFilterReturn<Item> = {
  filteredItems: Item[];
  region: string;
  searchKeyword: string;
};

// 현재 지역과 URL 키워드를 기준으로 목록 필터링
export default function useListFilter<Item>({
  getRegionValues,
  getSearchValues,
  items,
}: UseListFilterOptions<Item>): UseListFilterReturn<Item> {
  const { region } = useRegion();
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('search')?.trim() ?? '';
  const filteredItems = items.filter(
    (item) =>
      includesRegion(region, getRegionValues(item)) &&
      includesSearchKeyword(searchKeyword, getSearchValues(item)),
  );

  return { filteredItems, region, searchKeyword };
}
