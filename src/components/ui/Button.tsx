import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-xs font-medium rounded-md gap-1.5',
      md: 'px-4 py-2.5 text-sm font-semibold rounded-lg gap-2',
      lg: 'px-6 py-3.5 text-base font-semibold rounded-xl gap-2.5',
    };

    const variantStyles = {
      primary:
        'bg-[#E53935] text-white hover:bg-[#c62828] focus-visible:ring-2 focus-visible:ring-red-500 shadow-sm transition-all duration-150',
      secondary:
        'bg-[#252525] text-white hover:bg-[#1A1A1A] focus-visible:ring-2 focus-visible:ring-slate-900 shadow-sm transition-all duration-150',
      outline:
        'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-400 focus-visible:ring-2 focus-visible:ring-slate-300 transition-all duration-150',
      ghost:
        'text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-200 transition-all duration-150',
      whatsapp:
        'bg-[#25D366] text-white hover:bg-[#20bd5a] focus-visible:ring-2 focus-visible:ring-emerald-500 shadow-sm font-semibold transition-all duration-150',
      danger:
        'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-500 shadow-sm transition-all duration-150',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]',
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
