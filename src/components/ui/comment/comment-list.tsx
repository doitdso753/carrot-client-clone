import type { ReactNode } from 'react';
import type { CommunityComment } from '@/types/community';
import CommentItem from './comment-item';

type CommentListProps = {
  comments: readonly CommunityComment[];
};

export default function CommentList({ comments }: CommentListProps): ReactNode {
  if (comments.length === 0) {
    return (
      <div className="comments-empty">
        <p>
          아직 댓글이 없어요 <br /> 가장 먼저 댓글을 남겨보세요.
        </p>
        <button type="button">댓글 쓰기</button>
      </div>
    );
  }

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentItem comment={comment} key={comment.id} />
      ))}
    </div>
  );
}
