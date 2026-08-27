import type { ReactNode } from 'react';
import { useParams } from 'react-router';
import CommunityDetail from '@/components/community/community-detail.tsx';
import HeaderWithSearch from '@/layouts/header-with-search/header-with-search.tsx';
import RootLayout from '@/layouts/root-layout.tsx';
import {
  COMMUNITY_ITEMS,
  POPULAR_COMMUNITY_ITEMS,
} from '@/types/community';
import type { CommunityDetailData } from '@/types/community';

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
  const detailItem: CommunityDetailData | null = item ?? null;

  return (
    <RootLayout>
      <div className="flex min-h-screen flex-col">
        <HeaderWithSearch activeCategoryCode="community" />
        {detailItem && <CommunityDetail item={detailItem} />}
      </div>
    </RootLayout>
  );
}
