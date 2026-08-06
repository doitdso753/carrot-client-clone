import type { ReactNode } from 'react';
import DetailBreadcrumb from '@/components/ui/detail-breadcrumb';
import type { CarListItem } from '@/types/types';

type CarDetailProps = {
  item: CarListItem;
};

export default function CarDetail({ item }: CarDetailProps): ReactNode {
  return (
    <main className="detail-page-wrapper car-detail-page">
      <DetailBreadcrumb
        items={[
          { label: '홈', to: '/' },
          { label: '중고차', to: '/cars' },
          { label: item.title },
        ]}
      />
    </main>
  );
}
