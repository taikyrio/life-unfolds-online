

import { useCallback } from 'react';
import { Character, GameState } from '../types/game';
import { processAgeUp, processChoice } from '../components/game/GameLogic';

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
    processAgeUp(gameState);
  }, [gameState]);

  const handleChoice = useCallback((choiceId: string) => {
    processChoice(gameState, choiceId);
  }, [gameState]);

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

    // Mock activity action handler - updated signature to match expected parameters
    console.log('Activity:', activityId, activityData);
    toast({
      title: "Activity",
      description: `Performed activity: ${activityId}`,
    });
  }, [gameState, toast, handleCriminalOperation, handleCybercrime, handleMurder]);

  const handleCareerActionWrapper = useCallback((action: string, data?: any) => {
    console.log('Career action:', action, data);
    toast({
      title: "Career Action",
      description: `Career action: ${action}`,
    });
  }, [gameState, toast]);

  const handleEducationActionWrapper = useCallback((action: string, data?: any) => {
    console.log('Education action:', action, data);
    toast({
      title: "Education Action",
      description: `Education action: ${action}`,
    });
  }, [gameState, toast]);

  const handleHealthActionWrapper = useCallback((action: string, data?: any) => {
    console.log('Health action:', action, data);
    toast({
      title: "Health Action",
      description: `Health action: ${action}`,
    });
  }, [gameState, toast]);

  const handleLifestyleActionWrapper = useCallback((action: string, data?: any) => {
    console.log('Lifestyle action:', action, data);
    toast({
      title: "Lifestyle Action",
      description: `Lifestyle action: ${action}`,
    });
  }, [gameState, toast]);

  const handleRelationshipActionWrapper = useCallback((action: string, data?: any) => {
    console.log('Relationship action:', action, data);
    toast({
      title: "Relationship Action",
      description: `Relationship action: ${action}`,
    });
  }, [gameState, toast]);

  return {
    ageUp: handleAgeUp,
    handleChoice,
    handleCharacterUpdate,
    handleEvent,
    handleActivity,
    handleCareerAction: handleCareerActionWrapper,
    handleEducationAction: handleEducationActionWrapper,
    handleHealthAction: handleLifestyleActionWrapper,
    handleLifestyleAction: handleLifestyleActionWrapper,
    handleRelationshipAction: handleRelationshipActionWrapper
  };
}

