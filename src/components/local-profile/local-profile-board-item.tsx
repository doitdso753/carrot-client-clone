import type { KeyboardEvent, MouseEvent, ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { CouponIcon, StarIcon } from '@/assets/icons';
import SimpleImageGridSlider from '@/components/ui/image/simple-image-grid-slider.tsx';
import { formatThousandsBySuffix } from '@/lib/utils.ts';
import type { LocalProfileItem } from '@/types/local-profile';

type LocalProfileBoardItemProps = {
  item: LocalProfileItem;
};

export default function LocalProfileBoardItem({
  item,
}: LocalProfileBoardItemProps): ReactNode {
  const navigate = useNavigate();
  const imageUrls = item.imageUrls?.length ? item.imageUrls : [item.thumbnail];
  const representativeReview = item.reviews?.[0];
  const detailPath = `/local-profile/${item.id}`;

  const handleItemClick = (event: MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    navigate(detailPath);
  };

  const handleItemKeyDown = (event: KeyboardEvent<HTMLElement>): void => {
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();
    navigate(detailPath);
  };

  return (
    <li className="local-profile-board-list-item">
      <article
        aria-label={`${item.name} 상세 페이지로 이동`}
        className="local-profile-board-item"
        role="link"
        tabIndex={0}
        onClickCapture={handleItemClick}
        onKeyDown={handleItemKeyDown}
      >
        <div className="local-profile-board-heading-area">
          <div className="local-profile-board-heading-content">
            <div className="local-profile-board-heading">
              <h2>{item.name}</h2>
              <span>{item.category}</span>
            </div>
            <p className="local-profile-board-meta">
              {item.coupon && (
                <>
                  <strong className="local-profile-board-coupon">
                    <CouponIcon />
                    쿠폰
                  </strong>
                  <span aria-hidden="true">·</span>
                </>
              )}
              <span>{item.location}</span>
              <span aria-hidden="true">·</span>
              <span>단골 {formatThousandsBySuffix(item.commentCount, '')}</span>
            </p>
          </div>
          <div className="local-profile-board-review-summary">
            <strong>
              <StarIcon />
              {item.rating.toFixed(1)}
            </strong>
            <span>후기 {formatThousandsBySuffix(item.reviewCount, '')}</span>
          </div>
        </div>

        <SimpleImageGridSlider imageUrls={imageUrls} title={item.name} />

        <div className="local-profile-board-introduction">
          <strong>소개</strong>
          <p>{item.description}</p>
        </div>

        {representativeReview && (
          <p className="local-profile-board-comment">
            {representativeReview.content}
          </p>
        )}
      </article>
    </li>
  );
}
