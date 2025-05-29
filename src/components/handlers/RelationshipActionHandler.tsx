
import { Character } from '../../types/game';
import { goOnDate, proposeMarriage } from '../../systems/relationshipSystem';

const findLove = (character: Character) => {
  // Simple implementation - you may want to enhance this
  const names = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley'];
  const randomName = names[Math.floor(Math.random() * names.length)];
  
  const success = Math.random() > 0.3; // 70% chance of success
  
  if (success) {
    const partner = {
      id: Date.now().toString(),
      name: randomName,
      age: character.age + Math.floor(Math.random() * 10) - 5,
      relationship: 'lover' as const,
      relationshipQuality: 50 + Math.floor(Math.random() * 30),
      alive: true
    };
    
    return {
      success: true,
      message: `You met ${randomName} and hit it off! You're now dating.`,
      partner
    };
  } else {
    return {
      success: false,
      message: "You didn't find anyone special this time. Maybe try again later!",
      partner: null
    };
  }
};

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

  switch (action) {
    case 'find_love':
      if (updatedCharacter.age < 16) {
        message = "You're too young for serious relationships!";
        break;
      }
      const loveResult = findLove(updatedCharacter);
      message = loveResult.message;
      if (loveResult.success && loveResult.partner) {
        updatedCharacter.familyMembers.push(loveResult.partner);
        updatedCharacter.relationshipStatus = 'dating';
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
      
      const dateResult = goOnDate(updatedCharacter, partner, data.dateType || 'casual');
      message = dateResult.message;
      updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - dateResult.cost);
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + dateResult.happinessChange);
      
      const partnerIndex = updatedCharacter.familyMembers.findIndex(m => m.id === partner.id);
      if (partnerIndex >= 0) {
        updatedCharacter.familyMembers[partnerIndex].relationshipQuality = Math.min(100, 
          updatedCharacter.familyMembers[partnerIndex].relationshipQuality + dateResult.relationshipChange
        );
      }
      break;

    case 'propose':
      const fiancee = updatedCharacter.familyMembers.find(m => m.relationship === 'lover');
      if (!fiancee) {
        message = "You need to be dating someone first!";
        break;
      }
      
      const proposalResult = proposeMarriage(updatedCharacter, fiancee);
      message = proposalResult.message;
      updatedCharacter.wealth = Math.max(0, updatedCharacter.wealth - proposalResult.ringCost);
      
      if (proposalResult.accepted) {
        const fianceeIndex = updatedCharacter.familyMembers.findIndex(m => m.id === fiancee.id);
        if (fianceeIndex >= 0) {
          updatedCharacter.familyMembers[fianceeIndex].relationship = 'spouse';
          updatedCharacter.relationshipStatus = 'engaged';
          updatedCharacter.partnerName = fiancee.name;
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
