'use client';

import { NextUIProvider as UIProvider } from '@nextui-org/react';

export function NextUIProviders({ children }: { children: React.ReactNode }) {
  return <UIProvider>{children}</UIProvider>;
}
