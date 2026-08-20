import type { ReactNode } from 'react';
import { useParams } from 'react-router';
import CommunityDetail, {
  type CommunityDetailData,
} from '@/components/community/community-detail.tsx';
import HeaderWithSearch from '@/layouts/header-with-search/header-with-search.tsx';
import RootLayout from '@/layouts/root-layout.tsx';
import {
  COMMUNITY_ITEMS,
  POPULAR_COMMUNITY_ITEMS,
} from '@/types/community-constants.ts';

export default function CommunityDetailPage(): ReactNode {
  const { id } = useParams();
  const itemId = Number(id);
  const item =
    COMMUNITY_ITEMS.find(
      ({ id: communityItemId }) => communityItemId === itemId,
    ) ??
    POPULAR_COMMUNITY_ITEMS.find(
      ({ id: popularCommunityItemId }) => popularCommunityItemId === itemId,
    );
  let detailItem: CommunityDetailData | null = null;

  if (item && 'content' in item) {
    detailItem = item;
  } else if (item) {
    const [location = '동네', category = '동네생활', createdAtText = ''] =
      item.metadata.split(' · ');

    detailItem = {
      category,
      commentCount: item.commentCount,
      createdAtText,
      id: item.id,
      likeCount: item.likeCount,
      location,
      tags: item.tags,
      title: item.title,
      viewCount: item.viewCount,
    };
  }

  return (
    <RootLayout>
      <div className="flex min-h-screen flex-col">
        <HeaderWithSearch activeCategoryCode="community" />
        {detailItem && <CommunityDetail item={detailItem} />}
      </div>
    </RootLayout>
  );
}
