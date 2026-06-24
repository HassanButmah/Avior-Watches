import { Skeleton } from '@/components/ui/Skeleton';

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-black pt-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        <Skeleton className="aspect-square w-full rounded-lg" />
        <div className="space-y-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}
