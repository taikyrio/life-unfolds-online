
import { Character, RelationshipAction } from '../types/game';

export const executeRelationshipAction = (
  character: Character,
  targetId: string,
  action: string
) => {
  const target = character.familyMembers.find(m => m.id === targetId);
  
  if (!target) {
    return { message: 'Person not found.', effects: {} };
  }

  switch (action) {
    case 'spend_time':
      return {
        message: `You had a great time with ${target.name}!`,
        effects: { happiness: 10, wealth: -20 }
      };
    case 'propose':
      if (target.relationship === 'lover') {
        target.relationship = 'spouse';
        return {
          message: `${target.name} said yes! You're now engaged!`,
          effects: { happiness: 30, wealth: -500, relationshipStatus: 'engaged' as const }
        };
      }
      return { message: 'You can only propose to someone you\'re dating.', effects: {} };
    default:
      return { message: 'Unknown action.', effects: {} };
  }
};

const relationshipActions: RelationshipAction[] = [
  {
    id: 'compliment',
    name: 'Compliment',
    description: 'Say something nice',
    emoji: '😊',
    category: 'positive',
    availableFor: ['father', 'mother', 'sibling', 'child', 'friend', 'lover', 'spouse'],
    riskLevel: 'low'
  },
  {
    id: 'spend_time',
    name: 'Spend Time',
    description: 'Hang out together',
    emoji: '⏰',
    category: 'positive',
    availableFor: ['father', 'mother', 'sibling', 'child', 'friend', 'lover', 'spouse'],
    riskLevel: 'low'
  },
  {
    id: 'argue',
    name: 'Argue',
    description: 'Start an argument',
    emoji: '😠',
    category: 'negative',
    availableFor: ['father', 'mother', 'sibling', 'friend', 'lover', 'spouse'],
    riskLevel: 'medium'
  },
  {
    id: 'propose',
    name: 'Propose',
    description: 'Ask to marry',
    emoji: '💍',
    category: 'romantic',
    cost: 500,
    availableFor: ['lover'],
    riskLevel: 'high',
    minAge: 18
  }
];

export const relationshipManager = {
  updateRelationshipsOverTime: (character: Character) => {
    character.familyMembers.forEach(member => {
      if (member.relationshipStats) {
        member.relationshipStats.relationshipLevel = Math.max(0, 
          member.relationshipStats.relationshipLevel - 1
        );
      }
    });
  },
  
  generateRandomEvent: (character: Character) => {
    return null;
  },

  getAvailableActions: (relationship: string): RelationshipAction[] => {
    return relationshipActions.filter(action => 
      action.availableFor.includes(relationship as any)
    );
  }
};
