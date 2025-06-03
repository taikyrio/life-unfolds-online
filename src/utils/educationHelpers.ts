
import { Character } from '../types/character';
import { educationStages } from '../data/educationData';

export const initializeEducationData = (character: Character): Character => {
  const updatedCharacter = { ...character };
  
  if (!updatedCharacter.education) {
    updatedCharacter.education = {
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
      dropouts: 0,
      levels: []
    };
  }
  
  return updatedCharacter;
};

export const isMandatoryEducationAge = (age: number): boolean => {
  return age >= 6 && age <= 16;
};

export const shouldBeInSchool = (character: Character): boolean => {
  if (!isMandatoryEducationAge(character.age)) return false;
  if (character.education?.currentStage) return false;

  if (character.age >= 6 && character.age <= 11) {
    return !character.education?.completedStages?.includes('elementary');
  }
  if (character.age >= 12 && character.age <= 14) {
    return character.education?.completedStages?.includes('elementary') && 
           !character.education?.completedStages?.includes('middle');
  }
  if (character.age >= 15 && character.age <= 16) {
    return character.education?.completedStages?.includes('middle') && 
           !character.education?.completedStages?.includes('high');
  }

  return false;
};

export const updateEducationLevel = (character: Character): Character => {
  const updatedCharacter = { ...character };
  const completedStages = updatedCharacter.education?.completedStages || [];
  
  if (completedStages.includes('elementary')) {
    updatedCharacter.educationLevel = 'Elementary School';
  }
  if (completedStages.includes('middle_school')) {
    updatedCharacter.educationLevel = 'Middle School';
  }
  if (completedStages.includes('high_school')) {
    updatedCharacter.educationLevel = 'High School';
  }
  if (completedStages.includes('university')) {
    updatedCharacter.educationLevel = 'University';
  }
  if (completedStages.includes('graduate')) {
    updatedCharacter.educationLevel = 'Graduate School';
  }
  
  return updatedCharacter;
};
