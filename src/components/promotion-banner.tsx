import type { ReactNode } from 'react';
import bannerImage from '@/assets/images/banner.png';

export default function PromotionBanner(): ReactNode {
  return (
    <section className="mt-16 w-full overflow-hidden shadow-sm">
      <img
        className="w-full object-cover"
        src={bannerImage}
        alt="찐당근 후기 이벤트 배너"
      />
    </section>
  );
}
