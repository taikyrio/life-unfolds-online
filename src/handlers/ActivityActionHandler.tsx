

import { Character, GameState } from '../types/game';

export const handleActivityAction = (
  character: Character,
  activityId: string,
  activityData: any,
  updateHistory: (history: Record<number, string[]>) => void,
  onGameStateChange: (state: GameState) => void,
  gameState: GameState,
  toast: any
) => {
  console.log('Activity action:', activityId, activityData);
  toast({
    title: "Activity",
    description: `Performed activity: ${activityId}`,
  });
};

