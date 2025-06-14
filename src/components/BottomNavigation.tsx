
import React from 'react';
import { Character } from '../types/game';
import { NavigationTab } from './navigation/NavigationTab';
import { CenterAgeButton } from './navigation/CenterAgeButton';
import { useNavigationConfig } from './navigation/useNavigationConfig';

interface BottomNavigationProps {
  activeTab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education';
  onTabChange: (tab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education') => void;
  onAgeUp: () => void;
  character: Character;
  onShowActivityMenu: () => void;
  onShowRelationshipsMenu: () => void;
  onShowAssetsMenu: () => void;
  onShowPersonalitySkills: () => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  onAgeUp,
  character,
  onShowActivityMenu,
  onShowRelationshipsMenu,
  onShowAssetsMenu,
  onShowPersonalitySkills,
  onTabChange
}) => {
  const handleShowCareerMenu = () => {
    onTabChange('careers');
  };

  const tabs = useNavigationConfig({
    character,
    onShowActivityMenu,
    onShowRelationshipsMenu,
    onShowAssetsMenu,
    onShowPersonalitySkills,
    onShowCareerMenu: handleShowCareerMenu
  });

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 safe-area-pb">
      {/* iOS-style blur backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-xl" />
      
      {/* Windows 11 dark container */}
      <div className="relative bg-gray-900/80 border-t border-white/10">
        {/* Subtle top glow effect */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        <div className="flex items-center justify-center px-4 py-2">
          <div className="flex items-center justify-between w-full max-w-sm">
            {/* Left tabs */}
            {tabs.slice(0, 2).map((tab) => (
              <NavigationTab key={tab.id} {...tab} />
            ))}

            {/* Center Age Button */}
            <CenterAgeButton onAgeUp={onAgeUp} />

            {/* Right tabs */}
            {tabs.slice(2).map((tab) => (
              <NavigationTab key={tab.id} {...tab} />
            ))}
          </div>
        </div>
        
        {/* Home indicator (iOS style) */}
        <div className="flex justify-center pb-1">
          <div className="w-32 h-1 bg-white/30 rounded-full" />
        </div>
      </div>
    </div>
  );
};
