
import { Character, FamilyMember } from '../../../types/game';
import { executeRelationshipAction } from '../../../utils/relationshipActions';
import { RelationshipActionResult } from './types';

export const handleDateNight = (character: Character): RelationshipActionResult => {
  const partner = character.familyMembers.find(m => 
    m.relationship === 'lover' || m.relationship === 'spouse'
  );
  
  if (!partner) {
    return {
      success: false,
      message: "You need to be in a relationship first!",
      effects: {}
    };
  }
  
  const result = executeRelationshipAction(character, partner, 'spend_time');
  return {
    success: result.success,
    message: result.message,
    effects: result.characterEffects
  };
};

export const handleProposal = (character: Character): RelationshipActionResult => {
  const fiancee = character.familyMembers.find(m => m.relationship === 'lover');
  
  if (!fiancee) {
    return {
      success: false,
      message: "You need to be dating someone first!",
      effects: {}
    };
  }
  
  const proposalResult = executeRelationshipAction(character, fiancee, 'propose');
  return {
    success: proposalResult.success,
    message: proposalResult.message,
    effects: proposalResult.characterEffects
  };
};

export const handleSpecificRelationshipAction = (
  character: Character,
  action: string,
  targetId: string
): RelationshipActionResult => {
  const member = character.familyMembers.find(m => m.id === targetId);
  
  if (!member) {
    return {
      success: false,
      message: 'Person not found.',
      effects: {}
    };
  }
  
  const result = executeRelationshipAction(character, member, action);
  return {
    success: result.success,
    message: result.message,
    effects: result.characterEffects,
    newRelationshipQuality: result.newRelationshipQuality
  };
};
