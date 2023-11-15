import { UserButton } from '@clerk/nextjs';

import { Logo } from './Logo';

export function Navbar() {
  return (
    <nav className="flex w-full items-center justify-between p-4 px-8 h-[60px] border-b">
      <Logo />
      <div className="flex items-center gap-4">
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
}
