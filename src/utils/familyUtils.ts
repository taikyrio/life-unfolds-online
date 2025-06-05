
import { FamilyMember } from '../types/relationships';

export const ageFamilyMembers = (familyMembers: FamilyMember[]): FamilyMember[] => {
  return familyMembers.map(member => ({
    ...member,
    age: member.age + 1
  }));
};

export const generateNewRelationships = (character: any): FamilyMember[] => {
  // Occasionally generate new family members (births, etc.)
  if (Math.random() < 0.05) { // 5% chance
    return [{
      id: Date.now().toString(),
      name: 'New Family Member',
      relationship: 'other' as const,
      age: 0,
      alive: true,
      health: 100,
      relationshipStats: {
        relationshipLevel: 50,
        trust: 50,
        communication: 50,
        intimacy: 0,
        conflictResolution: 50,
        sharedInterests: 50,
        timeSpentTogether: 0,
        lastInteraction: new Date().toISOString(),
        interactionHistory: []
      },
      relationshipQuality: 50,
      personality: {
        kindness: 50,
        loyalty: 50,
        intelligence: 50,
        humor: 50,
        ambition: 50,
        stability: 50,
        generosity: 50
      },
      currentMood: 'neutral' as const
    }];
  }
  return [];
};
