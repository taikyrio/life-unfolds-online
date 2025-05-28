
import { Character } from '../types/game';

export const generateRandomName = (): string => {
  const names = [
    'Alex', 'Jordan', 'Casey', 'Riley', 'Morgan', 'Avery', 'Quinn', 'Taylor',
    'Sam', 'Blake', 'Cameron', 'Devon', 'Finley', 'Harper', 'Hayden', 'Jamie'
  ];
  return names[Math.floor(Math.random() * names.length)];
};

export const generateRandomStats = (): Omit<Character, 'name' | 'age' | 'year'> => {
  return {
    health: Math.floor(Math.random() * 30) + 70, // 70-100
    happiness: Math.floor(Math.random() * 30) + 70, // 70-100
    wealth: Math.floor(Math.random() * 200) + 50, // 50-250
    relationships: Math.floor(Math.random() * 30) + 70, // 70-100
  };
};

export const clampStat = (value: number, min: number = 0, max: number = 100): number => {
  return Math.max(min, Math.min(max, value));
};

export const applyStat Effects = (character: Character, effects: any): Character => {
  return {
    ...character,
    health: clampStat(character.health + (effects.health || 0)),
    happiness: clampStat(character.happiness + (effects.happiness || 0)),
    wealth: Math.max(0, character.wealth + (effects.wealth || 0)), // Wealth can go below 100 but not below 0
    relationships: clampStat(character.relationships + (effects.relationships || 0)),
  };
};

export const getStatColor = (value: number): string => {
  if (value >= 80) return 'text-green-600';
  if (value >= 60) return 'text-yellow-600';
  if (value >= 40) return 'text-orange-600';
  return 'text-red-600';
};

export const getStatEmoji = (stat: string, value: number): string => {
  const emojis = {
    health: value >= 80 ? '💪' : value >= 60 ? '😊' : value >= 40 ? '😐' : '🤒',
    happiness: value >= 80 ? '😄' : value >= 60 ? '😊' : value >= 40 ? '😐' : '😢',
    wealth: value >= 200 ? '💰' : value >= 100 ? '💵' : value >= 50 ? '💳' : '🪙',
    relationships: value >= 80 ? '❤️' : value >= 60 ? '💛' : value >= 40 ? '🤝' : '💔',
  };
  return emojis[stat as keyof typeof emojis] || '📊';
};

export const isGameOver = (character: Character): { gameOver: boolean; reason?: string } => {
  if (character.health <= 0) {
    return { gameOver: true, reason: 'Your health reached zero. Game over!' };
  }
  if (character.age >= 100) {
    return { gameOver: true, reason: 'You lived to be 100! What an amazing life!' };
  }
  return { gameOver: false };
};
