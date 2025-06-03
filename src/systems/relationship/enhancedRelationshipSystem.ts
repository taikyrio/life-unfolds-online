
import { Character, FamilyMember, RelationshipStats, RelationshipType } from '../../types/game';

export interface RelationshipInteraction {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: 'positive' | 'negative' | 'neutral' | 'romantic' | 'family';
  effects: {
    relationshipLevel?: number;
    trust?: number;
    respect?: number;
    love?: number;
  };
  characterEffects?: {
    happiness?: number;
    health?: number;
    wealth?: number;
    relationships?: number;
  };
  requirements?: {
    minRelationshipLevel?: number;
    relationshipTypes?: RelationshipType[];
    minAge?: number;
    maxAge?: number;
  };
  riskLevel: 'low' | 'medium' | 'high';
  cooldownDays?: number;
}

export const relationshipInteractions: RelationshipInteraction[] = [
  // Positive Interactions
  {
    id: 'deep_conversation',
    name: 'Have a Deep Conversation',
    description: 'Share your thoughts and feelings',
    emoji: '💭',
    category: 'positive',
    effects: { relationshipLevel: 8, trust: 12 },
    characterEffects: { happiness: 10 },
    riskLevel: 'low'
  },
  {
    id: 'give_gift',
    name: 'Give a Thoughtful Gift',
    description: 'Show you care with a meaningful present',
    emoji: '🎁',
    category: 'positive',
    effects: { relationshipLevel: 15, love: 8 },
    characterEffects: { happiness: 5, wealth: -50 },
    riskLevel: 'low'
  },
  {
    id: 'spend_quality_time',
    name: 'Spend Quality Time',
    description: 'Enjoy each other\'s company',
    emoji: '⏰',
    category: 'positive',
    effects: { relationshipLevel: 10, trust: 5 },
    characterEffects: { happiness: 8 },
    riskLevel: 'low'
  },
  {
    id: 'apologize_sincerely',
    name: 'Apologize Sincerely',
    description: 'Make amends for past mistakes',
    emoji: '🙏',
    category: 'positive',
    effects: { relationshipLevel: 12, trust: 15, respect: 8 },
    characterEffects: { happiness: 5 },
    requirements: { minRelationshipLevel: 20 },
    riskLevel: 'low'
  },
  
  // Romantic Interactions
  {
    id: 'romantic_date',
    name: 'Plan a Romantic Date',
    description: 'Create a memorable romantic experience',
    emoji: '🌹',
    category: 'romantic',
    effects: { relationshipLevel: 20, love: 25, trust: 8 },
    characterEffects: { happiness: 15, wealth: -100 },
    requirements: { relationshipTypes: ['lover', 'spouse'], minAge: 16 },
    riskLevel: 'low'
  },
  {
    id: 'propose_marriage',
    name: 'Propose Marriage',
    description: 'Ask for their hand in marriage',
    emoji: '💍',
    category: 'romantic',
    effects: { relationshipLevel: 30, love: 40, trust: 20 },
    characterEffects: { happiness: 25, wealth: -500 },
    requirements: { relationshipTypes: ['lover'], minAge: 18, minRelationshipLevel: 80 },
    riskLevel: 'high'
  },
  {
    id: 'move_in_together',
    name: 'Move In Together',
    description: 'Take the next step in your relationship',
    emoji: '🏠',
    category: 'romantic',
    effects: { relationshipLevel: 25, love: 20, trust: 15 },
    characterEffects: { happiness: 20, wealth: -200 },
    requirements: { relationshipTypes: ['lover'], minAge: 18, minRelationshipLevel: 70 },
    riskLevel: 'medium'
  },
  
  // Family Interactions
  {
    id: 'family_dinner',
    name: 'Host Family Dinner',
    description: 'Bring the family together for a meal',
    emoji: '🍽️',
    category: 'family',
    effects: { relationshipLevel: 15, trust: 10 },
    characterEffects: { happiness: 12, wealth: -80 },
    requirements: { relationshipTypes: ['father', 'mother', 'sibling', 'child'] },
    riskLevel: 'low'
  },
  {
    id: 'help_with_problem',
    name: 'Help with Their Problem',
    description: 'Offer support during difficult times',
    emoji: '🤝',
    category: 'positive',
    effects: { relationshipLevel: 18, trust: 20, respect: 12 },
    characterEffects: { happiness: 8, wealth: -100 },
    riskLevel: 'low'
  },
  
  // Negative Interactions
  {
    id: 'start_argument',
    name: 'Start an Argument',
    description: 'Bring up contentious topics',
    emoji: '🗯️',
    category: 'negative',
    effects: { relationshipLevel: -15, trust: -10, respect: -8 },
    characterEffects: { happiness: -5 },
    riskLevel: 'medium'
  },
  {
    id: 'betray_trust',
    name: 'Betray Their Trust',
    description: 'Break a promise or share their secret',
    emoji: '💔',
    category: 'negative',
    effects: { relationshipLevel: -25, trust: -30, respect: -15 },
    characterEffects: { happiness: -10 },
    riskLevel: 'high'
  },
  {
    id: 'ignore_completely',
    name: 'Ignore Them Completely',
    description: 'Give them the silent treatment',
    emoji: '🙄',
    category: 'negative',
    effects: { relationshipLevel: -12, trust: -5, respect: -10 },
    characterEffects: { happiness: -3 },
    riskLevel: 'medium'
  }
];

