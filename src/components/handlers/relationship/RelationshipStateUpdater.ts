
import { Character } from '../../../types/game';

export const updateCharacterFromRelationshipAction = (
  character: Character,
  effects: any,
  newRelationshipQuality?: number,
  targetId?: string
): Character => {
  const updatedCharacter = { ...character };

  // Apply character effects
  if (effects.happiness) {
    updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + effects.happiness);
  }
  if (effects.wealth) {
    updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth + effects.wealth);
  }

  // Update relationship quality if specified
  if (newRelationshipQuality !== undefined && targetId) {
    const memberIndex = updatedCharacter.familyMembers.findIndex(m => m.id === targetId);
    if (memberIndex !== -1) {
      updatedCharacter.familyMembers[memberIndex].relationshipQuality = newRelationshipQuality;
    }
  }

  return updatedCharacter;
};

export const addNewRelationships = (character: Character, newMembers: any[]): Character => {
  return {
    ...character,
    familyMembers: [...character.familyMembers, ...newMembers]
  };
};

export const updateRelationshipStatus = (character: Character, newStatus: string): Character => {
  return {
    ...character,
    relationshipStatus: newStatus as any
  };
};
