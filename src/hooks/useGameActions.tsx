import { useCallback } from 'react';
import { Character, GameState } from '../types/game';
import { processAgeUp, processChoice } from '../components/game/GameLogic';
import { handleActivityAction } from '../handlers/ActivityActionHandler';
import { handleMusicCareer } from '../handlers/career/MusicCareerHandler';

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
    const newState = processAgeUp(gameState);

    // Update ageHistory with events for the current age
    const currentAge = newState.character.age;
    const newEvents = newState.eventHistory.slice(gameState.eventHistory.length);

    setAgeHistory(prev => ({
      ...prev,
      [currentAge]: newEvents
    }));

    onGameStateChange(newState);
  }, [gameState, onGameStateChange, setAgeHistory]);

  const handleChoice = useCallback((choiceId: string) => {
    const newState = processChoice(gameState, choiceId);
    onGameStateChange(newState);
  }, [gameState, onGameStateChange]);

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

    // Use the comprehensive activity handler
    handleActivityAction(
      gameState.character,
      activityId,
      activityData,
      setAgeHistory,
      onGameStateChange,
      gameState,
      toast
    );
  }, [gameState, onGameStateChange, setAgeHistory, toast, handleCriminalOperation, handleCybercrime, handleMurder]);

  const handleCareerAction = useCallback((action: string, data?: any) => {
    console.log('Career action:', action, data);

    // Check if this is a music career action
    if (action.startsWith('music_')) {
      handleMusicCareer(
        gameState.character,
        action,
        data,
        ageHistory,
        setAgeHistory,
        onGameStateChange,
        gameState,
        toast
      );
      return;
    }

    let updatedCharacter = { ...gameState.character };
    let message = `Career action: ${action}`;

    switch (action) {
      case 'apply_job':
        if (data && data.salary) {
          updatedCharacter.job = data.name;
          updatedCharacter.salary = data.salary;
          updatedCharacter.jobLevel = 1;
          message = `You got hired as a ${data.name}!`;
        }
        break;
      case 'work_harder':
        const currentPerformance = updatedCharacter.jobPerformance || {
          rating: 50,
          lastReview: new Date().toISOString(),
          promotions: 0,
          warnings: 0
        };
        
        updatedCharacter.jobPerformance = {
          rating: Math.min(100, currentPerformance.rating + 10),
          lastReview: new Date().toISOString(),
          promotions: currentPerformance.promotions,
          warnings: currentPerformance.warnings
        };
        message = 'You worked harder and improved your performance!';
        break;
      case 'ask_promotion':
        const performanceRating = updatedCharacter.jobPerformance?.rating || 0;
        if (performanceRating > 70) {
          updatedCharacter.jobLevel = (updatedCharacter.jobLevel || 1) + 1;
          updatedCharacter.salary = Math.floor((updatedCharacter.salary || 0) * 1.2);
          message = 'You got promoted!';
        } else {
          message = 'Your promotion request was denied. Work harder!';
        }
        break;
      default:
        message = `Career action not implemented: ${action}`;
        break;
    }

    onGameStateChange({
      ...gameState,
      character: updatedCharacter
    });

    toast({
      title: "Career Action",
      description: message,
    });
  }, [gameState, onGameStateChange, toast, ageHistory, setAgeHistory]);

  const handleEducationAction = useCallback((action: string, data?: any) => {
    console.log('Education action:', action, data);
    toast({
      title: "Education Action",
      description: `Education action: ${action}`,
    });
  }, [toast]);

  const handleHealthAction = useCallback((action: string, data?: any) => {
    console.log('Health action:', action, data);
    toast({
      title: "Health Action",
      description: `Health action: ${action}`,
    });
  }, [toast]);

  const handleLifestyleAction = useCallback((action: string, data?: any) => {
    console.log('Lifestyle action:', action, data);
    toast({
      title: "Lifestyle Action",
      description: `Lifestyle action: ${action}`,
    });
  }, [toast]);

  const handleRelationshipAction = useCallback((action: string, data?: any) => {
    console.log('Relationship action:', action, data);
    toast({
      title: "Relationship Action",
      description: `Relationship action: ${action}`,
    });
  }, [toast]);

  return {
    ageUp: handleAgeUp,
    handleChoice,
    handleCharacterUpdate,
    handleEvent,
    handleActivity,
    handleCareerAction,
    handleEducationAction,
    handleHealthAction,
    handleLifestyleAction,
    handleRelationshipAction
  };
}