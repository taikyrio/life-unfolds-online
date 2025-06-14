
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

      {/* Main Navigation - Mobile Optimized */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        {/* Background with proper mobile handling */}
        <div className="bg-gradient-to-t from-slate-900 via-slate-900/98 to-slate-900/90 backdrop-blur-xl border-t border-slate-600/20" />
        
        {/* Navigation container with mobile-safe spacing */}
        <div className="relative px-2 sm:px-4 pt-2 pb-safe-area">
          {/* Navigation grid - mobile optimized */}
          <div className="flex justify-center items-center gap-1 max-w-xs mx-auto mb-2">
            {tabs.map((tab) => (
              <IntegratedNavigationTab
                key={tab.id}
                {...tab}
                isActive={activeTab === tab.id || (tab.id === 'life' && activeTab === 'life')}
              />
            ))}
          </div>
          
          {/* iOS home indicator with proper spacing */}
          <div className="flex justify-center pb-1">
            <div className="w-20 h-1 bg-slate-600/50 rounded-full" />
          </div>
          
          {/* Safe area bottom padding for devices with home indicators */}
          <div className="h-safe-area-bottom" />
        </div>
      </div>
    </>
  );
};
