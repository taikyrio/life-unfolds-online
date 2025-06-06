import { Character } from '../types/game';
import { educationStages } from '../data/educationData';
import { initializeEducationData } from '../utils/educationHelpers';

export const autoEnrollEducation = (
  character: Character,
  ageHistory: Record<number, string[]>,
  setAgeHistory: (history: Record<number, string[]>) => void
): Character => {
  let updatedCharacter = { ...character };

  // Initialize education data if not present
  updatedCharacter = initializeEducationData(updatedCharacter);

  // Check if character should be auto-enrolled
  const stageToEnroll = shouldAutoEnrollInSchool(updatedCharacter);

  if (stageToEnroll) {
    const stage = educationStages.find(s => s.id === stageToEnroll);
    if (stage?.autoEnroll) {
      // Auto-enroll in public school (first available school)
      const publicSchool = stage.schools?.[0];
      if (publicSchool && updatedCharacter.education) {
        updatedCharacter.education.currentStage = stageToEnroll;
        updatedCharacter.education.currentSchool = publicSchool.id;
        updatedCharacter.education.currentYear = 1;

        // Calculate dynamic GPA based on character stats
        const baseGPA = (updatedCharacter.smarts / 100) * 4.0;
        const happinessModifier = (updatedCharacter.happiness - 50) / 200;
        updatedCharacter.education.gpa = Math.max(0.0, Math.min(4.0, baseGPA + happinessModifier));

        // Add to age history
        const currentHistory = ageHistory[updatedCharacter.age] || [];
        setAgeHistory({
          ...ageHistory,
          [updatedCharacter.age]: [...currentHistory, `Auto-enrolled in ${stage.name} at ${publicSchool.name}`]
        });
      }
    }
  }

  return updatedCharacter;
};

// Determine if character should be auto-enrolled in school based on age and completed stages
const shouldAutoEnrollInSchool = (character: Character): string | null => {
  const age = character.age;
  const completedStages = character.education?.completedStages || [];
  const currentStage = character.education?.currentStage;

  // Don't auto-enroll if already enrolled
  if (currentStage) return null;

  // Elementary School (ages 6-11)
  if (age >= 6 && age <= 11 && !completedStages.includes('elementary')) {
    return 'elementary';
  }

  // Middle School (ages 12-14)
  if (age >= 12 && age <= 14 && 
      completedStages.includes('elementary') && 
      !completedStages.includes('middle')) {
    return 'middle';
  }

  // High School (ages 15-17)
  if (age >= 15 && age <= 17 && 
      completedStages.includes('middle') && 
      !completedStages.includes('high')) {
    return 'high';
  }

  return null;
};