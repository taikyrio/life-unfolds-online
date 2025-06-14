
import React, { useState } from 'react';
import { Character } from '../../types/game';
import { useAdaptiveNavigation } from './AdaptiveNavigationConfig';
import { IntegratedNavigationTab } from './IntegratedNavigationTab';
import { ContextualQuickActions } from './ContextualQuickActions';
import { GameAgeButton } from './GameAgeButton';

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
      {/* Contextual Quick Actions */}
      {quickActions.length > 0 && (
        <ContextualQuickActions actions={quickActions} />
      )}

      {/* Game Age Button */}
      <GameAgeButton character={character} onAgeUp={onAgeUp} />

      {/* Main Navigation - Integrated Design */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        {/* Seamless background that blends with game */}
        <div className="bg-gradient-to-t from-slate-900 via-slate-900/95 to-slate-900/80 backdrop-blur-xl" />
        
        {/* Navigation container with game-like styling */}
        <div className="relative px-3 pt-3 pb-6 safe-area-pb">
          {/* Subtle game border */}
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-slate-600/30 to-transparent rounded-full" />
          
          {/* Navigation grid - feels more like game UI */}
          <div className="flex justify-center gap-1 max-w-sm mx-auto">
            {tabs.map((tab) => (
              <IntegratedNavigationTab
                key={tab.id}
                {...tab}
                isActive={activeTab === tab.id || (tab.id === 'life' && activeTab === 'life')}
              />
            ))}
          </div>
          
          {/* iOS indicator with game styling */}
          <div className="flex justify-center pt-3">
            <div className="w-24 h-1 bg-slate-600/40 rounded-full" />
          </div>
        </div>
      </div>
    </>
  );
};
