import type { ReactNode } from 'react';
import type { UserProfile as UserProfileType } from '@/types/user-profile.ts';
import BuySellRelatedSection from '@/components/buy-sell/buy-sell-related-section';
import { BUY_SELL_ITEMS } from '@/types/buy-sell';

type BuySellDetailSellerSectionProps = { seller: UserProfileType };

export default function BuySellDetailSellerSection({
  seller,
}: BuySellDetailSellerSectionProps): ReactNode {
  const sellerItems = BUY_SELL_ITEMS.filter(
    (candidate) =>
      candidate.seller?.nickname === seller.nickname &&
      candidate.seller?.location === seller.location,
  );
  return (
    <BuySellRelatedSection
      title={`${seller.nickname}의 판매 물품`}
      items={sellerItems}
      moreHref={import.meta.env.APP_URL}
    />
  );
}
