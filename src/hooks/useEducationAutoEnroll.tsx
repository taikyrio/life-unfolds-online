

import { useEffect } from 'react';
import { GameState } from '../types/game';

interface UseEducationAutoEnrollProps {
  gameState: GameState;
  onGameStateChange: (newState: GameState) => void;
  ageHistory: Record<number, string[]>;
  setAgeHistory: React.Dispatch<React.SetStateAction<Record<number, string[]>>>;
}

export function useEducationAutoEnroll({
  gameState,
  onGameStateChange,
  ageHistory,
  setAgeHistory
}: UseEducationAutoEnrollProps) {
  useEffect(() => {
    const character = gameState.character;
    const currentAge = character.age;
    
    // Auto-enroll in elementary school at age 5
    if (currentAge === 5 && !character.education?.currentStage) {
      const updatedCharacter = { ...character };
      
      // Initialize education if it doesn't exist
      if (!updatedCharacter.education) {
        updatedCharacter.education = {
          currentStage: null,
          currentSchool: null,
          currentYear: 0,
          gpa: 0,
          completedStages: [],
          achievements: [],
          testScores: [],
          disciplinaryActions: 0,
          dropouts: 0,
          levels: [],
          grades: []
        };
      }
      
      // Enroll in elementary school
      updatedCharacter.education.currentStage = 'elementary';
      updatedCharacter.education.currentSchool = 'public_elementary';
      updatedCharacter.education.currentYear = 1;
      updatedCharacter.education.gpa = 3.0; // Starting GPA
      
      // Add enrollment event
      const enrollmentEvent = `🎒 You started elementary school at age ${currentAge}!`;
      const updatedEventHistory = [...gameState.eventHistory, enrollmentEvent];
      
      // Update age history
      setAgeHistory(prev => ({
        ...prev,
        [currentAge]: [...(prev[currentAge] || []), enrollmentEvent]
      }));
      
      // Update game state
      onGameStateChange({
        ...gameState,
        character: updatedCharacter,
        eventHistory: updatedEventHistory
      });
    }
    
    // Auto-enroll in middle school at age 11
    else if (currentAge === 11 && character.education?.currentStage === 'elementary') {
      const updatedCharacter = { ...character };
      
      // Complete elementary and enroll in middle school
      if (updatedCharacter.education) {
        updatedCharacter.education.completedStages.push('elementary');
        updatedCharacter.education.currentStage = 'middle';
        updatedCharacter.education.currentSchool = 'public_middle';
        updatedCharacter.education.currentYear = 1;
      }
      
      const enrollmentEvent = `🏫 You graduated elementary school and started middle school!`;
      const updatedEventHistory = [...gameState.eventHistory, enrollmentEvent];
      
      setAgeHistory(prev => ({
        ...prev,
        [currentAge]: [...(prev[currentAge] || []), enrollmentEvent]
      }));
      
      onGameStateChange({
        ...gameState,
        character: updatedCharacter,
        eventHistory: updatedEventHistory
      });
    }
    
    // Auto-enroll in high school at age 14
    else if (currentAge === 14 && character.education?.currentStage === 'middle') {
      const updatedCharacter = { ...character };
      
      if (updatedCharacter.education) {
        updatedCharacter.education.completedStages.push('middle');
        updatedCharacter.education.currentStage = 'high';
        updatedCharacter.education.currentSchool = 'public_high';
        updatedCharacter.education.currentYear = 1;
      }
      
      const enrollmentEvent = `🎓 You graduated middle school and started high school!`;
      const updatedEventHistory = [...gameState.eventHistory, enrollmentEvent];
      
      setAgeHistory(prev => ({
        ...prev,
        [currentAge]: [...(prev[currentAge] || []), enrollmentEvent]
      }));
      
      onGameStateChange({
        ...gameState,
        character: updatedCharacter,
        eventHistory: updatedEventHistory
      });
    }
    
    // Graduate high school at age 18
    else if (currentAge === 18 && character.education?.currentStage === 'high') {
      const updatedCharacter = { ...character };
      
      if (updatedCharacter.education) {
        updatedCharacter.education.completedStages.push('high');
        updatedCharacter.education.currentStage = null;
        updatedCharacter.education.currentSchool = null;
        updatedCharacter.education.currentYear = 0;
      }
      
      const graduationEvent = `🎓 You graduated from high school! You can now apply to college or enter the workforce.`;
      const updatedEventHistory = [...gameState.eventHistory, graduationEvent];
      
      setAgeHistory(prev => ({
        ...prev,
        [currentAge]: [...(prev[currentAge] || []), graduationEvent]
      }));
      
      onGameStateChange({
        ...gameState,
        character: updatedCharacter,
        eventHistory: updatedEventHistory
      });
    }
  }, [gameState.character.age, gameState, onGameStateChange, setAgeHistory]);

  return {};
}

