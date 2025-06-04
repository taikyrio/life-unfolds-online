export interface PersonalityTraits {
  kindness: number;
  loyalty: number;
  intelligence: number;
  humor: number;
  ambition: number;
  stability: number;
  generosity: number;
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
  prisonTime: number;
  crimes: string[];
  notoriety: number;
  totalSentence: number;
  currentlyIncarcerated: boolean;
}

export interface JobPerformance {
  currentLevel: number;
  yearsAtLevel: number;
  totalExperience: number;
  performanceRating: number;
  promotionEligible: boolean;
}

export interface StatEffects {
  health?: number;
  happiness?: number;
  smarts?: number;
  looks?: number;
  wealth?: number;
  relationships?: number;
  fame?: number;
  education?: string;
  job?: string;
  relationshipStatus?: string;
  criminalRecord?: Partial<CriminalRecord>;
}

export interface Choice {
  id: string;
  text: string;
  emoji?: string;
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
  flags?: string[];
  consequences?: string[];
}
