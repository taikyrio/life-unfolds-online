
import React from 'react';
import { Character, GameState } from '../../types/game';
import { handleActivityAction } from '../handlers/ActivityActionHandler';
import { handleEducationAction } from '../handlers/EducationActionHandler';
import { handleCareerAction } from '../handlers/CareerActionHandler';
import { handleRelationshipAction } from '../handlers/RelationshipActionHandler';
import { toast } from '../ui/use-toast';

interface GameActionsProps {
  gameState: GameState;
  onGameStateChange: (newState: GameState) => void;
  ageHistory: any[];
  setAgeHistory: React.Dispatch<React.SetStateAction<any[]>>;
}

export const GameActions: React.FC<GameActionsProps> = ({
  gameState,
  onGameStateChange,
  ageHistory,
  setAgeHistory
}) => {

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
      data,
      ageHistory,
      setAgeHistory,
      onGameStateChange,
      gameState,
      toast
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

export default GameActions;
