
import { Character, FamilyMember } from '../../../types/game';
import { generateRandomName } from '../../../utils/nameGenerator';
import { initializeRelationshipStats } from '../../../systems/relationship/relationshipUtils';
import { RelationshipCreationResult } from './types';

export const handleFindLove = (character: Character): RelationshipCreationResult => {
  if (character.age < 16) {
    return { success: false, message: "You're too young for serious relationships!" };
  }
  
  // Check if already in a relationship
  const hasPartner = character.familyMembers.some(m => 
    m.relationship === 'lover' || m.relationship === 'spouse'
  );
  
  if (hasPartner) {
    return { success: false, message: "You're already in a relationship!" };
  }
  
  // Generate a new potential partner
  const newPartner: FamilyMember = {
    id: Date.now().toString(),
    name: generateRandomName(),
    relationship: 'lover' as const,
    age: character.age + Math.floor(Math.random() * 10) - 5,
    alive: true,
    health: 80 + Math.floor(Math.random() * 20),
    relationshipStats: {
      relationshipLevel: 60,
      trust: 60,
      communication: 50,
      intimacy: 40,
      conflictResolution: 50,
      sharedInterests: 60 + Math.floor(Math.random() * 30),
      timeSpentTogether: 0,
      respect: 70,
      lastInteraction: new Date().toISOString(),
      interactionHistory: []
    },
    relationshipQuality: 60,
    personality: {
      kindness: Math.floor(Math.random() * 100),
      loyalty: Math.floor(Math.random() * 100),
      intelligence: Math.floor(Math.random() * 100),
      humor: Math.floor(Math.random() * 100),
      ambition: Math.floor(Math.random() * 100),
      stability: Math.floor(Math.random() * 100),
      generosity: Math.floor(Math.random() * 100)
    },
    currentMood: 'happy' as const
  };

  const success = Math.random() > 0.3; // 70% chance of success
  
  if (success) {
    return {
      success: true,
      message: `You met ${newPartner.name} and hit it off! You're now dating! 💕`,
      newPartner
    };
  } else {
    return {
      success: false,
      message: "You didn't find anyone special this time. Maybe try again later!"
    };
  }
};

export const handleMakeNewFriends = (character: Character): RelationshipCreationResult => {
  const friendsToAdd = Math.floor(Math.random() * 3) + 1;
  const newFriends: FamilyMember[] = [];
  
  for (let i = 0; i < friendsToAdd; i++) {
    const newFriend: FamilyMember = {
      id: Date.now().toString() + i,
      name: generateRandomName(),
      relationship: 'friend' as const,
      age: character.age + Math.floor(Math.random() * 10) - 5,
      alive: true,
      health: 80 + Math.floor(Math.random() * 20),
      relationshipStats: initializeRelationshipStats('friend', 40),
      relationshipQuality: 40,
      personality: {
        kindness: Math.floor(Math.random() * 100),
        loyalty: Math.floor(Math.random() * 100),
        intelligence: Math.floor(Math.random() * 100),
        humor: Math.floor(Math.random() * 100),
        ambition: Math.floor(Math.random() * 100),
        stability: Math.floor(Math.random() * 100),
        generosity: Math.floor(Math.random() * 100)
      },
      currentMood: 'neutral' as const
    };
    newFriends.push(newFriend);
  }
  
  return {
    success: true,
    message: `You made ${friendsToAdd} new friend${friendsToAdd > 1 ? 's' : ''}!`,
    newFriends
  };
};
