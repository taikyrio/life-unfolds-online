
export interface PersonalityTraits {
  extraversion: number;
  agreeableness: number;
  conscientiousness: number;
  neuroticism: number;
  openness: number;
}

export interface ZodiacSign {
  sign: string;
  element: string;
  traits: string[];
  emoji: string;
  name: string;
}

export interface Asset {
  id: string;
  name: string;
  value: number;
  category: 'vehicle' | 'property' | 'investment' | 'luxury' | 'other';
  type: string;
  condition?: number;
  purchaseDate?: string;
}

export interface CriminalRecord {
  arrests: number;
  convictions: number;
  crimes: string[];
  totalSentence: number;
  currentlyIncarcerated: boolean;
  notoriety: number;
  prisonTime: number;
}

export interface JobPerformance {
  rating: number;
  reviews: string[];
  promotions: number;
  warnings: number;
  yearsAtCompany: number;
}

export interface StatEffects {
  health?: number;
  happiness?: number;
  smarts?: number;
  looks?: number;
  wealth?: number;
  relationships?: number;
  fame?: number;
}

export interface Choice {
  id: string;
  text: string;
  effects: StatEffects;
  probability?: number;
  requirements?: {
    minAge?: number;
    maxAge?: number;
    minWealth?: number;
    education?: string;
    job?: string;
    relationshipStatus?: string;
  };
  unlocks?: string[];
  oneTime?: boolean;
}
