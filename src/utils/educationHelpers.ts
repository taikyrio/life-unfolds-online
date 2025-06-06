import { Character } from '../types/game';

export const initializeEducationData = (character: Character): Character => {
  if (!character.education) {
    return {
      ...character,
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
      }
    };
  }
  return character;
};

export const calculateEducationLevel = (completedStages: string[]): string => {
  if (completedStages.includes('college')) return 'University';
  if (completedStages.includes('high')) return 'High School';
  if (completedStages.includes('middle')) return 'Middle School';
  if (completedStages.includes('elementary')) return 'Elementary';
  return 'None';
};