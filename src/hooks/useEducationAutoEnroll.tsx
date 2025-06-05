
import { useEffect } from 'react';
import { GameState } from '../types/game';
import { handleEducationAction } from '../handlers/EducationActionHandler';

interface UseEducationAutoEnrollProps {
  gameState: GameState;
  onGameStateChange: (newState: GameState) => void;
  ageHistory: Record<number, string[]>;
  setAgeHistory: React.Dispatch<React.SetStateAction<Record<number, string[]>>>;
  toast: any;
}

export function useEducationAutoEnroll({
  gameState,
  onGameStateChange,
  ageHistory,
  setAgeHistory,
  toast
}: UseEducationAutoEnrollProps) {
  // Initialize education if missing
  useEffect(() => {
    if (!gameState.character.education) {
      const updatedCharacter = {
        ...gameState.character,
        education: {
          currentStage: null,
          currentSchool: null,
          currentYear: 0,
          gpa: 0,
          completedStages: [] as string[],
          major: undefined,
          testScores: [],
          disciplinaryActions: 0,
          achievements: [],
          dropouts: 0,
          levels: []
        }
      };

      onGameStateChange({
        ...gameState,
        character: updatedCharacter
      });
    }
  }, [gameState.character, onGameStateChange]);

  // Auto-enroll in education
  useEffect(() => {
    if (!gameState.character.education) return;

    const autoEnrollAge = (age: number) => {
      if (!gameState.character.education || !Array.isArray(gameState.character.education.completedStages)) {
        return;
      }

      if (age >= 6 && age <= 11 && !gameState.character.education.currentStage && !gameState.character.education.completedStages.includes('elementary')) {
        handleEducationAction(gameState.character, 'enroll', { stageId: 'elementary', schoolId: 'public_elementary' }, ageHistory, setAgeHistory, onGameStateChange, gameState, toast);
      }
      else if (age >= 12 && age <= 14 && gameState.character.education.completedStages.includes('elementary') && !gameState.character.education.currentStage && !gameState.character.education.completedStages.includes('middle_school')) {
        handleEducationAction(gameState.character, 'enroll', { stageId: 'middle_school', schoolId: 'public_middle_school' }, ageHistory, setAgeHistory, onGameStateChange, gameState, toast);
      }
      else if (age >= 15 && age <= 17 && gameState.character.education.completedStages.includes('middle_school') && !gameState.character.education.currentStage && !gameState.character.education.completedStages.includes('high_school')) {
        handleEducationAction(gameState.character, 'enroll', { stageId: 'high_school', schoolId: 'public_high_school' }, ageHistory, setAgeHistory, onGameStateChange, gameState, toast);
      }
    };

    autoEnrollAge(gameState.character.age);
  }, [gameState.character.age, gameState.character.education?.currentStage, gameState.character.education?.completedStages]);
}
