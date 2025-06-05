import { useCallback } from 'react';
import { Character, GameState } from '../types/game';
import { processAgeUp, processChoice } from '../components/game/GameLogic';
import { handleActivityAction } from '../handlers/ActivityActionHandler';
import { handleCareerAction } from '../handlers/CareerActionHandler';
import { handleRelationshipAction } from '../handlers/RelationshipActionHandler';
import { handleEducationAction } from '../handlers/EducationActionHandler';
import { handleHealthAction, handleLifestyleAction } from '../handlers/GameStateActionHandlers';

interface UseGameActionsProps {
  gameState: GameState;
  onGameStateChange: (newState: GameState) => void;
  ageHistory: Record<number, string[]>;
  setAgeHistory: React.Dispatch<React.SetStateAction<Record<number, string[]>>>;
  toast: any;
}

export function useGameActions({
  gameState,
  onGameStateChange,
  ageHistory,
  setAgeHistory,
  toast
}: UseGameActionsProps) {
  const handleAgeUp = useCallback(async () => {
    if (gameState.gameOver) return;

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

  return {
    ageUp: handleAgeUp,
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
}