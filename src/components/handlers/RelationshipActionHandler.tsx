
import { Character } from '../../types/game';
import { executeRelationshipAction, relationshipManager } from '../../systems/relationshipSystem';
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
      
      // Generate a new potential partner
      const newPartner = {
        id: Date.now().toString(),
        name: generateRandomName(),
        relationship: 'lover' as const,
        age: updatedCharacter.age + Math.floor(Math.random() * 10) - 5,
        alive: true,
        health: 80 + Math.floor(Math.random() * 20),
        relationshipStats: initializeRelationshipStats('lover', 60),
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
        message = `You met ${newPartner.name} and hit it off! You're now dating.`;
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
      
      const result = executeRelationshipAction(updatedCharacter, partner.id, 'spend_time');
      message = result.message;
      
      // Apply character effects
      if (result.effects.happiness) {
        updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + result.effects.happiness);
      }
      if (result.effects.wealth) {
        updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth + result.effects.wealth);
      }
      break;

    case 'propose':
      const fiancee = updatedCharacter.familyMembers.find(m => m.relationship === 'lover');
      if (!fiancee) {
        message = "You need to be dating someone first!";
        break;
      }
      
      const proposalResult = executeRelationshipAction(updatedCharacter, fiancee.id, 'propose');
      message = proposalResult.message;
      
      // Apply character effects
      if (proposalResult.effects.happiness) {
        updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + proposalResult.effects.happiness);
      }
      if (proposalResult.effects.wealth) {
        updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth + proposalResult.effects.wealth);
      }
      if (proposalResult.effects.relationshipStatus) {
        updatedCharacter.relationshipStatus = proposalResult.effects.relationshipStatus;
        updatedCharacter.partnerName = fiancee.name;
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
        const actionResult = executeRelationshipAction(updatedCharacter, data.targetId, action);
        message = actionResult.message;
        
        // Apply character effects
        if (actionResult.effects.happiness) {
          updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + actionResult.effects.happiness);
        }
        if (actionResult.effects.wealth) {
          updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth + actionResult.effects.wealth);
        }
        if (actionResult.effects.relationshipStatus) {
          updatedCharacter.relationshipStatus = actionResult.effects.relationshipStatus;
        }
      }
      break;
  }

  // Update relationships over time
  relationshipManager.updateRelationshipsOverTime(updatedCharacter);

  // Generate random relationship events
  const randomEvent = relationshipManager.generateRandomEvent(updatedCharacter);
  if (randomEvent && Math.random() < 0.1) {
    // Apply random event effects
    const targetMember = updatedCharacter.familyMembers.find(m => 
      randomEvent.targetRelationships.includes(m.relationship)
    );
    
    if (targetMember) {
      randomEvent.effects.forEach(effect => {
        if (effect.target === 'other' || effect.target === 'both') {
          if (effect.stats.relationshipLevel) {
            targetMember.relationshipStats.relationshipLevel = Math.max(0, 
              Math.min(100, targetMember.relationshipStats.relationshipLevel + effect.stats.relationshipLevel)
            );
          }
          if (effect.stats.trust) {
            targetMember.relationshipStats.trust = Math.max(0, 
              Math.min(100, targetMember.relationshipStats.trust + effect.stats.trust)
            );
          }
        }
        
        if (effect.target === 'self' || effect.target === 'both') {
          if (effect.characterEffects?.happiness) {
            updatedCharacter.happiness = Math.max(0, 
              Math.min(100, updatedCharacter.happiness + effect.characterEffects.happiness)
            );
          }
        }
      });
      
      ageEvents.push(`${randomEvent.emoji} ${randomEvent.title}: ${randomEvent.description}`);
    }
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
