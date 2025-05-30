import { Character, Achievement } from '../types/game';

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
  },

  // Education achievements
  {
    id: 'high_school_graduate',
    name: 'High School Graduate',
    description: 'Completed high school education',
    emoji: '🎓',
    category: 'education',
    condition: (character) => character.education.completedStages.includes('high school')
  },
  {
    id: 'college_graduate',
    name: 'College Graduate',
    description: 'Earned a college degree',
    emoji: '🎓',
    category: 'education',
    condition: (character) => character.education.completedStages.includes('college') || character.education.completedStages.includes('university')
  },
  {
    id: 'masters_degree',
    name: 'Master\'s Degree',
    description: 'Earned a master\'s degree',
    emoji: '📚',
    category: 'education',
    condition: (character) => character.education.completedStages.includes('graduate')
  },
  {
    id: 'doctorate',
    name: 'Doctorate',
    description: 'Earned a doctoral degree',
    emoji: '🧠',
    category: 'education',
    condition: (character) => character.education.completedStages.includes('doctorate')
  },

  // Career achievements
  {
    id: 'first_job',
    name: 'First Job',
    description: 'Got your first job',
    emoji: '💼',
    category: 'career',
    condition: (character) => character.job !== undefined
  },
  {
    id: 'high_salary',
    name: 'Six Figures',
    description: 'Earned a six-figure salary',
    emoji: '💰',
    category: 'career',
    condition: (character) => character.salary !== undefined && character.salary >= 100
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Reached an executive position',
    emoji: '👔',
    category: 'career',
    condition: (character) => character.jobLevel !== undefined && character.jobLevel >= 5
  },

  // Wealth achievements
  {
    id: 'first_million',
    name: 'Millionaire',
    description: 'Accumulated a net worth of $1 million',
    emoji: '💵',
    category: 'wealth',
    condition: (character) => character.wealth >= 1000
  },
  {
    id: 'multi_millionaire',
    name: 'Multi-Millionaire',
    description: 'Accumulated a net worth of $10 million',
    emoji: '🤑',
    category: 'wealth',
    condition: (character) => character.wealth >= 10000
  },
  {
    id: 'property_owner',
    name: 'Property Owner',
    description: 'Purchased your first property',
    emoji: '🏠',
    category: 'wealth',
    condition: (character) => character.assets.some(asset => asset.type === 'property')
  },

  // Relationship achievements
  {
    id: 'first_love',
    name: 'First Love',
    description: 'Experienced your first romantic relationship',
    emoji: '❤️',
    category: 'relationships',
    condition: (character) => character.relationshipStatus !== 'single'
  },
  {
    id: 'marriage',
    name: 'Married',
    description: 'Got married',
    emoji: '💍',
    category: 'relationships',
    condition: (character) => character.relationshipStatus === 'married'
  },
  {
    id: 'parent',
    name: 'Parent',
    description: 'Had your first child',
    emoji: '👶',
    category: 'relationships',
    condition: (character) => character.children && character.children.length > 0
  },
  {
    id: 'big_family',
    name: 'Big Family',
    description: 'Had 3 or more children',
    emoji: '👨‍👩‍👧‍👦',
    category: 'relationships',
    condition: (character) => character.children && character.children.length >= 3
  },

  // Health achievements
  {
    id: 'fitness_buff',
    name: 'Fitness Buff',
    description: 'Maintained excellent health for 10 consecutive years',
    emoji: '💪',
    category: 'health',
    condition: (character, eventHistory) => {
      // This is a simplified version - in reality would need to track health over time
      return character.health >= 90;
    }
  },

  // Special achievements
  {
    id: 'well_balanced',
    name: 'Well Balanced',
    description: 'Achieved high stats in all categories',
    emoji: '⚖️',
    category: 'special',
    condition: (character) => 
      character.health >= 80 && 
      character.happiness >= 80 && 
      character.smarts >= 80 && 
      character.looks >= 80 && 
      character.relationships >= 80
  },
  {
    id: 'celebrity',
    name: 'Celebrity',
    description: 'Became famous',
    emoji: '🌟',
    category: 'special',
    condition: (character) => character.fame >= 80
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
