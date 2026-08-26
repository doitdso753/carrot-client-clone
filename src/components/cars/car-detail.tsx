import type { ReactNode } from 'react';
import {
  CarDetailDescriptionSection,
  CarDetailInsuranceSection,
  CarDetailLeaseSection,
  CarDetailOptionsSection,
  CarDetailSaleSection,
  CarDetailSpecSection,
  CarDetailSpecSummarySection,
} from '@/components/cars/sections';
import CarMap from '@/components/cars/car-map';
import DetailBreadcrumb from '@/components/ui/navigation/detail-breadcrumb.tsx';
import ImageSlider from '@/components/ui/image/image-slider.tsx';
import UserProfile from '@/components/ui/user-profile/user-profile.tsx';
import { getElapsedTimeText } from '@/lib/utils';
import { CAR_SELLER } from '@/types/car-list-constants';
import type { CarListItem } from '@/types/types';

type CarDetailProps = {
  item: CarListItem;
};

export default function CarDetail({ item }: CarDetailProps): ReactNode {
  return (
    <main className="detail-page-wrapper">
      <DetailBreadcrumb
        items={[
          { label: '홈', to: '/' },
          { label: '중고차', to: '/cars' },
          { label: item.title },
        ]}
      />

      <article className="car-detail-layout">
        <section
          className="car-detail-image-slider"
          aria-label="차량 이미지와 판매자 정보"
        >
          <ImageSlider
            imageUrls={item.imageUrls}
            title={item.title}
            isShowImageGallery
          />
          <UserProfile user={CAR_SELLER} />
        </section>

        <div className="car-detail-content">
          <header className="car-detail-heading">
            <h1>{item.title}</h1>
            <p>{getElapsedTimeText(item.createdAt)} 작성</p>
          </header>

          <CarDetailSpecSummarySection item={item} />

          {item.transactionType === 'lease' ? (
            <CarDetailLeaseSection leaseInfo={item.leaseInfo} />
          ) : (
            <CarDetailSaleSection saleInfo={item.saleInfo} />
          )}
          <CarDetailSpecSection item={item} />
          <CarDetailInsuranceSection insuranceInfo={item.insuranceInfo} />
          <CarDetailOptionsSection options={item.detailOptions} />
          <CarDetailDescriptionSection item={item} />

          <CarMap address={item.address} />
        </div>
      </article>
    </main>
  );
}
