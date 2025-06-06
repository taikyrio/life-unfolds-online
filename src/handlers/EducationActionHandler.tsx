

import { Character, GameState } from '../types/game';

export const handleEducationAction = (
  character: Character,
  action: string,
  data: any,
  ageHistory: Record<number, string[]>,
  setAgeHistory: React.Dispatch<React.SetStateAction<Record<number, string[]>>>,
  onGameStateChange: (state: GameState) => void,
  gameState: GameState,
  toast: any
) => {
  console.log('Education action:', action, data);
  toast({
    title: "Education Action",
    description: `Education action: ${action}`,
  });
};

