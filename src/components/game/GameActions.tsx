
import React from 'react';
import { Character, GameState } from '../../types/game';
import { handleActivityAction } from '../handlers/ActivityActionHandler';
import { handleEducationAction } from '../handlers/EducationActionHandler';
import { handleCareerAction } from '../handlers/CareerActionHandler';
import { handleRelationshipAction } from '../handlers/RelationshipActionHandler';
import { useToast } from '@/hooks/use-toast';

interface GameActionsProps {
  gameState: GameState;
  onGameStateChange: (newState: GameState) => void;
  ageHistory: Record<number, string[]>;
  setAgeHistory: React.Dispatch<React.SetStateAction<Record<number, string[]>>>;
}

export const useGameActions = ({
  gameState,
  onGameStateChange,
  ageHistory,
  setAgeHistory
}: GameActionsProps) => {
  const { toast } = useToast();

  const handleCriminalOperation = (operation: any) => {
    console.log('Criminal operation:', operation);
    toast({
      title: "Criminal Operation",
      description: "Criminal operations are not yet fully implemented",
    });
  };

  const handleCybercrime = (crime: any) => {
    console.log('Cybercrime:', crime);
    toast({
      title: "Cybercrime",
      description: "Cybercrime activities are not yet implemented",
    });
  };

  const handleMurder = (target: any) => {
    console.log('Murder target:', target);
    toast({
      title: "Murder",
      description: "Murder activities are not yet implemented",
    });
  };

  const handleActivity = (activityId: string, activityData?: any) => {
    // Check if it's a special activity type
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

    // Handle regular activities
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
  };

  const handleEducation = (action: string, data?: any) => {
    handleEducationAction(
      gameState.character,
      action,
      data,
      ageHistory,
      setAgeHistory,
      onGameStateChange,
      gameState,
      toast
    );
  };

  const handleCareer = (action: string, data?: any) => {
    handleCareerAction(
      gameState.character,
      action,
      data,
      ageHistory,
      setAgeHistory,
      onGameStateChange,
      gameState,
      toast
    );
  };

  const handleRelationship = (action: string, data?: any) => {
    handleRelationshipAction(
      gameState.character,
      action,
      ageHistory,
      setAgeHistory,
      onGameStateChange,
      gameState,
      toast,
      data
    );
  };

  return {
    handleActivity,
    handleEducation,
    handleCareer,
    handleRelationship,
    handleCriminalOperation,
    handleCybercrime,
    handleMurder
  };
};

export default useGameActions;
