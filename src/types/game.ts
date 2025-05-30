
export interface Character {
  id: string;
  name: string;
  age: number;
  health: number;
  happiness: number;
  smarts: number;
  looks: number;
  wealth: number;
  relationships: number;
  job?: string;
  salary?: number;
  jobLevel?: number;
  education: EducationRecord; // Changed back to EducationRecord
  currentEducation?: CurrentEducation;
  relationshipStatus: 'single' | 'dating' | 'engaged' | 'married' | 'divorced' | 'widowed';
  partnerName?: string;
  familyMembers: FamilyMember[];
  lifeEvents: string[];
  achievements: string[];
  assets: Asset[];
  criminalRecord?: CriminalRecord;
  reputation?: number;
  isPregnant?: boolean;
  pregnancyMonths?: number;
  flags?: string[];
  birthplace?: string;
  birthMonth?: number;
  birthDay?: number;
  zodiacSign?: ZodiacSign;
  children: string[];
  customStats?: Record<string, number>;
  fame: number;
}

export interface EducationRecord {
  currentStage: string | null;
  currentSchool: string | null;
  currentYear: number;
  gpa: number;
  grades: any[];
  completedStages: string[];
  major: string | null;
  testScores: number[];
  disciplinaryActions: number;
  achievements: string[];
  dropouts: number;
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

export interface PersonalityTraits {
  kindness: number; // 0-100
  loyalty: number; // 0-100
  intelligence: number; // 0-100
  humor: number; // 0-100
  ambition: number; // 0-100
  stability: number; // 0-100
  generosity: number; // 0-100
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

export interface Asset {
  id: string;
  name: string;
  type: 'property' | 'vehicle' | 'investment' | 'collectible';
  value: number;
  purchasePrice: number;
  purchaseAge: number;
  description: string;
}

export interface CriminalRecord {
  arrests: number;
  convictions: number;
  prisonTime: number;
  crimes: string[];
  notoriety: number;
}

export interface ZodiacSign {
  name: string;
  emoji: string;
  traits: string[];
  luckyNumbers: number[];
  element: 'fire' | 'earth' | 'air' | 'water';
}

export interface CurrentEducation {
  level: string;
  institution: string;
  currentYear: number;
  gpa: number;
  classmates: string[];
}

export interface SocialCircle {
  id: string;
  name: string;
  type: 'school' | 'work' | 'hobby' | 'neighborhood' | 'family';
  members: string[]; // Family member IDs
  activities: string[];
  influence: number; // How much this circle affects decisions
}

export interface LifeEvent {
  id: string;
  title: string;
  description: string;
  emoji: string;
  choices: Choice[];
  category?: 'career' | 'education' | 'relationship' | 'random' | 'crime' | 'health' | 'family' | 'social';
  ageRequirement?: { min?: number; max?: number };
  requirements?: {
    education?: string;
    job?: string;
    relationshipStatus?: string;
    wealth?: number;
    familyMember?: string;
    zodiacSign?: string;
    socialCircle?: string;
  };
}

export interface Choice {
  id: string;
  text: string;
  effects: StatEffects;
  emoji?: string;
  consequences?: string[];
  unlocks?: string[];
  flags?: string[];
}

export interface StatEffects {
  health?: number;
  happiness?: number;
  smarts?: number;
  looks?: number;
  wealth?: number;
  relationships?: number;
  salary?: number;
  fame?: number;
  notoriety?: number;
  job?: string;
  jobLevel?: number;
  education?: string[];
  currentEducation?: CurrentEducation;
  relationshipStatus?: 'single' | 'dating' | 'engaged' | 'married' | 'divorced' | 'widowed';
  partnerName?: string;
  children?: string[];
  criminalRecord?: boolean;
  familyMemberHealth?: { id: string; change: number };
  familyMemberRelationship?: { id: string; change: number };
  newFamilyMember?: FamilyMember;
  socialCircleChange?: { id: string; influence: number };
}

export interface EventTracker {
  triggeredEvents: Set<string>;
  lastEventAge: number;
  eventCooldowns: Map<string, number>;
}

export interface GameState {
  character: Character;
  currentEvent: LifeEvent | null;
  gameStarted: boolean;
  gameOver: boolean;
  gameOverReason?: string;
  eventHistory: string[];
  achievements: string[];
  eventTracker: EventTracker;
}
