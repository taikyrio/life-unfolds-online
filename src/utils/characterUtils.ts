
import { Character, ZodiacSign } from '../types/game';
import { generateInitialFamily } from './familyUtils';
import { generateZodiacSign } from './zodiacUtils';

const firstNames = [
  'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Cameron', 'Quinn', 'Sage', 'River',
  'Emma', 'Olivia', 'Ava', 'Isabella', 'Sophia', 'Charlotte', 'Mia', 'Amelia', 'Harper', 'Evelyn',
  'Liam', 'Noah', 'Oliver', 'Elijah', 'James', 'William', 'Benjamin', 'Lucas', 'Henry', 'Alexander',
  'Aria', 'Luna', 'Grace', 'Chloe', 'Penelope', 'Layla', 'Riley', 'Zoey', 'Nora', 'Lily',
  'Mason', 'Ethan', 'Michael', 'Daniel', 'Jacob', 'Logan', 'Jackson', 'Levi', 'Sebastian', 'Mateo',
  'Zoe', 'Elena', 'Claire', 'Maya', 'Leah', 'Madeline', 'Kylie', 'Audrey', 'Anna', 'Sarah'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'
];

const birthplaces = [
  'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ',
  'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA',
  'Austin, TX', 'Jacksonville, FL', 'Fort Worth, TX', 'Columbus, OH', 'Charlotte, NC',
  'San Francisco, CA', 'Indianapolis, IN', 'Seattle, WA', 'Denver, CO', 'Washington, DC',
  'Boston, MA', 'El Paso, TX', 'Nashville, TN', 'Detroit, MI', 'Oklahoma City, OK',
  'Portland, OR', 'Las Vegas, NV', 'Memphis, TN', 'Louisville, KY', 'Baltimore, MD'
];

export const getLifeStage = (age: number): string => {
  if (age < 3) return 'Baby';
  if (age < 6) return 'Toddler';
  if (age < 13) return 'Child';
  if (age < 18) return 'Teen';
  if (age < 30) return 'Young Adult';
  if (age < 50) return 'Adult';
  if (age < 65) return 'Middle-aged';
  return 'Senior';
};

export const getStatEmoji = (stat: string, value: number): string => {
  const getLevel = (val: number) => {
    if (val >= 90) return 'excellent';
    if (val >= 70) return 'good';
    if (val >= 50) return 'average';
    if (val >= 30) return 'poor';
    return 'very_poor';
  };

  const level = getLevel(value);
  
  const emojiMap: Record<string, Record<string, string>> = {
    health: {
      excellent: '💪',
      good: '😊',
      average: '😐',
      poor: '😷',
      very_poor: '🤒'
    },
    happiness: {
      excellent: '😄',
      good: '😊',
      average: '😐',
      poor: '😔',
      very_poor: '😭'
    },
    smarts: {
      excellent: '🧠',
      good: '🤓',
      average: '😐',
      poor: '😕',
      very_poor: '🤪'
    },
    looks: {
      excellent: '😍',
      good: '😊',
      average: '😐',
      poor: '😕',
      very_poor: '😰'
    },
    wealth: {
      excellent: '💰',
      good: '💵',
      average: '💳',
      poor: '🪙',
      very_poor: '📉'
    },
    relationships: {
      excellent: '💕',
      good: '😊',
      average: '😐',
      poor: '😔',
      very_poor: '💔'
    }
  };

  return emojiMap[stat]?.[level] || '😐';
};

export const generateRandomName = (): string => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
};

