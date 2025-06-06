

import { Character, GameState } from '../types/game';

export const handleCareerAction = (
  character: Character,
  action: string,
  data: any,
  ageHistory: Record<number, string[]>,
  setAgeHistory: React.Dispatch<React.SetStateAction<Record<number, string[]>>>,
  onGameStateChange: (state: GameState) => void,
  gameState: GameState,
  toast: any
) => {
  console.log('Career action:', action, data);
  toast({
    title: "Career Action",
    description: `Career action: ${action}`,
  });
};

