import type { ReactNode } from 'react';
import type { BuySellItem } from '@/types/buy-sell';
import ImageSlider from '@/components/ui/image/image-slider.tsx';
import UserProfile from '@/components/ui/user-profile/user-profile.tsx';
import type { UserProfile as UserProfileType } from '@/types/user-profile.ts';

type BuySellDetailMediaSectionProps = {
  item: BuySellItem;
  seller: UserProfileType;
};

export default function BuySellDetailMediaSection({
  item,
  seller,
}: BuySellDetailMediaSectionProps): ReactNode {
  const imageUrls =
    item.imageUrls && item.imageUrls.length > 0
      ? item.imageUrls
      : [item.imageUrl];

  return (
    <section
      className="buy-sell-detail-media"
      aria-label="상품 이미지와 판매자 정보"
    >
      <ImageSlider imageUrls={imageUrls} title={item.title} />

      <UserProfile user={seller} />
    </section>
  );
}
