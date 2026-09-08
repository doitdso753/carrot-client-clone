import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ChevronRightThinIcon } from '@/assets/icons';
import { getElapsedTimeText } from '@/lib/date-utils';
import { formatThousandsBySuffix } from '@/lib/utils';
import type { BuySellItem } from '@/types/buy-sell';
import {
  BUY_SELL_ITEM_STATUS,
  BUY_SELL_ITEM_STATUS_LABEL,
} from '@/types/buy-sell';

type BuySellRelatedSectionProps = {
  title: string;
  items: BuySellItem[];
  moreHref: string;
  hasStatusBadge?: boolean;
};

export default function BuySellRelatedSection({
  title,
  items,
  moreHref,
  hasStatusBadge = false,
}: BuySellRelatedSectionProps): ReactNode {
  return (
    <section className="buy-sell-related flex min-w-0 flex-col">
      <header className="flex items-center justify-between gap-(--space-16)">
        <h2 className="buy-sell-related-heading font-bold">{title}</h2>
        <Link
          to={moreHref}
          aria-label={`${title} 더보기`}
          className="buy-sell-related-more flex shrink-0 items-center gap-(--space-4) text-sm"
        >
          <ChevronRightThinIcon />
        </Link>
      </header>
      {items.length > 0 ? (
        <ul className="buy-sell-related-list">
          {items.map((item) => (
            <li key={item.id} className="min-w-0">
              <Link
                to={`/buy-sell/${item.id}`}
                className="group flex min-w-0 flex-col gap-y-(--space-8)"
              >
                <div className="card-item-image aspect-square overflow-hidden rounded-(--rounded-6) bg-(--color-palette-gray-100)">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  {/* 인기 목록은 예약중·거래완료 상품에 상태 뱃지를 표시합니다. */}
                  {hasStatusBadge &&
                    (item.status === BUY_SELL_ITEM_STATUS.RESERVED ||
                      item.status === BUY_SELL_ITEM_STATUS.SOLD) && (
                      <span
                        className={`card-item-badge card-item-badge--${item.status}`}
                      >
                        {BUY_SELL_ITEM_STATUS_LABEL[item.status]}
                      </span>
                    )}
                </div>
                <div className="flex min-w-0 flex-col gap-y-(--space-4)">
                  <div className="flex min-w-0 flex-col gap-y-(--space-2)">
                    <h3 className="max-w-full truncate text-base font-normal">
                      {item.title}
                    </h3>
                    <p className="truncate text-base font-bold">
                      {formatThousandsBySuffix(item.price, '원')}원
                    </p>
                  </div>
                  <p className="metadata metadata--small">
                    {item.location} · {getElapsedTimeText(item.createdAt)}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="metadata">표시할 판매 물품이 없습니다.</p>
      )}
    </section>
  );
}
