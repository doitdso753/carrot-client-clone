import type { ReactNode } from 'react';
import { getElapsedTimeText } from '@/lib/utils.ts';
import { BUY_SELL_ITEM_STATUS_LABEL } from '@/types/buy-sell-constants.ts';
import type { BuySellItem, BuySellItemStatusCode } from '@/types/types.ts';

type CardItemProps = {
  item: BuySellItem;
};

const CARD_ITEM_BADGE_STATUS_LABEL: Partial<
  Record<BuySellItemStatusCode, string>
> = {
  reserved: BUY_SELL_ITEM_STATUS_LABEL.reserved,
  sold: BUY_SELL_ITEM_STATUS_LABEL.sold,
};

export default function CardItem({ item }: CardItemProps): ReactNode {
  const badgeText = item.status
    ? CARD_ITEM_BADGE_STATUS_LABEL[item.status]
    : '';

  return (
    <article>
      <a className="group card-item-grid" href={`/buy-sell/${item.id}`}>
        <div className="card-item-image aspect-square overflow-hidden rounded-lg bg-(--color-palette-gray-200)">
          <img
            className="h-full w-full object-cover transition duration-300 ease-out group-hover:scale-105"
            src={item.imageUrl}
            alt={item.title}
            loading="lazy"
          />
          {badgeText && (
            <span className={`card-item-badge card-item-badge--${item.status}`}>
              {badgeText}
            </span>
          )}
        </div>
        <h2 className="card-item-title truncate text-base font-bold text-(--color-palette-gray-1000)">
          {item.title}
        </h2>
        <p className="card-item-price text-base font-bold text-(--color-palette-gray-1000)">
          {item.price.toLocaleString()}원
        </p>
        <p className="card-item-meta text-xs text-(--color-palette-gray-700)">
          {item.location}&nbsp;·&nbsp;{getElapsedTimeText(item.createdAt)}
        </p>
      </a>
    </article>
  );
}
