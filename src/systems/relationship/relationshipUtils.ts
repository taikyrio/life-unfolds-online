
import { RelationshipStats, RelationshipType, PersonalityTraits, FamilyMember } from '../../types/game';
import { DEFAULT_TRUST_LEVELS, DEFAULT_RESPECT_LEVELS } from './relationshipTypes';

export const generatePersonality = (): PersonalityTraits => {
  return {
    kindness: Math.floor(Math.random() * 80) + 20,
    loyalty: Math.floor(Math.random() * 80) + 20,
    intelligence: Math.floor(Math.random() * 80) + 20,
    humor: Math.floor(Math.random() * 80) + 20,
    ambition: Math.floor(Math.random() * 80) + 20,
    stability: Math.floor(Math.random() * 80) + 20,
    generosity: Math.floor(Math.random() * 80) + 20
  };
};

export const initializeRelationshipStats = (relationship: RelationshipType, baseLevel: number = 50): RelationshipStats => {
  const baseStats = {
    relationshipLevel: baseLevel,
    trust: DEFAULT_TRUST_LEVELS[relationship] || 50,
    respect: DEFAULT_RESPECT_LEVELS[relationship] || 50,
    lastInteraction: new Date().toISOString(),
    interactionHistory: []
  };

  // Add romantic stats for romantic relationships
  if (['spouse', 'lover', 'ex', 'affair'].includes(relationship)) {
    return {
      ...baseStats,
      love: baseLevel,
      compatibility: Math.floor(Math.random() * 40) + 30
    };
  }

  return baseStats;
};

export const getDaysSinceLastInteraction = (member: FamilyMember): number => {
  if (!member.relationshipStats || !member.relationshipStats.lastInteraction) {
    return 0; // No interaction history
  }
  
  const lastInteraction = new Date(member.relationshipStats.lastInteraction);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - lastInteraction.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const ensureRelationshipStats = (member: FamilyMember): void => {
  if (!member.relationshipStats) {
    member.relationshipStats = initializeRelationshipStats(member.relationship);
  }
};

export const updateRelationshipOverTime = (member: FamilyMember): void => {
  // Ensure relationshipStats exist
  ensureRelationshipStats(member);
  
  // Slowly decay relationships without interaction
  const daysSinceLastInteraction = getDaysSinceLastInteraction(member);
  
  if (daysSinceLastInteraction > 30) {
    member.relationshipStats.relationshipLevel = Math.max(0, member.relationshipStats.relationshipLevel - 1);
  }

  // Update mood randomly
  if (Math.random() < 0.1) {
    const moods = ['happy', 'sad', 'angry', 'neutral', 'excited', 'stressed'];
    member.currentMood = moods[Math.floor(Math.random() * moods.length)] as any;
  }

  // Age the person
  if (Math.random() < 0.1) { // 10% chance per year
    member.age += 1;
    
    // Health decline with age
    if (member.age > 60) {
      member.health = Math.max(0, member.health - Math.floor(Math.random() * 3));
    }
    
    // Check for death
    if (member.health <= 0) {
      member.alive = false;
    }
  }
};
