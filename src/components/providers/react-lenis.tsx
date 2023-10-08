'use client';

import { ReactLenis } from '@studio-freight/react-lenis';

export function ReactLenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{ duration: 1.5, smoothWheel: true, touchMultplier: 2 }}
    >
      {children}
    </ReactLenis>
  );
}
