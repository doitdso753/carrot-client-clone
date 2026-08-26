import type { ReactNode } from 'react';
import { Link } from 'react-router';

type KeywordLinkListProps = {
  title: string;
  keywords: readonly string[];
  getKeywordPath?: (keyword: string) => string;
  hasBlurEffect?: boolean;
  variant?: 'default' | 'header';
};

export default function KeywordLinkList({
  title,
  keywords,
  getKeywordPath = () => '/',
  hasBlurEffect = true,
  variant = 'default',
}: KeywordLinkListProps): ReactNode {
  return (
    <div className={`keyword-link-list keyword-link-list--${variant}`}>
      <span className="keyword-link-list-title">{title}</span>
      <div className="relative min-w-0 flex-1">
        <div className="keyword-link-list-items scrollbar-hidden">
          {keywords.map((keyword) => (
            <Link
              className="keyword-link-list-link"
              key={keyword}
              to={getKeywordPath(keyword)}
            >
              {keyword}
            </Link>
          ))}
        </div>
        {hasBlurEffect && (
          <span className="list-blur-effect" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}
