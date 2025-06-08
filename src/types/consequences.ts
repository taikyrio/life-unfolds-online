
export interface ConsequenceChain {
  id: string;
  triggerEventId: string;
  conditions: ConsequenceCondition[];
  effects: ConsequenceEffect[];
  delay: number; // ages to wait before triggering
  probability: number;
  severity: 'minor' | 'moderate' | 'major' | 'life-changing';
}

export interface ConsequenceCondition {
  type: 'stat' | 'relationship' | 'age' | 'event_history' | 'reputation';
  target?: string;
  operator: '>' | '<' | '=' | '>=' | '<=';
  value: number | string;
}

export interface ConsequenceEffect {
  type: 'stat_change' | 'relationship_change' | 'event_trigger' | 'reputation_change';
  target: string;
  value: number;
  description: string;
}

export interface ReputationSystem {
  academic: number; // 0-100
  professional: number; // 0-100
  social: number; // 0-100
  family: number; // 0-100
  romantic: number; // 0-100
  criminal: number; // 0-100 (higher = more notorious)
  community: number; // 0-100
  online: number; // 0-100
}

export interface RelationshipMemory {
  eventId: string;
  description: string;
  impact: number; // -100 to 100
  timestamp: string;
  tags: string[];
  fadeRate: number; // how quickly this memory fades
}

export interface ConsequenceTracker {
  pendingChains: PendingConsequence[];
  reputationHistory: ReputationChange[];
  memoryBank: Record<string, RelationshipMemory[]>; // keyed by relationship ID
}

export interface PendingConsequence {
  id: string;
  chainId: string;
  triggerAge: number;
  description: string;
  effects: ConsequenceEffect[];
}

export interface ReputationChange {
  area: keyof ReputationSystem;
  change: number;
  reason: string;
  timestamp: string;
  public: boolean; // whether others know about this change
}
