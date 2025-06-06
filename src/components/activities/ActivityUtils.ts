
import { Character } from '../../types/game';

export interface Activity {
  id: string;
  name: string;
  description: string;
  category: string;
  minAge: number;
  maxAge?: number;
  cost?: number;
  duration: number;
  effects: {
    happiness?: number;
    health?: number;
    smarts?: number;
    looks?: number;
    wealth?: number;
  };
  requirements?: {
    wealth?: number;
    health?: number;
    smarts?: number;
  };
}

export const isActivityAvailable = (activity: Activity, character: Character): boolean => {
  // Check age requirements
  if (character.age < activity.minAge) return false;
  if (activity.maxAge && character.age > activity.maxAge) return false;
  
  // Check wealth requirements
  if (activity.cost && character.wealth < activity.cost) return false;
  
  // Check other requirements
  if (activity.requirements) {
    if (activity.requirements.wealth && character.wealth < activity.requirements.wealth) return false;
    if (activity.requirements.health && character.health < activity.requirements.health) return false;
    if (activity.requirements.smarts && character.smarts < activity.requirements.smarts) return false;
  }
  
  // Check family members requirement (if any activities require family)
  if (activity.id.includes('family') && (!character.familyMembers || character.familyMembers.length === 0)) {
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
  
  if (activity.cost && character.wealth < activity.cost) {
    requirements.push(`Requires $${activity.cost.toLocaleString()}`);
  }
  
  if (activity.requirements) {
    if (activity.requirements.wealth && character.wealth < activity.requirements.wealth) {
      requirements.push(`Requires $${activity.requirements.wealth.toLocaleString()}`);
    }
    if (activity.requirements.health && character.health < activity.requirements.health) {
      requirements.push(`Requires ${activity.requirements.health} health`);
    }
    if (activity.requirements.smarts && character.smarts < activity.requirements.smarts) {
      requirements.push(`Requires ${activity.requirements.smarts} smarts`);
    }
  }
  
  if (activity.id.includes('family') && (!character.familyMembers || character.familyMembers.length === 0)) {
    requirements.push('Requires family members');
  }
  
  return requirements.join(', ');
};

export const getAvailableActivities = (character: Character): Activity[] => {
  const allActivities: Activity[] = [
    {
      id: 'gym',
      name: 'Go to Gym',
      description: 'Work out and improve your fitness',
      category: 'health',
      minAge: 12,
      cost: 10,
      duration: 2,
      effects: { health: 10, looks: 5 }
    },
    {
      id: 'library',
      name: 'Visit Library',
      description: 'Study and increase your knowledge',
      category: 'education',
      minAge: 5,
      duration: 2,
      effects: { smarts: 10 }
    },
    {
      id: 'movie',
      name: 'Watch Movie',
      description: 'Relax and enjoy entertainment',
      category: 'entertainment',
      minAge: 3,
      cost: 15,
      duration: 3,
      effects: { happiness: 15 }
    }
  ];
  
  return allActivities.filter(activity => isActivityAvailable(activity, character));
};
