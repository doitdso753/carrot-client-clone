import type { PropsWithChildren } from 'react';

function RootLayout({ children }: PropsWithChildren) {
  return <main className="min-h-screen p-8">{children}</main>;
}

export default RootLayout;
