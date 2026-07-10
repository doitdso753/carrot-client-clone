import type { ReactNode } from 'react';
import { getElapsedTimeText } from '@/lib/utils.ts';
import type { BuySellItem } from '@/types/types.ts';

type CardItemProps = {
  item: BuySellItem;
};

export default function CardItem({ item }: CardItemProps): ReactNode {
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
          {item.isReserved && <span className="card-item-badge">예약중</span>}
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
