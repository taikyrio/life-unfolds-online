import React from 'react';
import { Character } from '../types/game';
import { ActivitiesTabContainer } from './activities/ActivitiesTabContainer';

interface ActivitiesTabProps {
  character: Character;
  onActivity: (activityType: string, activityId: string) => void;
}

export const ActivitiesTab: React.FC<ActivitiesTabProps> = ({ character, onActivity }) => {
  return (
    <ActivitiesTabContainer 
      character={character}
      onActivity={onActivity}
    />
  );
};