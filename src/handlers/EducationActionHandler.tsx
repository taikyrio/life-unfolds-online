import { Character } from '../types/game';
import { educationStages, educationEvents, getAvailableSchools, calculateGPA, universityMajors } from '../data/educationData';
import { autoEnrollEducation } from './educationProgression';
import { initializeEducationData, isMandatoryEducationAge } from '../utils/educationHelpers';

export const handleEducationAction = (
  character: Character,
  action: string,
  data: any,
  ageHistory: Record<number, string[]> = {},
  setAgeHistory: (history: Record<number, string[]>) => void,
  onGameStateChange: (newState: any) => void,
  gameState: any,
  toast: any
) => {
  let updatedCharacter = { ...character };
  let message = '';

  // Initialize education data if not present
  updatedCharacter = initializeEducationData(updatedCharacter);

  const currentEducation = character.education;

  switch (action) {
    case 'advance_year':
      if (currentEducation?.currentStage && currentEducation?.currentSchool) {
        const stage = educationStages.find(s => s.id === currentEducation.currentStage);
        if (stage) {
          const newYear = currentEducation.currentYear + 1;

          if (newYear > stage.duration) {
            // Graduate from current stage
            updatedCharacter.education = {
              ...currentEducation,
              currentStage: null,
              currentSchool: null,
              currentYear: 0,
              completedStages: [...(currentEducation.completedStages || []), currentEducation.currentStage],
              achievements: [...(currentEducation.achievements || []), `Graduated from ${stage.name}`]
            };
            message = `You graduated from ${stage.name}!`;
          } else {
            // Advance to next year
            updatedCharacter.education = {
              ...currentEducation,
              currentYear: newYear
            };
            message = `You advanced to year ${newYear} of ${stage.name}.`;
          }
        }
      }
      break;

    case 'enroll':
      const { stageId, schoolId } = data;
      const stage = educationStages.find(s => s.id === stageId);
      const availableSchools = getAvailableSchools(stageId, updatedCharacter);
      const school = availableSchools.find(s => s.id === schoolId);

      if (!stage || !school) {
        message = 'Invalid school or stage selection.';
        break;
      }

      // Check age requirements
      if (updatedCharacter.age < stage.minAge || updatedCharacter.age > stage.maxAge) {
        message = `You are not the right age for ${stage.name}.`;
        break;
      }

      // Check wealth requirements
      if (updatedCharacter.wealth < school.cost * 10) {
        message = `You can't afford ${school.name}. You need $${school.cost * 10}k.`;
        break;
      }

      // Enroll the character
      updatedCharacter.education.currentStage = stageId;
      updatedCharacter.education.currentSchool = schoolId;
      updatedCharacter.education.currentYear = 1;
      updatedCharacter.education.gpa = 2.0 + (updatedCharacter.smarts / 50); // Base GPA
      updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - (school.cost * 10));

      message = `Enrolled in ${school.name} for ${stage.name}!`;

      // Add to age history
      const currentHistory = ageHistory[updatedCharacter.age] || [];
      setAgeHistory({
        ...ageHistory,
        [updatedCharacter.age]: [...currentHistory, message]
      });
      break;

    case 'study_harder':
      if (!updatedCharacter.education.currentStage) {
        message = 'You are not currently enrolled in school.';
        break;
      }

      const gpaIncrease = 0.1 + (Math.random() * 0.2);
      updatedCharacter.education.gpa = Math.min(4.0, updatedCharacter.education.gpa + gpaIncrease);
      updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 5);
      updatedCharacter.happiness = Math.max(0, updatedCharacter.happiness - 10);

      message = `You studied harder and your GPA improved to ${updatedCharacter.education.gpa.toFixed(2)}!`;
      break;

    case 'skip_school':
      if (!updatedCharacter.education.currentStage) {
        message = 'You are not currently enrolled in school.';
        break;
      }

      updatedCharacter.education.gpa = Math.max(0, updatedCharacter.education.gpa - 0.15);
      updatedCharacter.education.disciplinaryActions += 1;
      updatedCharacter.happiness += 15;
      updatedCharacter.smarts = Math.max(0, updatedCharacter.smarts - 3);

      message = 'You skipped school and had fun, but your grades suffered.';
      break;

    case 'get_tutoring':
      if (!updatedCharacter.education.currentStage) {
        message = 'You are not currently enrolled in school.';
        break;
      }

      if (updatedCharacter.wealth < 50) {
        message = 'You can\'t afford tutoring right now.';
        break;
      }

      updatedCharacter.wealth -= 50;
      updatedCharacter.education.gpa = Math.min(4.0, updatedCharacter.education.gpa + 0.2);
      updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 8);

      message = 'Tutoring helped improve your academic performance!';
      break;

    case 'take_test':
      if (!updatedCharacter.education.currentStage) {
        message = 'You are not currently enrolled in school.';
        break;
      }

      const testScore = Math.floor(800 + (updatedCharacter.smarts * 8) + (Math.random() * 400));
      updatedCharacter.education.testScores.push(testScore);

      message = `You scored ${testScore} on your standardized test!`;
      break;

    case 'choose_major':
      if (updatedCharacter.education.currentStage !== 'university') {
        message = 'You can only choose a major in university.';
        break;
      }

      const { major } = data;
      if (!universityMajors.includes(major)) {
        message = 'Invalid major selection.';
        break;
      }

      updatedCharacter.education.major = major;
      message = `You declared ${major} as your major!`;
      break;

    case 'drop_out':
      if (!updatedCharacter.education.currentStage) {
        message = 'You are not currently enrolled in school.';
        break;
      }

      // Prevent dropping out during mandatory education ages
      if (isMandatoryEducationAge(updatedCharacter.age)) {
        message = 'You cannot drop out of school before age 16. Education is mandatory!';
        break;
      }

      const currentStage = updatedCharacter.education.currentStage;
      updatedCharacter.education.currentStage = null;
      updatedCharacter.education.currentSchool = null;
      updatedCharacter.education.dropouts += 1;
      updatedCharacter.happiness += 20;

      message = `You dropped out of ${currentStage}. Your family is disappointed.`;
      break;

    case 'graduate':
      if (!updatedCharacter.education.currentStage) {
        message = 'You are not currently enrolled in school.';
        break;
      }

      const graduationStage = educationStages.find(s => s.id === updatedCharacter.education.currentStage);
      if (!graduationStage) break;

      // Check if completed required years
      if (updatedCharacter.education.currentYear < graduationStage.duration) {
        message = `You need to complete ${graduationStage.duration} years to graduate.`;
        break;
      }

      // Graduate the character
      updatedCharacter.education.completedStages.push(updatedCharacter.education.currentStage);
      updatedCharacter.education.currentStage = null;
      updatedCharacter.education.currentSchool = null;
      updatedCharacter.education.currentYear = 0;

      // Bonuses based on GPA
      const gpa = updatedCharacter.education.gpa;
      if (gpa >= 3.7) {
        updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 15);
        updatedCharacter.education.achievements.push('Graduated with Honors');
        message = `Congratulations! You graduated ${graduationStage.name} with honors (GPA: ${gpa.toFixed(2)})!`;
      } else if (gpa >= 3.0) {
        updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 10);
        message = `You graduated ${graduationStage.name} with a GPA of ${gpa.toFixed(2)}!`;
      } else {
        updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 5);
        message = `You barely graduated ${graduationStage.name} with a GPA of ${gpa.toFixed(2)}.`;
      }

      updatedCharacter.happiness += 25;
      break;

    case 'progress_year':
      // Use the new auto-progression system
      updatedCharacter = autoEnrollEducation(updatedCharacter, ageHistory, setAgeHistory);
      message = 'Education year progressed successfully.';
      break;

    case 'random_event':
      // Trigger a random education event
      const availableEvents = educationEvents.filter(event => {
        if (event.stage !== 'all' && event.stage !== updatedCharacter.education.currentStage) return false;
        if (event.conditions?.minGPA && updatedCharacter.education.gpa < event.conditions.minGPA) return false;
        if (event.conditions?.maxGPA && updatedCharacter.education.gpa > event.conditions.maxGPA) return false;
        return Math.random() < event.probability;
      });

      if (availableEvents.length > 0) {
        const randomEvent = availableEvents[Math.floor(Math.random() * availableEvents.length)];
        // Trigger event modal or auto-handle
        message = `${randomEvent.title}: ${randomEvent.description}`;
      }
      break;

    default:
      message = 'Unknown education action.';
  }

  // Update game state
  const newGameState = {
    ...gameState,
    character: updatedCharacter
  };

  onGameStateChange(newGameState);

  if (message && toast) {
    toast({
      title: "Education Update",
      description: message,
    });
  }
};





// Check if character needs to be in school
export const shouldBeInSchool = (character: Character) => {
  if (!isMandatoryEducationAge(character.age)) return false;
  if (character.education?.currentStage) return false; // Already enrolled

  // Check if they've completed the required stage for their age
  if (character.age >= 6 && character.age <= 11) {
    return !character.education?.completedStages?.includes('elementary');
  }
  if (character.age >= 12 && character.age <= 14) {
    return character.education?.completedStages?.includes('elementary') && 
           !character.education?.completedStages?.includes('middle_school');
  }
  if (character.age >= 15 && character.age <= 16) {
    return character.education?.completedStages?.includes('middle_school') && 
           !character.education?.completedStages?.includes('high_school');
  }

  return false;
};
// Update education level based on completed stages
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