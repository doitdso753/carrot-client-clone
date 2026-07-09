import type { ReactNode } from 'react';
import { getElapsedTimeText } from '@/lib/utils.ts';
import type { BuySellItem } from '@/types/types.ts';

type BuySellCardProps = {
  item: BuySellItem;
};

export default function BuySellCard({ item }: BuySellCardProps): ReactNode {
  return (
    <article>
      <a className="group buy-sell-card-grid" href={`/buy-sell/${item.id}`}>
        <div className="buy-sell-card-image aspect-square overflow-hidden rounded-lg bg-(--color-palette-gray-200)">
          <img
            className="h-full w-full object-cover transition duration-300 ease-out group-hover:scale-105"
            src={item.imageUrl}
            alt={item.title}
            loading="lazy"
          />
          {item.isReserved && (
            <span className="buy-sell-card-reserved-badge">예약중</span>
          )}
        </div>
        <h2 className="buy-sell-card-title truncate text-base font-bold text-(--color-palette-gray-1000)">
          {item.title}
        </h2>
        <p className="buy-sell-card-price text-base font-bold text-(--color-palette-gray-1000)">
          {item.price.toLocaleString()}원
        </p>
        <p className="buy-sell-card-meta text-xs text-(--color-palette-gray-700)">
          {item.location}&nbsp;·&nbsp;{getElapsedTimeText(item.createdAt)}
        </p>
      </a>
    </article>
  );
}
