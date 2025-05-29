
import { Character } from '../../types/game';

export const handleActivityAction = (
  character: Character,
  action: string,
  ageHistory: Record<number, string[]>,
  setAgeHistory: (history: Record<number, string[]>) => void,
  onGameStateChange: (newState: any) => void,
  gameState: any,
  toast: any,
  data?: any
) => {
  let updatedCharacter = { ...character };
  let message = '';
  let ageEvents = ageHistory[updatedCharacter.age] || [];

  switch (action) {
    case 'workout':
      updatedCharacter.health = Math.min(100, updatedCharacter.health + 10);
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 5);
      message = 'You had a great workout session!';
      break;
    
    case 'read_book':
      updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 8);
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 3);
      message = 'You learned something new from reading!';
      break;
    
    case 'socialize':
      updatedCharacter.relationships = Math.min(100, updatedCharacter.relationships + 12);
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 8);
      message = 'You had a great time socializing with friends!';
      break;

    case 'meditation':
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 15);
      updatedCharacter.health = Math.min(100, updatedCharacter.health + 5);
      message = 'Meditation helped you feel more centered and peaceful.';
      break;
  }

  if (message) {
    ageEvents.push(message);
    const newAgeHistory = { ...ageHistory };
    newAgeHistory[updatedCharacter.age] = ageEvents;
    setAgeHistory(newAgeHistory);

    toast({
      title: "Activity Complete",
      description: message,
    });
  }

  onGameStateChange({
    ...gameState,
    character: updatedCharacter
  });
};
