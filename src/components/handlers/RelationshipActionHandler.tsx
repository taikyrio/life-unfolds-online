
import { Character } from '../../types/game';
import { handleFindLove, handleMakeNewFriends } from './relationship/RelationshipCreationHandler';
import { handleDateNight, handleProposal, handleSpecificRelationshipAction } from './relationship/RelationshipInteractionHandler';
import { updateCharacterFromRelationshipAction, addNewRelationships, updateRelationshipStatus } from './relationship/RelationshipStateUpdater';

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
      const loveResult = handleFindLove(updatedCharacter);
      message = loveResult.message;
      
      if (loveResult.success && loveResult.newPartner) {
        updatedCharacter = addNewRelationships(updatedCharacter, [loveResult.newPartner]);
        updatedCharacter = updateRelationshipStatus(updatedCharacter, 'dating');
        updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 15);
      }
      break;

    case 'date_night':
      const dateResult = handleDateNight(updatedCharacter);
      message = dateResult.message;
      
      if (dateResult.success) {
        updatedCharacter = updateCharacterFromRelationshipAction(updatedCharacter, dateResult.effects);
      }
      break;

    case 'propose':
      const proposalResult = handleProposal(updatedCharacter);
      message = proposalResult.message;
      
      if (proposalResult.success) {
        updatedCharacter = updateCharacterFromRelationshipAction(updatedCharacter, proposalResult.effects);
      }
      break;

    case 'make_new_friends':
      const friendsResult = handleMakeNewFriends(updatedCharacter);
      message = friendsResult.message;
      updatedCharacter = addNewRelationships(updatedCharacter, friendsResult.newFriends);
      updatedCharacter.happiness = Math.min(100, updatedCharacter.happiness + 10);
      break;

    default:
      // Handle other actions through the relationship system
      if (data && data.targetId) {
        const actionResult = handleSpecificRelationshipAction(updatedCharacter, action, data.targetId);
        message = actionResult.message;
        
        if (actionResult.success) {
          updatedCharacter = updateCharacterFromRelationshipAction(
            updatedCharacter, 
            actionResult.effects, 
            actionResult.newRelationshipQuality, 
            data.targetId
          );
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
