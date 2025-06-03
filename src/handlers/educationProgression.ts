import { Character } from '../types/character';
import { educationStages } from '../data/educationData';
import { initializeEducationData } from '../utils/educationHelpers';

export const autoEnrollEducation = (
  character: Character,
  ageHistory?: Record<number, string[]>,
  setAgeHistory?: (history: Record<number, string[]>) => void
): Character => {
  let updatedCharacter = initializeEducationData(character);

  // If already enrolled, progress the year
  if (updatedCharacter.education.currentStage) {
    const currentStageData = educationStages.find(s => s.id === updatedCharacter.education.currentStage);
    if (currentStageData) {
      updatedCharacter.education.currentYear += 1;

      // Random GPA fluctuation based on smarts
      const gpaChange = (Math.random() - 0.5) * 0.3 + (updatedCharacter.smarts / 200);
      updatedCharacter.education.gpa = Math.max(0, Math.min(4.0, updatedCharacter.education.gpa + gpaChange));

      // Add to age history
      if (ageHistory && setAgeHistory) {
        const currentHistory = ageHistory[updatedCharacter.age] || [];
        const message = `Advanced to year ${updatedCharacter.education.currentYear} of ${currentStageData.name}`;
        setAgeHistory({
          ...ageHistory,
          [updatedCharacter.age]: [...currentHistory, message]
        });
      }

      // Check for graduation
      if (updatedCharacter.education.currentYear >= currentStageData.duration) {
        updatedCharacter = handleGraduation(updatedCharacter, currentStageData, ageHistory, setAgeHistory);
      }
    }
  }

  // Check for mandatory education enrollment if not currently enrolled
  if (!updatedCharacter.education.currentStage) {
    updatedCharacter = checkMandatoryEnrollment(updatedCharacter, ageHistory, setAgeHistory);
  }

  return updatedCharacter;
};

const handleGraduation = (
  character: Character,
  stageData: any,
  ageHistory?: Record<number, string[]>,
  setAgeHistory?: (history: Record<number, string[]>) => void
): Character => {
  const updatedCharacter = { ...character };

  // Graduate the character
  updatedCharacter.education.completedStages.push(updatedCharacter.education.currentStage!);
  updatedCharacter.education.currentStage = null;
  updatedCharacter.education.currentSchool = null;
  updatedCharacter.education.currentYear = 0;

  // Bonuses based on GPA
  const gpa = updatedCharacter.education.gpa;
  if (gpa >= 3.7) {
    updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 15);
    updatedCharacter.education.achievements.push('Graduated with Honors');
  } else if (gpa >= 3.0) {
    updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 10);
  } else {
    updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 5);
  }

  updatedCharacter.happiness += 25;

  // Add graduation to age history
  if (ageHistory && setAgeHistory) {
    const currentHistory = ageHistory[updatedCharacter.age] || [];
    const graduationMessage = gpa >= 3.7
      ? `Graduated ${stageData.name} with honors (GPA: ${gpa.toFixed(2)})!`
      : `Graduated ${stageData.name} (GPA: ${gpa.toFixed(2)})`;
    setAgeHistory({
      ...ageHistory,
      [updatedCharacter.age]: [...currentHistory, graduationMessage]
    });

      updatedCharacter = checkAutoProgressionToNextLevel(updatedCharacter, ageHistory, setAgeHistory);
  }

  return updatedCharacter;
};

const checkMandatoryEnrollment = (
  character: Character,
  ageHistory?: Record<number, string[]>,
  setAgeHistory?: (history: Record<number, string[]>) => void
): Character => {
  const updatedCharacter = { ...character };
  let requiredStage = null;

  if (character.age >= 6 && character.age <= 11 && !updatedCharacter.education.completedStages.includes('elementary')) {
    requiredStage = 'elementary';
  } else if (character.age >= 12 && character.age <= 14 && updatedCharacter.education.completedStages.includes('elementary') && !updatedCharacter.education.completedStages.includes('middle')) {
    requiredStage = 'middle';
  } else if (character.age >= 15 && character.age <= 17 && updatedCharacter.education.completedStages.includes('middle') && !updatedCharacter.education.completedStages.includes('high')) {
    requiredStage = 'high';
  }

  // If mandatory education is required, auto-enroll
  if (requiredStage) {
    const stage = educationStages.find(s => s.id === requiredStage);
    const publicSchool = stage?.schools.find(school => school.type === 'public');

    if (stage && publicSchool) {
      // Add to age history if provided
      if (ageHistory && setAgeHistory) {
        const currentHistory = ageHistory[updatedCharacter.age] || [];
        const message = `Automatically enrolled in ${stage.name} at ${publicSchool.name}`;
        setAgeHistory({
          ...ageHistory,
          [updatedCharacter.age]: [...currentHistory, message]
        });
      }

      updatedCharacter.education.currentStage = stage.id;
      updatedCharacter.education.currentSchool = publicSchool.id;
      updatedCharacter.education.currentYear = 1;
      updatedCharacter.education.gpa = 2.0 + (updatedCharacter.smarts / 50);
    }
  }

  return updatedCharacter;
};

const checkAutoProgressionToNextLevel = (
  character: Character,
  ageHistory?: Record<number, string[]>,
  setAgeHistory?: (history: Record<number, string[]>) => void
): Character => {
  const updatedCharacter = { ...character };
  const completedStages = updatedCharacter.education.completedStages;

  // Define progression paths
  const progressionMap: Record<string, string> = {
    'elementary': 'middle',
    'middle': 'high',
    'high': 'university' // Only auto-progress to university if they meet age requirements
  };

  // Get the last completed stage
  const lastCompleted = completedStages[completedStages.length - 1];
  const nextStage = progressionMap[lastCompleted];

  if (nextStage) {
    const nextStageData = educationStages.find(s => s.id === nextStage);

    if (nextStageData && updatedCharacter.age >= nextStageData.minAge) {
      // For mandatory education (elementary to high school), auto-enroll
      if (nextStage === 'middle' || nextStage === 'high') {
        const publicSchool = nextStageData.schools.find(school => school.type === 'public');

        if (publicSchool) {
          updatedCharacter.education.currentStage = nextStage;
          updatedCharacter.education.currentSchool = publicSchool.id;
          updatedCharacter.education.currentYear = 1;
          updatedCharacter.education.gpa = 2.0 + (updatedCharacter.smarts / 50);

          if (ageHistory && setAgeHistory) {
            const currentHistory = ageHistory[updatedCharacter.age] || [];
            const message = `Automatically enrolled in ${nextStageData.name} at ${publicSchool.name}`;
            setAgeHistory({
              ...ageHistory,
              [updatedCharacter.age]: [...currentHistory, message]
            });
          }
        }
      }
      // For university, don't auto-enroll but provide notification
      else if (nextStage === 'university') {
        if (ageHistory && setAgeHistory) {
          const currentHistory = ageHistory[updatedCharacter.age] || [];
          const message = `You are now eligible to apply for university education!`;
          setAgeHistory({
            ...ageHistory,
            [updatedCharacter.age]: [...currentHistory, message]
          });
        }
      }
    }
  }

  return updatedCharacter;
};