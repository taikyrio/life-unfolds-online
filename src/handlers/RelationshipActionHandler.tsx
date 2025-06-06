

import { Character, GameState } from '../types/game';

export const handleRelationshipAction = (
  character: Character,
  action: string,
  data: any,
  ageHistory: Record<number, string[]>,
  setAgeHistory: React.Dispatch<React.SetStateAction<Record<number, string[]>>>,
  onGameStateChange: (state: GameState) => void,
  gameState: GameState,
  toast: any
) => {
  console.log('Relationship action:', action, data);
  toast({
    title: "Relationship Action",
    description: `Relationship action: ${action}`,
  });
};

