import type { ReactNode } from 'react';
import DetailBreadcrumb from '@/components/ui/detail-breadcrumb.tsx';

export type CommunityDetailData = {
  category: string;
  commentCount: number;
  content?: string;
  createdAtText: string;
  id: number;
  likeCount: number;
  location: string;
  tags: string;
  title: string;
  viewCount: number;
};

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
