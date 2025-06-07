
import React from 'react';
import { Character } from '../../types/game';
import { handleJobApplication, handleMusicCareer } from '../../handlers/career';

interface CareerActionHandlerProps {
  character: Character;
  onCharacterUpdate: (character: Character) => void;
  onEvent: (message: string) => void;
}

export const CareerActionHandler: React.FC<CareerActionHandlerProps> = ({
  character,
  onCharacterUpdate,
  onEvent
}) => {
  const handleCareerAction = (action: string, data?: any) => {
    let updatedCharacter = { ...character };

    // Handle basic career actions
    if (action === 'join_job' || action === 'quit_job' || action === 'get_raise') {
      handleJobApplication(character, action, data, undefined, undefined, 
        (newState) => onCharacterUpdate(newState.character), 
        { character }, 
        { title: '', description: '' }
      );
      return;
    }

    // Handle music career actions
    if (action.startsWith('music_')) {
      handleMusicCareer(character, action, data, undefined, undefined, 
        (newState) => onCharacterUpdate(newState.character), 
        { character }, 
        { title: '', description: '' }
      );
      return;
    }

    onCharacterUpdate(updatedCharacter);
  };

  return null;
};

export const handleCareerAction = (
  character: Character,
  action: string,
  data?: any,
  ageHistory?: Record<number, string[]>,
  setAgeHistory?: React.Dispatch<React.SetStateAction<Record<number, string[]>>>,
  onGameStateChange?: (newState: any) => void,
  gameState?: any,
  toast?: any
) => {
  // Route to appropriate handler based on action type
  if (action === 'join_job' || action === 'quit_job' || action === 'get_raise') {
    return handleJobApplication(character, action, data, ageHistory, setAgeHistory, onGameStateChange, gameState, toast);
  }

  if (action.startsWith('music_')) {
    return handleMusicCareer(character, action, data, ageHistory, setAgeHistory, onGameStateChange, gameState, toast);
  }
};
