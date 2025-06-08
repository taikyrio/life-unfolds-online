
import { FamilyMember, RelationshipStats } from '../types/relationships';

export const updateRelationshipStats = (
  member: FamilyMember,
  interaction: string,
  impact: number
): FamilyMember => {
  if (!member.relationshipStats) {
    member.relationshipStats = createDefaultRelationshipStats();
  }

  const stats = { ...member.relationshipStats };
  
  // Update stats based on interaction type and impact
  stats.relationshipLevel = Math.max(0, Math.min(100, stats.relationshipLevel + impact));
  stats.trust = Math.max(0, Math.min(100, stats.trust + (impact * 0.5)));
  stats.respect = Math.max(0, Math.min(100, stats.respect + (impact * 0.3)));
  stats.communication = Math.max(0, Math.min(100, stats.communication + (impact * 0.4)));
  
  // Add interaction to history
  stats.interactionHistory.push({
    id: `interaction_${Date.now()}`,
    type: interaction,
    outcome: impact > 0 ? 'positive' : impact < 0 ? 'negative' : 'neutral',
    impact,
    timestamp: new Date().toISOString(),
    description: `${interaction} (${impact > 0 ? '+' : ''}${impact})`
  });

  stats.lastInteraction = new Date().toISOString();
  stats.timeSpentTogether += 1;

  return {
    ...member,
    relationshipStats: stats
  };
};

const createDefaultRelationshipStats = (): RelationshipStats => ({
  relationshipLevel: 50,
  trust: 50,
  respect: 50,
  communication: 50,
  intimacy: 0,
  conflictResolution: 50,
  sharedInterests: 30,
  timeSpentTogether: 0,
  lastInteraction: new Date().toISOString(),
  interactionHistory: []
});

export const getRelationshipQuality = (stats: RelationshipStats): string => {
  const level = stats.relationshipLevel;
  if (level >= 90) return 'Excellent';
  if (level >= 75) return 'Very Good';
  if (level >= 60) return 'Good';
  if (level >= 40) return 'Fair';
  if (level >= 25) return 'Poor';
  return 'Terrible';
};

export const canPerformAction = (member: FamilyMember, actionId: string): boolean => {
  if (!member.alive) return false;
  if (member.isBlocked || member.isEstranged) return false;
  
  const stats = member.relationshipStats;
  if (!stats) return true;

  // Some actions require minimum relationship levels
  switch (actionId) {
    case 'deep_conversation':
      return stats.communication >= 60;
    case 'ask_for_money':
      return stats.trust >= 50;
    case 'romantic_gesture':
      return stats.intimacy >= 30;
    default:
      return true;
  }
};

export const generateNewFamilyMember = (
  relationship: string,
  age: number,
  name: string
): FamilyMember => {
  return {
    id: `member_${Date.now()}`,
    name,
    relationship: relationship as any,
    age,
    alive: true,
    health: 80 + Math.floor(Math.random() * 20),
    relationshipStats: createDefaultRelationshipStats(),
    relationshipQuality: 50,
    personality: {
      kindness: Math.floor(Math.random() * 100),
      loyalty: Math.floor(Math.random() * 100),
      intelligence: Math.floor(Math.random() * 100),
      humor: Math.floor(Math.random() * 100),
      ambition: Math.floor(Math.random() * 100),
      stability: Math.floor(Math.random() * 100),
      generosity: Math.floor(Math.random() * 100)
    },
    currentMood: 'neutral'
  };
};
