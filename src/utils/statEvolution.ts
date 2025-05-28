
import { Character } from '../types/game';
import { getLifeStage } from './gameUtils';

export interface StatEvolutionConfig {
  baseChange: number;
  ageMultiplier: number;
  randomFactor: number;
  dependencies?: { stat: keyof Character; influence: number }[];
}

export const statEvolutionRules: Record<string, StatEvolutionConfig> = {
  health: {
    baseChange: -0.5, // Gradual decline with age
    ageMultiplier: 0.02, // Accelerates with age
    randomFactor: 0.3,
    dependencies: [
      { stat: 'happiness', influence: 0.1 },
      { stat: 'wealth', influence: 0.05 } // Better healthcare with money
    ]
  },
  happiness: {
    baseChange: 0,
    ageMultiplier: 0,
    randomFactor: 0.4,
    dependencies: [
      { stat: 'health', influence: 0.2 },
      { stat: 'relationships', influence: 0.15 },
      { stat: 'wealth', influence: 0.1 }
    ]
  },
  smarts: {
    baseChange: 0.2, // Slight increase through life experience
    ageMultiplier: -0.01, // Slower learning with age
    randomFactor: 0.2,
    dependencies: []
  },
  looks: {
    baseChange: -0.3, // Natural aging
    ageMultiplier: 0.015,
    randomFactor: 0.3,
    dependencies: [
      { stat: 'health', influence: 0.15 },
      { stat: 'wealth', influence: 0.1 } // Better grooming/treatments
    ]
  },
  relationships: {
    baseChange: 0.1, // Slight improvement through social experience
    ageMultiplier: -0.005,
    randomFactor: 0.4,
    dependencies: [
      { stat: 'happiness', influence: 0.1 },
      { stat: 'looks', influence: 0.05 }
    ]
  }
};

export const evolveStatsNaturally = (character: Character): Partial<Character> => {
  const age = character.age;
  const lifeStage = getLifeStage(age);
  const updates: any = {};

  // Core stat evolution
  Object.entries(statEvolutionRules).forEach(([statName, config]) => {
    const currentValue = character[statName as keyof Character] as number;
    if (typeof currentValue !== 'number') return;

    let change = config.baseChange;
    
    // Age-based acceleration
    change += config.ageMultiplier * age;
    
    // Life stage modifications
    switch (lifeStage) {
      case 'Baby':
      case 'Toddler':
        if (statName === 'smarts') change += 2; // Rapid learning
        if (statName === 'health') change += 1; // Growing strong
        break;
      case 'Child':
        if (statName === 'smarts') change += 1.5;
        if (statName === 'health') change += 0.5;
        break;
      case 'Teen':
        if (statName === 'looks') change += 0.5; // Growth spurt benefits
        if (statName === 'happiness') change -= 0.5; // Teenage angst
        break;
      case 'Young Adult':
        if (statName === 'looks') change += 0.2; // Peak physical condition
        break;
      case 'Senior':
        if (statName === 'health') change -= 1; // Accelerated decline
        if (statName === 'smarts') change -= 0.3; // Cognitive decline
        if (statName === 'happiness') change += 0.3; // Wisdom and acceptance
        break;
    }

    // Dependency influences
    config.dependencies?.forEach(dep => {
      const depValue = character[dep.stat] as number;
      if (typeof depValue === 'number') {
        const influence = (depValue - 50) / 50; // Normalize to -1 to 1
        change += influence * dep.influence;
      }
    });

    // Random factor
    const randomAdjustment = (Math.random() - 0.5) * config.randomFactor;
    change += randomAdjustment;

    // Apply change with bounds
    const newValue = Math.max(0, Math.min(100, currentValue + change));
    updates[statName] = Math.round(newValue * 10) / 10; // Round to 1 decimal
  });

  // Special cases for wealth evolution
  if (character.job && character.salary) {
    const baseIncome = character.salary * (0.8 + Math.random() * 0.4);
    const expenses = age * 2 + (character.familyMembers?.length || 0) * 10;
    updates.wealth = Math.max(0, (character.wealth || 0) + baseIncome - expenses);
  }

  return updates;
};

export const getStatMessage = (statName: string, change: number): string => {
  const absChange = Math.abs(change);
  
  if (absChange < 1) return '';
  
  const direction = change > 0 ? 'improved' : 'declined';
  const magnitude = absChange > 10 ? 'significantly' : absChange > 5 ? 'noticeably' : 'slightly';
  
  const statMessages: Record<string, { positive: string; negative: string }> = {
    health: { 
      positive: 'You feel healthier and more energetic.',
      negative: 'Your health has been declining lately.'
    },
    happiness: {
      positive: 'You feel more content with life.',
      negative: 'You\'ve been feeling down lately.'
    },
    smarts: {
      positive: 'You feel mentally sharper.',
      negative: 'You feel like you\'re not as quick as you used to be.'
    },
    looks: {
      positive: 'You\'re looking good lately!',
      negative: 'You notice signs of aging.'
    },
    relationships: {
      positive: 'Your social connections are stronger.',
      negative: 'You feel more isolated from others.'
    }
  };

  const message = statMessages[statName];
  if (!message) return '';

  return `${magnitude.charAt(0).toUpperCase() + magnitude.slice(1)} ${change > 0 ? message.positive : message.negative}`;
};
