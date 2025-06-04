import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface AgeUpButtonProps {
  onAgeUp: () => void;
}

export const AgeUpButton: React.FC<AgeUpButtonProps> = ({ onAgeUp }) => {
  const isMobile = useIsMobile();

  return (
    <button
      onClick={onAgeUp}
      className={`fixed ${isMobile ? 'bottom-4 right-4 w-14 h-14' : 'bottom-6 right-6 w-16 h-16'} bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center font-bold transition-all duration-200 hover:scale-105 z-50 safe-area-mb`}
      style={{ 
        boxShadow: '0 8px 32px rgba(34, 197, 94, 0.3)' 
      }}
    >
      <span className={`${isMobile ? 'text-xl' : 'text-2xl'}`}>+</span>
    </button>
  );
};