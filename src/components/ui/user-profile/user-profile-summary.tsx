import type { ReactNode } from 'react';
import defaultProfileImage from '@/assets/images/default-profile.png';
import WarmthBadge from '@/components/ui/user-profile/warmth-badge.tsx';

type UserProfileSummaryData = {
  description: string;
  name: string;
  profileImageUrl?: string;
  warmth?: number;
};

type UserProfileSummaryProps = {
  user: UserProfileSummaryData;
};

export default function UserProfileSummary({
  user,
}: UserProfileSummaryProps): ReactNode {
  const profileImageUrl = user.profileImageUrl ?? defaultProfileImage;

  return (
    <div className="user-profile-summary">
      <div className="user-profile-summary-information">
        <img
          className="user-profile-summary-avatar"
          src={profileImageUrl}
          alt={`${user.name} 프로필`}
        />
        <div>
          <div className="user-profile-summary-name-row">
            <p className="user-profile-summary-name">{user.name}</p>
            {user.warmth !== undefined && <WarmthBadge value={user.warmth} />}
          </div>
          <p className="user-profile-summary-description">{user.description}</p>
        </div>
      </div>
    </div>
  );
}
