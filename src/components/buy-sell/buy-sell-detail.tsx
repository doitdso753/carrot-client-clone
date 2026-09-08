import type { ReactNode } from 'react';
import DetailBreadcrumb from '@/components/ui/navigation/detail-breadcrumb.tsx';
import OpenAppCtaButton from '@/components/ui/open-app-cta-button';
import ImageSlider from '@/components/ui/image/image-slider.tsx';
import UserProfile from '@/components/ui/user-profile/user-profile.tsx';
import BuySellRelatedSection from './buy-sell-related-section';
import { getElapsedTimeText } from '@/lib/date-utils';
import { formatThousandsBySuffix } from '@/lib/utils';
import {
  BUY_SELL_ITEM_STATUS,
  BUY_SELL_ITEM_STATUS_LABEL,
  BUY_SELL_ITEMS,
} from '@/types/buy-sell';
import type { BuySellItem, BuySellItemStatusCode } from '@/types/buy-sell';
import type { UserProfile as UserProfileType } from '@/types/user-profile.ts';

type BuySellDetailProps = {
  item: BuySellItem;
};

const DEFAULT_SELLER: UserProfileType = {
  nickname: '당근이',
  location: '동네 이웃',
  warmth: 36.5,
};

const DEFAULT_STATS = {
  chatCount: 0,
  favoriteCount: 0,
  viewCount: 0,
};

const DETAIL_HEADING_STATUS_LABEL: Partial<
  Record<BuySellItemStatusCode, string>
> = {
  [BUY_SELL_ITEM_STATUS.RESERVED]:
    BUY_SELL_ITEM_STATUS_LABEL[BUY_SELL_ITEM_STATUS.RESERVED],
  [BUY_SELL_ITEM_STATUS.SOLD]:
    BUY_SELL_ITEM_STATUS_LABEL[BUY_SELL_ITEM_STATUS.SOLD],
};

export default function BuySellDetail({ item }: BuySellDetailProps): ReactNode {
  const seller = item.seller ?? DEFAULT_SELLER;
  const stats = item.stats ?? DEFAULT_STATS;
  const sellerItems = BUY_SELL_ITEMS.filter(
    (candidate) =>
      candidate.seller?.nickname === seller.nickname &&
      candidate.seller?.location === seller.location,
  );
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
  const headingStatusText = item.status
    ? DETAIL_HEADING_STATUS_LABEL[item.status]
    : '';
  const imageUrls =
    item.imageUrls && item.imageUrls.length > 0
      ? item.imageUrls
      : [item.imageUrl];

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
        <section
          className="buy-sell-detail-media"
          aria-label="상품 이미지와 판매자 정보"
        >
          <ImageSlider imageUrls={imageUrls} title={item.title} />

          <UserProfile user={seller} />
        </section>

        <section className="detail-page-content">
          <header className="detail-page-heading">
            <h1>
              {headingStatusText && (
                <span
                  className={`detail-page-heading-status detail-page-heading-status--${item.status}`}
                >
                  {headingStatusText}
                </span>
              )}
              {item.title}
            </h1>
            <p>
              {item.categoryText ?? '기타 중고물품'} ·{' '}
              {getElapsedTimeText(item.createdAt)}
            </p>
            <strong>{formatThousandsBySuffix(item.price, '원')}원</strong>
          </header>

          <section className="detail-page-description" aria-label="상품 설명">
            <p className="whitespace-pre-line">
              {item.description ??
                '상품에 관심이 있으시면 당근 앱에서 판매자에게 문의해 주세요.'}
            </p>
            <p className="detail-page-status">
              채팅 {stats.chatCount} · 관심 {stats.favoriteCount} · 조회{' '}
              {stats.viewCount}
            </p>
          </section>

          <OpenAppCtaButton />
        </section>
      </article>
      <div className="buy-sell-detail-related flex flex-col">
        <BuySellRelatedSection
          title={`${seller.nickname}의 판매 물품`}
          items={sellerItems}
          moreHref={import.meta.env.APP_URL}
        />
        <BuySellRelatedSection
          title={`${item.seller?.location ?? item.location} 근처 인기 중고거래`}
          items={nearbyItems}
          hasStatusBadge
          moreHref={`/buy-sell?search=${encodeURIComponent(item.location)}`}
        />
      </div>
    </main>
  );
}
