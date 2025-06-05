
import { Character } from '../types/game';
import { Activity } from '../types/activities';

export const handleActivityActions = (
  character: Character,
  activity: Activity,
  onCharacterUpdate: (character: Character) => void,
  onEvent: (message: string) => void
) => {
  let updatedCharacter = { ...character };
  
  // Apply activity effects
  if (activity.effects.health) {
    updatedCharacter.health = Math.max(0, Math.min(100, updatedCharacter.health + activity.effects.health));
  }
  if (activity.effects.happiness) {
    updatedCharacter.happiness = Math.max(0, Math.min(100, updatedCharacter.happiness + activity.effects.happiness));
  }
  if (activity.effects.smarts) {
    updatedCharacter.smarts = Math.max(0, Math.min(100, updatedCharacter.smarts + activity.effects.smarts));
  }
  if (activity.effects.looks) {
    updatedCharacter.looks = Math.max(0, Math.min(100, updatedCharacter.looks + activity.effects.looks));
  }
  if (activity.effects.wealth) {
    updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth + activity.effects.wealth);
  }
  if (activity.effects.relationships) {
    updatedCharacter.relationships = Math.max(0, Math.min(100, updatedCharacter.relationships + activity.effects.relationships));
  }
  if (activity.effects.fame) {
    updatedCharacter.fame = Math.max(0, Math.min(100, updatedCharacter.fame + activity.effects.fame));
  }

  onCharacterUpdate(updatedCharacter);
  onEvent(`You completed: ${activity.name}`);
};

export default handleActivityActions;
