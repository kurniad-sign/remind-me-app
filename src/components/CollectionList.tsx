import Image from 'next/image';
import { currentUser } from '@clerk/nextjs';

import { prisma } from '@/lib/prisma';

import { CollectionCard } from './CollectionCard';

export async function CollectionList() {
  const user = await currentUser();
  const collections = await prisma.collection.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      tasks: true,
    },
  });

  if (!collections.length) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="relative mb-4">
          <Image
            src="/images/empty-state.svg"
            alt="Empty state image"
            width={200}
            height={200}
          />
        </div>
        <div className="space-y-1 text-center">
          <h3 className="text-lg font-medium">Your collections is empty</h3>
          <p className="text-sm text-muted-foreground">Add task for today.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4 mt-6">
        {collections.map((collection) => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </>
  );
}
