import type { ReactNode } from 'react';
import DetailBreadcrumb from '@/components/ui/detail-breadcrumb';
import ImageGridSlider from '@/components/ui/image-grid-slider.tsx';
import LocalProfileMeta from '@/components/local-profile/local-profile-meta.tsx';
import {
  LocalProfileBenefitSection,
  LocalProfileCouponSection,
  LocalProfileIntroduction,
  LocalProfileNewsSection,
  LocalProfileNoticeSection,
  LocalProfilePriceSection,
  LocalProfileReviewSection,
  LocalProfileStoreInfoSection,
} from '@/components/local-profile/sections';
import type { LocalProfileItem } from '@/types/types.ts';

type LocalProfileDetailProps = {
  item: LocalProfileItem;
};

export default function LocalProfileDetail({
  item,
}: LocalProfileDetailProps): ReactNode {
  const imageUrls =
    item.imageUrls && item.imageUrls.length > 0
      ? item.imageUrls
      : [item.thumbnail];

  return (
    <main className="local-profile-detail-wrapper">
      <DetailBreadcrumb
        items={[
          { label: '홈', to: '/' },
          { label: '동네업체', to: '/local-profile' },
          { label: item.name },
        ]}
      />

      <div className="local-profile-detail-layout">
        <section className="local-profile-detail-information">
          <div className="local-profile-detail-heading">
            <h1>{item.name}</h1>
            <LocalProfileMeta {...item} variant="detail" />
          </div>

          <div className="local-profile-detail-image-slider">
            <ImageGridSlider imageUrls={imageUrls} title={item.name} />
          </div>

          <div className="local-profile-detail-content">
            <aside className="local-profile-detail-store-info-aside">
              <LocalProfileStoreInfoSection item={item} />
            </aside>

            <hr className="local-profile-detail-section-divider" />

            <article className="local-profile-detail-article">
              <LocalProfileBenefitSection
                benefitDescription={item.benefitDescription}
              />

              <LocalProfileNoticeSection notice={item.notice} />
              <hr className="local-profile-detail-section-divider" />
              <LocalProfileIntroduction item={item} />
              <hr className="local-profile-detail-section-divider" />
              <LocalProfilePriceSection prices={item.prices} />
              <hr className="local-profile-detail-section-divider" />
              <LocalProfileCouponSection coupons={item.coupons} />
              <hr className="local-profile-detail-section-divider" />
              <LocalProfileNewsSection
                localProfileId={item.id}
                news={item.news}
              />
              <hr className="local-profile-detail-section-divider" />
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
