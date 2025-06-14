
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NavigationBadge {
  count?: number;
  type: 'urgent' | 'opportunity' | 'achievement' | 'social';
}

interface IntegratedNavigationTabProps {
  id: string;
  label: string;
  icon: LucideIcon;
  gradient: string;
  available: boolean;
  badge?: NavigationBadge;
  onClick: () => void;
  isActive?: boolean;
}

export const IntegratedNavigationTab: React.FC<IntegratedNavigationTabProps> = ({
  id,
  label,
  icon: Icon,
  gradient,
  available,
  badge,
  onClick,
  isActive = false
}) => {
  const getBadgeStyle = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-500/90 text-white shadow-red-500/50';
      case 'opportunity':
        return 'bg-amber-500/90 text-white shadow-amber-500/50';
      case 'achievement':
        return 'bg-purple-500/90 text-white shadow-purple-500/50';
      case 'social':
        return 'bg-pink-500/90 text-white shadow-pink-500/50';
      default:
        return 'bg-blue-500/90 text-white shadow-blue-500/50';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={!available}
      className={`relative flex-1 max-w-20 min-h-[60px] transition-all duration-200 ease-out ${
        available
          ? 'hover:scale-105 active:scale-95 touch-manipulation'
          : 'opacity-50 cursor-not-allowed'
      }`}
    >
      {/* Main container with mobile-optimized design */}
      <div className={`relative px-2 py-3 rounded-2xl transition-all duration-200 ${
        isActive
          ? 'bg-slate-800/90 border border-slate-600/60 shadow-lg'
          : 'bg-slate-800/50 border border-slate-700/40 hover:bg-slate-800/70 hover:border-slate-600/50'
      }`}>
        
        {/* Icon container - mobile optimized */}
        <div className={`relative mb-1 mx-auto w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${
          isActive 
            ? `bg-gradient-to-br ${gradient} shadow-md shadow-black/20` 
            : `bg-gradient-to-br ${gradient} opacity-85 hover:opacity-100`
        }`}>
          <Icon 
            size={16} 
            className="text-white drop-shadow-sm" 
            strokeWidth={2.5}
          />
          
          {/* Badge */}
          {badge && (
            <div className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center text-xs font-bold shadow-lg ${getBadgeStyle(badge.type)}`}>
              {badge.count && badge.count > 0 ? (
                <span className="text-xs">{badge.count > 9 ? '9+' : badge.count}</span>
              ) : (
                <div className="w-1 h-1 bg-white rounded-full" />
              )}
            </div>
          )}
        </div>
        
        {/* Label with mobile typography */}
        <span className={`text-xs font-medium text-center block transition-colors duration-200 leading-tight ${
          isActive ? 'text-white' : 'text-slate-300'
        }`}>
          {label}
        </span>
        
        {/* Active indicator */}
        {isActive && (
          <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-white/70 rounded-full" />
        )}
      </div>
    </button>
  );
};