export const generateRandomStats = () => {
  const zodiacSign = generateZodiacSign();
  const birthplace = birthplaces[Math.floor(Math.random() * birthplaces.length)];
  const birthWeight = 5.5 + Math.random() * 4; // 5.5 to 9.5 lbs
  const premature = Math.random() < 0.1; // 10% chance of being premature
  const birthMonth = Math.floor(Math.random() * 12) + 1;
  const birthDay = Math.floor(Math.random() * 28) + 1;

  // Base stats influenced by zodiac
  let baseStats = {
    health: Math.floor(Math.random() * 40) + 60, // 60-100
    happiness: Math.floor(Math.random() * 40) + 60, // 60-100
    smarts: Math.floor(Math.random() * 40) + 60, // 60-100
    looks: Math.floor(Math.random() * 40) + 60, // 60-100
    wealth: 0,
    relationships: Math.floor(Math.random() * 30) + 20, // 20-50
    salary: 0,
    jobLevel: 0,
    children: [] as string[],
    education: {
      currentStage: null,
      currentSchool: null,
      currentYear: 0,
      gpa: 0,
      grades: [],
      completedStages: [],
      major: null,
      testScores: [],
      disciplinaryActions: 0,
      achievements: [],
      dropouts: 0
    },
    assets: [] as { name: string; type: string; value: number }[],
    age: 0,
    year: new Date().getFullYear(),
    zodiacSign,
    birthMonth,
    birthDay,
    pets: [] as { name: string; type: string; age: number; health: number }[],
    birthplace,
    birthWeight,
    premature,
    birthComplications: false,
    criminalRecord: {
      arrests: 0,
      convictions: 0,
      prisonTime: 0,
      crimes: [],
      notoriety: 0
    },
    relationshipStatus: 'single' as const,
    nationality: 'American',
    fame: 0
  };

  // Apply zodiac modifiers
  if (zodiacSign.element === 'fire') {
    baseStats.happiness += 10;
    baseStats.relationships += 5;
  } else if (zodiacSign.element === 'earth') {
    baseStats.health += 10;
    baseStats.smarts += 5;
  } else if (zodiacSign.element === 'air') {
    baseStats.smarts += 10;
    baseStats.relationships += 5;
  } else if (zodiacSign.element === 'water') {
    baseStats.health += 5;
    baseStats.happiness += 10;
  }

  // Cap stats at 100
  baseStats.health = Math.min(100, baseStats.health);
  baseStats.happiness = Math.min(100, baseStats.happiness);
  baseStats.smarts = Math.min(100, baseStats.smarts);
  baseStats.looks = Math.min(100, baseStats.looks);
  baseStats.relationships = Math.min(100, baseStats.relationships);

  return baseStats;
};

export const createCharacter = (): Character => {
  const stats = generateRandomStats();
  const name = generateRandomName();
  
  // Generate family members at birth
  const familyMembers = generateInitialFamily();
  
  return {
    id: Math.random().toString(36).substring(2, 15),
    name,
    familyMembers,
    lifeEvents: [],
    achievements: [],
    children: [],
    fame: 0,
    customStats: {},
    ...stats
  };
};

export const formatSalary = (salary: number): string => {
  if (salary >= 1000) {
    return `$${(salary / 1000).toFixed(0)}K`;
  }
  return `$${salary}`;
};

export const getStatColor = (value: number): string => {
  if (value >= 80) return 'text-green-600';
  if (value >= 60) return 'text-yellow-600';
  if (value >= 40) return 'text-orange-600';
  return 'text-red-600';
};

export const applyStatEffects = (character: Character, effects: any): Character => {
  const updatedCharacter = { ...character };
  
  Object.keys(effects).forEach(key => {
    if (key in updatedCharacter) {
      const currentValue = (updatedCharacter as any)[key];
      const effect = effects[key];
      
      if (typeof currentValue === 'number' && typeof effect === 'number') {
        (updatedCharacter as any)[key] = Math.max(0, Math.min(100, currentValue + effect));
      } else if (effect !== undefined) {
        (updatedCharacter as any)[key] = effect;
      }
    }
  });
  
  return updatedCharacter;
};

export const isGameOver = (character: Character): { gameOver: boolean; reason?: string } => {
  if (character.health <= 0) {
    return { gameOver: true, reason: 'Your health reached zero.' };
  }
  if (character.age >= 120) {
    return { gameOver: true, reason: 'You lived to be 120 years old!' };
  }
  return { gameOver: false };
};
