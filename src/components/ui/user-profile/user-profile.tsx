import type { ReactNode } from 'react';
import defaultProfileImage from '@/assets/images/default-profile.png';
import Warmth from '@/components/ui/user-profile/warmth.tsx';
import type { UserProfile as UserProfileType } from '@/types/types';

type UserProfileProps = {
  user: UserProfileType;
};

export default function UserProfile({ user }: UserProfileProps): ReactNode {
  return (
    <div className="user-profile">
      <div className="user-profile-information">
        <img
          className="user-profile-avatar"
          src={defaultProfileImage}
          alt=""
          aria-hidden="true"
        />
        <div>
          <p className="user-profile-nickname">{user.nickname}</p>
          <p className="user-profile-location">{user.location}</p>
        </div>
      </div>
      <Warmth value={user.warmth} />
    </div>
  );
}
