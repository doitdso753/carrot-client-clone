import type { ReactNode } from 'react';
import DetailBreadcrumb from '@/components/ui/detail-breadcrumb.tsx';
import SearchFilterSidebar from '@/components/ui/search-filter/search-filter-sidebar.tsx';
import {
  COMMUNITY_CATEGORIES,
  COMMUNITY_COMMENTS,
} from '@/types/community-constants.ts';
import type { CommunityDetailData } from '@/types/types.ts';

type CommunityDetailProps = {
  item: CommunityDetailData;
};

export default function CommunityDetail({
  item,
}: CommunityDetailProps): ReactNode {
  return (
    <main className="detail-page-wrapper">
      <DetailBreadcrumb
        items={[
          { label: '홈', to: '/' },
          { label: '동네생활', to: '/community' },
          { label: item.category },
        ]}
      />
    </main>
  );
}
