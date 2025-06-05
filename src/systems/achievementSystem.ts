import { Character } from '../types/game';

interface Achievement {
  id: string;
  title: string;
  description: string;
  criteria: (character: Character) => boolean;
  reward?: (character: Character) => void;
}

export const achievements: Achievement[] = [
  {
    id: 'first_job',
    title: 'First Job',
    description: 'Landed your first job!',
    criteria: (character: Character) => !!character.job
  },
  {
    id: 'reach_18',
    title: 'Adulting Begins',
    description: 'Reached adulthood at 18!',
    criteria: (character: Character) => character.age >= 18
  },
  {
    id: 'get_married',
    title: 'Tied the Knot',
    description: 'Got married and started a new chapter!',
    criteria: (character: Character) => character.relationshipStatus === 'married'
  },
  {
    id: 'buy_house',
    title: 'Home Sweet Home',
    description: 'Bought your first house!',
    criteria: (character: Character) => character.assets.some(asset => asset.type === 'house')
  },
  {
    id: 'college_graduate',
    title: 'College Graduate',
    description: 'Graduated from college!',
    criteria: (character: Character) => character.education?.completedStages?.includes('university') || false
  },
  {
    id: 'life_of_crime',
    title: 'Life of Crime',
    description: 'Developed a criminal record.',
    criteria: (character: Character) => character.criminalRecord && 
      (character.criminalRecord.arrests > 0 || character.criminalRecord.convictions > 0)
  },
  {
    id: 'become_famous',
    title: 'Stairway to Stardom',
    description: 'Became famous and everyone knows your name!',
    criteria: (character: Character) => character.fame >= 80
  },
  {
    id: 'reach_100k',
    title: 'Centumvir',
    description: 'Accumulated a net worth of $100,000!',
    criteria: (character: Character) => character.wealth >= 100000
  },
  {
    id: 'reach_1m',
    title: 'Millionaire',
    description: 'Became a millionaire!',
    criteria: (character: Character) => character.wealth >= 1000000
  },
  {
    id: 'reach_10m',
    title: 'Deca-Millionaire',
    description: 'Accumulated a net worth of $10,000,000!',
    criteria: (character: Character) => character.wealth >= 10000000
  },
  {
    id: 'reach_100m',
    title: 'Centi-Millionaire',
    description: 'Accumulated a net worth of $100,000,000!',
    criteria: (character: Character) => character.wealth >= 100000000
  },
  {
    id: 'reach_1b',
    title: 'Billionaire',
    description: 'Became a billionaire!',
    criteria: (character: Character) => character.wealth >= 1000000000
  },
  {
    id: 'lived_full_life',
    title: 'Lived a Full Life',
    description: 'Lived to be 100 years old.',
    criteria: (character: Character) => character.age >= 100
  }
];

export const checkAchievements = (character: Character): string[] => {
  const newAchievements: string[] = [];

  const hasGraduated = character.education?.completedStages?.includes('university') || false;
  if (hasGraduated && !character.achievements.includes('College Graduate')) {
    newAchievements.push('College Graduate');
  }

  const hasCriminalRecord = character.criminalRecord && 
    (character.criminalRecord.arrests > 0 || character.criminalRecord.convictions > 0);
  
  if (hasCriminalRecord && !character.achievements.includes('Life of Crime')) {
    newAchievements.push('Life of Crime');
  }

  achievements.forEach(achievement => {
    if (!character.achievements.includes(achievement.id) && achievement.criteria(character)) {
      newAchievements.push(achievement.title);
      if (achievement.reward) {
        achievement.reward(character);
      }
    }
  });

  return newAchievements;
};

export const applyAchievements = (character: Character, newAchievements: string[]): Character => {
  const updatedCharacter: Character = {
    ...character,
    achievements: [...character.achievements, ...newAchievements]
  };
  return updatedCharacter;
};
