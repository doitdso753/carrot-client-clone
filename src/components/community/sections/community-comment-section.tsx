import { useState, type ReactNode } from 'react';
import { CommentTextIcon, ThumbUpIcon } from '@/assets/icons';
import defaultProfileImage from '@/assets/images/default-profile.png';
import { getElapsedTimeText } from '@/lib/utils.ts';
import type { CommunityComment } from '@/types/types.ts';

type CommunityCommentSortType = 'latest' | 'registered';

const COMMENT_SORT_OPTIONS: readonly {
  label: string;
  value: CommunityCommentSortType;
}[] = [
  { label: '등록순', value: 'registered' },
  { label: '최신순', value: 'latest' },
];

type CommunityCommentItemProps = {
  comment: CommunityComment;
};

type CommunityCommentSectionProps = {
  comments: readonly CommunityComment[];
};

function CommunityCommentItem({
  comment,
}: CommunityCommentItemProps): ReactNode {
  return (
    <article className="community-comment-item">
      <header className="community-comment-profile">
        <img
          alt={`${comment.nickname} 프로필`}
          src={comment.profileImageUrl ?? defaultProfileImage}
        />
        <div>
          <strong>{comment.nickname}</strong>
          <p>
            <span>{comment.location}</span>
            <span aria-hidden="true">·</span>
            <span>{getElapsedTimeText(comment.createdAt)}</span>
          </p>
        </div>
      </header>

      <div className="community-comment-body">
        <p>{comment.content}</p>
        <div className="community-comment-counts">
          <span>
            <ThumbUpIcon />
            {comment.likeCount}
          </span>
          {comment.replyCount > 0 && (
            <span>
              <CommentTextIcon />
              {comment.replyCount}
            </span>
          )}
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="community-comment-replies">
          {comment.replies.map((reply) => (
            <CommunityCommentItem comment={reply} key={reply.id} />
          ))}
        </div>
      )}
    </article>
  );
}

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
    <section className="community-comments" aria-label="댓글 목록">
      <div className="community-comments-sort" aria-label="댓글 정렬">
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

      {sortedComments.length > 0 ? (
        <div className="community-comment-list">
          {sortedComments.map((comment) => (
            <CommunityCommentItem comment={comment} key={comment.id} />
          ))}
        </div>
      ) : (
        <div className="community-comments-empty">
          <p>
            아직 댓글이 없어요 <br /> 가장 먼저 댓글을 남겨보세요.
          </p>
          <button type="button">댓글 쓰기</button>
        </div>
      )}
    </section>
  );
}
