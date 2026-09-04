import type { ReactNode } from 'react';

type OpenAppCtaButtonProps = {
  children?: ReactNode;
  childrenPosition?: 'left' | 'right';
};

export default function OpenAppCtaButton({
  children,
  childrenPosition = 'right',
}: OpenAppCtaButtonProps): ReactNode {
  return (
    <div className="open-app-cta-wrapper">
      {childrenPosition === 'left' && children}
      <a
        className="open-app-cta-button"
        href={import.meta.env.APP_URL}
        target="_blank"
        rel="noreferrer"
      >
        당근 앱에서 보기
      </a>
      {childrenPosition === 'right' && children}
    </div>
  );
}
