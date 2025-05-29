
import { Character } from '../../types/game';
import { findLove, goOnDate, proposeMarriage } from '../../systems/relationshipSystem';

export const handleRelationshipAction = (
  character: Character,
  action: string,
  data?: any,
  ageHistory: Record<number, string[]>,
  setAgeHistory: (history: Record<number, string[]>) => void,
  onGameStateChange: (newState: any) => void,
  gameState: any,
  toast: any
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
