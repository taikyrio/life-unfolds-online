
import { Character } from '../types/game';

export const isGameOver = (character: Character): { gameOver: boolean; reason?: string } => {
  if (character.health <= 0) {
    return { gameOver: true, reason: 'You died from poor health.' };
  }
  
  if (character.age >= 100) {
    return { gameOver: true, reason: 'You lived a full life and passed away peacefully at age 100.' };
  }
  
  return { gameOver: false };
};
