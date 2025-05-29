
import React from 'react';
import { Character } from '../../../types/game';
import { CriminalCareerSystem } from './CriminalCareerSystem';
import { CriminalDLCHeader } from './CriminalDLCHeader';

interface CriminalDLCProps {
  character: Character;
  onCareerAction: (action: string, data?: any) => void;
}

export const CriminalDLC: React.FC<CriminalDLCProps> = ({ 
  character, 
  onCareerAction 
}) => {
  return (
    <div className="space-y-4">
      <CriminalDLCHeader />
      <CriminalCareerSystem 
        character={character} 
        onCareerAction={onCareerAction}
      />
    </div>
  );
};
