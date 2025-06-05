import React from 'react';
import { Character } from '../types/game';
import { EducationSystemCore } from '../systems/education/EducationSystemCore';
import { processEducationAction } from '../handlers/education/EducationActionProcessor';

interface EducationTabProps {
  character: Character;
  onCharacterUpdate: (character: Character) => void;
  ageHistory: Record<number, string[]>;
  setAgeHistory: (history: Record<number, string[]>) => void;
  gameState: any;
  onGameStateChange: (newState: any) => void;
  toast?: any;
}

export const EducationTab: React.FC<EducationTabProps> = ({
  character,
  onCharacterUpdate,
  ageHistory,
  setAgeHistory,
  gameState,
  onGameStateChange,
  toast
}) => {
  const handleEducationAction = (action: string, data?: any) => {
    const result = processEducationAction(
      character,
      action,
      data,
      ageHistory,
      setAgeHistory,
      toast
    );

    // Update character
    onCharacterUpdate(result.character);

    // Update game state
    const newGameState = {
      ...gameState,
      character: result.character
    };
    onGameStateChange(newGameState);

    // Show toast message
    if (result.message && toast) {
      toast({
        title: "Education Update",
        description: result.message,
      });
    }
  };

  return (
    <div className="education-tab p-4">
      <EducationSystemCore
        character={character}
        onEducationAction={handleEducationAction}
      />
    </div>
  );
};