
import { Character } from '../types/game';

export const handleHealthAction = (
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
    case 'doctor_visit':
      updatedCharacter.health = Math.min(100, updatedCharacter.health + 10);
      updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - 50);
      message = 'You visited the doctor and feel healthier!';
      break;
    case 'exercise':
      updatedCharacter.health = Math.min(100, updatedCharacter.health + 5);
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 3);
      message = 'You exercised and feel great!';
      break;
    default:
      message = `You completed ${action} health activity.`;
      break;
  }

  if (message) {
    ageEvents.push(message);
    const newAgeHistory = { ...ageHistory };
    newAgeHistory[updatedCharacter.age] = ageEvents;
    setAgeHistory(newAgeHistory);

    toast({
      title: "Health Update",
      description: message,
    });
  }

  onGameStateChange({
    ...gameState,
    character: updatedCharacter
  });
};
