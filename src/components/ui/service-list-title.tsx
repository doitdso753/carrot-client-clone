import type { PropsWithChildren, ReactNode } from 'react';

export default function ServiceListTitle({
  children,
}: PropsWithChildren): ReactNode {
  return <h1 className="service-list-title">{children}</h1>;
}
