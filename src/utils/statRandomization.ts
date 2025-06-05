import { Character } from '../types/character';

export type RandomizationMode = 'realistic' | 'balanced' | 'extreme' | 'high';

export interface StatRandomizationOptions {
  mode: RandomizationMode;
  preserveAge?: boolean;
  preserveWealth?: boolean;
  preserveEducation?: boolean;
}

export const getStatRangeForMode = (mode: RandomizationMode): [number, number] => {
  switch (mode) {
    case 'realistic':
      return [20, 80];
    case 'balanced':
      return [30, 70];
    case 'extreme':
      return [0, 100];
    case 'high':
      return [50, 90];
    default:
      return [30, 70];
  }
};

export const randomizeStats = (
  character: Character,
  options: StatRandomizationOptions = { mode: 'realistic' }
): Character => {
  const [min, max] = getStatRangeForMode(options.mode);
  
  const getRandomStat = () => Math.floor(Math.random() * (max - min + 1)) + min;
  
  // Apply some correlation logic for more realistic results
  const baseHappiness = getRandomStat();
  const baseHealth = getRandomStat();
  const baseSmarts = getRandomStat();
  const baseLooks = getRandomStat();
  
  // Add some realistic correlations
  const healthInfluence = Math.max(0, Math.min(100, baseHealth + (Math.random() - 0.5) * 20));
  const adjustedHappiness = Math.max(0, Math.min(100, 
    baseHappiness + (healthInfluence > 60 ? 10 : -5) + (Math.random() - 0.5) * 15
  ));
  
  const wealthInfluence = options.preserveWealth ? character.wealth : 
    Math.max(0, Math.min(1000000, (baseSmarts + baseLooks) * 1000 + Math.random() * 50000));
  
  return {
    ...character,
    happiness: Math.round(adjustedHappiness),
    health: Math.round(healthInfluence),
    smarts: Math.round(baseSmarts),
    looks: Math.round(baseLooks),
    wealth: options.preserveWealth ? character.wealth : Math.round(wealthInfluence),
    relationships: Math.round(Math.max(0, Math.min(100, baseLooks + baseHappiness) / 2 + (Math.random() - 0.5) * 20))
  };
};

export const randomizeStatsWithSeed = (
  character: Character,
  seed: string,
  options: StatRandomizationOptions = { mode: 'realistic' }
): Character => {
  // Simple seeded random function for reproducible results
  let seedNum = 0;
  for (let i = 0; i < seed.length; i++) {
    seedNum += seed.charCodeAt(i);
  }
  
  const seededRandom = (min: number, max: number, offset: number = 0) => {
    const x = Math.sin(seedNum + offset) * 10000;
    const random = x - Math.floor(x);
    return Math.floor(random * (max - min + 1)) + min;
  };
  
  const [min, max] = getStatRangeForMode(options.mode);
  
  return {
    ...character,
    happiness: seededRandom(min, max, 1),
    health: seededRandom(min, max, 2),
    smarts: seededRandom(min, max, 3),
    looks: seededRandom(min, max, 4),
    relationships: seededRandom(0, 100, 5)
  };
};

export const getRandomizedNewCharacter = (
  baseCharacter: Partial<Character>,
  mode: RandomizationMode = 'realistic'
): Character => {
  const [min, max] = getStatRangeForMode(mode);
  
  const getRandomStat = () => Math.floor(Math.random() * (max - min + 1)) + min;
  
  const happiness = getRandomStat();
  const health = getRandomStat();
  const smarts = getRandomStat();
  const looks = getRandomStat();
  
  return {
    id: baseCharacter.id || 'player',
    name: baseCharacter.name || 'New Character',
    gender: baseCharacter.gender || 'male',
    age: 0,
    happiness,
    health,
    smarts,
    looks,
    wealth: Math.floor(Math.random() * 10000),
    relationships: Math.floor((looks + happiness) / 2 + (Math.random() - 0.5) * 20),
    relationshipStatus: 'single',
    familyMembers: baseCharacter.familyMembers || [],
    lifeEvents: [],
    achievements: [],
    assets: [],
    children: [],
    fame: 0,
    education: {
      currentStage: null,
      currentSchool: null,
      currentYear: 0,
      gpa: 0,
      grades: [],
      completedStages: [],
      major: undefined,
      testScores: [],
      disciplinaryActions: 0,
      achievements: [],
      dropouts: 0,
      levels: []
    },
    ...baseCharacter
  };
};

export const getStatDescription = (statName: string, value: number): string => {
  const ranges = [
    { min: 90, desc: 'Exceptional' },
    { min: 80, desc: 'Excellent' },
    { min: 70, desc: 'Good' },
    { min: 60, desc: 'Above Average' },
    { min: 50, desc: 'Average' },
    { min: 40, desc: 'Below Average' },
    { min: 30, desc: 'Poor' },
    { min: 20, desc: 'Very Poor' },
    { min: 0, desc: 'Terrible' }
  ];
  
  const range = ranges.find(r => value >= r.min);
  return range?.desc || 'Unknown';
};