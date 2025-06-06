
import { Character, GameState } from '../types/game';
import { ActivityOption } from '../types/activities';

export const processActivityAction = (
  character: Character,
  activity: ActivityOption,
  gameState: GameState
): { character: Character; message: string } => {
  let updatedCharacter = { ...character };
  let message = `You ${activity.title.toLowerCase()}!`;

  // Basic activity effects
  if (activity.id.includes('exercise')) {
    updatedCharacter.health = Math.min(100, updatedCharacter.health + 10);
    updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 5);
    message = 'You exercised and feel healthier!';
  } else if (activity.id.includes('study')) {
    updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 10);
    updatedCharacter.happiness = Math.max(0, updatedCharacter.happiness - 5);
    message = 'You studied hard and became smarter!';
  } else if (activity.id.includes('social')) {
    updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 15);
    updatedCharacter.relationships = Math.min(100, updatedCharacter.relationships + 5);
    message = 'You had a great time socializing!';
  }

  return { character: updatedCharacter, message };
};
