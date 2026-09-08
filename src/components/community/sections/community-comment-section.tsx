import { useState, type ReactNode } from 'react';
import CommentList from '@/components/ui/comment/comment-list';
import type { CommunityComment } from '@/types/community';

type CommunityCommentSortType = 'latest' | 'registered';

const COMMENT_SORT_OPTIONS: readonly {
  label: string;
  value: CommunityCommentSortType;
}[] = [
  { label: '등록순', value: 'registered' },
  { label: '최신순', value: 'latest' },
];

type CommunityCommentSectionProps = {
  comments: readonly CommunityComment[];
};

export default function CommunityCommentSection({
  comments,
}: CommunityCommentSectionProps): ReactNode {
  const [selectedSortType, setSelectedSortType] =
    useState<CommunityCommentSortType>('registered');
  const sortedComments =
    selectedSortType === 'latest'
      ? [...comments].sort(
          (previousComment, nextComment) => nextComment.id - previousComment.id,
        )
      : comments;

  return (
    <section className="comments" aria-label="댓글 목록">
      <div className="comments-sort" aria-label="댓글 정렬">
        {COMMENT_SORT_OPTIONS.map(({ label, value }) => {
          const isSelected = selectedSortType === value;

          return (
            <button
              aria-pressed={isSelected}
              className={isSelected ? 'is-selected' : ''}
              key={value}
              type="button"
              onClick={() => setSelectedSortType(value)}
            >
              {label}
            </button>
          );
        })}
      </div>

      <CommentList comments={sortedComments} />
    </section>
  );
}
