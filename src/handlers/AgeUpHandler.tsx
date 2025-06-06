

import { GameState } from '../types/game';

export const handleAgeUp = (gameState: GameState): GameState => {
  return {
    ...gameState,
    character: {
      ...gameState.character,
      age: gameState.character.age + 1
    }
  };
};

