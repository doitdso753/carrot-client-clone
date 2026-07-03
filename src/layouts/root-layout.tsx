import type { PropsWithChildren } from 'react';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-(--color-palette-gray-00)">
      {children}
    </div>
  );
}
