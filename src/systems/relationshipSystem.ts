import { Character, FamilyMember, RelationshipAction, RelationshipEvent, RelationshipType } from '../types/game';
import { generateRandomName } from '../utils/gameUtils';
import { getAvailableActionsForRelationship } from './relationship/relationshipActions';
import { generateRandomRelationshipEvent } from './relationship/relationshipEvents';
import { RelationshipActionProcessor } from './relationship/relationshipActionProcessor';
import { generatePersonality, initializeRelationshipStats, updateRelationshipOverTime } from './relationship/relationshipUtils';

export class RelationshipManager {
  private static instance: RelationshipManager;
  private actionProcessor: RelationshipActionProcessor;

  static getInstance(): RelationshipManager {
    if (!RelationshipManager.instance) {
      RelationshipManager.instance = new RelationshipManager();
    }
    return RelationshipManager.instance;
  }

  constructor() {
    this.actionProcessor = new RelationshipActionProcessor();
  }

  // Initialize relationship stats for new relationships
  initializeRelationshipStats = initializeRelationshipStats;

  // Generate personality traits for new family members
  generatePersonality = generatePersonality;

  // Execute relationship actions
  executeAction(character: Character, targetId: string, actionId: string): {
    success: boolean;
    message: string;
    effects: any;
  } {
    const target = character.familyMembers.find(m => m.id === targetId);
    if (!target) {
      return { success: false, message: "Person not found", effects: {} };
    }

    const action = this.getAvailableActions(target.relationship).find(a => a.id === actionId);
    if (!action) {
      return { success: false, message: "Action not available", effects: {} };
    }

    // Check if character can afford the action
    if (action.cost && character.wealth < action.cost) {
      return { success: false, message: "Not enough money", effects: {} };
    }

    // Execute the action
    const result = this.actionProcessor.processAction(character, target, action);

    // Record the interaction
    this.actionProcessor.recordInteraction(target, action, result);

    return result;
  }

  // Get available actions for a relationship type
  getAvailableActions(relationshipType: RelationshipType): RelationshipAction[] {
    return getAvailableActionsForRelationship(relationshipType);
  }

  // Generate random relationship events
  generateRandomEvent(character: Character): RelationshipEvent | null {
    return generateRandomRelationshipEvent(character);
  }

  // Update relationship stats over time
  updateRelationshipsOverTime(character: Character): void {
    character.familyMembers.forEach(member => {
      // Ensure all family members have relationshipStats
      if (!member.relationshipStats) {
        member.relationshipStats = this.initializeRelationshipStats(member.relationship);
      }
      updateRelationshipOverTime(member);
    });
  }
}

// Export convenience functions
export const relationshipManager = RelationshipManager.getInstance();

export const executeRelationshipAction = (character: Character, targetId: string, actionId: string) => {
  return relationshipManager.executeAction(character, targetId, actionId);
};

export const getAvailableActions = (relationshipType: RelationshipType) => {
  return relationshipManager.getAvailableActions(relationshipType);
};

export const getRandomRelationshipEvent = (character: Character) => {
  return relationshipManager.generateRandomEvent(character);
};