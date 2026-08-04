import type { ReactNode } from 'react';
import { CommentIcon, HeartIcon } from '@/assets/icons/index.ts';
import { getElapsedTimeText } from '@/lib/utils.ts';
import { CAR_LIST_ITEM_STATUS_LABEL } from '@/types/car-list-constants.ts';
import type { CarListItem } from '@/types/types.ts';

type CarCardItemProps = {
  item: CarListItem;
};

export default function CarCardItem({ item }: CarCardItemProps): ReactNode {
  return (
    <article>
      <a className="group car-card-item" href={`/cars/${item.id}`}>
        <div className="card-item-image aspect-square overflow-hidden rounded-lg bg-(--color-palette-gray-200)">
          <img
            className="h-full w-full object-cover transition duration-300 ease-out group-hover:scale-105"
            src={item.imageUrl}
            alt={item.title}
            loading="lazy"
          />
        </div>

        <div className="car-card-item-content">
          <h2 className="car-card-item-title">{item.title}</h2>

          <div className="car-card-item-details">
            <p className="car-card-item-price">
              {item.status && (
                <span
                  className={`car-card-item-status car-card-item-status--${item.status}`}
                >
                  {CAR_LIST_ITEM_STATUS_LABEL[item.status]}
                </span>
              )}
              <strong>{item.priceText}</strong>
            </p>

            <p className="car-card-item-spec">
              <span>{item.modelYearText}</span>
              <span aria-hidden="true">·</span>
              <span>{item.mileageText}</span>
            </p>

            <div className="car-card-item-meta-group">
              <p className="car-card-item-meta">
                <span>{item.location}</span>
                <span aria-hidden="true">·</span>
                <span>{getElapsedTimeText(item.createdAt)}</span>
              </p>
              <p className="car-card-item-meta">
                <span>
                  <CommentIcon />
                  <span className="sr-only">댓글</span>
                  {item.commentCount}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  <HeartIcon />
                  <span className="sr-only">관심</span>
                  {item.favoriteCount}
                </span>
              </p>
            </div>
          </div>
        </div>
      </a>
    </article>
  );
}
