
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
  category: 'vehicle' | 'property' | 'investment' | 'luxury' | 'other' | 'real_estate' | 'vehicles' | 'technology';
  type: string;
  condition?: number | 'excellent' | 'good' | 'fair' | 'poor' | 'damaged';
  purchaseDate?: string;
  // Extended asset properties
  purchasePrice: number;
  currentValue: number;
  maintenanceCost: number;
  yearPurchased: number;
  depreciationRate?: number;
  appreciationRate?: number;
  rentalIncome?: number;
  insuranceCost?: number;
  isInsured?: boolean;
  description: string;
  emoji: string;
  requirements?: {
    minAge?: number;
    minWealth?: number;
    minIncome?: number;
    license?: string;
    creditScore?: number;
  };
  benefits?: {
    prestigePoints?: number;
    happinessBonus?: number;
    healthBonus?: number;
    incomeMultiplier?: number;
    socialStatus?: number;
  };
  lastMaintenanceYear?: number;
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
