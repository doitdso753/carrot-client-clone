import type { ReactNode } from 'react';
import DetailBreadcrumb from '@/components/ui/detail-breadcrumb';
import ImageSlider from '@/components/ui/image-slider';
import UserProfile from '@/components/ui/user-profile';
import { CAR_SELLER } from '@/types/car-list-constants';
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

      <div className="car-detail-layout">
        <div className="car-detail-media">
          <ImageSlider
            imageUrls={item.imageUrls}
            title={item.title}
            isShowImageGallery
          />
          <UserProfile user={CAR_SELLER} />
        </div>

        <article className="car-detail-content">

        </article>
      </div>
    </main>
  );
}
