
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
  currentEducation?: any;
  relationshipStatus?: 'single' | 'dating' | 'engaged' | 'married' | 'divorced' | 'widowed';
  partnerName?: string;
  children?: string[];
  criminalRecord?: boolean;
  familyMemberHealth?: { id: string; change: number };
  familyMemberRelationship?: { id: string; change: number };
  newFamilyMember?: any;
  socialCircleChange?: { id: string; influence: number };
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

export interface PersonalityTraits {
  kindness: number; // 0-100
  loyalty: number; // 0-100
  intelligence: number; // 0-100
  humor: number; // 0-100
  ambition: number; // 0-100
  stability: number; // 0-100
  generosity: number; // 0-100
}

export interface ZodiacSign {
  name: string;
  emoji: string;
  traits: string[];
  luckyNumbers: number[];
  element: 'fire' | 'earth' | 'air' | 'water';
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

export interface JobPerformance {
  currentLevel: number;
  yearsAtLevel: number;
  totalExperience: number;
  performanceRating: number;
  promotionEligible: boolean;
}
