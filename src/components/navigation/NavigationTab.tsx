
import React from 'react';
import { LucideIcon, Lock } from 'lucide-react';
import { NavigationTooltip } from './NavigationTooltip';

interface NavigationTabProps {
  id: string;
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  gradient: string;
  available: boolean;
  tooltip?: string;
}

export const NavigationTab: React.FC<NavigationTabProps> = ({
  id,
  label,
  icon: Icon,
  onClick,
  gradient,
  available,
  tooltip
}) => {
  const isDisabled = !available;

  return (
    <div className="relative group">
      <button
        onClick={onClick}
        disabled={isDisabled}
        className={`flex flex-col items-center transition-all duration-300 ease-out p-3 rounded-2xl min-h-[64px] min-w-[64px] ${
          isDisabled 
            ? 'opacity-40 cursor-not-allowed' 
            : 'hover:scale-105 active:scale-95 hover:bg-white/10'
        }`}
        title={tooltip}
      >
        <div className={`relative p-2.5 rounded-xl mb-1 bg-gradient-to-br ${gradient} ${
          isDisabled ? 'opacity-50' : 'shadow-lg shadow-black/30'
        }`}>
          <Icon size={18} className="text-white drop-shadow-sm" />
          {isDisabled && (
            <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5 shadow-lg">
              <Lock size={8} className="text-white" />
            </div>
          )}
        </div>
        <span className="text-xs font-medium text-white/90 text-center leading-tight tracking-wide">
          {label}
        </span>
      </button>
      
      {tooltip && <NavigationTooltip tooltip={tooltip} />}
    </div>
  );
};
