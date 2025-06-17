
import React from 'react';

interface iOSButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'destructive';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function iOSButton({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  className = ''
}: iOSButtonProps) {
  const baseClasses = 'rounded-xl font-medium text-center ios-touch-feedback ios-ease-animation focus:outline-none';
  
  const variantClasses = {
    primary: 'bg-ios-blue text-white active:bg-blue-700',
    secondary: 'bg-ios-tertiary text-ios-label border border-ios-separator active:bg-ios-secondary',
    destructive: 'bg-ios-red text-white active:bg-red-700'
  };

  const sizeClasses = {
    small: 'px-4 py-2 ios-footnote',
    medium: 'px-6 py-3 ios-body',
    large: 'px-8 py-4 ios-body'
  };

  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : 'cursor-pointer';

  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
