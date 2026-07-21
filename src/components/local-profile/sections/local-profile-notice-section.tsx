import type { ReactNode } from 'react';
import LocalProfileDetailSection from './local-profile-detail-section.tsx';

type LocalProfileNoticeSectionProps = {
  notice?: string;
};

export default function LocalProfileNoticeSection({
  notice,
}: LocalProfileNoticeSectionProps): ReactNode {
  return (
    <LocalProfileDetailSection title="공지">
      {notice && <p className="local-profile-detail-notice">{notice}</p>}
    </LocalProfileDetailSection>
  );
}
