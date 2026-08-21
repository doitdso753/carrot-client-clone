import type { ReactNode } from 'react';
import {
  CommunityCommentSection,
  CommunityPopularSection,
  CommunityPostSection,
} from '@/components/community/sections';
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
  const selectedCategoryCode = COMMUNITY_CATEGORIES.find(
    ({ label }) => label === item.category,
  )?.code;
  return (
    <main className="detail-page-wrapper">
      <DetailBreadcrumb
        items={[
          { label: '홈', to: '/' },
          { label: '동네생활', to: '/community' },
          { label: item.category },
        ]}
      />

      <div className="community-detail-layout">
        <SearchFilterSidebar
          region={item.location}
          sectionKeys={['category']}
          initialFilterCodes={
            selectedCategoryCode
              ? { category: selectedCategoryCode }
              : undefined
          }
          variant="community"
        />

        <div className="community-detail-main">
          <CommunityPostSection
            categoryCode={selectedCategoryCode}
            item={item}
          />

          <CommunityCommentSection comments={COMMUNITY_COMMENTS} />

          <CommunityPopularSection
            currentItemId={item.id}
            location={item.location}
          />
        </div>
      </div>
    </main>
  );
}
