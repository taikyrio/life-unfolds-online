
import React from 'react';
import { Character } from '../../types/character';
import { OrganizedCrimeSystem } from '../OrganizedCrimeSystem';

interface CriminalDLCProps {
  character: Character;
  onCareerAction: (action: string, data?: any) => void;
}

export const CriminalDLC: React.FC<CriminalDLCProps> = ({ 
  character, 
  onCareerAction 
}) => {
  const handleCharacterUpdate = (updatedCharacter: Character) => {
    onCareerAction('update_character', updatedCharacter);
  };

  const handleEvent = (message: string) => {
    onCareerAction('add_event', message);
  };

  return (
    <OrganizedCrimeSystem 
      character={character} 
      onCharacterUpdate={handleCharacterUpdate}
      onEvent={handleEvent}
    />
  );
};
