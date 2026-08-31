import type { ReactNode, SVGProps } from 'react';
import { GroupHostIcon } from './group-host-icon.tsx';

export function GroupManagerIcon(props: SVGProps<SVGSVGElement>): ReactNode {
  return <GroupHostIcon aria-label="운영진" {...props} />;
}
