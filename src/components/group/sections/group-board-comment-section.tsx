import type { ReactNode } from 'react';
import CommentList from '@/components/ui/comment/comment-list';
import defaultProfileImage from '@/assets/images/default-profile.png';
import type { GroupPostCommentItem } from '@/types/group';

type GroupBoardCommentSectionProps = {
  comments: readonly GroupPostCommentItem[];
};

export default function GroupBoardCommentSection({
  comments,
}: GroupBoardCommentSectionProps): ReactNode {
  return (
    <section className="comments" aria-label="댓글 목록">
      {/* 댓글 입력 */}
      <form className="comment-form" aria-label="댓글 입력">
        <img alt="" src={defaultProfileImage} />
        <input type="text" placeholder="댓글을 입력해 주세요." />
      </form>

      <CommentList comments={comments} />
    </section>
  );
}
