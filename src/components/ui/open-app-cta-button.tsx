import type { ReactNode } from 'react';

export default function OpenAppCtaButton(): ReactNode {
  return (
    <a
      className="open-app-cta-button"
      href={import.meta.env.APP_URL}
      target="_blank"
      rel="noreferrer"
    >
      당근 앱에서 보기
    </a>
  );
}
