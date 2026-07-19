import type { ReactNode } from 'react';
import { CheckedIcon, CloseIcon } from '@/assets/icons';

type CommonToastProps = {
  message: string;
  onClose: () => void;
};

export default function CommonToast({
  message,
  onClose,
}: CommonToastProps): ReactNode {
  return (
    <div className="common-toast-wrapper">
      <div className="common-toast" role="status" aria-live="polite">
        <span className="common-toast-content">
          <CheckedIcon />
          {message}
        </span>
        <button
          className="common-toast-close"
          type="button"
          aria-label="안내 메시지 닫기"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}
