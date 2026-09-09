import type { ReactNode } from 'react';
import type { BuySellItem } from '@/types/buy-sell';
import DetailBreadcrumb from '@/components/ui/navigation/detail-breadcrumb.tsx';
import type { UserProfile as UserProfileType } from '@/types/user-profile.ts';
import {
  BuySellDetailInfoSection,
  BuySellDetailMediaSection,
  BuySellDetailPopularSection,
  BuySellDetailSellerSection,
} from '@/components/buy-sell/sections';

type BuySellDetailProps = { item: BuySellItem };

const DEFAULT_SELLER: UserProfileType = {
  nickname: '당근이',
  location: '동네 이웃',
  warmth: 36.5,
};

export default function BuySellDetail({ item }: BuySellDetailProps): ReactNode {
  const seller = item.seller ?? DEFAULT_SELLER;

  return (
    <main className="detail-page-wrapper">
      <DetailBreadcrumb
        items={[
          { label: '홈', to: '/' },
          {
            label: item.serviceCategoryText ?? '중고거래',
            to: '/buy-sell',
          },
          { label: item.title },
        ]}
      />

      <article className="detail-page-layout">
        <BuySellDetailMediaSection item={item} seller={seller} />
        <BuySellDetailInfoSection item={item} />
      </article>
      <div className="buy-sell-detail-related flex flex-col">
        <BuySellDetailSellerSection seller={seller} />
        <BuySellDetailPopularSection item={item} seller={seller} />
      </div>
    </main>
  );
}
