export interface FamilyMember {
  id: string;
  name: string;
  relationship: 'father' | 'mother' | 'sibling' | 'child' | 'spouse' | 'grandparent';
  age: number;
  alive: boolean;
  health: number;
  relationshipQuality: number; // 0-100
  job?: string; // Optional job field for family members
}

export interface ZodiacSign {
  name: string;
  emoji: string;
  traits: string[];
  luckyNumbers: number[];
  element: 'fire' | 'earth' | 'air' | 'water';
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
  
  // Career & Education
  job?: string;
  jobLevel: number;
  salary: number;
  education: string;
  
  // Relationships
  relationshipStatus: 'single' | 'dating' | 'engaged' | 'married' | 'divorced' | 'widowed';
  partnerName?: string;
  children: string[];
  
  // Life Status
  criminalRecord: boolean;
  fame: number;
  nationality: string;
  birthplace: string;
  
  // Birth Circumstances
  birthWeight: number; // in pounds
  birthComplications: boolean;
  premature: boolean;
}

export interface LifeEvent {
  id: string;
  title: string;
  description: string;
  emoji: string;
  choices: Choice[];
  category?: 'career' | 'education' | 'relationship' | 'random' | 'crime' | 'health' | 'family';
  ageRequirement?: { min?: number; max?: number };
  requirements?: {
    education?: string;
    job?: string;
    relationshipStatus?: string;
    wealth?: number;
    familyMember?: string;
    zodiacSign?: string;
  };
}

export interface Choice {
  id: string;
  text: string;
  effects: StatEffects;
  emoji?: string;
  consequences?: string[];
  unlocks?: string[];
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
  education?: string;
  relationshipStatus?: 'single' | 'dating' | 'engaged' | 'married' | 'divorced' | 'widowed';
  partnerName?: string;
  children?: string[];
  criminalRecord?: boolean;
  familyMemberHealth?: { id: string; change: number };
  familyMemberRelationship?: { id: string; change: number };
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
