
import { Character } from '../../types/game';
import { Activity } from './ActivityData';

export const isActivityAvailable = (activity: Activity, character: Character): boolean => {
  // Check age requirements
  if (character.age < activity.minAge) return false;
  if (activity.maxAge && character.age > activity.maxAge) return false;
  
  // Check wealth requirements
  if (activity.minWealth && character.wealth < activity.minWealth) return false;
  
  // Check partner requirements
  if (activity.requiresPartner && (!character.familyMembers || character.familyMembers.length === 0)) {
    return false;
  }
  
  return true;
};

export const getRequirementText = (activity: Activity, character: Character): string => {
  const requirements = [];
  
  if (character.age < activity.minAge) {
    requirements.push(`Requires age ${activity.minAge}+`);
  }
  
  if (activity.maxAge && character.age > activity.maxAge) {
    requirements.push(`Too old (max age ${activity.maxAge})`);
  }
  
  if (activity.minWealth && character.wealth < activity.minWealth) {
    requirements.push(`Requires $${activity.minWealth.toLocaleString()}`);
  }
  
  if (activity.requiresPartner && (!character.familyMembers || character.familyMembers.length === 0)) {
    requirements.push('Requires a partner');
  }
  
  return requirements.join(', ');
};

export const getAvailableActivities = (character: Character): Activity[] => {
  const allActivities: Activity[] = [
    {
      id: 'gym',
      name: 'Go to Gym',
      emoji: '🏋️',
      description: 'Work out and improve your fitness',
      minAge: 12,
      minWealth: 30
    },
    {
      id: 'library',
      name: 'Visit Library',
      emoji: '📚',
      description: 'Study and increase your knowledge',
      minAge: 5
    },
    {
      id: 'movie',
      name: 'Watch Movie',
      emoji: '🎬',
      description: 'Relax and enjoy entertainment',
      minAge: 3,
      minWealth: 15
    }
  ];
  
  return allActivities.filter(activity => isActivityAvailable(activity, character));
};
