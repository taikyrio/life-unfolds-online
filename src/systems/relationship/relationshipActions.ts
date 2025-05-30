
import { RelationshipAction, RelationshipType } from '../../types/game';

export const RELATIONSHIP_ACTIONS: RelationshipAction[] = [
  {
    id: 'compliment',
    name: 'Compliment',
    description: 'Say something nice',
    emoji: '😊',
    category: 'positive',
    availableFor: ['father', 'mother', 'sibling', 'child', 'friend', 'lover', 'spouse', 'coworker', 'classmate'],
    riskLevel: 'low'
  },
  {
    id: 'argue',
    name: 'Argue',
    description: 'Start an argument',
    emoji: '😠',
    category: 'negative',
    availableFor: ['father', 'mother', 'sibling', 'child', 'friend', 'lover', 'spouse', 'enemy', 'rival'],
    riskLevel: 'medium'
  },
  {
    id: 'hug',
    name: 'Hug',
    description: 'Give a warm hug',
    emoji: '🤗',
    category: 'positive',
    availableFor: ['father', 'mother', 'sibling', 'child', 'friend', 'lover', 'spouse', 'grandparent'],
    riskLevel: 'low'
  },
  {
    id: 'spend_time',
    name: 'Spend Time',
    description: 'Hang out together',
    emoji: '⏰',
    category: 'positive',
    availableFor: ['father', 'mother', 'sibling', 'child', 'friend', 'lover', 'spouse', 'grandparent'],
    riskLevel: 'low'
  },
  {
    id: 'ask_for_money',
    name: 'Ask for Money',
    description: 'Request financial help',
    emoji: '💰',
    category: 'neutral',
    availableFor: ['father', 'mother', 'grandparent', 'spouse'],
    riskLevel: 'medium'
  },
  {
    id: 'flirt',
    name: 'Flirt',
    description: 'Be romantic',
    emoji: '😘',
    category: 'romantic',
    availableFor: ['lover', 'spouse', 'friend', 'acquaintance'],
    riskLevel: 'medium',
    minAge: 16
  },
  {
    id: 'propose',
    name: 'Propose',
    description: 'Ask to marry',
    emoji: '💍',
    category: 'romantic',
    cost: 500,
    availableFor: ['lover'],
    riskLevel: 'high',
    minAge: 18
  },
  {
    id: 'break_up',
    name: 'Break Up',
    description: 'End the relationship',
    emoji: '💔',
    category: 'negative',
    availableFor: ['lover'],
    riskLevel: 'high'
  },
  {
    id: 'ignore',
    name: 'Ignore',
    description: 'Give them the silent treatment',
    emoji: '🙄',
    category: 'negative',
    availableFor: ['father', 'mother', 'sibling', 'friend', 'lover', 'spouse', 'enemy', 'rival'],
    riskLevel: 'low'
  },
  {
    id: 'insult',
    name: 'Insult',
    description: 'Say something hurtful',
    emoji: '😤',
    category: 'aggressive',
    availableFor: ['sibling', 'friend', 'enemy', 'rival', 'coworker'],
    riskLevel: 'high'
  },
  {
    id: 'apologize',
    name: 'Apologize',
    description: 'Say you\'re sorry',
    emoji: '🙏',
    category: 'positive',
    availableFor: ['father', 'mother', 'sibling', 'child', 'friend', 'lover', 'spouse', 'ex'],
    riskLevel: 'low'
  },
  {
    id: 'gift',
    name: 'Give Gift',
    description: 'Give a present',
    emoji: '🎁',
    category: 'positive',
    cost: 50,
    availableFor: ['father', 'mother', 'sibling', 'child', 'friend', 'lover', 'spouse'],
    riskLevel: 'low'
  }
];

export const getAvailableActionsForRelationship = (relationshipType: RelationshipType): RelationshipAction[] => {
  return RELATIONSHIP_ACTIONS.filter(action => action.availableFor.includes(relationshipType));
};
