
import { Character, EducationRecord, Asset } from '../types/game';
import { getZodiacSign } from './zodiacUtils';
import { generateInitialFamily } from './familyUtils';

export const generateRandomName = (): string => {
  const firstNames = [
    'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Cameron',
    'Quinn', 'Blake', 'Sage', 'River', 'Rowan', 'Phoenix', 'Emery', 'Skylar',
    'Jamie', 'Reese', 'Finley', 'Harper', 'Peyton', 'Kendall', 'Logan', 'Hayden'
  ];
  
  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
    'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White'
  ];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return `${firstName} ${lastName}`;
};

const randomizeInitialStats = () => {
  return {
    health: Math.floor(Math.random() * 31) + 70, // 70-100
    happiness: Math.floor(Math.random() * 51) + 30, // 30-80
    smarts: Math.floor(Math.random() * 71) + 20, // 20-90
    looks: Math.floor(Math.random() * 71) + 20, // 20-90
    wealth: Math.floor(Math.random() * 21), // 0-20
    relationships: Math.floor(Math.random() * 41) + 40 // 40-80
  };
};

export const createCharacter = (
  name: string,
  birthMonth: number,
  birthDay: number
): Character => {
  const zodiacSign = getZodiacSign(birthMonth, birthDay);
  const initialStats = randomizeInitialStats();
  const initialFamily = generateInitialFamily();
  
  const baseCharacter: Character = {
    id: `char_${Date.now()}`,
    name,
    birthMonth,
    birthDay,
    birthplace: 'United States',
    zodiacSign,
    health: initialStats.health,
    happiness: initialStats.happiness,
    smarts: initialStats.smarts,
    looks: initialStats.looks,
    wealth: initialStats.wealth,
    relationships: initialStats.relationships,
    salary: 0,
    jobLevel: 1,
    children: [],
    education: {
      currentStage: null,
      currentSchool: null,
      currentYear: 1,
      gpa: 3.0,
      grades: [],
      completedStages: [],
      major: null,
      testScores: [],
      disciplinaryActions: 0,
      achievements: [],
      dropouts: 0
    } as EducationRecord,
    assets: [] as Asset[],
    age: 0,
    familyMembers: initialFamily,
    lifeEvents: [],
    achievements: [],
    relationshipStatus: 'single' as const,
    fame: 0,
    customStats: {}
  };

  // Apply zodiac modifiers to the randomized stats
  if (zodiacSign) {
    switch (zodiacSign.name) {
      case 'Aries':
        baseCharacter.health = Math.min(100, baseCharacter.health + 5);
        baseCharacter.happiness = Math.max(0, baseCharacter.happiness - 5);
        break;
      case 'Taurus':
        baseCharacter.wealth = Math.min(100, baseCharacter.wealth + 10);
        baseCharacter.happiness = Math.min(100, baseCharacter.happiness + 5);
        break;
      case 'Gemini':
        baseCharacter.smarts = Math.min(100, baseCharacter.smarts + 5);
        baseCharacter.relationships = Math.min(100, baseCharacter.relationships + 5);
        break;
      case 'Cancer':
        baseCharacter.relationships = Math.min(100, baseCharacter.relationships + 10);
        baseCharacter.happiness = Math.min(100, baseCharacter.happiness + 5);
        break;
      case 'Leo':
        baseCharacter.looks = Math.min(100, baseCharacter.looks + 10);
        baseCharacter.happiness = Math.min(100, baseCharacter.happiness + 5);
        break;
      case 'Virgo':
        baseCharacter.smarts = Math.min(100, baseCharacter.smarts + 10);
        baseCharacter.health = Math.min(100, baseCharacter.health + 5);
        break;
      case 'Libra':
        baseCharacter.looks = Math.min(100, baseCharacter.looks + 5);
        baseCharacter.relationships = Math.min(100, baseCharacter.relationships + 5);
        break;
      case 'Scorpio':
        baseCharacter.health = Math.max(0, baseCharacter.health - 5);
        baseCharacter.relationships = Math.max(0, baseCharacter.relationships - 5);
        break;
      case 'Sagittarius':
        baseCharacter.happiness = Math.min(100, baseCharacter.happiness + 10);
        baseCharacter.looks = Math.min(100, baseCharacter.looks + 5);
        break;
      case 'Capricorn':
        baseCharacter.wealth = Math.min(100, baseCharacter.wealth + 5);
        baseCharacter.smarts = Math.min(100, baseCharacter.smarts + 5);
        break;
      case 'Aquarius':
        baseCharacter.smarts = Math.min(100, baseCharacter.smarts + 5);
        baseCharacter.happiness = Math.min(100, baseCharacter.happiness + 5);
        break;
      case 'Pisces':
        baseCharacter.happiness = Math.min(100, baseCharacter.happiness + 5);
        baseCharacter.relationships = Math.min(100, baseCharacter.relationships + 5);
        break;
      default:
        break;
    }
  }

  return baseCharacter;
};

export const ageCharacter = (character: Character): Character => {
  return {
    ...character,
    age: character.age + 1,
  };
};

export const applyStatEffects = (character: Character, effects: any): Character => {
  const updatedCharacter = { ...character };

  for (const key in effects) {
    if (effects.hasOwnProperty(key)) {
      const effectValue = effects[key];

      if (typeof effectValue === 'number') {
        // Apply number-based stat changes
        switch (key) {
          case 'health':
          case 'happiness':
          case 'smarts':
          case 'looks':
          case 'wealth':
          case 'relationships':
          case 'salary':
          case 'fame':
            (updatedCharacter as any)[key] = Math.max(0, Math.min(100, (character as any)[key] + effectValue));
            break;
          default:
            break;
        }
      } else if (typeof effectValue === 'string') {
        // Apply string-based stat changes (e.g., job)
        (updatedCharacter as any)[key] = effectValue;
      } else if (Array.isArray(effectValue)) {
        // Apply array-based stat changes (e.g., education)
        (updatedCharacter.education as any).completedStages = [
          ...(updatedCharacter.education as any).completedStages,
          ...effectValue
        ];
      }
    }
  }

  return updatedCharacter;
};
