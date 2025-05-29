
import { Character, FamilyMember } from '../types/game';
import { generateRandomName } from '../utils/gameUtils';

export interface Compatibility {
  physical: number;
  emotional: number;
  intellectual: number;
  lifestyle: number;
  overall: number;
}

export interface DateOutcome {
  success: boolean;
  message: string;
  relationshipChange: number;
  happinessChange: number;
  cost: number;
}

export const calculateCompatibility = (character: Character, partner: FamilyMember): Compatibility => {
  // Physical compatibility based on looks
  const physical = Math.min(100, (character.looks + partner.relationshipQuality) / 2);
  
  // Emotional compatibility based on happiness and relationship quality
  const emotional = Math.min(100, (character.happiness + partner.relationshipQuality) / 2);
  
  // Intellectual compatibility based on smarts
  const intellectual = Math.min(100, character.smarts);
  
  // Lifestyle compatibility based on wealth and age similarity
  const ageDifference = Math.abs(character.age - partner.age);
  const ageCompatibility = Math.max(0, 100 - (ageDifference * 5));
  const lifestyle = Math.min(100, (ageCompatibility + character.wealth / 10) / 2);
  
  const overall = (physical + emotional + intellectual + lifestyle) / 4;
  
  return {
    physical,
    emotional,
    intellectual,
    lifestyle,
    overall
  };
};

export const generatePotentialPartner = (character: Character): FamilyMember => {
  const ageVariation = Math.floor(Math.random() * 10) - 5; // ±5 years
  const partnerAge = Math.max(18, Math.min(80, character.age + ageVariation));
  
  return {
    id: Math.random().toString(36).substring(2, 15),
    name: generateRandomName(),
    relationship: 'friend',
    age: partnerAge,
    alive: true,
    health: Math.floor(Math.random() * 30) + 70,
    relationshipQuality: Math.floor(Math.random() * 50) + 25 // 25-75 base
  };
};

export const goOnDate = (
  character: Character, 
  partner: FamilyMember, 
  dateType: 'casual' | 'fancy' | 'activity'
): DateOutcome => {
  const compatibility = calculateCompatibility(character, partner);
  const costs = { casual: 50, fancy: 200, activity: 100 };
  const cost = costs[dateType];
  
  if (character.wealth < cost) {
    return {
      success: false,
      message: "You don't have enough money for this date!",
      relationshipChange: -10,
      happinessChange: -5,
      cost: 0
    };
  }
  
  // Success chance based on compatibility and date type
  let successChance = compatibility.overall / 100;
  if (dateType === 'fancy') successChance += 0.2;
  if (dateType === 'activity') successChance += 0.1;
  
  const success = Math.random() < successChance;
  
  if (success) {
    const relationshipBonus = dateType === 'fancy' ? 20 : dateType === 'activity' ? 15 : 10;
    return {
      success: true,
      message: `You had a wonderful ${dateType} date with ${partner.name}!`,
      relationshipChange: relationshipBonus,
      happinessChange: 15,
      cost
    };
  } else {
    return {
      success: false,
      message: `The ${dateType} date with ${partner.name} didn't go very well.`,
      relationshipChange: -5,
      happinessChange: -10,
      cost
    };
  }
};

export const proposeMarriage = (character: Character, partner: FamilyMember): {
  accepted: boolean;
  message: string;
  ringCost: number;
} => {
  const compatibility = calculateCompatibility(character, partner);
  const ringCost = 500;
  
  if (character.wealth < ringCost) {
    return {
      accepted: false,
      message: "You can't afford an engagement ring!",
      ringCost: 0
    };
  }
  
  const acceptanceChance = (compatibility.overall + partner.relationshipQuality) / 200;
  const accepted = Math.random() < acceptanceChance;
  
  return {
    accepted,
    message: accepted 
      ? `${partner.name} said yes! You're engaged!`
      : `${partner.name} turned down your proposal.`,
    ringCost: accepted ? ringCost : 0
  };
};

export const getRelationshipAdvice = (compatibility: Compatibility): string[] => {
  const advice: string[] = [];
  
  if (compatibility.physical < 50) {
    advice.push("Work on your appearance to improve physical attraction.");
  }
  if (compatibility.emotional < 50) {
    advice.push("Focus on building emotional connection through deep conversations.");
  }
  if (compatibility.intellectual < 50) {
    advice.push("Engage in educational activities together to build intellectual bond.");
  }
  if (compatibility.lifestyle < 50) {
    advice.push("Try to align your lifestyles and future goals.");
  }
  
  if (advice.length === 0) {
    advice.push("You have great compatibility! Keep nurturing this relationship.");
  }
  
  return advice;
};
