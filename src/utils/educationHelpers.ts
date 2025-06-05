
import { Character } from '../types/game';
import { EducationRecord } from '../types/education';

export const initializeEducationData = (character: Character): Character => {
  if (!character.education) {
    character.education = {
      currentStage: null,
      currentSchool: null,
      currentYear: 0,
      totalYears: 0,
      gpa: 0,
      completedStages: [],
      achievements: [],
      major: undefined,
      testScores: [],
      disciplinaryActions: 0,
      dropouts: 0,
      clubs: [],
      clique: null,
      popularity: 50,
      scholarships: [],
      studentLoans: 0,
      tuitionPaid: 0,
      fraternity: null,
      sorority: null,
      levels: [],
      grades: [],
      currentGPA: 0,
      schoolType: undefined,
      schoolName: undefined
    };
  }
  return character;
};

export const isMandatoryEducationAge = (age: number): boolean => {
  return age >= 4 && age <= 17;
};

export const calculateGPA = (character: Character): number => {
  const baseGPA = (character.smarts / 100) * 4.0;
  const happinessModifier = (character.happiness - 50) / 200;
  const randomVariation = (Math.random() - 0.5) * 0.3;
  
  return Math.max(0.0, Math.min(4.0, baseGPA + happinessModifier + randomVariation));
};

export const getEducationStageForAge = (age: number): string | null => {
  if (age >= 4 && age <= 8) return 'elementary';
  if (age >= 9 && age <= 12) return 'middle_school';
  if (age >= 13 && age <= 17) return 'high_school';
  return null;
};

export const shouldAutoEnroll = (character: Character): { stageId: string; schoolId: string } | null => {
  const age = character.age;
  const education = character.education;
  const completedStages = education?.completedStages || [];
  const currentStage = education?.currentStage;

  // Don't auto-enroll if already enrolled
  if (currentStage) return null;

  // Elementary School (ages 4-10)
  if (age >= 4 && age <= 10 && !completedStages.includes('elementary')) {
    return { stageId: 'elementary', schoolId: 'public_elementary' };
  }

  // Middle School (ages 11-13)
  if (age >= 11 && age <= 13 && 
      completedStages.includes('elementary') && 
      !completedStages.includes('middle_school')) {
    return { stageId: 'middle_school', schoolId: 'public_middle' };
  }

  // High School (ages 14-18)
  if (age >= 14 && age <= 18 && 
      completedStages.includes('middle_school') && 
      !completedStages.includes('high_school')) {
    return { stageId: 'high_school', schoolId: 'public_high' };
  }

  // Emergency catch-all for characters stuck in wrong stages
  if (age >= 14 && !completedStages.includes('high_school') && !currentStage) {
    // Force progression to high school if too old for lower levels
    return { stageId: 'high_school', schoolId: 'public_high' };
  }

  return null;
};
