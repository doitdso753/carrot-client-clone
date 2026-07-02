import type { PropsWithChildren } from 'react';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-(--color-palette-gray-00) px-4 md:px-10 lg:px-16">
      {children}
    </div>
  );
}
