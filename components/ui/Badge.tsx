import { cn } from '@/lib/utils';

type BadgeVariant = 'new' | 'bestseller' | 'limited' | 'stock' | 'preorder';

interface BadgeProps {
  variant: BadgeVariant;
  className?: string;
}

const styles: Record<BadgeVariant, string> = {
  new: 'bg-gold/20 text-gold border-gold/30',
  bestseller: 'bg-gold/15 text-gold-light border-gold/25',
  limited: 'bg-amber-900/30 text-gold border-gold/20',
  stock: 'bg-emerald-900/30 text-emerald-400 border-emerald-500/20',
  preorder: 'bg-blue-900/30 text-blue-400 border-blue-500/20',
};

const labels: Record<BadgeVariant, string> = {
  new: 'New',
  bestseller: 'Bestseller',
  limited: 'Limited Edition',
  stock: 'In Stock',
  preorder: 'Pre-Order',
};

export default function Badge({ variant, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest rounded-full border backdrop-blur-sm',
        styles[variant],
        className
      )}
    >
      {labels[variant]}
    </span>
  );
}
