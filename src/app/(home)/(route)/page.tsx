import { Suspense } from 'react';
import { format } from 'date-fns';

import { CollectionList } from '@/components/CollectionList';
import { CreateCollectionButton } from '@/components/CreateCollectionButton';

export default function Home() {
  return (
    <>
      <HeaderCollection />
      <Suspense fallback={<div>Loading ...</div>}>
        <CollectionList />
      </Suspense>
    </>
  );
}
function HeaderCollection() {
  return (
    <header className="flex items-end justify-between my-12">
      <h1 className="text-2xl font-semibold">
        Today{' '}
        <span className="text-sm font-normal text-muted-foreground">
          {format(new Date(), 'E d MMM')}
        </span>
      </h1>
      <CreateCollectionButton />
    </header>
  );
}
