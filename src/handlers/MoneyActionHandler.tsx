

import { Character, GameState } from '../types/game';

export const handleMoneyAction = (
  character: Character,
  action: string,
  data: any,
  ageHistory: Record<number, string[]>,
  setAgeHistory: React.Dispatch<React.SetStateAction<Record<number, string[]>>>,
  onGameStateChange: (state: GameState) => void,
  gameState: GameState,
  toast: any
) => {
  console.log('Money action:', action, data);
  toast({
    title: "Money Action",
    description: `Money action: ${action}`,
  });
};

