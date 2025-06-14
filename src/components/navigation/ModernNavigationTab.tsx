
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface NavigationBadge {
  count?: number;
  type: 'urgent' | 'opportunity' | 'achievement' | 'social';
}

interface ModernNavigationTabProps {
  id: string;
  label: string;
  icon: LucideIcon;
  gradient: string;
  available: boolean;
  badge?: NavigationBadge;
  onClick: () => void;
  isActive?: boolean;
}

export const ModernNavigationTab: React.FC<ModernNavigationTabProps> = ({
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
        return 'bg-red-500 animate-pulse';
      case 'opportunity':
        return 'bg-gradient-to-r from-yellow-400 to-orange-400 animate-pulse';
      case 'achievement':
        return 'bg-gradient-to-r from-purple-400 to-pink-400';
      case 'social':
        return 'bg-gradient-to-r from-pink-400 to-rose-400';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="relative group flex-1 max-w-20">
      <button
        onClick={onClick}
        disabled={!available}
        className={`relative w-full transition-all duration-300 ease-out touch-manipulation ${
          available
            ? 'hover:scale-105 active:scale-95'
            : 'opacity-40 cursor-not-allowed'
        }`}
      >
        {/* Card container */}
        <div className={`relative p-4 rounded-3xl backdrop-blur-xl border transition-all duration-300 ${
          isActive
            ? 'bg-white/10 border-white/30 shadow-2xl shadow-black/20'
            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
        }`}>
          {/* Background gradient */}
          <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
          
          {/* Icon container */}
          <div className={`relative z-10 mb-2 p-3 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg transition-all duration-300 ${
            isActive ? 'scale-110' : 'group-hover:scale-105'
          }`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent rounded-2xl" />
            <Icon 
              size={20} 
              className="text-white drop-shadow-lg relative z-10" 
              strokeWidth={2.5}
            />
            
            {/* Badge */}
            {badge && (
              <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${getBadgeStyle(badge.type)} shadow-lg border border-white/20`}>
                {badge.count && badge.count > 0 ? (
                  <span className="text-xs font-bold text-white">
                    {badge.count > 9 ? '9+' : badge.count}
                  </span>
                ) : (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
            )}
          </div>
          
          {/* Label */}
          <span className={`text-xs font-semibold text-center block transition-all duration-300 ${
            isActive ? 'text-white' : 'text-white/80 group-hover:text-white'
          }`}>
            {label}
          </span>
          
          {/* Active indicator */}
          {isActive && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full" />
          )}
        </div>
        
        {/* Hover glow effect */}
        <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${gradient} blur-xl -z-10`} 
             style={{ transform: 'scale(0.8)' }} />
      </button>
    </div>
  );
};
