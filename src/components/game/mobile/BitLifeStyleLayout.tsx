
import React from 'react';
import { Character } from '../../../types/game';
import { PremiumDarkLayout } from './PremiumDarkLayout';

interface BitLifeStyleLayoutProps {
  character: Character;
  activeTab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education';
  onTabChange: (tab: 'life' | 'activities' | 'careers' | 'relationships' | 'assets' | 'education') => void;
  onAgeUp: () => void;
  onShowActivityMenu: () => void;
  onShowRelationshipsMenu: () => void;
  onShowAssetsMenu: () => void;
  onShowPersonalitySkills: () => void;
  ageHistory: Record<number, string[]>;
  eventHistory?: string[];
}

export const BitLifeStyleLayout: React.FC<BitLifeStyleLayoutProps> = (props) => {
  return <PremiumDarkLayout {...props} />;
};
