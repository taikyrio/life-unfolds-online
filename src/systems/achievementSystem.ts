
import { Character } from '../types/game';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: 'life' | 'career' | 'education' | 'wealth' | 'relationships' | 'health' | 'special';
  condition: (character: Character, eventHistory: string[]) => boolean;
}

const achievements: Achievement[] = [
  // Life milestones
  {
    id: 'first_birthday',
    name: 'First Birthday',
    description: 'Celebrated your first birthday',
    emoji: '🎂',
    category: 'life',
    condition: (character) => character.age >= 1
  },
  {
    id: 'teenager',
    name: 'Teenage Years',
    description: 'Became a teenager',
    emoji: '👦',
    category: 'life',
    condition: (character) => character.age >= 13
  },
  {
    id: 'adult',
    name: 'All Grown Up',
    description: 'Reached adulthood',
    emoji: '👨',
    category: 'life',
    condition: (character) => character.age >= 18
  },
  {
    id: 'centenarian',
    name: 'Century Club',
    description: 'Lived to 100 years old',
    emoji: '💯',
    category: 'life',
    condition: (character) => character.age >= 100
  }
];

export const checkAchievements = (
  character: Character, 
  eventHistory: string[], 
  currentAchievements: string[]
): Achievement[] => {
  return achievements.filter(achievement => 
    !currentAchievements.includes(achievement.id) && 
    achievement.condition(character, eventHistory)
  );
};

export { achievements };
