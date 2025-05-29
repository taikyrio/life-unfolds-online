export interface FamilyMember {
  id: string;
  name: string;
  relationship: 'father' | 'mother' | 'sibling' | 'child' | 'spouse' | 'grandparent' | 'friend' | 'coworker' | 'ex' | 'stepfather' | 'stepmother' | 'stepsibling' | 'stepchild' | 'grandchild' | 'lover' | 'aunt' | 'uncle' | 'cousin' | 'best_friend' | 'acquaintance';
  age: number;
  alive: boolean;
  health: number;
  relationshipQuality: number; // 0-100
  job?: string;
  salary?: number;
  personality?: {
    traits: string[];
    compatibility: number; // 0-100 compatibility with player
  };
  lastInteraction?: number; // Age when last interacted
  relationshipHistory?: string[]; // Major relationship events
  loyaltyLevel?: number; // How loyal they are (affects decisions)
  socialStatus?: 'low' | 'middle' | 'high'; // Economic/social status
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

export interface Character {
  name: string;
  age: number;
  health: number;
  happiness: number;
  smarts: number;
  looks: number;
  wealth: number;
  relationships: number;
  year: number;
  
  // Enhanced Character Info
  zodiacSign: ZodiacSign;
  birthMonth: number;
  birthDay: number;
  familyMembers: FamilyMember[];
  pets: { name: string; type: string; age: number; health: number }[];
  socialCircles?: SocialCircle[];
  
  // Career & Education
  job?: string;
  jobLevel: number;
  salary: number;
  education: string[];
  currentEducation?: CurrentEducation;
  
  // Enhanced Relationships
  relationshipStatus: 'single' | 'dating' | 'engaged' | 'married' | 'divorced' | 'widowed';
  partnerName?: string;
  children: string[];
  isPregnant?: boolean;
  pregnancyMonths?: number;
  datingHistory?: string[];
  relationshipSkills?: {
    communication: number;
    empathy: number;
    romance: number;
    trustworthiness: number;
  };
  
  // Life Status
  criminalRecord: boolean;
  fame: number;
  nationality: string;
  birthplace: string;
  
  // Birth Circumstances
  birthWeight: number; // in pounds
  birthComplications: boolean;
  premature: boolean;
  
  // Assets
  assets: { name: string; type: string; value: number }[];
  
  // Social & Personality
  personality?: {
    traits: string[];
    socialPreference: 'introvert' | 'extrovert' | 'ambivert';
    conflictStyle: 'aggressive' | 'passive' | 'assertive' | 'passive-aggressive';
  };
  
  // Event flags for tracking special conditions
  flags?: string[];
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
