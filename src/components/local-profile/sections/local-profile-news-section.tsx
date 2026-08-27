import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { ChevronRightThinIcon } from '@/assets/icons';
import usePopup from '@/hooks/ui/use-popup.ts';
import { formatThousandsBySuffix } from '@/lib/utils.ts';
import LocalProfileDetailSection from './local-profile-detail-section.tsx';
import LocalProfileNewsPopup from '@/components/local-profile/popups/local-profile-news-popup.tsx';
import type { LocalProfileNews } from '@/types/local-profile';

type LocalProfileNewsSectionProps = {
  localProfileId: number;
  news?: LocalProfileNews[];
};

const VISIBLE_NEWS_COUNT = 3;

function LocalProfileNewsList({
  localProfileId,
  news,
}: {
  localProfileId: number;
  news: LocalProfileNews[];
}): ReactNode {
  return (
    <div className="local-profile-news-list">
      {news.map((item) => (
        <div className="local-profile-news-list-item" key={item.id}>
          <article className="local-profile-news-item">
            <Link
              className="local-profile-news-link"
              to={`/local-profile/${localProfileId}/news/${item.id}`}
            >
              <div className="local-profile-news-content">
                <div className="local-profile-news-heading">
                  <h3>{item.title}</h3>
                  <p>
                    {item.createdAtText} · 관심{' '}
                    {formatThousandsBySuffix(item.favoriteCount, '')} · 댓글{' '}
                    {formatThousandsBySuffix(item.commentCount, '')}
                  </p>
                </div>
              </div>
              <img src={item.imageUrl} alt={`${item.title} 이미지`} />
            </Link>
          </article>
        </div>
      ))}
    </div>
  );
}

export default function LocalProfileNewsSection({
  localProfileId,
  news = [],
}: LocalProfileNewsSectionProps): ReactNode {
  const { closePopup, isOpen, openPopup } = usePopup();
  const visibleNews = news.slice(0, VISIBLE_NEWS_COUNT);
  const hasMoreNews = news.length > VISIBLE_NEWS_COUNT;

  return (
    <>
      <LocalProfileDetailSection
        action={
          hasMoreNews && (
            <button
              className="local-profile-more"
              type="button"
              onClick={openPopup}
            >
              더보기
              <ChevronRightThinIcon />
            </button>
          )
        }
        title="소식"
      >
        <LocalProfileNewsList
          localProfileId={localProfileId}
          news={visibleNews}
        />
      </LocalProfileDetailSection>

      <LocalProfileNewsPopup
        isOpen={isOpen}
        localProfileId={localProfileId}
        news={news}
        onClose={closePopup}
      />
    </>
  );
}
