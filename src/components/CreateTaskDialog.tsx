'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Collection } from '@prisma/client';
import { CalendarIcon, ReloadIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';

import { CollectionColor, CollectionColors } from '@/lib/constants';
import { cn } from '@/lib/utils';

import { createTask } from '../../actions/tasks';
import {
  createTaskSchema,
  CreateTaskSchemaType,
} from '../../schema/create-task';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Textarea } from './ui/textarea';
import { toast } from './ui/use-toast';

interface CreateTaskDialogProps {
  open: boolean;
  collection: Collection;
  setOpen: (open: boolean) => void;
}

export function CreateTaskDialog({
  collection,
  open,
  setOpen,
}: CreateTaskDialogProps) {
  const router = useRouter();
  const form = useForm<CreateTaskSchemaType>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      collectionId: collection.id,
    },
  });

  const onChangeWrapper = (open: boolean) => {
    setOpen(open);
    form.reset();
  };

  const onSubmit = async (data: CreateTaskSchemaType) => {
    try {
      await createTask(data);
      toast({
        title: 'Success',
        description: 'Task created successfully',
      });
      onChangeWrapper(false);
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Cannot create task',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onChangeWrapper}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex gap-2">
            Add task to collection:
            <span>{collection.name}</span>
          </DialogTitle>
          <DialogDescription>
            Add a task to your collection. You can add as many tasks as you want
            to a collection.
          </DialogDescription>
        </DialogHeader>
        <div className="gap-4 py-4">
          <Form {...form}>
            <form
              className="space-y-4 flex flex-col"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name={'content'}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        placeholder="Task content here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="expiredAt"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expires at</FormLabel>
                    <FormDescription>
                      When should this task expire
                    </FormDescription>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'justify-start text-left font-normal w-full',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value && format(field.value, 'PPP')}
                            {!field.value && <span>No Expiration</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            {...field}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button
            disabled={form.formState.isSubmitting}
            onClick={form.handleSubmit(onSubmit)}
            className={cn(
              'w-full dark:text-white text-white',
              CollectionColors[collection.color as CollectionColor]
            )}
          >
            Confirm
            {form.formState.isSubmitting && (
              <ReloadIcon className="animate-spin h-4 w-4 ml-2" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
