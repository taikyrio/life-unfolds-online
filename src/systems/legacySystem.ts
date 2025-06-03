
import { Character } from '../types/game';

export interface Legacy {
  id: string;
  generation: number;
  inheritedWealth: number;
  inheritedTraits: string[];
  familyReputation: number;
  heirlooms: string[];
  achievements: string[];
}

export interface Inheritance {
  wealth: number;
  traits: { [key: string]: number };
  reputation: number;
  businesses: string[];
  properties: string[];
  debts: number;
}

export const calculateInheritance = (character: Character): Inheritance => {
  const baseWealth = Math.floor(character.wealth * 0.7); // 30% goes to taxes/fees
  
  const inheritedTraits: { [key: string]: number } = {
    intelligence: Math.floor(character.smarts * 0.3),
    charisma: Math.floor(character.relationships * 0.2),
    health: Math.floor(character.health * 0.1),
    looks: Math.floor(character.looks * 0.2)
  };

  const reputation = character.fame + character.notoriety;
  
  return {
    wealth: baseWealth,
    traits: inheritedTraits,
    reputation: Math.floor(reputation * 0.5),
    businesses: character.businesses || [],
    properties: character.properties || [],
    debts: character.debts || 0
  };
};

export const applyInheritance = (newCharacter: Character, inheritance: Inheritance): Character => {
  return {
    ...newCharacter,
    wealth: newCharacter.wealth + inheritance.wealth,
    smarts: Math.min(100, newCharacter.smarts + inheritance.traits.intelligence),
    relationships: Math.min(100, newCharacter.relationships + inheritance.traits.charisma),
    health: Math.min(100, newCharacter.health + inheritance.traits.health),
    looks: Math.min(100, newCharacter.looks + inheritance.traits.looks),
    fame: Math.floor(inheritance.reputation * 0.3),
    inheritedWealth: inheritance.wealth,
    familyLegacy: {
      generation: (newCharacter.familyLegacy?.generation || 0) + 1,
      totalWealthEarned: inheritance.wealth,
      familyAchievements: newCharacter.familyLegacy?.familyAchievements || [],
      familyBusinesses: inheritance.businesses,
      familyReputation: inheritance.reputation
    }
  };
};

export const getFamilyBonus = (character: Character): { [key: string]: number } => {
  const generation = character.familyLegacy?.generation || 1;
  const reputation = character.familyLegacy?.familyReputation || 0;
  
  const bonuses: { [key: string]: number } = {};
  
  if (generation >= 2) {
    bonuses.socialConnections = 10;
    bonuses.jobOpportunities = 5;
  }
  
  if (generation >= 3) {
    bonuses.educationDiscount = 20; // 20% off education costs
    bonuses.businessConnections = 15;
  }
  
  if (reputation > 50) {
    bonuses.fameBoost = Math.floor(reputation * 0.1);
  }
  
  return bonuses;
};

export const createFamilyTree = (character: Character): any[] => {
  // This would create a visual family tree
  return [
    {
      generation: character.familyLegacy?.generation || 1,
      name: character.name,
      achievements: character.achievements || [],
      wealth: character.wealth,
      occupation: character.job,
      lifespan: character.age
    }
  ];
};
