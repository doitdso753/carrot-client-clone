import type { ReactNode } from 'react';
import { LogoIcon } from '@/assets/icons';

function Header(): ReactNode {
  return (
    <header className="flex items-center justify-between">
      <a className="flex items-center gap-3" href="/" aria-label="당근 홈">
        <LogoIcon />
      </a>
    </header>
  );
}

export default Header;
