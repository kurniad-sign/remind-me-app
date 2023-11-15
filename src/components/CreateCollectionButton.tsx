'use client';

import { useState } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';

import { SidebarCollectionSheet } from './SidebarCollectionSheet';
import { Button } from './ui/button';

export function CreateCollectionButton() {
  const [open, setOpen] = useState(false);

  const handleOpenChange = (open: boolean) => setOpen(open);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <PlusIcon fontSize={16} className="mr-2" />
        Create Collection
      </Button>
      <SidebarCollectionSheet open={open} onOpenChange={handleOpenChange} />
    </>
  );
}
