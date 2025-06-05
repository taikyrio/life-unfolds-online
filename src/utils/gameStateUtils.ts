
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

export const getLifeStage = (age: number): string => {
  if (age <= 2) return 'baby';
  if (age <= 5) return 'toddler';
  if (age <= 12) return 'child';
  if (age <= 17) return 'teenager';
  if (age <= 64) return 'adult';
  return 'senior';
};
