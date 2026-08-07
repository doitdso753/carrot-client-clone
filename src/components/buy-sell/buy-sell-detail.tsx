import type { ReactNode } from 'react';
import DetailBreadcrumb from '@/components/ui/detail-breadcrumb';
import OpenAppCtaButton from '@/components/ui/open-app-cta-button';
import ImageSlider from '@/components/ui/image-slider';
import UserProfile from '@/components/ui/user-profile';
import { formatThousandsBySuffix, getElapsedTimeText } from '@/lib/utils';
import {
  BUY_SELL_ITEM_STATUS,
  BUY_SELL_ITEM_STATUS_LABEL,
} from '@/types/buy-sell-constants';
import type {
  BuySellItem,
  BuySellItemStatusCode,
  UserProfile as UserProfileType,
} from '@/types/types';

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
        <section aria-label="상품 이미지와 판매자 정보">
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
    </main>
  );
}
