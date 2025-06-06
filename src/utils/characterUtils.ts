
import { Character } from '../types/character';
import { generateRandomName } from './gameUtils';

export { generateRandomName };

export const createCharacter = (name: string, birthMonth: number, birthDay: number): Character => {
  return {
    id: 'player',
    name,
    age: 0,
    happiness: 50,
    health: 100,
    smarts: 50,
    looks: 50,
    wealth: 10,
    relationships: 50,
    lifeStage: 'Baby',
    birthMonth,
    birthDay,
    birthYear: new Date().getFullYear(),
    gender: Math.random() > 0.5 ? 'male' : 'female',
    country: 'United States',
    city: 'New York',
    job: null,
    education: {
      currentStage: null,
      currentSchool: null,
      currentYear: 0,
      gpa: 0,
      completedStages: [],
      achievements: [],
      testScores: [],
      disciplinaryActions: 0,
      dropouts: 0,
      levels: [],
      grades: []
    },
    currentEducation: null,
    familyMembers: [],
    criminalRecord: {
      arrests: 0,
      convictions: 0,
      prisonTime: 0,
      crimes: [],
      notoriety: 0,
      totalSentence: 0,
      currentlyIncarcerated: false,
      charges: [],
      timeServed: 0,
      isIncarcerated: false
    },
    legalCases: [],
    assets: [],
    flags: [],
    achievements: []
  };
};

export const getRandomizedNewCharacter = (
  options: { name: string; id: string },
  mode: string
): Character => {
  return createCharacter(options.name, Math.floor(Math.random() * 12) + 1, Math.floor(Math.random() * 28) + 1);
};
