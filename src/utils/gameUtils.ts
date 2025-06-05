
import { Character } from '../types/game';
import { StatEffects } from '../types/core';

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

export const getStatColor = (value: number): string => {
  if (value >= 80) return 'text-green-600';
  if (value >= 60) return 'text-yellow-600';
  if (value >= 40) return 'text-orange-600';
  return 'text-red-600';
};

export const getLifeStage = (age: number): string => {
  if (age < 2) return 'Baby';
  if (age < 4) return 'Toddler';
  if (age < 13) return 'Child';
  if (age < 18) return 'Teenager';
  if (age < 65) return 'Adult';
  return 'Senior';
};

export const applyStatEffects = (character: Character, effects: StatEffects): Character => {
  const updatedCharacter = { ...character };

  // Apply numeric stat changes
  if (effects.health !== undefined) {
    updatedCharacter.health = Math.max(0, Math.min(100, character.health + effects.health));
  }
  if (effects.happiness !== undefined) {
    updatedCharacter.happiness = Math.max(0, Math.min(100, character.happiness + effects.happiness));
  }
  if (effects.smarts !== undefined) {
    updatedCharacter.smarts = Math.max(0, Math.min(100, character.smarts + effects.smarts));
  }
  if (effects.looks !== undefined) {
    updatedCharacter.looks = Math.max(0, Math.min(100, character.looks + effects.looks));
  }
  if (effects.wealth !== undefined) {
    updatedCharacter.wealth = Math.max(0, character.wealth + effects.wealth);
  }
  if (effects.relationships !== undefined) {
    updatedCharacter.relationships = Math.max(0, Math.min(100, character.relationships + effects.relationships));
  }
  if (effects.fame !== undefined) {
    updatedCharacter.fame = Math.max(0, Math.min(100, character.fame + effects.fame));
  }

  // Apply string-based changes
  if (effects.education) {
    updatedCharacter.educationLevel = effects.education;
  }
  if (effects.job) {
    updatedCharacter.job = effects.job;
  }
  if (effects.relationshipStatus) {
    updatedCharacter.relationshipStatus = effects.relationshipStatus as any;
  }

  // Apply criminal record changes
  if (effects.criminalRecord) {
    if (!updatedCharacter.criminalRecord) {
      updatedCharacter.criminalRecord = {
        arrests: 0,
        convictions: 0,
        prisonTime: 0,
        crimes: [],
        notoriety: 0,
        totalSentence: 0,
        currentlyIncarcerated: false
      };
    }
    
    Object.assign(updatedCharacter.criminalRecord, effects.criminalRecord);
  }

  return updatedCharacter;
};

export const formatMoney = (amount: number): string => {
  if (amount >= 1000000000) {
    return `$${(amount / 1000000000).toFixed(1)}B`;
  }
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`;
  }
  return `$${amount.toFixed(0)}`;
};

export const getAgeGroup = (age: number): string => {
  if (age < 13) return 'child';
  if (age < 18) return 'teenager';
  if (age < 65) return 'adult';
  return 'senior';
};

export const calculateStatChange = (current: number, change: number, min = 0, max = 100): number => {
  return Math.max(min, Math.min(max, current + change));
};

export const getRandomChoice = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const weightedRandomChoice = <T>(items: T[], weights: number[]): T => {
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  let random = Math.random() * totalWeight;
  
  for (let i = 0; i < items.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return items[i];
    }
  }
  
  return items[items.length - 1];
};

export const ageCharacter = (character: Character): Character => {
  return {
    ...character,
    age: character.age + 1,
  };
};

export const isGameOver = (character: Character): { gameOver: boolean; reason?: string } => {
  // Check for extreme old age
  if (character.age >= 120) {
    return { gameOver: true, reason: 'You lived an extraordinary long life and passed away peacefully.' };
  }

  // Check for critical health conditions
  if (character.health <= 0) {
    let survivalChance = 0;

    // Age-based survival chances
    if (character.age < 18) survivalChance = 0.7;
    else if (character.age >= 18 && character.age <= 35) survivalChance = 0.5;
    else if (character.age >= 36 && character.age <= 65) survivalChance = 0.3;
    else survivalChance = 0.1;

    // Random survival check
    if (Math.random() < survivalChance) {
      return { gameOver: false };
    }

    // Determine death cause based on age and health
    let deathCause = 'You succumbed to poor health.';
    if (character.age < 18) {
      deathCause = 'Despite your young age, your health deteriorated beyond recovery.';
    } else if (character.age >= 65) {
      deathCause = 'Your health declined with age and you passed away peacefully.';
    }

    return { gameOver: true, reason: deathCause };
  }

  return { gameOver: false };
};
