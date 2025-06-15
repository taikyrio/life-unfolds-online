
import React from 'react';
import { Character } from '../../../types/game';
import { Home, Users, Globe, Zap } from 'lucide-react';

interface MobileNavigationProps {
  currentPage: 'life' | 'people' | 'world' | 'actions';
  onPageChange: (page: 'life' | 'people' | 'world' | 'actions') => void;
  character: Character;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  currentPage,
  onPageChange,
  character
}) => {
  const navigationItems = [
    { id: 'life' as const, label: 'Life', icon: Home },
    { id: 'people' as const, label: 'People', icon: Users },
    { id: 'world' as const, label: 'World', icon: Globe },
    { id: 'actions' as const, label: 'Actions', icon: Zap }
  ];

  return (
    <div className="bg-black/60 backdrop-blur-2xl border-t border-white/20 safe-area-pb">
      <div className="flex items-center justify-around px-4 py-3 pb-8">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`flex flex-col items-center space-y-1 p-3 rounded-2xl transition-all duration-300 min-w-[60px] ${
                isActive 
                  ? 'bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/20 shadow-lg' 
                  : 'hover:bg-white/10'
              }`}
            >
              <div className={`p-2 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg' 
                  : 'bg-transparent'
              }`}>
                <Icon 
                  size={20} 
                  className={`${isActive ? 'text-white' : 'text-white/70'}`}
                  strokeWidth={2.5}
                />
              </div>
              <span className={`text-xs font-medium ${isActive ? 'text-white' : 'text-white/60'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Home indicator */}
      <div className="flex justify-center pb-2">
        <div className="w-32 h-1 bg-white/30 rounded-full" />
      </div>
    </div>
  );
};
