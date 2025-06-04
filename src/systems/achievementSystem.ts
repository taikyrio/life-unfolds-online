
import { Character } from '../types/game';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: 'life' | 'career' | 'education' | 'wealth' | 'relationships' | 'health' | 'special' | 'criminal' | 'fame';
  condition: (character: Character, eventHistory: string[]) => boolean;
  hidden?: boolean;
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

  // Wealth achievements
  {
    id: 'first_thousand',
    name: 'First Grand',
    description: 'Earned your first $1,000',
    emoji: '💰',
    category: 'wealth',
    condition: (character) => character.wealth >= 1000
  },
  {
    id: 'millionaire',
    name: 'Millionaire',
    description: 'Accumulated $1,000,000 in wealth',
    emoji: '💎',
    category: 'wealth',
    condition: (character) => character.wealth >= 1000000
  },
  {
    id: 'rags_to_riches',
    name: 'Rags to Riches',
    description: 'Started poor and became a millionaire',
    emoji: '📈',
    category: 'wealth',
    condition: (character, eventHistory) => {
      const hadLowWealth = eventHistory.some(event => event.includes('poor') || event.includes('broke'));
      return character.wealth >= 1000000 && hadLowWealth;
    }
  },

  // Education achievements
  {
    id: 'high_school_graduate',
    name: 'High School Graduate',
    description: 'Graduated from high school',
    emoji: '🎓',
    category: 'education',
    condition: (character) => character.age >= 15 && (character.education?.completedStages?.includes('high') || false)
  },
  {
    id: 'college_graduate',
    name: 'College Graduate',
    description: 'Earned a college degree',
    emoji: '🏫',
    category: 'education',
    condition: (character) => character.age >= 18 && (character.education?.completedStages?.includes('university') || false)
  },
  {
    id: 'academic_excellence',
    name: 'Academic Excellence',
    description: 'Graduated with honors from university',
    emoji: '👨‍🎓',
    category: 'education',
    condition: (character, eventHistory) => {
      const hasGraduated = character.education?.completedStages?.includes('university') || false;
      const hasHonors = eventHistory.some(event => event.includes('honors') || event.includes('summa cum laude'));
      return hasGraduated && hasHonors;sGraduated && hasHonors;
    }
  },

  // Career achievements
  {
    id: 'first_job',
    name: 'First Job',
    description: 'Got your first job',
    emoji: '💼',
    category: 'career',
    condition: (character) => character.job && character.job !== 'Unemployed' && character.job !== ''
  },
  {
    id: 'career_climber',
    name: 'Career Climber',
    description: 'Reached executive level in your career',
    emoji: '🚀',
    category: 'career',
    condition: (character) => character.age >= 18 && character.jobLevel >= 8
  },

  // Relationship achievements
  {
    id: 'first_love',
    name: 'First Love',
    description: 'Found your first romantic relationship',
    emoji: '💕',
    category: 'relationships',
    condition: (character) => character.age >= 13 && character.relationshipStatus !== 'single'
  },
  {
    id: 'married',
    name: 'Married Life',
    description: 'Got married',
    emoji: '💒',
    category: 'relationships',
    condition: (character) => character.age >= 16 && character.relationshipStatus === 'married'
  },
  {
    id: 'social_butterfly',
    name: 'Social Butterfly',
    description: 'Maintained high relationships throughout life',
    emoji: '🦋',
    category: 'relationships',
    condition: (character) => character.relationships >= 80 && character.age >= 25
  },

  // Health achievements
  {
    id: 'fitness_enthusiast',
    name: 'Fitness Enthusiast',
    description: 'Maintained excellent health',
    emoji: '💪',
    category: 'health',
    condition: (character) => character.health >= 90 && character.age >= 30
  },
  {
    id: 'survivor',
    name: 'Survivor',
    description: 'Overcame a serious health condition',
    emoji: '🏥',
    category: 'health',
    condition: (character, eventHistory) => {
      const hadHealthIssue = eventHistory.some(event => 
        event.includes('diagnosed') || event.includes('surgery') || event.includes('hospital')
      );
      return hadHealthIssue && character.health >= 70;
    }
  },

  // Special achievements
  {
    id: 'perfect_stats',
    name: 'Perfectionist',
    description: 'Achieved 100 in all major stats',
    emoji: '⭐',
    category: 'special',
    condition: (character) => 
      character.health === 100 && 
      character.happiness === 100 && 
      character.smarts === 100 && 
      character.looks === 100
  },
  {
    id: 'world_traveler',
    name: 'World Traveler',
    description: 'Lived in multiple countries',
    emoji: '🌍',
    category: 'special',
    condition: (character, eventHistory) => {
      const travelEvents = eventHistory.filter(event => 
        event.includes('moved to') || event.includes('immigrated')
      );
      return travelEvents.length >= 3;
    }
  },

  // Criminal achievements (for Criminal DLC)
  {
    id: 'first_crime',
    name: 'Life of Crime',
    description: 'Committed your first crime',
    emoji: '🚨',
    category: 'criminal',
    condition: (character) => character.criminalRecord === true,
    hidden: true
  },
  {
    id: 'criminal_mastermind',
    name: 'Criminal Mastermind',
    description: 'Built a criminal empire without getting caught',
    emoji: '👑',
    category: 'criminal',
    condition: (character, eventHistory) => {
      const crimeEvents = eventHistory.filter(event => event.includes('crime') || event.includes('heist'));
      const caughtEvents = eventHistory.filter(event => event.includes('arrested') || event.includes('jail'));
      return crimeEvents.length >= 10 && caughtEvents.length === 0;
    },
    hidden: true
  },

  // Fame achievements
  {
    id: 'famous',
    name: 'Famous',
    description: 'Achieved celebrity status',
    emoji: '⭐',
    category: 'fame',
    condition: (character) => character.fame >= 80
  },
  {
    id: 'household_name',
    name: 'Household Name',
    description: 'Became a global celebrity',
    emoji: '🌟',
    category: 'fame',
    condition: (character) => character.fame >= 95
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

export const getAchievementsByCategory = (category: string): Achievement[] => {
  return achievements.filter(achievement => achievement.category === category);
};

export const getTotalAchievements = (): number => {
  return achievements.length;
};

export { achievements };
