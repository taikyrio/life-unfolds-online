
import React from 'react';
import { Character } from '../../../types/game';
import { CriminalCareerSystem } from './CriminalCareerSystem';

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
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-red-600 mb-2">
          🔫 Criminal Underworld
        </h1>
        <p className="text-gray-600">Choose your path in the criminal world</p>
      </div>
      
      <CriminalCareerSystem 
        character={character} 
        onCareerAction={onCareerAction}
      />
    </div>
  );
};
