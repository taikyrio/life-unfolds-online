
export interface RelationshipAction {
  id: string;
  name: string;
  description: string;
  emoji: string;
  category: 'positive' | 'negative' | 'romantic' | 'neutral' | 'aggressive';
  availableFor: RelationshipType[];
  riskLevel: 'low' | 'medium' | 'high';
  cost?: number;
  minAge?: number;
  maxAge?: number;
}

export interface InteractionRecord {
  id: string;
  type: string;
  outcome: 'positive' | 'negative' | 'neutral';
  impact: number;
  timestamp: string;
  description: string;
}

export interface RelationshipEvent {
  id: string;
  title: string;
  description: string;
  emoji: string;
  trigger: 'random' | 'condition';
  probability: number;
  targetRelationships: RelationshipType[];
  effects: RelationshipEventEffect[];
}

export interface RelationshipEventEffect {
  target: 'self' | 'other' | 'both';
  stats: Partial<RelationshipStats>;
  characterEffects?: {
    happiness?: number;
    stress?: number;
    health?: number;
  };
}

export type RelationshipType = 
  | 'father' | 'mother' | 'stepfather' | 'stepmother'
  | 'sibling' | 'stepsibling' | 'halfsibling' 
  | 'child' | 'stepchild' | 'adoptedchild'
  | 'grandparent' | 'grandchild'
  | 'spouse' | 'lover' | 'ex' | 'affair'
  | 'friend' | 'bestfriend' | 'acquaintance'
  | 'enemy' | 'rival'
  | 'coworker' | 'boss' | 'employee'
  | 'classmate' | 'teacher'
  | 'neighbor' | 'stranger'
  | 'aunt' | 'uncle' | 'cousin';

export interface RelationshipStats {
  relationshipLevel: number;
  trust: number;
  communication: number;
  intimacy: number;
  conflictResolution: number;
  sharedInterests: number;
  timeSpentTogether: number;
  lastInteraction: string;
  interactionHistory: InteractionRecord[];
  respect: number;
  love?: number;
  fear?: number;
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: RelationshipType;
  age?: number;
  health?: number;
  job?: string;
  alive: boolean;
  isBlocked?: boolean;
  isEstranged?: boolean;
  currentMood?: string;
  relationshipStats?: RelationshipStats;
  relationshipQuality?: number;
  personality?: {
    kindness: number;
    loyalty: number;
    intelligence: number;
    humor: number;
    ambition: number;
    stability: number;
    generosity: number;
  };
}
