import type { ReactNode } from 'react';
import LocalProfileNewsCommentSection from '@/components/local-profile/sections/local-profile-news-comment-section.tsx';
import { Link, useParams } from 'react-router';
import DetailBreadcrumb from '@/components/ui/navigation/detail-breadcrumb.tsx';
import OpenAppCtaButton from '@/components/ui/open-app-cta-button.tsx';
import ImageSlider from '@/components/ui/image/image-slider.tsx';
import HeaderWithSearch from '@/layouts/header-with-search/header-with-search.tsx';
import RootLayout from '@/layouts/root-layout.tsx';
import { formatThousandsBySuffix } from '@/lib/utils.ts';
import { LOCAL_PROFILE_ITEMS } from '@/types/local-profile';

export default function LocalProfileNewsDetailPage(): ReactNode {
  const { itemId, newsId } = useParams();
  const item = LOCAL_PROFILE_ITEMS.find(({ id }) => id === Number(itemId));
  const news = item?.news?.find(({ id }) => id === Number(newsId));
  return (
    <RootLayout>
      <div className="flex min-h-screen flex-col">
        <HeaderWithSearch activeCategoryCode="localProfile" />
        {item && news ? (
          <main className="detail-page-wrapper local-profile-news-detail-page">
            <DetailBreadcrumb
              items={[
                { label: '홈', to: '/' },
                { label: '동네업체', to: '/local-profile' },
                { label: item.name, to: `/local-profile/${item.id}` },
                { label: news.title },
              ]}
            />

            <div className="detail-page-layout local-profile-news-detail-layout">
              <section
                className="local-profile-news-detail-media"
                aria-label="소식 이미지와 업체 정보"
              >
                <ImageSlider imageUrls={[news.imageUrl]} title={news.title} />

                <div className="local-profile-news-detail-store">
                  <img src={item.thumbnail} alt={`${item.name} 썸네일`} />
                  <div>
                    <p>{item.name}</p>
                    <span>
                      {item.regionText} · {item.category}
                    </span>
                  </div>
                </div>
              </section>

              <section className="local-profile-news-detail-information">
                <div className="local-profile-news-detail-heading">
                  <h1>{news.title}</h1>
                  <p>
                    {item.category} · {news.createdAtText}
                  </p>
                </div>

                <div className="local-profile-news-detail-description">
                  <p className="whitespace-pre-line">{news.content}</p>
                  <p className="local-profile-news-detail-status">
                    문의 {formatThousandsBySuffix(news.inquiryCount, '')} · 관심{' '}
                    {formatThousandsBySuffix(news.favoriteCount, '')} · 조회{' '}
                    {formatThousandsBySuffix(news.viewCount, '')}
                  </p>
                </div>

                {item.benefitDescription && (
                  <div className="local-profile-news-detail-benefit">
                    <span className="local-profile-news-detail-tip">Tip</span>
                    <p>
                      <strong>{item.benefitTitle ?? '단골혜택'}</strong>
                      {item.benefitDescription}
                    </p>
                  </div>
                )}

                {item.benefitDescription && item.storeInfo?.mapImageUrl && (
                  <hr className="local-profile-news-detail-divider" />
                )}

                {item.storeInfo?.mapImageUrl && (
                  <div className="local-profile-news-detail-map">
                    <div className="local-profile-news-detail-map-profile">
                      <img src={item.thumbnail} alt={`${item.name} 썸네일`} />
                      <div>
                        <strong>{item.name}</strong>
                        <span>{item.location}</span>
                      </div>
                    </div>
                    <img
                      src={item.storeInfo.mapImageUrl}
                      alt={`${item.name} 지도`}
                    />
                  </div>
                )}

                <OpenAppCtaButton />
              </section>
            </div>

            <LocalProfileNewsCommentSection
              comments={news.comments}
              fallbackCommentCount={news.commentCount}
            />
          </main>
        ) : (
          <main className="detail-page-wrapper flex flex-col items-center gap-6">
            <h1 className="text-2xl font-bold">소식을 찾을 수 없습니다.</h1>
            <Link
              className="text-base text-(--color-palette-gray-700) underline"
              to={item ? `/local-profile/${item.id}` : '/local-profile'}
            >
              동네업체로 돌아가기
            </Link>
          </main>
        )}
      </div>
    </RootLayout>
  );
}
