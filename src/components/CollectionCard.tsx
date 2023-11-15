'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Collection, Task } from '@prisma/client';
import {
  CaretDownIcon,
  CaretUpIcon,
  PlusIcon,
  TrashIcon,
} from '@radix-ui/react-icons';

import { CollectionColor, CollectionColors } from '@/lib/constants';
import { cn } from '@/lib/utils';

import { deleteCollection } from '../../actions/collections';
import { CreateTaskDialog } from './CreateTaskDialog';
import { TaskCard } from './TaskCard';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { toast } from './ui/use-toast';

interface CollectionCardProps {
  collection: Collection & {
    tasks: Task[];
  };
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { tasks } = collection;

  const removeCollection = async () => {
    try {
      await deleteCollection(collection.id);
      toast({
        title: 'Success',
        description: 'Collection deleted successfully.',
      });
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Cannot delete collection.',
        variant: 'destructive',
      });
    }
  };

  const totalTasks = collection.tasks.length;

  const tasksDone = useMemo(() => {
    return collection.tasks.filter((task) => task.done).length;
  }, [collection.tasks]);

  const progress = totalTasks === 0 ? 0 : (tasksDone / totalTasks) * 100;

  return (
    <>
      <CreateTaskDialog
        open={showCreateModal}
        setOpen={setShowCreateModal}
        collection={collection}
      />

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant={'ghost'}
            className={cn(
              'flex w-full justify-between p-6',
              isOpen && 'rounded-b-none',
              CollectionColors[collection.color as CollectionColor]
            )}
          >
            <span className="text-white font-bold">{collection.name}</span>
            {!isOpen ? (
              <CaretDownIcon className="h-6 w-6" />
            ) : (
              <CaretUpIcon className="h-6 w-6" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="flex flex-col rounded-b-md dark:bg-zinc-800 shadow-lg">
          {!tasks.length && (
            <Button
              variant={'ghost'}
              className="flex items-center justify-center gap-1 p-8 py-12 rounded-none"
              onClick={() => setShowCreateModal(true)}
            >
              <p>There are no task yet:</p>
              <span>Create one</span>
            </Button>
          )}
          {tasks.length > 0 && (
            <>
              <Progress className="rounded-none" value={progress} />
              <div className="p-4 gap-3 flex flex-col">
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </>
          )}
          <Separator />
          <footer className="h-[40px] px-4 p-[2px] text-xs text-zinc-500 flex justify-between items-center">
            <p>Created at {collection.createdAt.toLocaleDateString('en-US')}</p>
            {isLoading && <div>Deleting...</div>}
            {!isLoading && (
              <div>
                <Button
                  size={'icon'}
                  variant={'ghost'}
                  onClick={() => setShowCreateModal(true)}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size={'icon'} variant={'ghost'}>
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogTitle>
                      Are you absolutely sure ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your collection and all tasks inside it.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive hover:bg-destructive-hover"
                        onClick={() => startTransition(removeCollection)}
                      >
                        Proceed
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </footer>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}
