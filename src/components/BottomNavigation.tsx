
import React from 'react';
import { Heart, Briefcase, Users, Home, Car, User, GraduationCap } from 'lucide-react';
import { Character } from '../types/game';

interface BottomNavigationProps {
  activeTab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education';
  onTabChange: (tab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education') => void;
  onAgeUp: () => void;
  character: Character;
  onShowActivityMenu: () => void;
  onShowRelationshipMenu: () => void;
  onShowAssetsMenu: () => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  onAgeUp,
  character,
  onShowActivityMenu,
  onShowRelationshipMenu,
  onShowAssetsMenu
}) => {
  const tabs = [
    { id: 'life', label: 'Life', icon: User, onClick: () => {} },
    { id: 'activities', label: 'Activities', icon: Home, onClick: onShowActivityMenu },
    { id: 'relationships', label: 'Relations', icon: Heart, onClick: onShowRelationshipMenu },
    { id: 'assets', label: 'Assets', icon: Car, onClick: onShowAssetsMenu }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/50 safe-area-pb shadow-lg">
      <div className="flex items-center justify-around py-1">
        {tabs.slice(0, 2).map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={tab.onClick}
              className="flex flex-col items-center p-2 min-w-0 flex-1 transition-all duration-200 text-gray-600 hover:text-gray-800"
            >
              <div className="p-1 rounded-lg transition-colors">
                <Icon size={18} className="mb-1" />
              </div>
              <span className="text-xs truncate font-medium">
                {tab.label}
              </span>
            </button>
          );
        })}
        
        {/* Age Button - Red centered */}
        <button
          onClick={onAgeUp}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 active:scale-95 mx-1"
        >
          <div className="text-center">
            <div className="text-xs leading-tight">Age</div>
            <div className="text-xs opacity-90">Up</div>
          </div>
        </button>
        
        {tabs.slice(2).map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={tab.onClick}
              className="flex flex-col items-center p-2 min-w-0 flex-1 transition-all duration-200 text-gray-600 hover:text-gray-800"
            >
              <div className="p-1 rounded-lg transition-colors">
                <Icon size={18} className="mb-1" />
              </div>
              <span className="text-xs truncate font-medium">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
