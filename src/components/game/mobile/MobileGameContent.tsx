
import React from 'react';
import { Character } from '../../../types/game';
import { BitLifeStyleLayout } from './BitLifeStyleLayout';

interface MobileGameContentProps {
  activeTab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education';
  character: Character;
  eventHistory: string[];
  ageHistory: Record<number, string[]>;
  onAgeUp: () => void;
  handleActivity: (activity: any) => void;
  onTabChange: (tab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education') => void;
  onShowActivityMenu: () => void;
  onShowRelationshipsMenu: () => void;
  onShowAssetsMenu: () => void;
  onShowPersonalitySkills: () => void;
}

export const MobileGameContent: React.FC<MobileGameContentProps> = ({
  activeTab,
  character,
  eventHistory,
  ageHistory,
  onAgeUp,
  handleActivity,
  onTabChange,
  onShowActivityMenu,
  onShowRelationshipsMenu,
  onShowAssetsMenu,
  onShowPersonalitySkills
}) => {
  return (
    <BitLifeStyleLayout
      character={character}
      activeTab={activeTab}
      onTabChange={onTabChange}
      onAgeUp={onAgeUp}
      onShowActivityMenu={onShowActivityMenu}
      onShowRelationshipsMenu={onShowRelationshipsMenu}
      onShowAssetsMenu={onShowAssetsMenu}
      onShowPersonalitySkills={onShowPersonalitySkills}
      ageHistory={ageHistory}
      eventHistory={eventHistory}
    />
  );
};
