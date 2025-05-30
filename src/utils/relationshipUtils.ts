
import { Character, FamilyMember } from '../types/game';
import { generateRandomName } from './characterUtils';

const generateRelationshipStats = (baseLevel: number = 50) => ({
  relationshipLevel: Math.floor(Math.random() * 40) + baseLevel,
  trust: Math.floor(Math.random() * 40) + baseLevel,
  respect: Math.floor(Math.random() * 40) + baseLevel,
  lastInteraction: new Date().toISOString(),
  interactionHistory: []
});

const generatePersonalityTraits = () => ({
  kindness: Math.floor(Math.random() * 100),
  loyalty: Math.floor(Math.random() * 100),
  intelligence: Math.floor(Math.random() * 100),
  humor: Math.floor(Math.random() * 100),
  ambition: Math.floor(Math.random() * 100),
  stability: Math.floor(Math.random() * 100),
  generosity: Math.floor(Math.random() * 100)
});

export const findLove = (character: Character): { success: boolean; partner?: FamilyMember; message: string } => {
  if (character.age < 16) {
    return { success: false, message: "You're too young for serious relationships!" };
  }
  
  if (Math.random() < 0.3) {
    const partner: FamilyMember = {
      id: Math.random().toString(36).substring(2, 15),
      name: generateRandomName(),
      relationship: 'lover',
      age: character.age + Math.floor(Math.random() * 10) - 5,
      alive: true,
      health: Math.floor(Math.random() * 40) + 60,
      relationshipQuality: Math.floor(Math.random() * 30) + 50,
      relationshipStats: generateRelationshipStats(50),
      personality: generatePersonalityTraits(),
      currentMood: 'neutral' as const
    };
    return { success: true, partner, message: `You met ${partner.name} and started dating!` };
  }
  
  return { success: false, message: "You didn't find anyone special this time." };
};

export const intimateActivity = (character: Character, isProtected: boolean): { success: boolean; message: string; pregnant?: boolean } => {
  const partner = character.familyMembers.find(m => m.relationship === 'lover' || m.relationship === 'spouse');
  if (!partner) {
    return { success: false, message: "You need to be in a relationship first!" };
  }
  
  let message = `You had an intimate moment with ${partner.name}.`;
  let pregnant = false;
  
  if (!isProtected && Math.random() < 0.15) {
    pregnant = true;
    message += " You might be pregnant!";
  }
  
  return { success: true, message, pregnant };
};

export const proposeMariage = (character: Character): { success: boolean; accepted?: boolean; message: string } => {
  const partner = character.familyMembers.find(m => m.relationship === 'lover');
  if (!partner) {
    return { success: false, message: "You need to be dating someone first!" };
  }
  
  const acceptanceChance = partner.relationshipQuality / 100;
  const accepted = Math.random() < acceptanceChance;
  
  if (accepted) {
    return { success: true, accepted: true, message: `${partner.name} said yes! You're now engaged!` };
  } else {
    return { success: true, accepted: false, message: `${partner.name} turned down your proposal.` };
  }
};

export const getMarried = (character: Character): { success: boolean; message: string; weddingCost?: number } => {
  if (character.relationshipStatus !== 'engaged') {
    return { success: false, message: "You need to be engaged first!" };
  }
  
  const weddingCost = Math.floor(Math.random() * 100) + 50;
  if (character.wealth < weddingCost) {
    return { success: false, message: "You can't afford a wedding right now!" };
  }
  
  return { success: true, message: "You had a beautiful wedding!", weddingCost };
};

export const giveGift = (character: Character, partnerId: string, giftType: string): { success: boolean; message: string; cost: number; relationshipChange: number } => {
  const costs = { flowers: 25, jewelry: 150, expensive: 500 };
  const cost = costs[giftType as keyof typeof costs] || 25;
  
  if (character.wealth < cost) {
    return { success: false, message: "You can't afford this gift!", cost: 0, relationshipChange: 0 };
  }
  
  const relationshipChange = giftType === 'expensive' ? 20 : giftType === 'jewelry' ? 15 : 10;
  return { success: true, message: `Your partner loved the ${giftType}!`, cost, relationshipChange };
};

export const haveBaby = (character: Character, babyName: string): { success: boolean; message: string; baby?: FamilyMember } => {
  const baby: FamilyMember = {
    id: Math.random().toString(36).substring(2, 15),
    name: babyName,
    relationship: 'child',
    age: 0,
    alive: true,
    health: Math.floor(Math.random() * 20) + 80,
    relationshipQuality: 100,
    relationshipStats: generateRelationshipStats(100),
    personality: generatePersonalityTraits(),
    currentMood: 'neutral' as const
  };
  
  return { success: true, message: `${babyName} was born! Congratulations!`, baby };
};
