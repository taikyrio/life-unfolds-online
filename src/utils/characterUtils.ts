
import { Character } from '../types/character';
import { generateRandomName } from './gameUtils';
import { generateInitialFamily } from './familyUtils';

export { generateRandomName };

export const createCharacter = (name: string, birthMonth: number, birthDay: number): Character => {
  const familyData = generateInitialFamily();
  const fullName = `${name} ${familyData.familyName}`;
  
  return {
    id: 'player',
    name: fullName,
    age: 0,
    happiness: 50,
    health: 100,
    smarts: 50,
    looks: 50,
    wealth: 10,
    relationships: 50,
    birthMonth,
    birthDay,
    birthYear: new Date().getFullYear(),
    gender: Math.random() > 0.5 ? 'male' : 'female',
    job: undefined,
    jobId: undefined,
    salary: undefined,
    jobLevel: undefined,
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
    familyMembers: familyData.family,
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
    assets: [],
    achievements: [],
    children: [],
    fame: 0,
    lifeEvents: []
  };
};

export const getRandomizedNewCharacter = (
  options: { name: string; id: string },
  mode: string
): Character => {
  const character = createCharacter(options.name, Math.floor(Math.random() * 12) + 1, Math.floor(Math.random() * 28) + 1);
  return character;
};
