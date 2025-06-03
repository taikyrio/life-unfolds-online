
import { Character } from '../types/character';
import { Activity } from '../types/activities';

export const handleActivityAction = (
  character: Character,
  activity: Activity
): { character: Character; message: string; success: boolean } => {
  const updatedCharacter = { ...character };
  let message = '';
  let success = true;

  // Check requirements
  if (activity.requirements) {
    if (activity.requirements.minAge && character.age < activity.requirements.minAge) {
      return { 
        character, 
        message: `You must be at least ${activity.requirements.minAge} years old.`, 
        success: false 
      };
    }
    
    if (activity.requirements.minWealth && character.wealth < activity.requirements.minWealth) {
      return { 
        character, 
        message: `You need at least $${activity.requirements.minWealth}k.`, 
        success: false 
      };
    }
  }

  // Apply effects
  if (activity.effects) {
    Object.entries(activity.effects).forEach(([stat, value]) => {
      if (stat in updatedCharacter && typeof value === 'number') {
        (updatedCharacter as any)[stat] = Math.max(0, Math.min(100, (updatedCharacter as any)[stat] + value));
      }
    });
  }

  // Apply costs
  if (activity.cost) {
    updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - activity.cost);
  }

  message = activity.resultText || `You completed ${activity.name}`;

  return { character: updatedCharacter, message, success };
};
