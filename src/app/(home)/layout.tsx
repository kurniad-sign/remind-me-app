import React from 'react';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';

import { Navbar } from '@/components/Navbar';

export default async function RouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) redirect('/sign-in');

  return (
    <>
      <Navbar />
      <main className="flex-auto max-w-[800px] w-full mx-auto">{children}</main>
    </>
  );
}
