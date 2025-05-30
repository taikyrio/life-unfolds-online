
import { Character } from '../types/game';

export const getLifeStage = (age: number): string => {
  if (age < 1) return 'Baby';
  if (age < 4) return 'Toddler';
  if (age < 13) return 'Child';
  if (age < 18) return 'Teen';
  if (age < 30) return 'Young Adult';
  if (age < 50) return 'Adult';
  if (age < 65) return 'Middle-aged';
  return 'Senior';
};

export const isGameOver = (character: Character): { gameOver: boolean; reason?: string } => {
  if (character.health <= 0) {
    return { gameOver: true, reason: 'You died from poor health.' };
  }
  
  if (character.age >= 120) {
    return { gameOver: true, reason: 'You lived an extraordinary long life and passed away peacefully.' };
  }
  
  return { gameOver: false };
};

export const getStatColor = (value: number): string => {
  if (value >= 80) return 'text-green-600';
  if (value >= 60) return 'text-yellow-600';
  if (value >= 40) return 'text-orange-600';
  return 'text-red-600';
};

export const getStatEmoji = (statName: string, value?: number): string => {
  const val = value || 50;
  const emojis = {
    health: val >= 80 ? '💚' : val >= 60 ? '💛' : val >= 40 ? '🧡' : '❤️',
    happiness: val >= 80 ? '😄' : val >= 60 ? '😊' : val >= 40 ? '😐' : '😢',
    smarts: val >= 80 ? '🧠' : val >= 60 ? '📚' : val >= 40 ? '🤓' : '📖',
    looks: val >= 80 ? '✨' : val >= 60 ? '😊' : val >= 40 ? '🙂' : '😕',
    wealth: val >= 80 ? '💰' : val >= 60 ? '💵' : val >= 40 ? '💴' : '💸',
    relationships: val >= 80 ? '💕' : val >= 60 ? '❤️' : val >= 40 ? '💛' : '💔'
  };
  
  return emojis[statName as keyof typeof emojis] || '❓';
};
