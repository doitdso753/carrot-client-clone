import type { ReactNode } from 'react';
import { ChevronRightIcon, DownloadIcon } from '@/assets/icons';
import LocalProfileDetailSection from './local-profile-detail-section.tsx';
import type { LocalProfileCoupon } from '@/types/local-profile';

type LocalProfileCouponSectionProps = {
  coupons?: LocalProfileCoupon[];
};

const formatCouponDate = (expiresAt: string): string =>
  new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(expiresAt));

export default function LocalProfileCouponSection({
  coupons = [],
}: LocalProfileCouponSectionProps): ReactNode {
  return (
    <LocalProfileDetailSection
      caption="당근 앱에서 쿠폰을 받을 수 있어요."
      title="쿠폰"
    >
      <div className="local-profile-coupon-list">
        {coupons.map((coupon) => (
          <article className="local-profile-coupon-item" key={coupon.id}>
            <div className="local-profile-coupon-content">
              <div className="local-profile-coupon-title">
                <strong>{coupon.title}</strong>
                <ChevronRightIcon />
              </div>
              <p>{formatCouponDate(coupon.expiresAt)}까지</p>
            </div>

            <button className="local-profile-coupon-download" type="button">
              <DownloadIcon />
              쿠폰받기
            </button>
          </article>
        ))}
      </div>
    </LocalProfileDetailSection>
  );
}
