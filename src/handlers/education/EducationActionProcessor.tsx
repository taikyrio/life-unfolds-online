
import { Character } from '../../types/game';
import { educationStages, School } from '../../data/education/educationStages';
import { universityMajors, getMajorById } from '../../data/education/universityMajors';
import { graduateSchools, getGraduateSchoolById } from '../../data/education/graduateSchools';
import { schoolClubs, getClubById } from '../../data/education/schoolClubs';
import { schoolCliques, getCliqueById } from '../../data/education/schoolCliques';
import { initializeEducationData } from '../../utils/educationHelpers';

export const processEducationAction = (
  character: Character,
  action: string,
  data: any,
  ageHistory: Record<number, string[]> = {},
  setAgeHistory: (history: Record<number, string[]>) => void,
  toast?: any
): { character: Character; message: string } => {
  let updatedCharacter = { ...character };
  let message = '';

  // Initialize education data if not present
  updatedCharacter = initializeEducationData(updatedCharacter);
  const currentEducation = updatedCharacter.education!;

  switch (action) {
    case 'enroll':
      const { stageId, schoolId, major } = data;
      const stage = educationStages.find(s => s.id === stageId);
      const school = stage?.schools.find(s => s.id === schoolId);

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
      const totalCost = school.cost * 10;
      if (updatedCharacter.wealth < totalCost) {
        message = `You can't afford ${school.name}. You need $${totalCost}k.`;
        break;
      }

      // Check prerequisites
      if (stage.requirements?.completedStages) {
        for (const req of stage.requirements.completedStages) {
          if (!currentEducation.completedStages.includes(req)) {
            message = `You must complete ${req} first.`;
            break;
          }
        }
        if (message) break;
      }

      // Check school requirements
      if (school.requirements) {
        if (school.requirements.minGPA && (currentEducation.gpa || 0) < school.requirements.minGPA) {
          message = `Your GPA is too low for ${school.name}.`;
          break;
        }
        if (school.requirements.minSmarts && updatedCharacter.smarts < school.requirements.minSmarts) {
          message = `Your Smarts are too low for ${school.name}.`;
          break;
        }
        if (school.requirements.minWealth && updatedCharacter.wealth < school.requirements.minWealth) {
          message = `You don't have enough wealth for ${school.name}.`;
          break;
        }
      }

      // Enroll the character
      currentEducation.currentStage = stageId;
      currentEducation.currentSchool = schoolId;
      currentEducation.currentYear = 1;
      currentEducation.gpa = calculateInitialGPA(updatedCharacter);
      updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - totalCost);

      // Set major for university
      if (stageId === 'university' && major) {
        currentEducation.major = major;
      }

      message = `Enrolled in ${school.name} for ${stage.name}!`;
      addToAgeHistory(updatedCharacter.age, message, ageHistory, setAgeHistory);
      break;

    case 'advance_year':
      if (!currentEducation.currentStage || !currentEducation.currentSchool) {
        message = 'Not currently enrolled in school.';
        break;
      }

      const currentStage = educationStages.find(s => s.id === currentEducation.currentStage);
      if (!currentStage) break;

      const newYear = (currentEducation.currentYear || 0) + 1;

      if (newYear > currentStage.duration) {
        // Graduate
        currentEducation.completedStages = [
          ...(currentEducation.completedStages || []),
          currentEducation.currentStage
        ];
        currentEducation.achievements = [
          ...(currentEducation.achievements || []),
          `Graduated from ${currentStage.name}`
        ];
        currentEducation.currentStage = null;
        currentEducation.currentSchool = null;
        currentEducation.currentYear = 0;

        // Apply graduation bonuses
        const finalGPA = currentEducation.gpa || 0;
        if (finalGPA >= 3.7) {
          updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 15);
          currentEducation.achievements.push('Graduated with Honors');
          message = `Congratulations! You graduated ${currentStage.name} with honors (GPA: ${finalGPA.toFixed(2)})!`;
        } else if (finalGPA >= 3.0) {
          updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 10);
          message = `You graduated ${currentStage.name} with a GPA of ${finalGPA.toFixed(2)}!`;
        } else {
          updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 5);
          message = `You barely graduated ${currentStage.name} with a GPA of ${finalGPA.toFixed(2)}.`;
        }

        updatedCharacter.happiness += 25;
        
        // Auto-enroll in next mandatory stage if applicable
        const nextStage = getNextMandatoryStage(updatedCharacter);
        if (nextStage) {
          currentEducation.currentStage = nextStage.stageId;
          currentEducation.currentSchool = nextStage.schoolId;
          currentEducation.currentYear = 1;
          currentEducation.gpa = calculateInitialGPA(updatedCharacter);
          message += ` Automatically enrolled in ${nextStage.stageName}!`;
        }
      } else {
        // Advance to next year
        currentEducation.currentYear = newYear;
        currentEducation.gpa = calculateYearlyGPA(updatedCharacter, newYear);
        message = `You advanced to year ${newYear} of ${currentStage.name}. GPA: ${currentEducation.gpa.toFixed(2)}`;
      }
      break;

    case 'study_harder':
      if (!currentEducation.currentStage) {
        message = 'You are not currently enrolled in school.';
        break;
      }

      const gpaIncrease = 0.1 + (Math.random() * 0.2);
      currentEducation.gpa = Math.min(4.0, (currentEducation.gpa || 0) + gpaIncrease);
      updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + 5);
      updatedCharacter.happiness = Math.max(0, updatedCharacter.happiness - 10);

      message = `You studied harder and your GPA improved to ${currentEducation.gpa.toFixed(2)}!`;
      break;

    case 'skip_school':
      if (!currentEducation.currentStage) {
        message = 'You are not currently enrolled in school.';
        break;
      }

      currentEducation.gpa = Math.max(0, (currentEducation.gpa || 0) - 0.15);
      currentEducation.disciplinaryActions = (currentEducation.disciplinaryActions || 0) + 1;
      updatedCharacter.happiness += 15;
      updatedCharacter.smarts = Math.max(0, updatedCharacter.smarts - 3);

      message = 'You skipped school and had fun, but your grades suffered.';
      break;

    case 'drop_out':
      if (!currentEducation.currentStage) {
        message = 'You are not currently enrolled in school.';
        break;
      }

      const currentStageForDropout = educationStages.find(s => s.id === currentEducation.currentStage);
      if (currentStageForDropout?.isMandatory && updatedCharacter.age < (currentStageForDropout.dropoutAge || 18)) {
        message = 'You cannot drop out of school before the legal age. Education is mandatory!';
        break;
      }

      currentEducation.currentStage = null;
      currentEducation.currentSchool = null;
      currentEducation.dropouts = (currentEducation.dropouts || 0) + 1;
      updatedCharacter.happiness += 20;

      message = `You dropped out of ${currentStageForDropout?.name}. Your family is disappointed.`;
      break;

    case 'join_club':
      const { clubId } = data;
      const club = getClubById(clubId);
      
      if (!club || !currentEducation.currentStage) {
        message = 'Cannot join club right now.';
        break;
      }

      if (currentEducation.clubs?.includes(clubId)) {
        message = 'You are already in this club.';
        break;
      }

      // Check requirements
      if (club.requirements) {
        if (club.requirements.minGPA && (currentEducation.gpa || 0) < club.requirements.minGPA) {
          message = `Your GPA is too low for ${club.name}.`;
          break;
        }
        if (club.requirements.minSmarts && updatedCharacter.smarts < club.requirements.minSmarts) {
          message = `Your Smarts are too low for ${club.name}.`;
          break;
        }
        if (club.requirements.tryoutRequired && Math.random() < 0.3) {
          message = `You failed the tryout for ${club.name}.`;
          break;
        }
      }

      // Join club
      currentEducation.clubs = [...(currentEducation.clubs || []), clubId];
      
      // Apply effects
      if (club.effects.smarts) updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + club.effects.smarts);
      if (club.effects.popularity) currentEducation.popularity = Math.min(100, (currentEducation.popularity || 50) + club.effects.popularity);
      if (club.effects.happiness) updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + club.effects.happiness);

      message = `You joined ${club.name}! Time commitment: ${club.timeCommitment} hours per week.`;
      break;

    case 'join_clique':
      const { cliqueId } = data;
      const clique = getCliqueById(cliqueId);
      
      if (!clique || !currentEducation.currentStage) {
        message = 'Cannot join clique right now.';
        break;
      }

      if (currentEducation.clique === cliqueId) {
        message = 'You are already in this clique.';
        break;
      }

      // Check requirements
      if (clique.requirements) {
        if (clique.requirements.minPopularity && (currentEducation.popularity || 50) < clique.requirements.minPopularity) {
          message = `You are not popular enough for ${clique.name}.`;
          break;
        }
        if (clique.requirements.minSmarts && updatedCharacter.smarts < clique.requirements.minSmarts) {
          message = `You are not smart enough for ${clique.name}.`;
          break;
        }
        if (clique.requirements.gender && character.gender !== clique.requirements.gender) {
          message = `${clique.name} is only for ${clique.requirements.gender}s.`;
          break;
        }
        if (clique.requirements.clubMembership) {
          const hasRequiredClub = clique.requirements.clubMembership.some(club => 
            currentEducation.clubs?.includes(club)
          );
          if (!hasRequiredClub) {
            message = `You need to be in a specific club to join ${clique.name}.`;
            break;
          }
        }
      }

      // Rejection chance for popular cliques
      if (clique.requirements?.minPopularity && clique.requirements.minPopularity > 70 && Math.random() < 0.4) {
        currentEducation.popularity = Math.max(0, (currentEducation.popularity || 50) - 20);
        message = `${clique.name} rejected you. Your popularity decreased.`;
        break;
      }

      // Join clique
      currentEducation.clique = cliqueId;
      
      // Apply effects
      if (clique.effects.popularity) currentEducation.popularity = Math.min(100, (currentEducation.popularity || 50) + clique.effects.popularity);
      if (clique.effects.happiness) updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + clique.effects.happiness);
      if (clique.effects.smarts) updatedCharacter.smarts = Math.min(100, updatedCharacter.smarts + clique.effects.smarts);

      message = `You joined ${clique.name}!`;
      break;

    case 'apply_graduate':
      const { schoolId: gradSchoolId } = data;
      const gradSchool = getGraduateSchoolById(gradSchoolId);
      
      if (!gradSchool) {
        message = 'Invalid graduate school selection.';
        break;
      }

      // Check requirements
      if ((currentEducation.gpa || 0) < gradSchool.requirements.minGPA) {
        message = `Your GPA is too low for ${gradSchool.name}.`;
        break;
      }

      if (updatedCharacter.smarts < gradSchool.requirements.minSmarts) {
        message = `Your Smarts are too low for ${gradSchool.name}.`;
        break;
      }

      if (updatedCharacter.wealth < gradSchool.cost * 10) {
        message = `You can't afford ${gradSchool.name}.`;
        break;
      }

      if (!currentEducation.major || !gradSchool.requirements.requiredMajors.includes(currentEducation.major)) {
        message = `Your major doesn't qualify for ${gradSchool.name}.`;
        break;
      }

      // Acceptance check
      if (Math.random() * 100 > gradSchool.acceptanceRate) {
        message = `You were rejected from ${gradSchool.name}. Try again next year or improve your stats.`;
        break;
      }

      // Accept and enroll
      currentEducation.currentStage = gradSchoolId;
      currentEducation.currentSchool = gradSchoolId;
      currentEducation.currentYear = 1;
      currentEducation.gpa = calculateInitialGPA(updatedCharacter);
      updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - (gradSchool.cost * 10));

      message = `Congratulations! You were accepted to ${gradSchool.name}!`;
      break;

    default:
      message = 'Unknown education action.';
  }

  return { character: updatedCharacter, message };
};

