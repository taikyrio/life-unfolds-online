
export interface FamilyMember {
  id: string;
  name: string;
  relationship: RelationshipType;
  age: number;
  alive: boolean;
  health: number;
  job?: string;
  salary?: number;
  relationshipStats: RelationshipStats;
  relationshipQuality: number;
  personality: PersonalityTraits;
  backstory?: string;
  currentMood: 'happy' | 'sad' | 'angry' | 'neutral' | 'excited' | 'stressed';
  location?: string;
  isBlocked?: boolean;
  isEstranged?: boolean;
}

export interface RelationshipStats {
  relationshipLevel: number; // 0-100
  trust: number; // 0-100
  respect: number; // 0-100 (can be negative for fear)
  love?: number; // 0-100 for romantic relationships
  compatibility?: number; // 0-100 for romantic relationships
  lastInteraction: string; // timestamp
  interactionHistory: InteractionRecord[];
}

export interface InteractionRecord {
  id: string;
  type: string;
  outcome: 'positive' | 'negative' | 'neutral';
  impact: number;
  timestamp: string;
  description: string;
}

export type RelationshipType = 
  | 'father' | 'mother' | 'stepfather' | 'stepmother'
  | 'sibling' | 'stepsibling' | 'halfsibling'
  | 'child' | 'stepchild' | 'adoptedchild'
  | 'grandparent' | 'grandchild'
  | 'aunt' | 'uncle' | 'cousin'
  | 'spouse' | 'lover' | 'ex' | 'affair'
  | 'friend' | 'bestfriend' | 'acquaintance'
  | 'enemy' | 'rival'
  | 'coworker' | 'boss' | 'employee'
  | 'classmate' | 'teacher'
  | 'neighbor' | 'stranger';

export interface RelationshipAction {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: 'positive' | 'negative' | 'neutral' | 'romantic' | 'aggressive';
  cost?: number;
  energyCost?: number;
  availableFor: RelationshipType[];
  requiresPrivacy?: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  cooldownHours?: number;
  minAge?: number;
  maxAge?: number;
  requiredStats?: Partial<RelationshipStats>;
}

export interface RelationshipEvent {
  id: string;
  title: string;
  description: string;
  emoji: string;
  trigger: 'random' | 'action' | 'age' | 'condition';
  probability: number;
  targetRelationships: RelationshipType[];
  effects: RelationshipEventEffect[];
  choices?: RelationshipEventChoice[];
}

export interface RelationshipEventEffect {
  target: 'self' | 'other' | 'both';
  stats: Partial<RelationshipStats>;
  characterEffects?: {
    happiness?: number;
    health?: number;
    wealth?: number;
    reputation?: number;
  };
}

export interface RelationshipEventChoice {
  id: string;
  text: string;
  emoji: string;
  effects: RelationshipEventEffect[];
}

export interface SocialCircle {
  id: string;
  name: string;
  type: 'school' | 'work' | 'hobby' | 'neighborhood' | 'family';
  members: string[]; // Family member IDs
  activities: string[];
  influence: number; // How much this circle affects decisions
}

// Import PersonalityTraits from character types
import { PersonalityTraits } from './character';
