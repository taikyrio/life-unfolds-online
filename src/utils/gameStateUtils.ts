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
  const isMiddleAged = character.age >= 36 && character.age <= 65;

  // Calculate death probability based on multiple factors
  if (character.health <= 0) {
    let survivalChance = 0;

    // Age-based survival chances
    if (character.age < 18) survivalChance = 0.7;
    else if (isYoungAdult) survivalChance = 0.5;
    else if (isMiddleAged) survivalChance = 0.3;
    else survivalChance = 0.1;

    // Modify based on health conditions
    if (healthCondition) {
      survivalChance *= 0.5; // Serious illness reduces survival
    }

    // Wealth can improve medical care
    if (character.wealth > 80) survivalChance *= 1.3;
    else if (character.wealth > 50) survivalChance *= 1.1;

    // Happiness affects will to live
    if (character.happiness > 70) survivalChance *= 1.2;
    else if (character.happiness < 30) survivalChance *= 0.8;

    // Check if they survive
    if (Math.random() < survivalChance) {
      return { gameOver: false }; // They survive this crisis
    }

    // Determine death reason with more variety
    const deathReasons = [];

    if (healthCondition) {
      deathReasons.push(`You died from complications related to ${healthCondition.name}.`);
    }

    if (character.age > 70) {
      deathReasons.push('Your health gave out due to old age.');
      deathReasons.push('You passed away peacefully in your sleep.');
    } else if (character.age > 35) {
      deathReasons.push('You died from poor health and lifestyle choices.');
      deathReasons.push('Your body could no longer cope with the stress.');
    } else {
      deathReasons.push('A tragic accident took your life at a young age.');
      deathReasons.push('An unexpected medical emergency proved fatal.');
    }

    const reason = deathReasons[Math.floor(Math.random() * deathReasons.length)];
    return { gameOver: true, reason };
  }

  // Progressive health warnings
  if (character.health <= 10) {
    // Critical state - high chance of events leading to death
    return { gameOver: false };
  }

  // Check for other game over conditions
  if (character.happiness <= 0 && character.age > 16) {
    // Severe depression can lead to game over in rare cases
    if (Math.random() < 0.05) {
      return { gameOver: true, reason: 'You succumbed to severe depression and took your own life.' };
    }
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