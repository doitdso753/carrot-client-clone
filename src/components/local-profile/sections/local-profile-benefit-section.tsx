import type { ReactNode } from 'react';
import type { LocalProfileItem } from '@/types/local-profile';

type LocalProfileBenefitSectionProps = {
  benefitDescription: LocalProfileItem['benefitDescription'];
};

export default function LocalProfileBenefitSection({
  benefitDescription,
}: LocalProfileBenefitSectionProps): ReactNode {
  if (!benefitDescription) {
    return null;
  }

  return (
    <section className="local-profile-detail-benefit">
      <strong>단골혜택</strong>
      <p>{benefitDescription}</p>
    </section>
  );
}
