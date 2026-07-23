import type { ReactNode } from 'react';

type LocalProfileDetailSectionProps = {
  action?: ReactNode;
  caption?: ReactNode;
  children?: ReactNode;
  id?: string;
  title: string;
};

export default function LocalProfileDetailSection({
  action,
  caption,
  children,
  id,
  title,
}: LocalProfileDetailSectionProps): ReactNode {
  return (
    <section className="local-profile-detail-section" id={id}>
      <div className="local-profile-detail-section-heading">
        <div className="local-profile-detail-section-heading-row">
          <h2>{title}</h2>
          {action}
        </div>
        {caption && (
          <p className="local-profile-detail-section-caption">{caption}</p>
        )}
      </div>
      {children}
    </section>
  );
}