export interface RelationshipMilestone {
  id: string;
  name: string;
  description: string;
  emoji: string;
  triggerLevel: number;
  relationshipTypes: RelationshipType[];
  effects: {
    happiness?: number;
    relationships?: number;
    wealth?: number;
  };
}

export const relationshipMilestones: RelationshipMilestone[] = [
  {
    id: 'best_friends',
    name: 'Best Friends',
    description: 'You\'ve become best friends!',
    emoji: '👥',
    triggerLevel: 90,
    relationshipTypes: ['friend'],
    effects: { happiness: 15, relationships: 10 }
  },
  {
    id: 'soulmates',
    name: 'Soulmates',
    description: 'You\'ve found your soulmate!',
    emoji: '💕',
    triggerLevel: 95,
    relationshipTypes: ['lover', 'spouse'],
    effects: { happiness: 25, relationships: 15 }
  },
  {
    id: 'family_bond',
    name: 'Unbreakable Family Bond',
    description: 'Your family bond is stronger than ever!',
    emoji: '👨‍👩‍👧‍👦',
    triggerLevel: 85,
    relationshipTypes: ['father', 'mother', 'sibling', 'child'],
    effects: { happiness: 20, relationships: 12 }
  },
  {
    id: 'bitter_enemies',
    name: 'Bitter Enemies',
    description: 'You\'ve become bitter enemies!',
    emoji: '😡',
    triggerLevel: 10,
    relationshipTypes: ['friend', 'coworker', 'neighbor'],
    effects: { happiness: -15, relationships: -10 }
  }
];

export const processRelationshipInteraction = (
  character: Character,
  familyMember: FamilyMember,
  interactionId: string
): { character: Character; familyMember: FamilyMember; messages: string[] } => {
  const interaction = relationshipInteractions.find(i => i.id === interactionId);
  if (!interaction) {
    return { character, familyMember, messages: ['Unknown interaction'] };
  }

  const messages: string[] = [];
  let updatedCharacter = { ...character };
  let updatedFamilyMember = { ...familyMember };

  // Apply relationship effects
  if (interaction.effects) {
    const stats = { ...updatedFamilyMember.relationshipStats };
    
    if (interaction.effects.relationshipLevel) {
      stats.relationshipLevel = Math.max(0, Math.min(100, 
        stats.relationshipLevel + interaction.effects.relationshipLevel));
    }
    if (interaction.effects.trust) {
      stats.trust = Math.max(0, Math.min(100, 
        stats.trust + interaction.effects.trust));
    }
    if (interaction.effects.respect) {
      stats.respect = Math.max(0, Math.min(100, 
        stats.respect + interaction.effects.respect));
    }
    if (interaction.effects.love && stats.love !== undefined) {
      stats.love = Math.max(0, Math.min(100, 
        stats.love + interaction.effects.love));
    }

    updatedFamilyMember.relationshipStats = stats;
    updatedFamilyMember.relationshipQuality = stats.relationshipLevel;
  }

  // Apply character effects
  if (interaction.characterEffects) {
    Object.entries(interaction.characterEffects).forEach(([key, value]) => {
      if (key in updatedCharacter && typeof value === 'number') {
        (updatedCharacter as any)[key] = Math.max(0, Math.min(100, 
          (updatedCharacter as any)[key] + value));
      }
    });
  }

  messages.push(`${interaction.emoji} ${interaction.name} with ${familyMember.name}`);

  // Check for relationship milestones
  const milestone = relationshipMilestones.find(m => 
    m.relationshipTypes.includes(familyMember.relationship) &&
    ((m.triggerLevel <= 20 && updatedFamilyMember.relationshipQuality <= m.triggerLevel) ||
     (m.triggerLevel >= 80 && updatedFamilyMember.relationshipQuality >= m.triggerLevel))
  );

  if (milestone) {
    messages.push(`${milestone.emoji} ${milestone.name}: ${milestone.description}`);
    if (milestone.effects) {
      Object.entries(milestone.effects).forEach(([key, value]) => {
        if (key in updatedCharacter && typeof value === 'number') {
          (updatedCharacter as any)[key] = Math.max(0, Math.min(100, 
            (updatedCharacter as any)[key] + value));
        }
      });
    }
  }

  return { character: updatedCharacter, familyMember: updatedFamilyMember, messages };
};
