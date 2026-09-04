import type { ReactNode } from 'react';
import defaultProfileImage from '@/assets/images/default-profile.png';
import WarmthBadge from '@/components/ui/user-profile/warmth-badge.tsx';
import type { UserProfile } from '@/types/user-profile.ts';

type UserProfileSummaryProps = {
  hasWarmthBadge?: boolean;
  metadata?: string[];
  user: UserProfile;
};

export default function UserProfileSummary({
  hasWarmthBadge = true,
  metadata = [],
  user,
}: UserProfileSummaryProps): ReactNode {
  const profileImageUrl = user.profileImageUrl ?? defaultProfileImage;
  const metadataText = metadata.filter(Boolean).join(' · ');

  return (
    <div className="user-profile-summary">
      <div className="user-profile-summary-information">
        <img
          className="user-profile-summary-avatar"
          src={profileImageUrl}
          alt={`${user.nickname} 프로필`}
        />
        <div>
          <div className="user-profile-summary-name-row">
            <p className="user-profile-summary-name">{user.nickname}</p>
            {hasWarmthBadge && <WarmthBadge value={user.warmth} />}
          </div>
          <p className="user-profile-summary-metadata">{metadataText}</p>
        </div>
      </div>
    </div>
  );
}
