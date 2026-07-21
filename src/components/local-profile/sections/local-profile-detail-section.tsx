import type { ReactNode } from 'react';

type LocalProfileDetailSectionProps = {
  caption?: ReactNode;
  children?: ReactNode;
  id?: string;
  title: string;
};

export default function LocalProfileDetailSection({
  caption,
  children,
  id,
  title,
}: LocalProfileDetailSectionProps): ReactNode {
  return (
    <section className="local-profile-detail-section" id={id}>
      <div className="local-profile-detail-section-heading">
        <h2>{title}</h2>
        {caption && (
          <p className="local-profile-detail-section-caption">{caption}</p>
        )}
      </div>
      {children}
    </section>
  );
}
