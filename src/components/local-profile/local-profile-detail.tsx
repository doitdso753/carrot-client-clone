import type { ReactNode } from 'react';
import { StarIcon } from '@/assets/icons';
import DetailBreadcrumb from '@/components/ui/detail-breadcrumb';
import ImageGridSlider from '@/components/ui/image-grid-slider.tsx';
import {
  LocalProfileBenefitSection,
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
            <div className="local-profile-detail-meta">
              <div className="local-profile-detail-meta-row">
                <strong className="local-profile-detail-meta-item local-profile-detail-meta-item--divider local-profile-detail-meta-rating">
                  <StarIcon />
                  {item.rating.toFixed(1)}
                </strong>
                <a
                  className="local-profile-detail-meta-item local-profile-detail-meta-item--divider"
                  href="#reviews"
                >
                  <span>후기 {item.reviewCount.toLocaleString()}</span>
                </a>
                <span className="local-profile-detail-meta-item local-profile-detail-meta-item--desktop-divider">
                  단골 {item.commentCount.toLocaleString()}
                </span>
              </div>
              <div className="local-profile-detail-meta-row">
                <span className="local-profile-detail-meta-item local-profile-detail-meta-item--divider">
                  {item.regionText}
                </span>
                <span className="local-profile-detail-meta-item">
                  {item.category}
                </span>
              </div>
            </div>
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
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
