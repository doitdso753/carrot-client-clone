import type { ReactNode } from 'react';
import { CommentTextIcon, ThumbUpIcon } from '@/assets/icons';
import defaultProfileImage from '@/assets/images/default-profile.png';
import { getElapsedTimeText } from '@/lib/date-utils.ts';
import type { GroupPostCommentItem } from '@/types/group';

type GroupBoardCommentItemProps = {
  comment: GroupPostCommentItem;
};

type GroupBoardCommentSectionProps = {
  comments: readonly GroupPostCommentItem[];
};

function GroupBoardCommentItem({
  comment,
}: GroupBoardCommentItemProps): ReactNode {
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
            <GroupBoardCommentItem comment={reply} key={reply.id} />
          ))}
        </div>
      )}
    </article>
  );
}

export default function GroupBoardCommentSection({
  comments,
}: GroupBoardCommentSectionProps): ReactNode {
  return (
    <section className="community-comments" aria-label="댓글 목록">
      {/* 댓글 입력 */}
      <form className="group-board-comment-form" aria-label="댓글 입력">
        <img alt="" src={defaultProfileImage} />
        <input type="text" placeholder="댓글을 입력해 주세요." />
      </form>

      {comments.length > 0 ? (
        <div className="community-comment-list">
          {comments.map((comment) => (
            <GroupBoardCommentItem comment={comment} key={comment.id} />
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
