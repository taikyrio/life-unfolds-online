
import { Character } from '../../types/game';
import { Activity } from './ActivityData';

export const isActivityAvailable = (activity: Activity, character: Character): boolean => {
  if (character.age < activity.minAge) return false;
  if (activity.maxAge && character.age > activity.maxAge) return false;
  if (activity.minWealth && character.wealth < activity.minWealth) return false;
  if (activity.requiresPartner) {
    const hasPartner = character.familyMembers.some(member => 
      (member.relationship === 'lover' || member.relationship === 'spouse') && member.alive
    );
    if (!hasPartner) return false;
  }
  return true;
};

export const getRequirementText = (activity: Activity, character: Character): string => {
  if (character.age < activity.minAge) return `Requires age ${activity.minAge}+`;
  if (activity.maxAge && character.age > activity.maxAge) return `Too old (max age ${activity.maxAge})`;
  if (activity.minWealth && character.wealth < activity.minWealth) return `Requires $${activity.minWealth.toLocaleString()}`;
  if (activity.requiresPartner) return 'Requires partner';
  return '';
};
