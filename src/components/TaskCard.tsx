import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Task } from '@prisma/client';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';

import { setTaskDone } from '../../actions/tasks';
import { Checkbox } from './ui/checkbox';

interface TaskCardProps {
  task: Task;
}

function getExpirationColor(expiresAt: Date) {
  const days = Math.floor((expiresAt.getTime() - Date.now()) / 1000 / 60 / 60);

  if (days < 0) return 'text-gray-500 dark:text-gray-300';
  if (days <= 3 * 24) return 'text-rose-500 dark:text-rose-400';
  if (days <= 7 * 24) return 'text-orange-500 dark:text-orange-400';

  return 'text-green-500 dark:text-green-400';
}

export function TaskCard({ task }: TaskCardProps) {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  return (
    <div className="flex gap-2 items-center">
      <Checkbox
        id={task.id.toString()}
        className="w-5 h-5"
        checked={task.done}
        disabled={task.done || isLoading}
        onCheckedChange={() => {
          startTransition(async () => {
            await setTaskDone(task.id);
            router.refresh();
          });
        }}
      />
      <label
        htmlFor={task.id.toString()}
        className={cn(
          'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 decoration-1 dark:decoration-white',
          task.done && 'line-through'
        )}
      >
        {task.content}
        {task.expiresAt && (
          <p
            className={cn(
              'text-xs text-zinc-500 dark:text-zinc-400',
              getExpirationColor(task.expiresAt)
            )}
          >
            {format(task.expiresAt, 'dd/MM/yyyy')}
          </p>
        )}
      </label>
    </div>
  );
}
