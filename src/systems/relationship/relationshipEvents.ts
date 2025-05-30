
import { Character, RelationshipEvent } from '../../types/game';

export const RELATIONSHIP_EVENTS: RelationshipEvent[] = [
  {
    id: 'family_fight',
    title: 'Family Fight',
    description: 'A heated argument broke out at a family gathering',
    emoji: '😡',
    trigger: 'random',
    probability: 0.3,
    targetRelationships: ['father', 'mother', 'sibling'],
    effects: [{
      target: 'other',
      stats: { relationshipLevel: -15, trust: -5 }
    }]
  },
  {
    id: 'surprise_visit',
    title: 'Surprise Visit',
    description: 'Someone came to visit you unexpectedly',
    emoji: '🚪',
    trigger: 'random',
    probability: 0.2,
    targetRelationships: ['friend', 'lover', 'grandparent'],
    effects: [{
      target: 'both',
      stats: { relationshipLevel: 8, trust: 3 },
      characterEffects: { happiness: 10 }
    }]
  },
  {
    id: 'relationship_milestone',
    title: 'Relationship Milestone',
    description: 'You reached an important milestone in your relationship',
    emoji: '🎉',
    trigger: 'condition',
    probability: 1.0,
    targetRelationships: ['lover', 'spouse'],
    effects: [{
      target: 'both',
      stats: { relationshipLevel: 10, love: 5 },
      characterEffects: { happiness: 15 }
    }]
  }
];

export const generateRandomRelationshipEvent = (character: Character): RelationshipEvent | null => {
  if (Math.random() > 0.15) return null; // 15% chance of event

  return RELATIONSHIP_EVENTS[Math.floor(Math.random() * RELATIONSHIP_EVENTS.length)];
};
