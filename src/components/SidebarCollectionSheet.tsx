import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';

import { CollectionColor, CollectionColors } from '@/lib/constants';
import { cn } from '@/lib/utils';

import { createCollection } from '../../actions/collections';
import {
  createCollectionSchema,
  createCollectionSchemaType,
} from '../../schema/create-collection';
import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';
import { toast } from './ui/use-toast';

interface SidebarCollectionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SidebarCollectionSheet({
  onOpenChange,
  open,
}: SidebarCollectionSheetProps) {
  const router = useRouter();

  const form = useForm<createCollectionSchemaType>({
    defaultValues: {},
    resolver: zodResolver(createCollectionSchema),
  });

  const openChangeWrapper = (open: boolean) => {
    form.reset();
    onOpenChange(open);
  };

  const onSubmit = async (data: createCollectionSchemaType) => {
    try {
      await createCollection(data);
      openChangeWrapper(false);
      router.refresh();
      toast({
        title: 'Success',
        description: 'Collection created successfully',
      });
    } catch (error) {
      // Show toast
      toast({
        title: 'Error',
        description: 'Something when wrong. Please try again later',
        variant: 'destructive',
      });
      console.log('Error while creating collection', error);
    }
  };

  return (
    <Sheet open={open} onOpenChange={openChangeWrapper}>
      <SheetContent>
        <SheetHeader className="space-y-0">
          <SheetTitle>Add new Collection</SheetTitle>
          <SheetDescription>
            Collections are a way to group your tasks.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 flex flex-col py-8"
          >
            <FormField
              control={form.control}
              name={'name'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Personal" {...field} />
                  </FormControl>
                  <FormDescription>Collection name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'color'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Select onValueChange={(color) => field.onChange(color)}>
                      <SelectTrigger
                        className={cn(
                          'w-full h-8',
                          CollectionColors[field.value as CollectionColor]
                        )}
                      >
                        <SelectValue
                          placeholder="color"
                          className="w-full h-8"
                        />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {Object.keys(CollectionColors).map((color) => (
                          <SelectItem
                            key={color}
                            value={color}
                            className={cn(
                              'w-full h-8 rounded-md my-1 text-white focus:text-white focus:font-bold focus:ring-2 ring-zinc-600 focus:ring-inset dark:focus:ring-white focus:px-8',
                              CollectionColors[color as CollectionColor]
                            )}
                          >
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Select a color for your collection
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <SheetFooter className="flex-col mt-4">
          <Button
            disabled={form.formState.isSubmitting}
            variant={'outline'}
            className={cn(
              'hover:text-white',
              form.watch('color') &&
                CollectionColors[form.getValues('color') as CollectionColor]
            )}
            onClick={form.handleSubmit(onSubmit)}
          >
            {form.formState.isSubmitting && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            Confirm
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
