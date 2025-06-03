
import { Character } from '../types/game';

export interface Disaster {
  id: string;
  name: string;
  description: string;
  emoji: string;
  severity: 'minor' | 'major' | 'catastrophic';
  probability: number;
  effects: {
    health?: number;
    wealth?: number;
    happiness?: number;
    relationships?: number;
  };
  ageRequirement?: { min?: number; max?: number };
  locationRequirement?: string[];
}

export const disasters: Disaster[] = [
  {
    id: 'house_fire',
    name: 'House Fire',
    description: 'A fire broke out in your home!',
    emoji: '🔥',
    severity: 'major',
    probability: 0.01,
    effects: {
      wealth: -25000,
      health: -15,
      happiness: -30
    }
  },
  {
    id: 'car_accident',
    name: 'Car Accident',
    description: 'You were involved in a car accident.',
    emoji: '🚗',
    severity: 'major',
    probability: 0.02,
    ageRequirement: { min: 16 },
    effects: {
      health: -25,
      wealth: -10000,
      happiness: -20
    }
  },
  {
    id: 'tornado',
    name: 'Tornado',
    description: 'A tornado hit your area!',
    emoji: '🌪️',
    severity: 'major',
    probability: 0.005,
    effects: {
      wealth: -50000,
      health: -20,
      happiness: -25
    }
  },
  {
    id: 'earthquake',
    name: 'Earthquake',
    description: 'A strong earthquake shook your city.',
    emoji: '🫨',
    severity: 'major',
    probability: 0.008,
    effects: {
      wealth: -30000,
      health: -15,
      happiness: -20
    }
  },
  {
    id: 'job_layoffs',
    name: 'Economic Recession',
    description: 'Economic downturn led to mass layoffs.',
    emoji: '📉',
    severity: 'major',
    probability: 0.03,
    effects: {
      wealth: -20000,
      happiness: -25,
      relationships: -10
    }
  },
  {
    id: 'pandemic',
    name: 'Global Pandemic',
    description: 'A pandemic has affected the entire world.',
    emoji: '🦠',
    severity: 'catastrophic',
    probability: 0.001,
    effects: {
      health: -30,
      wealth: -15000,
      happiness: -35,
      relationships: -15
    }
  }
];

export const checkForDisasters = (character: Character): Disaster | null => {
  // Disasters are more likely during certain age ranges
  const ageFactor = character.age < 18 ? 0.5 : character.age > 65 ? 1.2 : 1.0;
  
  // Wealth can sometimes protect from certain disasters
  const wealthFactor = character.wealth > 500000 ? 0.8 : character.wealth < 10000 ? 1.3 : 1.0;
  
  for (const disaster of disasters) {
    // Check age requirements
    if (disaster.ageRequirement) {
      if (disaster.ageRequirement.min && character.age < disaster.ageRequirement.min) continue;
      if (disaster.ageRequirement.max && character.age > disaster.ageRequirement.max) continue;
    }
    
    const adjustedProbability = disaster.probability * ageFactor * wealthFactor;
    
    if (Math.random() < adjustedProbability) {
      return disaster;
    }
  }
  
  return null;
};

export const applyDisasterEffects = (character: Character, disaster: Disaster): Character => {
  let updatedCharacter = { ...character };
  
  Object.entries(disaster.effects).forEach(([stat, effect]) => {
    if (typeof effect === 'number' && stat in updatedCharacter) {
      const currentValue = (updatedCharacter as any)[stat] || 0;
      (updatedCharacter as any)[stat] = Math.max(0, Math.min(100, currentValue + effect));
    }
  });
  
  // Add to disaster history for insurance/achievement purposes
  updatedCharacter.disasterHistory = updatedCharacter.disasterHistory || [];
  updatedCharacter.disasterHistory.push({
    age: character.age,
    disasterId: disaster.id,
    name: disaster.name,
    severity: disaster.severity
  });
  
  return updatedCharacter;
};

export const getInsuranceCost = (character: Character): number => {
  const baseRate = 1200; // Annual insurance cost
  const disasterHistory = character.disasterHistory || [];
  
  // Higher rates for those with disaster history
  const historyMultiplier = 1 + (disasterHistory.length * 0.1);
  
  // Location-based rates (would integrate with country system)
  const locationMultiplier = 1.0; // Base rate
  
  // Wealth-based coverage
  const wealthMultiplier = character.wealth > 100000 ? 1.5 : 1.0;
  
  return Math.floor(baseRate * historyMultiplier * locationMultiplier * wealthMultiplier);
};
