
import { Character, FamilyMember } from '../types/game';

export interface RelationshipActionResult {
  success: boolean;
  message: string;
  relationshipChange: number;
  characterEffects: {
    happiness?: number;
    wealth?: number;
    health?: number;
    relationships?: number;
  };
  newRelationshipQuality: number;
}

export const executeRelationshipAction = (
  character: Character,
  member: FamilyMember,
  actionId: string
): RelationshipActionResult => {
  const currentQuality = member.relationshipQuality || 50;
  let relationshipChange = 0;
  let message = '';
  const characterEffects: any = {};
  let success = true;

  switch (actionId) {
    case 'compliment':
      relationshipChange = Math.floor(Math.random() * 10) + 5;
      message = `You complimented ${member.name}. They appreciated your kind words!`;
      characterEffects.happiness = 5;
      break;

    case 'spend_time':
      relationshipChange = Math.floor(Math.random() * 15) + 10;
      message = `You spent quality time with ${member.name}. You both enjoyed each other's company!`;
      characterEffects.happiness = 10;
      characterEffects.wealth = -20;
      break;

    case 'chat':
      relationshipChange = Math.floor(Math.random() * 8) + 3;
      message = `You had a nice chat with ${member.name}. Communication strengthened your bond!`;
      characterEffects.happiness = 3;
      break;

    case 'date_night':
      if (member.relationship === 'lover' || member.relationship === 'spouse') {
        relationshipChange = Math.floor(Math.random() * 20) + 15;
        message = `You had a wonderful date night with ${member.name}. Romance is in the air! 💕`;
        characterEffects.happiness = 20;
        characterEffects.wealth = -50;
      } else {
        success = false;
        message = `You can't go on a date with ${member.name}!`;
      }
      break;

    case 'propose':
      if (member.relationship === 'lover' && character.wealth >= 500) {
        relationshipChange = 50;
        message = `${member.name} said YES! You're now engaged! 💍`;
        characterEffects.happiness = 50;
        characterEffects.wealth = -500;
        // This would need to update the relationship type to 'spouse' in the actual implementation
      } else if (member.relationship !== 'lover') {
        success = false;
        message = `You need to be dating ${member.name} first!`;
      } else {
        success = false;
        message = `You need $500 for a ring!`;
      }
      break;

    case 'romantic_gesture':
      if (['lover', 'spouse'].includes(member.relationship)) {
        relationshipChange = Math.floor(Math.random() * 15) + 10;
        message = `Your romantic gesture melted ${member.name}'s heart! 💖`;
        characterEffects.happiness = 15;
        characterEffects.wealth = -100;
      } else {
        success = false;
        message = `That would be inappropriate with ${member.name}!`;
      }
      break;

    case 'hang_out':
      relationshipChange = Math.floor(Math.random() * 12) + 8;
      message = `You hung out with ${member.name}. Good friends are priceless!`;
      characterEffects.happiness = 12;
      characterEffects.wealth = -30;
      break;

    case 'ask_for_money':
      if (['father', 'mother', 'grandparent'].includes(member.relationship)) {
        const willGive = Math.random() > 0.4; // 60% chance
        if (willGive) {
          const amount = Math.floor(Math.random() * 200) + 50;
          relationshipChange = -5; // Slight relationship decrease
          message = `${member.name} gave you $${amount}! But they seemed a bit reluctant.`;
          characterEffects.wealth = amount;
        } else {
          relationshipChange = -10;
          message = `${member.name} refused to give you money and seemed disappointed.`;
        }
      } else {
        success = false;
        message = `You can't ask ${member.name} for money!`;
      }
      break;

    default:
      success = false;
      message = 'Unknown action!';
  }

  // Apply relationship quality bounds
  const newQuality = Math.max(0, Math.min(100, currentQuality + relationshipChange));

  // Update relationship stats if they exist
  if (member.relationshipStats && success) {
    member.relationshipStats.relationshipLevel = newQuality;
    member.relationshipStats.lastInteraction = new Date().toISOString();
    member.relationshipStats.timeSpentTogether += 1;
    
    // Add to interaction history
    member.relationshipStats.interactionHistory.push({
      id: `interaction_${Date.now()}`,
      type: actionId,
      outcome: relationshipChange > 0 ? 'positive' : relationshipChange < 0 ? 'negative' : 'neutral',
      impact: relationshipChange,
      timestamp: new Date().toISOString(),
      description: message
    });
  }

  return {
    success,
    message,
    relationshipChange,
    characterEffects,
    newRelationshipQuality: newQuality
  };
};

export const generateNewRelationship = (
  method: string,
  characterAge: number
): FamilyMember | null => {
  const names = [
    'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn',
    'Sam', 'Blake', 'Cameron', 'Jamie', 'Sage', 'River', 'Phoenix', 'Rowan'
  ];

  const name = names[Math.floor(Math.random() * names.length)];
  let relationship: string;
  let age: number;

  switch (method) {
    case 'dating_app':
      relationship = Math.random() > 0.7 ? 'lover' : 'acquaintance';
      age = characterAge + Math.floor(Math.random() * 10) - 5;
      break;
    case 'workplace':
      relationship = 'coworker';
      age = characterAge + Math.floor(Math.random() * 20) - 10;
      break;
    case 'school':
      relationship = 'friend';
      age = characterAge + Math.floor(Math.random() * 4) - 2;
      break;
    case 'social_media':
      relationship = Math.random() > 0.5 ? 'friend' : 'acquaintance';
      age = characterAge + Math.floor(Math.random() * 15) - 7;
      break;
    case 'neighborhood':
      relationship = 'acquaintance';
      age = characterAge + Math.floor(Math.random() * 30) - 15;
      break;
    default:
      return null;
  }

  return {
    id: `new_${Date.now()}`,
    name,
    relationship: relationship as any,
    age: Math.max(5, age),
    alive: true,
    health: 70 + Math.floor(Math.random() * 30),
    relationshipQuality: 30 + Math.floor(Math.random() * 40),
    currentMood: 'neutral',
    personality: {
      kindness: Math.floor(Math.random() * 100),
      loyalty: Math.floor(Math.random() * 100),
      intelligence: Math.floor(Math.random() * 100),
      humor: Math.floor(Math.random() * 100),
      ambition: Math.floor(Math.random() * 100),
      stability: Math.floor(Math.random() * 100),
      generosity: Math.floor(Math.random() * 100)
    },
    relationshipStats: {
      relationshipLevel: 30 + Math.floor(Math.random() * 40),
      trust: 40 + Math.floor(Math.random() * 30),
      communication: 40 + Math.floor(Math.random() * 30),
      intimacy: relationship === 'lover' ? 50 : 0,
      conflictResolution: 50,
      sharedInterests: Math.floor(Math.random() * 60),
      timeSpentTogether: 0,
      respect: 50 + Math.floor(Math.random() * 30),
      lastInteraction: new Date().toISOString(),
      interactionHistory: []
    }
  };
};
