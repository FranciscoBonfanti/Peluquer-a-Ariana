import { type ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, children, disabled, className = '', ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-sans font-semibold rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-rose text-white shadow-rose hover:-translate-y-0.5 hover:shadow-rose-lg active:translate-y-0',
      outline: 'border border-charcoal/20 text-charcoal hover:border-rose hover:text-rose hover:-translate-y-0.5',
      ghost: 'border border-rose/0 text-muted hover:border-rose/20 bg-transparent',
      danger: 'bg-red-500 text-white hover:-translate-y-0.5',
    };

    const sizes = {
      sm: 'text-sm px-4 py-2',
      md: 'text-sm px-6 py-3',
      lg: 'text-base px-8 py-3.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            {children}
          </span>
        ) : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
