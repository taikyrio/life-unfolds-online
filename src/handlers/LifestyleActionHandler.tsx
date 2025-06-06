

import { Character, GameState } from '../types/game';

export const handleLifestyleAction = (
  character: Character,
  action: string,
  data: any,
  ageHistory: Record<number, string[]>,
  setAgeHistory: React.Dispatch<React.SetStateAction<Record<number, string[]>>>,
  onGameStateChange: (state: GameState) => void,
  gameState: GameState,
  toast: any
) => {
  console.log('Lifestyle action:', action, data);
  toast({
    title: "Lifestyle Action",
    description: `Lifestyle action: ${action}`,
  });
};

