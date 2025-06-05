
import { Character } from '../types/game';
import { isGameOver } from '../utils/gameStateUtils';
import { ageFamilyMembers, generateNewRelationships } from '../utils/familyUtils';

export const handleAgeUp = async (
  character: Character,
  ageHistory: Record<number, string[]>,
  setAgeHistory: (history: Record<number, string[]>) => void,
  onGameStateChange: (newState: any) => void,
  gameState: any,
  toast: any,
  data?: any
) => {
  let updatedCharacter = { ...character };
  let ageEvents = ageHistory[updatedCharacter.age] || [];

  // Increase age
  updatedCharacter.age += 1;
  ageEvents.push(`You aged up to ${updatedCharacter.age}!`);

  // Age family members and add new relationships
  updatedCharacter.familyMembers = ageFamilyMembers(updatedCharacter.familyMembers);
  const newRelationships = generateNewRelationships(updatedCharacter);
  updatedCharacter.familyMembers = [...updatedCharacter.familyMembers, ...newRelationships];

  // Handle education progression
  if (updatedCharacter.education?.currentStage && updatedCharacter.education?.currentSchool) {
    const { educationStages } = await import('../data/educationData');
    const stage = educationStages.find((s: any) => s.id === updatedCharacter.education?.currentStage);
    if (stage) {
      const newYear = updatedCharacter.education.currentYear + 1;
      
      if (newYear > stage.duration) {
        // Graduate from current stage
        updatedCharacter.education = {
          ...updatedCharacter.education,
          currentStage: null,
          currentSchool: null,
          currentYear: 0,
          completedStages: [...(updatedCharacter.education.completedStages || []), updatedCharacter.education.currentStage],
          achievements: [...(updatedCharacter.education.achievements || []), `Graduated from ${stage.name}`]
        };
        ageEvents.push(`You graduated from ${stage.name}!`);
      } else {
        // Advance to next year
        updatedCharacter.education = {
          ...updatedCharacter.education,
          currentYear: newYear
        };
        ageEvents.push(`You advanced to year ${newYear} of ${stage.name}.`);
      }
    }
  }

  // Auto-enroll mandatory education
  if (updatedCharacter.age === 6 && !updatedCharacter.education?.currentStage) {
    const { educationStages } = await import('../data/educationData');
    const primaryStage = educationStages.find((s: any) => s.id === 'primary');
    if (primaryStage) {
      const publicSchool = primaryStage.schools.find((s: any) => s.type === 'Public');
      if (publicSchool) {
        updatedCharacter.education = {
          ...updatedCharacter.education,
          currentStage: 'primary',
          currentSchool: publicSchool.id,
          currentYear: 1,
          gpa: 3.0
        };
        ageEvents.push("You started primary school!");
      }
    }
  }

  // Only handle prison-related aging if character is actually in prison
  const prisonState = updatedCharacter.customStats?.prisonState;
  if (prisonState && prisonState.isInPrison) {
    // Prison aging logic would go here if needed
    // For now, we'll just ensure prison state is maintained
  }

  // Natural health changes with age
  if (updatedCharacter.age > 50 && Math.random() < 0.2) {
    updatedCharacter.health = Math.max(0, updatedCharacter.health - 3);
    ageEvents.push("You feel the effects of aging on your health.");
  } else if (updatedCharacter.age > 30 && Math.random() < 0.1) {
    updatedCharacter.health = Math.max(0, updatedCharacter.health - 1);
    ageEvents.push("You notice minor changes in your health.");
  }

  // Young adult health recovery chance
  const isYoungAdult = updatedCharacter.age >= 18 && updatedCharacter.age <= 35;
  if (isYoungAdult && updatedCharacter.health < 30 && Math.random() < 0.3) {
    updatedCharacter.health = Math.min(100, updatedCharacter.health + 15);
    ageEvents.push("Your young body shows remarkable recovery!");
  }

  // Prevent aging beyond current year if birth year is set
  const currentYear = new Date().getFullYear();
  if (updatedCharacter.birthYear && (updatedCharacter.birthYear + updatedCharacter.age) > currentYear) {
    ageEvents.push("⏰ You've reached the present day! Time travel isn't available yet.");
    toast({
      title: "Present Day Reached",
      description: "You can't age beyond the current year!",
      variant: "default",
    });
    return;
  }

  // Check for game over
  const gameOverCheck = isGameOver(updatedCharacter);
  if (gameOverCheck.gameOver) {
    ageEvents.push(gameOverCheck.reason || "Game Over");
    onGameStateChange({
      ...gameState,
      character: updatedCharacter,
      gameOver: true,
      gameOverReason: gameOverCheck.reason
    });

    toast({
      title: "Game Over",
      description: gameOverCheck.reason,
      variant: "destructive",
    });
    return;
  }

  // Critical health warning for young adults
  if (updatedCharacter.health <= 20 && isYoungAdult) {
    ageEvents.push("⚠️ Your health is critically low! Seek medical attention immediately!");
    toast({
      title: "Critical Health Warning",
      description: "Your health is dangerously low. Consider visiting a doctor or hospital.",
      variant: "destructive",
    });
  }

  const newAgeHistory = { ...ageHistory };
  newAgeHistory[updatedCharacter.age] = ageEvents;
  setAgeHistory(newAgeHistory);

  onGameStateChange({
    ...gameState,
    character: updatedCharacter
  });
};
