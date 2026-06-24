import { cn } from '@/lib/utils';
import { forwardRef, type ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-gold to-gold-light text-black font-semibold hover:shadow-lg hover:shadow-gold/30 border border-gold/30',
  secondary: 'bg-surface-elevated text-white border border-white/10 hover:border-gold/40 hover:text-gold',
  ghost: 'text-white/80 hover:text-gold hover:bg-white/5',
  outline: 'border border-gold/30 text-gold hover:bg-gold/10',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs tracking-wider uppercase',
  md: 'px-6 py-3 text-sm tracking-wider uppercase',
  lg: 'px-8 py-4 text-sm tracking-widest uppercase',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = 'Button';
export default Button;
