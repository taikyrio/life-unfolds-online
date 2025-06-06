

import { Character, GameState } from '../types/game';

export const handleDeath = (gameState: GameState): GameState => {
  return {
    ...gameState,
    gameOver: true,
    gameOverReason: 'death'
  };
};

export const handleEmigrate = (gameState: GameState): GameState => {
  return {
    ...gameState,
    gameOver: true,
    gameOverReason: 'emigration'
  };
};

export const handleSurrender = (gameState: GameState): GameState => {
  return {
    ...gameState,
    gameOver: true,
    gameOverReason: 'surrender'
  };
};

