
import { Character } from '../types/character';
import { healthConditions } from '../systems/healthSystem';

export const handleHealthAction = (
  character: Character,
  action: string,
  data?: any
): { character: Character; message: string; success: boolean } => {
  const updatedCharacter = { ...character };
  let message = '';
  let success = true;

  switch (action) {
    case 'exercise':
      updatedCharacter.health = Math.min(100, updatedCharacter.health + 5);
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 3);
      message = 'You exercised and feel healthier!';
      break;

    case 'doctor_visit':
      if (updatedCharacter.wealth < 5) {
        return { character, message: 'You cannot afford a doctor visit.', success: false };
      }
      
      updatedCharacter.wealth -= 5;
      updatedCharacter.health = Math.min(100, updatedCharacter.health + 10);
      message = 'You visited the doctor and feel better!';
      break;

    case 'eat_healthy':
      updatedCharacter.health = Math.min(100, updatedCharacter.health + 3);
      updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - 1);
      message = 'You ate healthy food and feel better!';
      break;

    case 'meditation':
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 5);
      updatedCharacter.health = Math.min(100, updatedCharacter.health + 2);
      message = 'Meditation helped you feel more balanced!';
      break;

    default:
      message = 'Unknown health action.';
      success = false;
  }

  return { character: updatedCharacter, message, success };
};
