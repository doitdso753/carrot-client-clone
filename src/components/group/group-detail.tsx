import type { ReactNode } from 'react';
import DetailBreadcrumb from '@/components/ui/navigation/detail-breadcrumb.tsx';
import type { GroupItem } from '@/types/group';

type GroupDetailProps = {
  item: GroupItem;
};

export default function GroupDetail({ item }: GroupDetailProps): ReactNode {
  return (
    <main className="detail-page-wrapper">
      <DetailBreadcrumb
        items={[
          { label: '홈', to: '/' },
          { label: '모임', to: '/group' },
          { label: item.title },
        ]}
      />
    </main>
  );
}
