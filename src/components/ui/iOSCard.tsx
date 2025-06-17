
import React from 'react';

interface iOSCardProps {
  children: React.ReactNode;
  className?: string;
}

export function iOSCard({ children, className = '' }: iOSCardProps) {
  return (
    <div className={`bg-ios-secondary rounded-xl border border-ios-separator ${className}`}>
      {children}
    </div>
  );
}
