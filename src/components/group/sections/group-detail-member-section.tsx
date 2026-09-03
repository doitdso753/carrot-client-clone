import type { ReactNode } from 'react';
import { CrownIcon } from '@/assets/icons';
import { formatThousandsBySuffix } from '@/lib/utils.ts';
import type { GroupItem, GroupMember, GroupMemberRole } from '@/types/group';
import GroupDetailSection from '../group-detail-section.tsx';

type GroupDetailMemberSectionProps = {
  item: GroupItem;
};

type GroupMemberItemProps = {
  member: GroupMember;
};

const GROUP_ROLE_ICON_COLOR: Partial<Record<GroupMemberRole, string>> = {
  MANAGER: 'var(--color-group-role-manager)',
  SUPER_HOST: 'var(--color-group-role-super-host)',
};

const GROUP_ROLE_ICON_LABEL: Partial<Record<GroupMemberRole, string>> = {
  MANAGER: '운영진',
  SUPER_HOST: '모임장',
};

function GroupMemberItem({ member }: GroupMemberItemProps): ReactNode {
  const roleIconColor = GROUP_ROLE_ICON_COLOR[member.role];
  const roleIconLabel = GROUP_ROLE_ICON_LABEL[member.role];

  return (
    <li className="group-detail-member-item">
      <img src={member.profileImageUrl} alt="" />
      <div className="group-detail-member-text">
        <div className="group-detail-member-name-row">
          <span>{member.name}</span>
          {roleIconColor && (
            <CrownIcon aria-label={roleIconLabel} color={roleIconColor} />
          )}
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
