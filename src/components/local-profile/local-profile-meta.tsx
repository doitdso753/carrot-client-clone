import type { ReactNode } from 'react';
import { StarIcon } from '@/assets/icons';
import { formatThousandsBySuffix } from '@/lib/utils.ts';
import type { LocalProfileItem } from '@/types/types.ts';

type LocalProfileMetaProps = Pick<
  LocalProfileItem,
  'category' | 'commentCount' | 'rating' | 'regionText' | 'reviewCount'
> & {
  variant: 'detail' | 'store-info';
};

export default function LocalProfileMeta({
  category,
  commentCount,
  rating,
  regionText,
  reviewCount,
  variant,
}: LocalProfileMetaProps): ReactNode {
  return (
    <div className={`local-profile-meta local-profile-meta--${variant}`}>
      <div className="local-profile-meta-row">
        <strong className="local-profile-meta-item local-profile-meta-item--divider local-profile-rating">
          <StarIcon />
          {rating.toFixed(1)}
        </strong>
        <a
          className="local-profile-meta-item local-profile-meta-item--divider"
          href="#reviews"
        >
          <span>후기 {formatThousandsBySuffix(reviewCount, '')}</span>
        </a>
        <span className="local-profile-meta-item local-profile-meta-item--desktop-divider">
          단골 {formatThousandsBySuffix(commentCount, '')}
        </span>
      </div>
      <div className="local-profile-meta-row">
        <span className="local-profile-meta-item local-profile-meta-item--divider">
          {regionText}
        </span>
        <span className="local-profile-meta-item">{category}</span>
      </div>
    </div>
  );
}
