import type { ReactNode } from 'react';
import { CommentTextIcon, ThumbUpIcon } from '@/assets/icons';
import defaultProfileImage from '@/assets/images/default-profile.png';
import { getElapsedTimeText } from '@/lib/date-utils.ts';
import type { CommunityComment } from '@/types/community';

type CommentItemProps = {
  comment: CommunityComment;
};

export default function CommentItem({ comment }: CommentItemProps): ReactNode {
  return (
    <article className="comment-item">
      <header className="comment-profile">
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

      <div className="comment-body">
        <p>{comment.content}</p>
        <div className="comment-counts">
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
        <div className="comment-replies">
          {comment.replies.map((reply) => (
            <CommentItem comment={reply} key={reply.id} />
          ))}
        </div>
      )}
    </article>
  );
}
