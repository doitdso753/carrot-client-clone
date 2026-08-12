import type { ReactNode } from 'react';
import { VerifiedDocumentIcon } from '@/assets/icons';
import LocalProfileDocumentPopup from '@/components/local-profile/popups/local-profile-document-popup.tsx';
import usePopup from '@/hooks/ui/use-popup.ts';
import type { LocalProfileItem } from '@/types/types.ts';

type LocalProfileIntroductionProps = {
  item: LocalProfileItem;
};

const formatCreatedAt = (createdAt: string): string =>
  new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
  }).format(new Date(createdAt));

export default function LocalProfileIntroduction({
  item,
}: LocalProfileIntroductionProps): ReactNode {
  const { closePopup, isOpen, openPopup } = usePopup();

  return (
    <>
      <section className="local-profile-detail-section">
        <div className="local-profile-detail-introduction-content">
          <div className="local-profile-detail-section-heading local-profile-detail-section-heading--with-thumbnail">
            <div>
              <h2>소개</h2>
              {item.createdAt && (
                <p className="local-profile-detail-section-caption">
                  생성일: {formatCreatedAt(item.createdAt)}
                </p>
              )}
            </div>

            <img
              className="local-profile-detail-thumbnail"
              src={item.thumbnail}
              alt={`${item.name} 업체 썸네일`}
            />
          </div>

          <div className="local-profile-detail-introduction-body">
            {item.documentLabel && (
              <button
                className="local-profile-detail-document"
                type="button"
                onClick={openPopup}
              >
                <VerifiedDocumentIcon />
                <span>{item.documentLabel}</span>
              </button>
            )}

            <p className="local-profile-detail-description">
              {item.description}
            </p>
          </div>
        </div>

      </section>

      <LocalProfileDocumentPopup
        documentGroups={item.documentGroups}
        isOpen={isOpen}
        onClose={closePopup}
      />
    </>
  );
}
