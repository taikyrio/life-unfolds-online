
import { Character } from '../types/game';

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

export const relationshipManager = {
  updateRelationshipsOverTime: (character: Character) => {
    // Update relationship quality over time
    character.familyMembers.forEach(member => {
      if (member.relationshipStats) {
        member.relationshipStats.relationshipLevel = Math.max(0, 
          member.relationshipStats.relationshipLevel - 1
        );
      }
    });
  },
  
  generateRandomEvent: (character: Character) => {
    // Return null for now - can be expanded later
    return null;
  }
};
