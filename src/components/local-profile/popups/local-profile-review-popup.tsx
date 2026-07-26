import type { ReactNode } from 'react';
import { StarIcon } from '@/assets/icons';
import LocalProfileReviewItem from '@/components/local-profile/sections/local-profile-review-item.tsx';
import CommonPopup from '@/components/ui/common-popup.tsx';
import type { LocalProfileReview } from '@/types/types.ts';

type LocalProfileReviewPopupProps = {
  isOpen: boolean;
  reviews: LocalProfileReview[];
  onClose: () => void;
};

const getAverageRating = (reviews: LocalProfileReview[]): number => {
  if (reviews.length === 0) {
    return 0;
  }

  const ratingSum = reviews.reduce((sum, review) => sum + review.rating, 0);

  return ratingSum / reviews.length;
};

export default function LocalProfileReviewPopup({
  isOpen,
  reviews,
  onClose,
}: LocalProfileReviewPopupProps): ReactNode {
  const averageRating = getAverageRating(reviews);

  return (
    <CommonPopup
      isOpen={isOpen}
      title="후기"
      variant="bottom-sheet"
      onClose={onClose}
    >
      <div className="local-profile-review-popup">
        <div className="local-profile-review-popup-summary">
          <strong>
            <StarIcon />
            {averageRating.toFixed(1)}
          </strong>
          <p>인계동 근처 동네인증한 이웃의 별점을 우선으로 반영해요.</p>
        </div>

        <div className="local-profile-review-list">
          {reviews.map((review) => (
            <LocalProfileReviewItem
              hasReply={false}
              key={review.id}
              review={review}
            />
          ))}
        </div>
      </div>
    </CommonPopup>
  );
}
