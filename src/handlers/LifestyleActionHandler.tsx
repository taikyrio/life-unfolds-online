
import { Character } from '../types/game';

export const handleLifestyleAction = (
  character: Character,
  action: string,
  data: any,
  ageHistory: Record<number, string[]>,
  setAgeHistory: (history: Record<number, string[]>) => void,
  onGameStateChange: (newState: any) => void,
  gameState: any,
  toast: any
) => {
  let updatedCharacter = { ...character };
  let message = '';
  let ageEvents = ageHistory[updatedCharacter.age] || [];

  switch (action) {
    case 'vacation':
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 20);
      updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - 200);
      message = 'You had an amazing vacation!';
      break;
    case 'party':
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 10);
      updatedCharacter.relationships = Math.min(100, updatedCharacter.relationships + 5);
      message = 'You had a great time at the party!';
      break;
    default:
      message = `You completed ${action} lifestyle activity.`;
      break;
  }

  if (message) {
    ageEvents.push(message);
    const newAgeHistory = { ...ageHistory };
    newAgeHistory[updatedCharacter.age] = ageEvents;
    setAgeHistory(newAgeHistory);

    toast({
      title: "Lifestyle Update",
      description: message,
    });
  }

  onGameStateChange({
    ...gameState,
    character: updatedCharacter
  });
};
