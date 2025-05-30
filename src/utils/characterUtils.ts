
import { Character, EducationRecord, Asset } from '../types/game';
import { getZodiacSign } from './zodiacUtils';

export const createCharacter = (
  name: string,
  birthMonth: number,
  birthDay: number
): Character => {
  const zodiacSign = getZodiacSign(birthMonth, birthDay);
  
  const baseCharacter: Character = {
    id: `char_${Date.now()}`,
    name,
    birthMonth,
    birthDay,
    birthplace: 'United States',
    zodiacSign,
    health: 100,
    happiness: 50,
    smarts: 50,
    looks: 50,
    wealth: 0,
    relationships: 50,
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
    familyMembers: [],
    lifeEvents: [],
    achievements: [],
    relationshipStatus: 'single' as const,
    nationality: 'American',
    fame: 0,
    customStats: {}
  };

  // Apply zodiac modifiers
  if (zodiacSign) {
    switch (zodiacSign.name) {
      case 'Aries':
        baseCharacter.health += 5;
        baseCharacter.happiness -= 5;
        break;
      case 'Taurus':
        baseCharacter.wealth += 10;
        baseCharacter.happiness += 5;
        break;
      case 'Gemini':
        baseCharacter.smarts += 5;
        baseCharacter.relationships += 5;
        break;
      case 'Cancer':
        baseCharacter.relationships += 10;
        baseCharacter.happiness += 5;
        break;
      case 'Leo':
        baseCharacter.looks += 10;
        baseCharacter.happiness += 5;
        break;
      case 'Virgo':
        baseCharacter.smarts += 10;
        baseCharacter.health += 5;
        break;
      case 'Libra':
        baseCharacter.looks += 5;
        baseCharacter.relationships += 5;
        break;
      case 'Scorpio':
        baseCharacter.health -= 5;
        baseCharacter.relationships -= 5;
        break;
      case 'Sagittarius':
        baseCharacter.happiness += 10;
        baseCharacter.looks += 5;
        break;
      case 'Capricorn':
        baseCharacter.wealth += 5;
        baseCharacter.smarts += 5;
        break;
      case 'Aquarius':
        baseCharacter.smarts += 5;
        baseCharacter.happiness += 5;
        break;
      case 'Pisces':
        baseCharacter.happiness += 5;
        baseCharacter.relationships += 5;
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
