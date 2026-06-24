import { Watch } from 'lucide-react';
import Button from '@/components/ui/Button';

interface EmptyStateProps {
  onClearFilters?: () => void;
}

export default function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-6">
        <Watch size={32} className="text-gold/60" />
      </div>
      <h3 className="font-display text-2xl text-white mb-3">No timepieces found</h3>
      <p className="text-white/50 text-sm max-w-md mb-8 leading-relaxed">
        We couldn&apos;t find any watches matching your criteria. Try adjusting your filters or explore our full collection.
      </p>
      {onClearFilters && (
        <Button variant="outline" onClick={onClearFilters}>
          Clear Filters
        </Button>
      )}
    </div>
  );
}
