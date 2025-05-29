
import { Character } from '../types/game';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: 'life' | 'career' | 'relationship' | 'wealth' | 'health' | 'education' | 'family';
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary';
  condition: (character: Character, eventHistory: string[]) => boolean;
}

export const achievements: Achievement[] = [
  // Life Achievements
  {
    id: 'first_word',
    name: 'First Words',
    description: 'Spoke your first word',
    emoji: '👶',
    category: 'life',
    rarity: 'common',
    condition: (character, history) => history.some(event => event.includes('first word'))
  },
  {
    id: 'centenarian',
    name: 'Centenarian',
    description: 'Lived to be 100 years old',
    emoji: '🎂',
    category: 'life',
    rarity: 'legendary',
    condition: (character) => character.age >= 100
  },
  {
    id: 'perfect_stats',
    name: 'Perfect Being',
    description: 'Achieved 100 in all stats',
    emoji: '⭐',
    category: 'life',
    rarity: 'legendary',
    condition: (character) => 
      character.health >= 100 && 
      character.happiness >= 100 && 
      character.smarts >= 100 && 
      character.looks >= 100 && 
      character.relationships >= 100
  },

  // Career Achievements
  {
    id: 'first_job',
    name: 'Working Person',
    description: 'Got your first job',
    emoji: '💼',
    category: 'career',
    rarity: 'common',
    condition: (character) => !!character.job
  },
  {
    id: 'millionaire',
    name: 'Millionaire',
    description: 'Accumulated $1,000,000 in wealth',
    emoji: '💰',
    category: 'wealth',
    rarity: 'rare',
    condition: (character) => character.wealth >= 1000000
  },
  {
    id: 'workaholic',
    name: 'Workaholic',
    description: 'Worked past retirement age',
    emoji: '🏢',
    category: 'career',
    rarity: 'uncommon',
    condition: (character) => character.age >= 65 && !!character.job
  },

  // Relationship Achievements
  {
    id: 'first_love',
    name: 'First Love',
    description: 'Found your first romantic relationship',
    emoji: '💕',
    category: 'relationship',
    rarity: 'common',
    condition: (character) => character.familyMembers.some(m => 
      m.relationship === 'lover' || m.relationship === 'spouse'
    )
  },
  {
    id: 'golden_anniversary',
    name: 'Golden Anniversary',
    description: 'Stayed married for 50+ years',
    emoji: '💍',
    category: 'relationship',
    rarity: 'rare',
    condition: (character, history) => {
      const marriageAge = history.findIndex(event => event.includes('got married'));
      return marriageAge >= 0 && character.age - marriageAge >= 50 && 
             character.relationshipStatus === 'married';
    }
  },
  {
    id: 'social_butterfly',
    name: 'Social Butterfly',
    description: 'Have 10+ family members and friends',
    emoji: '🦋',
    category: 'relationship',
    rarity: 'uncommon',
    condition: (character) => character.familyMembers.length >= 10
  },

  // Family Achievements
  {
    id: 'parent',
    name: 'New Parent',
    description: 'Had your first child',
    emoji: '👶',
    category: 'family',
    rarity: 'common',
    condition: (character) => character.children.length > 0
  },
  {
    id: 'big_family',
    name: 'Big Family',
    description: 'Had 5+ children',
    emoji: '👨‍👩‍👧‍👦',
    category: 'family',
    rarity: 'uncommon',
    condition: (character) => character.children.length >= 5
  },
  {
    id: 'grandparent',
    name: 'Grandparent',
    description: 'Became a grandparent',
    emoji: '👴',
    category: 'family',
    rarity: 'common',
    condition: (character, history) => history.some(event => event.includes('grandchild'))
  },

  // Education Achievements
  {
    id: 'graduate',
    name: 'Graduate',
    description: 'Graduated from high school',
    emoji: '🎓',
    category: 'education',
    rarity: 'common',
    condition: (character) => character.education.includes('High')
  },
  {
    id: 'scholar',
    name: 'Scholar',
    description: 'Completed university education',
    emoji: '📚',
    category: 'education',
    rarity: 'uncommon',
    condition: (character) => character.education.includes('University')
  },
  {
    id: 'genius',
    name: 'Genius',
    description: 'Achieved 100 smarts',
    emoji: '🧠',
    category: 'education',
    rarity: 'rare',
    condition: (character) => character.smarts >= 100
  },

  // Health Achievements
  {
    id: 'fitness_enthusiast',
    name: 'Fitness Enthusiast',
    description: 'Maintained 100 health for 10+ years',
    emoji: '💪',
    category: 'health',
    rarity: 'uncommon',
    condition: (character, history) => {
      const recentHealth = history.slice(-10).every(event => 
        !event.includes('health declined') && !event.includes('got sick')
      );
      return character.health >= 95 && recentHealth;
    }
  },
  {
    id: 'survivor',
    name: 'Survivor',
    description: 'Survived a serious illness',
    emoji: '🏥',
    category: 'health',
    rarity: 'uncommon',
    condition: (character, history) => history.some(event => 
      event.includes('cancer') || event.includes('heart disease')
    )
  }
];

export const checkAchievements = (
  character: Character, 
  eventHistory: string[], 
  currentAchievements: string[]
): Achievement[] => {
  const newAchievements: Achievement[] = [];
  
  for (const achievement of achievements) {
    if (!currentAchievements.includes(achievement.id) && 
        achievement.condition(character, eventHistory)) {
      newAchievements.push(achievement);
    }
  }
  
  return newAchievements;
};

export const getAchievementsByCategory = (achievements: string[]): Record<string, Achievement[]> => {
  const earnedAchievements = achievements.map(id => 
    achievementList.find(a => a.id === id)
  ).filter(Boolean) as Achievement[];
  
  return earnedAchievements.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = [];
    }
    acc[achievement.category].push(achievement);
    return acc;
  }, {} as Record<string, Achievement[]>);
};

const achievementList = achievements;