// Helper functions
const calculateInitialGPA = (character: Character): number => {
  const baseGPA = (character.smarts / 100) * 4.0;
  const happinessModifier = (character.happiness - 50) / 200;
  const randomVariation = (Math.random() - 0.5) * 0.3;
  
  return Math.max(0.0, Math.min(4.0, baseGPA + happinessModifier + randomVariation));
};

const calculateYearlyGPA = (character: Character, year: number): number => {
  const baseGPA = (character.smarts / 100) * 4.0;
  const yearModifier = year <= 2 ? 0.1 : year >= 5 ? -0.1 : 0;
  const happinessModifier = (character.happiness - 50) / 100;
  const randomVariation = (Math.random() - 0.5) * 0.3;
  
  let finalGPA = baseGPA + yearModifier + happinessModifier + randomVariation;
  return Math.max(0.0, Math.min(4.0, finalGPA));
};

const getNextMandatoryStage = (character: Character): { stageId: string; schoolId: string; stageName: string } | null => {
  const age = character.age;
  const completedStages = character.education?.completedStages || [];

  // Elementary to Middle School
  if (age >= 11 && 
      completedStages.includes('elementary') && 
      !completedStages.includes('middle_school')) {
    return {
      stageId: 'middle_school',
      schoolId: 'public_middle',
      stageName: 'Middle School'
    };
  }

  // Middle School to High School
  if (age >= 14 && 
      completedStages.includes('middle_school') && 
      !completedStages.includes('high_school')) {
    return {
      stageId: 'high_school',
      schoolId: 'public_high',
      stageName: 'High School'
    };
  }

  // Emergency progression for characters stuck in elementary at age 14+
  if (age >= 14 && 
      completedStages.includes('elementary') && 
      !completedStages.includes('high_school')) {
    return {
      stageId: 'high_school',
      schoolId: 'public_high',
      stageName: 'High School'
    };
  }

  return null;
};

const addToAgeHistory = (
  age: number, 
  message: string, 
  ageHistory: Record<number, string[]>, 
  setAgeHistory: (history: Record<number, string[]>) => void
) => {
  const currentHistory = ageHistory[age] || [];
  setAgeHistory({
    ...ageHistory,
    [age]: [...currentHistory, message]
  });
};
