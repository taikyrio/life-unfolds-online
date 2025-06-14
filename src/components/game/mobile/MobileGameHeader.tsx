import React from 'react';
import { Character } from '../../../types/game';

interface MobileGameHeaderProps {
  character: Character;
}

export const MobileGameHeader: React.FC<MobileGameHeaderProps> = ({ character }) => {
  // This component is now integrated into BitLifeStyleLayout
  // Keeping it here for backward compatibility but it's not used in the new layout
  return null;
};
