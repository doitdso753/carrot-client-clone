import type { ReactNode } from 'react';
import type { BuySellItem } from '@/types/buy-sell';
import type { UserProfile as UserProfileType } from '@/types/user-profile.ts';
import BuySellRelatedSection from '@/components/buy-sell/buy-sell-related-section';
import { BUY_SELL_ITEMS, BUY_SELL_ITEM_STATUS } from '@/types/buy-sell';

type BuySellDetailPopularSectionProps = {
  item: BuySellItem;
  seller: UserProfileType;
};

export default function BuySellDetailPopularSection({
  item,
  seller,
}: BuySellDetailPopularSectionProps): ReactNode {
  // 거래완료 상품은 제외하고, 판매자 정보가 없으면 상품의 동네명으로 지역을 비교합니다.
  const nearbyItems = BUY_SELL_ITEMS.filter(
    (candidate) =>
      candidate.id !== item.id &&
      candidate.status !== BUY_SELL_ITEM_STATUS.SOLD &&
      (candidate.seller
        ? candidate.seller.location === seller.location
        : candidate.location === item.location),
  ).sort(
    (first, second) =>
      (second.stats?.favoriteCount ?? 0) - (first.stats?.favoriteCount ?? 0),
  );
  return (
    <BuySellRelatedSection
      title={`${item.seller?.location ?? item.location} 근처 인기 중고거래`}
      items={nearbyItems}
      hasStatusBadge
      moreHref={`/buy-sell?search=${encodeURIComponent(item.location)}`}
    />
  );
}
