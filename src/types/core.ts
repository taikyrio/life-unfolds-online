
export interface Character {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  
  // Core Stats (0-100)
  health: number;
  happiness: number;
  smarts: number;
  looks: number;
  
  // Life Status
  money: number;
  job?: string;
  salary?: number;
  relationshipStatus: 'single' | 'dating' | 'engaged' | 'married' | 'divorced' | 'widowed';
  education: EducationLevel;
  
  // Progress
  lifeEvents: LifeEvent[];
  achievements: Achievement[];
  
  // Personality & Background
  personality: PersonalityTraits;
  birthCountry: string;
  
  // Family & Relationships
  family: FamilyMember[];
  relationships: Relationship[];
}

export interface LifeEvent {
  id: string;
  title: string;
  description: string;
  age: number;
  category: EventCategory;
  icon: string;
  impact: StatChange;
  timestamp: number;
}

export interface EventChoice {
  id: string;
  text: string;
  description?: string;
  icon?: string;
  consequences: Consequence[];
  requirements?: Requirement[];
}

export interface Consequence {
  type: 'stat' | 'money' | 'relationship' | 'event' | 'achievement';
  target?: string;
  change: number | string;
  probability?: number;
}

export interface Requirement {
  type: 'stat' | 'money' | 'age' | 'education' | 'relationship';
  target?: string;
  value: number | string;
  operator: '>' | '<' | '=' | '>=' | '<=';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: number;
}

export interface PersonalityTraits {
  kindness: number;
  creativity: number;
  discipline: number;
  patience: number;
  humor: number;
  ambition: number;
  empathy: number;
  confidence: number;
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  age: number;
  alive: boolean;
  relationshipQuality: number;
}

export interface Relationship {
  id: string;
  name: string;
  type: 'friend' | 'romantic' | 'enemy' | 'acquaintance';
  quality: number;
  metAt: string;
  age: number;
}

export type EducationLevel = 'none' | 'elementary' | 'middle' | 'high' | 'college' | 'graduate';
export type EventCategory = 'childhood' | 'education' | 'career' | 'relationship' | 'health' | 'random' | 'family';

export interface StatChange {
  health?: number;
  happiness?: number;
  smarts?: number;
  looks?: number;
  money?: number;
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  choices: EventChoice[];
  conditions?: Requirement[];
  ageRange?: [number, number];
  category: EventCategory;
  rarity: number; // 0-1, lower = more rare
}
