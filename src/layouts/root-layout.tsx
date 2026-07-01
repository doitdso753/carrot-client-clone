import type { PropsWithChildren } from 'react';

function RootLayout({ children }: PropsWithChildren) {
  return (
    <main className="min-h-screen bg-(--color-palette-gray-00) px-4 md:px-10 lg:px-16">
      {children}
    </main>
  );
}

export default RootLayout;
