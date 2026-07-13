import type { ReactNode } from 'react';
import { Link } from 'react-router';
import ImageSlider from '@/components/ui/image-slider';
import UserProfile from '@/components/ui/user-profile';
import { getElapsedTimeText } from '@/lib/utils';
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
    <main className="buy-sell-detail-wrapper">
      <nav className="buy-sell-detail-breadcrumb" aria-label="현재 위치">
        <Link to="/">홈</Link>
        <span aria-hidden="true">›</span>
        <Link to="/buy-sell">{item.serviceCategoryText ?? '중고거래'}</Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">{item.title}</span>
      </nav>

      <div className="buy-sell-detail-layout">
        <section aria-label="상품 이미지와 판매자 정보">
          <ImageSlider imageUrls={imageUrls} title={item.title} />

          <UserProfile user={seller} />
        </section>

        <section className="buy-sell-detail-information">
          <div className="buy-sell-detail-heading">
            <h1>
              {headingStatusText && (
                <span
                  className={`buy-sell-detail-heading-status buy-sell-detail-heading-status--${item.status}`}
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
            <strong>{item.price.toLocaleString()}원</strong>
          </div>

          <div className="buy-sell-detail-description">
            <p className="whitespace-pre-line">
              {item.description ??
                '상품에 관심이 있으시면 당근 앱에서 판매자에게 문의해 주세요.'}
            </p>
            <p className="buy-sell-detail-status">
              채팅 {stats.chatCount} · 관심 {stats.favoriteCount} · 조회{' '}
              {stats.viewCount}
            </p>
          </div>

          <a
            className="buy-sell-detail-app-button"
            href="https://www.daangn.com/"
            target="_blank"
            rel="noreferrer"
          >
            당근 앱에서 보기
          </a>
        </section>
      </div>
    </main>
  );
}
