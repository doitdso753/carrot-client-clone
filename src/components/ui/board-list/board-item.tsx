import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { StarIcon } from '@/assets/icons';
import { formatThousandsBySuffix } from '@/lib/utils.ts';
import type { LocalProfileItem } from '@/types/types.ts';

type BoardItemProps = {
  item: LocalProfileItem;
};

export default function BoardItem({ item }: BoardItemProps): ReactNode {
  return (
    <li>
      <article>
        <Link className="board-item group" to={`/local-profile/${item.id}`}>
          <div className="board-item-content">
            <div className="board-item-heading">
              <h2>{item.name}</h2>
              <span>{item.category}</span>
            </div>
            <p className="board-item-description">{item.description}</p>
            <div className="board-item-meta">
              <span className="board-item-rating">
                <StarIcon />
                {item.rating.toFixed(1)}
              </span>
              <span aria-hidden="true">·</span>
              <span>후기 {formatThousandsBySuffix(item.reviewCount, '')}</span>
              <span aria-hidden="true">·</span>
              <span>단골 {formatThousandsBySuffix(item.commentCount, '')}</span>
              <span aria-hidden="true">·</span>
              <span>{item.location}</span>
            </div>
            {item.coupon && (
              <div className="board-item-options">
                <span>쿠폰</span>
              </div>
            )}
          </div>
          <div className="board-item-image">
            <img src={item.thumbnail} alt="" loading="lazy" />
          </div>
        </Link>
      </article>
    </li>
  );
}
