import type { ReactNode } from 'react';
import { GroupHostIcon, GroupManagerIcon } from '@/assets/icons';
import { formatThousandsBySuffix } from '@/lib/utils.ts';
import type { GroupItem, GroupMember, GroupMemberRole } from '@/types/group';
import GroupDetailSection from '../group-detail-section.tsx';

type GroupDetailMemberSectionProps = {
  item: GroupItem;
};

type GroupMemberItemProps = {
  member: GroupMember;
};

function getGroupMemberRoleIcon(role: GroupMemberRole): ReactNode {
  if (role === 'SUPER_HOST') {
    return <GroupHostIcon />;
  }

  if (role === 'MANAGER') {
    return <GroupManagerIcon />;
  }

  return null;
}

function GroupMemberItem({ member }: GroupMemberItemProps): ReactNode {
  const roleIcon = getGroupMemberRoleIcon(member.role);

  return (
    <li className="group-detail-member-item">
      <img src={member.profileImageUrl} alt="" />
      <div className="group-detail-member-text">
        <div className="group-detail-member-name-row">
          <span>{member.name}</span>
          {roleIcon}
        </div>
        <p>
          <span>{member.location}</span>
          {member.introduction && (
            <span className="group-detail-member-introduction">
              {member.introduction}
            </span>
          )}
        </p>
      </div>
    </li>
  );
}

export default function GroupDetailMemberSection({
  item,
}: GroupDetailMemberSectionProps): ReactNode {
  return (
    <GroupDetailSection
      title={`멤버 ${formatThousandsBySuffix(item.memberCount, '')}`}
    >
      <ul className="group-detail-member-list">
        {item.members.map((member) => (
          <GroupMemberItem key={member.id} member={member} />
        ))}
      </ul>
    </GroupDetailSection>
  );
}
