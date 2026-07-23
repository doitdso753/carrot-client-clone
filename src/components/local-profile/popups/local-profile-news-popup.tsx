import type { ReactNode } from 'react';
import { Link } from 'react-router';
import CommonPopup from '@/components/ui/common-popup.tsx';
import type { LocalProfileNews } from '@/types/types.ts';

type LocalProfileNewsPopupProps = {
  isOpen: boolean;
  localProfileId: number;
  news: LocalProfileNews[];
  onClose: () => void;
};

export default function LocalProfileNewsPopup({
  isOpen,
  localProfileId,
  news,
  onClose,
}: LocalProfileNewsPopupProps): ReactNode {
  return (
    <CommonPopup
      isOpen={isOpen}
      title="소식"
      variant="bottom-sheet"
      onClose={onClose}
    >
      <div className="local-profile-news-popup-list">
        {news.map((item, index) => (
          <div className="local-profile-news-popup-list-item" key={item.id}>
            <article className="local-profile-news-popup-item">
              <Link
                className="local-profile-news-popup-link"
                to={`/local-profile/${localProfileId}/news/${item.id}`}
              >
                <div className="local-profile-news-popup-content">
                  <div className="local-profile-news-popup-heading">
                    <h3>{item.title}</h3>
                    <p>
                      {item.createdAtText} · 관심{' '}
                      {item.favoriteCount.toLocaleString()} · 댓글{' '}
                      {item.commentCount.toLocaleString()}
                    </p>
                  </div>
                  <p className="local-profile-news-popup-description">
                    {item.content}
                  </p>
                </div>
                <img src={item.imageUrl} alt={`${item.title} 이미지`} />
              </Link>
            </article>
            {index < news.length - 1 && (
              <hr className="local-profile-detail-section-divider" />
            )}
          </div>
        ))}
      </div>
    </CommonPopup>
  );
}
