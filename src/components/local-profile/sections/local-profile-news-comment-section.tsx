import { useMemo, useState, type ReactNode } from 'react';
import { getElapsedTimeText } from '@/lib/date-utils.ts';
import { formatThousandsBySuffix } from '@/lib/utils.ts';
import type { LocalProfileNewsComment } from '@/types/local-profile';

type LocalProfileCommentSortType = 'registered' | 'latest';

const COMMENT_SORT_OPTIONS: {
  label: string;
  value: LocalProfileCommentSortType;
}[] = [
  { label: '등록순', value: 'registered' },
  { label: '최신순', value: 'latest' },
];

type LocalProfileNewsCommentSectionProps = {
  comments?: LocalProfileNewsComment[];
  fallbackCommentCount: number;
};

// 소식 댓글의 정렬 상태와 목록 표시를 관리합니다.
export default function LocalProfileNewsCommentSection({
  comments,
  fallbackCommentCount,
}: LocalProfileNewsCommentSectionProps): ReactNode {
  const [selectedCommentSortType, setSelectedCommentSortType] =
    useState<LocalProfileCommentSortType>('registered');
  const sortedComments = useMemo(() => {
    const commentItems = comments ?? [];

    return [...commentItems].sort((previousComment, nextComment) => {
      if (selectedCommentSortType === 'latest') {
        return (
          new Date(nextComment.createdAt).getTime() -
          new Date(previousComment.createdAt).getTime()
        );
      }

      return previousComment.id - nextComment.id;
    });
  }, [comments, selectedCommentSortType]);
  const commentCount = comments?.length ?? fallbackCommentCount;

  const handleCommentSortTypeClick = (
    sortType: LocalProfileCommentSortType,
  ): void => {
    setSelectedCommentSortType(sortType);
  };

  return (
    <section className="local-profile-comments">
      <div className="local-profile-comments-heading">
        <h2>댓글 {formatThousandsBySuffix(commentCount, '개')}개</h2>
        <div
          className="local-profile-comment-sort local-profile-comment-sort--inline"
          aria-label="댓글 정렬"
        >
          {COMMENT_SORT_OPTIONS.map(({ label, value }) => {
            const isSelected = selectedCommentSortType === value;

            return (
              <button
                className={`local-profile-comment-sort-button ${
                  isSelected
                    ? 'local-profile-comment-sort-button--selected'
                    : ''
                }`}
                type="button"
                aria-pressed={isSelected}
                key={value}
                onClick={() => handleCommentSortTypeClick(value)}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
      {sortedComments.length > 0 ? (
        <div className="local-profile-comment-list">
          {sortedComments.map((comment) => (
            <article className="local-profile-comment-item" key={comment.id}>
              <img
                src={comment.profileImageUrl}
                alt={`${comment.authorName} 프로필`}
              />
              <div className="local-profile-comment-content">
                <div className="local-profile-comment-profile">
                  <strong>{comment.authorName}</strong>
                  <span>{getElapsedTimeText(comment.createdAt)}</span>
                </div>
                <p>{comment.content}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p>등록된 댓글이 없어요.</p>
      )}
    </section>
  );
}
