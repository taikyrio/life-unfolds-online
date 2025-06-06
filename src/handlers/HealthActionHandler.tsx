

import { Character, GameState } from '../types/game';

export const handleHealthAction = (
  character: Character,
  action: string,
  data: any,
  ageHistory: Record<number, string[]>,
  setAgeHistory: React.Dispatch<React.SetStateAction<Record<number, string[]>>>,
  onGameStateChange: (state: GameState) => void,
  gameState: GameState,
  toast: any
) => {
  console.log('Health action:', action, data);
  toast({
    title: "Health Action",
    description: `Health action: ${action}`,
  });
};

