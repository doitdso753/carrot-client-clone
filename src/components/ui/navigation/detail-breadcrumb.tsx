import type { ReactNode } from 'react';
import { Link } from 'react-router';

type DetailBreadcrumbItem = {
  label: string;
  to?: string;
};

type DetailBreadcrumbProps = {
  isMobileVisible?: boolean;
  items: DetailBreadcrumbItem[];
};

export default function DetailBreadcrumb({
  isMobileVisible = false,
  items,
}: DetailBreadcrumbProps): ReactNode {
  return (
    <nav
      className={
        isMobileVisible
          ? 'detail-breadcrumb detail-breadcrumb--mobile-visible'
          : 'detail-breadcrumb'
      }
      aria-label="현재 위치"
    >
      {items.map((item, index) => {
        const isCurrentPage = index === items.length - 1;

        return (
          <span
            className="detail-breadcrumb-item"
            key={`${item.label}-${index}`}
          >
            {index > 0 && (
              <span className="detail-breadcrumb-separator" aria-hidden="true">
                ›
              </span>
            )}
            {item.to && !isCurrentPage ? (
              <Link to={item.to}>{item.label}</Link>
            ) : (
              <span aria-current={isCurrentPage ? 'page' : undefined}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
