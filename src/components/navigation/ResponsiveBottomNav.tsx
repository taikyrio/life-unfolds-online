
import React, { useState } from 'react';
import { Character } from '../../types/game';
import { useAdaptiveNavigation } from './AdaptiveNavigationConfig';
import { ModernNavigationTab } from './ModernNavigationTab';
import { QuickActionsStrip } from './QuickActionsStrip';
import { FloatingAgeButton } from './FloatingAgeButton';

interface ResponsiveBottomNavProps {
  activeTab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education';
  onTabChange: (tab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education') => void;
  onAgeUp: () => void;
  character: Character;
  onShowActivityMenu: () => void;
  onShowRelationshipsMenu: () => void;
  onShowAssetsMenu: () => void;
  onShowPersonalitySkills: () => void;
}

export const ResponsiveBottomNav: React.FC<ResponsiveBottomNavProps> = ({ 
  activeTab,
  onTabChange,
  onAgeUp,
  character,
  onShowActivityMenu,
  onShowRelationshipsMenu,
  onShowAssetsMenu,
  onShowPersonalitySkills
}) => {
  const [lastActiveTab, setLastActiveTab] = useState<string>('life');

  const { tabs, quickActions } = useAdaptiveNavigation({
    character,
    onShowActivityMenu,
    onShowRelationshipsMenu,
    onShowAssetsMenu,
    onShowPersonalitySkills,
    onTabChange: (tab) => {
      setLastActiveTab(tab);
      onTabChange(tab as any);
    }
  });

  return (
    <>
      {/* Quick Actions Strip */}
      <QuickActionsStrip actions={quickActions} />

      {/* Floating Age Button */}
      <FloatingAgeButton character={character} onAgeUp={onAgeUp} />

      {/* Main Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 safe-area-pb">
        {/* Enhanced backdrop with better blur */}
        <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
        
        {/* Main navigation container */}
        <div className="relative">
          {/* Subtle top accent line with animation */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
          
          {/* Navigation grid */}
          <div className="px-4 py-4">
            <div className="flex justify-between items-end gap-2 max-w-sm mx-auto">
              {tabs.map((tab) => (
                <ModernNavigationTab
                  key={tab.id}
                  {...tab}
                  isActive={activeTab === tab.id || (tab.id === 'life' && activeTab === 'life')}
                />
              ))}
            </div>
          </div>
          
          {/* iOS home indicator with subtle animation */}
          <div className="flex justify-center pb-2">
            <div className="w-32 h-1 bg-white/20 rounded-full shadow-sm transition-all duration-300 hover:bg-white/30" />
          </div>
        </div>
      </div>
    </>
  );
};
