import { ProductGridSkeleton } from '@/components/ui/Skeleton';

export default function CollectionLoading() {
  return (
    <div className="min-h-screen bg-black pt-36 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <ProductGridSkeleton count={6} />
      </div>
    </div>
  );
}
