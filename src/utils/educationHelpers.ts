
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
        major: undefined,
        testScores: [],
        disciplinaryActions: 0,
        achievements: [],
        dropouts: 0,
        levels: []
      }
    };
  }
  return character;
};

export const isMandatoryEducationAge = (age: number): boolean => {
  return age >= 6 && age <= 16;
};
