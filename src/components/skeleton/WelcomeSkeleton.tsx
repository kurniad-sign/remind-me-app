import { Skeleton } from '../ui/skeleton';

export function WelcomeSkeleton() {
  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-semibold space-y-2">
        <Skeleton className="w-[150px] h-[36px]" />
        <Skeleton className="w-[150px] h-[36px]" />
      </h1>
    </div>
  );
}
