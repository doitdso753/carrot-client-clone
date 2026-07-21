import type { ReactNode } from 'react';
import { VerifiedDocumentIcon } from '@/assets/icons';
import CommonPopup from '@/components/ui/common-popup.tsx';
import type { LocalProfileDocumentGroup } from '@/types/types.ts';

type LocalProfileDocumentPopupProps = {
  documentGroups?: LocalProfileDocumentGroup[];
  isOpen: boolean;
  onClose: () => void;
};

export default function LocalProfileDocumentPopup({
  documentGroups = [],
  isOpen,
  onClose,
}: LocalProfileDocumentPopupProps): ReactNode {
  return (
    <CommonPopup
      isOpen={isOpen}
      title="사업자등록증 및 기타 서류"
      variant="bottom-sheet"
      onClose={onClose}
    >
      <div className="local-profile-document-popup">
        {documentGroups.map((group) => (
          <section
            className="local-profile-document-popup-group"
            key={group.title}
          >
            <h3>
              <VerifiedDocumentIcon />
              {group.title}
            </h3>

            <dl className="local-profile-document-popup-list">
              {group.rows.map((row) => (
                <div
                  className="local-profile-document-popup-item"
                  key={`${group.title}-${row.label}`}
                >
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </CommonPopup>
  );
}
