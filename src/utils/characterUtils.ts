import { Character, EducationRecord, Asset } from '../types/game';
import { getZodiacSign } from './zodiacUtils';
import { generateInitialFamily } from './familyUtils';
import { initializeMoneyState } from './moneySystem';

export const generateRandomName = (): string => {
  const firstNames = [
    'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Cameron',
    'Quinn', 'Blake', 'Sage', 'River', 'Rowan', 'Phoenix', 'Emery', 'Skylar',
    'Jamie', 'Reese', 'Finley', 'Harper', 'Peyton', 'Kendall', 'Logan', 'Hayden',
    'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason',
    'Isabella', 'William', 'Mia', 'James', 'Charlotte', 'Benjamin', 'Amelia', 'Lucas'
  ];

  const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas',
    'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White',
    'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young'
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
    wealth: 0, // Start with $0
    relationships: Math.floor(Math.random() * 41) + 40 // 40-80
  };
};

export const createCharacter = (
  name: string,
  birthMonth: number,
  birthDay: number,
  gender: 'male' | 'female' = 'male'
): Character => {
  const zodiacSign = getZodiacSign(birthMonth, birthDay);
  const initialStats = randomizeInitialStats();
  const playerLastName = name.split(' ')[1] || 'Smith';
  const initialFamily = generateInitialFamily(playerLastName);

  const baseCharacter: Character = {
    id: `char_${Date.now()}`,
    name,
    gender,
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
      major: undefined,
      testScores: [],
      disciplinaryActions: 0,
      achievements: [],
      dropouts: 0,
      levels: []
    } as EducationRecord,
    assets: [] as Asset[],
    age: 0,
    familyMembers: initialFamily,
    lifeEvents: [],
    achievements: [],
    relationshipStatus: 'single' as const,
    fame: 0,
    customStats: {},
    // Add money state for dynamic financial system
    moneyState: initializeMoneyState(),
    // Add job performance tracking
    jobPerformance: {
      currentLevel: 1,
      yearsAtLevel: 0,
      totalExperience: 0,
      performanceRating: 50,
      promotionEligible: false
    }
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

const getRandomizedNewCharacter = (): Character => {
  const birthMonth = Math.floor(Math.random() * 12) + 1;
  const birthDay = Math.floor(Math.random() * 28) + 1;
  const randomName = generateRandomName();
  const gender = Math.random() > 0.5 ? 'male' : 'female';

  return createCharacter(randomName, birthMonth, birthDay, gender);
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

export { getRandomizedNewCharacter };

