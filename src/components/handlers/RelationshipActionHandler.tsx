
import { Character } from '../../types/game';
import { executeRelationshipAction, generateNewRelationship } from '../../utils/relationshipActions';
import { generatePersonality, initializeRelationshipStats } from '../../systems/relationship/relationshipUtils';

export const handleRelationshipAction = (
  character: Character,
  action: string,
  ageHistory: Record<number, string[]>,
  setAgeHistory: (history: Record<number, string[]>) => void,
  onGameStateChange: (newState: any) => void,
  gameState: any,
  toast: any,
  data?: any
) => {
  let updatedCharacter = { ...character };
  let message = '';
  let ageEvents = ageHistory[updatedCharacter.age] || [];

  // Handle specific relationship actions that affect the overall game state
  switch (action) {
    case 'find_love':
      if (updatedCharacter.age < 16) {
        message = "You're too young for serious relationships!";
        break;
      }
      
      // Check if already in a relationship
      const hasPartner = updatedCharacter.familyMembers.some(m => 
        m.relationship === 'lover' || m.relationship === 'spouse'
      );
      
      if (hasPartner) {
        message = "You're already in a relationship!";
        break;
      }
      
      // Generate a new potential partner
      const newPartner = {
        id: Date.now().toString(),
        name: generateRandomName(),
        relationship: 'lover' as const,
        age: updatedCharacter.age + Math.floor(Math.random() * 10) - 5,
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
        updatedCharacter.familyMembers.push(newPartner);
        updatedCharacter.relationshipStatus = 'dating';
        updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 15);
        message = `You met ${newPartner.name} and hit it off! You're now dating! 💕`;
      } else {
        message = "You didn't find anyone special this time. Maybe try again later!";
      }
      break;

    case 'date_night':
      const partner = updatedCharacter.familyMembers.find(m => 
        m.relationship === 'lover' || m.relationship === 'spouse'
      );
      if (!partner) {
        message = "You need to be in a relationship first!";
        break;
      }
      
      const result = executeRelationshipAction(updatedCharacter, partner, 'spend_time');
      message = result.message;
      
      // Apply character effects
      if (result.characterEffects.happiness) {
        updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + result.characterEffects.happiness);
      }
      if (result.characterEffects.wealth) {
        updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth + result.characterEffects.wealth);
      }
      break;

    case 'propose':
      const fiancee = updatedCharacter.familyMembers.find(m => m.relationship === 'lover');
      if (!fiancee) {
        message = "You need to be dating someone first!";
        break;
      }
      
      const proposalResult = executeRelationshipAction(updatedCharacter, fiancee, 'propose');
      message = proposalResult.message;
      
      // Apply character effects
      if (proposalResult.characterEffects.happiness) {
        updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + proposalResult.characterEffects.happiness);
      }
      if (proposalResult.characterEffects.wealth) {
        updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth + proposalResult.characterEffects.wealth);
      }
      break;

    case 'make_new_friends':
      // Generate new friends
      const friendsToAdd = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < friendsToAdd; i++) {
        const newFriend = {
          id: Date.now().toString() + i,
          name: generateRandomName(),
          relationship: 'friend' as const,
          age: updatedCharacter.age + Math.floor(Math.random() * 10) - 5,
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
        updatedCharacter.familyMembers.push(newFriend);
      }
      message = `You made ${friendsToAdd} new friend${friendsToAdd > 1 ? 's' : ''}!`;
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 10);
      break;

    default:
      // Handle other actions through the relationship system
      if (data && data.targetId) {
        const member = updatedCharacter.familyMembers.find(m => m.id === data.targetId);
        if (member) {
          const result = executeRelationshipAction(updatedCharacter, member, action);
          message = result.message;
          
          // Apply character effects
          if (result.characterEffects.happiness) {
            updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + result.characterEffects.happiness);
          }
          if (result.characterEffects.wealth) {
            updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth + result.characterEffects.wealth);
          }
          
          // Update relationship quality
          const memberIndex = updatedCharacter.familyMembers.findIndex(m => m.id === data.targetId);
          if (memberIndex !== -1) {
            updatedCharacter.familyMembers[memberIndex].relationshipQuality = result.newRelationshipQuality;
          }
        }
      }
      break;
  }

  if (message) {
    ageEvents.push(message);
    const newAgeHistory = { ...ageHistory };
    newAgeHistory[updatedCharacter.age] = ageEvents;
    setAgeHistory(newAgeHistory);

    toast({
      title: "Relationship Update",
      description: message,
    });
  }

  onGameStateChange({
    ...gameState,
    character: updatedCharacter
  });
};

// Helper function to generate random names
const generateRandomName = (): string => {
  const firstNames = [
    'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn',
    'Sam', 'Blake', 'Cameron', 'Jamie', 'Sage', 'River', 'Phoenix', 'Rowan',
    'Eden', 'Hayden', 'Peyton', 'Emerson', 'Parker', 'Reese', 'Skyler', 'Drew'
  ];
  
  return firstNames[Math.floor(Math.random() * firstNames.length)];
};
