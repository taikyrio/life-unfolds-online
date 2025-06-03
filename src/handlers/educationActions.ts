
import { Character } from '../types/character';
import { educationStages, educationEvents, getAvailableSchools, universityMajors } from '../data/educationData';
import { initializeEducationData, isMandatoryEducationAge } from '../utils/educationHelpers';

export const handleEducationEnrollment = (
  character: Character,
  data: { stageId: string; schoolId: string }
): { character: Character; message: string } => {
  let updatedCharacter = initializeEducationData(character);
  
  const { stageId, schoolId } = data;
  const stage = educationStages.find(s => s.id === stageId);
  const availableSchools = getAvailableSchools(stageId, updatedCharacter);
  const school = availableSchools.find(s => s.id === schoolId);

  if (!stage || !school) {
    return { character: updatedCharacter, message: 'Invalid school or stage selection.' };
  }

  if (updatedCharacter.age < stage.minAge || updatedCharacter.age > stage.maxAge) {
    return { character: updatedCharacter, message: `You are not the right age for ${stage.name}.` };
  }

  if (updatedCharacter.wealth < school.cost * 10) {
    return { character: updatedCharacter, message: `You can't afford ${school.name}. You need $${school.cost * 10}k.` };
  }

  updatedCharacter.education.currentStage = stageId;
  updatedCharacter.education.currentSchool = schoolId;
  updatedCharacter.education.currentYear = 1;
  updatedCharacter.education.gpa = 2.0 + (updatedCharacter.smarts / 50);
  updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - (school.cost * 10));

  return { 
    character: updatedCharacter, 
    message: `Enrolled in ${school.name} for ${stage.name}!` 
  };
};

export const handleStudyHarder = (character: Character): { character: Character; message: string } => {
  const updatedCharacter = initializeEducationData(character);
  
  if (!updatedCharacter.education.currentStage) {
    return { character: updatedCharacter, message: 'You are not currently enrolled in school.' };
  }

  const gpaIncrease = 0.1 + (Math.random() * 0.2);
  updatedCharacter.education.gpa = Math.min(4.0, updatedCharacter.education.gpa + gpaIncrease);
  updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 5);
  updatedCharacter.happiness = Math.max(0, updatedCharacter.happiness - 10);

  return { 
    character: updatedCharacter, 
    message: `You studied harder and your GPA improved to ${updatedCharacter.education.gpa.toFixed(2)}!` 
  };
};

export const handleSkipSchool = (character: Character): { character: Character; message: string } => {
  const updatedCharacter = initializeEducationData(character);
  
  if (!updatedCharacter.education.currentStage) {
    return { character: updatedCharacter, message: 'You are not currently enrolled in school.' };
  }

  updatedCharacter.education.gpa = Math.max(0, updatedCharacter.education.gpa - 0.15);
  updatedCharacter.education.disciplinaryActions += 1;
  updatedCharacter.happiness += 15;
  updatedCharacter.smarts = Math.max(0, updatedCharacter.smarts - 3);

  return { 
    character: updatedCharacter, 
    message: 'You skipped school and had fun, but your grades suffered.' 
  };
};

export const handleGetTutoring = (character: Character): { character: Character; message: string } => {
  const updatedCharacter = initializeEducationData(character);
  
  if (!updatedCharacter.education.currentStage) {
    return { character: updatedCharacter, message: 'You are not currently enrolled in school.' };
  }

  if (updatedCharacter.wealth < 50) {
    return { character: updatedCharacter, message: 'You can\'t afford tutoring right now.' };
  }

  updatedCharacter.wealth -= 50;
  updatedCharacter.education.gpa = Math.min(4.0, updatedCharacter.education.gpa + 0.2);
  updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 8);

  return { 
    character: updatedCharacter, 
    message: 'Tutoring helped improve your academic performance!' 
  };
};

export const handleDropOut = (character: Character): { character: Character; message: string } => {
  const updatedCharacter = initializeEducationData(character);
  
  if (!updatedCharacter.education.currentStage) {
    return { character: updatedCharacter, message: 'You are not currently enrolled in school.' };
  }

  if (isMandatoryEducationAge(updatedCharacter.age)) {
    return { character: updatedCharacter, message: 'You cannot drop out of school before age 16. Education is mandatory!' };
  }

  const currentStage = updatedCharacter.education.currentStage;
  updatedCharacter.education.currentStage = null;
  updatedCharacter.education.currentSchool = null;
  updatedCharacter.education.dropouts += 1;
  updatedCharacter.happiness += 20;

  return { 
    character: updatedCharacter, 
    message: `You dropped out of ${currentStage}. Your family is disappointed.` 
  };
};
