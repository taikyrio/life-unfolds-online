
import { Character } from '../types/game';
import { checkForHealthConditions } from '../systems/healthSystem';

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
  // Check for extreme old age
  if (character.age >= 120) {
    return { gameOver: true, reason: 'You lived an extraordinary long life and passed away peacefully.' };
  }
  
  // Check for critical health conditions
  const healthCondition = checkForHealthConditions(character);
  const isYoungAdult = character.age >= 18 && character.age <= 35;
  
  // Young adults with low health but no serious illness have a chance to recover
  if (character.health <= 0) {
    if (isYoungAdult && !healthCondition) {
      // 40% chance of emergency recovery for young adults without serious illness
      if (Math.random() < 0.4) {
        return { gameOver: false }; // They survive and can recover
      }
    }
    
    // Determine death reason based on conditions
    if (healthCondition) {
      return { gameOver: true, reason: `You died from complications related to ${healthCondition.name}.` };
    } else if (character.age > 70) {
      return { gameOver: true, reason: 'Your health gave out due to old age.' };
    } else if (character.age > 35) {
      return { gameOver: true, reason: 'You died from poor health and lifestyle choices.' };
    } else {
      return { gameOver: true, reason: 'A tragic accident took your life at a young age.' };
    }
  }
  
  // Critical health warning for young adults
  if (character.health <= 20 && isYoungAdult) {
    // This is a warning state, not death - they need medical attention
    return { gameOver: false };
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
