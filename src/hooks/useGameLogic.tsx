import { useState, useEffect, useCallback } from 'react';
import { Character, GameState } from '../types/game';
import { useToast } from '@/hooks/use-toast';
import { processAgeUp, processChoice } from '../components/game/GameLogic';
import { handleActivityAction } from '../components/handlers/ActivityActionHandler';
import { handleCareerAction } from '../components/handlers/CareerActionHandler';
import { handleRelationshipAction } from '../components/handlers/RelationshipActionHandler';
import { handleEducationAction } from '../components/handlers/EducationActionHandler';
import { handleHealthAction, handleLifestyleAction, handleMoneyAction } from '../components/handlers/GameStateActionHandlers';

interface UseGameLogicProps {
  gameState: GameState;
  onGameStateChange: (newState: GameState) => void;
}

export const useGameLogic = ({ gameState, onGameStateChange }: UseGameLogicProps) => {
  const [ageHistory, setAgeHistory] = useState<Record<number, string[]>>({});
  const [showEventOverlay, setShowEventOverlay] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!gameState.gameStarted) {
      onGameStateChange({
        ...gameState,
        gameStarted: true,
        character: gameState.character,
        eventTracker: {
          triggeredEvents: new Set(),
          lastEventAge: 0,
          eventCooldowns: new Map(),
          choiceHistory: []
        }
      });
    }
  }, [gameState, onGameStateChange]);

  useEffect(() => {
    setShowEventOverlay(!!gameState.currentEvent);
  }, [gameState.currentEvent]);

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
      else if (age >= 12 && age <= 14 && gameState.character.education.completedStages.includes('elementary') && !gameState.character.education.currentStage && !gameState.character.education.completedStages.includes('middle')) {
        handleEducationAction(gameState.character, 'enroll', { stageId: 'middle', schoolId: 'public_middle' }, ageHistory, setAgeHistory, onGameStateChange, gameState, toast);
      }
      else if (age >= 15 && age <= 17 && gameState.character.education.completedStages.includes('middle') && !gameState.character.education.currentStage && !gameState.character.education.completedStages.includes('high')) {
        handleEducationAction(gameState.character, 'enroll', { stageId: 'high', schoolId: 'public_high' }, ageHistory, setAgeHistory, onGameStateChange, gameState, toast);
      }
    };

    autoEnrollAge(gameState.character.age);
  }, [gameState.character.age, gameState.character.education?.currentStage, gameState.character.education?.completedStages]);

  const ageUp = useCallback(() => {
    processAgeUp(gameState, ageHistory || {}, setAgeHistory, onGameStateChange, toast);
  }, [gameState, ageHistory, onGameStateChange, toast]);

  const handleChoice = useCallback((choiceId: string) => {
    processChoice(gameState, choiceId, ageHistory, setAgeHistory, onGameStateChange);
  }, [gameState, ageHistory, onGameStateChange]);

  const handleCharacterUpdate = useCallback((updatedCharacter: Character) => {
    onGameStateChange({
      ...gameState,
      character: updatedCharacter
    });
  }, [gameState, onGameStateChange]);

  const handleEvent = useCallback((message: string) => {
    toast({
      title: "Event",
      description: message,
    });
  }, [toast]);

  const handleCriminalOperation = useCallback((operation: any) => {
    console.log('Criminal operation:', operation);
    toast({
      title: "Criminal Operation",
      description: "Criminal activities are not yet implemented",
    });
  }, [toast]);

  const handleCybercrime = useCallback((crime: any) => {
    console.log('Cybercrime:', crime);
    toast({
      title: "Cybercrime",
      description: "Cybercrime activities are not yet implemented",
    });
  }, [toast]);

  const handleMurder = useCallback((target: any) => {
    console.log('Murder target:', target);
    toast({
      title: "Murder",
      description: "Murder activities are not yet implemented",
    });
  }, [toast]);

  const handleActivity = useCallback((activityId: string, activityData?: any) => {
    if (activityData && activityData.type) {
      if (activityData.type === 'criminal_operation') {
        handleCriminalOperation(activityData);
        return;
      } else if (activityData.type === 'cybercrime') {
        handleCybercrime(activityData);
        return;
      } else if (activityData.type === 'murder') {
        handleMurder(activityData);
        return;
      }
    }

    handleActivityAction(
      gameState.character,
      activityId,
      activityData,
      ageHistory,
      setAgeHistory,
      onGameStateChange,
      gameState,
      toast
    );
  }, [gameState, ageHistory, onGameStateChange, toast, handleCriminalOperation, handleCybercrime, handleMurder]);

  const handleCareerActionWrapper = useCallback((action: string, data?: any) => {
    handleCareerAction(gameState.character, action, data, ageHistory, setAgeHistory, onGameStateChange, gameState, toast);
  }, [gameState, ageHistory, onGameStateChange, toast]);

  const handleEducationActionWrapper = useCallback((action: string, data?: any) => {
    handleEducationAction(gameState.character, action, data, ageHistory, setAgeHistory, onGameStateChange, gameState, toast);
  }, [gameState, ageHistory, onGameStateChange, toast]);

  const handleHealthActionWrapper = useCallback((action: string, data?: any) => {
    handleHealthAction(gameState.character, action, data, ageHistory, setAgeHistory, onGameStateChange, gameState, toast);
  }, [gameState, ageHistory, onGameStateChange, toast]);

  const handleLifestyleActionWrapper = useCallback((action: string, data?: any) => {
    handleLifestyleAction(gameState.character, action, data, ageHistory, setAgeHistory, onGameStateChange, gameState, toast);
  }, [gameState, ageHistory, onGameStateChange, toast]);

  const handleRelationshipActionWrapper = useCallback((action: string, data?: any) => {
    handleRelationshipAction(gameState.character, action, data, ageHistory, setAgeHistory, onGameStateChange, gameState, toast);
  }, [gameState, ageHistory, onGameStateChange, toast]);

  // Convert ageHistory Record to array format for LifeTab component
  const ageHistoryArray = Object.entries(ageHistory).map(([age, events]) => ({
    age: parseInt(age),
    events
  })).sort((a, b) => a.age - b.age);

  return {
    ageHistory: ageHistoryArray,
    showEventOverlay,
    setShowEventOverlay,
    ageUp,
    handleChoice,
    handleCharacterUpdate,
    handleEvent,
    handleActivity,
    handleCareerAction: handleCareerActionWrapper,
    handleEducationAction: handleEducationActionWrapper,
    handleHealthAction: handleHealthActionWrapper,
    handleLifestyleAction: handleLifestyleActionWrapper,
    handleRelationshipAction: handleRelationshipActionWrapper
  };
};