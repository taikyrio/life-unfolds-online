
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
      className={`relative flex-1 max-w-20 transition-all duration-200 ease-out ${
        available
          ? 'hover:scale-105 active:scale-95'
          : 'opacity-50 cursor-not-allowed'
      }`}
    >
      {/* Main container with game-like design */}
      <div className={`relative px-3 py-4 rounded-2xl transition-all duration-200 ${
        isActive
          ? 'bg-slate-800/80 border border-slate-600/50 shadow-lg'
          : 'bg-slate-800/40 border border-slate-700/30 hover:bg-slate-800/60 hover:border-slate-600/40'
      }`}>
        
        {/* Icon container - more game-integrated */}
        <div className={`relative mb-2 mx-auto w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
          isActive 
            ? `bg-gradient-to-br ${gradient} shadow-lg shadow-black/25` 
            : `bg-gradient-to-br ${gradient} opacity-80 hover:opacity-100`
        }`}>
          <Icon 
            size={18} 
            className="text-white drop-shadow-sm" 
            strokeWidth={2}
          />
          
          {/* Badge */}
          {badge && (
            <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold shadow-lg ${getBadgeStyle(badge.type)}`}>
              {badge.count && badge.count > 0 ? (
                <span>{badge.count > 9 ? '9+' : badge.count}</span>
              ) : (
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              )}
            </div>
          )}
        </div>
        
        {/* Label with better typography */}
        <span className={`text-xs font-medium text-center block transition-colors duration-200 ${
          isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
        }`}>
          {label}
        </span>
        
        {/* Active indicator */}
        {isActive && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-white/60 rounded-full" />
        )}
      </div>
    </button>
  );
};
