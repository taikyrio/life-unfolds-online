
import { Character } from '../../../types/game';
import { ActivityOption } from '../../../types/activities';

export const canUseActivity = (activity: ActivityOption, character: Character, hasPartner: boolean): boolean => {
  if (activity.minAge && character.age < activity.minAge) return false;
  if (activity.maxAge && character.age > activity.maxAge) return false;
  if (activity.minWealth && character.wealth < activity.minWealth) return false;
  if (activity.requiresPartner && !hasPartner) return false;
  
  return true;
};

export const getRequirementText = (activity: ActivityOption, character: Character, hasPartner: boolean): string => {
  const requirements = [];
  if (activity.minAge && character.age < activity.minAge) {
    requirements.push(`Requires age ${activity.minAge}+`);
  }
  if (activity.minWealth && character.wealth < activity.minWealth) {
    requirements.push(`Requires $${activity.minWealth}`);
  }
  if (activity.requiresPartner && !hasPartner) {
    requirements.push('Requires a partner');
  }
  return requirements.join(', ');
};

export const getCodingSkill = (character: Character): number => {
  return parseInt(character.flags?.find(f => f.startsWith('coding:'))?.split(':')[1] || '0');
};

export const getNotoriety = (character: Character): number => {
  return parseInt(character.flags?.find(f => f.startsWith('notoriety:'))?.split(':')[1] || '0');
};
