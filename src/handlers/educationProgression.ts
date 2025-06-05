
import { Character } from '../types/game';

export const autoEnrollEducation = (
  character: Character,
  ageHistory: Record<number, string[]>,
  setAgeHistory: (history: Record<number, string[]>) => void
): Character => {
  let updatedCharacter = { ...character };
  
  // Auto-enroll logic based on age and completed stages
  if (character.age >= 6 && character.age <= 11 && 
      !character.education?.currentStage && 
      !character.education?.completedStages?.includes('elementary')) {
    updatedCharacter.education = {
      ...updatedCharacter.education,
      currentStage: 'elementary',
      currentSchool: 'public_elementary',
      currentYear: 1,
      gpa: 2.0 + (character.smarts / 50)
    };
  }
  
  return updatedCharacter;
};
